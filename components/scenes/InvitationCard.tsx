"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { invitationData } from "@/data/invitation";
import { buildGoogleCalendarUrl, generateICS } from "@/lib/utils";
import { IslamicGeometryLine } from "@/components/ui/OrnamentalDivider";
import {
  FramedCorners,
  FloralDivider,
  FlankedHeading,
  DotRule,
} from "@/components/ui/Ornaments";

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
    className: "inline-flex flex-1 basis-0 min-w-0 items-center justify-center gap-1.5 font-handicrafts text-xs whitespace-nowrap px-3 py-3 rounded-sm transition-all duration-300 select-none",
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

const ICON_COLOR = "#8C6D4A";

function CalendarIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.5" stroke={ICON_COLOR} strokeWidth="1.6" />
      <line x1="3" y1="10" x2="21" y2="10" stroke={ICON_COLOR} strokeWidth="1.6" />
      <line x1="8" y1="2.8" x2="8" y2="6.5" stroke={ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="2.8" x2="16" y2="6.5" stroke={ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" />
      <g fill={ICON_COLOR}>
        <rect x="6.5" y="12.5" width="2" height="2" rx="0.4" />
        <rect x="11" y="12.5" width="2" height="2" rx="0.4" />
        <rect x="15.5" y="12.5" width="2" height="2" rx="0.4" />
        <rect x="6.5" y="16.5" width="2" height="2" rx="0.4" />
        <rect x="11" y="16.5" width="2" height="2" rx="0.4" />
        <rect x="15.5" y="16.5" width="2" height="2" rx="0.4" />
      </g>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5c-3.6 0-6.5 2.9-6.5 6.5 0 4.9 6.5 12.5 6.5 12.5S18.5 13.9 18.5 9c0-3.6-2.9-6.5-6.5-6.5Z"
        fill={ICON_COLOR}
      />
      <circle cx="12" cy="9" r="2.6" fill="#F8F2E0" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" stroke={ICON_COLOR} strokeWidth="1.6" />
      <path d="M12 6.6V12l3.6 2.4" stroke={ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoColumn({
  icon,
  primary,
  secondary,
}: {
  icon: React.ReactNode;
  primary: string;
  secondary: string;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-start text-center gap-1.5 px-1.5">
      {icon}
      <p className="font-handicrafts leading-tight" style={{ color: "#3D2E1E", fontSize: "0.92rem", fontFamily: "YearOfHandicrafts, Amiri, Georgia, serif"}}>
        {primary}
      </p>
      <p className="font-handicrafts leading-tight" style={{ color: "#8C7B6A", fontSize: "0.8rem", fontFamily: "YearOfHandicrafts, Amiri, Georgia, serif" }}>
        {secondary}
      </p>
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
          {/* Second hairline — a fine double rule */}
          <div
            className="absolute rounded-sm pointer-events-none"
            style={{ inset: "3px", border: "0.5px solid rgba(212,185,106,0.18)" }}
            aria-hidden="true"
          />
          {/* Arabesque corner flourishes */}
          <FramedCorners size={50} inset={4} />

          <div className="relative z-10 px-6 py-5 flex flex-col items-center text-center gap-4">
            {/* Basmala */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-quran"
              style={{ color: "#B8943F", fontSize: "1.05rem", lineHeight: "2" }}
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
              className="font-quran"
              style={{ color: "#6B5A47", fontSize: "1.05rem", lineHeight: "2" }}
            >
              وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </motion.p>

            {/* Ornament */}
            <IslamicGeometryLine className="w-full opacity-60" />

            {/* Names */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center gap-1"
            >
              <p
                className="font-names gold-shimmer"
                style={{ fontSize: "2.4rem", lineHeight: "1.2", marginBottom: "12px" }}
              >
                {invitationData.names.ar}
              </p>
              <DotRule />
            </motion.div>

            {/* Invitation text */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="font-khatt"
              style={{ color: "#6B5A47", fontSize: "1.05rem", lineHeight: "2" }}
            >
              {invitationData.invitation}
            </motion.p>

            {/* Divider before names */}
            <FloralDivider className="w-full" />

            {/* Event info row — date · place · time */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col items-center gap-2 w-full"
            >
              <FlankedHeading sprigWidth={30}>
                <p style={{ color: "#8C7B6A", fontFamily: '"DigitalKhattV1", serif' }}>
                  حفل الزفاف
                </p>
              </FlankedHeading>

              <div className="grid w-full grid-cols-3 items-start pt-1">
                <InfoColumn
                  icon={<CalendarIcon />}
                  primary={invitationData.eventInfo.date.primary}
                  secondary={invitationData.eventInfo.date.secondary}
                />
                <div
                  className="h-full"
                  style={{
                    borderInlineStart: "1px solid rgba(212,185,106,0.45)",
                    borderInlineEnd: "1px solid rgba(212,185,106,0.45)",
                  }}
                >
                  <InfoColumn
                    icon={<PinIcon />}
                    primary={invitationData.eventInfo.place.primary}
                    secondary={invitationData.eventInfo.place.secondary}
                  />
                </div>
                <InfoColumn
                  icon={<ClockIcon />}
                  primary={invitationData.eventInfo.time.primary}
                  secondary={invitationData.eventInfo.time.secondary}
                />
              </div>
            </motion.div>

            {/* Divider */}
            <FloralDivider className="w-full" />

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-row items-stretch justify-center gap-2 w-full max-w-[290px] mx-auto"
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
      id="invitation-card"
      className="relative flex flex-col items-center justify-center pt-12 pb-8 sm:min-h-screen sm:py-20 px-4 overflow-hidden"
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
        className="relative z-10 mt-8"
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
