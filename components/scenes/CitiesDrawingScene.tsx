"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedArabicText } from "@/components/ui/AnimatedArabicText";

function EgyptMap({ inView }: { inView: boolean }) {
  return (
    <svg
      viewBox="0 0 180 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-36 md:w-44"
      aria-hidden="true"
    >
      {/* Nile river — the spine of Egypt */}
      <motion.path
        d="M90 8 Q96 45 88 85 Q80 125 90 165 Q100 205 88 235"
        stroke="#4A6E9E"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
        transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Nile delta — fan shape */}
      <motion.path
        d="M88 30 Q78 18 58 10 M88 30 Q82 14 76 5 M88 30 Q96 12 108 5 M88 30 Q98 16 116 10"
        stroke="#4A6E9E"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.18 } : {}}
        transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Nile tributaries */}
      <motion.path
        d="M88 85 Q72 80 52 84 M88 100 Q70 95 50 100 M88 115 Q74 110 58 118"
        stroke="#4A6E9E"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.15 } : {}}
        transition={{ duration: 1.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Sun disk (Aten) */}
      <motion.circle
        cx="148" cy="35" r="22"
        stroke="#D4B96A"
        strokeWidth="0.8"
        fill="rgba(236,217,154,0.06)"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
      />
      <motion.circle
        cx="148" cy="35" r="13"
        stroke="#B8943F"
        strokeWidth="0.5"
        fill="rgba(184,148,63,0.04)"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7, type: "spring" }}
      />

      {/* Pyramid trio */}
      <motion.path
        d="M16 200 L34 168 L52 200 Z"
        stroke="#B8943F"
        strokeWidth="1.2"
        fill="rgba(184,148,63,0.05)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.45 } : {}}
        transition={{ duration: 1.2, delay: 1.2 }}
      />
      <motion.path
        d="M42 200 L56 173 L70 200 Z"
        stroke="#B8943F"
        strokeWidth="1.2"
        fill="rgba(184,148,63,0.05)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 1.2, delay: 1.4 }}
      />
      <motion.path
        d="M62 200 L74 178 L86 200 Z"
        stroke="#C9A84C"
        strokeWidth="0.8"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.25 } : {}}
        transition={{ duration: 1, delay: 1.6 }}
      />

      {/* Papyrus cluster */}
      {[120, 132, 144].map((x, i) => (
        <motion.g key={i}>
          <motion.line
            x1={x} y1="238" x2={x} y2="208"
            stroke="#4A7C6E"
            strokeWidth={i === 1 ? 1.5 : 1}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            style={{ transformOrigin: `${x}px 238px` }}
            transition={{ delay: 1.5 + i * 0.1, duration: 0.7 }}
          />
          <motion.ellipse
            cx={x} cy={206} rx={i === 1 ? 8 : 6} ry={i === 1 ? 12 : 9}
            fill="#4A7C6E"
            opacity="0.18"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            style={{ transformOrigin: `${x}px 206px` }}
            transition={{ delay: 1.7 + i * 0.1, duration: 0.5 }}
          />
        </motion.g>
      ))}

      {/* Desert horizon dots */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          cx={100 + i * 16}
          cy={145 + (i % 2) * 8}
          r="1.5"
          fill="#B8943F"
          opacity="0.15"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 1.2 + i * 0.06 }}
        />
      ))}

      {/* Islamic star ornament */}
      <motion.path
        d="M148 130 L152 142 L164 142 L155 150 L158 162 L148 155 L138 162 L141 150 L132 142 L144 142 Z"
        stroke="#D4B96A"
        strokeWidth="0.7"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.25 } : {}}
        transition={{ duration: 1.5, delay: 1.3 }}
      />

      {/* Path toward center — dashed gold line going left */}
      <motion.path
        d="M0 155 Q30 150 60 153 Q76 155 90 155"
        stroke="#B8943F"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="5 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.55 } : {}}
        transition={{ duration: 2.2, delay: 2, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function TunisiaMap({ inView }: { inView: boolean }) {
  return (
    <svg
      viewBox="0 0 180 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-36 md:w-44"
      aria-hidden="true"
    >
      {/* Coastal outline */}
      <motion.path
        d="M20 30 Q50 18 90 22 Q130 26 155 40 Q168 52 165 70 Q162 90 155 110 Q145 135 140 165 Q135 200 145 230"
        stroke="#C17A5E"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.28 } : {}}
        transition={{ duration: 2.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Mediterranean waves */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.path
          key={i}
          d={`M5 ${155 + i * 14} Q28 ${148 + i * 14} 50 ${155 + i * 14} Q73 ${162 + i * 14} 95 ${155 + i * 14}`}
          stroke="#4A6E9E"
          strokeWidth={i === 0 ? 1.2 : 0.7}
          fill="none"
          opacity={0.2 - i * 0.025}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.18 - i * 0.02 } : {}}
          transition={{ duration: 1.5, delay: 0.5 + i * 0.15, ease: "easeOut" }}
        />
      ))}

      {/* Medina gateway — refined arch */}
      <motion.path
        d="M58 220 L58 175 Q58 155 72 155 Q86 155 86 175 L86 220"
        stroke="#8C7B6A"
        strokeWidth="1.4"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.32 } : {}}
        transition={{ duration: 1.5, delay: 0.9 }}
      />
      <motion.path
        d="M58 175 Q72 160 86 175"
        stroke="#8C7B6A"
        strokeWidth="1.4"
        fill="rgba(140,123,106,0.04)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
      />
      {/* Arch keystone dot */}
      <motion.circle
        cx="72" cy="160" r="2.5"
        fill="#B8943F"
        opacity="0.35"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.4 }}
      />

      {/* Minaret */}
      <motion.rect
        x="118" y="90" width="12" height="70"
        fill="#8C7B6A"
        opacity="0.12"
        rx="1"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        style={{ transformOrigin: "124px 160px" }}
        transition={{ delay: 1.0, duration: 0.9 }}
      />
      <motion.path
        d="M112 91 Q124 78 136 91 Z"
        fill="#8C7B6A"
        opacity="0.2"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
      <motion.circle
        cx="124" cy="91" r="3"
        fill="#B8943F"
        opacity="0.25"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 1.7, duration: 0.4 }}
      />

      {/* Mosaic tiles */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <motion.rect
            key={`${row}-${col}`}
            x={10 + col * 16}
            y={40 + row * 16}
            width="10"
            height="10"
            rx="1"
            fill={(col + row) % 2 === 0 ? "#4A7C6E" : "#C17A5E"}
            opacity="0.11"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            style={{ transformOrigin: `${10 + col * 16 + 5}px ${40 + row * 16 + 5}px` }}
            transition={{ delay: 0.7 + (row * 4 + col) * 0.04, duration: 0.3 }}
          />
        ))
      )}

      {/* Olive trees */}
      <motion.circle
        cx="140" cy="42" r="18"
        fill="#4A7C6E"
        opacity="0.09"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 1.0, duration: 0.6 }}
      />
      <motion.line
        x1="140" y1="60" x2="140" y2="82"
        stroke="#6B5A47" strokeWidth="2"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        style={{ transformOrigin: "140px 82px" }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
      <motion.circle
        cx="155" cy="50" r="12"
        fill="#4A7C6E"
        opacity="0.07"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.5 }}
      />

      {/* Hafsia star pattern */}
      <motion.path
        d="M22 130 L25 140 L35 140 L27 147 L30 157 L22 151 L14 157 L17 147 L9 140 L19 140 Z"
        stroke="#D4B96A"
        strokeWidth="0.7"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.25 } : {}}
        transition={{ duration: 1.5, delay: 1.4 }}
      />

      {/* Path toward center — dashed gold line going right */}
      <motion.path
        d="M180 155 Q150 150 120 153 Q104 155 90 155"
        stroke="#B8943F"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="5 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.55 } : {}}
        transition={{ duration: 2.2, delay: 2, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export function CitiesDrawingScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #EDE4CC 0%, #F5EDD6 25%, #FAF7F0 60%, #F0E8D5 100%)" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.025]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M0 24 L48 24 M24 0 L24 48" stroke="#B8943F" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Heading */}
      <AnimatedArabicText
        className="text-center mb-12 z-10"
        delay={0}
        variant="rise"
      >
        <p className="font-display text-xl md:text-2xl mb-2" style={{ color: "#3D2E1E" }}>
          مدينتان تتحقّقان في وجود بعضهما
        </p>
        <p className="font-body text-xs" style={{ color: "#8C7B6A", letterSpacing: "0.05em" }}>
          رُسمت الطريق بالحبر والضوء
        </p>
      </AnimatedArabicText>

      {/* Cities row */}
      <div
        ref={ref}
        className="relative z-10 flex items-start justify-center gap-6 md:gap-12 w-full max-w-md"
      >
        {/* Egypt side (right in RTL — appears on the right) */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <EgyptMap inView={inView} />
          <div className="mt-4 text-center">
            <p className="font-display text-lg" style={{ color: "#3D2E1E" }}>إسلام</p>
            <p className="font-body text-xs mt-0.5" style={{ color: "#8C7B6A" }}>الشرقية، مصر</p>
          </div>
        </motion.div>

        {/* Center meridian */}
        <div className="flex flex-col items-center pt-16 gap-2 shrink-0">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.6 }}
            className="w-px h-28"
            style={{
              background: "linear-gradient(180deg, transparent, #B8943F)",
              transformOrigin: "top",
            }}
            aria-hidden="true"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.3 }}
            aria-hidden="true"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="#B8943F" strokeWidth="0.8" opacity="0.4" />
              <circle cx="14" cy="14" r="6"  stroke="#B8943F" strokeWidth="1"   opacity="0.65" />
              <circle cx="14" cy="14" r="2.5" fill="#B8943F" opacity="0.8" />
              {[0, 90, 180, 270].map((a) => {
                const r = (a * Math.PI) / 180;
                return (
                  <line
                    key={a}
                    x1={14 + 7 * Math.cos(r)} y1={14 + 7 * Math.sin(r)}
                    x2={14 + 11 * Math.cos(r)} y2={14 + 11 * Math.sin(r)}
                    stroke="#B8943F" strokeWidth="0.8" opacity="0.5"
                  />
                );
              })}
            </svg>
          </motion.div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.6 }}
            className="w-px h-28"
            style={{
              background: "linear-gradient(180deg, #B8943F, transparent)",
              transformOrigin: "bottom",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Tunisia side (left in RTL — appears on the left) */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <TunisiaMap inView={inView} />
          <div className="mt-4 text-center">
            <p className="font-display text-lg" style={{ color: "#3D2E1E" }}>سلمى</p>
            <p className="font-body text-xs mt-0.5" style={{ color: "#8C7B6A" }}>سوسة، تونس</p>
          </div>
        </motion.div>
      </div>

      {/* Poetic closing */}
      <AnimatedArabicText
        className="mt-14 text-center z-10 max-w-xs px-4"
        delay={0.3}
        variant="ink"
      >
        <p className="font-display text-base" style={{ color: "#6B5A47", lineHeight: "2.2" }}>
          من الشرقية إلى سوسة،
          <br />
          ومن ضفتي الحلم إلى بيتٍ واحد
        </p>
      </AnimatedArabicText>
    </section>
  );
}
