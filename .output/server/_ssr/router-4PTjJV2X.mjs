import { i as __toESM } from "../_runtime.mjs";
import { b as require_react, r as InternalClerkProvider, u as QueryClient, y as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { C as useNavigate, b as createFileRoute, d as Scripts, f as HeadContent, g as createRouter, p as useLocation, v as ScriptOnce, x as createRootRouteWithContext, y as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TSS_SERVER_FUNCTION, o as getServerFnById, r as createServerFn } from "./ssr.mjs";
import { t as getGlobalStartContext } from "./getGlobalStartContext-BKHNvEuT.mjs";
import { n as isClient } from "./utils-BuRZoexi.mjs";
import { t as getPublicEnvVariables } from "./env-ChQqCZZi.mjs";
import { a as object, o as string } from "../_libs/zod.mjs";
import { i as htmlSafeJson } from "../_libs/clerk__shared.mjs";
import { t as setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rolldown-runtime-BBjsoOtd.js
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-4PTjJV2X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ClerkOptionsCtx = import_react.createContext(void 0);
ClerkOptionsCtx.displayName = "ClerkOptionsCtx";
var ClerkOptionsProvider = (props) => {
	const { children, options } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClerkOptionsCtx.Provider, {
		value: { value: options },
		children
	});
};
var useAwaitableNavigate = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const resolveFunctionsRef = import_react.useRef([]);
	const resolveAll = () => {
		resolveFunctionsRef.current.forEach((resolve) => resolve());
		resolveFunctionsRef.current.splice(0, resolveFunctionsRef.current.length);
	};
	const [_, startTransition] = (0, import_react.useTransition)();
	import_react.useEffect(() => {
		resolveAll();
	}, [location]);
	return (options) => {
		return new Promise((res) => {
			startTransition(() => {
				resolveFunctionsRef.current.push(res);
				res(navigate(options));
			});
		});
	};
};
var pickFromClerkInitState = (clerkInitState) => {
	const { __clerk_ssr_state, __publishableKey, __proxyUrl, __domain, __isSatellite, __signInUrl, __signUpUrl, __clerkJSUrl, __clerkJSVersion, __clerkUIUrl, __clerkUIVersion, __telemetryDisabled, __telemetryDebug, __unsafeDisableDevelopmentModeConsoleWarning, __signInForceRedirectUrl, __signUpForceRedirectUrl, __signInFallbackRedirectUrl, __signUpFallbackRedirectUrl, __prefetchUI } = clerkInitState || {};
	return {
		clerkSsrState: __clerk_ssr_state,
		publishableKey: __publishableKey,
		proxyUrl: __proxyUrl,
		domain: __domain,
		isSatellite: !!__isSatellite,
		signInUrl: __signInUrl,
		signUpUrl: __signUpUrl,
		__internal_clerkJSUrl: __clerkJSUrl,
		__internal_clerkJSVersion: __clerkJSVersion,
		__internal_clerkUIUrl: __clerkUIUrl,
		__internal_clerkUIVersion: __clerkUIVersion,
		prefetchUI: __prefetchUI,
		telemetry: {
			disabled: __telemetryDisabled,
			debug: __telemetryDebug
		},
		unsafe_disableDevelopmentModeConsoleWarning: __unsafeDisableDevelopmentModeConsoleWarning,
		signInForceRedirectUrl: __signInForceRedirectUrl,
		signUpForceRedirectUrl: __signUpForceRedirectUrl,
		signInFallbackRedirectUrl: __signInFallbackRedirectUrl,
		signUpFallbackRedirectUrl: __signUpFallbackRedirectUrl
	};
};
var mergeWithPublicEnvs = (restInitState) => {
	const envVars = getPublicEnvVariables();
	return {
		...restInitState,
		publishableKey: restInitState.publishableKey || envVars.publishableKey,
		domain: restInitState.domain || envVars.domain,
		isSatellite: restInitState.isSatellite || envVars.isSatellite,
		signInUrl: restInitState.signInUrl || envVars.signInUrl,
		signUpUrl: restInitState.signUpUrl || envVars.signUpUrl,
		__internal_clerkJSUrl: restInitState.__internal_clerkJSUrl || envVars.clerkJsUrl,
		__internal_clerkJSVersion: restInitState.__internal_clerkJSVersion || envVars.clerkJsVersion,
		__internal_clerkUIUrl: restInitState.__internal_clerkUIUrl || envVars.clerkUIUrl,
		__internal_clerkUIVersion: restInitState.__internal_clerkUIVersion || envVars.clerkUIVersion,
		signInForceRedirectUrl: restInitState.signInForceRedirectUrl,
		prefetchUI: restInitState.prefetchUI ?? envVars.prefetchUI,
		unsafe_disableDevelopmentModeConsoleWarning: restInitState.unsafe_disableDevelopmentModeConsoleWarning ?? envVars.unsafeDisableDevelopmentModeConsoleWarning
	};
};
/**
* Parses a URL string into TanStack Router navigation options.
* TanStack Router doesn't parse query strings from the `to` parameter,
* so we need to extract pathname, search params, and hash separately.
*/
function parseUrlForNavigation(to, baseUrl) {
	const url = new URL(to, baseUrl);
	const searchParams = Object.fromEntries(url.searchParams);
	return {
		to: url.pathname,
		search: Object.keys(searchParams).length > 0 ? searchParams : void 0,
		hash: url.hash ? url.hash.slice(1) : void 0
	};
}
var SDK_METADATA = {
	name: "@clerk/tanstack-react-start",
	version: "1.6.1"
};
var awaitableNavigateRef = { current: void 0 };
function ClerkProvider({ children, ...providerProps }) {
	const awaitableNavigate = useAwaitableNavigate();
	const clerkInitialState = getGlobalStartContext()?.clerkInitialState ?? {};
	(0, import_react.useEffect)(() => {
		awaitableNavigateRef.current = awaitableNavigate;
	}, [awaitableNavigate]);
	const { clerkSsrState, ...restInitState } = pickFromClerkInitState((isClient() ? window.__clerk_init_state : clerkInitialState)?.__internal_clerk_state);
	const mergedProps = {
		...mergeWithPublicEnvs(restInitState),
		...providerProps
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptOnce, { children: `window.__clerk_init_state = ${htmlSafeJson(clerkInitialState)};` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClerkOptionsProvider, {
		options: mergedProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalClerkProvider, {
			initialState: clerkSsrState,
			sdkMetadata: SDK_METADATA,
			routerPush: (to) => {
				const { search, hash, ...rest } = parseUrlForNavigation(to, window.location.origin);
				return awaitableNavigateRef.current?.({
					...rest,
					search,
					hash,
					replace: false
				});
			},
			routerReplace: (to) => {
				const { search, hash, ...rest } = parseUrlForNavigation(to, window.location.origin);
				return awaitableNavigateRef.current?.({
					...rest,
					search,
					hash,
					replace: true
				});
			},
			...mergedProps,
			children
		})
	})] });
}
ClerkProvider.displayName = "ClerkProvider";
function AppClerkProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClerkProvider, { children });
}
var styles_default = "/assets/styles-8EfA7plC.css";
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TanStack Start Starter" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppClerkProvider, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var $$splitComponentImporter$8 = () => import("./routes-UH-46Xo1.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var $$splitComponentImporter$7 = () => import("./route-tN1DKxcP.mjs");
var getAuthState = createServerFn().handler(createSsrRpc("498068c5ea76fe1ce163da703854bd8d67efe71ace82012075cc2ce467377256"));
var Route$7 = createFileRoute("/_authenticated")({
	beforeLoad: async () => {
		return await getAuthState();
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_builder-SRnm2i0U.mjs");
var Route$6 = createFileRoute("/_authenticated/_builder")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./route-BrRErlq8.mjs");
var Route$5 = createFileRoute("/_authenticated/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("../_slug-d3ZWSZP9.mjs");
var Route$4 = createFileRoute("/f/$slug")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./dashboard-CV1DQxYw.mjs");
var Route$3 = createFileRoute("/_authenticated/dashboard/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./settings-D7yqmzRA.mjs");
var Route$2 = createFileRoute("/_authenticated/dashboard/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./forms-BnZviOwv.mjs");
var Route$1 = createFileRoute("/_authenticated/dashboard/forms/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./new-DRnADuhK.mjs");
var Route = createFileRoute("/_authenticated/_builder/dashboard/forms/new")({
	validateSearch: object({ prompt: string().trim().default("") }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AuthenticatedRouteRoute = Route$7.update({
	id: "/_authenticated",
	getParentRoute: () => Route$9
});
var AuthenticatedBuilderRoute = Route$6.update({
	id: "/_builder",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRouteRoute = Route$5.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var FSlugRoute = Route$4.update({
	id: "/f/$slug",
	path: "/f/$slug",
	getParentRoute: () => Route$9
});
var AuthenticatedDashboardIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedDashboardRouteRoute
});
var AuthenticatedDashboardSettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedDashboardRouteRoute
});
var AuthenticatedDashboardFormsIndexRoute = Route$1.update({
	id: "/forms/",
	path: "/forms/",
	getParentRoute: () => AuthenticatedDashboardRouteRoute
});
var AuthenticatedBuilderDashboardFormsNewRoute = Route.update({
	id: "/dashboard/forms/new",
	path: "/dashboard/forms/new",
	getParentRoute: () => AuthenticatedBuilderRoute
});
var AuthenticatedDashboardRouteRouteChildren = {
	AuthenticatedDashboardSettingsRoute,
	AuthenticatedDashboardIndexRoute,
	AuthenticatedDashboardFormsIndexRoute
};
var AuthenticatedDashboardRouteRouteWithChildren = AuthenticatedDashboardRouteRoute._addFileChildren(AuthenticatedDashboardRouteRouteChildren);
var AuthenticatedBuilderRouteChildren = { AuthenticatedBuilderDashboardFormsNewRoute };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedDashboardRouteRoute: AuthenticatedDashboardRouteRouteWithChildren,
	AuthenticatedBuilderRoute: AuthenticatedBuilderRoute._addFileChildren(AuthenticatedBuilderRouteChildren)
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	FSlugRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
function getContext() {
	return { queryClient: new QueryClient() };
}
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	const context = getContext();
	const router = createRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultNotFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Page not found." })
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient: context.queryClient
	});
	return router;
}
//#endregion
export { __exportAll as a, ClerkProvider as i, Route as n, __reExport as o, createSsrRpc as r, router_exports as t };
