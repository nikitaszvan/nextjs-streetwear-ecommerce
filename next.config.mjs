// next.config.mjs

import withSvgr from "next-svgr";
import autoCert from "anchor-pki/auto-cert/integrations/next";

// Define your Next.js configuration


const nextConfig = {
  reactStrictMode: false,
  experimental: {
    turbo: {
      rules: {
        '.svg': ['@svgr/webpack'],
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

// Wrap the configuration with SVGR
const withSvgrConfig = withSvgr(nextConfig);

// Apply autoCert configuration
const withAutoCert = autoCert({
  enabledEnv: "development",
});

// Export the final configuration
export default withAutoCert(withSvgrConfig);