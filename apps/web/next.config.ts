import "@auth-provider/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	transpilePackages: ["@auth-provider/ui"],
	redirects() {
		return [
			{
				source: "/api",
				permanent: false,
				destination: process.env.BACKEND_URL as string,
			},
		];
	},
};

export default nextConfig;
