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
  if (b.t === "h2")
    return (
      <h2
        style={{
          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          fontWeight: 700,
          lineHeight: 1.25,
          color: "var(--text-main, #0f172a)",
          marginTop: "2.5rem",
          marginBottom: "1rem",
          letterSpacing: "-0.02em",
        }}
      >
        <T s={b.v} />
      </h2>
    );
  if (b.t === "h3")
    return (
      <h3
        style={{
          fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
          fontWeight: 600,
          lineHeight: 1.3,
          color: "var(--text-main, #1e293b)",
          marginTop: "2rem",
          marginBottom: "0.75rem",
          letterSpacing: "-0.01em",
        }}
      >
        <T s={b.v} />
      </h3>
    );
  if (b.t === "p")
    return (
      <p
        style={{
          fontSize: "1.0625rem",
          lineHeight: 1.7,
          color: "var(--text-muted, #475569)",
          marginBottom: "1.25rem",
        }}
      >
        <T s={b.v} />
      </p>
    );
  if (b.t === "ul")
    return (
      <ul
        style={{
          margin: "1.25rem 0",
          paddingLeft: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          listStyleType: "disc",
        }}
      >
        {b.v.map((x, i) => (
          <li
            key={i}
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--text-muted, #334155)",
            }}
          >
            <T s={x} />
          </li>
        ))}
      </ul>
    );
  if (b.t === "ol")
    return (
      <ol
        style={{
          margin: "1.25rem 0",
          paddingLeft: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          listStyleType: "decimal",
        }}
      >
        {b.v.map((x, i) => (
          <li
            key={i}
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--text-muted, #334155)",
              paddingLeft: "0.25rem",
            }}
          >
            <T s={x} />
          </li>
        ))}
      </ol>
    );
  if (b.t === "callout")
    return (
      <div
        className="callout callout--accent"
        style={{
          margin: "2rem 0",
          padding: "1.25rem 1.5rem",
          backgroundColor: "var(--accent-bg, #f0fdf4)",
          borderLeft: "4px solid var(--accent, #16a34a)",
          borderRadius: "0 0.75rem 0.75rem 0",
          fontSize: "1.0625rem",
          lineHeight: 1.6,
          color: "var(--text-main, #0f172a)",
        }}
      >
        <T s={b.v} />
      </div>
    );
  return null;
}

export default function Article({ params }) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  return (
    <>
      <Header />
      <main style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
        <article style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
          <div
            className="wrap article"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
            }}
          >
            <div className="article__hero">
              <div
                className="article__meta"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontSize: "0.9375rem",
                  color: "var(--text-light, #64748b)",
                  marginBottom: "1.25rem",
                  fontWeight: 500,
                }}
              >
                <Link
                  href="/blog"
                  style={{
                    color: "var(--accent, #2563eb)",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {<T s={"Блог"} />}
                </Link>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>{<T s={a.tag} />}</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>{<T s={a.read} />}</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.025em",
                  color: "#0f172a",
                  marginBottom: "1.25rem",
                }}
              >
                {<T s={a.title} />}
              </h1>

              <p
                className="lead"
                style={{
                  fontSize: "1.25rem",
                  lineHeight: 1.6,
                  color: "#475569",
                  fontWeight: 400,
                  marginBottom: "2.5rem",
                }}
              >
                {<T s={a.lead} />}
              </p>
            </div>
          </div>

          <div
            className="wrap article"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              paddingBottom: "clamp(3.5rem, 2.5rem + 3vw, 6rem)",
            }}
          >
            {a.image && (
              <div
                className="split__media"
                style={{
                  width: "100%",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                  marginBottom: "3rem",
                  aspectRatio: "16/8",
                  backgroundColor: "#f1f5f9",
                }}
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="responsive-banner"
                  width="1300"
                  height="300"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            )}

            <div className="prose">
              {a.blocks.map((b, i) => (
                <Block key={i} b={b} />
              ))}
            </div>

            <div
              className="cta"
              style={{
                marginTop: "4rem",
                padding: "2.5rem 2rem",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "1.25rem",
                textAlign: "center",
                boxShadow: "0 4px 20px -5px rgba(0, 0, 0, 0.03)",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "0.75rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {<T s={"Посчитать доставку под ваш заказ"} />}
              </h2>
              <p
                className="lead"
                style={{
                  fontSize: "1.0625rem",
                  color: "#64748b",
                  marginBottom: "1.75rem",
                  maxWidth: "540px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {
                  <T
                    s={
                      "Менеджер подберёт способ и подтвердит цену за 15 минут."
                    }
                  />
                }
              </p>
              <div
                className="hero__cta"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <a
                  className="btn btn--dark"
                  href="/#calc"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.875rem 1.5rem",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    borderRadius: "0.625rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {<T s={"Открыть калькулятор"} />}{" "}
                  <IconArrow style={{ width: 18, height: 18 }} />
                </a>
                <a
                  className="btn btn--ghost"
                  href={CONTACT.telegram}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.875rem 1.5rem",
                    backgroundColor: "transparent",
                    color: "#0f172a",
                    border: "1px solid #cbd5e1",
                    borderRadius: "0.625rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {<T s={"Написать в Telegram"} />}
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
