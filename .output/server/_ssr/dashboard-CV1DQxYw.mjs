import { i as __toESM } from "../_runtime.mjs";
import { b as require_react, y as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { C as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Input, t as Button } from "./input-DrxRAvqe.mjs";
import { n as Card, r as CardContent, t as Badge } from "./card-BYT9-oCN.mjs";
import { c as Sparkles, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { r as GreetingSection } from "./-components-CRUIwGQG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CV1DQxYw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var promptExamples = [
	{
		prompt: "Customer feedback",
		actualPrompt: "Create a customer feedback survey with NPS, CSAT scale, and open comments"
	},
	{
		prompt: "Frontend job application",
		actualPrompt: "Create a frontend developer job application form with personal details, experience, portfolio, and technical skills"
	},
	{
		prompt: "Event RSVP",
		actualPrompt: "Create an event RSVP form with attendee details, attendance confirmation, dietary preferences, and guest count"
	},
	{
		prompt: "Product waitlist",
		actualPrompt: "Create a product waitlist form with name, email, company, role, and what they want to use the product for"
	}
];
function RouteComponent() {
	const navigate = useNavigate();
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const handleGenerate = () => {
		if (!prompt.trim()) return;
		navigate({
			to: "/dashboard/forms/new",
			search: { prompt }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GreetingSection, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-7 overflow-hidden rounded-2xl border-neutral-200 bg-white shadow-none sm:mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold text-neutral-900",
									children: "Quick Generate with AI"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "border-0 bg-indigo-50 px-2 py-0.5 text-[9px] font-medium text-indigo-600",
									children: "AI Form Builder"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-[11px] text-neutral-400 sm:block",
							children: "Press Enter or click generate"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-2 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "ml-2 mr-2.5 size-4 shrink-0 text-indigo-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: prompt,
								onChange: (event) => setPrompt(event.target.value),
								onKeyDown: (event) => {
									if (event.key === "Enter") handleGenerate();
								},
								placeholder: "Describe the form you want to create...",
								className: "h-9 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0 sm:text-sm"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: handleGenerate,
							disabled: !prompt.trim(),
							className: "h-9 w-full shrink-0 rounded-lg bg-indigo-600 px-4 text-xs font-medium text-white shadow-none hover:bg-indigo-700 disabled:opacity-50 sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 size-3.5" }), "Generate Form"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-[10px] font-medium text-neutral-500",
							children: "Try a prompt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: promptExamples.map((example) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setPrompt(example.actualPrompt),
								className: "group flex max-w-full items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-left text-[10px] font-medium text-neutral-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: example.prompt
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3 shrink-0 transition-transform group-hover:translate-x-0.5" })]
							}, example.prompt))
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { RouteComponent as component };
