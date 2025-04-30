import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  outputFileTracingIncludes: {
    "./": ["**/*.sqlite*"],
  },
};

export default nextConfig;
