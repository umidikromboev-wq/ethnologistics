import "./globals.css";
import { Inter, Onest } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const display = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ethno-logistics.com/"),
  title: {
    default: "Ethno Logistics — международная доставка в Узбекистан",
    template: "%s · Ethno Logistics",
  },
  description:
    "Международная доставка и выкуп товаров из России, Казахстана, Турции, ОАЭ, Китая и Европы в Узбекистан с 2015 года. Ультра-срочно за 36 часов, выкуп ETHNO Buyer, расчёт стоимости за минуту, отслеживание. 8 складов в 8 странах, 4.7★ на Яндексе.",
  keywords: [
    "доставка в Узбекистан",
    "доставка Москва Ташкент",
    "доставка Алматы Ташкент",
    "карго из Китая",
    "доставка из Турции",
    "доставка из ОАЭ",
    "срочная доставка 36 часов",
    "выкуп товаров",
    "ETHNO Buyer",
    "международная логистика Ташкент",
  ],
  alternates: { canonical: "https://ethno-logistics.com/" },
  openGraph: {
    type: "website",
    locale: "ru_UZ",
    siteName: "Ethno Logistics",
    title: "Ethno Logistics — международная доставка в Узбекистан",
    description:
      "Ультра-срочная доставка за 36 часов, выкуп товаров под ключ, сложные грузы. 8 стран, расчёт стоимости за минуту. С 2015 года.",
  },
  verification: {
    google: "1NaT936chCZ-Y6EjwjDP-ybhUYFWr6NELFzQJK_VlZ8",
  },
  // Google va zamonaviy brauzerlar uchun Favicon sozlamalari
  icons: {
    icon: [
      { url: "/img/fim.png" },
      { url: "/img/fim.png" },
      { url: "/img/fim.png" },
    ],
    apple: [{ url: "/img/fim.png" }],
  },
};

import Effects from "../components/Effects";
import { LangProvider } from "../components/LangProvider";

export default function RootLayout({ children }) {
  const GA_ID = "G-5ETRNT482E";

  return (
    <html lang="ru" className={`${inter.variable} ${display.variable}`}>
      <head>
        {/* Google Analytics asosiy skripti */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        {/* Analytics sozlamalari va global telefon klikni kuzatuvchi kod */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');

            // Global telefon bosilishini kuzatish
            document.addEventListener("click", function(e) {
              const link = e.target.closest('a[href^="tel:"]');
              if (link && typeof gtag === 'function') {
                gtag('event', 'phone_click', {
                  'event_category': 'Contact',
                  'event_label': link.href,
                  'transport_type': 'beacon'
                });
              }
            });
          `}
        </Script>
      </head>
      <body>
        <LangProvider>
          {children}
          <Effects />
        </LangProvider>
      </body>
    </html>
  );
}
