import type { NextConfig } from "next";

const backendURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5052";
const IsDEV = backendURL.startsWith("http://localhost");
const backendWithoutTrailingSlash = backendURL.replace(/\/$/, "");
const backend = new URL(backendWithoutTrailingSlash);

// Image URLs from the API are used as-is (absolute). Add your production API host to remotePatterns if needed.
const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: IsDEV,
    remotePatterns: [
      {
        protocol: backend.protocol.replace(":", "") as "http" | "https",
        hostname: backend.hostname,
        port: backend.port || undefined,
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${backendWithoutTrailingSlash}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
