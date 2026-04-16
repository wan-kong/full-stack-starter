import "@auth-provider/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	transpilePackages: ["@auth-provider/ui"],
	rewrites: () => {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.BACKEND_URL}/api/:path*`,
			},
		];
	},
};

export default nextConfig;
