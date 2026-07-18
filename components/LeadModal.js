"use client";
import T, { useT } from "./T";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconArrow } from "./icons";

// One modal instance lives in the layout. Anything on the site opens it by
// dispatching the `lead:open` event — that keeps server pages server-rendered
// while still giving every CTA a form instead of a Telegram redirect.
export const LEAD_EVENT = "lead:open";

export function openLead(detail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail }));
}

const EMPTY = { name: "", phone: "", item: "", details: "", website: "" };

export default function LeadModal() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("Заявка с сайта");
  const [context, setContext] = useState("");
  const [data, setData] = useState(EMPTY);
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const phoneRef = useRef(null);
  const closeRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    setStatus(null);
    setSending(false);
  }, []);

  useEffect(() => {
    const onOpen = (e) => {
      const d = e.detail || {};
      setSource(d.source || "Заявка с сайта");
      setContext(d.context || "");
      setData((prev) => ({ ...EMPTY, ...(d.prefill || {}), name: prev.name, phone: prev.phone }));
      setStatus(null);
      setOpen(true);
    };
    window.addEventListener(LEAD_EVENT, onOpen);
    return () => window.removeEventListener(LEAD_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = setTimeout(() => phoneRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(id);
    };
  }, [open, close]);

  const upd = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    if (!data.phone.trim()) {
      setStatus({ ok: false, msg: t("Укажите телефон, чтобы менеджер связался.") });
      return;
    }
    if (!consent) {
      setStatus({ ok: false, msg: t("Отметьте согласие на обработку данных.") });
      return;
    }
    setSending(true);
    setStatus(null);
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          details: [data.details, context].filter(Boolean).join(" · "),
          source,
        }),
      });
      const j = await r.json().catch(() => ({ ok: false }));
      if (r.ok && j.ok) {
        setStatus({ ok: true, msg: t("Заявка отправлена! Менеджер свяжется с вами в ближайшее время.") });
        setData((d) => ({ ...EMPTY, name: d.name, phone: d.phone }));
      } else {
        setStatus({ ok: false, msg: t("Не удалось отправить. Позвоните нам: +998 78 150 15 15") });
      }
    } catch {
      setStatus({ ok: false, msg: t("Не удалось отправить. Позвоните нам: +998 78 150 15 15") });
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div className="lm" role="dialog" aria-modal="true" aria-label={t("Оставить заявку")} onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="lm__box">
        <button type="button" className="lm__close" onClick={close} aria-label={t("Закрыть")} ref={closeRef}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <div className="lm__head">
          <h3 className="lm__title">{<T s={"Оставьте заявку"} />}</h3>
          <p className="lm__sub">{<T s={"Менеджер посчитает точную стоимость и свяжется с вами. Обычно отвечаем в течение 15 минут."} />}</p>
          {context && <div className="lm__ctx">{context}</div>}
        </div>

        <form className="lm__form" onSubmit={submit}>
          <input type="text" name="website" value={data.website} onChange={upd("website")} tabIndex={-1} autoComplete="off" aria-hidden="true" className="lm__hp" />
          <input className="lm__field" value={data.name} onChange={upd("name")} placeholder={t("Ваше имя")} aria-label={t("Имя")} />
          <input className="lm__field" ref={phoneRef} value={data.phone} onChange={upd("phone")} placeholder="+998 __ ___ __ __" aria-label={t("Телефон")} inputMode="tel" />
          <input className="lm__field" value={data.item} onChange={upd("item")} placeholder={t("Что и откуда везём")} aria-label={t("Груз")} />
          <textarea className="lm__field" rows={3} value={data.details} onChange={upd("details")} placeholder={t("Вес, объём, город — если знаете")} aria-label={t("Детали")} />

          <label className="lm__consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>{<T s={"Согласен на обработку персональных данных"} />}</span>
          </label>

          <button className="btn btn--primary lm__submit" type="submit" disabled={sending}>
            {sending ? <T s={"Отправляем…"} /> : <T s={"Отправить заявку"} />}
            {!sending && <IconArrow style={{ width: 18, height: 18 }} />}
          </button>

          {status && <div className={`lm__status ${status.ok ? "is-ok" : "is-err"}`} role="status">{status.msg}</div>}
        </form>
      </div>
    </div>
  );
}
