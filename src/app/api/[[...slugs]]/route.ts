import { Elysia, t } from "elysia";

const auth = new Elysia({ prefix: "/auth " }).post(
	"/signup",
	({ body }) => body,
	{
		body: t.Object({
			name: t.String(),
		}),
	},
);

const app = new Elysia({ prefix: "/api" }).get("/", "Hello, World!").use(auth);
// .post("/", ({ body }) => body, {
// 	body: t.Object({
// 		name: t.String(),
// 	}),
// });

// Export type for Eden Treaty
export type App = typeof app;

// Export HTTP method handlers
export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
