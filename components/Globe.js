"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const GlobeGL = dynamic(() => import("react-globe.gl"), { ssr: false });

// Latin labels — WebGL globe text can't render Cyrillic (shows ???).
const TASHKENT = { name: "Tashkent", lat: 41.31, lng: 69.24 };
const ORIGINS = [
  { name: "Moscow", lat: 55.75, lng: 37.62 },
  { name: "Almaty", lat: 43.24, lng: 76.89 },
  { name: "Bishkek", lat: 42.87, lng: 74.59 },
  { name: "Dushanbe", lat: 38.56, lng: 68.79 },
  { name: "Istanbul", lat: 41.01, lng: 28.98 },
  { name: "Dubai", lat: 25.2, lng: 55.27 },
  { name: "Guangzhou", lat: 23.13, lng: 113.26 },
  { name: "Beijing", lat: 39.9, lng: 116.4 },
  { name: "Seoul", lat: 37.57, lng: 126.98 },
  { name: "Tokyo", lat: 35.68, lng: 139.69 },
  { name: "Delhi", lat: 28.61, lng: 77.21 },
  { name: "London", lat: 51.51, lng: -0.13 },
  { name: "Berlin", lat: 52.52, lng: 13.4 },
  { name: "Paris", lat: 48.86, lng: 2.35 },
  { name: "Milan", lat: 45.46, lng: 9.19 },
  { name: "Madrid", lat: 40.42, lng: -3.7 },
  { name: "Warsaw", lat: 52.23, lng: 21.01 },
  { name: "New York", lat: 40.71, lng: -74.01 },
  { name: "Baku", lat: 40.41, lng: 49.87 },
  { name: "Tbilisi", lat: 41.72, lng: 44.79 },
];

const ARCS = ORIGINS.map((o) => ({
  startLat: o.lat, startLng: o.lng, endLat: TASHKENT.lat, endLng: TASHKENT.lng,
}));
const POINTS = [...ORIGINS.map((o) => ({ ...o, size: 0.6, color: "#c6a36a" })),
  { ...TASHKENT, size: 1.1, color: "#6db0e8" }];

export default function Globe() {
  const wrap = useRef(null);
  const globe = useRef(null);
  const [dim, setDim] = useState(0);

  useEffect(() => {
    const measure = () => { if (wrap.current) setDim(Math.min(wrap.current.clientWidth, 560)); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!globe.current) return;
    const g = globe.current;
    g.pointOfView({ lat: 34, lng: 62, altitude: 2.1 }, 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = g.controls();
    c.enableZoom = false;
    c.autoRotate = !reduce;
    c.autoRotateSpeed = 0.45;
  }, [dim]);

  if (!dim) return <div ref={wrap} style={{ width: "100%", aspectRatio: "1/1", maxWidth: 560 }} />;

  return (
    <div ref={wrap} style={{ width: "100%", display: "grid", placeItems: "center" }}>
      <GlobeGL
        ref={globe}
        width={dim}
        height={dim}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="/img/earth.jpg"
        atmosphereColor="#5b9bd6"
        atmosphereAltitude={0.18}
        arcsData={ARCS}
        arcColor={() => ["rgba(198,163,106,0.1)", "#e6cd97"]}
        arcStroke={0.5}
        arcDashLength={0.45}
        arcDashGap={0.25}
        arcDashAnimateTime={2200}
        arcAltitudeAutoScale={0.45}
        pointsData={POINTS}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.012}
        pointRadius="size"
        labelsData={POINTS}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelSize={0.9}
        labelColor={() => "rgba(255,255,255,0.75)"}
        labelDotRadius={0.3}
        labelResolution={1}
      />
    </div>
  );
}
