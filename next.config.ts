import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  images: {
    domains: ["kdxnjjewxctmrlhsxmou.supabase.co"], // In case we use images from Supabase
  },
  eslint: {
    ignoreDuringBuilds: true, // Optional but common in quick prototypes
  },
  typescript: {
    ignoreBuildErrors: true, // Optional but common in quick prototypes
  },
};

export default nextConfig;
