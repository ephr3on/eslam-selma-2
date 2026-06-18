"use client";

import { useState, useEffect, useRef } from "react";
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
  const [musicStarted, setMusicStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function handleStampClick() {
    if (isTransitioning) return;
    // Play music on the user-gesture event so browsers allow it
    if (audioRef.current) {
      audioRef.current.volume = 0.45;
      audioRef.current.play().catch(() => {});
      setMusicStarted(true);
    }
    // 3500 ms (photo rises) + 3000 ms (photo stands) = 6500 ms
    setTimeout(() => {
      setIsTransitioning(true);
      // Glow reaches full opacity at 1000 ms — switch scene then, hidden under it.
      setTimeout(() => setIsOpened(true), 1000);
    }, 6500);
  }

  function toggleMute() {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(v => !v);
  }

  // Lock scroll while envelope is showing
  useEffect(() => {
    document.body.style.overflow = isOpened ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpened]);

  return (
    <main dir="rtl">
      {/* Background music — plays after stamp tap */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/background_music.mp3" loop preload="auto" />

      {/* Mute / unmute toggle — appears once music starts */}
      <AnimatePresence>
        {musicStarted && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={toggleMute}
            aria-label={isMuted ? "تشغيل الموسيقى" : "كتم الموسيقى"}
            className="fixed bottom-6 left-6 z-[70] flex items-center justify-center rounded-full focus:outline-none"
            style={{
              width: 40, height: 40,
              background: "rgba(242, 232, 208, 0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(212,185,106,0.5)",
              boxShadow: "0 2px 12px rgba(28,18,9,0.12)",
            }}
          >
            {isMuted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5Z" fill="#B8943F" />
                <line x1="23" y1="9" x2="17" y2="15" stroke="#B8943F" strokeWidth="2" strokeLinecap="round" />
                <line x1="17" y1="9" x2="23" y2="15" stroke="#B8943F" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5Z" fill="#B8943F" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#B8943F" strokeWidth="2" strokeLinecap="round" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#B8943F" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>
      {/* Single glow transition — warm golden radial that fades in over 1 s,
          holds while the scene switches, then melts away over 1.8 s.       */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 60,
            background:
              "radial-gradient(ellipse 120% 110% at 50% 50%, rgba(255,248,220,1) 0%, rgba(255,236,170,0.92) 22%, rgba(240,210,130,0.65) 46%, rgba(210,175,90,0.25) 68%, transparent 88%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpened ? 0 : 1 }}
          transition={
            isOpened
              ? { duration: 1.8, ease: [0.4, 0, 0.2, 1] }
              : { duration: 1.0, ease: "easeOut" }
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
            transition={{ duration: 0.4 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
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
