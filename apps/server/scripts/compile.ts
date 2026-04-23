import Bun from "bun";

const targets: Bun.Build.CompileTarget[] = [
	"bun-linux-x64",
	"bun-darwin-arm64",
];

for (const target of targets) {
	const outFile = `./build/auth-${target.split("-").slice(1).join("-")}`;
	await Bun.build({
		entrypoints: ["./src/index.ts"],
		compile: {
			target,
			outfile: outFile,
		},
		target: "bun",
		// bytecode: true,
		minify: false,
	});
	console.log(`✓ Built success for ${target} at ${outFile}`);
}
