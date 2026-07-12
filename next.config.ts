import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
     {
        protocol: 'https',
        hostname: '**'
      },
     {
        protocol: 'http',
        hostname: '**'
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // উদাহরণস্বরূপ ImgBB এর জন্য
      },
      
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
