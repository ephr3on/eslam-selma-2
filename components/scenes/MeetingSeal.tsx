"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GoldParticles } from "@/components/ui/GoldParticles";
import { FloatingOrnament } from "@/components/ui/FloatingOrnament";
import { invitationData } from "@/data/invitation";

function IslamicSeal() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-48 h-48 md:w-56 md:h-56"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <motion.circle
        cx="100" cy="100" r="95"
        stroke="#D4B96A"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Second ring */}
      <motion.circle
        cx="100" cy="100" r="85"
        stroke="#B8943F"
        strokeWidth="0.8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Third ring */}
      <motion.circle
        cx="100" cy="100" r="74"
        stroke="#D4B96A"
        strokeWidth="0.4"
        strokeDasharray="3 5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Islamic 8-point star — proper geometric construction */}
      <motion.path
        d="M100 25 L110 68 L150 55 L125 88 L168 88 L132 100 L168 112 L125 112 L150 145 L110 132 L100 175 L90 132 L50 145 L75 112 L32 112 L68 100 L32 88 L75 88 L50 55 L90 68 Z"
        stroke="#C9A84C"
        strokeWidth="0.9"
        fill="rgba(212,185,106,0.04)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.55 } : {}}
        transition={{ duration: 2.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Inner 8-point star (rotated 22.5°) */}
      <motion.path
        d="M100 40 L106 70 L130 58 L116 80 L146 80 L124 95 L140 115 L115 106 L108 136 L100 108 L92 136 L85 106 L60 115 L76 95 L54 80 L84 80 L70 58 L94 70 Z"
        stroke="#B8943F"
        strokeWidth="0.6"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
        transition={{ duration: 2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Inner circle */}
      <motion.circle
        cx="100" cy="100" r="52"
        stroke="#B8943F"
        strokeWidth="0.8"
        fill="rgba(250,247,240,0.6)"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 200 }}
      />

      {/* Compass needle marks */}
      {[0, 45, 90, 135].map((angle, i) => (
        <motion.line
          key={i}
          x1={100 + 60 * Math.cos((angle * Math.PI) / 180)}
          y1={100 + 60 * Math.sin((angle * Math.PI) / 180)}
          x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
          y2={100 + 70 * Math.sin((angle * Math.PI) / 180)}
          stroke="#D4B96A"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
        />
      ))}

      {/* Glow pulse overlay */}
      <motion.circle
        cx="100" cy="100" r="52"
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
          رُسم الطريق بالحبر والضوء،
          <br />
          حتى التقت المدينتان في وعدٍ واحد.
        </p>
      </motion.div>

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
