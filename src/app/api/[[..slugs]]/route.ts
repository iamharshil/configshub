import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" })
	.get("/", "Hello, World!")
	.post("/", ({ body }) => body, {
		body: t.Object({
			name: t.String(),
		}),
	});

export const GET = app.get;
export const POST = app.post;
export const PUT = app.put;
export const DELETE = app.delete;

export type app = typeof app;
