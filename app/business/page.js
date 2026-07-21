import LeadButton from "../../components/LeadButton";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { BUSINESS_SEGMENTS } from "../../lib/content";
import { CONTACT } from "../../lib/data";
import { IconArrow } from "../../components/icons";
import T from "../../components/T";

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
          <LeadButton className="btn btn--light btn--lg" source="Бизнесу — оставить заявку">{<T s={"Оставить заявку"} />}</LeadButton>
        </PageHero>

        <section className="section">
          <div className="wrap">
            <div className="shead--edit"><span className="sidx">{<T s={"Решения"} />}</span><h2>{<T s={"Подходим для бизнеса любого масштаба"} />}</h2></div>
            <div className="biz-bento">
              {BUSINESS_SEGMENTS.map((s, i) => (
                <Reveal key={s.t} className="biz-card" delay={i * 60}>
                  <span className="biz-card__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{<T s={s.t} />}</h3>
                  <p>{<T s={s.d} />}</p>
                  <LeadButton className="link" source="Бизнесу — узнать подробнее">{<T s={"Узнать подробнее"} />} <IconArrow style={{ width: 16, height: 16 }} /></LeadButton>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="fullbleed">
          <img className="fullbleed__bg" src="/img/plane.jpg" alt="" width="1600" height="900" loading="lazy" />
          <div className="fullbleed__inner">
            <h2>{<T s={"Соберём доставку под ваш бизнес"} />}</h2>
            <p className="lead">{<T s={"Подключайте только нужные услуги. Не нашли подходящих опций — найдём индивидуальное решение."} />}</p>
            <LeadButton className="btn btn--light btn--lg" source="Бизнесу — обсудить поставки">{<T s={"Обсудить поставки"} />}</LeadButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
