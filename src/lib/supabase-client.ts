import { createBrowserClient } from "@supabase/ssr";

/*
 * Resolves Supabase public URL and anon/publishable key with flexibility in env naming.
 * Accepts either the conventional NEXT_PUBLIC_SUPABASE_ANON_KEY or the existing
 * NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY used earlier in the project.
 */
function resolveSupabaseEnv() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
	if (!url || !anonKey) {
		if (typeof window !== "undefined") {
			// eslint-disable-next-line no-console
			console.warn(
				"[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY). Auth will fail.",
			);
		}
	}
	return { url: url as string, anonKey: anonKey as string };
}

export function createClient() {
	const { url, anonKey } = resolveSupabaseEnv();
	return createBrowserClient(url, anonKey);
}

// A shared browser instance; create ad‑hoc clients via createClient() if needed.
export const supabase = createClient();
