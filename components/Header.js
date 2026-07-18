"use client";
import LeadButton from "./LeadButton";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CONTACT } from "../lib/data";
import { useT } from "./T";
import LangSwitch from "./LangSwitch";

const LINKS = [
  { href: "/stores", label: "Магазины" },
  { href: "/how-it-works", label: "Как это работает" },
  { href: "/business", label: "Бизнесу" },
  { href: "/company", label: "О компании" },
  { href: "/#calc", label: "Расчёт" },
  { href: "/contact", label: "Контакты" },
];

const Soc = {
  tg: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 4.5L2.5 11l6 2.2L11 20l3.2-4.3L20 19z" /></svg>),
  ig: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>),
  yt: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" /></svg>),
};

export default function Header() {
  const t = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hasDark, setHasDark] = useState(false);
  const [solid, setSolid] = useState(true);

  useEffect(() => {
    const dark = !!document.querySelector("[data-dark-hero]");
    setHasDark(dark);
    if (!dark) { setSolid(true); return; }
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const ghost = hasDark && !solid && !open;

  return (
    <header className={`hdr ${hasDark ? "hdr--over" : ""} ${ghost ? "hdr--ghost" : "hdr--solid"}`}>
      <div className="wrap hdr__row">
        <Link href="/" className="logo" aria-label="Ethno Logistics — на главную" onClick={() => setOpen(false)}>
          <img
            src={ghost ? "/img/logo-white.png" : "/img/logo-navy.png"}
            alt="Ethno Logistics"
            width="156"
            height="50"
            style={{ height: 30, width: "auto" }}
          />
        </Link>
        <nav className="nav" aria-label="Основная навигация">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} data-active={!l.href.includes("#") && pathname === l.href ? "1" : "0"} aria-current={pathname === l.href ? "page" : undefined}>{t(l.label)}</a>
          ))}
        </nav>
        <div className="hdr__cta">
          {ghost ? (
            <>
              <div className="hdr__socials">
                <a className="hdr__soc" href={CONTACT.telegram} aria-label="Telegram">{Soc.tg}</a>
                <a className="hdr__soc" href={CONTACT.instagram} aria-label="Instagram">{Soc.ig}</a>
                <a className="hdr__soc" href={CONTACT.telegram} aria-label="YouTube">{Soc.yt}</a>
              </div>
              <a className="hdr__login" href="https://ethnologistics.com" aria-label="Вход в личный кабинет">{t("Вход")}</a>
              <LeadButton className="btn hdr__tg" source="Шапка — связаться">{t("Связаться")}</LeadButton>
              <LangSwitch variant="ghost" />
            </>
          ) : (
            <>
              <a className="hdr__phone" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a className="hdr__login" href="https://ethnologistics.com" aria-label="Вход в личный кабинет">{t("Вход")}</a>
              <a className="btn btn--primary" href="/#calc">{t("Рассчитать")}</a>
              <LangSwitch variant="solid" />
            </>
          )}
          <button
            className="burger"
            data-open={open ? "1" : "0"}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div className="mobile-menu" data-open={open ? "1" : "0"}>
        <button className="mobile-menu__close" onClick={() => setOpen(false)} aria-label="Закрыть меню">✕</button>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{t(l.label)}</a>
        ))}
        <a href={CONTACT.phoneHref} onClick={() => setOpen(false)}>{CONTACT.phone}</a>
        <LangSwitch variant="mobile" />
      </div>
    </header>
  );
}
