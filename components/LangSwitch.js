"use client";
import { useState, useRef, useEffect } from "react";
import { LANGS, useLang } from "./LangProvider";

export default function LangSwitch({ variant = "solid" }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  return (
    <div className={`langsw langsw--${variant}`} ref={ref} data-open={open ? "1" : "0"}>
      <button
        type="button"
        className="langsw__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Сменить язык"
        onClick={() => setOpen((v) => !v)}
      >
        <svg className="langsw__globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
        </svg>
        <span className="langsw__cur">{current.label}</span>
        <svg className="langsw__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <ul className="langsw__menu" role="listbox" aria-label="Языки">
        {LANGS.map((l) => (
          <li key={l.code} role="option" aria-selected={l.code === lang}>
            <button
              type="button"
              className="langsw__opt"
              data-active={l.code === lang ? "1" : "0"}
              onClick={() => { setLang(l.code); setOpen(false); }}
            >
              <span className="langsw__optlabel">{l.label}</span>
              <span className="langsw__optname">{l.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
