import mongoose from "mongoose";
import { logger } from "./general";

const connection: { isConnected?: number } = {};

async function database() {
	if (connection.isConnected) {
		return;
	}

	const db = await mongoose.connect(process.env.MONGODB_URI as string);

	connection.isConnected = db.connections[0].readyState;
	logger("Database connected");
}

export const mongoClient = mongoose;

export default database;
