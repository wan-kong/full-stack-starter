import { defineConfig } from "bumpp";

export default defineConfig({
	all: true,
	commit: "release: v%s",
	tag: "v%s",
	push: true,
	recursive: true,
});
