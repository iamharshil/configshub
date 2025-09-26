import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/utils/auth"; // path to your auth.ts file

export const { POST, GET } = toNextJsHandler(auth);
