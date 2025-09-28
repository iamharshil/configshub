import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	// The `/auth/callback` route is required for the server-side auth flow implemented
	// by the `@supabase/ssr` package. It exchanges an auth code for a session.
	if (request.nextUrl.pathname.startsWith("/auth/callback")) {
		return NextResponse.next();
	}

	// The `/dashboard` route is protected, and the user should be redirected to the
	// sign-in page if they are not authenticated.
	if (request.nextUrl.pathname.startsWith("/dashboard")) {
		let response = NextResponse.next({
			request: {
				headers: request.headers,
			},
		});

		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
			{
				cookies: {
					get(name: string) {
						return request.cookies.get(name)?.value;
					},
					set(name: string, value: string, options: CookieOptions) {
						request.cookies.set({
							name,
							value,
							...options,
						});
						response = NextResponse.next({
							request: {
								headers: request.headers,
							},
						});
						response.cookies.set({
							name,
							value,
							...options,
						});
					},
					remove(name: string, options: CookieOptions) {
						request.cookies.set({
							name,
							value: "",
							...options,
						});
						response = NextResponse.next({
							request: {
								headers: request.headers,
							},
						});
						response.cookies.set({
							name,
							value: "",
							...options,
						});
					},
				},
			},
		);

		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			return NextResponse.redirect(new URL("/auth/signin", request.url));
		}

		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/auth/callback", "/dashboard/:path*"],
};
