/** @type {import('next').NextConfig} */
const backend = process.env.BACKEND_URL || "http://localhost:5050";

const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api-backend/:path*",
				destination: `${backend}/api/:path*`,
			},
			{
				source: "/uploads/:path*",
				destination: `${backend}/uploads/:path*`,
			},
		];
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Cross-Origin-Opener-Policy",
						value: "same-origin-allow-popups",
					},
					{
						key: "Referrer-Policy",
						value: "no-referrer-when-downgrade",
					},
				],
			},
		];
	},
};

export default nextConfig;
