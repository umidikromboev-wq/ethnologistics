import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Calculator from "../components/Calculator";
import Tracking from "../components/Tracking";
import Globe from "../components/Globe";
import LeadForm from "../components/LeadForm";
import { STATS, STORES, ARTICLES, CONTACT, USP, FAQ, RATINGS, BUYER_STEPS } from "../lib/data";
import {
  IconPlane, IconTruck, IconCart, IconBuilding, IconGlobe, IconShield,
  IconBolt, IconCheck, IconArrow, IconHeadset, IconCalc, IconPin,
} from "../components/icons";
import T from "../components/T";

// Structured data — helps Google AND AI assistants understand the business.
const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Ethno Logistics",
      url: "https://ethnologistics.com",
      foundingDate: "2015",
      telephone: CONTACT.phone,
      areaServed: ["Россия", "Казахстан", "Кыргызстан", "Таджикистан", "Турция", "ОАЭ", "Китай", "Узбекистан"],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "173" },
      description:
        "Международная курьерская и логистическая компания: доставка и выкуп товаров из России, Казахстана, Турции, ОАЭ, Китая и Европы в Узбекистан с 2015 года.",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// Direction cards (real tariffs → display) linking to SEO direction pages.
const DIRECTIONS = [
  { name: "Россия · Москва", slug: "rossiya", img: "/img/warehouse.jpg", eta: "Экспресс 3–5 дней", price: "от $12/кг" },
  { name: "Казахстан · Алматы", slug: "kazakhstan", img: "/img/parcels.jpg", eta: "Экспресс 3–5 дней", price: "от $8/кг" },
  { name: "Кыргызстан · Бишкек", slug: "kyrgyzstan", img: "/img/courier.jpg", eta: "Экспресс 3–5 дней", price: "от $8/кг" },
  { name: "Турция · Стамбул", slug: "turciya", img: "/img/plane.jpg", eta: "Авиа · от 2 кг", price: "от $8/кг" },
  { name: "ОАЭ · Дубай", slug: "oae", img: "/img/buyer.jpg", eta: "Авиа · от 2 кг", price: "от $8/кг" },
  { name: "Китай · Гуанчжоу", slug: "kitay", img: "/img/hero.jpg", eta: "Выкуп и логистика", price: "расчёт" },
];

const SERVICES = [
  { t: "Авиаперевозки", img: "/img/plane.jpg", d: "Срочные грузы по воздуху из 8 стран. Тариф «Ультра» — за 36 часов; спец-лекарства и оборудование возили за 6–7 часов. Любой вес и габарит." },
  { t: "Наземные перевозки", img: "/img/courier.jpg", d: "Авто-доставка для объёмных партий. Берём негабарит и сложные грузы, от которых отказываются другие. Оплата при получении — картой или наличными." },
  { t: "Решения для бизнеса", img: "/img/warehouse.jpg", d: "Импорт и регулярные поставки под ключ для маркетплейсов и интернет-магазинов. Закуп в России из компаний без ВЭД-отдела, консолидация партий, документы — на нас." },
  { t: "Частным лицам", img: "/img/parcels.jpg", d: "Доставка покупок из зарубежных магазинов. Упаковка и поиск товара — бесплатно. Объединяем посылки ради экономии, отслеживание в боте @ethnologisticsbot." },
  { t: "ETHNO Buyer — выкуп", img: "/img/buyer.jpg", d: "Купим товар за вас в магазинах России, Турции, Европы, США, Кореи и Китая. Платите в сумах, поиск товара бесплатный — до 3 итераций." },
  { t: "Трансграничные перевозки", img: "/img/hero.jpg", d: "Международная логистика между 8 странами с 2015 года. 8 собственных складов, ответственность за груз 100% — при утрате возмещаем полную стоимость." },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <Header />
      <main>
        {/* ============ HERO (full-bleed dark, 1:1 voronoilogistics.ru) ============ */}
        <section className="hero-v" data-dark-hero="1">
          <img className="hero-v__bg" src="/img/hero.jpg" alt="Международная доставка Ethno Logistics" width="1600" height="900" fetchPriority="high" />
          <div className="hero-v__wrap">
            <div className="hero-v__head">
              <h1>{<T s={"Доставка и выкуп товаров из"} />} <span className="accent">{<T s={"8 стран"} />}</span> {<T s={"под ключ"} />}</h1>
              <p className="hero-v__sub">
                {<T s={"Организуем доставку, выкуп товаров, таможенное оформление и отслеживание из России,\n                Китая, Турции, ОАЭ и Казахстана — для частных клиентов, селлеров и B2B-компаний."} />}
              </p>
            </div>
            <div className="hero-v__spacer" />
            <div className="hero-v__foot">
              <div className="hero-v__btns">
                <a className="btn btn--glass btn--lg" href={CONTACT.telegram}>{<T s={"Рассчитать стоимость в Telegram"} />}</a>
                <a className="btn btn--glass btn--lg" href="#calc">{<T s={"Рассчитать стоимость на сайте"} />}</a>
              </div>
              <div className="ai-card">
                <div className="ai-card__phone" aria-hidden="true">
                  <div className="ph">
                    <div className="ph-top"><span>Ethno</span><span>🔔</span></div>
                    <div className="ph-card">
                      <div className="ph-no">{<T s={"Посылка ETH-48210"} />}</div>
                      <div className="ph-row"><span className="ph-st">{<T s={"В пути"} />}</span><span className="ph-badge">{<T s={"Экспресс"} />}</span></div>
                      <div className="ph-track"><span className="ph-dot on" /><span className="ph-seg on" /><span className="ph-dot on" /><span className="ph-seg" /><span className="ph-dot" /></div>
                      <div className="ph-eta">{<T s={"Прибудет завтра · Ташкент"} />}</div>
                    </div>
                    <div className="ph-card">
                      <div className="ph-no">{<T s={"Расчёт доставки"} />}</div>
                      <div className="ph-row"><span className="ph-amt">$144</span><span className="ph-eta">{<T s={"12 кг · Москва"} />}</span></div>
                    </div>
                  </div>
                </div>
                <span className="ai-chip ai-chip--a" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><rect x="4" y="2" width="16" height="20" rx="3"/><path d="M10 19h4"/></svg>
                </span>
                <span className="ai-chip ai-chip--b" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>
                </span>
                <span className="ai-chip ai-chip--c" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M6 8a6 6 0 0112 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 004 0"/></svg>
                </span>
                <div className="ai-card__title">{<T s={"Ваша доставка — в приложении Ethno"} />}</div>
                <div className="ai-card__list">
                  <div className="ai-card__row"><span className="ai-card__plus">+</span>{<T s={"Отслеживание 24/7 — приложение, бот и сайт"} />}</div>
                  <div className="ai-card__row"><span className="ai-card__plus">+</span>{<T s={"Расчёт стоимости за минуту"} />}</div>
                  <div className="ai-card__row"><span className="ai-card__plus">+</span>{<T s={"История заказов и документы под рукой"} />}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ GEO / 3D GLOBE ============ */}
        <section className="section geo" id="geo">
          <div className="wrap">
            <div className="geo__grid">
              <div>
                <span className="sidx" style={{ color: "#6db0e8" }}>{<T s={"География"} />}</span>
                <h2 style={{ marginTop: "1rem" }}>{<T s={"Доставляем из 8 стран в Узбекистан"} />}</h2>
                <p className="lead" style={{ marginTop: "1rem" }}>
                  {<T s={"Собственные склады в 8 странах и более 20 отлаженных маршрутов по миру. Принимаем груз на складе за рубежом,\n                  консолидируем, оформляем таможню и доводим до двери в Узбекистане."} />}
                </p>
                <div className="geo__stats">
                  <div className="geo__stat"><div className="n tnum">8</div><div className="l">{<T s={"стран и складов"} />}</div></div>
                  <div className="geo__stat"><div className="n tnum">{<T s={"36 ч"} />}</div><div className="l">{<T s={"ультра-срочно"} />}</div></div>
                  <div className="geo__stat"><div className="n tnum">{<T s={"с 2015"} />}</div><div className="l">{<T s={"на рынке"} />}</div></div>
                </div>
                <div className="geo__routes">
                  {["Москва", "Алматы", "Бишкек", "Душанбе", "Стамбул", "Дубай", "Гуанчжоу"].map((r) => (
                    <span key={r} className="geo__route"><T s={r} /> → <T s="Ташкент" /></span>
                  ))}
                </div>
              </div>
              <div className="geo__globe"><Globe /></div>
            </div>
          </div>
        </section>

        {/* ============ DIRECTIONS — editorial split + list ============ */}
        <section className="section" id="directions">
          <div className="wrap dir-split">
            <div className="dir-aside">
              <span className="sidx">{<T s={"01 — Направления"} />}</span>
              <h2>{<T s={"Доставка из 8 стран в Узбекистан"} />}</h2>
              <p className="lead">{<T s={"Собственные склады в восьми странах. Везём посылки и коммерческие грузы по реальным тарифам — от выкупа в Китае до срочной авиадоставки из Турции и ОАЭ."} />}</p>
              <a className="btn btn--primary" href="#calc" style={{ alignSelf: "start" }}>{<T s={"Рассчитать стоимость"} />} <IconArrow style={{ width: 18, height: 18 }} /></a>
              <div className="dir-figure"><img src="/img/courier.jpg" alt="Грузоперевозки Ethno Logistics" width="700" height="525" loading="lazy" /></div>
            </div>
            <div className="dir-list">
              {DIRECTIONS.map((d, i) => (
                <Reveal as={Link} key={d.slug} href={`/dostavka/${d.slug}`} className="dir-row" delay={i * 50}>
                  <span className="dir-row__no">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="dir-row__name">{<T s={d.name} />}</span>
                    <span className="dir-row__eta">{<T s={d.eta} />}</span>
                  </span>
                  <span className="dir-row__price">{<T s={d.price} />}</span>
                  <span className="dir-row__arr"><IconArrow /></span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section className="section" id="services">
          <div className="wrap">
            <div className="shead--edit">
              <span className="sidx">{<T s={"Услуги"} />}</span>
              <h2>{<T s={"Что и для кого мы возим"} />}</h2>
            </div>
            <div className="svc-grid">
              {SERVICES.map((s, i) => (
                <Reveal key={s.t} className="svc" delay={i * 50}>
                  <div className="svc__media"><img src={s.img} alt={s.t} width="500" height="312" loading="lazy" /></div>
                  <div className="svc__body">
                    <div className="svc__name">{<T s={s.t} />}</div>
                    <p>{<T s={s.d} />}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FULL-BLEED: positioning ============ */}
        <section className="fullbleed">
          <img className="fullbleed__bg" src="/img/plane.jpg" alt="" width="1600" height="900" loading="lazy" />
          <div className="fullbleed__inner">
            <span className="eyebrow eyebrow--on-dark">{<T s={"Наше преимущество"} />}</span>
            <h2>{<T s={"Берём то, от чего отказываются другие"} />}</h2>
            <p className="lead">
              {<T s={"Ультра-срочная доставка за 36 часов и сложные, нестандартные грузы. За нерешаемыми\n              задачами к нам обращаются даже конкуренты — и мы их закрываем."} />}
            </p>
            <a className="btn btn--light btn--lg" href="#calc">{<T s={"Обсудить мой груз"} />} <IconArrow style={{ width: 18, height: 18 }} /></a>
          </div>
        </section>

        {/* ============ WHY US — bento ============ */}
        <section className="section" id="why">
          <div className="wrap">
            <div className="shead--edit">
              <span className="sidx">{<T s={"03 — Почему Ethno"} />}</span>
              <h2>{<T s={"Сильны там, где другие пасуют"} />}</h2>
            </div>
            <div className="bento">
              <div className="b-stat b-span2">
                <div className="b-ic"><IconBolt /></div>
                <div><div className="big">{<T s={"36 часов"} />}</div><div className="cap">{<T s={"Ультра-срочная доставка — возили спец-лекарства и оборудование за 6–7 часов"} />}</div></div>
              </div>
              <div className="b-stat"><div><div className="big">8</div><div className="cap">{<T s={"стран и собственных складов"} />}</div></div></div>
              <div className="b-stat"><div><div className="big">4.7★</div><div className="cap">{<T s={"173 отзыва на Яндексе"} />}</div></div></div>
              <div className="b-photo"><img src="/img/warehouse.jpg" alt="Склады Ethno" width="600" height="400" loading="lazy" /><div className="b-cap">{<T s={"Склады в 8 странах"} />}</div></div>
              <div className="b-feature"><div className="b-ic"><IconShield /></div><div><h3>{<T s={"100% ответственность"} />}</h3><p>{<T s={"При утрате возмещаем полную стоимость. За сохранность отвечаем целиком."} />}</p></div></div>
              <div className="b-accent b-span2">
                <div className="b-ic" style={{ background: "rgba(255,255,255,.18)", color: "#fff" }}><IconCart /></div>
                <div><div className="big">{<T s={"ETHNO Buyer — выкуп под ключ"} />}</div><p>{<T s={"Магазин не отправляет в Узбекистан или нет зарубежной карты? Покупаем за вас, вы платите в сумах. Поиск товара бесплатный."} />}</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ETHNO BUYER split ============ */}
        <section className="section panel" id="buyer">
          <div className="wrap grid cols-2" style={{ alignItems: "center", gap: "clamp(2rem,1rem+3vw,4rem)" }}>
            <div>
              <span className="aud__tag">{<T s={"ETHNO Buyer · выкуп"} />}</span>
              <h2 style={{ marginBottom: "1rem" }}>{<T s={"Купим товар за вас в любой стране"} />}</h2>
              <p className="lead" style={{ marginBottom: "1.4rem" }}>
                {<T s={"Поиск товара бесплатный — до 3 итераций. После согласования цены оформляем заказ\n                и ведём вас по всем этапам до выдачи посылки."} />}
              </p>
              <div className="checks">
                {BUYER_STEPS.map((s) => (
                  <div className="check" key={s.n}><IconCheck /><span><b><T s={s.t} />.</b> <T s={s.d} /></span></div>
                ))}
              </div>
              <a className="btn btn--primary" href={CONTACT.telegram}>{<T s={"Заказать выкуп"} />} <IconArrow style={{ width: 18, height: 18 }} /></a>
            </div>
            <Reveal className="route" style={{ boxShadow: "var(--shadow)" }}>
              <div className="route__media" style={{ aspectRatio: "4/5" }}>
                <img src="/img/buyer.jpg" alt="Выкуп товаров из зарубежных магазинов" width="700" height="875" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ CALCULATOR ============ */}
        <section className="section" id="calc">
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">{<T s={"Калькулятор"} />}</span>
              <h2>{<T s={"Узнайте стоимость за минуту"} />}</h2>
              <p className="lead">{<T s={"Расчёт по реальным тарифам. Точную цену с учётом объёма и таможни менеджер подтвердит."} />}</p>
            </div>
            <Reveal><Calculator /></Reveal>
          </div>
        </section>

        {/* ============ AUDIENCE ============ */}
        <section className="section panel" id="business">
          <div className="wrap">
            <div className="shead--edit"><span className="sidx">{<T s={"04 — Кому подходит"} />}</span><h2>{<T s={"Для людей и для бизнеса"} />}</h2><p className="lead" style={{ maxWidth: "44ch" }}>{<T s={"Один оператор закрывает и личную посылку, и регулярный импорт."} />}</p></div>
            <div className="aud-split">
              <Reveal className="aud">
                <span className="aud__tag">{<T s={"Частным лицам"} />}</span>
                <h3>{<T s={"Покупки для себя и семьи"} />}</h3>
                <ul>
                  <li><IconCheck /><span>{<T s={"Доставка заказов из любимых зарубежных магазинов"} />}</span></li>
                  <li><IconCheck /><span>{<T s={"Бесплатная упаковка и бесплатный поиск товара"} />}</span></li>
                  <li><IconCheck /><span>{<T s={"Объединение нескольких посылок ради экономии"} />}</span></li>
                  <li><IconCheck /><span>{<T s={"Отслеживание в приложении, боте и на сайте"} />}</span></li>
                </ul>
                <a className="btn btn--ghost" href={CONTACT.telegram}>{<T s={"Оформить посылку"} />}</a>
              </Reveal>
              <Reveal className="aud aud--dark" delay={90}>
                <span className="aud__tag">{<T s={"Бизнесу"} />}</span>
                <h3>{<T s={"Импорт и поставки под ключ"} />}</h3>
                <ul>
                  <li><IconCheck /><span>{<T s={"Регулярные поставки от поставщиков из Китая и Турции"} />}</span></li>
                  <li><IconCheck /><span>{<T s={"Выкуп и закуп в России из компаний без ВЭД-отдела"} />}</span></li>
                  <li><IconCheck /><span>{<T s={"Консолидация партий и оптимизация стоимости килограмма"} />}</span></li>
                  <li><IconCheck /><span>{<T s={"Персональный менеджер и приоритетные сроки"} />}</span></li>
                </ul>
                <a className="btn btn--primary" href={CONTACT.telegram}>{<T s={"Обсудить поставки"} />}</a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="section" id="how">
          <div className="wrap">
            <div className="shead--edit">
              <span className="sidx">{<T s={"02 — Как это работает"} />}</span>
              <h2>{<T s={"Четыре шага до вашей двери"} />}</h2>
            </div>
            <div className="proc">
              {[
                { t: "Заявка", d: "Оставляете ссылку на товар или адрес склада. Менеджер считает стоимость." },
                { t: "Выкуп или приём", d: "Выкупаем товар за вас или принимаем посылку на зарубежный склад." },
                { t: "Доставка", d: "Отправляем авиа или авто. Вы видите статус на каждом этапе." },
                { t: "Выдача", d: "Забираете посылку в Ташкенте или заказываете доставку до двери." },
              ].map((s, i) => (
                <Reveal key={s.t} className="proc__step" delay={i * 90}>
                  <div className="proc__dot">{i + 1}</div>
                  <h3>{<T s={s.t} />}</h3><p>{<T s={s.d} />}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ RATINGS + FAQ ============ */}
        <section className="section panel" id="faq">
          <div className="wrap faq-split">
            <div className="faq-aside">
              <span className="sidx">{<T s={"05 — Вопросы и доверие"} />}</span>
              <h2>{<T s={"Коротко о доставке и выкупе"} />}</h2>
              <p className="lead">{<T s={"Нам доверяют тысячи клиентов — вот реальные оценки."} />}</p>
              <div className="ratings">
                {RATINGS.map((r) => (
                  <div key={r.src} className="rating">
                    <div className="rating__score">{r.score}<span>★</span></div>
                    <div className="rating__src">{<T s={r.src} />}</div>
                    <div className="rating__cnt">{<T s={r.count} />}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="faq-rows">
              {FAQ.map((f, i) => (
                <Reveal key={f.q} className="faq-qa" delay={i * 40}><h3>{<T s={f.q} />}</h3><p>{<T s={f.a} />}</p></Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TRACKING + STORES ============ */}
        <section className="section" id="track">
          <div className="wrap" style={{ display: "grid", justifyItems: "center", gap: "1.2rem", textAlign: "center" }}>
            <span className="eyebrow">{<T s={"Отслеживание"} />}</span>
            <h2>{<T s={"Где моя посылка?"} />}</h2>
            <p className="lead">{<T s={"Введите номер отправления — покажем актуальный статус и сроки."} />}</p>
            <Tracking />
            <p className="muted">{<T s={"Ещё отследить можно в приложении Ethno Logistics и в Telegram-боте"} />} <a href={CONTACT.trackBot} style={{ color: "var(--accent)", fontWeight: 600 }}>@ethnologisticsbot</a></p>
            <div style={{ marginTop: "2rem", maxWidth: "62rem" }}>
              <p className="muted" style={{ marginBottom: "1rem" }}>{<T s={"Везём из тысяч магазинов — вот популярные:"} />}</p>
              <div className="stores">{STORES.map((s) => <span key={s} className="store">{s}</span>)}</div>
              <div style={{ marginTop: "1.6rem" }}>
                <Link className="btn btn--ghost" href="/stores">{<T s={"Все магазины и категории"} />}</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============ BLOG — featured-first asymmetric ============ */}
        <section className="section">
          <div className="wrap">
            <div className="shead--edit" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div className="shead--edit" style={{ margin: 0, gap: ".7rem" }}>
                <span className="sidx">{<T s={"06 — Гайды"} />}</span>
                <h2>{<T s={"Как заказывать выгодно и без ошибок"} />}</h2>
              </div>
              <Link className="btn btn--ghost" href="/blog">{<T s={"Все статьи"} />}</Link>
            </div>
            <div className="blog-feat">
              <Reveal as={Link} href={`/blog/${ARTICLES[0].slug}`} className="blog-main">
                <img className="blog-main__bg" src="/img/parcels.jpg" alt="" width="800" height="500" loading="lazy" />
                <span className="blogcard__tag">{<T s={ARTICLES[0].tag} />}</span>
                <h3>{<T s={ARTICLES[0].title} />}</h3>
                <p>{<T s={ARTICLES[0].excerpt} />}</p>
                <span style={{ color: "rgba(255,255,255,.7)", fontSize: ".85rem", marginTop: ".8rem" }}><T s={ARTICLES[0].read} /> · <T s="читать" /></span>
              </Reveal>
              <div className="blog-side">
                {ARTICLES.slice(1).map((a, i) => (
                  <Reveal as={Link} key={a.slug} href={`/blog/${a.slug}`} className="blog-mini" delay={i * 80}>
                    <span className="blogcard__tag">{<T s={a.tag} />}</span>
                    <h3>{<T s={a.title} />}</h3>
                    <p>{<T s={a.excerpt} />}</p>
                    <span className="muted" style={{ fontSize: ".82rem" }}><T s={a.read} /> · <T s="читать" /></span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ LEAD CALCULATION BLOCK ============ */}
        <section className="section" id="lead">
          <div className="wrap">
            <Reveal className="lead-block">
              <div className="lead-block__left">
                <span className="lead-pill">{<T s={"Бесплатный расчёт"} />}</span>
                <h2>{<T s={"Рассчитать доставку и выкуп"} />}</h2>
                <p className="lead-block__sub">{<T s={"Укажите, что и откуда везём — менеджер подберёт маршрут и посчитает стоимость. Ответ в течение 60 минут."} />}</p>
                <div className="lead-mgr">
                  <span className="lead-mgr__av">E</span>
                  <div>
                    <div className="lead-mgr__n">{<T s={"Персональный менеджер Ethno"} />}</div>
                    <div className="lead-mgr__r"><T s="Ответ за 60 минут" /> · {CONTACT.phone}</div>
                  </div>
                </div>
              </div>
              <LeadForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
