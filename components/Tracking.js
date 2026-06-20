"use client";
import T, { useT } from "./T";
import { useState } from "react";
import { CONTACT } from "../lib/data";
import { IconPin } from "./icons";

export default function Tracking() {
  const t = useT();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const c = code.trim();
    if (!c) {
      setMsg(t("Введите номер отправления, чтобы узнать статус."));
      return;
    }
    setMsg(
      t("Проверяем отправление {n}… Актуальный статус пришлём в Telegram или сообщит менеджер по номеру {phone}.")
        .replace("{n}", c).replace("{phone}", CONTACT.phone)
    );
  };

  return (
    <form className="track" onSubmit={submit}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={t("Номер отправления, напр. ETH-...")}
        aria-label={t("Номер отправления")}
      />
      <button type="submit" className="btn btn--dark">
        <IconPin style={{ width: 18, height: 18 }} /> {<T s={"Отследить"} />}
      </button>
      {msg && <p className="track__msg" role="status">{msg}</p>}
    </form>
  );
}
