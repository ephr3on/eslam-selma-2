"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIntro } from "@/components/scenes/EnvelopeIntro";
//  import { BarzakhScene } from "@/components/scenes/BarzakhScene";
import { CitiesDrawingScene } from "@/components/scenes/CitiesDrawingScene";
import { MeetingSeal } from "@/components/scenes/MeetingSeal";
import { InvitationCard } from "@/components/scenes/InvitationCard";
// import { ClosingBlessing } from "@/components/scenes/ClosingBlessing";

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  function handleStampClick() {
    if (isTransitioning) return;
    // 3500 ms (photo rises) + 5000 ms (photo stands) = 8500 ms
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => setIsOpened(true), 1800);
    }, 8500);
  }

  // Lock scroll while envelope is showing
  useEffect(() => {
    document.body.style.overflow = isOpened ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpened]);

  return (
    <main dir="rtl">
      {/* ── Cinematic glow transition — three fixed layers ────────────────
          Layer 1 (z:60): deep golden pulse from the envelope centre
          Layer 2 (z:61): warm cream aura expanding outward
          Layer 3 (z:62): blinding white flash that completes the wipe     */}

      {/* Layer 1 — deep golden burst */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 60,
            background:
              "radial-gradient(ellipse 90% 80% at 50% 48%, rgba(255,210,80,0.85) 0%, rgba(212,175,80,0.65) 20%, rgba(180,145,55,0.3) 48%, transparent 70%)",
          }}
          initial={{ opacity: 0 }}
          animate={isOpened ? { opacity: 0 } : { opacity: [0, 1, 0.75, 1] }}
          transition={
            isOpened
              ? { duration: 1.6, ease: "easeOut" }
              : { duration: 0.9, times: [0, 0.35, 0.6, 1], ease: "easeOut" }
          }
          aria-hidden="true"
        />
      )}

      {/* Layer 2 — warm cream aura */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 61,
            background: [
              "radial-gradient(ellipse 160% 140% at 50% 46%,",
              "  rgba(255,255,235,0.98)  0%,",
              "  rgba(255,250,210,0.88) 12%,",
              "  rgba(248,235,180,0.72) 26%,",
              "  rgba(236,212,140,0.48) 44%,",
              "  rgba(220,190,100,0.18) 62%,",
              "  transparent            80%",
              ")",
            ].join(""),
          }}
          initial={{ opacity: 0 }}
          animate={isOpened ? { opacity: 0 } : { opacity: [0, 0, 1] }}
          transition={
            isOpened
              ? { duration: 2, ease: "easeOut" }
              : { duration: 1.1, times: [0, 0.38, 1], ease: [0.22, 1, 0.36, 1] }
          }
          aria-hidden="true"
        />
      )}

      {/* Layer 3 — white flash (completes the wipe) */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 62,
            background: [
              "radial-gradient(ellipse 150% 130% at 50% 46%,",
              "  rgba(255,255,255,1)     0%,",
              "  rgba(255,252,228,0.95) 14%,",
              "  rgba(255,245,195,0.70) 30%,",
              "  rgba(245,225,155,0.28) 52%,",
              "  transparent            72%",
              ")",
            ].join(""),
          }}
          initial={{ opacity: 0 }}
          animate={isOpened ? { opacity: 0 } : { opacity: [0, 0, 0, 1] }}
          transition={
            isOpened
              ? { duration: 2.4, ease: [0.4, 0, 0.2, 1] }
              : { duration: 1.3, times: [0, 0.45, 0.65, 1], ease: [0.22, 1, 0.36, 1] }
          }
          aria-hidden="true"
        />
      )}

      {/* Scene 1 — Envelope (fixed overlay until tapped) */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="envelope"
            className="fixed inset-0 z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <EnvelopeIntro
              onStampClick={handleStampClick}
              isTransitioning={isTransitioning}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scenes 2–6 — revealed after envelope opens */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* <BarzakhScene /> */}
            <CitiesDrawingScene />
            <MeetingSeal />
            <InvitationCard />
            {/* <ClosingBlessing /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
