import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loremflickr.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "wuncykkbpxzbqyhdngzx.supabase.co",
                port: "",
                pathname: "/**",
            },
        ],
    },
    /* config options here */
};

export default nextConfig;