"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { invitationData } from "@/data/invitation";
import { buildGoogleCalendarUrl, generateICS } from "@/lib/utils";
import { IslamicGeometryLine } from "@/components/ui/OrnamentalDivider";
import { StaggeredLines } from "@/components/ui/AnimatedArabicText";

const buttonStyle = {
  primary: {
    background: "linear-gradient(135deg, #B8943F, #D4B96A, #B8943F)",
    backgroundSize: "200% auto",
    color: "#FAF7F0",
    border: "none",
    boxShadow: "0 4px 16px rgba(184,148,63,0.3)",
  },
  secondary: {
    background: "transparent",
    color: "#B8943F",
    border: "1px solid #D4B96A",
  },
} as const;

function CardButton({
  href,
  onClick,
  children,
  variant = "primary",
  ariaLabel,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  ariaLabel: string;
}) {
  const shared = {
    "aria-label": ariaLabel,
    className: "inline-flex items-center justify-center gap-2 font-body text-sm px-6 py-3 rounded-sm transition-all duration-300 select-none",
    style: buttonStyle[variant],
    whileHover: {
      scale: 1.02,
      boxShadow: variant === "primary"
        ? "0 6px 24px rgba(184,148,63,0.4)"
        : "0 2px 12px rgba(184,148,63,0.2)",
    },
    whileTap: { scale: 0.97 },
  };

  if (onClick) {
    return <motion.button onClick={onClick} {...shared}>{children}</motion.button>;
  }
  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
      {children}
    </motion.a>
  );
}

function CornerOrnament({ flip }: { flip?: "x" | "y" | "both" }) {
  const transform =
    flip === "x" ? "scaleX(-1)" :
    flip === "y" ? "scaleY(-1)" :
    flip === "both" ? "scale(-1,-1)" :
    undefined;
  return (
    <svg
      width="22" height="22" viewBox="0 0 22 22" fill="none"
      style={{ transform }}
      aria-hidden="true"
    >
      <path d="M1 18 L1 3 Q1 1 3 1 L18 1" stroke="#C9A84C" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <circle cx="1" cy="1" r="1.8" fill="#C9A84C" opacity="0.35" />
      <path d="M5 1 L1 5" stroke="#C9A84C" strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}

function DiamondDivider() {
  return (
    <div className="flex items-center gap-2 w-full" aria-hidden="true">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #D4B96A)" }} />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 0 L10 5 L5 10 L0 5 Z" stroke="#C9A84C" strokeWidth="0.8" fill="rgba(201,168,76,0.18)" />
      </svg>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #D4B96A)" }} />
    </div>
  );
}

function CardInner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  function handleCalendarClick() {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    if (isIOS) {
      const ics = generateICS(invitationData.calendarEvent);
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "eslam-selma-wedding.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      window.open(buildGoogleCalendarUrl(invitationData.calendarEvent), "_blank", "noopener,noreferrer");
    }
  }

  return (
    <motion.div
      ref={ref}
      className="relative w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Stacked shadow layers */}
      <div className="absolute inset-0 translate-y-4 translate-x-1.5 rounded-sm" style={{ background: "#D9C89A", opacity: 0.35 }} aria-hidden="true" />
      <div className="absolute inset-0 translate-y-2 rounded-sm" style={{ background: "#E6D5AF", opacity: 0.55 }} aria-hidden="true" />

      {/* Main card */}
      <div
        className="relative rounded-sm overflow-hidden paper-texture"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 42%, #FDFAF3 0%, #F8F2E0 55%, #F3EAD2 100%)",
          boxShadow: "0 20px 60px rgba(28,18,9,0.18), 0 4px 12px rgba(28,18,9,0.1), inset 0 1px 0 rgba(255,255,255,0.7)",
          border: "1px solid rgba(212,185,106,0.45)",
        }}
      >
        {/* Top ornamental border */}
        <div className="w-full h-1.5" style={{ background: "linear-gradient(90deg, transparent 0%, #9E7A2A 15%, #D4B96A 35%, #ECD99A 50%, #D4B96A 65%, #9E7A2A 85%, transparent 100%)" }} aria-hidden="true" />

        {/* Outer inner frame */}
        <div className="relative m-5">
          <div className="absolute inset-0 pointer-events-none" style={{ border: "1px solid rgba(212,185,106,0.2)" }} aria-hidden="true" />

          {/* Inner inner frame */}
          <div className="relative m-2">
            {/* Border */}
            <div className="absolute inset-0 pointer-events-none" style={{ border: "1px solid rgba(212,185,106,0.38)" }} aria-hidden="true" />

            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 -translate-x-px -translate-y-px" aria-hidden="true"><CornerOrnament /></div>
            <div className="absolute top-0 right-0 translate-x-px -translate-y-px" aria-hidden="true"><CornerOrnament flip="x" /></div>
            <div className="absolute bottom-0 left-0 -translate-x-px translate-y-px" aria-hidden="true"><CornerOrnament flip="y" /></div>
            <div className="absolute bottom-0 right-0 translate-x-px translate-y-px" aria-hidden="true"><CornerOrnament flip="both" /></div>

            <div className="relative z-10 px-7 py-7 flex flex-col items-center text-center gap-5">

              {/* Basmala */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="font-display text-sm tracking-wide"
                style={{ color: "#B8943F", letterSpacing: "0.05em" }}
              >
                {invitationData.basmala}
              </motion.p>

              {/* Ornament */}
              <IslamicGeometryLine className="w-full opacity-55" />

              {/* Quran closing */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.9 }}
                className="font-display"
                style={{ color: "#6B5A47", fontSize: "0.88rem", lineHeight: "2.1" }}
              >
                وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              </motion.p>

              {/* Diamond divider */}
              <DiamondDivider />

              {/* Names */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, duration: 1, type: "spring", stiffness: 180, damping: 20 }}
                className="flex flex-col items-center gap-2 py-1"
              >
                <p className="font-names gold-shimmer" style={{ fontSize: "2.6rem", lineHeight: "1.15" }}>
                  {invitationData.names.ar}
                </p>
              </motion.div>

              {/* Diamond divider */}
              <DiamondDivider />

              {/* Invitation text */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="font-body text-sm"
                style={{ color: "#6B5A47", lineHeight: "2" }}
              >
                {invitationData.invitation}
              </motion.p>

              {/* Ornament */}
              <IslamicGeometryLine className="w-full opacity-45" />

              {/* Wedding date */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col items-center gap-1.5"
              >
                <p
                  className="text-xs tracking-widest"
                  style={{ color: "#8C7B6A", fontFamily: '"YearOfHandicrafts", serif', letterSpacing: "0.22em" }}
                >
                  حفل الزفاف
                </p>
                <p className="font-display text-2xl" style={{ color: "#1C1209" }}>
                  {invitationData.weddingDate}
                </p>
                <p className="font-display text-base" style={{ color: "#B8943F" }}>
                  {invitationData.weddingTime}
                </p>
              </motion.div>

              {/* Venue */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.35, duration: 0.8 }}
                className="flex items-center gap-2"
              >
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
                  <path d="M5.5 0C3.01 0 1 2.01 1 4.5c0 3.28 4.5 8.5 4.5 8.5S10 7.78 10 4.5C10 2.01 7.99 0 5.5 0Z" stroke="#B8943F" strokeWidth="0.9" fill="none" />
                  <circle cx="5.5" cy="4.5" r="1.5" fill="#B8943F" opacity="0.65" />
                </svg>
                <p className="font-display text-sm" style={{ color: "#3D2E1E" }}>
                  {invitationData.venue}
                </p>
              </motion.div>

              {/* Divider */}
              <DiamondDivider />

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex flex-col items-center gap-3 w-full"
              >
                <CardButton href={invitationData.mapUrl} ariaLabel="افتح الخريطة في تطبيق الخرائط" variant="primary">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1C4.79 1 3 2.79 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    <circle cx="7" cy="5" r="1.5" fill="currentColor" opacity="0.8" />
                  </svg>
                  افتح الخريطة
                </CardButton>
                <CardButton onClick={handleCalendarClick} ariaLabel="أضف حفل الزفاف إلى التقويم" variant="secondary">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    <line x1="1" y1="5" x2="13" y2="5" stroke="currentColor" strokeWidth="1" />
                    <line x1="4" y1="1" x2="4" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="10" y1="1" x2="10" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="7" cy="9" r="1" fill="currentColor" opacity="0.6" />
                  </svg>
                  أضف إلى التقويم
                </CardButton>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Bottom ornamental border */}
        <div className="w-full h-1.5" style={{ background: "linear-gradient(90deg, transparent 0%, #9E7A2A 15%, #D4B96A 35%, #ECD99A 50%, #D4B96A 65%, #9E7A2A 85%, transparent 100%)" }} aria-hidden="true" />
      </div>
    </motion.div>
  );
}

export function InvitationCard() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F5EDD6 0%, #EDE4D0 30%, #F5EDD6 100%)" }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diamonds" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 2 L38 20 L20 38 L2 20 Z" stroke="#B8943F" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamonds)" />
        </svg>
      </div>

      {/* The card */}
      <div className="relative z-10 w-full max-w-sm">
        <CardInner />
      </div>

      {/* Poetic lines around the card */}
      <StaggeredLines
        lines={[
          "من الشرقية إلى سوسة،",
          "رُسم الطريق بالحبر والضوء",
        ]}
        className="mt-10 text-center z-10"
        lineClassName="font-display text-sm py-0.5"
        staggerDelay={0.2}
        baseDelay={0.3}
        variant="ink"
      />
    </section>
  );
}
