import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["192.168.68.55"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.uagc.edu",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.uagc.edu",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
