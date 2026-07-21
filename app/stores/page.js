"use client";
import LeadButton from "../../components/LeadButton";
import T, { useT } from "../../components/T";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { BEST_STORES, STORE_COUNTRIES } from "../../lib/content";
import { CONTACT } from "../../lib/data";

export default function StoresPage() {
  const t = useT();
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
                <button key={c} data-on={country === c ? "1" : "0"} onClick={() => setCountry(c)}>{t(c)}</button>
              ))}
            </div>
            <div className="grid cols-3">
              {stores.map((s, i) => (
                <Reveal key={s.name} className="store-card" delay={i * 40}>
                  <div className="store-card__top">
                    <span className="store-card__name">{<T s={s.name} />}</span>
                    <span className="store-card__cat">{<T s={s.cat} />}</span>
                  </div>
                  <p>{<T s={s.desc} />}</p>
                  <div className="store-card__cc">{<T s={s.country} />}</div>
                  <LeadButton className="btn btn--ghost" source={`Магазины — доставить из ${s.name}`} prefill={{ item: s.name }} style={{ alignSelf: "flex-start", padding: ".55rem 1.1rem", fontSize: ".9rem" }}>
                    {t("Доставить из")} {s.name}
                  </LeadButton>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="fullbleed">
          <img className="fullbleed__bg" src="/img/warehouse.jpg" alt="" width="1600" height="900" loading="lazy" />
          <div className="fullbleed__inner">
            <h2>{<T s={"Не нашли нужный магазин?"} />}</h2>
            <p className="lead">{<T s={"Мы выкупаем товар в любом зарубежном магазине — даже там, где нет доставки в Узбекистан."} />}</p>
            <LeadButton className="btn btn--light btn--lg" source="Магазины — заказать выкуп">{<T s={"Заказать выкуп"} />}</LeadButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
