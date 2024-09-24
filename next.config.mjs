/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dev-uploadphotos.s3.us-east-1.amazonaws.com"],
    // Adicione esta linha
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    });

    return config;
  },
};

export default nextConfig;
