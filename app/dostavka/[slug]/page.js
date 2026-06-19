import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import Reveal from "../../../components/Reveal";
import { DIRECTIONS } from "../../../lib/content";
import { CONTACT } from "../../../lib/data";
import { IconCheck, IconArrow } from "../../../components/icons";

export function generateStaticParams() {
  return DIRECTIONS.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const d = DIRECTIONS.find((x) => x.slug === params.slug);
  if (!d) return {};
  return {
    title: `Доставка из ${d.countryGen} в Узбекистан`,
    description: d.intro.slice(0, 160),
  };
}

export default function DirectionPage({ params }) {
  const d = DIRECTIONS.find((x) => x.slug === params.slug);
  if (!d) notFound();

  return (
    <>
      <Header />
      <main>
        <PageHero
          crumb={`Доставка из ${d.countryGen}`}
          img={d.img}
          title={`Доставка из ${d.countryGen} в Узбекистан`}
          sub={d.intro}
        >
          <a className="btn btn--light btn--lg" href="/#calc">Рассчитать доставку</a>
          <a className="btn btn--ghost btn--lg" href={CONTACT.telegram} style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.4)" }}>Связаться</a>
        </PageHero>

        <section className="section">
          <div className="wrap grid cols-2" style={{ alignItems: "start", gap: "clamp(2rem,1rem+3vw,4rem)" }}>
            <div>
              <span className="eyebrow">Что мы доставляем</span>
              <h2 style={{ margin: "1rem 0 1.4rem" }}>Грузы и посылки из {d.countryGen}</h2>
              <div className="checks">
                {d.deliver.map((x) => (<div className="check" key={x}><IconCheck /><span>{x}</span></div>))}
              </div>
            </div>
            <div>
              <span className="eyebrow">Как это работает</span>
              <h2 style={{ margin: "1rem 0 1.4rem" }}>5 шагов до получения</h2>
              <div className="worklist" style={{ maxWidth: "none" }}>
                {d.steps.map((s, i) => (
                  <div className="workrow" key={s.t} style={{ padding: "1.1rem 1.3rem" }}>
                    <div className="workrow__n">{i + 1}</div>
                    <div><h3 style={{ fontSize: "1.05rem" }}>{s.t}</h3><p>{s.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section panel">
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Вопросы</span><h2>Частые вопросы о доставке из {d.countryGen}</h2></div>
            <div className="faq">
              {d.faq.map((f, i) => (
                <Reveal key={f.q} className="faq__item" delay={i * 40}>
                  <h3 className="faq__q">{f.q}</h3><p className="faq__a">{f.a}</p>
                </Reveal>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: ".8rem", marginTop: "2.4rem", flexWrap: "wrap" }}>
              <a className="btn btn--primary btn--lg" href="/#calc">Рассчитать доставку <IconArrow style={{ width: 18, height: 18 }} /></a>
              <Link className="btn btn--ghost btn--lg" href="/stores">Смотреть магазины</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
