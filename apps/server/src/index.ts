import cluster from "node:cluster";
import os from "node:os";
import process from "node:process";
export const run = async () => {
	if (cluster.isPrimary) {
		for (let i = 0; i < os.availableParallelism(); i++) {
			cluster.fork();
		}
	} else {
		const { startServer } = await import("./server");
		startServer();
		console.log(`Worker ${process.pid} started`);
	}
};

run();
