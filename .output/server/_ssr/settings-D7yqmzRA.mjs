import { i as __toESM } from "../_runtime.mjs";
import { y as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { _ as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-D7yqmzRA.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold text-neutral-900",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-neutral-500",
				children: "Workspace settings are coming soon."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		]
	});
}
//#endregion
export { RouteComponent as component };
