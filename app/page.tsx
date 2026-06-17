"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIntro } from "@/components/scenes/EnvelopeIntro";
//  import { BarzakhScene } from "@/components/scenes/BarzakhScene";
import { CitiesDrawingScene } from "@/components/scenes/CitiesDrawingScene";
import { MeetingSeal } from "@/components/scenes/MeetingSeal";
import { InvitationCard } from "@/components/scenes/InvitationCard";
import { ClosingBlessing } from "@/components/scenes/ClosingBlessing";

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);

  // Lock scroll while envelope is showing
  useEffect(() => {
    document.body.style.overflow = isOpened ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpened]);

  return (
    <main dir="rtl">
      {/* Scene 1 — Envelope (fixed overlay until tapped) */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="envelope"
            className="fixed inset-0 z-50"
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <EnvelopeIntro onOpen={() => setIsOpened(true)} isOpened={false} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scenes 2–6 — revealed after envelope opens */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            
            <CitiesDrawingScene />
            <MeetingSeal />
            <InvitationCard />
            <ClosingBlessing />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
