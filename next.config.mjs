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

  // Язык переехал в путь: /ru, /uz, /en, /kk, /ky, /tg. Старые адреса без
  // префикса отдают 308 на русскую версию — вес и внешние ссылки переходят
  // вместе с редиректом. Прежнее правило «/uz/contact → /» удалено: теперь
  // это настоящая страница узбекской версии, а не остаток старой схемы.
  async redirects() {
    const paths = [
      "/blog",
      "/stores",
      "/business",
      "/company",
      "/contact",
      "/how-it-works",
    ];
    return [
      { source: "/", destination: "/ru", permanent: true },
      ...paths.map((p) => ({ source: p, destination: `/ru${p}`, permanent: true })),
      { source: "/blog/:slug", destination: "/ru/blog/:slug", permanent: true },
      { source: "/dostavka/:slug", destination: "/ru/dostavka/:slug", permanent: true },
    ];
  },

  // 2. Security Headerlar
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
