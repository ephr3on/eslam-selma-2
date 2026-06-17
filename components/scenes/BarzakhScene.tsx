"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedArabicText } from "@/components/ui/AnimatedArabicText";
import { invitationData } from "@/data/invitation";

function EgyptSkyArt({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={style} aria-hidden="true">
      <svg viewBox="0 0 500 400" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Horizon line */}
        <path d="M0 280 Q80 260 160 272 Q240 284 320 268 Q400 252 500 264" stroke="#C9A84C" strokeWidth="0.8" opacity="0.18" />

        {/* Desert dune silhouettes */}
        <path d="M0 360 Q60 290 140 310 Q220 330 300 295 Q380 260 500 290 L500 400 L0 400 Z" fill="#E8D5A8" opacity="0.2" />
        <path d="M0 380 Q100 320 200 340 Q300 360 400 330 Q450 315 500 330 L500 400 L0 400 Z" fill="#DBC898" opacity="0.15" />

        {/* Sun / aten disk */}
        <circle cx="380" cy="80" r="42" fill="#ECD99A" opacity="0.1" />
        <circle cx="380" cy="80" r="28" fill="#D4B96A" opacity="0.15" />
        <circle cx="380" cy="80" r="14" fill="#B8943F" opacity="0.12" />
        {/* Sun rays */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={380 + 30 * Math.cos(rad)} y1={80 + 30 * Math.sin(rad)}
              x2={380 + 52 * Math.cos(rad)} y2={80 + 52 * Math.sin(rad)}
              stroke="#D4B96A" strokeWidth="0.6" opacity="0.12"
            />
          );
        })}

        {/* Nile sinuous river */}
        <path
          d="M220 0 Q230 60 210 120 Q190 180 215 240 Q240 300 218 380"
          stroke="#4A6E9E" strokeWidth="2.5" fill="none" opacity="0.15" strokeLinecap="round"
        />
        {/* Nile delta */}
        <path d="M210 120 Q190 110 160 115 M205 140 Q180 135 150 142" stroke="#4A6E9E" strokeWidth="1" fill="none" opacity="0.12" strokeLinecap="round" />

        {/* Stylised pyramid */}
        <path d="M50 310 L95 240 L140 310 Z" stroke="#B8943F" strokeWidth="1" fill="#E6D5A8" fillOpacity="0.1" opacity="0.35" />
        <path d="M80 310 L95 262 L110 310 Z" stroke="#B8943F" strokeWidth="0.6" fill="none" opacity="0.2" />

        {/* Papyrus plant */}
        <line x1="420" y1="350" x2="420" y2="290" stroke="#4A7C6E" strokeWidth="2" opacity="0.18" strokeLinecap="round" />
        <ellipse cx="420" cy="288" rx="12" ry="20" fill="#4A7C6E" opacity="0.12" />
        <line x1="408" y1="355" x2="412" y2="298" stroke="#4A7C6E" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
        <ellipse cx="412" cy="296" rx="9" ry="15" fill="#4A7C6E" opacity="0.1" />
        <line x1="432" y1="355" x2="428" y2="300" stroke="#4A7C6E" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
        <ellipse cx="428" cy="298" rx="9" ry="15" fill="#4A7C6E" opacity="0.1" />
      </svg>
    </div>
  );
}

function TunisiaSeaArt({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={style} aria-hidden="true">
      <svg viewBox="0 0 500 400" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sky wash */}
        <path d="M0 0 L500 0 L500 180 Q250 200 0 180 Z" fill="#4A6E9E" opacity="0.04" />

        {/* Coastal outline */}
        <path
          d="M0 150 Q40 138 80 145 Q120 152 160 140 Q200 128 240 135 Q280 142 320 130 Q360 118 400 126 Q440 134 500 120"
          stroke="#C17A5E" strokeWidth="1.5" fill="none" opacity="0.22" strokeLinecap="round"
        />

        {/* Mediterranean sea waves */}
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M0 ${200 + i * 24} Q62 ${188 + i * 24} 125 ${200 + i * 24} Q188 ${212 + i * 24} 250 ${200 + i * 24} Q312 ${188 + i * 24} 375 ${200 + i * 24} Q437 ${212 + i * 24} 500 ${200 + i * 24}`}
            stroke="#4A6E9E"
            strokeWidth={i === 0 ? 1.2 : 0.7}
            fill="none"
            opacity={0.15 - i * 0.02}
            strokeLinecap="round"
          />
        ))}

        {/* Medina gateway arch */}
        <path d="M80 350 L80 280 Q80 250 105 248 Q130 246 130 275 L130 350" stroke="#8C7B6A" strokeWidth="1.5" fill="none" opacity="0.22" />
        <path d="M80 278 Q105 255 130 278" stroke="#8C7B6A" strokeWidth="1.5" fill="none" opacity="0.22" />

        {/* Minaret */}
        <rect x="320" y="200" width="16" height="100" fill="#8C7B6A" opacity="0.1" rx="1" />
        <path d="M312 202 Q328 188 344 202 Z" fill="#8C7B6A" opacity="0.15" />
        <circle cx="328" cy="200" r="3" fill="#B8943F" opacity="0.2" />

        {/* Mosaic tile grid */}
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={200 + col * 18}
              y={50 + row * 18}
              width="12"
              height="12"
              rx="1"
              fill={(col + row) % 2 === 0 ? "#4A7C6E" : "#C17A5E"}
              opacity="0.08"
            />
          ))
        )}

        {/* Olive trees */}
        <circle cx="420" cy="160" r="22" fill="#4A7C6E" opacity="0.08" />
        <line x1="420" y1="182" x2="420" y2="210" stroke="#6B5A47" strokeWidth="2" opacity="0.15" strokeLinecap="round" />
        <circle cx="450" cy="168" r="16" fill="#4A7C6E" opacity="0.07" />
        <line x1="450" y1="184" x2="450" y2="210" stroke="#6B5A47" strokeWidth="1.5" opacity="0.12" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function BarzakhScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yEgypt  = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const yTunisia = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F8F2E2 0%, #FAF7F0 35%, #F2E8D6 70%, #EDE4CC 100%)" }}
    >
      {/* Egypt art — top right parallax */}
      <motion.div
        className="absolute top-0 right-0 w-4/5 h-3/5 pointer-events-none"
        style={{ y: yEgypt }}
      >
        <EgyptSkyArt />
      </motion.div>

      {/* Tunisia art — bottom left parallax */}
      <motion.div
        className="absolute bottom-0 left-0 w-4/5 h-3/5 pointer-events-none"
        style={{ y: yTunisia }}
      >
        <TunisiaSeaArt />
      </motion.div>

      {/* Center haze / barzakh glow */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 100% at 50% 50%, rgba(250,247,240,0.85) 30%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Content — center */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        {/* Basmala */}
        <AnimatedArabicText
          className="font-display mb-6"
          style={{ color: "#B8943F", fontSize: "1rem", opacity: 0.92 }}
          delay={0.2}
        >
          {invitationData.basmala}
        </AnimatedArabicText>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-28 h-px mb-7"
          style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }}
          aria-hidden="true"
        />

        {/* Quran verse */}
        {invitationData.quranVerse.map((line, i) => (
          <AnimatedArabicText
            key={i}
            className="font-display mb-1.5"
            style={{ color: "#3D2E1E", fontSize: "1.05rem", lineHeight: "2.1" }}
            delay={0.4 + i * 0.2}
          >
            <p>{line}</p>
          </AnimatedArabicText>
        ))}

        <AnimatedArabicText
          className="font-body text-xs mt-2 mb-7"
          style={{ color: "#8C7B6A" }}
          delay={1.1}
        >
          <p>— {invitationData.quranRef}</p>
        </AnimatedArabicText>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-28 h-px mb-7"
          style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }}
          aria-hidden="true"
        />

        {/* Poetic bridge */}
        <AnimatedArabicText
          className="font-display"
          style={{ color: "#6B5A47", fontSize: "0.95rem", lineHeight: "2.2" }}
          delay={1.3}
        >
          <p>بين شرقية مصر وسواحل سوسة</p>
          <p>حيث تلتقي المدينتان في حلمٍ واحد</p>
        </AnimatedArabicText>
      </div>

      {/* Ink dots scattered */}
      {[
        { x: "8%",  y: "18%", s: 3 },
        { x: "88%", y: "25%", s: 2 },
        { x: "12%", y: "72%", s: 2.5 },
        { x: "92%", y: "68%", s: 2 },
        { x: "50%", y: "8%",  s: 1.5 },
        { x: "48%", y: "92%", s: 1.5 },
      ].map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: d.x, top: d.y, width: d.s * 3, height: d.s * 3, background: "#B8943F", opacity: 0.14 }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 + 0.5, duration: 0.4, type: "spring" }}
          aria-hidden="true"
        />
      ))}
    </section>
  );
}
