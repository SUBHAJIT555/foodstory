import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3lhyaytnudnz3.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
