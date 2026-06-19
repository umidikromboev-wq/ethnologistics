import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { ARTICLES } from "../../lib/data";

export const metadata = {
  title: "Блог и гайды по международной доставке",
  description:
    "Полезные статьи о доставке и выкупе товаров из Китая, Турции и других стран в Узбекистан: как заказывать выгодно, считать вес и проходить таможню.",
};

export default function Blog() {
  return (
    <>
      <Header />
      <main>
        <PageHero
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
                  <Link href={`/blog/${a.slug}`} className="blogcard" style={{ height: "100%" }}>
                    <span className="blogcard__tag">{a.tag}</span>
                    <h3>{a.title}</h3>
                    <p>{a.excerpt}</p>
                    <span className="muted" style={{ fontSize: ".85rem", marginTop: "auto" }}>{a.read} · {a.date}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
