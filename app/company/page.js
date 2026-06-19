import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { COMPANY } from "../../lib/content";
import { CONTACT } from "../../lib/data";
import { IconCheck } from "../../components/icons";

export const metadata = {
  title: "О компании Ethno Logistics",
  description: "Ethno Logistics — международная транспортно-логистическая компания с 2015 года. Доставка авиа и авто, выкуп, 8 стран в сети.",
};

export default function CompanyPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumb="О компании"
          img="/img/warehouse.jpg"
          title={COMPANY.title}
          sub={COMPANY.text}
        >
          <a className="btn btn--light btn--lg" href={CONTACT.telegram}>Связаться с нами</a>
        </PageHero>

        <section className="section">
          <div className="wrap">
            <div className="shead"><span className="eyebrow">География</span><h2>Возим между 8 странами</h2></div>
            <div className="grid cols-4">
              {COMPANY.countries.map((c, i) => (
                <Reveal key={c} className="card" delay={i * 30} style={{ textAlign: "center" }}>
                  <h3 style={{ marginBottom: 0 }}>{c}</h3>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section panel">
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Документация</span><h2>Все документы — в открытом доступе</h2></div>
            <div className="grid cols-2" style={{ maxWidth: "52rem", margin: "0 auto" }}>
              {COMPANY.docs.map((d, i) => (
                <Reveal key={d} className="aud" delay={i * 30} style={{ display: "flex", alignItems: "center", gap: ".8rem", padding: "1.2rem 1.5rem" }}>
                  <IconCheck style={{ width: 20, height: 20, color: "var(--accent)", flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>{d}</span>
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
