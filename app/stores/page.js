"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { BEST_STORES, STORE_COUNTRIES } from "../../lib/content";
import { CONTACT } from "../../lib/data";

export default function StoresPage() {
  const [country, setCountry] = useState("Все");
  const stores = country === "Все" ? BEST_STORES : BEST_STORES.filter((s) => s.country === country);

  return (
    <>
      <Header />
      <main>
        <PageHero
          crumb="Магазины"
          img="/img/parcels.jpg"
          title="Лучшие магазины для покупок с доставкой в Узбекистан"
          sub="Заказывайте в этих магазинах и получайте посылки в Узбекистане через Ethno Logistics — мы выкупим, привезём и оформим таможню."
        />
        <section className="section">
          <div className="wrap">
            <div className="filterbar">
              {STORE_COUNTRIES.map((c) => (
                <button key={c} data-on={country === c ? "1" : "0"} onClick={() => setCountry(c)}>{c}</button>
              ))}
            </div>
            <div className="grid cols-3">
              {stores.map((s, i) => (
                <Reveal key={s.name} className="store-card" delay={i * 40}>
                  <div className="store-card__top">
                    <span className="store-card__name">{s.name}</span>
                    <span className="store-card__cat">{s.cat}</span>
                  </div>
                  <p>{s.desc}</p>
                  <div className="store-card__cc">{s.country}</div>
                  <a className="btn btn--ghost" href={CONTACT.telegram} style={{ alignSelf: "flex-start", padding: ".55rem 1.1rem", fontSize: ".9rem" }}>
                    Доставить из {s.name}
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="fullbleed">
          <img className="fullbleed__bg" src="/img/warehouse.jpg" alt="" width="1600" height="900" loading="lazy" />
          <div className="fullbleed__inner">
            <h2>Не нашли нужный магазин?</h2>
            <p className="lead">Мы выкупаем товар в любом зарубежном магазине — даже там, где нет доставки в Узбекистан.</p>
            <a className="btn btn--light btn--lg" href={CONTACT.telegram}>Заказать выкуп</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
