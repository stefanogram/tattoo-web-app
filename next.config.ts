
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  devIndicators: {
    allowedDevOrigins: [
      // This value is taken from the error log provided.
      // It might change if your Cloud Workstation URL changes.
      'http://9000-firebase-studio-1749252437459.cluster-axf5tvtfjjfekvhwxwkkkzsk2y.cloudworkstations.dev'
    ]
  }
};

export default nextConfig;
