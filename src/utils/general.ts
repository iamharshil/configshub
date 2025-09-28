export function logger(message: string, object?: unknown) {
	console.log(`[LOG] ${new Date().toISOString()} --> ${message}\n`);
	if (object) {
		console.log(object);
	}
}
