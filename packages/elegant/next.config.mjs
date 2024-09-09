/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.githubusercontent.com',
        },
        {
          protocol: 'https',
          hostname: '**.r2.dev',
        },
      ],
  }
};

export default nextConfig;
