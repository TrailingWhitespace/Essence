import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Treat the frontend folder as the root for Turbopack
    root: __dirname,
  },
};

export default nextConfig;


