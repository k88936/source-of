import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/source-of',
  reactCompiler: true,
};

export default nextConfig;
