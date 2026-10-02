import { d as getDefaultState, f as notifyManager, g as shallowEqualObjects, h as noop, m as hashKey, p as Subscribable } from "./@clerk/react+[...].mjs";
//#region node_modules/@tanstack/query-core/build/modern/hydration.js
function tryResolveSync(promise) {
	let data;
	promise.then((result) => {
		data = result;
		return result;
	}, noop)?.catch?.(noop);
	if (data !== void 0) return { data };
}
function dehydratePromise(query, serializeData, shouldRedactErrors) {
	const promise = query.promise?.then(serializeData).catch((error) => {
		if (shouldRedactErrors?.(error) === false) return Promise.reject(error);
		return Promise.reject(/* @__PURE__ */ new Error("redacted"));
	});
	promise?.catch(noop);
	return promise;
}
/**
* Dehydrates a single `Query` into a serializable `DehydratedQuery` snapshot. Note that most query config (e.g.
* `queryFn`, `staleTime`) is not dehydrated but instead meant to be configured again when consuming the
* de/rehydrated data, typically with `useQuery` on the client. If the query is still `pending`, its in-flight
* promise is dehydrated too so it can be resumed on the other side instead of re-fetched.
* @param query - The query to dehydrate.
* @param serializeData - Optional transform applied to `query.state.data` before it is included in the snapshot.
* @param shouldRedactErrors - Optional predicate; if it returns `false` for the promise's rejection error, that
* error is kept as-is instead of being redacted.
*/
function dehydrateQuery(query, serializeData, shouldRedactErrors) {
	return {
		dehydratedAt: Date.now(),
		state: {
			...query.state,
			...query.state.data !== void 0 && { data: serializeData ? serializeData(query.state.data) : query.state.data }
		},
		queryKey: query.queryKey,
		queryHash: query.queryHash,
		...query.state.status === "pending" && { promise: dehydratePromise(query, serializeData, shouldRedactErrors) },
		...query.meta && { meta: query.meta },
		...query.queryType && { queryType: query.queryType }
	};
}
/**
* Restores a `DehydratedState` (as produced by `dehydrate`) into a `QueryClient`'s cache, typically to seed the
* client with data already fetched on the server. `mutations` and `queries` are each optional on `dehydratedState`.
* Queries not yet in the cache are built from the dehydrated snapshot; queries that already exist are only updated
* when the dehydrated data is newer than what's already cached. Newly built queries have their `fetchStatus` reset
* to `'idle'` so they don't hydrate stuck in a fetching state. If a dehydrated query still had an in-flight
* promise, it is resumed via `query.fetch()` (reusing that promise as `initialPromise`) rather than re-invoking
* `queryFn`.
* @example
* ```ts
* // dehydratedState was produced by `dehydrate` on the server
* // and sent to the client, e.g. embedded in server-rendered markup.
* const queryClient = new QueryClient()
*
* hydrate(queryClient, dehydratedState)
* ```
*/
function hydrate(client, dehydratedState, options) {
	const mutationCache = client.getMutationCache();
	const queryCache = client.getQueryCache();
	const deserializeData = options?.defaultOptions?.deserializeData ?? client.getDefaultOptions().hydrate?.deserializeData;
	dehydratedState.mutations?.forEach(({ state, ...mutationOptions }) => {
		mutationCache.build(client, {
			...client.getDefaultOptions().hydrate?.mutations,
			...options?.defaultOptions?.mutations,
			...mutationOptions
		}, state);
	});
	dehydratedState.queries?.forEach(({ queryKey, state, queryHash, meta, promise, dehydratedAt, queryType }) => {
		const syncData = promise ? tryResolveSync(promise) : void 0;
		const rawData = state.data === void 0 ? syncData?.data : state.data;
		const data = rawData === void 0 ? rawData : deserializeData ? deserializeData(rawData) : rawData;
		let query = queryCache.get(queryHash);
		const existingQueryIsPending = query?.state.status === "pending";
		const existingQueryIsFetching = query?.state.fetchStatus === "fetching";
		if (query) {
			const hasNewerSyncData = syncData && dehydratedAt > query.state.dataUpdatedAt;
			if (state.dataUpdatedAt > query.state.dataUpdatedAt || hasNewerSyncData) {
				const { fetchStatus: _ignored, ...serializedState } = state;
				query.setState({
					...serializedState,
					data,
					...state.status === "pending" && data !== void 0 && {
						status: "success",
						dataUpdatedAt: dehydratedAt,
						...!existingQueryIsFetching && { fetchStatus: "idle" }
					}
				});
			}
		} else query = queryCache.build(client, {
			...client.getDefaultOptions().hydrate?.queries,
			...options?.defaultOptions?.queries,
			queryKey,
			queryHash,
			meta,
			_type: queryType
		}, {
			...state,
			data,
			fetchStatus: "idle",
			status: state.status === "pending" && data !== void 0 ? "success" : state.status,
			...state.status === "pending" && data !== void 0 && { dataUpdatedAt: dehydratedAt }
		});
		if (promise && !syncData && !existingQueryIsPending && !existingQueryIsFetching && dehydratedAt > query.state.dataUpdatedAt) query.fetch(void 0, { initialPromise: Promise.resolve(promise).then(deserializeData) }).catch(noop);
	});
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/mutationObserver.js
/**
* Observes a single mutation and derives a `MutationObserverResult` from it.
* A framework hook like `useMutation` creates one `MutationObserver` per hook
* call, keeps it stable across re-renders, calls `setOptions` when the options
* passed to the hook change, subscribes to it to re-render on updates, and
* reads `getCurrentResult()` for the value to return. Calling `mutate()`
* builds a new underlying `Mutation` in the `MutationCache` and executes it.
*
* @example
* ```ts
* const observer = new MutationObserver(queryClient, {
*   mutationFn: (variables: { title: string }) => addPost(variables),
* })
* ```
*/
var MutationObserver = class extends Subscribable {
	#client;
	#currentResult = void 0;
	#currentMutation;
	#mutateOptions;
	constructor(client, options) {
		super();
		this.#client = client;
		this.setOptions(options);
		this.bindMethods();
		this.#updateResult();
	}
	bindMethods() {
		this.mutate = this.mutate.bind(this);
		this.reset = this.reset.bind(this);
	}
	/**
	* Updates the observer's options.
	*
	* If the new `mutationKey` differs from the previous one (and both were
	* defined), the observer is reset, detaching it from the mutation it was
	* observing. Otherwise, if the currently observed mutation is still
	* `pending`, its options are updated in place as well.
	*
	* @example
	* ```ts
	* observer.setOptions({
	*   mutationFn: (variables: { title: string }) => addPost(variables),
	*   onSuccess: (data) => console.log(data),
	* })
	* ```
	*/
	setOptions(options) {
		const prevOptions = this.options;
		this.options = this.#client.defaultMutationOptions(options);
		if (!shallowEqualObjects(this.options, prevOptions)) this.#client.getMutationCache().notify({
			type: "observerOptionsUpdated",
			mutation: this.#currentMutation,
			observer: this
		});
		if (prevOptions?.mutationKey && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) this.reset();
		else if (this.#currentMutation?.state.status === "pending") this.#currentMutation.setOptions(this.options);
	}
	onSubscribe() {
		if (this.listeners.size === 1 && this.#currentMutation) {
			this.#currentMutation.addObserver(this);
			this.#updateResult();
		}
	}
	onUnsubscribe() {
		if (!this.hasListeners()) this.#currentMutation?.removeObserver(this);
	}
	/** @internal */
	onMutationUpdate(action) {
		this.#updateResult();
		this.#notify(action);
	}
	/**
	* Returns the observer's current result, derived from the observed
	* mutation's state (or the default, `idle` state if no mutation has been
	* built yet, e.g. before the first `mutate()` call or after `reset()`).
	*/
	getCurrentResult() {
		return this.#currentResult;
	}
	/**
	* Detaches the observer from the mutation it is currently observing (if
	* any) and resets the observed result back to its default, `idle` state.
	*
	* This does not cancel an in-flight mutation; the mutation itself keeps
	* running to completion and its own callbacks still fire, but this
	* observer stops reflecting its state and a subsequent `mutate()` call
	* will build a brand new mutation.
	*
	* @example
	* ```ts
	* observer.reset()
	* ```
	*
	* @see {@link MutationObserver#mutate}
	*/
	reset() {
		this.#currentMutation?.removeObserver(this);
		this.#currentMutation = void 0;
		this.#updateResult();
		this.#notify();
	}
	/**
	* Builds a new `Mutation` in the `MutationCache` using the observer's
	* current options, detaches this observer from any previously observed
	* mutation, attaches it to the new one, and executes it with the given
	* variables.
	*
	* The optional per-call `options` (`onSuccess`/`onError`/`onSettled`) are
	* invoked once the mutation settles, in addition to any callbacks defined
	* on the observer's own options.
	*
	* @example
	* ```ts
	* await observer.mutate(
	*   { title: 'New post' },
	*   { onSuccess: (data) => console.log(data) },
	* )
	* ```
	*/
	mutate(variables, options) {
		this.#mutateOptions = options;
		this.#currentMutation?.removeObserver(this);
		this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
		this.#currentMutation.addObserver(this);
		return this.#currentMutation.execute(variables);
	}
	#updateResult() {
		const state = this.#currentMutation?.state ?? getDefaultState();
		this.#currentResult = {
			...state,
			isPending: state.status === "pending",
			isSuccess: state.status === "success",
			isError: state.status === "error",
			isIdle: state.status === "idle",
			mutate: this.mutate,
			reset: this.reset
		};
	}
	#notify(action) {
		notifyManager.batch(() => {
			if (this.#mutateOptions && this.hasListeners()) {
				const variables = this.#currentResult.variables;
				const onMutateResult = this.#currentResult.context;
				const context = {
					client: this.#client,
					meta: this.options.meta,
					mutationKey: this.options.mutationKey
				};
				if (action?.type === "success") {
					try {
						this.#mutateOptions.onSuccess?.(action.data, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#mutateOptions.onSettled?.(action.data, null, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
				} else if (action?.type === "error") {
					try {
						this.#mutateOptions.onError?.(action.error, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#mutateOptions.onSettled?.(void 0, action.error, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
				}
			}
			this.listeners.forEach((listener) => {
				listener(this.#currentResult);
			});
		});
	}
};
//#endregion
export { dehydrateQuery as n, hydrate as r, MutationObserver as t };
