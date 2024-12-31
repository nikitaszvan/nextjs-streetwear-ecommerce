import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          icon: true, // Make SVG more icon-friendly
          svgo: true, // Optimize SVG
        }
      }]
    });
    return config;
  },
  images: {
    disableStaticImages: false, // Enable static image imports
    domains: ['assets.lummi.ai'], 
  }
};

export default nextConfig;