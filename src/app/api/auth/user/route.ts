import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
	try {
		const { user } = await req.json();

		if (!user) {
			return new NextResponse("User data is missing", { status: 400 });
		}

		const { id, email, raw_user_meta_data } = user;

		// Check if a user with the same ID already exists
		const { data: existingUser, error: selectError } = await supabaseAdmin
			.from("users")
			.select("id")
			.eq("id", id)
			.single();

		if (selectError && selectError.code !== "PGRST116") {
			// PGRST116: "The result contains 0 rows" which is expected if user doesn't exist
			console.error("Error checking for existing user:", selectError);
			return new NextResponse("Internal Server Error", { status: 500 });
		}

		if (existingUser) {
			// Optionally, update the user's data if they already exist
			const { error: updateError } = await supabaseAdmin
				.from("users")
				.update({
					email: email,
					full_name: raw_user_meta_data?.full_name,
					updated_at: new Date().toISOString(),
				})
				.eq("id", id);

			if (updateError) {
				console.error("Error updating user:", updateError);
				return new NextResponse("Internal Server Error", { status: 500 });
			}

			return NextResponse.json({ message: "User updated successfully" });
		}

		// If user does not exist, create a new one
		const { error: insertError } = await supabaseAdmin.from("users").insert({
			id: id,
			email: email,
			full_name: raw_user_meta_data?.full_name,
		});

		if (insertError) {
			console.error("Error creating user:", insertError);
			return new NextResponse("Internal Server Error", { status: 500 });
		}

		return NextResponse.json({ message: "User created successfully" });
	} catch (error) {
		console.error("Error in /api/auth/user:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
