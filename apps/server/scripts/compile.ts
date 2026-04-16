import Bun, { type BunPlugin } from "bun";

const targets: Bun.Build.CompileTarget[] = [
	"bun-linux-x64",
	"bun-darwin-arm64",
];

const removeUnifyExport: BunPlugin = {
	name: "remove-unify-export",
	setup(build) {
		build.onEnd(() => {
			// todo maybe should remove `export { $minify }`
			// github.com/oven-sh/bun/issues/10880
		});
	},
};

for (const target of targets) {
	const outFile = `./build/auth-${target.split("-").slice(1).join("-")}`;
	await Bun.build({
		entrypoints: ["./dist/tsdown/index.mjs"],
		compile: {
			target,
			outfile: outFile,
		},
		bytecode: true,
		minify: false,
		plugins: [removeUnifyExport],
	});
	console.log(`✓ Built success for ${target}`);
}
