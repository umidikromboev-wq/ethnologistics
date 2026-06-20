import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getArticle, allSlugs } from "../../../lib/articles";
import { CONTACT } from "../../../lib/data";
import { IconArrow } from "../../../components/icons";
import T from "../../../components/T";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const a = getArticle(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: { title: a.title, description: a.excerpt, type: "article" },
  };
}

function Block({ b }) {
  if (b.t === "h2") return <h2><T s={b.v} /></h2>;
  if (b.t === "h3") return <h3><T s={b.v} /></h3>;
  if (b.t === "p") return <p><T s={b.v} /></p>;
  if (b.t === "ul") return <ul>{b.v.map((x, i) => <li key={i}><T s={x} /></li>)}</ul>;
  if (b.t === "ol") return <ol>{b.v.map((x, i) => <li key={i}><T s={x} /></li>)}</ol>;
  if (b.t === "callout") return <div className="callout callout--accent"><T s={b.v} /></div>;
  return null;
}

export default function Article({ params }) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  return (
    <>
      <Header />
      <main>
        <article>
          <div className="wrap article">
            <div className="article__hero">
              <div className="article__meta">
                <Link href="/blog" style={{ color: "var(--accent)", fontWeight: 600 }}>{<T s={"Блог"} />}</Link>
                <span>·</span><span>{<T s={a.tag} />}</span>
                <span>·</span><span>{<T s={a.read} />}</span>
              </div>
              <h1>{<T s={a.title} />}</h1>
              <p className="lead" style={{ marginTop: "1rem" }}>{<T s={a.lead} />}</p>
            </div>
          </div>

          <div className="wrap article" style={{ paddingBottom: "clamp(3.5rem,2.5rem+3vw,6rem)" }}>
            <div className="split__media" style={{ aspectRatio: "16/8", marginBottom: "2.4rem" }}>
              <img src={a.image} alt={a.title} width="1300" height="700" loading="lazy" />
            </div>
            <div className="prose">
              {a.blocks.map((b, i) => <Block key={i} b={b} />)}
            </div>

            <div className="cta" style={{ marginTop: "3rem" }}>
              <h2 style={{ fontSize: "var(--h3)" }}>{<T s={"Посчитать доставку под ваш заказ"} />}</h2>
              <p className="lead">{<T s={"Менеджер подберёт способ и подтвердит цену за 15 минут."} />}</p>
              <div className="hero__cta" style={{ justifyContent: "center" }}>
                <a className="btn btn--dark" href="/#calc">{<T s={"Открыть калькулятор"} />} <IconArrow style={{ width: 18, height: 18 }} /></a>
                <a className="btn btn--ghost" href={CONTACT.telegram}>{<T s={"Написать в Telegram"} />}</a>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
