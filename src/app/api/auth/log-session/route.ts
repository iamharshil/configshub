import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
	try {
		const { user, event_type } = await req.json();

		if (!user || !event_type) {
			return new NextResponse("Missing user or event_type", { status: 400 });
		}

		// Get IP address and user agent from headers
		const headersList = headers();
		const ip_address = (await headersList).get("x-forwarded-for") ?? "unknown";
		const user_agent = (await headersList).get("user-agent") ?? "unknown";

		const { error } = await supabaseAdmin.from("session_history").insert({
			user_id: user.id,
			event_type: event_type,
			ip_address: ip_address,
			user_agent: user_agent,
		});

		if (error) {
			console.error("Error logging session event:", error);
			// We don't want to block the user flow, so we'll just log the error
			// and return a success response.
		}

		return NextResponse.json({ message: "Session event logged" });
	} catch (error) {
		console.error("Error in /api/auth/log-session:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
