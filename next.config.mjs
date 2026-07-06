/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Brand imagery lives in /public/assets. Allow large editorial PNGs.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
