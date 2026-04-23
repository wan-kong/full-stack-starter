import logixlysia from "logixlysia";

export const loggerPlugin = logixlysia({
	config: {
		service: "Auth",
		ip: true,
		logFilePath: "./logs/app.log",
		logRotation: {
			maxSize: "100m",
			interval: "1d",
			maxFiles: "30d",
			compress: true,
		},
		startupMessageFormat: "banner",
	},
});
