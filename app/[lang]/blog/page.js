import Link from "next/link";
import { LOCALES, normalizeLang, href, absHref, alternatesFor, tr } from "../../../lib/locales";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import Reveal from "../../../components/Reveal";
import { ARTICLES } from "../../../lib/data";
import T from "../../../components/T";

const META = {
  title: "Блог и гайды по международной доставке",
  description: "Полезные статьи о доставке и выкупе товаров из Китая, Турции и других стран в Узбекистан: как заказывать выгодно, считать вес и проходить таможню.",
};

export async function generateMetadata({ params }) {
  const lang = normalizeLang((await params).lang);
  return {
    title: tr(META.title, lang),
    description: tr(META.description, lang),
    alternates: alternatesFor("/blog", lang),
  };
}

export default async function Blog({ params }) {
  const lang = normalizeLang((await params).lang);
  const link = (p) => href(lang, p);
  return (
    <>
      <Header />
      <main>
        <PageHero lang={lang}
          crumb="Блог"
          img="/img/parcels.jpg"
          title="Блог и гайды по доставке"
          sub="Разбираем, как заказывать и выкупать товары из-за рубежа выгодно, без ошибок и лишних переплат."
        />
        <section className="section">
          <div className="wrap">
            <div className="grid cols-3">
              {ARTICLES.map((a, i) => (
                <Reveal key={a.slug} delay={i * 70}>
                  <Link href={link(`/blog/${a.slug}`)} className="blogcard" style={{ height: "100%" }}>
                    <span className="blogcard__tag">{<T s={a.tag} />}</span>
                    <h3>{<T s={a.title} />}</h3>
                    <p>{<T s={a.excerpt} />}</p>
                    <span className="muted" style={{ fontSize: ".85rem", marginTop: "auto" }}><T s={a.read} /> · <T s={a.date} /></span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
