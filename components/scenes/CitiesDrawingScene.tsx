"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
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
        d="M91 30 Q96 57 88 85 Q80 125 90 165 Q100 205 88 235"
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
        d="M91 30 Q81 18 61 10 M91 30 Q85 14 79 5 M91 30 Q99 12 111 5 M91 30 Q101 16 119 10"
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
        d="M91 32 Q75 27 55 31 M90 40 Q72 35 52 39 M89 48 Q73 43 57 51"
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
        d="M10 80 L24 53 L38 80 Z"
        stroke="#B8943F"
        strokeWidth="1.2"
        fill="rgba(184,148,63,0.05)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.45 } : {}}
        transition={{ duration: 1.2, delay: 1.2 }}
      />
      <motion.path
        d="M35 80 L47 57 L59 80 Z"
        stroke="#B8943F"
        strokeWidth="1.2"
        fill="rgba(184,148,63,0.05)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 1.2, delay: 1.4 }}
      />
      <motion.path
        d="M55 80 L65 63 L75 80 Z"
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
        d="M148 105 L152 117 L164 117 L155 125 L158 137 L148 130 L138 137 L141 125 L132 117 L144 117 Z"
        stroke="#D4B96A"
        strokeWidth="0.7"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.25 } : {}}
        transition={{ duration: 1.5, delay: 1.3 }}
      />

      {/* Path toward center — dashed gold line going left */}
      <motion.path
        d="M0 88 Q30 83 60 86 Q70 88 80 88"
        stroke="#B8943F"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="5 4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.55 } : {}}
        transition={{ duration: 1.2, delay: 2, ease: "easeIn" }}
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
        d="M28 22 Q58 10 98 14 T163 32 T173 62 T163 102 T170 158 T172 225"
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

      {/* قصور الساف — ribat façade */}
      <motion.rect
        x="105" y="173" width="42" height="50"
        stroke="#8C7B6A"
        strokeWidth="1.2"
        fill="rgba(140,123,106,0.07)"
        rx="1"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        style={{ transformOrigin: "126px 223px" }}
        transition={{ duration: 1.0, delay: 0.9 }}
      />
      {/* Crenellated parapet — 5 merlons */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={`merlon-${i}`}
          x={108 + i * 8} y="164" width="5" height="10"
          stroke="#8C7B6A"
          strokeWidth="0.8"
          fill="rgba(140,123,106,0.09)"
          rx="0.5"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={inView ? { scaleY: 1, opacity: 1 } : {}}
          style={{ transformOrigin: `${110.5 + i * 8}px 174px` }}
          transition={{ duration: 0.4, delay: 1.15 + i * 0.06 }}
        />
      ))}
      {/* Horseshoe arch doorway */}
      <motion.path
        d="M118 223 L118 212 Q118 198 126 198 Q134 198 134 212 L134 223"
        stroke="#8C7B6A"
        strokeWidth="1.2"
        fill="rgba(74,124,110,0.05)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.45 } : {}}
        transition={{ duration: 1.0, delay: 1.4 }}
      />
      {/* Left arched window */}
      <motion.path
        d="M110 190 L110 184 Q110 178 114 178 Q118 178 118 184 L118 190"
        stroke="#8C7B6A"
        strokeWidth="0.9"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.38 } : {}}
        transition={{ duration: 0.6, delay: 1.6 }}
      />
      {/* Right arched window */}
      <motion.path
        d="M134 190 L134 184 Q134 178 138 178 Q142 178 142 184 L142 190"
        stroke="#8C7B6A"
        strokeWidth="0.9"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.38 } : {}}
        transition={{ duration: 0.6, delay: 1.7 }}
      />
      {/* Crescent finial on parapet */}
      <motion.path
        d="M124 162 Q126 156 128 162 Q126.5 159.5 124 162 Z"
        stroke="#B8943F"
        strokeWidth="0.9"
        fill="rgba(184,148,63,0.2)"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        style={{ transformOrigin: "126px 160px" }}
        transition={{ delay: 1.85, duration: 0.4 }}
      />

      {/* Minaret */}
      <motion.rect
        x="118" y="85" width="12" height="70"
        fill="#8C7B6A"
        opacity="0.12"
        rx="1"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        style={{ transformOrigin: "124px 155px" }}
        transition={{ delay: 1.0, duration: 0.9 }}
      />
      <motion.path
        d="M112 86 Q124 73 136 86 Z"
        fill="#8C7B6A"
        opacity="0.2"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
      <motion.circle
        cx="124" cy="86" r="3"
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
        d="M22 120 L25 130 L35 130 L27 137 L30 147 L22 141 L14 147 L17 137 L9 130 L19 130 Z"
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
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.55 } : {}}
        transition={{ duration: 1.2, delay: 2, ease: "easeIn" }}
      />
    </svg>
  );
}

export function CitiesDrawingScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const eslamControls = useAnimation();
  const selmaControls = useAnimation();

  useEffect(() => {
    if (!inView) return;
    // Wait for the maps to finish drawing (~2.5 s), then start the orbit
    const timer = setTimeout(() => {
      const shared = {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
        times: [0, 0.25, 0.5, 0.75, 1],
      };
      // Eslam arcs UPWARD — clockwise relative to centre
      eslamControls.start({
        x: [0, 10, 0, -10, 0],
        y: [0, -14, -22, -14, 0],
        scale: [1, 1.06, 1.10, 1.06, 1],
        rotate: [0, 4, 0, -4, 0],
        transition: shared,
      });
      // Selma arcs DOWNWARD — counter-clockwise, exactly opposite
      selmaControls.start({
        x: [0, -10, 0, 10, 0],
        y: [0, 14, 22, 14, 0],
        scale: [1, 1.06, 1.10, 1.06, 1],
        rotate: [0, -4, 0, 4, 0],
        transition: shared,
      });
    }, 2800);
    return () => clearTimeout(timer);
  }, [inView, eslamControls, selmaControls]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #EDE4CC 0%, #F5EDD6 25%, #FAF7F0 60%, #F5EDD6 100%)" }}
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
          مدينتان تتحققان في وجود بعضهما
        </p>
        <p>
          رُسم الطريق بالحب والوفاء
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
          {/* Eslam childhood photo — orbits upward after maps finish drawing */}
          <motion.div
            animate={eslamControls}
            className="mb-5 rounded-full overflow-hidden shrink-0"
            style={{
              width: 96, height: 96,
              border: "2px solid rgba(212,185,106,0.7)",
              boxShadow: "0 4px 16px rgba(28,18,9,0.14)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/eslam.jpg"
              alt="إسلام"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <EgyptMap inView={inView} />
          <div className="mt-4 text-center">
            <p className="font-names text-2xl" style={{ color: "#B8943F" }}>إسلام</p>
            <div className="flex justify-center my-1" aria-hidden="true">
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }} />
            </div>
            <p className="font-body text-xs" style={{ color: "#8C7B6A" }}>الشرقية، مصر</p>
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
          {/* Selma childhood photo — orbits downward, exactly opposite to Eslam */}
          <motion.div
            animate={selmaControls}
            className="mb-5 rounded-full overflow-hidden shrink-0"
            style={{
              width: 96, height: 96,
              border: "2px solid rgba(212,185,106,0.7)",
              boxShadow: "0 4px 16px rgba(28,18,9,0.14)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/selma.jpg"
              alt="سلمى"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <TunisiaMap inView={inView} />
          <div className="mt-4 text-center">
            <p className="font-names text-2xl" style={{ color: "#B8943F" }}>سلمى</p>
            <div className="flex justify-center my-1" aria-hidden="true">
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }} />
            </div>
            <p className="font-body text-xs" style={{ color: "#8C7B6A" }}>سوسة، تونس</p>
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
          ومن ضفتي الحلم إلى بيتٍ الحقيقة
        </p>
      </AnimatedArabicText>
    </section>
  );
}
