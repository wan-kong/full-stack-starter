import { defineConfig } from "tsdown";

export default defineConfig({
	entry: "./src/index.ts",
	format: "esm",
	outDir: "./dist/tsdown",
	minify: false,
	clean: true,
	deps: {
		onlyBundle: false,
		alwaysBundle: [/@auth-provider\/.*/],
		neverBundle: ["uglify-js"],
	},
});
