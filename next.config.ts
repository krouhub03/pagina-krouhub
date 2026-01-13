import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore - Turbopack is still experimental in some versions
  turbopack: {
    root: process.cwd(),
  },
  env: {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  },
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