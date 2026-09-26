import type { NextConfig } from "next";

const supabaseHost = "zqhpkxvhrpeyvcfmsuyf.supabase.co";
const isDevelopment = process.env.NODE_ENV === "development";

// Google Ads tag + conversions (loaded only after analytics consent).
const googleAdsScript = "https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com";
const googleAdsConnect = "https://www.google.com https://www.google.com.ar https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.googletagmanager.com";
const googleAdsImg = "https://googleads.g.doubleclick.net https://www.google.com https://www.google.com.ar https://www.googletagmanager.com";
const googleAdsFrame = "https://td.doubleclick.net https://www.googletagmanager.com";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com ${googleAdsScript}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://${supabaseHost} ${googleAdsImg}`,
  "font-src 'self' data:",
  `connect-src 'self' https://${supabaseHost} wss://${supabaseHost} https://challenges.cloudflare.com ${googleAdsConnect}`,
  `frame-src https://challenges.cloudflare.com ${googleAdsFrame}`,
  "media-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHost,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/botox-y-acido-hialuronico",
        destination: "/blog/toxina-botulinica-y-acido-hialuronico",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;
