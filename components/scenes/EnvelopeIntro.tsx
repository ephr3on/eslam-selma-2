"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { GoldParticles } from "@/components/ui/GoldParticles";
import { invitationData } from "@/data/invitation";

interface EnvelopeIntroProps {
  onOpen: () => void;
  onOpenStart: () => void;
  isOpened: boolean;
}

function EnvelopeSVG({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-full h-full">
      {/* Inner light that spills out as the flap opens */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute inset-x-[8%] pointer-events-none"
            style={{
              top: "8%",
              height: "55%",
              background: "radial-gradient(ellipse at 50% 0%, #FFFBE8 0%, #ECD99A 35%, transparent 75%)",
              filter: "blur(8px)",
              zIndex: 1,
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 1, 0.7], scaleY: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
      {/* Envelope body */}
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        {/* Envelope back */}
        <rect x="2" y="2" width="316" height="216" rx="4" fill="#F2E8D0" stroke="#D4B96A" strokeWidth="1" />

        {/* Bottom triangle fold */}
        <path d="M2 218 L160 130 L318 218 Z" fill="#EBE0C4" stroke="#D4B96A" strokeWidth="0.5" />

        {/* Side triangles */}
        <path d="M2 2 L2 218 L160 130 Z" fill="#E6D5AF" stroke="#D4B96A" strokeWidth="0.5" />
        <path d="M318 2 L318 218 L160 130 Z" fill="#E8D8B5" stroke="#D4B96A" strokeWidth="0.5" />

        {/* Islamic geometric pattern on body */}
        <g opacity="0.2" stroke="#B8943F" strokeWidth="0.5">
          <rect x="20" y="20" width="280" height="180" rx="2" fill="none" />
          <rect x="30" y="30" width="260" height="160" rx="1" fill="none" strokeDasharray="4 4" />
          {/* Star of 8 */}
          <path d="M160 60 L166 74 L181 74 L169 83 L174 97 L160 88 L146 97 L151 83 L139 74 L154 74 Z" fill="none" />
        </g>

        {/* Envelope flap (top triangle) — animates open */}
        <motion.path
          initial={{ d: "M2 2 L160 110 L318 2 Z", fill: "#EDE3CA" }}
          animate={{
            d: isOpen ? "M2 2 L160 -80 L318 2 Z" : "M2 2 L160 110 L318 2 Z",
            fill: isOpen ? "#F8F3E6" : "#EDE3CA",
          }}
          stroke="#D4B96A"
          strokeWidth="1"
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Fold line on flap */}
        <motion.line
          x1="2" y1="2" x2="318" y2="2"
          stroke="#D4B96A"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>

      {/* Gold wax seal */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: "38%" }}
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 40% 35%, #ECD99A, #B8943F 60%, #8B6914)",
            boxShadow: "0 2px 8px rgba(184,148,63,0.5), inset 0 1px 2px rgba(255,255,255,0.3)",
            animation: "envelope-seal-pulse 2s ease-in-out infinite",
          }}
        >
          <svg width="12" height="11" viewBox="0 0 12 11" fill="none" aria-hidden="true">
            <path d="M6 10.5C6 10.5 0.5 6.5 0.5 3.5C0.5 1.84 1.84 0.5 3.5 0.5C4.5 0.5 5.36 1 6 1.78C6.64 1 7.5 0.5 8.5 0.5C10.16 0.5 11.5 1.84 11.5 3.5C11.5 6.5 6 10.5 6 10.5Z" fill="rgba(250,247,240,0.9)" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export function EnvelopeIntro({ onOpen, onOpenStart, isOpened }: EnvelopeIntroProps) {
  const [hinted, setHinted] = useState(false);
  const [localOpen, setLocalOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHinted(true), 2000);
    return () => clearTimeout(t);
  }, []);

  function handleClick() {
    if (localOpen) return;
    setLocalOpen(true);
    onOpenStart();
    // Fire scene switch once glow has filled the screen (~1.3s)
    setTimeout(() => onOpen(), 1300);
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FAF7F0 0%, #F5EDD6 50%, #F0E4C8 100%)" }}
    >
      {/* Subtle background geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0 L80 40 L40 80 L0 40 Z" stroke="#B8943F" strokeWidth="1" fill="none" />
              <path d="M40 10 L70 40 L40 70 L10 40 Z" stroke="#B8943F" strokeWidth="0.5" fill="none" />
              <circle cx="40" cy="40" r="8" stroke="#B8943F" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo)" />
        </svg>
      </div>

      {/* Top decorative line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-8 left-8 right-8 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }}
        aria-hidden="true"
      />

      {/* Envelope container */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Names above envelope */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mb-8 text-center"
        >
          {/* <p
            // className="text-sm tracking-widest uppercase"
            style={{ color: "#8C7B6A", fontFamily: '"YearOfHandicrafts", serif' }}
          >
            دعوة زفاف
          </p> */}
        </motion.div>

        {/* The Envelope + Hint */}
        <div className="relative">
          <motion.button
            className="relative w-72 h-48 sm:w-80 sm:h-52 md:w-96 md:h-64 cursor-pointer focus:outline-none"
            onClick={handleClick}
            whileHover={localOpen ? {} : { scale: 1.02 }}
            whileTap={localOpen ? {} : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label="افتح الدعوة"
            style={{
              filter: "drop-shadow(0 8px 24px rgba(28,18,9,0.12))",
              willChange: "transform",
            }}
          >
            <EnvelopeSVG isOpen={localOpen} />
            {localOpen && <GoldParticles count={22} active={localOpen} />}
          </motion.button>

          {/* Hint — absolutely positioned so it never shifts the envelope */}
          <AnimatePresence>
            {!localOpen && hinted && (
              <motion.div
                className="absolute top-full mt-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 17 L10 3 M5 8 L10 3 L15 8" stroke="#B8943F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <p className="font-body text-sm whitespace-nowrap" style={{ color: "#8C7B6A" }}>
                  {invitationData.openEnvelopePrompt}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 left-8 right-8 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }}
        aria-hidden="true"
      />

      {/* Corner ornaments */}
      {["top-6 right-6 rotate-0", "top-6 left-6 rotate-90", "bottom-6 left-6 rotate-180", "bottom-6 right-6 -rotate-90"].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
          className={`absolute ${pos}`}
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M2 2 L10 2 L2 10" stroke="#B8943F" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </motion.div>
      ))}
    </section>
  );
}
