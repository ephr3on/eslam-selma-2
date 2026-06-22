"use client";

import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

function EgyptMap({ inView }: { inView: boolean }) {
  return (
    <svg
      viewBox="0 0 180 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-36 md:w-44"
      aria-hidden="true"
    >
      <motion.path
        d="M91 30 Q96 57 88 85 Q80 125 90 165 Q100 205 88 235"
        stroke="#4A6E9E" strokeWidth="2.5" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
        transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M91 30 Q81 18 61 10 M91 30 Q85 14 79 5 M91 30 Q99 12 111 5 M91 30 Q101 16 119 10"
        stroke="#4A6E9E" strokeWidth="1" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.18 } : {}}
        transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M91 32 Q75 27 55 31 M90 40 Q72 35 52 39 M89 48 Q73 43 57 51"
        stroke="#4A6E9E" strokeWidth="0.8" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.15 } : {}}
        transition={{ duration: 1.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle cx="148" cy="35" r="22" stroke="#D4B96A" strokeWidth="0.8" fill="rgba(236,217,154,0.06)"
        initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
      />
      <motion.circle cx="148" cy="35" r="13" stroke="#B8943F" strokeWidth="0.5" fill="rgba(184,148,63,0.04)"
        initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7, type: "spring" }}
      />
      <motion.path d="M10 80 L24 53 L38 80 Z" stroke="#B8943F" strokeWidth="1.2" fill="rgba(184,148,63,0.05)"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.45 } : {}}
        transition={{ duration: 1.2, delay: 1.2 }}
      />
      <motion.path d="M35 80 L47 57 L59 80 Z" stroke="#B8943F" strokeWidth="1.2" fill="rgba(184,148,63,0.05)"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 1.2, delay: 1.4 }}
      />
      <motion.path d="M55 80 L65 63 L75 80 Z" stroke="#C9A84C" strokeWidth="0.8" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.25 } : {}}
        transition={{ duration: 1, delay: 1.6 }}
      />
      {[120, 132, 144].map((x, i) => (
        <motion.g key={i}>
          <motion.line x1={x} y1="238" x2={x} y2="208" stroke="#4A7C6E" strokeWidth={i === 1 ? 1.5 : 1}
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            style={{ transformOrigin: `${x}px 238px` }} transition={{ delay: 1.5 + i * 0.1, duration: 0.7 }}
          />
          <motion.ellipse cx={x} cy={206} rx={i === 1 ? 8 : 6} ry={i === 1 ? 12 : 9} fill="#4A7C6E" opacity="0.18"
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
            style={{ transformOrigin: `${x}px 206px` }} transition={{ delay: 1.7 + i * 0.1, duration: 0.5 }}
          />
        </motion.g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle key={i} cx={100 + i * 16} cy={145 + (i % 2) * 8} r="1.5" fill="#B8943F" opacity="0.15"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.2 + i * 0.06 }}
        />
      ))}
      <motion.path
        d="M148 105 L152 117 L164 117 L155 125 L158 137 L148 130 L138 137 L141 125 L132 117 L144 117 Z"
        stroke="#D4B96A" strokeWidth="0.7" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.25 } : {}}
        transition={{ duration: 1.5, delay: 1.3 }}
      />
      <motion.path
        d="M0 88 Q30 83 60 86 Q70 88 80 88"
        stroke="#B8943F" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="5 4"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.55 } : {}}
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
      <motion.path
        d="M28 22 Q58 10 98 14 T163 32 T173 62 T163 102 T170 158 T172 225"
        stroke="#C17A5E" strokeWidth="1.8" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.28 } : {}}
        transition={{ duration: 2.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.path key={i}
          d={`M5 ${155 + i * 14} Q28 ${148 + i * 14} 50 ${155 + i * 14} Q73 ${162 + i * 14} 95 ${155 + i * 14}`}
          stroke="#4A6E9E" strokeWidth={i === 0 ? 1.2 : 0.7} fill="none" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.18 - i * 0.02 } : {}}
          transition={{ duration: 1.5, delay: 0.5 + i * 0.15, ease: "easeOut" }}
        />
      ))}
      <motion.rect x="105" y="173" width="42" height="50" stroke="#8C7B6A" strokeWidth="1.2" fill="rgba(140,123,106,0.07)" rx="1"
        initial={{ scaleY: 0, opacity: 0 }} animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        style={{ transformOrigin: "126px 223px" }} transition={{ duration: 1.0, delay: 0.9 }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect key={`merlon-${i}`} x={108 + i * 8} y="164" width="5" height="10"
          stroke="#8C7B6A" strokeWidth="0.8" fill="rgba(140,123,106,0.09)" rx="0.5"
          initial={{ scaleY: 0, opacity: 0 }} animate={inView ? { scaleY: 1, opacity: 1 } : {}}
          style={{ transformOrigin: `${110.5 + i * 8}px 174px` }} transition={{ duration: 0.4, delay: 1.15 + i * 0.06 }}
        />
      ))}
      <motion.path d="M118 223 L118 212 Q118 198 126 198 Q134 198 134 212 L134 223"
        stroke="#8C7B6A" strokeWidth="1.2" fill="rgba(74,124,110,0.05)"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.45 } : {}}
        transition={{ duration: 1.0, delay: 1.4 }}
      />
      <motion.path d="M110 190 L110 184 Q110 178 114 178 Q118 178 118 184 L118 190"
        stroke="#8C7B6A" strokeWidth="0.9" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.38 } : {}}
        transition={{ duration: 0.6, delay: 1.6 }}
      />
      <motion.path d="M134 190 L134 184 Q134 178 138 178 Q142 178 142 184 L142 190"
        stroke="#8C7B6A" strokeWidth="0.9" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.38 } : {}}
        transition={{ duration: 0.6, delay: 1.7 }}
      />
      <motion.path d="M124 162 Q126 156 128 162 Q126.5 159.5 124 162 Z"
        stroke="#B8943F" strokeWidth="0.9" fill="rgba(184,148,63,0.2)"
        initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        style={{ transformOrigin: "126px 160px" }} transition={{ delay: 1.85, duration: 0.4 }}
      />
      <motion.rect x="118" y="85" width="12" height="70" fill="#8C7B6A" opacity="0.12" rx="1"
        initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
        style={{ transformOrigin: "124px 155px" }} transition={{ delay: 1.0, duration: 0.9 }}
      />
      <motion.path d="M112 86 Q124 73 136 86 Z" fill="#8C7B6A" opacity="0.2"
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.5, duration: 0.5 }}
      />
      <motion.circle cx="124" cy="86" r="3" fill="#B8943F" opacity="0.25"
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.7, duration: 0.4 }}
      />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <motion.rect key={`${row}-${col}`}
            x={10 + col * 16} y={40 + row * 16} width="10" height="10" rx="1"
            fill={(col + row) % 2 === 0 ? "#4A7C6E" : "#C17A5E"} opacity="0.11"
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
            style={{ transformOrigin: `${10 + col * 16 + 5}px ${40 + row * 16 + 5}px` }}
            transition={{ delay: 0.7 + (row * 4 + col) * 0.04, duration: 0.3 }}
          />
        ))
      )}
      <motion.circle cx="140" cy="42" r="18" fill="#4A7C6E" opacity="0.09"
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.0, duration: 0.6 }}
      />
      <motion.line x1="140" y1="60" x2="140" y2="82" stroke="#6B5A47" strokeWidth="2"
        initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
        style={{ transformOrigin: "140px 82px" }} transition={{ delay: 1.2, duration: 0.5 }}
      />
      <motion.circle cx="155" cy="50" r="12" fill="#4A7C6E" opacity="0.07"
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.1, duration: 0.5 }}
      />
      <motion.path
        d="M22 120 L25 130 L35 130 L27 137 L30 147 L22 141 L14 147 L17 137 L9 130 L19 130 Z"
        stroke="#D4B96A" strokeWidth="0.7" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.25 } : {}}
        transition={{ duration: 1.5, delay: 1.4 }}
      />
      <motion.path
        d="M180 155 Q150 150 120 153 Q104 155 90 155"
        stroke="#B8943F" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="5 4"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.55 } : {}}
        transition={{ duration: 1.2, delay: 2, ease: "easeIn" }}
      />
    </svg>
  );
}

const STORY_PAIRS = [
  ["كتبت رياحه شوق الكثبان",       "فرد موجها بترتيلة المحار"],
  ["هكذا بدأت حكاية الأفلاك",   "يتجاذبان كأجرام في فلك الغيب"],
  ["يغزل لها الفجر من شمسه",   "وتسكب روحها لتسقي قلبه"],
  ["دهر من السعي بين الظل والهجير",  "كان الفلك يجمع عهود الماضي"],
  ["والآن، تلاقيا في مساحة بكر", "فما عادا كونين، بل سماء واحدة"],
] as const;

const NARR_START = 8200;
const NARR_CYCLE = 6400;

// How far the maps+meridian-bottom slide down to create space for STORY_PAIRS
const MAP_SHIFT = "8.5rem";
const SHIFT_EASE = [0.22, 1, 0.36, 1] as const;
const SHIFT_DURATION = 2.5;

export function CitiesDrawingScene() {
  const ref           = useRef<HTMLDivElement>(null);
  const inView        = useInView(ref, { once: true, margin: "-5% 0px" });
  const eslamControls = useAnimation();
  const selmaControls = useAnimation();
  const [narrativeIndex, setNarrativeIndex] = useState(-1);
  const [mapsShifted,    setMapsShifted]    = useState(false);
  const eslamPhotoRef = useRef<HTMLDivElement>(null);
  const selmaPhotoRef = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);

  // Orbit animation
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const shared = {
        duration: 6, repeat: Infinity, ease: "easeInOut" as const,
        times: [0, 0.25, 0.5, 0.75, 1],
      };
      eslamControls.start({ x:[0,10,0,-10,0], y:[0,-14,-22,-14,0], scale:[1,1.06,1.10,1.06,1], rotate:[0,4,0,-4,0], transition: shared });
      selmaControls.start({ x:[0,-10,0,10,0], y:[0,14,22,14,0],   scale:[1,1.06,1.10,1.06,1], rotate:[0,-4,0,4,0], transition: shared });
    }, 2800);
    return () => clearTimeout(timer);
  }, [inView, eslamControls, selmaControls]);

  // Heart trail canvas + timing triggers
  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width  = canvas.offsetWidth  * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    const cv  = canvas as HTMLCanvasElement;
    const ctx = cv.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    type Heart = { t: number; speed: number; r: number; dir: 0 | 1 };
    const hearts: Heart[] = [];
    let phase = 0;
    let raf   = 0;
    let lastTs = 0;
    let acc1 = 0, acc2 = 380;

    const SPAWN_MS  = 680;
    const TRAVEL_MS = 2500;

    function centre(el: HTMLElement) {
      const er = el.getBoundingClientRect();
      const cr = cv.getBoundingClientRect();
      return { x: er.left + er.width / 2 - cr.left, y: er.top + er.height / 2 - cr.top };
    }

    function heart(cx: number, cy: number, r: number, alpha: number, fill: string, glow: string) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowBlur  = 18;
      ctx.shadowColor = glow;
      ctx.fillStyle   = fill;
      ctx.beginPath();
      ctx.moveTo(cx, cy + r * 0.32);
      ctx.bezierCurveTo(cx, cy - r * 0.55, cx - r * 1.1, cy - r * 0.55, cx - r * 1.1, cy);
      ctx.bezierCurveTo(cx - r * 1.1, cy + r * 0.78, cx, cy + r * 1.18, cx, cy + r * 1.46);
      ctx.bezierCurveTo(cx, cy + r * 1.18, cx + r * 1.1, cy + r * 0.78, cx + r * 1.1, cy);
      ctx.bezierCurveTo(cx + r * 1.1, cy - r * 0.55, cx, cy - r * 0.55, cx, cy + r * 0.32);
      ctx.fill();
      ctx.restore();
    }

    function frame(ts: number) {
      const dt = lastTs === 0 ? 0 : Math.min(ts - lastTs, 50);
      lastTs = ts;
      ctx.clearRect(0, 0, cv.offsetWidth, cv.offsetHeight);

      const eEl = eslamPhotoRef.current;
      const sEl = selmaPhotoRef.current;
      if (!eEl || !sEl) { raf = requestAnimationFrame(frame); return; }

      const eC = centre(eEl);
      const sC = centre(sEl);

      if (phase >= 1) {
        acc1 += dt;
        while (acc1 >= SPAWN_MS) { acc1 -= SPAWN_MS; hearts.push({ t: 0, speed: 1 / TRAVEL_MS, r: 4 + Math.random() * 3, dir: 0 }); }
      }
      if (phase >= 2) {
        acc2 += dt;
        while (acc2 >= SPAWN_MS) { acc2 -= SPAWN_MS; hearts.push({ t: 0, speed: 1 / TRAVEL_MS, r: 4 + Math.random() * 3, dir: 1 }); }
      }

      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.t += h.speed * dt;
        if (h.t >= 1) { hearts.splice(i, 1); continue; }

        const srcC = h.dir === 0 ? eC : sC;
        const dstC = h.dir === 0 ? sC : eC;

        const PORTRAIT_R = 54;
        const fullDist = Math.hypot(dstC.x - srcC.x, dstC.y - srcC.y);
        const nx = fullDist > 1 ? (dstC.x - srcC.x) / fullDist : 1;
        const ny = fullDist > 1 ? (dstC.y - srcC.y) / fullDist : 0;
        const src = { x: srcC.x + nx * PORTRAIT_R, y: srcC.y + ny * PORTRAIT_R };
        const dst = { x: dstC.x - nx * PORTRAIT_R, y: dstC.y - ny * PORTRAIT_R };

        const mx = (src.x + dst.x) / 2;
        const my = (src.y + dst.y) / 2;
        const dist = Math.hypot(dst.x - src.x, dst.y - src.y);
        const bend = dist * 0.45 * (h.dir === 0 ? -1 : 1);
        const cp1 = { x: src.x * 0.55 + mx * 0.45, y: my + bend * 0.85 };
        const cp2 = { x: mx * 0.45 + dst.x * 0.55, y: my + bend * 0.85 };

        const mt = 1 - h.t;
        const px = mt*mt*mt*src.x + 3*mt*mt*h.t*cp1.x + 3*mt*h.t*h.t*cp2.x + h.t*h.t*h.t*dst.x;
        const py = mt*mt*mt*src.y + 3*mt*mt*h.t*cp1.y + 3*mt*h.t*h.t*cp2.y + h.t*h.t*h.t*dst.y;

        const alpha = h.t < 0.15 ? (h.t / 0.15) * 0.88 : h.t > 0.85 ? ((1 - h.t) / 0.15) * 0.88 : 0.88;
        const fill  = h.dir === 0 ? "#D4AF64" : "#C17A5E";
        const glow  = h.dir === 0 ? "rgba(212,175,80,0.9)" : "rgba(193,122,94,0.85)";
        heart(px, py, h.r, alpha, fill, glow);
      }

      raf = requestAnimationFrame(frame);
    }

    // Phase 1: Eslam → Selma hearts start
    const t1 = setTimeout(() => { phase = 1; lastTs = 0; raf = requestAnimationFrame(frame); }, 2800);

    // Phase 2: first hearts reach Selma (~2800 + 2500 = ~5300ms)
    // Maps slide down at this moment so space opens up before STORY_PAIRS appears
    const t2 = setTimeout(() => { phase = 2; setMapsShifted(true); }, 5300);

    const narrativeTimers = STORY_PAIRS.map((_, i) =>
      setTimeout(() => setNarrativeIndex(i), NARR_START + i * NARR_CYCLE)
    );

    const scrollTimer = setTimeout(() => {
      smoothScrollTo("meeting-seal", 2600);
    }, NARR_START + 4 * NARR_CYCLE + 7600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(raf);
      narrativeTimers.forEach(clearTimeout);
      clearTimeout(scrollTimer);
    };
  }, [inView]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-6 md:py-20 overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #EDE4CC 0%, #F5EDD6 25%, #FAF7F0 60%, #F5EDD6 100%)" }}
    >
      {/* Heart trail canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 25 }}
        aria-hidden="true"
      />

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

      {/* Title */}
      <motion.div
        className="text-center z-10 mb-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p className="font-display text-xl md:text-2xl" style={{ color: "#3D2E1E" }}>
          من الشرقية إلى سوسة
        </p>
        <br />
        <p className="font-display text-xl md:text-2xl" style={{ color: "#3D2E1E" }}>
          ومن ضفتي الحلم إلى جمال الواقع
        </p>
      </motion.div>

      {/* ── Cities row — same original structure; maps slide inside each column ── */}
      <div
        ref={ref}
        className="relative z-10 flex items-start justify-center gap-6 md:gap-12 w-full max-w-md"
      >
        {/* Egypt side */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Photo */}
          <motion.div
            ref={eslamPhotoRef}
            animate={eslamControls}
            className="mb-5 rounded-full overflow-hidden shrink-0"
            style={{
              width: 96, height: 96,
              border: "2px solid rgba(212,185,106,0.7)",
              boxShadow: "0 4px 16px rgba(28,18,9,0.14)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/eslam.jpg" alt="إسلام" className="w-full h-full object-cover" />
          </motion.div>

          {/* Map + name — slides down when mapsShifted */}
          <motion.div
            className="flex flex-col items-center"
            animate={{ marginTop: mapsShifted ? MAP_SHIFT : "0rem" }}
            transition={{ duration: SHIFT_DURATION, ease: SHIFT_EASE }}
          >
            <EgyptMap inView={inView} />
            <div className="mt-4 text-center">
              <p className="font-names text-2xl" style={{ color: "#B8943F" }}>إسلام</p>
              <div className="flex justify-center my-1" aria-hidden="true">
                <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }} />
              </div>
              <p className="font-body text-xs" style={{ color: "#8C7B6A" }}>الشرقية، مصر</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Center meridian — entire barrier slides down with the maps */}
        <div className="flex flex-col items-center pt-28 shrink-0">
          <motion.div
            className="flex flex-col items-center"
            animate={{ marginTop: mapsShifted ? MAP_SHIFT : "0rem" }}
            transition={{ duration: SHIFT_DURATION, ease: SHIFT_EASE }}
          >
            {/* Top line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 1.6 }}
              className="w-px h-28 mb-2"
              style={{ background: "linear-gradient(180deg, transparent, #B8943F)", transformOrigin: "top" }}
              aria-hidden="true"
            />
            {/* Compass rose */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 2.3 }}
              className="mb-2"
              aria-hidden="true"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#B8943F" strokeWidth="0.8" opacity="0.4" />
                <circle cx="14" cy="14" r="6"  stroke="#B8943F" strokeWidth="1"   opacity="0.65" />
                <circle cx="14" cy="14" r="2.5" fill="#B8943F" opacity="0.8" />
                {[0, 90, 180, 270].map((a) => {
                  const rad = (a * Math.PI) / 180;
                  return (
                    <line key={a}
                      x1={14 + 7 * Math.cos(rad)} y1={14 + 7 * Math.sin(rad)}
                      x2={14 + 11 * Math.cos(rad)} y2={14 + 11 * Math.sin(rad)}
                      stroke="#B8943F" strokeWidth="0.8" opacity="0.5"
                    />
                  );
                })}
              </svg>
            </motion.div>
            {/* Bottom line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 1.6 }}
              className="w-px h-28"
              style={{ background: "linear-gradient(180deg, #B8943F, transparent)", transformOrigin: "bottom" }}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Tunisia side */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Photo */}
          <motion.div
            ref={selmaPhotoRef}
            animate={selmaControls}
            className="mb-5 rounded-full overflow-hidden shrink-0"
            style={{
              width: 96, height: 96,
              border: "2px solid rgba(212,185,106,0.7)",
              boxShadow: "0 4px 16px rgba(28,18,9,0.14)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/selma.jpg" alt="سلمى" className="w-full h-full object-cover" />
          </motion.div>

          {/* Map + name — slides down when mapsShifted */}
          <motion.div
            className="flex flex-col items-center"
            animate={{ marginTop: mapsShifted ? MAP_SHIFT : "0rem" }}
            transition={{ duration: SHIFT_DURATION, ease: SHIFT_EASE }}
          >
            <TunisiaMap inView={inView} />
            <div className="mt-4 text-center">
              <p className="font-names text-2xl" style={{ color: "#B8943F" }}>سلمى</p>
              <div className="flex justify-center my-1" aria-hidden="true">
                <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }} />
              </div>
              <p className="font-body text-xs" style={{ color: "#8C7B6A" }}>سوسة، تونس</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── STORY_PAIRS — absolutely in the gap between photos and maps ── */}
        {/* Top offset = photo height (96px) + mb-5 (1.25rem = 20px) */}
        <div
          className="absolute inset-x-0 z-30 flex flex-col items-center justify-center px-6"
          style={{ top: "calc(96px + 1.25rem)", minHeight: "8.5rem" }}
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            {narrativeIndex >= 0 && (
              <motion.div
                key={narrativeIndex}
                className="w-full flex flex-col items-center text-center gap-0.5"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={narrativeIndex < 4
                  ? { opacity: 0, y: -8, transition: { duration: 0.65, ease: "easeInOut" } }
                  : undefined}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {STORY_PAIRS[narrativeIndex].map((line, li) => {
                  const isFinal = narrativeIndex === 4;
                  return (
                    <motion.p
                      key={li}
                      className="font-display text-xl md:text-2xl overflow-hidden"
                      style={{
                        color: isFinal ? "#1C1209" : "#3D2E1E",
                        lineHeight: "2.3",
                        letterSpacing: isFinal ? "0.01em" : undefined,
                      }}
                      initial={{ clipPath: "inset(0 0 0 100%)" }}
                      animate={{ clipPath: "inset(0 0 0 0%)" }}
                      transition={{
                        duration: isFinal ? 4.0 : 2.6,
                        delay: li * 0.85,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {line}
                    </motion.p>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
