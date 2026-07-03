"use client";
import { useEffect } from "react";

// Roll/flip hover for nav links & [data-roll] (text rises, colored copy comes up).
// (The matrix scramble-reveal on headings was removed — headings render as plain text.)
export default function Effects() {
  useEffect(() => {
    // ---- Roll hover (works even with reduced motion — it's hover, not autoplay) ----
    document.querySelectorAll(".nav a, [data-roll]").forEach((el) => {
      if (el.dataset.roll === "done") return;
      const t = el.textContent;
      el.dataset.roll = "done";
      el.classList.add("roll");
      el.innerHTML = `<span class="roll__a">${t}</span><span class="roll__b" aria-hidden="true">${t}</span>`;
    });
  }, []);

  return null;
}
