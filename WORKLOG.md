# WORKLOG — ethno-logistics.com

## 2026-09-05 — canonical, hreflang и sitemap вели на 404
Сделано
- `lib/locales.js`: `SITE_ORIGIN` возвращён к `https://ethno-logistics.com` (был `…/ru` с 16.08, коммиты f869765 → 94a2a9a от abduraufrasulboyev).
- Подтянуты 10 коммитов Абдурауфа (статьи, переводы, картинки blog3–7).
Грабли
- Из-за `/ru` в origin все canonical, hreflang, 120 URL в sitemap.xml и путь к sitemap в robots.txt указывали на `/ru/ru/…`, `/ru/uz/…` — сплошные 404. Статьи «отданы в индексацию» 31.08 в никуда.
- В репо коммитит подрядчик по SEO; сообщения «done» — историю не прочитать. Нужен pre-push чек canonical или защита main.
Осталось
- [ ] 14 из 26 картинок без alt, 2 пустые ссылки на /ru.
- [ ] Переотправить sitemap в Search Console после деплоя.
