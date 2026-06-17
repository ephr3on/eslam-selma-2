"use client";

import { motion } from "framer-motion";

interface FloatingOrnamentProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function FloatingOrnament({ className = "", size = 40, style }: FloatingOrnamentProps) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={style}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, 0, -5, 0],
        opacity: [0.12, 0.2, 0.12],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 8-point Islamic star */}
        <path
          d="M20 3 L22 15 L30 10 L24 20 L36 20 L24 26 L30 30 L22 25 L20 37 L18 25 L10 30 L16 26 L4 20 L16 20 L10 10 L18 15 Z"
          stroke="#B8943F"
          strokeWidth="0.6"
          fill="none"
        />
        <circle cx="20" cy="20" r="5" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
      </svg>
    </motion.div>
  );
}

export function FloatingDot({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={`rounded-full pointer-events-none ${className}`}
      style={{ width: 4, height: 4, background: "#C9A84C", ...style }}
      animate={{ opacity: [0.08, 0.18, 0.08], scale: [1, 1.3, 1] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}
