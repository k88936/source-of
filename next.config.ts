import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: '/source-of',
  reactCompiler: true,
};

export default nextConfig;
