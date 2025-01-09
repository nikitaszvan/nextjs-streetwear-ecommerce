// next.config.ts
import type { NextConfig } from "next";
import withSvgr from "next-svgr";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '.svg': ['@svgr/webpack']
      },

    },
  },
  images: {
    disableStaticImages: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.lummi.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// Wrap config with SVGR
export default withSvgr(nextConfig);