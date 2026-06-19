"use client";
import { useEffect } from "react";

// 1) Matrix-style scramble reveal for headings on scroll-in.
// 2) Roll/flip hover for nav links & [data-roll] (text rises, colored copy comes up).
export default function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Roll hover (works even with reduced motion — it's hover, not autoplay) ----
    document.querySelectorAll(".nav a, [data-roll]").forEach((el) => {
      if (el.dataset.roll === "done") return;
      const t = el.textContent;
      el.dataset.roll = "done";
      el.classList.add("roll");
      el.innerHTML = `<span class="roll__a">${t}</span><span class="roll__b" aria-hidden="true">${t}</span>`;
    });

    if (reduce) return;

    // ---- Scramble headings (matrix of digits & symbols, fixed box) ----
    const CH = "0123456789#@%&$*+=/<>{}[]§±?!~^".split("");
    const scramble = (el) => {
      const final = el.getAttribute("data-final");
      const n = final.length;
      const total = Math.min(26, 12 + Math.floor(n / 2));
      // Lock the box so line-count can't change → no flicker / layout shift below.
      const h = el.offsetHeight;
      el.style.height = h + "px";
      el.style.overflow = "hidden";
      el.style.fontVariantNumeric = "tabular-nums";
      let frame = 0;
      const id = setInterval(() => {
        frame++;
        const locked = Math.floor((frame / total) * n);
        let out = "";
        for (let i = 0; i < n; i++) {
          const c = final[i];
          out += i < locked || c === " " || c === "\n" || c === "·" ? c : CH[Math.floor(Math.random() * CH.length)];
        }
        el.textContent = out;
        if (frame >= total) {
          clearInterval(id);
          el.textContent = final;
          el.style.height = "";
          el.style.overflow = "";
          el.style.fontVariantNumeric = "";
        }
      }, 42);
    };

    const heads = [...document.querySelectorAll("main h2")].filter((h) => h.children.length === 0 && h.textContent.trim().length > 1);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        if (e.target.dataset.scrambled) return;
        e.target.dataset.scrambled = "1";
        e.target.setAttribute("data-final", e.target.textContent);
        scramble(e.target);
      });
    }, { threshold: 0.5, rootMargin: "0px 0px -10% 0px" });
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  return null;
}
