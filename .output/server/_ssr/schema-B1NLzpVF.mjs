import { a as object, i as number, n as array, o as string, r as boolean, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schema-B1NLzpVF.js
var fieldTypeEnum = _enum([
	"text",
	"textarea",
	"email",
	"number",
	"phone",
	"date",
	"select",
	"checkbox",
	"rating"
]);
var formFieldSchema = object({
	id: string(),
	type: fieldTypeEnum,
	label: string().min(1),
	placeholder: string().optional(),
	helpText: string().optional(),
	required: boolean().default(false),
	options: array(string()).optional(),
	minRating: number().optional(),
	maxRating: number().optional()
});
var formDefinitionSchema = object({
	title: string().min(1),
	description: string().default(""),
	fields: array(formFieldSchema).min(1).max(20)
});
function createId() {
	return Math.random().toString(36).slice(2, 10);
}
function createEmptyField(type = "text") {
	return {
		id: createId(),
		type,
		label: "Untitled question",
		required: false,
		...type === "select" ? { options: ["Option 1", "Option 2"] } : {},
		...type === "rating" ? {
			minRating: 1,
			maxRating: 5
		} : {}
	};
}
/**
* Offline fallback used when no AI provider key is configured on the server.
* Produces a reasonable starting form from the user's prompt so the builder
* flow can be developed and demoed end-to-end without network access.
*/
function sampleFormFromPrompt(prompt) {
	const p = prompt.toLowerCase();
	const words = prompt.replace(/[^a-zA-Z\s]/g, "").trim().split(/\s+/).slice(0, 6).join(" ");
	const title = words ? words.charAt(0).toUpperCase() + words.slice(1) : "Untitled Form";
	const fields = [{
		id: createId(),
		type: "text",
		label: "Full name",
		placeholder: "Jane Doe",
		required: true
	}, {
		id: createId(),
		type: "email",
		label: "Email address",
		placeholder: "jane@example.com",
		required: true
	}];
	if (/rsvp|event|attend/.test(p)) fields.push({
		id: createId(),
		type: "select",
		label: "Will you be attending?",
		required: true,
		options: [
			"Yes",
			"No",
			"Maybe"
		]
	}, {
		id: createId(),
		type: "number",
		label: "Number of guests",
		placeholder: "1",
		required: false
	}, {
		id: createId(),
		type: "text",
		label: "Dietary preferences",
		placeholder: "Vegetarian, allergies...",
		required: false
	});
	else if (/job|application|hiring|candidate|resume/.test(p)) fields.push({
		id: createId(),
		type: "phone",
		label: "Phone number",
		placeholder: "+1 (555) 000-0000",
		required: false
	}, {
		id: createId(),
		type: "text",
		label: "Portfolio / LinkedIn URL",
		placeholder: "https://",
		required: false
	}, {
		id: createId(),
		type: "textarea",
		label: "Relevant experience",
		placeholder: "Tell us about your background...",
		required: true
	});
	else if (/waitlist|signup|sign-up|early access/.test(p)) fields.push({
		id: createId(),
		type: "text",
		label: "Company",
		placeholder: "Acme Inc.",
		required: false
	}, {
		id: createId(),
		type: "select",
		label: "Your role",
		required: false,
		options: [
			"Founder",
			"Product",
			"Engineering",
			"Marketing",
			"Other"
		]
	}, {
		id: createId(),
		type: "textarea",
		label: "What do you want to use the product for?",
		placeholder: "Describe your use case...",
		required: false
	});
	else if (/nps|csat|survey|feedback|review/.test(p)) fields.push({
		id: createId(),
		type: "rating",
		label: "How likely are you to recommend us?",
		minRating: 0,
		maxRating: 10,
		required: true
	}, {
		id: createId(),
		type: "select",
		label: "How satisfied are you overall?",
		required: true,
		options: [
			"Very satisfied",
			"Satisfied",
			"Neutral",
			"Dissatisfied"
		]
	}, {
		id: createId(),
		type: "textarea",
		label: "Additional comments",
		placeholder: "Anything else you would like to share?",
		required: false
	});
	else fields.push({
		id: createId(),
		type: "textarea",
		label: "Your response",
		placeholder: "Type here...",
		required: true
	}, {
		id: createId(),
		type: "checkbox",
		label: "I agree to be contacted about this request",
		required: false
	});
	return {
		title,
		description: `Generated from prompt: "${prompt.trim()}"`,
		fields
	};
}
//#endregion
export { formDefinitionSchema as n, sampleFormFromPrompt as r, createEmptyField as t };
