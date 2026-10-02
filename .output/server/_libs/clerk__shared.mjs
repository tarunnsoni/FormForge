import { C as PROD_API_URL, S as LOCAL_ENV_SUFFIXES, T as STAGING_ENV_SUFFIXES, _ as isDevelopmentFromPublishableKey, b as LEGACY_DEV_INSTANCE_SUFFIXES, w as STAGING_API_URL, x as LOCAL_API_URL, y as parsePublishableKey } from "./clerk__backend+clerk__shared.mjs";
//#region node_modules/@clerk/shared/dist/htmlSafeJson.mjs
var ESCAPE_REGEX = /[<>/\u2028\u2029]/g;
/**
* `JSON.stringify` that is safe to embed directly inside an HTML `<script>` element.
*
* `JSON.stringify` leaves `<`, `>` and `/` untouched, so a `<\/script>` substring in any
* string value would break out of the surrounding script block (XSS). Escaping those
* characters to their `\uXXXX` forms keeps the value byte-identical after `JSON.parse`
* while preventing the HTML parser from terminating the element early.
*/
function htmlSafeJson(value) {
	const json = JSON.stringify(value);
	if (json === void 0) return "undefined";
	return json.replace(ESCAPE_REGEX, (ch) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`);
}
//#endregion
//#region node_modules/@clerk/shared/dist/apiUrlFromPublishableKey.mjs
/**
* Get the correct API url based on the publishable key.
*
* @param publishableKey - The publishable key to parse.
* @returns One of Clerk's API URLs.
*/
var apiUrlFromPublishableKey = (publishableKey) => {
	const frontendApi = parsePublishableKey(publishableKey)?.frontendApi;
	if (frontendApi?.startsWith("clerk.") && LEGACY_DEV_INSTANCE_SUFFIXES.some((suffix) => frontendApi?.endsWith(suffix))) return PROD_API_URL;
	if (LOCAL_ENV_SUFFIXES.some((suffix) => frontendApi?.endsWith(suffix))) return LOCAL_API_URL;
	if (STAGING_ENV_SUFFIXES.some((suffix) => frontendApi?.endsWith(suffix))) return STAGING_API_URL;
	return PROD_API_URL;
};
//#endregion
//#region node_modules/@clerk/shared/dist/netlifyCacheHandler.mjs
/**
* Cache busting parameter for Netlify to prevent cached responses
* during handshake flows with Clerk development instances.
*
* Note: This query parameter will be removed in the "@clerk/clerk-js" package.
*
* @internal
*/
var CLERK_NETLIFY_CACHE_BUST_PARAM = "__clerk_netlify_cache_bust";
/**
* Returns true if running in a Netlify environment.
* Checks for Netlify-specific environment variables in process.env.
* Safe for browser and non-Node environments.
*/
function isNetlifyRuntime() {
	if (typeof process === "undefined" || !process.env) return false;
	return Boolean(process.env.NETLIFY) || Boolean(process.env.NETLIFY_FUNCTIONS_TOKEN) || typeof process.env.URL === "string" && process.env.URL.endsWith("netlify.app");
}
/**
* Prevents infinite redirects in Netlify's functions by adding a cache bust parameter
* to the original redirect URL. This ensures that Netlify doesn't serve a cached response
* during the handshake flow.
*
* The issue happens only on Clerk development instances running on Netlify. This is
* a workaround until we find a better solution.
*
* See https://answers.netlify.com/t/cache-handling-recommendation-for-authentication-handshake-redirects/143969/1.
*
* @internal
*/
function handleNetlifyCacheInDevInstance({ locationHeader, requestStateHeaders, publishableKey }) {
	const isOnNetlify = isNetlifyRuntime();
	const isDevelopmentInstance = isDevelopmentFromPublishableKey(publishableKey);
	if (isOnNetlify && isDevelopmentInstance) {
		if (!locationHeader.includes("__clerk_handshake")) {
			const url = new URL(locationHeader);
			url.searchParams.append(CLERK_NETLIFY_CACHE_BUST_PARAM, Date.now().toString());
			requestStateHeaders.set("Location", url.toString());
		}
	}
}
//#endregion
//#region node_modules/@clerk/shared/dist/patchRequest.mjs
/**
* Clones a request without its body or signal for authentication.
*
* @internal
*/
var patchRequest = (request) => {
	const clonedRequest = new Request(request.url, {
		headers: request.headers,
		method: request.method,
		redirect: request.redirect,
		cache: request.cache
	});
	if (clonedRequest.method !== "GET" && clonedRequest.body !== null && !("duplex" in clonedRequest)) clonedRequest.duplex = "half";
	return clonedRequest;
};
//#endregion
export { htmlSafeJson as i, handleNetlifyCacheInDevInstance as n, apiUrlFromPublishableKey as r, patchRequest as t };
