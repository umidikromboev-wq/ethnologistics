// Lead intake — forwards a calculation request to Telegram AND Bitrix24 CRM.
// Env (set in Vercel):
//   TG_BOT_TOKEN, TG_CHAT_ID           — Telegram notification
//   BITRIX_WEBHOOK_URL                 — base inbound webhook, e.g.
//     https://<portal>.bitrix24.kz/rest/1/<code>   (method crm.lead.add.json is appended)
const hits = new Map(); // basic per-instance rate limit
function limited(ip) {
  const now = Date.now();
  const win = 60_000, max = 6;
  const arr = (hits.get(ip) || []).filter((t) => now - t < win);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > max;
}

// --- Telegram ---------------------------------------------------------------
async function toTelegram({ name, phone, item, details, source }) {
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) return false;
  const lines = [
    "🟦 Заявка на расчёт — Ethno Logistics",
    "",
    name ? `Имя: ${name}` : null,
    `Телефон: ${phone}`,
    item ? `Что везём: ${item}` : null,
    details ? `Детали: ${details}` : null,
    `Источник: ${source}`,
  ].filter(Boolean);
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: lines.join("\n"), disable_web_page_preview: true }),
    });
    const j = await r.json();
    return !!j.ok;
  } catch {
    return false;
  }
}

// --- Bitrix24 CRM (crm.lead.add) -------------------------------------------
async function toBitrix({ name, phone, item, details, source }) {
  const base = process.env.BITRIX_WEBHOOK_URL;
  if (!base) return false;
  const url = base.replace(/\/+$/, "") + "/crm.lead.add.json";
  const fields = {
    TITLE: `Заявка с сайта${name ? " — " + name : ""}`,
    NAME: name || "",
    PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
    UF_CRM_1782907941: item || "",     // Что и откуда везём
    UF_CRM_1782908586: details || "",  // Вес и объём партии
    SOURCE_ID: "UC_Q8Y4XX",
    STATUS_ID: "IN_PROCESS",
    ASSIGNED_BY_ID: 1,
    COMMENTS: source || "",
  };
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields, params: { REGISTER_SONET_EVENT: "Y" } }),
    });
    const j = await r.json();
    return !!j.result; // Bitrix returns the new lead id in `result`
  } catch {
    return false;
  }
}

export async function POST(req) {
  let body = {};
  try { body = await req.json(); } catch { body = {}; }
  const clean = (v, n) => (v == null ? "" : String(v)).trim().slice(0, n);

  // honeypot — bots fill the hidden field; accept silently so they think it worked
  if (clean(body.website, 50)) return Response.json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "0";
  if (limited(ip)) return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const lead = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 60),
    item: clean(body.item, 200),
    details: clean(body.details, 400),
    source: clean(body.source, 80) || "Форма сайта",
  };

  if (!lead.phone) return Response.json({ ok: false, error: "no_phone" }, { status: 400 });

  // Send to both channels in parallel — one failing must not block the other.
  const [tg, bx] = await Promise.all([toTelegram(lead), toBitrix(lead)]);

  // Lead is considered delivered if it reached at least one destination.
  return Response.json({ ok: tg || bx, delivered: { telegram: tg, bitrix: bx } });
}
