import "../globals.css";
import { Inter, Onest } from "next/font/google";
import Script from "next/script";
import {
  LOCALES,
  normalizeLang,
  alternatesFor,
  tr,
  SITE_ORIGIN,
  OG_LOCALE,
} from "../../lib/locales";

const DOMAIN_ROOT = "https://ethno-logistics.com";

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

const META = {
  title: "Ethno Logistics — международная доставка в Узбекистан",
  description:
    "Международная доставка и выкуп товаров из России, Казахстана, Турции, ОАЭ, Китая и Европы в Узбекистан с 2015 года. Ультра-срочно за 36 часов, выкуп ETHNO Buyer, расчёт стоимости за минуту, отслеживание. 8 складов в 8 странах, 4.7★ на Яндексе.",
  ogDescription:
    "Ультра-срочная доставка за 36 часов, выкуп товаров под ключ, сложные грузы. 8 стран, расчёт стоимости за минуту. С 2015 года.",
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = normalizeLang(resolvedParams.lang);

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: {
      default: tr(META.title, lang),
      template: "%s · Ethno Logistics",
    },
    description: tr(META.description, lang),
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
    // Alternates va Canonical to'g'ri shakllanganini tekshirish lozim
    alternates: alternatesFor("/", lang),
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang],
      siteName: "Ethno Logistics",
      title: tr(META.title, lang),
      description: tr(META.ogDescription, lang),
      url: `${SITE_ORIGIN}/${lang}`,
    },
    verification: {
      google: "1NaT936chCZ-Y6EjwjDP-ybhUYFWr6NELFzQJK_VlZ8",
    },
    icons: {
      icon: [
        { url: `${DOMAIN_ROOT}/favicon.ico`, sizes: "any" },
        { url: `${DOMAIN_ROOT}/img/film.png`, type: "image/png" },
      ],
      apple: [{ url: `${DOMAIN_ROOT}/img/film.png` }],
    },
  };
}

import Effects from "../../components/Effects";
import LeadModal from "../../components/LeadModal";
import { LangProvider } from "../../components/LangProvider";

export default async function RootLayout({ children, params }) {
  const GA_ID = "G-N6DTQPLZVJ";
  const resolvedParams = await params;
  const lang = normalizeLang(resolvedParams.lang);

  const currentUrl = `${SITE_ORIGIN}/${lang}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LogisticsService",
        "@id": currentUrl,
        name: "Ethno Logistics",
        url: currentUrl,
        logo: `${DOMAIN_ROOT}/img/film.png`,
        description:
          "Международная доставка и выкуп товаров из России, Казахстана, Турции, ОАЭ, Китая и Европы в Узбекистан с 2015 года.",
        areaServed: [
          { "@type": "Country", name: "Uzbekistan" },
          { "@type": "Country", name: "Russia" },
          { "@type": "Country", name: "Kazakhstan" },
          { "@type": "Country", name: "Turkey" },
          { "@type": "Country", name: "UAE" },
          { "@type": "Country", name: "China" },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name:
              lang === "uz"
                ? "O'zbekistonga xalqaro tezkor yuk yetkazib berish xizmati qanday ishlaydi?"
                : "Как работает ультра-срочная международная доставка в Узбекистан?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                lang === "uz"
                  ? "Ethno Logistics 2015-yildan beri Rossiya, Qozog'iston, Turkiya, BAA, Xitoy va Yevropadan O'zbekistonga 36 soatgacha bo'lgan muddatda ultrasrochniy yuk yetkazib beradi."
                  : "Ethno Logistics с 2015 года осуществляет ультра-срочную доставку грузов и товаров из России, Казахстана, Турции, ОАЭ, Китая и Европы в Узбекистан за время от 36 часов.",
            },
          },
          {
            "@type": "Question",
            name:
              lang === "uz"
                ? "ETHNO Buyer orqali xorijdan tovarlarni sotib olish (выкуп) imkoni bormi?"
                : "Как выкупить товары из зарубежных магазинов через ETHNO Buyer?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                lang === "uz"
                  ? "ETHNO Buyer xizmati orqali xorijiy internet-do'konlardan tovarlarni kalit topshirish sharti bilan sotib olish va O'zbekistonga yetkazib berishni rasmiylashtirishingiz mumkin."
                  : "Сервис ETHNO Buyer позволяет выкупать товары под ключ из зарубежных интернет-магазинов и производить доставку прямо в Узбекистан.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang={lang} className={`${inter.variable} ${display.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LangProvider lang={lang}>
          {children}
          <Effects />
          <LeadModal />
        </LangProvider>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');

            document.addEventListener("click", function(e) {
              const link = e.target.closest('a[href^="tel:"]');
              if (link && typeof window.gtag === 'function') {
                window.gtag('event', 'phone_click', {
                  'event_category': 'Contact',
                  'event_label': link.href,
                  'transport_type': 'beacon'
                });
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
