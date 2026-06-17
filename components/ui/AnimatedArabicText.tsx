"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface AnimatedArabicTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  variant?: "ink" | "blur" | "rise";
  once?: boolean;
}

const inkVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 8 },
  visible: (delay: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function AnimatedArabicText({
  children,
  className = "",
  style,
  delay = 0,
  variant = "ink",
  once = true,
}: AnimatedArabicTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  const variants = variant === "rise" ? riseVariants : inkVariants;

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  staggerDelay?: number;
  baseDelay?: number;
  variant?: "ink" | "blur" | "rise";
}

export function StaggeredLines({
  lines,
  className = "",
  lineClassName = "",
  staggerDelay = 0.18,
  baseDelay = 0,
  variant = "ink",
}: StaggeredLinesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const variants = variant === "rise" ? riseVariants : inkVariants;

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={baseDelay + i * staggerDelay}
          className={lineClassName}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}
