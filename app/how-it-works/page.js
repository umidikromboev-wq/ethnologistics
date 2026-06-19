import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import Calculator from "../../components/Calculator";
import { WORKS_STEPS } from "../../lib/content";
import { CONTACT } from "../../lib/data";

export const metadata = {
  title: "Как это работает — доставка и выкуп под ключ",
  description: "Пошаговая инструкция Ethno Logistics: регистрация, адрес склада, покупка в магазине, оплата и получение посылки в Узбекистане.",
};

const ICONS = [
  <svg key="0" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M5 21c0-4 3-6 7-6 1.3 0 2.5.2 3.5.7" /><path d="M19 16v6M16 19h6" /></svg>, // register
  <svg key="1" viewBox="0 0 24 24"><path d="M12 21s7-6 7-12a7 7 0 00-14 0c0 6 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>, // address
  <svg key="2" viewBox="0 0 24 24"><path d="M4 8l1.5-4h13L20 8M4 8v11h16V8M4 8h16M9 12h6" /></svg>, // shop
  <svg key="3" viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.2 11h10l2-7H6" /></svg>, // buy/cart
  <svg key="4" viewBox="0 0 24 24"><path d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21z" /><path d="M10 8h4M10 12h4" /></svg>, // receipt
  <svg key="5" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M3 10h18M7 15h3" /></svg>, // pay card
  <svg key="6" viewBox="0 0 24 24"><path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" /></svg>, // send box
  <svg key="7" viewBox="0 0 24 24"><path d="M4 11l8-7 8 7M6 10v9h12v-9" /><path d="M9.5 15l1.8 1.8L15 13" /></svg>, // receive home+check
];

export default function WorksPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumb="Как это работает"
          img="/img/courier.jpg"
          title="Как это работает — от заказа до вашей двери"
          sub="8 простых шагов: зарегистрируйтесь, получите адрес склада за границей, купите товар — остальное берём на себя."
        >
          <a className="btn btn--light btn--lg" href="#calc">Рассчитать доставку</a>
          <a className="btn btn--ghost btn--lg" href={CONTACT.telegram} style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.4)" }}>Связаться</a>
        </PageHero>

        <section className="section">
          <div className="wrap">
            <div className="worklist">
              {WORKS_STEPS.map((s, i) => (
                <Reveal key={s.t} className="workrow" delay={i * 60}>
                  <div className="workrow__n">{String(i + 1).padStart(2, "0")}</div>
                  <div className="workrow__ic">{ICONS[i % ICONS.length]}</div>
                  <div><h3>{s.t}</h3><p>{s.d}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section panel" id="calc">
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Калькулятор</span><h2>Рассчитайте стоимость доставки</h2></div>
            <Reveal><Calculator /></Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
