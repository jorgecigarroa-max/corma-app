import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática: `next build` genera ./out listo para Netlify.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
