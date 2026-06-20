import Link from "next/link";
import { CONTACT } from "../lib/data";
import { DIRECTIONS } from "../lib/content";
import T from "./T";

const Soc = {
  tg: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 4.5L2.5 11l6 2.2L11 20l3.2-4.3L20 19z" /></svg>),
  ig: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>),
  yt: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" /></svg>),
};

export default function Footer() {
  const marqueeImgs = ["/img/warehouse.jpg", "/img/plane.jpg", "/img/courier.jpg", "/img/parcels.jpg", "/img/buyer.jpg", "/img/hero.jpg"];
  return (
    <footer className="foot">
      <div className="foot-marquee" aria-hidden="true">
        <div className="foot-marquee__track">
          {[...marqueeImgs, ...marqueeImgs].map((src, i) => (
            <img key={i} className="foot-marquee__img" src={src} alt="" width="400" height="250" loading="lazy" />
          ))}
        </div>
      </div>
      <div className="wrap" style={{ paddingTop: "clamp(3rem,2rem+3vw,5rem)" }}>
        {/* top tier: logo · navigation · contacts */}
        <div className="foot__top">
          <div>
            <Link href="/" aria-label="Ethno Logistics">
              <img src="/img/logo-white.png" alt="Ethno Logistics" width="200" height="60" style={{ height: 40, width: "auto" }} />
            </Link>
            <p style={{ color: "rgba(255,255,255,.6)", marginTop: "1.1rem", maxWidth: "28ch", fontSize: ".95rem" }}>
              {<T s={"Международная доставка и выкуп товаров в Узбекистан с 2015 года. 8 стран, 8 складов."} />}
            </p>
          </div>
          <div className="foot__col">
            <h4>{<T s={"Навигация"} />}</h4>
            <Link href="/#services">{<T s={"Услуги"} />}</Link>
            <Link href="/#why">{<T s={"Преимущества"} />}</Link>
            <Link href="/stores">{<T s={"Магазины"} />}</Link>
            <Link href="/how-it-works">{<T s={"Как это работает"} />}</Link>
            <Link href="/company">{<T s={"О компании"} />}</Link>
            <Link href="/contact">{<T s={"Контакты"} />}</Link>
            <Link href="/blog">{<T s={"Блог"} />}</Link>
          </div>
          <div className="foot__col foot__contacts">
            <h4>{<T s={"Контакты"} />}</h4>
            <a className="big" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a className="big" href={CONTACT.telegram}>@ethnologisticsbot</a>
          </div>
        </div>

        {/* bottom tier: legal · socials · cooperation */}
        <div className="foot__mid">
          <div className="foot__legal">
            <a href="#">{<T s={"Политика конфиденциальности"} />}</a>
            <a href="#">{<T s={"Условия использования"} />}</a>
            <div className="cp">© {new Date().getFullYear()} Ethno Logistics. <T s="Все права защищены." /></div>
          </div>
          <div className="foot__col">
            <h4>{<T s={"Социальные сети"} />}</h4>
            <div className="foot__soc">
              <a href={CONTACT.telegram} aria-label="Telegram">{Soc.tg}</a>
              <a href={CONTACT.instagram} aria-label="Instagram">{Soc.ig}</a>
              <a href={CONTACT.telegram} aria-label="YouTube">{Soc.yt}</a>
            </div>
          </div>
          <div className="foot__col foot__coop">
            <h4>{<T s={"По вопросам сотрудничества"} />}</h4>
            <a className="big" href="mailto:info@ethnologistics.com">info@ethnologistics.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
