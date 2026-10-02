globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as NodeResponse, i as defineLazyEventHandler, l as serve, n as HTTPError, r as defineHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/-components-B8avumFo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152f4-ehmlAMQjGrf0lKlNY0qcixBFgK4\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 86772,
		"path": "../public/assets/-components-B8avumFo.js"
	},
	"/assets/_builder-DcPbVlBy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-izU4uXzbptyWNcrOARSxQ9+/xcY\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 159,
		"path": "../public/assets/_builder-DcPbVlBy.js"
	},
	"/assets/_slug-Cvel4tMi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-EcWNxKOUGt+AjxWz5taNQZt0oJM\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 128,
		"path": "../public/assets/_slug-Cvel4tMi.js"
	},
	"/assets/card-C_Maemj5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"722-2Y7CK3QhMfHl76DQaTEr1pevaNo\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 1826,
		"path": "../public/assets/card-C_Maemj5.js"
	},
	"/assets/clsx-Bex8X8Np.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69f-NYDpLCZNhx+p0ncZ15JDfVPFP+8\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 1695,
		"path": "../public/assets/clsx-Bex8X8Np.js"
	},
	"/assets/dashboard-CJfINX3i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db8-PYVczh3+HDkthKjRTTAetG8QLvY\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 3512,
		"path": "../public/assets/dashboard-CJfINX3i.js"
	},
	"/assets/forms-DbkHsB6Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-dVLnxRvuNuhknRegiyEqETcAhGA\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 175,
		"path": "../public/assets/forms-DbkHsB6Y.js"
	},
	"/assets/grip-vertical-XiRuHGHK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ef-t2sE7Z3xqSIAu9ANCP6oeq7jO6o\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 495,
		"path": "../public/assets/grip-vertical-XiRuHGHK.js"
	},
	"/assets/input-Boj1dAPM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c72-usOkIuKSTdnyp7xm4ses0nI5NgY\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 35954,
		"path": "../public/assets/input-Boj1dAPM.js"
	},
	"/assets/jsx-runtime-BkSabwWG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c1-VkW1xFbt56H2FC99QIi6PTzaFIo\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 961,
		"path": "../public/assets/jsx-runtime-BkSabwWG.js"
	},
	"/assets/route-BGSNY1u1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-kBEI7nHTflGSKMbSb1SpQJG7k9k\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 385,
		"path": "../public/assets/route-BGSNY1u1.js"
	},
	"/assets/new-RbLyq56c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea77-4NJYh3Lf9iORxCsbLES4B3spW9A\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 60023,
		"path": "../public/assets/new-RbLyq56c.js"
	},
	"/assets/route-DcPbVlBy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-izU4uXzbptyWNcrOARSxQ9+/xcY\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 159,
		"path": "../public/assets/route-DcPbVlBy.js"
	},
	"/assets/routes-CUGid4Qq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5984-3ITHjK8GmCK6sfoZ1q6yCsJBNJA\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 22916,
		"path": "../public/assets/routes-CUGid4Qq.js"
	},
	"/assets/settings-DiAuMFn6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c0-45eiqt7QvP7Y7PNfwr9OmoZhmtw\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 448,
		"path": "../public/assets/settings-DiAuMFn6.js"
	},
	"/assets/sparkles-BMbAOzKq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-SU/CA0uW23j+HJJ2lSYXmgfVG+4\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 482,
		"path": "../public/assets/sparkles-BMbAOzKq.js"
	},
	"/assets/useSelector-BoNYK1PX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"270b-U084C9Ohd31ksj7y5MsgCZ1KqcA\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 9995,
		"path": "../public/assets/useSelector-BoNYK1PX.js"
	},
	"/assets/styles-8EfA7plC.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1071b-RHEvXuBzcmtGfWop2esohoWNX8o\"",
		"mtime": "2026-10-02T09:09:56.678Z",
		"size": 67355,
		"path": "../public/assets/styles-8EfA7plC.css"
	},
	"/assets/index-BpXrf7tF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870d7-BOSxH4+3Xpnkksk6y5ThtOds2zw\"",
		"mtime": "2026-10-02T09:09:56.677Z",
		"size": 553175,
		"path": "../public/assets/index-BpXrf7tF.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_IO091Z = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_IO091Z
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
