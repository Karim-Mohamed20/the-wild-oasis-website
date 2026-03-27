/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next-deploy',
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qbiaxpyxpeljkgsbxlvq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
    ],
  },
};

export default nextConfig;
