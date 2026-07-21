import LeadButton from "../../components/LeadButton";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Tracking from "../../components/Tracking";
import { CONTACT } from "../../lib/data";
import { COMPANY } from "../../lib/content";
import T from "../../components/T";

export const metadata = {
  title: "Контакты Ethno Logistics",
  description: "Свяжитесь с Ethno Logistics: телефон, Telegram, Instagram. Филиалы в 8 странах. Ответ на заявку в течение 60 минут.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumb="Контакты"
          img="/img/courier.jpg"
          title="Контакты Ethno Logistics"
          sub="Филиалы в 8 странах. Новым клиентам отвечаем в течение 60 минут в рабочее время."
        >
          <LeadButton className="btn btn--light btn--lg" source="Контакты — оставить заявку">{<T s={"Оставить заявку"} />}</LeadButton>
          <a className="btn btn--ghost btn--lg" href={CONTACT.phoneHref} style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.4)" }}>{CONTACT.phone}</a>
        </PageHero>

        <section className="section">
          <div className="wrap grid cols-3">
            <div className="card">
              <h3 style={{ marginBottom: ".5rem" }}>{<T s={"Телефон"} />}</h3>
              <a href={CONTACT.phoneHref} style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.2rem" }}>{CONTACT.phone}</a>
              <p style={{ marginTop: ".6rem" }}>{<T s={"Ответ на заявку в течение 60 минут."} />}</p>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: ".5rem" }}>Telegram</h3>
              <a href={CONTACT.telegram} style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.2rem" }}>@ethnologisticsbot</a>
              <p style={{ marginTop: ".6rem" }}>{<T s={"Заявки, отслеживание и ответы 24/7 в боте."} />}</p>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: ".5rem" }}>Instagram</h3>
              <a href={CONTACT.instagram} style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.2rem" }}>@ethno.uzbekistan</a>
              <p style={{ marginTop: ".6rem" }}>{<T s={"Новости, акции и кейсы доставки."} />}</p>
            </div>
          </div>
        </section>

        <section className="section panel">
          <div className="wrap" style={{ display: "grid", justifyItems: "center", gap: "1.2rem", textAlign: "center" }}>
            <span className="eyebrow">{<T s={"Отслеживание"} />}</span>
            <h2>{<T s={"Где моя посылка?"} />}</h2>
            <p className="lead">{<T s={"Введите номер отправления — покажем актуальный статус."} />}</p>
            <Tracking />
            <p className="muted" style={{ marginTop: "1.4rem" }}><T s="Филиалы:" /> {COMPANY.countries.map((c, i) => <span key={c}>{i ? " · " : ""}<T s={c} /></span>)}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
