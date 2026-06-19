import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { BUSINESS_SEGMENTS } from "../../lib/content";
import { CONTACT } from "../../lib/data";
import { IconArrow } from "../../components/icons";

export const metadata = {
  title: "Логистика для бизнеса — корпоративная доставка",
  description: "Доставка под потребности вашего бизнеса: маркетплейсы, интернет-магазины, соцсети, мультиселлеры. Гибкие тарифы, API-интеграция, персональный менеджер.",
};

export default function BusinessPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumb="Для бизнеса"
          img="/img/warehouse.jpg"
          title="Логистика для бизнеса любого масштаба"
          sub="Доставка, адаптированная под ваш бизнес: гибкие тарифы, удобные условия и сроки, интеграция и персональный менеджер."
        >
          <a className="btn btn--light btn--lg" href={CONTACT.telegram}>Оставить заявку</a>
        </PageHero>

        <section className="section">
          <div className="wrap">
            <div className="shead--edit"><span className="sidx">Решения</span><h2>Подходим для бизнеса любого масштаба</h2></div>
            <div className="biz-bento">
              {BUSINESS_SEGMENTS.map((s, i) => (
                <Reveal key={s.t} className="biz-card" delay={i * 60}>
                  <span className="biz-card__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <a className="link" href={CONTACT.telegram}>Узнать подробнее <IconArrow style={{ width: 16, height: 16 }} /></a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="fullbleed">
          <img className="fullbleed__bg" src="/img/plane.jpg" alt="" width="1600" height="900" loading="lazy" />
          <div className="fullbleed__inner">
            <h2>Соберём доставку под ваш бизнес</h2>
            <p className="lead">Подключайте только нужные услуги. Не нашли подходящих опций — найдём индивидуальное решение.</p>
            <a className="btn btn--light btn--lg" href={CONTACT.telegram}>Обсудить поставки</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
