"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInWithGoogle() {
	const supabase = await createClient();
	const headersList = await headers();
	const origin = headersList.get("origin");

	if (!origin) {
		return redirect("/auth/signin?error=Missing origin header");
	}

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		console.error("Error signing in with Google:", error);
		return redirect("/auth/signin?error=Could not authenticate user");
	}

	if (data.url) {
		redirect(data.url);
	} else {
		return redirect("/auth/signin?error=Could not get Google auth URL");
	}
}
