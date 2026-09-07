import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.207", "gpu-workstation.home.joecool.work"],
  // Produces .next/standalone: a self-contained server + only the
  // node_modules files actually needed at runtime. The Dockerfile copies
  // just that folder, so the image doesn't carry the full node_modules tree.
  output: "standalone",
};

export default nextConfig;
