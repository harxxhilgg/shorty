import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kdxnjjewxctmrlhsxmou.supabase.co",
      },
    ],
  },
};

export default nextConfig;
