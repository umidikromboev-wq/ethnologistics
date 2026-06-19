"use client";
import { useState } from "react";
import { CONTACT } from "../lib/data";
import { IconPin } from "./icons";

export default function Tracking() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const c = code.trim();
    if (!c) {
      setMsg("Введите номер отправления, чтобы узнать статус.");
      return;
    }
    setMsg(
      `Проверяем отправление ${c}… Актуальный статус пришлём в Telegram или сообщит менеджер по номеру ${CONTACT.phone}.`
    );
  };

  return (
    <form className="track" onSubmit={submit}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Номер отправления, напр. ETH-..."
        aria-label="Номер отправления"
      />
      <button type="submit" className="btn btn--dark">
        <IconPin style={{ width: 18, height: 18 }} /> Отследить
      </button>
      {msg && <p className="track__msg" role="status">{msg}</p>}
    </form>
  );
}
