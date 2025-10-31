/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; object-src 'none'; frame-ancestors 'none';" },
        ],
      },
    ];
  },
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
    unoptimized: false
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-*",
      "react-hook-form",
      "clsx",
      "tailwind-merge",
      "framer-motion",
      "react-slick",
      "react-day-picker",
      "sweetalert2",
      "yet-another-react-lightbox",
      "vaul",
      "keen-slider"],
  },

  compiler: {
    removeConsole: true,
  },

  compress: true,

  reactStrictMode: false,

  trailingSlash: false,

  poweredByHeader: false,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/study-in-:country",   // pattern for incoming requests
        destination: "/study-in/:country", // actual Next.js page
      },
    ];
  },
}

export default nextConfig
