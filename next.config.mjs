/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // script-src ichiga googletagmanager.com qo'shildi
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      // Google Analytics rasmlari va tracking piksellari uchun ruxsat berish
      "img-src 'self' data: blob: https: https://www.googletagmanager.com",
      "font-src 'self' data:",
      // Google Analytics'ga ma'lumot jo'natish (API so'rovlari) uchun ruxsat qo'shildi
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // 1. Redirectlar ro'yxati
  async redirects() {
    return [
      {
        source: "/uz/contact",
        destination: "/uz",
        permanent: true, // 301 Status Code (SEO uchun mos)
      },
      // Agar boshqa tillardagi contact sahifalarini ham yo'naltirmoqchi bo'lsangiz (masalan, /ru/contact -> /ru):
      // {
      //   source: "/:lang(uz|ru|en)/contact",
      //   destination: "/:lang",
      //   permanent: true,
      // }
    ];
  },

  // 2. Security Headerlar
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
