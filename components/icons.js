// Minimal inline icon set (stroke 1.7). Single family, consistent weight.
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

export const IconPlane = (p) => (
  <svg {...base} {...p}>
    <path d="M10.5 13.5 3 12l-1-3 2 .5 2 1.5 4-1L6 4l2-1 6 4 5-1.3c1 .2 1.6 1 1.4 1.9-.1.6-.6 1-1.4 1.2L14 11l1 7-2 1-2.5-5.5Z" />
  </svg>
);
export const IconTruck = (p) => (
  <svg {...base} {...p}>
    <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);
export const IconCart = (p) => (
  <svg {...base} {...p}>
    <path d="M3 4h2l2 11h11l2-7H6" />
    <circle cx="9" cy="19" r="1.4" />
    <circle cx="17" cy="19" r="1.4" />
  </svg>
);
export const IconBox = (p) => (
  <svg {...base} {...p}>
    <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
    <path d="M3 8l9 5 9-5M12 13v8" />
  </svg>
);
export const IconBuilding = (p) => (
  <svg {...base} {...p}>
    <path d="M4 21V5l8-2 8 2v16M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01" />
  </svg>
);
export const IconGlobe = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.5 2.6 15 0 18M12 3c-2.6 2.5-2.6 15 0 18" />
  </svg>
);
export const IconShield = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const IconBolt = (p) => (
  <svg {...base} {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);
export const IconPin = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="m4 12 5 5 11-11" />
  </svg>
);
export const IconArrow = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconClock = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const IconCalc = (p) => (
  <svg {...base} {...p}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 7h6M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M9 17h6" />
  </svg>
);
export const IconHeadset = (p) => (
  <svg {...base} {...p}>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13a2 2 0 0 0 2 2h1v-4H6a2 2 0 0 0-2 2ZM20 13a2 2 0 0 1-2 2h-1v-4h1a2 2 0 0 1 2 2ZM18 15v1a3 3 0 0 1-3 3h-3" />
  </svg>
);
