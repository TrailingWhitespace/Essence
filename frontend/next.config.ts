import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Always resolve to the directory where this file lives
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
