import { MongoClient } from "mongodb";

const uri = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
export default async function connectToDatabase() {
	if (!client.isConnected()) await client.connect();
	return client.db("mydatabase");
}
 export {}