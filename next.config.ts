import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// 1. Hapus ": NextConfig" di sini agar objeknya fleksibel saat ditulis
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /* config options here jika ada */
};

// 2. Tegaskan tipenya sebagai NextConfig tepat saat dimasukkan ke dalam pembungkus next-intl
export default withNextIntl(nextConfig as NextConfig);
