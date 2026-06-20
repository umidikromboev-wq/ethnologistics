import Link from "next/link";
import T from "./T";

// Dark first-screen-style hero band for subpages.
export default function PageHero({ title, sub, crumb, img = "/img/hero.jpg", children }) {
  return (
    <section className="page-hero" data-dark-hero="1">
      <img className="page-hero__bg" src={img} alt="" width="1600" height="900" fetchPriority="high" />
      <div className="page-hero__wrap">
        <div className="page-hero__crumb">
          <Link href="/">{<T s={"Главная"} />}</Link>{crumb ? <> / <T s={crumb} /></> : ""}
        </div>
        <h1><T s={title} /></h1>
        {sub ? <p className="page-hero__sub"><T s={sub} /></p> : null}
        {children ? <div className="page-hero__cta">{children}</div> : null}
      </div>
    </section>
  );
}
