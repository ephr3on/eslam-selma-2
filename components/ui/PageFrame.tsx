"use client";

import { motion } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   PageFrame — a thin ornamental border that "holds" the page.

   Symbolism, kept deliberately quiet:
   • Corner knots — two arcs turning the same corner together, meeting
     at an eight-point khātim: two paths becoming one journey.
   • Top / bottom marks — a vesica: two equal circles overlapping so
     that each one's centre lies on the other's edge. The oldest
     geometric figure for union, and the shape the whole frame is
     balanced around.
   • Side lozenges — quiet accents marking the midpoint of each edge,
     so the four sides stay in visual equilibrium.
   ──────────────────────────────────────────────────────────────── */

const GOLD = "#B8943F";
const GOLD_LIGHT = "#D4B96A";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Eight-point khātim, the same {8/3} star used by the seal. */
function khatimPath(cx: number, cy: number, R: number) {
  const ratio = Math.cos((3 * Math.PI) / 8) / Math.cos((2 * Math.PI) / 8);
  return (
    Array.from({ length: 16 }, (_, i) => {
      const r = i % 2 === 0 ? R : R * ratio;
      const a = ((i * 22.5 - 90) * Math.PI) / 180;
      return `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(2)} ${(
        cy +
        r * Math.sin(a)
      ).toFixed(2)}`;
    }).join(" ") + " Z"
  );
}

/** Corner knot, drawn for the top-left; rotated for the other three. */
function CornerKnot({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 54 54" fill="none" aria-hidden="true">
      {/* Outer arm */}
      <path
        d="M0 34 L0 12 Q0 0 12 0 L34 0"
        stroke={GOLD}
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Inner echo — the second path, travelling alongside the first */}
      <path
        d="M7 40 L7 17 Q7 7 17 7 L40 7"
        stroke={GOLD_LIGHT}
        strokeWidth="0.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.38"
      />
      {/* Where the two arms turn together */}
      <path d={khatimPath(15.5, 15.5, 5.6)} stroke={GOLD} strokeWidth="0.6" fill="none" opacity="0.5" />
      <circle cx="15.5" cy="15.5" r="1.1" fill={GOLD} opacity="0.45" />
      {/* Terminal beads */}
      <circle cx="34" cy="0.6" r="1.2" fill={GOLD_LIGHT} opacity="0.55" />
      <circle cx="0.6" cy="34" r="1.2" fill={GOLD_LIGHT} opacity="0.55" />
    </svg>
  );
}

/** Vesica: two equal circles, each centred on the other's circumference. */
function UnionMark({ width = 46 }: { width?: number }) {
  return (
    <svg width={width} height="20" viewBox="0 0 46 20" fill="none" aria-hidden="true">
      <circle cx="19" cy="10" r="6.5" stroke={GOLD} strokeWidth="0.7" fill="none" opacity="0.5" />
      <circle cx="27" cy="10" r="6.5" stroke={GOLD} strokeWidth="0.7" fill="none" opacity="0.5" />
      {/* The shared centre */}
      <circle cx="23" cy="10" r="1.1" fill={GOLD} opacity="0.5" />
      {/* Outer beads */}
      <circle cx="5" cy="10" r="1" fill={GOLD_LIGHT} opacity="0.5" />
      <circle cx="41" cy="10" r="1" fill={GOLD_LIGHT} opacity="0.5" />
    </svg>
  );
}

/** Small lozenge marking the midpoint of a vertical edge. */
function EdgeLozenge() {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
      <path d="M5 2 L8 8 L5 14 L2 8 Z" stroke={GOLD} strokeWidth="0.7" fill="none" opacity="0.45" />
    </svg>
  );
}

const H_LINE = `linear-gradient(90deg, transparent, ${GOLD_LIGHT}99 28%, ${GOLD_LIGHT}99 72%, transparent)`;
const V_LINE = `linear-gradient(180deg, transparent, ${GOLD_LIGHT}80 28%, ${GOLD_LIGHT}80 72%, transparent)`;

export function PageFrame() {
  return (
    <div
      className="pointer-events-none absolute inset-5 sm:inset-8 z-0"
      aria-hidden="true"
    >
      {/* ── Top edge: line · union mark · line ── */}
      <div className="absolute inset-x-8 top-0 flex items-center gap-2 sm:gap-3">
        <motion.div
          className="h-px flex-1 origin-right"
          style={{ background: H_LINE }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
        >
          <UnionMark />
        </motion.div>
        <motion.div
          className="h-px flex-1 origin-left"
          style={{ background: H_LINE }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
        />
      </div>

      {/* ── Bottom edge ── */}
      <div className="absolute inset-x-8 bottom-0 flex items-center gap-2 sm:gap-3">
        <motion.div
          className="h-px flex-1 origin-right"
          style={{ background: H_LINE }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE }}
        >
          <UnionMark />
        </motion.div>
        <motion.div
          className="h-px flex-1 origin-left"
          style={{ background: H_LINE }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
        />
      </div>

      {/* ── Side edges: hairline with a lozenge at the midpoint ── */}
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className="absolute inset-y-10 flex flex-col items-center"
          style={{ [side]: 0, width: 10 }}
        >
          <motion.div
            className="w-px flex-1 origin-bottom"
            style={{ background: V_LINE }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
          />
          <motion.div
            className="my-1"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          >
            <EdgeLozenge />
          </motion.div>
          <motion.div
            className="w-px flex-1 origin-top"
            style={{ background: V_LINE }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
          />
        </div>
      ))}

      {/* ── Corner knots ── */}
      {(
        [
          { pos: "top-0 left-0", rotate: 0 },
          { pos: "top-0 right-0", rotate: 90 },
          { pos: "bottom-0 right-0", rotate: 180 },
          { pos: "bottom-0 left-0", rotate: 270 },
        ] as const
      ).map(({ pos, rotate }, i) => (
        <motion.div
          key={pos}
          className={`absolute ${pos}`}
          style={{ rotate, transformOrigin: "center" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.7 + i * 0.12, ease: EASE }}
        >
          <CornerKnot size={44} />
        </motion.div>
      ))}
    </div>
  );
}
