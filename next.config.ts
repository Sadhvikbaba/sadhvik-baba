import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.leetcode.com",
        pathname: "/**"
      }
    ]
  },
};

export default nextConfig;
