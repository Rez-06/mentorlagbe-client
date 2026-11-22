"use client";

import { useEffect, useRef } from "react";

// Two joined circles (chalkboard + books), arced headline and a Saturn-style looping text ring.
// The ring passes BEHIND the blue circle (left half) and IN FRONT of the yellow circle (right half),
// and the text slowly circulates around it.
// All geometry is computed here so the neck between the circles stays smooth.

const C1 = { x: 360, y: 300 };
const R1 = 170;
const R2 = 230;
const GAP = 60;
const ANGLE = (8 * Math.PI) / 180;
const FILLET = 40;

const D = R1 + R2 + GAP;
const C2 = { x: C1.x + D * Math.cos(ANGLE), y: C1.y + D * Math.sin(ANGLE) };

function tangent(c, r, f) {
  const l = Math.hypot(f.x - c.x, f.y - c.y);
  return { x: c.x + ((f.x - c.x) * r) / l, y: c.y + ((f.y - c.y) * r) / l };
}

function buildBlob() {
  const ux = Math.cos(ANGLE);
  const uy = Math.sin(ANGLE);
  const px = -uy;
  const py = ux;
  const a = R1 + FILLET;
  const b = R2 + FILLET;
  const x = (a * a - b * b + D * D) / (2 * D);
  const h = Math.sqrt(a * a - x * x);
  const base = { x: C1.x + ux * x, y: C1.y + uy * x };
  const top = { x: base.x - px * h, y: base.y - py * h };
  const bottom = { x: base.x + px * h, y: base.y + py * h };
  const A2 = tangent(C1, R1, top);
  const B2 = tangent(C2, R2, top);
  const A1 = tangent(C1, R1, bottom);
  const B1 = tangent(C2, R2, bottom);
  const p = (q) => `${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
  const path = `M ${p(A2)} A ${FILLET} ${FILLET} 0 0 0 ${p(B2)} A ${R2} ${R2} 0 1 1 ${p(B1)} A ${FILLET} ${FILLET} 0 0 0 ${p(A1)} A ${R1} ${R1} 0 1 1 ${p(A2)} Z`;
  return { path, base };
}

const { path: BLOB, base: NECK } = buildBlob();

// Arc that hugs the left side of circle 1 (headline runs along it)
const ARC_R = R1 + 30;
const polar = (deg, r) => {
  const t = (deg * Math.PI) / 180;
  return `${(C1.x + r * Math.cos(t)).toFixed(1)} ${(C1.y + r * Math.sin(t)).toFixed(1)}`;
};
const ARC = `M ${polar(112, ARC_R)} A ${ARC_R} ${ARC_R} 0 1 1 ${polar(332, ARC_R)}`;

// Ellipse that loops around the neck
const RX = 140;
const RY = 235;
const RING = `M ${NECK.x - RX} ${NECK.y} a ${RX} ${RY} 0 1 1 ${2 * RX} 0 a ${RX} ${RY} 0 1 1 ${-2 * RX} 0`;

// Exact length of the ellipse, so the circulating text wraps around with no seam
function ellipseLength(rx, ry) {
  const n = 720;
  let len = 0;
  let px = rx;
  let py = 0;
  for (let i = 1; i <= n; i++) {
    const t = (2 * Math.PI * i) / n;
    const x = rx * Math.cos(t);
    const y = ry * Math.sin(t);
    len += Math.hypot(x - px, y - py);
    px = x;
    py = y;
  }
  return len;
}
const RING_LEN = ellipseLength(RX, RY);
const RING_TEXT = "LEARN ANYWHERE \u2022 ONLINE OR AT HOME \u2022 1-ON-1 MENTORSHIP \u2022 VERIFIED TUTORS \u2022 APPROVED BY ADMINS \u2022 ";
const RING_TILT = 10; // degrees
const LOOP_SECONDS = 50; // time for the text to go once around the ring
const CLIP_Y = NECK.y - RY - 60;
const CLIP_H = 2 * RY + 120;

// One copy of the ring. Drawn twice: the left half behind the circles, the right half in front.
function RingLayer({ clipId, register }) {
  return (
    <g transform={`rotate(${RING_TILT} ${NECK.x} ${NECK.y})`}>
      <g style={{ mixBlendMode: "difference" }}>
        <g clipPath={`url(#${clipId})`}>
          {/* thin halo lines, like Saturn's rings */}
          <ellipse cx={NECK.x} cy={NECK.y} rx={RX - 8} ry={RY - 8} fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.5" />
          <ellipse cx={NECK.x} cy={NECK.y} rx={RX + 26} ry={RY + 26} fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.5" />
          <text
            fontSize="15"
            fontWeight="700"
            letterSpacing="3"
            style={{ fontFamily: "var(--font-space-mono), monospace", fill: "#ffffff" }}
          >
            <textPath
              ref={register}
              href="#hero-ring"
              textLength={2 * RING_LEN}
              lengthAdjust="spacing"
              startOffset={-RING_LEN}
            >
              {RING_TEXT + RING_TEXT}
            </textPath>
          </text>
        </g>
      </g>
    </g>
  );
}

const SPARK = "M0-12C1-4 4-1 12 0 4 1 1 4 0 12-1 4-4 1-12 0-4-1-1-4 0-12Z";

function Sparkle({ x, y, s = 1, fill }) {
  return <path d={SPARK} transform={`translate(${x} ${y}) scale(${s})`} fill={fill} stroke="none" />;
}

export default function HeroStage({ className = "" }) {
  // Both halves of the ring share one animation clock. It is driven from JS
  // (not SVG <animate>) because mobile Safari / some phones ignore SMIL on textPath.
  const paths = useRef(new Set());
  const register = (el) => {
    if (el) paths.current.add(el);
  };

  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = (((now - start) / 1000) % LOOP_SECONDS) / LOOP_SECONDS;
      const offset = (-RING_LEN + progress * RING_LEN).toFixed(2);
      paths.current.forEach((el) => {
        if (el.isConnected) el.setAttribute("startOffset", offset);
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg viewBox="0 0 1120 700" className={className} aria-hidden="true">
      <defs>
        <clipPath id="hero-blob">
          <path d={BLOB} />
        </clipPath>
        <path id="hero-arc" d={ARC} />
        <path id="hero-ring" d={RING} />
        {/* ring halves, in the ring's own (tilted) coordinate space */}
        <clipPath id="ring-back-half">
          <rect x={NECK.x - RX - 60} y={CLIP_Y} width={RX + 60} height={CLIP_H} />
        </clipPath>
        <clipPath id="ring-front-half">
          <rect x={NECK.x} y={CLIP_Y} width={RX + 60} height={CLIP_H} />
        </clipPath>
      </defs>

      {/* page-colour backdrop so the blend-mode text works in light and dark */}
      <rect width="1120" height="700" style={{ fill: "var(--color-base-100)" }} />

      {/* ghost outline word */}
      <text
        x="0"
        y="690"
        fontSize="300"
        fontWeight="600"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="1.5"
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
        mentor
      </text>

      {/* ---------- ring, back half (hidden behind the blue circle) ---------- */}
      <RingLayer clipId="ring-back-half" register={register} />

      {/* ---------- the two joined circles ---------- */}
      <g clipPath="url(#hero-blob)">
        <path d={BLOB} fill="#2B55D6" />

        {/* circle 1: chalkboard */}
        <g
          transform={`translate(${C1.x} ${C1.y})`}
          fill="none"
          stroke="#FFFBF2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <text
            x="0"
            y="-78"
            textAnchor="middle"
            fontSize="26"
            fill="#FFFBF2"
            stroke="none"
            style={{ fontFamily: "var(--font-space-mono), monospace" }}
          >
            a² + b² = c²
          </text>
          <path d="M-130 30 H-10 M-110 50 V-30" strokeOpacity="0.7" />
          <path d="M-112 10 C-96 -34 -76 -34 -60 10 S-24 54 -8 10" stroke="#F6B22B" />
          <path d="M30 100 H120 V30 Z" />
          <path d="M104 100 V84 H120" strokeWidth="2.5" />
          <g transform="translate(70 -10)">
            <ellipse rx="34" ry="12" />
            <ellipse rx="34" ry="12" transform="rotate(60)" />
            <ellipse rx="34" ry="12" transform="rotate(120)" />
            <circle r="5" fill="#F6B22B" stroke="none" />
          </g>
          <text
            x="-65"
            y="96"
            textAnchor="middle"
            fontSize="18"
            fill="#FFFBF2"
            stroke="none"
            opacity="0.85"
            style={{ fontFamily: "var(--font-space-mono), monospace" }}
          >
            y = sin x
          </text>
          <Sparkle x={-105} y={-40} s={0.9} fill="#F6B22B" />
          <Sparkle x={115} y={-80} s={0.7} fill="#FFFBF2" />
        </g>

        {/* circle 2: books + mortarboard */}
        <circle cx={C2.x} cy={C2.y} r={R2} fill="#F6B22B" />
        <g transform={`translate(${C2.x} ${C2.y + 25})`}>
          <ellipse cx="0" cy="132" rx="150" ry="12" fill="#111111" opacity="0.15" />
          <rect x="-130" y="76" width="260" height="46" rx="8" fill="#111111" />
          <rect x="-110" y="88" width="226" height="22" rx="3" fill="#FFFBF2" />
          <rect x="-105" y="28" width="210" height="46" rx="8" fill="#2B55D6" transform="rotate(-3 0 50)" />
          <rect x="-85" y="40" width="176" height="22" rx="3" fill="#FFFBF2" transform="rotate(-3 0 50)" />
          <rect x="-85" y="-18" width="170" height="44" rx="8" fill="#FFFBF2" stroke="#111111" strokeWidth="4" transform="rotate(2 0 4)" />
          <path d="M-60 -6 H60 M-60 8 H30" stroke="#111111" strokeWidth="3" strokeLinecap="round" opacity="0.45" transform="rotate(2 0 4)" />
          <path d="M-62 -104 V-62 C-62 -40 62 -40 62 -62 V-104 L0 -78 Z" fill="#2a2a2a" />
          <path d="M0 -168 L118 -122 L0 -76 L-118 -122 Z" fill="#111111" />
          <path d="M118 -122 V-70" stroke="#2B55D6" strokeWidth="6" strokeLinecap="round" />
          <circle cx="118" cy="-62" r="9" fill="#2B55D6" />
          <Sparkle x={-170} y={-60} s={1.2} fill="#111111" />
          <Sparkle x={165} y={20} s={0.9} fill="#FFFBF2" />
        </g>
      </g>

      {/* ---------- arced headline ---------- */}
      <text
        fontSize="70"
        fontWeight="700"
        letterSpacing="-2"
        style={{ fontFamily: "var(--font-poppins), sans-serif", fill: "currentColor" }}
      >
        <textPath href="#hero-arc">
          Find your <tspan style={{ fill: "var(--color-secondary)" }}>tutor</tspan>
        </textPath>
      </text>

      {/* ---------- ring, front half (passes in front of the yellow circle) ---------- */}
      <RingLayer clipId="ring-front-half" register={register} />

      {/* motion lines + sparkles */}
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <path d="M1068 250 C1104 340 1104 450 1060 548" />
        <path d="M1088 285 C1114 350 1112 430 1084 500" opacity="0.6" />
      </g>
      <Sparkle x={70} y={110} s={1.1} fill="#F6B22B" />
      <Sparkle x={1070} y={150} s={0.9} fill="#2B55D6" />
      <Sparkle x={210} y={600} s={0.8} fill="#2B55D6" />
    </svg>
  );
}