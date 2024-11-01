/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Add this line for Cloudinary
      },
    ],
  },
};

export default nextConfig;
