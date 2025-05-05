// next.config.ts
import type { NextConfig } from "next";
import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
  outputFileTracingIncludes: {
    "./": ["**/*.sqlite*"],
  },
  experimental: {
    useCache: true,
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default withMDX(nextConfig);
