import Bun from "bun";

/**
 * TODO: Build with Bun
 */
await Bun.build({
	entrypoints: ["./src/index.ts"],
	minify: false,
	target: "bun",
	outdir: "./dist/bun",
});
console.log("✓ Built success");
