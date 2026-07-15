import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      { hostname: "1wtfs41qct.ufs.sh", protocol: "https" }
    ]
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
