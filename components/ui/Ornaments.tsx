"use client";

import { useId } from "react";

/* Shared palette — same gold already used across the invitation */
const GOLD = "#B8943F";
const GOLD_LIGHT = "#D4B96A";
const GOLD_PALE = "#ECD99A";

/** A single teardrop leaf, drawn at the origin pointing +x. */
function Leaf({
  transform,
  fill = GOLD_LIGHT,
  opacity = 0.55,
}: {
  transform?: string;
  fill?: string;
  opacity?: number;
}) {
  return (
    <path
      d="M0 0 C3.2 -3.4 8.4 -3.6 11 0 C8.4 3.6 3.2 3.4 0 0 Z"
      fill={fill}
      opacity={opacity}
      transform={transform}
    />
  );
}

/** Four-petal blossom used as a small accent. */
function Blossom({
  transform,
  stroke = GOLD,
  opacity = 0.6,
}: {
  transform?: string;
  stroke?: string;
  opacity?: number;
}) {
  return (
    <g transform={transform} opacity={opacity}>
      <path
        d="M0 -4.6 C2.6 -2.6 2.6 2.6 0 4.6 C-2.6 2.6 -2.6 -2.6 0 -4.6 Z"
        stroke={stroke}
        strokeWidth="0.7"
        fill="none"
      />
      <path
        d="M-4.6 0 C-2.6 -2.6 2.6 -2.6 4.6 0 C2.6 2.6 -2.6 2.6 -4.6 0 Z"
        stroke={stroke}
        strokeWidth="0.7"
        fill="none"
      />
      <circle cx="0" cy="0" r="1" fill={stroke} opacity="0.75" />
    </g>
  );
}

/**
 * Arabesque corner flourish — a vine arc with leaves and a blossom.
 * Drawn for the top-left corner; mirror it with `flip` for the others.
 */
export function CornerFlourish({
  size = 58,
  flipX = false,
  flipY = false,
  className = "",
  opacity = 1,
}: {
  size?: number;
  flipX?: boolean;
  flipY?: boolean;
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      style={{
        transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
        opacity,
      }}
      aria-hidden="true"
    >
      {/* Outer vine */}
      <path
        d="M2 34 C2 16 16 2 34 2"
        stroke={GOLD}
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      {/* Inner echo */}
      <path
        d="M9 36 C9 22 22 9 36 9"
        stroke={GOLD_LIGHT}
        strokeWidth="0.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Curled tips */}
      <path
        d="M2 34 C2 39 5 42 9 41 C11.5 40.4 12 37.6 10 36.6 C8.4 35.8 7 37 7.6 38.2"
        stroke={GOLD}
        strokeWidth="0.85"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M34 2 C39 2 42 5 41 9 C40.4 11.5 37.6 12 36.6 10 C35.8 8.4 37 7 38.2 7.6"
        stroke={GOLD}
        strokeWidth="0.85"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Leaves along the arc */}
      <Leaf transform="translate(6.5 22) rotate(-62) scale(0.85)" opacity={0.45} />
      <Leaf transform="translate(13.5 13.5) rotate(-45) scale(0.8)" opacity={0.36} />
      <Leaf transform="translate(22 6.5) rotate(-28) scale(0.85)" opacity={0.45} />
      {/* Blossom at the elbow */}
      <Blossom transform="translate(19 19)" />
      {/* Seed dots */}
      <circle cx="30.5" cy="4.5" r="1.1" fill={GOLD} opacity="0.5" />
      <circle cx="4.5" cy="30.5" r="1.1" fill={GOLD} opacity="0.5" />
    </svg>
  );
}

/** All four corner flourishes, positioned inside a relative parent. */
export function FramedCorners({ size = 52, inset = 2 }: { size?: number; inset?: number }) {
  const pos = `${inset}px`;
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div className="absolute" style={{ top: pos, left: pos }}>
        <CornerFlourish size={size} />
      </div>
      <div className="absolute" style={{ top: pos, right: pos }}>
        <CornerFlourish size={size} flipX />
      </div>
      <div className="absolute" style={{ bottom: pos, left: pos }}>
        <CornerFlourish size={size} flipY />
      </div>
      <div className="absolute" style={{ bottom: pos, right: pos }}>
        <CornerFlourish size={size} flipX flipY />
      </div>
    </div>
  );
}

/**
 * Section divider: hairlines fading in from both sides toward a central
 * lozenge flanked by leaves.
 */
export function FloralDivider({
  className = "",
  width = 260,
}: {
  className?: string;
  width?: number;
}) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg
      className={className}
      width="100%"
      height="18"
      viewBox={`0 0 ${width} 18`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`fade-l-${gid}`} x1="0" x2="1">
          <stop offset="0" stopColor={GOLD_LIGHT} stopOpacity="0" />
          <stop offset="1" stopColor={GOLD_LIGHT} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`fade-r-${gid}`} x1="0" x2="1">
          <stop offset="0" stopColor={GOLD_LIGHT} stopOpacity="0.85" />
          <stop offset="1" stopColor={GOLD_LIGHT} stopOpacity="0" />
        </linearGradient>
      </defs>

      <line
        x1="6"
        y1="9"
        x2={width / 2 - 30}
        y2="9"
        stroke={`url(#fade-l-${gid})`}
        strokeWidth="0.7"
      />
      <line
        x1={width / 2 + 30}
        y1="9"
        x2={width - 6}
        y2="9"
        stroke={`url(#fade-r-${gid})`}
        strokeWidth="0.7"
      />

      <g transform={`translate(${width / 2} 9)`}>
        {/* Central lozenge */}
        <path
          d="M0 -6.5 L5 0 L0 6.5 L-5 0 Z"
          stroke={GOLD}
          strokeWidth="0.8"
          fill="none"
          opacity="0.85"
        />
        <circle cx="0" cy="0" r="1.2" fill={GOLD} opacity="0.7" />
        {/* Flanking leaves */}
        <Leaf transform="translate(8 0)" opacity={0.5} />
        <Leaf transform="translate(-8 0) rotate(180)" opacity={0.5} />
        {/* Outer dots */}
        <circle cx="23" cy="0" r="1.3" fill={GOLD_PALE} opacity="0.9" />
        <circle cx="-23" cy="0" r="1.3" fill={GOLD_PALE} opacity="0.9" />
      </g>
    </svg>
  );
}

/**
 * Small leafy sprig used to flank a heading. Points right by default.
 */
export function Sprig({
  width = 34,
  flip = false,
  className = "",
}: {
  width?: number;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height="14"
      viewBox="0 0 34 14"
      fill="none"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path
        d="M1 7 C9 7 16 5 24 7"
        stroke={GOLD}
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <Leaf transform="translate(9 6.4) rotate(-24) scale(0.72)" opacity={0.5} />
      <Leaf transform="translate(15 7.6) rotate(22) scale(0.72)" opacity={0.42} />
      <circle cx="27" cy="7" r="1.5" fill={GOLD} opacity="0.55" />
      <circle cx="31.5" cy="7" r="1" fill={GOLD_LIGHT} opacity="0.5" />
    </svg>
  );
}

/** Wraps a heading between two mirrored sprigs. */
export function FlankedHeading({
  children,
  gap = 10,
  sprigWidth = 34,
}: {
  children: React.ReactNode;
  gap?: number;
  sprigWidth?: number;
}) {
  return (
    <div className="flex items-center justify-center" style={{ gap }}>
      <Sprig width={sprigWidth} />
      {children}
      <Sprig width={sprigWidth} flip />
    </div>
  );
}

/** Tiny three-dot rule for tight spaces. */
export function DotRule({ className = "" }: { className?: string }) {
  return (
    <svg width="54" height="8" viewBox="0 0 54 8" fill="none" className={className} aria-hidden="true">
      <line x1="0" y1="4" x2="18" y2="4" stroke={GOLD_LIGHT} strokeWidth="0.6" opacity="0.45" />
      <circle cx="22" cy="4" r="1.1" fill={GOLD} opacity="0.55" />
      <path d="M27 1.4 L29.4 4 L27 6.6 L24.6 4 Z" stroke={GOLD} strokeWidth="0.7" fill="none" opacity="0.75" />
      <circle cx="32" cy="4" r="1.1" fill={GOLD} opacity="0.55" />
      <line x1="36" y1="4" x2="54" y2="4" stroke={GOLD_LIGHT} strokeWidth="0.6" opacity="0.45" />
    </svg>
  );
}
