// next.config.ts
import type { NextConfig } from "next";
import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: "/OSMNL_Square.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default withMDX(nextConfig);
