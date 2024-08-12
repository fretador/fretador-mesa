import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  // images: {
  //   loader: "custom",
  //   loaderFile: "./src/utils/imageLoader.js",
  // },
};

export default nextConfig;
