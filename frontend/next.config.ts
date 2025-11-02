import type { NextConfig } from "next";

const API_URL = "http://localhost:8081";

const nextConfig: NextConfig = {
	output: "standalone",
	images: {
		domains: ["localhost"],
	},
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${API_URL}/:path*`,
			},
		];
	},
};

export default nextConfig;
