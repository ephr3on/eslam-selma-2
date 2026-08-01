"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { GoldParticles } from "@/components/ui/GoldParticles";
import { FloatingOrnament } from "@/components/ui/FloatingOrnament";
import { invitationData } from "@/data/invitation";

/* ────────────────────────────────────────────────────────────────
   Seal geometry — every coordinate is derived, never hand-placed.
   Centre is (100, 100); angles start at 12 o'clock and run clockwise.
   ──────────────────────────────────────────────────────────────── */
const C = 100;

/** Point on a circle of radius r at `deg` degrees from 12 o'clock. */
function polar(r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
}

/**
 * Closed star polygon with `points` arms, alternating outer/inner radii.
 * Equal arm lengths and equal angular spacing by construction.
 */
function starPath(points: number, outerR: number, innerR: number, rotation = 0) {
  const step = 360 / (points * 2);
  return (
    Array.from({ length: points * 2 }, (_, i) => {
      const [x, y] = polar(i % 2 === 0 ? outerR : innerR, rotation + i * step);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(" ") + " Z"
  );
}

/* Ratio for a true {8/3} star polygon — the classic Islamic khātim.
   cos(3π/8) / cos(2π/8) ≈ 0.5412 */
const STAR_RATIO = Math.cos((3 * Math.PI) / 8) / Math.cos((2 * Math.PI) / 8);

/* Concentric rings, 12 units apart */
const RING_OUTER = 94;
const RING_MID = 82;
const RING_INNER = 70;

/* Star arms end exactly on RING_INNER; their valleys define the core disc */
const STAR_OUTER = RING_INNER;
const STAR_INNER = STAR_OUTER * STAR_RATIO; // ≈ 37.88 — also the core radius

const STAR_A = starPath(8, STAR_OUTER, STAR_INNER, 0);
const STAR_B = starPath(8, STAR_OUTER, STAR_INNER, 22.5);
const STAR_CORE = starPath(8, 19, 19 * STAR_RATIO, 22.5);

/* 16 tick marks in the band between RING_INNER and RING_MID */
const TICKS = Array.from({ length: 16 }, (_, i) => i * 22.5);
const TICK_FROM = 73;
const TICK_TO = 79;

/* 8 dots in the band between RING_MID and RING_OUTER */
const DOTS = Array.from({ length: 8 }, (_, i) => i * 45);
const DOT_R = 88;

/* Rotation pivot for the spinning groups — the exact centre of the
   viewBox. `transformBox: view-box` makes the origin resolve against
   the SVG's own coordinate system rather than each element's bbox,
   which is what keeps the spin from wobbling. */
const SPIN_ORIGIN: React.CSSProperties = {
  transformOrigin: `${C}px ${C}px`,
  transformBox: "view-box",
};

function IslamicSeal() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-48 h-48 md:w-56 md:h-56 -translate-y-2"
      aria-hidden="true"
    >
      {/* Ring 1 — outermost hairline */}
      <motion.circle
        cx={C} cy={C} r={RING_OUTER}
        stroke="#D4B96A"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Ring 2 — the anchor line of the composition */}
      <motion.circle
        cx={C} cy={C} r={RING_MID}
        stroke="#B8943F"
        strokeWidth="0.8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Ring 3 — dashed; the star's arms land exactly on it */}
      <motion.circle
        cx={C} cy={C} r={RING_INNER}
        stroke="#D4B96A"
        strokeWidth="0.4"
        strokeDasharray="3 5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Star A — {8/3} khātim, point at 12 o'clock. Rotates clockwise. */}
      <motion.g
        style={SPIN_ORIGIN}
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        <motion.path
          d={STAR_A}
          stroke="#C9A84C"
          strokeWidth="0.9"
          fill="rgba(212,185,106,0.04)"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.55 } : {}}
          transition={{ duration: 2.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.g>

      {/* Star B — same star rotated 22.5°, forming a 16-fold rosette.
          Counter-rotates, so the two layers weave through each other. */}
      <motion.g
        style={SPIN_ORIGIN}
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        <motion.path
          d={STAR_B}
          stroke="#B8943F"
          strokeWidth="0.45"
          fill="none"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.2 } : {}}
          transition={{ duration: 2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.g>

      {/* Core disc — its edge passes through every star valley */}
      <motion.circle
        cx={C} cy={C} r={STAR_INNER}
        stroke="#B8943F"
        strokeWidth="0.8"
        fill="rgba(250,247,240,0.6)"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 200 }}
      />

      {/* Centre rosette — same counter-rotation as Star B, so the two
          read as one layer turning against the khātim. */}
      <motion.g
        style={SPIN_ORIGIN}
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        <motion.path
          d={STAR_CORE}
          stroke="#B8943F"
          strokeWidth="0.6"
          fill="none"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
          transition={{ duration: 1.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.g>
      <motion.circle
        cx={C} cy={C} r="3"
        fill="#B8943F"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 0.55 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
      />

      {/* 16 radial ticks, one every 22.5° */}
      {TICKS.map((angle, i) => {
        const [x1, y1] = polar(TICK_FROM, angle);
        const [x2, y2] = polar(TICK_TO, angle);
        return (
          <motion.line
            key={angle}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#D4B96A"
            strokeWidth={i % 2 === 0 ? 1 : 0.6}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: i % 2 === 0 ? 0.5 : 0.3 } : {}}
            transition={{ delay: 1.2 + i * 0.03, duration: 0.4 }}
          />
        );
      })}

      {/* 8 dots on the outer band, aligned with the star's arms */}
      {DOTS.map((angle, i) => {
        const [x, y] = polar(DOT_R, angle);
        return (
          <motion.circle
            key={angle}
            cx={x} cy={y} r="1.4"
            fill="#B8943F"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.45 } : {}}
            transition={{ delay: 1.5 + i * 0.05, duration: 0.4 }}
          />
        );
      })}

      {/* Glow pulse on the core */}
      <motion.circle
        cx={C} cy={C} r={STAR_INNER}
        fill="none"
        stroke="#ECD99A"
        strokeWidth="1"
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function MeetingSeal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="meeting-seal"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F5EDD6 0%, #FAF7F0 50%, #F5EDD6 100%)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,185,106,0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Gold particles floating around the seal */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <GoldParticles count={12} active={inView} />
      </div>

      {/* Converging paths */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          {/* Path from right (Egypt) */}
          <motion.path
            d="M0 50 Q25 45 50 50"
            stroke="#B8943F"
            strokeWidth="0.3"
            fill="none"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          />
          {/* Path from left (Tunisia) */}
          <motion.path
            d="M100 50 Q75 45 50 50"
            stroke="#B8943F"
            strokeWidth="0.3"
            fill="none"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Seal */}
      <motion.div
        className="relative z-10 mb-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 150, damping: 20 }}
      >
        <IslamicSeal />
      </motion.div>

      {/* Names */}
      <motion.div
        className="relative z-10 flex items-center gap-4 md:gap-8 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="font-names text-3xl md:text-5xl"
          style={{ color: "#3D2E1E" }}
        >
          {invitationData.names.groom}
        </span>
        <motion.span
          className="font-names text-2xl md:text-4xl"
          style={{ color: "#B8943F" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          و
        </motion.span>
        <span
          className="font-names text-3xl md:text-5xl"
          style={{ color: "#3D2E1E" }}
        >
          {invitationData.names.bride}
        </span>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 1.4 }}
        className="w-48 h-px mb-6"
        style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }}
        aria-hidden="true"
      />

      {/* Subtitle — two cities in one promise */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="text-center px-6 max-w-xs"
      >
        <p className="font-display text-base" style={{ color: "#6B5A47", lineHeight: "2.2" }}>
        بين أرضٍ تعرف النيل، ومدينةٍ تحفظ زرقة البحر
        <br/>
        كُتبت الحكاية بهدوء… حتى صار اللقاء قدرًا جميلًا
        </p>
      </motion.div>

      {/* Scroll-down hint — prominent, clickable, scrolls to invitation */}
      <motion.button
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 cursor-pointer focus:outline-none group"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 3 }}
        onClick={() => smoothScrollTo("invitation-card", 2000)}
        aria-label="انتقل إلى بطاقة الدعوة"
      >

        {/* Ornamental arrow: diamond + double chevron, bouncing */}
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="52" height="48" viewBox="0 0 52 48" fill="none" aria-hidden="true">
            {/* glowing diamond at top */}
            <motion.path
              d="M26 2 L32 10 L26 18 L20 10 Z"
              stroke="#D4B96A"
              strokeWidth="1.2"
              fill="rgba(212,185,106,0.22)"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* upper chevron */}
            <path
              d="M8 22 L26 37 L44 22"
              stroke="#B8943F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* lower chevron — smaller, softer */}
            <path
              d="M16 31 L26 42 L36 31"
              stroke="#D4B96A"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </svg>
        </motion.div>

        {/* Label */}
        <span
          style={{ color: "#6B5A47" }}
        >
          اكتشف الدعوة
        </span>

      </motion.button>

      {/* Floating ornaments at corners */}
      <FloatingOrnament
        size={32}
        style={{ position: "absolute", top: "10%", right: "8%", opacity: 0.12 }}
      />
      <FloatingOrnament
        size={24}
        style={{ position: "absolute", bottom: "12%", left: "10%", opacity: 0.1 }}
      />
      <FloatingOrnament
        size={20}
        style={{ position: "absolute", top: "25%", left: "6%", opacity: 0.08 }}
      />
      <FloatingOrnament
        size={28}
        style={{ position: "absolute", bottom: "20%", right: "6%", opacity: 0.09 }}
      />
    </section>
  );
}
