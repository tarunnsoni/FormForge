import { r as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as array, o as string, r as boolean, t as _enum } from "../_libs/zod.mjs";
import { r as sampleFormFromPrompt } from "./schema-B1NLzpVF.mjs";
import { t as createServerRpc } from "./createServerRpc--phiu8Av.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-fns-DWusb4DL.js
var fieldSchema = object({
	id: string(),
	type: _enum([
		"text",
		"textarea",
		"email",
		"number",
		"phone",
		"date",
		"select",
		"checkbox",
		"rating"
	]),
	label: string().min(1),
	placeholder: string().optional(),
	helpText: string().optional(),
	required: boolean().default(false),
	options: array(string()).optional(),
	minRating: number().optional(),
	maxRating: number().optional()
});
var generatedFormSchema = object({
	title: string().min(1),
	description: string().default(""),
	fields: array(fieldSchema).min(1).max(20)
});
var SYSTEM_PROMPT = `You are an expert form builder AI. Given a natural-language description, produce a well-structured form definition as STRICT JSON matching this TypeScript type:

{
  "title": string,            // short, human-readable form title
  "description": string,      // 1-2 sentence helper text shown at the top of the form
  "fields": Array<{
    "id": string,             // unique slug-like id, e.g. "full-name"
    "type": "text" | "textarea" | "email" | "number" | "phone" | "date" | "select" | "checkbox" | "rating",
    "label": string,          // the question text
    "placeholder"?: string,   // input placeholder where useful
    "helpText"?: string,      // small hint under the input where useful
    "required": boolean,
    "options"?: string[],     // ONLY for type "select" (2+ meaningful choices)
    "minRating"?: number,     // ONLY for type "rating" (usually 1 or 0)
    "maxRating"?: number      // ONLY for type "rating" (e.g. 5 or 10)
  }>
}

Rules:
- Return ONLY valid JSON. No markdown, no code fences, no commentary.
- Between 3 and 15 fields. Use the most appropriate field types.
- Only use "select" with concrete enumerable options; prefer free-input types otherwise.
- Mark only genuinely essential fields as required.
- Tailor labels, placeholders and help text to the described context and audience.`;
/**
* Tolerant JSON extraction: models sometimes wrap output in code fences or
* add stray prose. Pull out the first {...} block before parsing.
*/
function extractJson(text) {
	const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(text);
	const candidate = (fenced ? fenced[1] : text).trim();
	const start = candidate.indexOf("{");
	const end = candidate.lastIndexOf("}");
	if (start === -1 || end === -1 || end <= start) throw new Error("AI response did not contain a JSON object.");
	return candidate.slice(start, end + 1);
}
async function generateWithOpenAI(prompt) {
	const apiKey = process.env.OPENAI_API_KEY;
	const baseURL = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";
	const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
	const response = await fetch(`${baseURL}/chat/completions`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model,
			temperature: .4,
			messages: [{
				role: "system",
				content: SYSTEM_PROMPT
			}, {
				role: "user",
				content: `Create a form for the following request:\n\n"""${prompt}"""\n\nRespond with the JSON form definition only.`
			}]
		})
	});
	if (!response.ok) {
		const detail = await response.text().catch(() => "");
		throw new Error(`AI provider error (${response.status}): ${detail.slice(0, 300)}`);
	}
	const content = (await response.json()).choices?.[0]?.message?.content;
	if (!content) throw new Error("AI provider returned an empty response.");
	return generatedFormSchema.parse(JSON.parse(extractJson(content)));
}
var requestSchema = object({ prompt: string().trim().min(3, "Describe the form you want to create.") });
/**
* Server-side AI generation endpoint.
*
* Uses an OpenAI-compatible chat completions API when OPENAI_API_KEY is set.
* Falls back to a deterministic local heuristic generator so the builder flow
* works during development without provider keys.
*/
var generateFormFn_createServerFn_handler = createServerRpc({
	id: "bc0990a36884ea8bb1ed0182f085427a0da68ef8c0116df3a8619e919f404b59",
	name: "generateFormFn",
	filename: "src/lib/form-builder/server-fns.ts"
}, (opts) => generateFormFn.__executeServer(opts));
var generateFormFn = createServerFn({ method: "POST" }).inputValidator(requestSchema).handler(generateFormFn_createServerFn_handler, async ({ data }) => {
	if (process.env.OPENAI_API_KEY) return {
		form: await generateWithOpenAI(data.prompt),
		source: "ai"
	};
	await new Promise((resolve) => setTimeout(resolve, 600));
	return {
		form: sampleFormFromPrompt(data.prompt),
		source: "fallback"
	};
});
//#endregion
export { generateFormFn_createServerFn_handler };
