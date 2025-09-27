import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/configshub";
const client = new MongoClient(uri);

export default async function connectToDatabase() {
	try {
		await client.connect();
		return client.db("configshub");
	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
		throw error;
	}
}
