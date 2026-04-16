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
		// about why should set ,see  https://github.com/mjmlio/mjml/issues/2772
		neverBundle: ["uglify-js"],
	},
});
