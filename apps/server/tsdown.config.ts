import { defineConfig } from "tsdown";

export default defineConfig({
	entry: "./src/index.ts",
	format: "esm",
	outDir: "./dist/tsdown",
	minify: true,
	clean: true,
	deps: {
		onlyBundle: false,
		alwaysBundle: [/@repo\/.*/],
	},
});
