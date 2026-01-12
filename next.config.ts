import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Webpack config for handling cofhejs and Node.js modules
  webpack: (config, { isServer }) => {
    // Handle cofhejs and other packages that might need special handling
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Transpile packages that might have ES modules
  transpilePackages: ['cofhejs'],
};

export default nextConfig;
