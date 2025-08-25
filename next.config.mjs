/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  async rewrites() {
    return [
      {
        source: "/study-in-:country",   // pattern for incoming requests
        destination: "/study-in/:country", // actual Next.js page
      },
    ];
  },
  // Fix for local development
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}

export default nextConfig
