import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const basePath = isGitHubPages ? "/brainstorming-weblayout" : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : "standalone",
  basePath,
  assetPrefix: isGitHubPages ? "/brainstorming-weblayout/" : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: { root: "." },
  allowedDevOrigins: ["192.168.68.55", "192.168.68.66"],
  images: {
    unoptimized: isGitHubPages,
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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
