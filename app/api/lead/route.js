// Lead intake — forwards a calculation request to Telegram.
// Env (set in Vercel): TG_BOT_TOKEN, TG_CHAT_ID.
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

export async function POST(req) {
  let body = {};
  try { body = await req.json(); } catch { body = {}; }
  const clean = (v, n) => (v == null ? "" : String(v)).trim().slice(0, n);

  // honeypot — bots fill the hidden field; accept silently so they think it worked
  if (clean(body.website, 50)) return Response.json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "0";
  if (limited(ip)) return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 60);
  const item = clean(body.item, 200);
  const details = clean(body.details, 400);
  const source = clean(body.source, 80) || "Форма сайта";

  if (!phone) return Response.json({ ok: false, error: "no_phone" }, { status: 400 });

  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 200 });
  }

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
    return Response.json({ ok: !!j.ok });
  } catch {
    return Response.json({ ok: false, error: "send_failed" }, { status: 200 });
  }
}
