"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { logger } from "@/utils/general";

export default function AuthCallback() {
	const router = useRouter();

	useEffect(() => {
		let cancelled = false;
		(async () => {
			// Supabase handles token exchange via hash params automatically when the client loads.
			const { data } = await supabase.auth.getSession();
			logger("OAuth callback session:", data.session);
			if (!cancelled) {
				if (data.session) {
					router.replace("/dashboard");
				} else {
					router.replace("/auth/signin?error=oob");
				}
			}
		})();
		return () => {
			cancelled = true;
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
