import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Esta linea es para que sea web estatica. Si la quieres dinamica quitala:
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
