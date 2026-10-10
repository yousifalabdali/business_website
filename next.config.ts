import type { NextConfig } from "next";

// Allow next/image to load from whichever Supabase instance the env points to (cloud or local).
const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co");
const isLocalSupabase = ["localhost", "127.0.0.1"].includes(supabaseUrl.hostname);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      {
        protocol: supabaseUrl.protocol.replace(":", "") as "http" | "https",
        hostname: supabaseUrl.hostname,
        port: supabaseUrl.port,
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Only needed when Supabase runs on this machine; stays off for cloud Supabase on Vercel.
    dangerouslyAllowLocalIP: isLocalSupabase,
  },
  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
  },
};

export default nextConfig;
