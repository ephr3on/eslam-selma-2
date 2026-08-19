"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
    className: "inline-flex flex-1 basis-0 min-w-0 h-11 flex-row items-center justify-center gap-0.5 font-handicrafts whitespace-nowrap px-1 rounded-sm transition-all duration-300 select-none",
    style: { ...buttonStyle[variant], fontSize: "0.72rem", lineHeight: 1.2 },
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

const EASE_SOFT = [0.16, 1, 0.3, 1] as const;

/* ── One continuous light sweep across the whole names line ──────────────────
 * Every part of the line (right name · connector · left name) paints the *same*
 * gradient image, sized to the full line width and offset by that part's own
 * position. The result is one uninterrupted wave of light rather than three
 * shimmers that happen to run at once.
 * Tiles seamlessly: the first and last stops are the same gold.
 */
/** The line's resting gold, and the gentle lift the wave carries. */
const GOLD_BASE = "#B8943F";
const GOLD_CORE = "#DCC488";

const NAME_GRADIENT =
  `linear-gradient(100deg, ${GOLD_BASE} 0%, ${GOLD_BASE} 32%, #C4A659 43%, ${GOLD_CORE} 52.5%, #C4A659 62%, ${GOLD_BASE} 74%, ${GOLD_BASE} 100%)`;
/** Gradient image is 2× the line width, so only one bright core is ever visible. */
const SWEEP_IMAGE_SCALE = 2;
/** Where the bright core sits inside that image. */
const SWEEP_CORE_FRACTION = 0.525;
/** Full cycle: the sweep travels, then the line rests. */
const SWEEP_CYCLE_S = 7.5;
/** Share of the cycle spent travelling; the remainder is the rest. */
const SWEEP_TRAVEL_FRACTION = 0.46;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type LineGeometry = {
  width: number;
  fontSize: number;
  rightOffset: number;
  connectorOffset: number;
  leftOffset: number;
};

const EMPTY_GEOMETRY: LineGeometry = {
  width: 0,
  fontSize: 44,
  rightOffset: 0,
  connectorOffset: 0,
  leftOffset: 0,
};

/**
 * Connector between the two names — the plain, elegant "و".
 *
 * It paints the same gradient image as the names, offset by its own position
 * in the line, so the light sweep passes straight through it without a seam.
 */
function CoupleConnector({
  separator,
  outerRef,
  sweepStyle,
  backgroundPositionX,
}: {
  separator: string;
  outerRef: React.RefObject<HTMLSpanElement | null>;
  sweepStyle: React.CSSProperties;
  backgroundPositionX?: MotionValue<string>;
}) {
  return (
    <motion.span
      ref={outerRef}
      className="relative inline-block align-baseline"
      style={{ ...sweepStyle, backgroundPositionX, paddingInline: "0.06em" }}
    >
      {separator}
    </motion.span>
  );
}

/**
 * The couple's names as a single luminous composition.
 *
 * The whole row shares one gradient image: each part paints it at the same
 * scale (2× the line width) but offset by its own position, so a single bright
 * core travels right → left through "إسلام" → connector → "سلمى" without a seam.
 */
function CoupleNames({ reduced }: { reduced: boolean }) {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const connectorRef = useRef<HTMLSpanElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const [geo, setGeo] = useState<LineGeometry>(EMPTY_GEOMETRY);

  // The same geometry as live motion values. Every transform below reads these
  // rather than closing over state, so a re-measure can never leave a stale
  // closure behind driving the gradient off-position.
  const mWidth = useMotionValue(0);
  const mRight = useMotionValue(0);
  const mConnector = useMotionValue(0);
  const mLeft = useMotionValue(0);

  // Measure once laid out, and again whenever the line resizes (font swap,
  // rotation, viewport change). Offsets are relative to the line's left edge.
  useIsoLayoutEffect(() => {
    const measure = () => {
      const line = lineRef.current;
      const right = rightRef.current;
      const connector = connectorRef.current;
      const left = leftRef.current;
      if (!line || !right || !connector || !left) return;

      const lineBox = line.getBoundingClientRect();
      if (lineBox.width === 0) return;
      const rightBox = right.getBoundingClientRect();
      const connectorBox = connector.getBoundingClientRect();
      const leftBox = left.getBoundingClientRect();

      const next: LineGeometry = {
        width: lineBox.width,
        fontSize: parseFloat(getComputedStyle(line).fontSize) || 44,
        rightOffset: rightBox.left - lineBox.left,
        connectorOffset: connectorBox.left - lineBox.left,
        leftOffset: leftBox.left - lineBox.left,
      };

      mWidth.set(next.width);
      mRight.set(next.rightOffset);
      mConnector.set(next.connectorOffset);
      mLeft.set(next.leftOffset);
      setGeo((prev) => (prev.width === next.width && prev.rightOffset === next.rightOffset ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (lineRef.current) observer.observe(lineRef.current);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
  }, [mWidth, mRight, mConnector, mLeft]);

  // One clock for the entire effect. Everything below reads from it, so the
  // two names and the connector can never drift out of phase.
  const sweep = useMotionValue(0);
  const ready = geo.width > 0 && !reduced;

  useEffect(() => {
    if (!ready) return;
    const controls = animate(sweep, 1, {
      duration: SWEEP_CYCLE_S,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [ready, sweep]);

  // Position of the bright core in line coordinates: starts off the right edge,
  // travels past the left edge, then waits there for the rest of the cycle.
  const coreX = useTransform([sweep, mWidth], ([t, width]: number[]) => {
    const progress = Math.min(t / SWEEP_TRAVEL_FRACTION, 1);
    return width * 1.3 - progress * width * 1.6;
  });

  const imageWidth = geo.width * SWEEP_IMAGE_SCALE;

  // background-position-x per part: the same core position, minus that part's
  // own offset in the line. The three gradients therefore line up as one
  // continuous image.
  const corePos = (core: number, offset: number, width: number) =>
    `${core - offset - width * SWEEP_IMAGE_SCALE * SWEEP_CORE_FRACTION}px`;

  const bgRight = useTransform([coreX, mRight, mWidth], ([core, offset, width]: number[]) =>
    corePos(core, offset, width),
  );
  const bgConnector = useTransform([coreX, mConnector, mWidth], ([core, offset, width]: number[]) =>
    corePos(core, offset, width),
  );
  const bgLeft = useTransform([coreX, mLeft, mWidth], ([core, offset, width]: number[]) =>
    corePos(core, offset, width),
  );

  const sweepStyle: React.CSSProperties = ready
    ? {
        backgroundImage: NAME_GRADIENT,
        backgroundSize: `${imageWidth}px 100%`,
        // Seamless tile — one core in view at a time, never a bare patch.
        backgroundRepeat: "repeat-x",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }
    : { color: "#B8943F" };

  const nameStyle = { ...sweepStyle, textShadow: "0 2px 20px rgba(184,148,63,0.13)" };

  return (
    <p ref={lineRef} className="font-names relative" style={{ fontSize: "2.75rem", lineHeight: "1.25" }}>
      <motion.span
        ref={rightRef}
        className="inline-block"
        style={{ ...nameStyle, backgroundPositionX: ready ? bgRight : undefined }}
      >
        {invitationData.cardText.coupleParts.right}
      </motion.span>{" "}
      <CoupleConnector
        separator={invitationData.cardText.coupleParts.separator}
        outerRef={connectorRef}
        sweepStyle={sweepStyle}
        backgroundPositionX={ready ? bgConnector : undefined}
      />{" "}
      <motion.span
        ref={leftRef}
        className="inline-block"
        style={{ ...nameStyle, backgroundPositionX: ready ? bgLeft : undefined }}
      >
        {invitationData.cardText.coupleParts.left}
      </motion.span>
    </p>
  );
}

const INVITATION_IMAGE = "/invitation.png";
const INVITATION_FILENAME = "eslam-selma-invitation.png";

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

  const reduced = useReducedMotion() ?? false;

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

  // Pre-fetch the image so the share sheet can be opened synchronously on click.
  // iOS drops the user-activation token if we await a network request first.
  const invitationFile = useRef<File | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(INVITATION_IMAGE)
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error("fetch failed"))))
      .then((blob) => {
        if (!cancelled) {
          invitationFile.current = new File([blob], INVITATION_FILENAME, {
            type: blob.type || "image/jpeg",
          });
        }
      })
      .catch(() => {
        /* fall back to a plain download */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function saveViaAnchor() {
    const a = document.createElement("a");
    a.href = INVITATION_IMAGE;
    a.download = INVITATION_FILENAME;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function handleDownloadClick() {
    const file = invitationFile.current;

    // iOS Safari + Android Chrome: the native share sheet offers
    // "Save Image" / "Save to Photos", which writes straight to the gallery.
    if (file && typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file] });
        return;
      } catch (err) {
        // User dismissed the sheet — don't then force a file download on them.
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }

    saveViaAnchor();
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

            {/* Divider */}
            <FloralDivider className="w-full" />

            {/* ── Main text block ── */}
            <div className="flex w-full flex-col items-center text-center">
              {/* 1 · Intro line */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.75, duration: 0.8 }}
                className="font-khatt"
                style={{
                  color: "#6B5A47",
                  fontSize: "0.98rem",
                  lineHeight: "1.9",
                }}
              >
                {invitationData.cardText.intro}
              </motion.p>

              {/* 2 · Hosts — balanced right / و / left composition */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.85, duration: 0.8 }}
                dir="rtl"
                className="grid w-full items-center"
                style={{
                  gridTemplateColumns: "1fr auto 1fr",
                  columnGap: "0.5rem",
                  marginTop: "0.75rem",
                }}
              >
                <p
                  className="font-nastaleeq"
                  style={{
                    color: "#3D2E1E",
                    fontSize: "clamp(1.1rem, 4.8vw, 1.35rem)",
                    lineHeight: "1.9",
                    whiteSpace: "nowrap",
                  }}
                >
                  {invitationData.cardText.hosts.right}
                </p>
                <span
                  className="font-nastaleeq"
                  style={{
                    color: "#B8943F",
                    fontSize: "clamp(1.1rem, 4.8vw, 1.35rem)",
                    lineHeight: "1.9",
                    opacity: 0.85,
                  }}
                  aria-hidden="true"
                >
                  {invitationData.cardText.hosts.separator}
                </span>
                <p
                  className="font-nastaleeq"
                  style={{
                    color: "#3D2E1E",
                    fontSize: "clamp(1.1rem, 4.8vw, 1.35rem)",
                    lineHeight: "1.9",
                    whiteSpace: "nowrap",
                  }}
                >
                  {invitationData.cardText.hosts.left}
                </p>
              </motion.div>

              {/* 3 · Invitation line */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.95, duration: 0.8 }}
                className="font-khatt"
                style={{
                  color: "#6B5A47",
                  fontSize: "0.98rem",
                  lineHeight: "1.9",
                  marginTop: "0.9rem",
                }}
              >
                {invitationData.cardText.invitationLine}
              </motion.p>

              {/* 4 · Couple names — focal point */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.05, duration: 0.8, type: "spring", stiffness: 200 }}
                className="relative flex flex-col items-center"
                style={{ marginTop: "1.3rem", marginBottom: "0.15rem" }}
              >
                {/* Light bloom behind the union — fades in with the names and
                    stays, so the line always sits on a little warmth. */}
                {!reduced && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute pointer-events-none"
                    style={{
                      // Centred without `transform` — framer owns that property.
                      width: "115%",
                      height: "220%",
                      left: "-7.5%",
                      top: "-60%",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(ellipse at center, rgba(236,217,154,0.17) 0%, rgba(212,185,106,0.07) 38%, rgba(184,148,63,0) 70%)",
                    }}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={inView ? { opacity: 0.75, scale: 1 } : { opacity: 0, scale: 0.96 }}
                    transition={{ duration: 1.8, delay: 1.5, ease: EASE_SOFT }}
                  />
                )}

                <CoupleNames reduced={reduced} />
              </motion.div>

              {/* 5 · Closing line */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.15, duration: 0.8 }}
                className="font-khatt mx-auto"
                style={{
                  color: "#6B5A47",
                  fontSize: "0.98rem",
                  lineHeight: "2",
                  marginTop: "1.1rem",
                  maxWidth: "30ch",
                }}
              >
                {invitationData.cardText.closing}
              </motion.p>
            </div>

            {/* Divider before names */}
            <FloralDivider className="w-full" />

            {/* Event info row — date · place · time */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col items-center gap-2 w-full"
              style={{ marginTop: "-0.6rem" }}
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

            {/* Ornament */}
            <IslamicGeometryLine className="w-full opacity-60 -mt-2.5 -mb-2.5" />

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-row items-stretch justify-center gap-1.5 w-full max-w-[300px] mx-auto"
            >
              <CardButton
                onClick={handleCalendarClick}
                ariaLabel="أضف حفل الزفاف إلى التقويم"
                variant="secondary"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <line x1="1" y1="5" x2="13" y2="5" stroke="currentColor" strokeWidth="1" />
                  <line x1="4" y1="1" x2="4" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="10" y1="1" x2="10" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="7" cy="9" r="1" fill="currentColor" opacity="0.6" />
                </svg>
                احفظ التاريخ
              </CardButton>

              <CardButton
                href={invitationData.mapUrl}
                ariaLabel="افتح الخريطة في تطبيق الخرائط"
                variant="primary"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1C4.79 1 3 2.79 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <circle cx="7" cy="5" r="1.5" fill="currentColor" opacity="0.8" />
                </svg>
                موقع القاعة
              </CardButton>

              <CardButton
                onClick={handleDownloadClick}
                ariaLabel="حمّل صورة الدعوة"
                variant="secondary"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1.5v7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M4.2 5.9 7 8.7l2.8-2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M2 10.2v1.3A1.2 1.2 0 0 0 3.2 12.7h7.6A1.2 1.2 0 0 0 12 11.5v-1.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                </svg>
                حمّل الدعوة
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

    </section>
  );
}
