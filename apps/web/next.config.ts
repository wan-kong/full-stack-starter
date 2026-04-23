import "@repo/env/web";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	pageExtensions: ["ts", "tsx", "md", "mdx"],
	typedRoutes: true,
	reactCompiler: true,
	transpilePackages: ["@repo/ui"],
	rewrites: () => {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.BACKEND_URL}/api/:path*`,
			},
		];
	},
};

export default createMDX({
	extension: /\.(md|mdx)$/,
	options: {
		remarkPlugins: ["remark-gfm"],
	},
})(nextConfig);
