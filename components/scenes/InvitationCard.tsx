"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { invitationData } from "@/data/invitation";
import { buildGoogleCalendarUrl, generateICS } from "@/lib/utils";
import { IslamicGeometryLine } from "@/components/ui/OrnamentalDivider";

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
      {/* Card shadow layers (depth effect) */}
      {/* <div
        className="absolute inset-0 translate-y-3 translate-x-1 rounded-sm"
        style={{ background: "#E6D5AF", opacity: 0.5 }}
        aria-hidden="true"
      /> */}
      <div
        className="absolute inset-0 translate-y-1.5 rounded-sm"
        style={{ background: "#EDE3CA", opacity: 0.6 }}
        aria-hidden="true"
      />

      {/* Main card */}
      <div
        className="relative rounded-sm overflow-hidden paper-texture"
        style={{
          background: "linear-gradient(160deg, #FDFAF3 0%, #F8F2E0 60%, #F5ECD5 100%)",
          boxShadow: "0 8px 40px rgba(28,18,9,0.14), 0 2px 8px rgba(28,18,9,0.08)",
          border: "1px solid rgba(212,185,106,0.3)",
        }}
      >
        {/* Top gold border */}
        <div
          className="w-full h-1"
          style={{ background: "linear-gradient(90deg, transparent, #B8943F, #ECD99A, #B8943F, transparent)" }}
          aria-hidden="true"
        />

        {/* Inner border lines */}
        <div className="relative m-4">
          <div
            className="absolute inset-0 rounded-sm pointer-events-none"
            style={{ border: "1px solid rgba(212,185,106,0.25)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 px-6 py-5 flex flex-col items-center text-center gap-4">
            {/* Basmala */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-display text-sm"
              style={{ color: "#B8943F" }}
            >
              {invitationData.basmala}
            </motion.p>

            {/* Ornament */}
            <IslamicGeometryLine className="w-full opacity-60" />

            {/* Quran closing */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="font-display"
              style={{ color: "#6B5A47", fontSize: "0.9rem", lineHeight: "2" }}
            >
              وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </motion.p>

            {/* Divider before names */}
            <div
              className="w-24 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }}
              aria-hidden="true"
            />

            {/* Names */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center gap-1"
            >
              <p
                className="font-names gold-shimmer"
                style={{ fontSize: "2.4rem", lineHeight: "1.2" }}
              >
                {invitationData.names.ar}
              </p>
              <div
                className="w-16 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Invitation text */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="font-body text-sm"
              style={{ color: "#6B5A47", lineHeight: "1.8" }}
            >
              {invitationData.invitation}
            </motion.p>

            {/* Ornament */}
            <IslamicGeometryLine className="w-full opacity-50" />

            {/* Wedding date — prominent */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <p
                className="text-xs tracking-widest"
                style={{ color: "#8C7B6A", fontFamily: '"YearOfHandicrafts", serif' }}
              >
                حفل الزفاف
              </p>
              <p
                className="font-display text-2xl"
                style={{ color: "#1C1209" }}
              >
                {invitationData.weddingDate}
              </p>
              <p
                className="font-display text-lg"
                style={{ color: "#B8943F" }}
              >
                {invitationData.weddingTime}
              </p>
            </motion.div>

            {/* Venue */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex flex-col items-center gap-0.5"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mb-1">
                <path d="M7 1C4.79 1 3 2.79 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4Z" stroke="#B8943F" strokeWidth="1" fill="none" />
                <circle cx="7" cy="5" r="1.5" fill="#B8943F" opacity="0.7" />
              </svg>
              <p
                className="font-display text-base"
                style={{ color: "#3D2E1E" }}
              >
                {invitationData.venue}
              </p>
            </motion.div>

            {/* Divider */}
            <div
              className="w-20 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #D4B96A, transparent)" }}
              aria-hidden="true"
            />

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col items-center gap-3 w-full"
            >
              <CardButton
                href={invitationData.mapUrl}
                ariaLabel="افتح الخريطة في تطبيق الخرائط"
                variant="primary"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1C4.79 1 3 2.79 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <circle cx="7" cy="5" r="1.5" fill="currentColor" opacity="0.8" />
                </svg>
                افتح الخريطة
              </CardButton>

              <CardButton
                onClick={handleCalendarClick}
                ariaLabel="أضف حفل الزفاف إلى التقويم"
                variant="secondary"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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

        {/* Bottom gold border */}
        <div
          className="w-full h-1"
          style={{ background: "linear-gradient(90deg, transparent, #B8943F, #ECD99A, #B8943F, transparent)" }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

export function InvitationCard() {
  return (
    <section
      className="relative flex flex-col items-center justify-center py-12 sm:min-h-screen sm:py-20 px-4 overflow-hidden"
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

      {/* Monogram seal */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 1.8, type: "spring", stiffness: 180, damping: 18 }}
        className="relative z-10 mt-4"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(201,168,76,0.35)", margin: "-6px" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <div
          className="relative w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 40% 35%, #FDFAF3, #F2E8D0 80%)",
            border: "1px solid rgba(201,168,76,0.35)",
            boxShadow: "0 2px 20px rgba(184,148,63,0.12), inset 0 1px 3px rgba(255,255,255,0.6)",
          }}
        >
          <svg width="18" height="16" viewBox="0 0 12 11" fill="none" aria-hidden="true">
            <path d="M6 10.5C6 10.5 0.5 6.5 0.5 3.5C0.5 1.84 1.84 0.5 3.5 0.5C4.5 0.5 5.36 1 6 1.78C6.64 1 7.5 0.5 8.5 0.5C10.16 0.5 11.5 1.84 11.5 3.5C11.5 6.5 6 10.5 6 10.5Z" fill="#B8943F" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
