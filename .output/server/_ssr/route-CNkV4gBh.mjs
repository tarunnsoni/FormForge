import { Y as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as getGlobalStartContext } from "./getGlobalStartContext-BKHNvEuT.mjs";
import { o as getAuthObjectForAcceptedToken } from "../_libs/clerk__backend+clerk__shared.mjs";
import { t as errorThrower } from "./utils-BuRZoexi.mjs";
import { t as createServerRpc } from "./createServerRpc--phiu8Av.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CNkV4gBh.js
var createErrorMessage = (msg) => {
	return `🔒 Clerk: ${msg.trim()}

For more info, check out the docs: https://clerk.com/docs,
or come say hi in our discord server: https://clerk.com/discord

`;
};
createErrorMessage(`
  You're calling 'getAuth()' from a server function, without providing the request object.
  Example:

  export const someServerFunction = createServerFn({ method: 'GET' }).handler(async () => {
    const request = getWebRequest()
    const auth = getAuth(request);
    ...
  });
  `);
var clerkMiddlewareNotConfigured = createErrorMessage(`
It looks like you're trying to use Clerk without configuring the middleware.

To fix this, make sure you have the \`clerkMiddleware()\` configured in your \`createStart()\` function in your \`src/start.ts\` file.`);
var auth = (async (opts) => {
	const authObjectFn = getGlobalStartContext().auth;
	if (!authObjectFn) return errorThrower.throw(clerkMiddlewareNotConfigured);
	return getAuthObjectForAcceptedToken({
		authObject: await Promise.resolve(authObjectFn({ treatPendingAsSignedOut: opts?.treatPendingAsSignedOut })),
		acceptsToken: opts?.acceptsToken
	});
});
var getAuthState_createServerFn_handler = createServerRpc({
	id: "498068c5ea76fe1ce163da703854bd8d67efe71ace82012075cc2ce467377256",
	name: "getAuthState",
	filename: "src/routes/_authenticated/route.tsx"
}, (opts) => getAuthState.__executeServer(opts));
var getAuthState = createServerFn().handler(getAuthState_createServerFn_handler, async () => {
	const { isAuthenticated, userId } = await auth();
	if (!isAuthenticated) throw redirect({ to: "/" });
	return { userId };
});
//#endregion
export { getAuthState_createServerFn_handler };
