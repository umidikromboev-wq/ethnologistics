"use client";
import T, { useT } from "./T";
import { useState } from "react";

export default function LeadForm() {
  const t = useT();
  const [data, setData] = useState({ name: "", phone: "", item: "", details: "", website: "" });
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState(null); // {ok, msg}
  const [sending, setSending] = useState(false);

  const upd = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    if (!data.phone.trim()) { setStatus({ ok: false, msg: t("Укажите телефон, чтобы менеджер связался.") }); return; }
    if (!consent) { setStatus({ ok: false, msg: t("Отметьте согласие на обработку данных.") }); return; }
    setSending(true); setStatus(null);
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "Форма «Рассчитать доставку»" }),
      });
      const j = await r.json().catch(() => ({ ok: false }));
      if (r.ok && j.ok) {
        setStatus({ ok: true, msg: t("Заявка отправлена! Менеджер посчитает стоимость и свяжется в течение 60 минут.") });
        setData({ name: "", phone: "", item: "", details: "" });
      } else {
        setStatus({ ok: false, msg: t("Не удалось отправить. Напишите в Telegram @ethnologisticsbot.") });
      }
    } catch {
      setStatus({ ok: false, msg: t("Ошибка сети. Напишите в Telegram @ethnologisticsbot.") });
    }
    setSending(false);
  };

  return (
    <form className="lead-form" onSubmit={submit}>
      <input type="text" name="website" value={data.website} onChange={upd("website")} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
      <input className="lead-field" value={data.name} onChange={upd("name")} placeholder={t("Ваше имя")} aria-label={t("Имя")} />
      <input className="lead-field" value={data.phone} onChange={upd("phone")} placeholder="+998 __ ___ __ __" aria-label={t("Телефон")} inputMode="tel" />
      <input className="lead-field" value={data.item} onChange={upd("item")} placeholder={t("Что и откуда везём (товар, страна)")} aria-label={t("Товар")} />
      <textarea className="lead-field" value={data.details} onChange={upd("details")} placeholder={t("Вес и объём партии, город отправления")} aria-label={t("Детали")} />
      <label className="lead-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>{<T s={"Я даю согласие на обработку персональных данных в соответствии с политикой конфиденциальности"} />}</span>
      </label>
      <button className="lead-submit" type="submit" disabled={sending}>
        {sending ? t("Отправляем…") : t("Получить расчёт")}
      </button>
      {status && <div className={`lead-status ${status.ok ? "ok" : "err"}`} role="status">{status.msg}</div>}
    </form>
  );
}
