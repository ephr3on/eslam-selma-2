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

  // Lock scroll while envelope is showing
  useEffect(() => {
    document.body.style.overflow = isOpened ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpened]);

  return (
    <main dir="rtl">
      {/* Golden glow — fixed so it survives the scene switch */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 60,
            background: [
              "radial-gradient(ellipse 160% 140% at 50% 44%,",
              "  rgba(255,255,240,1)         0%,",
              "  rgba(255,251,220,0.95)      10%,",
              "  rgba(248,238,190,0.85)      22%,",
              "  rgba(236,217,154,0.65)      38%,",
              "  rgba(220,195,110,0.30)      55%,",
              "  rgba(212,185,106,0.08)      72%,",
              "  rgba(212,185,106,0)         84%",
              ")",
            ].join(""),
          }}
          initial={{ opacity: 0 }}
          animate={isOpened ? { opacity: 0 } : { opacity: 1 }}
          transition={
            isOpened
              ? { duration: 1.8, ease: "easeOut" }
              : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
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
              onOpenStart={() => setIsTransitioning(true)}
              onOpen={() => setIsOpened(true)}
              isOpened={false}
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
