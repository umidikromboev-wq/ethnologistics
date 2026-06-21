import "./globals.css";
import { Inter, Onest } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google"; // Google Analytics uchun

// Body — clean, legible, Cyrillic.
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
  metadataBase: new URL("https://ethnologistics.com"),
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
  alternates: { canonical: "https://ethnologistics.com" },
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
};

import Effects from "../components/Effects";
import { LangProvider } from "../components/LangProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${inter.variable} ${display.variable}`}>
      <body>
        <LangProvider>
          {children}
          <Effects />
        </LangProvider>
        <GoogleAnalytics gaId="G-X4Y0M2K1GQ" />
      </body>
    </html>
  );
}
