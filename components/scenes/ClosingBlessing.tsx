"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { invitationData } from "@/data/invitation";
import { FloatingOrnament } from "@/components/ui/FloatingOrnament";

export function ClosingBlessing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
      style={{
        minHeight: "70vh",
        background: "linear-gradient(180deg, #F2E8D0 0%, #EDE4CC 40%, #E8DCC5 100%)",
      }}
    >
      {/* Top fade */}
      <div
        className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #F5EDD6, transparent)" }}
        aria-hidden="true"
      />

      {/* Subtle background geometric art */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
          {/* Large faint circles */}
          <circle cx="200" cy="250" r="180" stroke="#C9A84C" strokeWidth="0.4" fill="none" opacity="0.06" />
          <circle cx="200" cy="250" r="140" stroke="#C9A84C" strokeWidth="0.3" fill="none" opacity="0.05" />
          <circle cx="200" cy="250" r="100" stroke="#C9A84C" strokeWidth="0.4" fill="none" opacity="0.07" />
          {/* Star points */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={200 + 100 * Math.cos(rad)} y1={250 + 100 * Math.sin(rad)}
                x2={200 + 178 * Math.cos(rad)} y2={250 + 178 * Math.sin(rad)}
                stroke="#C9A84C" strokeWidth="0.3" opacity="0.06"
              />
            );
          })}
        </svg>
      </div>

      {/* Large watermark monogram */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <motion.span
          className="font-display"
          style={{ fontSize: "min(30vw, 200px)", color: "#B8943F", opacity: 0.04, lineHeight: 1 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.04 } : {}}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {invitationData.names.monogram}
        </motion.span>
      </div>

      {/* Floating ornaments */}
      <FloatingOrnament size={36} style={{ position: "absolute", top: "15%", right: "8%", opacity: 0.12 }} />
      <FloatingOrnament size={28} style={{ position: "absolute", top: "20%", left: "8%", opacity: 0.1 }} />
      <FloatingOrnament size={22} style={{ position: "absolute", bottom: "25%", right: "12%", opacity: 0.09 }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xs">
        {/* Top divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-36 h-px mb-10"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
          aria-hidden="true"
        />

        {/* Islamic star ornament */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
          className="mb-7"
          aria-hidden="true"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2 L16 10 L22 7 L18 14 L25 14 L18 21 L22 21 L16 18 L14 26 L12 18 L6 21 L10 21 L3 14 L10 14 L6 7 L12 10 Z"
              stroke="#C9A84C"
              strokeWidth="0.7"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </motion.div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mb-10"
          style={{ color: "#3D2E1E", fontSize: "1.15rem", lineHeight: "2.1" }}
        >
          {invitationData.closingLine}
        </motion.p>

        {/* Monogram seal */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 1.0, type: "spring", stiffness: 180, damping: 18 }}
          className="relative mb-10"
        >
          {/* Outer pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(201,168,76,0.35)", margin: "-6px" }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />

          <div
            className="relative w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle at 40% 35%, #FDFAF3, #F2E8D0 80%)",
              border: "1px solid rgba(201,168,76,0.35)",
              boxShadow: "0 2px 20px rgba(184,148,63,0.12), inset 0 1px 3px rgba(255,255,255,0.6)",
            }}
          >
            <span
              className="font-display select-none"
              style={{ color: "#B8943F", fontSize: "1rem" }}
            >
              {invitationData.names.monogram}
            </span>
          </div>
        </motion.div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-36 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
          aria-hidden="true"
        />
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-5 inset-x-0 text-center"
      >
        <p className="font-body text-xs" style={{ color: "#8C7B6A", opacity: 0.45, letterSpacing: "0.04em" }}>
          {invitationData.weddingDate} · {invitationData.venue}
        </p>
      </motion.footer>
    </section>
  );
}
