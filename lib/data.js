// Ethno Logistics — real data from the client brief (2026-06-16) + real tariff sheet.
// Brief: ~/Downloads/ethno-brief.md · Tariffs: scraped from ru.ethnologistics.com/ru/tariffs

export const CONTACT = {
  phone: "+998 78 150 15 15",
  phoneHref: "tel:+998781501515",
  telegram: "https://t.me/ethnologisticsbot", // их официальный бот (заявка + отслеживание)
  instagram: "https://instagram.com/ethno.uzbekistan",
  trackBot: "https://t.me/ethnologisticsbot",
  site: "ethnologistics.com",
};

// Real, verifiable stats from the brief (no unconfirmed inflated numbers).
export const STATS = [
  { num: "11 лет", lbl: "на рынке — с 2015 года" },
  { num: "8 стран", lbl: "собственные склады" },
  { num: "4.7★", lbl: "173 отзыва на Яндексе" },
  { num: "60–80", lbl: "человек в команде" },
];

// Directions where Ethno operates (from brief).
export const COUNTRIES = [
  "Россия",
  "Казахстан",
  "Кыргызстан",
  "Таджикистан",
  "Турция",
  "ОАЭ",
  "Китай",
];

// Service tiers with real ETAs from the tariff sheet.
export const TIERS = {
  ultra: { id: "ultra", t: "Ультра", d: "36 часов" },
  express: { id: "express", t: "Экспресс", d: "3–5 дней" },
  standard: { id: "standard", t: "Стандарт", d: "4–7 дней" },
  auto: { id: "auto", t: "Авто", d: "от 10 дней" },
};

// Real per-route rates (USD/kg) + minimum billable weight, from ru.ethnologistics.com/ru/tariffs.
// Only services with a rate are offered on that route. China = by manager (no public rate).
export const ROUTES = [
  { id: "ru", name: "Россия (Москва)", rates: { express: { usd: 12, min: 1 }, ultra: { usd: 30, min: 1 }, auto: { usd: 5, min: 10 } } },
  { id: "kz", name: "Казахстан (Алматы)", rates: { express: { usd: 8, min: 1 }, ultra: { usd: 30, min: 1 }, auto: { usd: 5, min: 10 } } },
  { id: "kg", name: "Кыргызстан (Бишкек)", rates: { express: { usd: 8, min: 1 }, ultra: { usd: 30, min: 1 }, auto: { usd: 5, min: 10 } } },
  { id: "tj", name: "Таджикистан (Душанбе)", rates: { express: { usd: 8, min: 1 }, ultra: { usd: 30, min: 1 }, auto: { usd: 5, min: 10 } } },
  { id: "tr", name: "Турция (Стамбул)", rates: { express: { usd: 8, min: 2 }, ultra: { usd: 30, min: 0 }, auto: { usd: 5, min: 10 } } },
  { id: "ae", name: "ОАЭ (Дубай)", rates: { express: { usd: 8, min: 2 } } },
  { id: "eu", name: "Европа", rates: { express: { usd: 12, min: 1 } } },
  { id: "gb", name: "Великобритания (Лондон)", rates: { express: { usd: 10, min: 1 } } },
  { id: "us", name: "США", rates: { express: { usd: 12, min: 1 } } },
  { id: "cn", name: "Китай (Гуанчжоу)", rates: {}, byManager: true },
];

// Strongest, true differentiators from the brief.
export const USP = [
  {
    k: "36",
    t: "Ультра-срочно за 36 часов",
    d: "Доставляли спец-лекарства и оборудование за 6–7 часов, когда это не мог никто другой. Срочность — наша сильная сторона.",
  },
  {
    k: "★",
    t: "Сложные и необычные грузы",
    d: "Берём отправления, от которых отказываются другие. За нерешаемыми задачами к нам обращаются даже конкуренты.",
  },
  {
    k: "100%",
    t: "100% ответственность за груз",
    d: "При утрате возмещаем полную стоимость. За сохранность отвечаем целиком, если упаковываем сами или по нашим требованиям.",
  },
];

// ETHNO Buyer (выкуп) — real flow condensed from the 10-step brief.
export const BUYER_STEPS = [
  { n: "01", t: "Заявка", d: "Звоните или пишете — менеджер выясняет, что нужно купить и привезти." },
  { n: "02", t: "Поиск товара", d: "Находим товар или услугу в нужной стране. Поиск бесплатный — до 3 итераций." },
  { n: "03", t: "Согласование", d: "Показываем результат, считаем стоимость закупа и логистики, согласуем сроки." },
  { n: "04", t: "Выкуп и доставка", d: "После предоплаты оформляем заказ и ведём вас по всем этапам до выдачи посылки." },
];

// Real review ratings from the brief.
export const RATINGS = [
  { src: "Яндекс", score: "4.7", count: "173 отзыва" },
  { src: "Google", score: "4.6", count: "32 отзыва" },
  { src: "2GIS", score: "3.7", count: "5 отзывов" },
];

export const STORES = [
  "Alibaba", "Taobao", "1688", "Pinduoduo", "Trendyol",
  "Watsons", "Amazon", "SHEIN", "Zara", "Wildberries",
];

// FAQ — written for both human readers and AI/search engines (the client's #1 goal).
export const FAQ = [
  {
    q: "Из каких стран доставляет Ethno Logistics?",
    a: "Россия, Казахстан, Кыргызстан, Таджикистан, Турция, ОАЭ и Китай. У нас собственные склады в 8 странах, работаем по направлениям Москва–Ташкент, Алматы–Ташкент, Гуанчжоу–Алматы и другим.",
  },
  {
    q: "Какие сроки доставки?",
    a: "Ультра — 36 часов, Экспресс — 3–5 дней, Стандарт — 4–7 дней, Авто — от 10 дней. Точный срок зависит от направления и тарифа.",
  },
  {
    q: "Сколько стоит доставка?",
    a: "Зависит от страны, веса и скорости. Например, Москва: Экспресс — 12$/кг, Авто — 5$/кг, Ультра — 30$/кг. Рассчитайте точную стоимость в калькуляторе на сайте.",
  },
  {
    q: "Что такое ETHNO Buyer (выкуп)?",
    a: "Это услуга выкупа: если магазин не отправляет в Узбекистан или у вас нет зарубежной карты, мы покупаем товар за вас, оплачиваем своей картой, а вы платите в сумах. Поиск товара бесплатный.",
  },
  {
    q: "Что с гарантиями и сохранностью?",
    a: "Мы несём 100% ответственность: при утрате возмещаем полную стоимость посылки. За сохранность отвечаем полностью, если упаковываем сами или упаковка соответствует нашим требованиям.",
  },
  {
    q: "Как отследить посылку?",
    a: "Тремя способами: в приложении Ethno Logistics (Play Market / App Store), в Telegram-боте @ethnologisticsbot или на сайте в разделе отслеживания.",
  },
];

export const ARTICLES = [
  {
    slug: "kak-zakazat-tovary-iz-kitaya-v-uzbekistan",
    tag: "Гид по доставке",
    title: "Как заказать товары из Китая в Узбекистан в 2026 году",
    excerpt:
      "Пошаговая инструкция: где покупать, как считается вес, сколько стоит доставка и как пройти таможню без переплат.",
    read: "8 мин",
    date: "Июнь 2026",
  },
  {
    slug: "dostavka-iz-turcii-avia-ili-avto",
    tag: "Сравнение",
    title: "Доставка из Турции: авиа или авто, что выбрать",
    excerpt:
      "Разбираем сроки, стоимость и риски двух способов доставки из Турции, чтобы вы не переплачивали за скорость, которая вам не нужна.",
    read: "6 мин",
    date: "Июнь 2026",
  },
  {
    slug: "vykup-tovarov-ethno-buyer",
    tag: "ETHNO Buyer",
    title: "Выкуп товаров из-за рубежа: как работает ETHNO Buyer",
    excerpt:
      "Нет зарубежной карты или магазин не отправляет в Узбекистан? Объясняем, как сервис выкупа решает это за вас под ключ.",
    read: "5 мин",
    date: "Июнь 2026",
  },
];
