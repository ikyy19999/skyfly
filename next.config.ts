import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push('@node-rs/bcrypt')

    return config
  },

  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'mfwesanxtivtlgkmpwbp.supabase.co'
        }
    ],
    unoptimized: true
  },
  experimental: {
    // missingSuspenseWithCSRBailout: false,
  }
};

export default nextConfig;