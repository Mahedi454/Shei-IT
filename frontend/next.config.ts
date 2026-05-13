import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
  },
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
