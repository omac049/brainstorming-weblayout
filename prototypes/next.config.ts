import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : "standalone",
  basePath: isGitHubPages ? "/brainstorming-weblayout" : "",
  assetPrefix: isGitHubPages ? "/brainstorming-weblayout/" : undefined,
  turbopack: { root: "." },
  allowedDevOrigins: ["192.168.68.55"],
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
    ],
  },
};

export default nextConfig;
