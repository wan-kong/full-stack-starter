import Bun, { type BunPlugin } from "bun";

const removeUnifyExport: BunPlugin = {
	name: "remove-unify-export",
	setup(build) {
		build.onEnd(() => {
			// todo maybe should remove `export { $minify }`
			// github.com/oven-sh/bun/issues/10880
		});
	},
};

await Bun.build({
	entrypoints: ["./src/index.ts"],
	minify: false,
	target: "bun",
	plugins: [removeUnifyExport],
});
console.log("✓ Built success");
