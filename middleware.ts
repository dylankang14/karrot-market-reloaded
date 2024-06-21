import { NextRequest } from "next/server";
import { getSession } from "./lib/session";

const publicPath = new Set(["/", "/sms", "/login", "/create-account", "/github/start", "/github/complete"]);

export async function middleware(request: NextRequest) {
	const session = await getSession();
	const isPublicPath = publicPath.has(request.nextUrl.pathname);
	const isLoggedIn = Boolean(session.id);

	if (!isLoggedIn && !isPublicPath) {
		return Response.redirect(new URL("/", request.url));
	}
	if (isLoggedIn && isPublicPath) {
		return Response.redirect(new URL("/profile", request.url));
	}
	// if (request.nextUrl.pathname === "/profile") {
	// 	return Response.redirect(new URL("/", request.url));
	// }
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
