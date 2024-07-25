/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/hng11-e0702.appspot.com/o/**",
      },
    ],
  },
};

export default nextConfig;
