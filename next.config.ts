import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'co.koko.toys',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ingecivilmantenimiento.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gardnerjardininfantil.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;