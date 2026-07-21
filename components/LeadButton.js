"use client";
import { openLead } from "./LeadModal";

// CTA that opens the lead modal. Replaces the old Telegram deep links so every
// button on the site captures a lead into Telegram + Bitrix instead of handing
// the visitor off to a chat app.
export default function LeadButton({ children, source, context, className = "btn btn--primary", style, prefill }) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => openLead({ source, context, prefill })}
    >
      {children}
    </button>
  );
}
