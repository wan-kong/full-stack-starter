import Bun from "bun";

await Bun.build({
	entrypoints: ["./src/index.ts"],
	minify: false,
	sourcemap: false,
	target: "bun",
	outdir: "./dist/bun",
});
console.log("✓ Built success");
