"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { logger } from "@/utils/general";

export default function AuthCallback() {
	const router = useRouter();

	useEffect(() => {
		let cancelled = false;
		let retryCount = 0;
		const maxRetries = 3;

		const checkSession = async () => {
			try {
				// Supabase handles token exchange via hash params automatically when the client loads.
				const { data } = await supabase.auth.getSession();
				logger("OAuth callback session:", data.session);

				if (!cancelled) {
					if (data.session) {
						// Log successful authentication
						try {
							await fetch("/api/auth/user", {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({ user: data.session.user }),
							});
							await fetch("/api/auth/log-session", {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({
									user: data.session.user,
									event_type: "oauth_login",
								}),
							});
						} catch (apiError) {
							console.error("Error during post-login API calls:", apiError);
						}

						router.replace("/dashboard");
					} else if (retryCount < maxRetries) {
						// Retry after a short delay
						retryCount++;
						setTimeout(checkSession, 1000);
					} else {
						router.replace("/auth/signin?error=Authentication failed. Please try again.");
					}
				}
			} catch (error) {
				console.error("Auth callback error:", error);
				if (!cancelled) {
					router.replace("/auth/signin?error=Authentication error occurred.");
				}
			}
		};

		// Initial check
		checkSession();

		// Timeout fallback
		const timeout = setTimeout(() => {
			if (!cancelled) {
				router.replace("/auth/signin?error=Authentication timed out.");
			}
		}, 15000); // 15 second timeout

		return () => {
			cancelled = true;
			clearTimeout(timeout);
		};
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
			<div className="text-center">
				<Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
				<p className="text-gray-600 dark:text-gray-400">Finalizing authentication...</p>
			</div>
		</div>
	);
}
