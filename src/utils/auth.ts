import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/database");
const db = client.db();

export const auth = betterAuth({
	database: mongodbAdapter(db, {
		// Optional: if you don't provide a client, database transactions won't be enabled.
		client,
	}),
	baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000",
	secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-key",
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
});
