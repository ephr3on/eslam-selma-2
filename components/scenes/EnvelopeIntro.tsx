"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { GoldParticles } from "@/components/ui/GoldParticles";
import { invitationData } from "@/data/invitation";

// ─── Bird Animation System ──────────────────────────────────────────────────

const BIRD_COLORS = ['#D4B96A', '#ECD99A', '#F2E8C8', '#C9A84C', '#F8F2E0'] as const;

// Elegant M-shaped wing silhouette: two bezier curves meeting at the body center
const WING_PATH = 'M-13,-2 C-9,-8 -4,-10 0,-7 C4,-10 9,-8 13,-2';

// 9 far-burst birds (Phase 1 only – fly away dramatically)
// 5 near-burst birds (Phase 1 burst, then transition to Phase 2 looping orbit)
const BIRD_DATA = [
  // Far burst – Phase 1 only
  { burst: 'bird-burst-far-left',    orbit: null,                  delay: 0.05, burstDur: 5.2, orbitDur: 0,   size: 1.00, colorIdx: 0 as const, glow: true  },
  { burst: 'bird-burst-far-right',   orbit: null,                  delay: 0.08, burstDur: 5.0, orbitDur: 0,   size: 1.00, colorIdx: 0 as const, glow: true  },
  { burst: 'bird-burst-swoop-left',  orbit: null,                  delay: 0.18, burstDur: 4.8, orbitDur: 0,   size: 0.82, colorIdx: 1 as const, glow: false },
  { burst: 'bird-burst-swoop-right', orbit: null,                  delay: 0.25, burstDur: 4.6, orbitDur: 0,   size: 0.78, colorIdx: 2 as const, glow: false },
  { burst: 'bird-burst-far-left',    orbit: null,                  delay: 0.55, burstDur: 4.8, orbitDur: 0,   size: 0.70, colorIdx: 4 as const, glow: false },
  { burst: 'bird-burst-far-right',   orbit: null,                  delay: 0.62, burstDur: 4.5, orbitDur: 0,   size: 0.68, colorIdx: 1 as const, glow: false },
  { burst: 'bird-burst-swoop-left',  orbit: null,                  delay: 0.80, burstDur: 4.3, orbitDur: 0,   size: 0.66, colorIdx: 3 as const, glow: false },
  { burst: 'bird-burst-swoop-right', orbit: null,                  delay: 0.88, burstDur: 4.2, orbitDur: 0,   size: 0.72, colorIdx: 2 as const, glow: false },
  { burst: 'bird-burst-far-left',    orbit: null,                  delay: 0.95, burstDur: 4.5, orbitDur: 0,   size: 0.65, colorIdx: 4 as const, glow: false },
  // Near burst → orbit (Phase 1 + Phase 2)
  { burst: 'bird-burst-near-left',   orbit: 'bird-orbit-ccw-wide', delay: 0.10, burstDur: 1.8, orbitDur: 7.0, size: 0.88, colorIdx: 0 as const, glow: true  },
  { burst: 'bird-burst-near-right',  orbit: 'bird-orbit-cw-wide',  delay: 0.20, burstDur: 1.8, orbitDur: 8.0, size: 0.92, colorIdx: 3 as const, glow: false },
  { burst: 'bird-burst-near-up',     orbit: 'bird-orbit-drift-up', delay: 0.30, burstDur: 2.0, orbitDur: 9.0, size: 0.80, colorIdx: 1 as const, glow: false },
  { burst: 'bird-burst-near-ul',     orbit: 'bird-orbit-tall',     delay: 0.38, burstDur: 1.6, orbitDur: 7.5, size: 0.75, colorIdx: 0 as const, glow: true  },
  { burst: 'bird-burst-near-ur',     orbit: 'bird-orbit-figure8',  delay: 0.45, burstDur: 1.7, orbitDur: 8.5, size: 0.78, colorIdx: 2 as const, glow: false },
];

// Module-level handle so the component can trigger fade-out via isTransitioning
let _birdsContainer: HTMLDivElement | null = null;

function fadeBirdsOut(): void {
  if (!_birdsContainer) return;
  const el = _birdsContainer;
  _birdsContainer = null;
  el.style.transition = 'opacity 2s ease';
  el.style.opacity = '0';
  setTimeout(() => el.remove(), 2100);
}

function makeBirdSvg(
  svgNS: string,
  color: string,
  glow: boolean,
): SVGSVGElement {
  const svg = document.createElementNS(svgNS, 'svg') as SVGSVGElement;
  svg.setAttribute('width', '36');
  svg.setAttribute('height', '18');
  svg.setAttribute('viewBox', '-16 -13 32 16');
  svg.style.cssText = 'display:block;overflow:visible;';

  if (glow) {
    const halo = document.createElementNS(svgNS, 'path');
    halo.setAttribute('d', WING_PATH);
    halo.setAttribute('stroke', color);
    halo.setAttribute('stroke-width', '5');
    halo.setAttribute('fill', 'none');
    halo.setAttribute('stroke-linecap', 'round');
    halo.setAttribute('opacity', '0.16');
    svg.appendChild(halo);
  }

  const wing = document.createElementNS(svgNS, 'path');
  wing.setAttribute('d', WING_PATH);
  wing.setAttribute('stroke', color);
  wing.setAttribute('stroke-width', '1.35');
  wing.setAttribute('fill', 'none');
  wing.setAttribute('stroke-linecap', 'round');
  wing.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(wing);

  return svg;
}

function releaseBirds(originRect: DOMRect): void {
  document.getElementById('bird-flock')?.remove();

  const container = document.createElement('div');
  container.id = 'bird-flock';
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;';
  document.body.appendChild(container);
  _birdsContainer = container;

  // Emerge from the flap opening — top-center of the envelope
  const ox = originRect.left + originRect.width * 0.5;
  const oy = originRect.top + originRect.height * 0.5;

  const svgNS = 'http://www.w3.org/2000/svg';

  BIRD_DATA.forEach((bird) => {
    const scale = bird.size;
    const w = Math.round(36 * scale);
    const h = Math.round(18 * scale);
    const color = BIRD_COLORS[bird.colorIdx];

    const svg = makeBirdSvg(svgNS, color, bird.glow);
    svg.setAttribute('width', String(w));
    svg.setAttribute('height', String(h));

    const wrapper = document.createElement('div');
    // Pixel-offset centering avoids transform collision with keyframe animations
    wrapper.style.cssText = [
      'position:absolute',
      `left:${ox - w / 2}px`,
      `top:${oy - h / 2}px`,
      `animation:${bird.burst} ${bird.burstDur}s cubic-bezier(0.25,0.46,0.45,0.94) ${bird.delay}s forwards`,
      'will-change:transform,opacity',
    ].join(';');

    if (bird.glow) {
      wrapper.style.filter = `drop-shadow(0 0 4px ${color}) drop-shadow(0 0 8px rgba(212,185,106,0.35))`;
    }

    // For orbit birds: when burst ends, read actual position and switch to looping orbit
    if (bird.orbit) {
      const orbitAnim = bird.orbit;
      const orbitDur = bird.orbitDur;
      // Wing-flutter speed varies per bird so they feel independent
      const flutterDur = (0.72 + bird.delay * 0.18).toFixed(2);

      const onBurstEnd = () => {
        wrapper.removeEventListener('animationend', onBurstEnd);
        if (!container.isConnected) return;

        // Capture current visual position (includes the translate from burst keyframe)
        const rect = wrapper.getBoundingClientRect();
        const opacity = parseFloat(window.getComputedStyle(wrapper).opacity);

        // Reposition at actual screen location, strip the burst animation
        wrapper.style.animation = 'none';
        wrapper.style.left = `${rect.left}px`;
        wrapper.style.top = `${rect.top}px`;
        wrapper.style.opacity = String(Math.min(opacity + 0.05, 0.88));

        // Force reflow so the new left/top land before we start the orbit
        void wrapper.offsetHeight;

        // Begin looping orbit and wing flutter
        wrapper.style.animation = `${orbitAnim} ${orbitDur}s ease-in-out infinite`;
        svg.style.animation = `bird-wing-flutter ${flutterDur}s ease-in-out infinite`;
        svg.style.transformOrigin = '50% 50%';
      };

      wrapper.addEventListener('animationend', onBurstEnd);
    }

    wrapper.appendChild(svg);
    container.appendChild(wrapper);
  });
}

// ─── End Bird System ─────────────────────────────────────────────────────────

interface EnvelopeIntroProps {
  onStampClick: () => void;
  isTransitioning: boolean;
}

// Envelope back: just the parchment rect + decorative pattern
function EnvelopeBack() {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="316" height="216" rx="4" fill="#F2E8D0" stroke="#D4B96A" strokeWidth="1" />
      <g opacity="0.2" stroke="#B8943F" strokeWidth="0.5">
        <rect x="20" y="20" width="280" height="180" rx="2" fill="none" />
        <rect x="30" y="30" width="260" height="160" rx="1" fill="none" strokeDasharray="4 4" />
        <path d="M160 60 L166 74 L181 74 L169 83 L174 97 L160 88 L146 97 L151 83 L139 74 L154 74 Z" fill="none" />
      </g>
    </svg>
  );
}

// Envelope flap only — sits at z:3, BELOW the photo, so the photo rises above it.
function EnvelopeFlap({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
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
      <line x1="2" y1="2" x2="318" y2="2" stroke="#D4B96A" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

// Envelope fold triangles only (left, right, bottom) — sit at z:10, ABOVE the photo,
// masking it while it is still inside the envelope body.
function EnvelopeFolds() {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <path d="M2 2 L2 218 L160 130 Z" fill="#E6D5AF" stroke="#D4B96A" strokeWidth="0.5" />
      <path d="M318 2 L318 218 L160 130 Z" fill="#E8D8B5" stroke="#D4B96A" strokeWidth="0.5" />
      <path d="M2 218 L160 130 L318 218 Z" fill="#EBE0C4" stroke="#D4B96A" strokeWidth="0.5" />
    </svg>
  );
}

export function EnvelopeIntro({ onStampClick, isTransitioning }: EnvelopeIntroProps) {
  const [hinted, setHinted] = useState(false);
  const [localOpen, setLocalOpen] = useState(false);
  const [stampClicked, setStampClicked] = useState(false);
  const [photoVisible, setPhotoVisible] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  // Mobile (< 640 px): rise less so the photo stays near the envelope middle
  const [photoY, setPhotoY] = useState(-96);

  useEffect(() => {
    const update = () => setPhotoY(window.innerWidth < 640 ? -60 : -96);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHinted(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // When the scene transitions out, fade the photo and gracefully retire the birds
  useEffect(() => {
    if (isTransitioning) {
      setPhotoVisible(false);
      fadeBirdsOut();
    }
  }, [isTransitioning]);

  function handleStampTap() {
    if (stampClicked) return;
    setStampClicked(true);
    setLocalOpen(true);
    onStampClick();
    setPhotoVisible(true);
    // Release birds as the flap begins to open
    setTimeout(() => {
      if (envelopeRef.current) {
        releaseBirds(envelopeRef.current.getBoundingClientRect());
      }
    }, 320);
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

      {/* Envelope + stamp */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">
          {/* ── Four-layer envelope sandwich ───────────────────────────────
              z:1  back (rect + pattern)
              z:3  flap — BELOW the photo so the photo rises above the flap
              z:5  photo — rises from inside, above flap, below fold masks
              z:10 fold triangles (left/right/bottom) — mask the photo
                   while it is inside the envelope body                    */}
          <motion.div
            ref={envelopeRef}
            className="relative w-72 h-48 sm:w-80 sm:h-52 md:w-96 md:h-64"
            style={{ filter: "drop-shadow(0 8px 24px rgba(28,18,9,0.12))", willChange: "filter" }}
          >
            {/* Layer 1 – parchment back */}
            <div className="absolute inset-0" style={{ zIndex: 1 }}>
              <EnvelopeBack />
            </div>

            {/* Layer 2 – animated flap (below the photo) */}
            <div className="absolute inset-0" style={{ zIndex: 3 }}>
              <EnvelopeFlap isOpen={localOpen} />
            </div>

            {/* Layer 3 – wedding photo
                bottom: 0 anchors at envelope bottom; y animates to -260
                so it exits above. clipPath inset(100%→0%) reveals
                bottom-first, matching the direction of emergence. */}
            <AnimatePresence>
              {photoVisible && (
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    bottom: 0,
                    left: "8%",
                    right: "8%",
                    zIndex: 5,
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow:
                      "0 16px 48px rgba(0,0,0,0.45), 0 0 0 2px rgba(212,185,106,0.6)",
                  }}
                  initial={{ y: 0, clipPath: "inset(100% 0 0 0)" }}
                  animate={{ y: photoY, clipPath: "inset(0% 0 0 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/wedding-photo.jpg"
                    alt=""
                    aria-hidden="true"
                    className="block w-full"
                    style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Layer 4 – fold triangles (mask the photo while inside) */}
            <div className="absolute inset-0" style={{ zIndex: 10 }}>
              <EnvelopeFolds />
            </div>

            {localOpen && <GoldParticles count={22} active={localOpen} />}
          </motion.div>

          {/* Ripple rings — pure CSS @keyframes (sonar-ring in globals.css).
              The browser's compositor loops them natively with no JS frame
              budget; there is no Framer-Motion repeat restart to flash.
              Centering wrapper fades to 0 when stamp is tapped. */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ zIndex: 19, opacity: stampClicked ? 0 : 1, transition: "opacity 0.3s ease" }}
            aria-hidden="true"
          >
            <span
              className="block rounded-full"
              style={{
                width: 80, height: 80,
                border: "1.5px solid rgba(212,185,106,0.9)",
                animation: "sonar-ring 2s ease-out infinite",
                animationFillMode: "backwards",
              }}
            />
          </div>
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ zIndex: 19, opacity: stampClicked ? 0 : 1, transition: "opacity 0.3s ease" }}
            aria-hidden="true"
          >
            <span
              className="block rounded-full"
              style={{
                width: 80, height: 80,
                border: "1.5px solid rgba(212,185,106,0.6)",
                animation: "sonar-ring 2s ease-out 1s infinite",
                animationFillMode: "backwards",
              }}
            />
          </div>

          {/* Outer wrapper owns the continuous pulse so hover/tap on the
              inner button never interrupts it. */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: 20 }}
            animate={stampClicked ? { scale: 0, opacity: 0 } : { scale: [1, 1.07, 1], opacity: 1 }}
            transition={stampClicked ? { duration: 0.35 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.button
              className="focus:outline-none cursor-pointer block"
              whileHover={{ scale: 1.1, transition: { duration: 0.2, ease: "easeOut" } }}
              whileTap={{ scale: 0.9, transition: { duration: 0.1, ease: "easeOut" } }}
              onClick={handleStampTap}
              aria-label="اضغط لفتح الدعوة"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/stamp.png"
                alt=""
                aria-hidden="true"
                className="block"
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />
            </motion.button>
          </motion.div>

        </div>

        {/* Hint arrow — absolute inside the outer motion.div (position:relative),
            below its content (top:100%). Absolute children don't contribute
            to the parent's size, so the section never re-centers and the
            envelope never jumps. Being outside <div.relative> also keeps it
            clear of the envelope's filter stacking context. */}
        <AnimatePresence>
          {!localOpen && hinted && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
              style={{ top: "calc(100% + 2rem)" }}
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
