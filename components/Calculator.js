"use client";
import T, { useT } from "./T";
import { useMemo, useState } from "react";
import { ROUTES, TIERS, CONTACT } from "../lib/data";
import { IconClock, IconArrow } from "./icons";

const SERVICE_ORDER = ["ultra", "express", "standard", "auto"];
const FLAG = { uz: "🇺🇿", ru: "🇷🇺", kz: "🇰🇿", kg: "🇰🇬", tj: "🇹🇯", tr: "🇹🇷", ae: "🇦🇪", eu: "🇪🇺", gb: "🇬🇧", us: "🇺🇸", cn: "🇨🇳" };
const POINTS = [{ id: "uz", name: "Узбекистан (Ташкент)" }, ...ROUTES.map((r) => ({ id: r.id, name: r.name }))]
  .map((p) => ({ ...p, label: `${FLAG[p.id] || ""} ${p.name}`.trim() }));
const EXTRAS = ["Надёжная упаковка", "Доставка до двери", "Фотоотчёт", "Забор груза"];

export default function Calculator() {
  const t = useT();
  const [from, setFrom] = useState("ru");
  const [to, setTo] = useState("uz");
  const [weight, setWeight] = useState("3");
  const [service, setService] = useState("express");
  const [cargo, setCargo] = useState("parcel");
  const [dims, setDims] = useState({ l: "", w: "", h: "" });
  const [extras, setExtras] = useState([]);

  const foreignId = from === "uz" ? to : to === "uz" ? from : null;
  const oneIsUz = from === "uz" || to === "uz";
  const route = useMemo(() => ROUTES.find((r) => r.id === foreignId) || null, [foreignId]);
  const byManager = !oneIsUz || !route || route.byManager || from === to;

  const services = useMemo(() => (route && route.rates ? SERVICE_ORDER.filter((s) => route.rates[s]) : []), [route]);
  const activeService = services.includes(service) ? service : services[0];

  // Volumetric weight = L×W×H(cm) / 5000. Billable = max(actual, volumetric, route min).
  const volumetric = useMemo(() => {
    const l = parseFloat(dims.l), w = parseFloat(dims.w), h = parseFloat(dims.h);
    if (l > 0 && w > 0 && h > 0) return (l * w * h) / 5000;
    return 0;
  }, [dims]);

  const result = useMemo(() => {
    if (byManager || !activeService) return null;
    const r = route.rates[activeService];
    const w = parseFloat(weight) || 0;
    const billable = Math.max(w, volumetric, r.min || 0, 0.5);
    return { price: Math.round(r.usd * billable), eta: TIERS[activeService].d, perKg: r.usd, billable: Math.round(billable * 10) / 10, vol: volumetric };
  }, [byManager, route, activeService, weight, volumetric]);

  const swap = () => { setFrom(to); setTo(from); };
  const toggleExtra = (x) => setExtras((p) => (p.includes(x) ? p.filter((e) => e !== x) : [...p, x]));

  return (
    <div className="calc">
      <div className="calc__form">
        <div className="calc__route">
          <div className="field">
            <label htmlFor="from">{<T s={"Откуда"} />}</label>
            <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
              {POINTS.map((p) => <option key={p.id} value={p.id}>{(FLAG[p.id] ? FLAG[p.id] + " " : "") + t(p.name)}</option>)}
            </select>
          </div>
          <button type="button" className="calc__swap" onClick={swap} aria-label={t("Поменять местами")} title={t("Поменять местами")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4v13M7 4L4 7M7 4l3 3M17 20V7M17 20l3-3M17 20l-3-3" /></svg>
          </button>
          <div className="field">
            <label htmlFor="to">{<T s={"Куда"} />}</label>
            <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
              {POINTS.map((p) => <option key={p.id} value={p.id}>{(FLAG[p.id] ? FLAG[p.id] + " " : "") + t(p.name)}</option>)}
            </select>
          </div>
        </div>

        <div className="field">
          <label>{<T s={"Тип груза"} />}</label>
          <div className="calc__seg">
            <button type="button" className="tier" data-on={cargo === "parcel" ? "1" : "0"} onClick={() => setCargo("parcel")}><span className="tier__t">{<T s={"Посылка"} />}</span><span className="tier__d">{<T s={"товары, грузы"} />}</span></button>
            <button type="button" className="tier" data-on={cargo === "docs" ? "1" : "0"} onClick={() => setCargo("docs")}><span className="tier__t">{<T s={"Документы"} />}</span><span className="tier__d">{<T s={"бумаги, конверт"} />}</span></button>
          </div>
        </div>

        <div className="calc__half">
          <div className="field">
            <label htmlFor="weight">{<T s={"Вес, кг"} />}</label>
            <input id="weight" type="number" min="0.5" step="0.5" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="3" />
          </div>
          <div className="field">
            <label>{<T s={"Габариты, см (Д×Ш×В)"} />}</label>
            <div className="calc__dims">
              <input type="number" min="0" value={dims.l} onChange={(e) => setDims((d) => ({ ...d, l: e.target.value }))} placeholder={t("Д")} aria-label={t("Длина")} />
              <span className="x">×</span>
              <input type="number" min="0" value={dims.w} onChange={(e) => setDims((d) => ({ ...d, w: e.target.value }))} placeholder={t("Ш")} aria-label={t("Ширина")} />
              <span className="x">×</span>
              <input type="number" min="0" value={dims.h} onChange={(e) => setDims((d) => ({ ...d, h: e.target.value }))} placeholder={t("В")} aria-label={t("Высота")} />
            </div>
          </div>
        </div>

        {!byManager && (
          <div className="field">
            <label>{<T s={"Скорость доставки"} />}</label>
            <div className="tiers">
              {services.map((s) => (
                <button key={s} type="button" className="tier" data-on={activeService === s ? "1" : "0"} onClick={() => setService(s)} aria-pressed={activeService === s}>
                  <span className="tier__t">{<T s={TIERS[s].t} />}</span><span className="tier__d">{<T s={TIERS[s].d} />}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="field" style={{ marginBottom: 0 }}>
          <label>{<T s={"Дополнительные услуги"} />}</label>
          <div className="calc__chips">
            {EXTRAS.map((x) => (
              <label key={x} className="calc__chip" data-on={extras.includes(x) ? "1" : "0"}>
                <input type="checkbox" checked={extras.includes(x)} onChange={() => toggleExtra(x)} />{<T s={x} />}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="calc__out">
        <div>
          {byManager ? (
            <>
              <div className="calc__price" style={{ fontSize: "clamp(1.6rem,1.2rem+1.4vw,2.1rem)" }}>{<T s={"Расчёт с менеджером"} />}</div>
              <div style={{ color: "rgba(255,255,255,.8)", marginTop: ".6rem", fontSize: ".95rem", maxWidth: "30rem" }}>
                {from === to ? t("Выберите разные точки отправления и назначения.") : t("По этому маршруту считаем индивидуально — оставьте заявку, посчитаем точно под ваш груз.")}
              </div>
            </>
          ) : (
            <>
              <span className="calc__eta"><IconClock style={{ width: 18, height: 18 }} /> {result.eta}</span>
              <div style={{ marginTop: ".6rem" }} className="calc__price">≈ ${result.price}</div>
              <div style={{ color: "rgba(255,255,255,.8)", marginTop: ".4rem", fontSize: ".95rem" }}>
                {result.perKg}{t("$/кг · расчёт от {x} кг").replace("{x}", result.billable)}{result.vol > parseFloat(weight || 0) ? t(" (по объёмному весу)") : ""}
                {extras.length ? t(" · + услуги: {n}").replace("{n}", extras.length) : ""}
              </div>
            </>
          )}
        </div>
        <div style={{ display: "grid", gap: ".9rem" }}>
          <a className="btn btn--primary" href={CONTACT.telegram} style={{ width: "100%" }}>{<T s={"Оформить заявку"} />} <IconArrow style={{ width: 18, height: 18 }} /></a>
          <p className="calc__note">{<T s={"Цены для личных вещей ПВЗ→ПВЗ. Коммерческие и грузы дороже $250 менеджер рассчитает индивидуально. Звонок:"} />} <a href={CONTACT.phoneHref} style={{ color: "#fff", fontWeight: 600 }}>{CONTACT.phone}</a></p>
        </div>
      </div>
    </div>
  );
}
