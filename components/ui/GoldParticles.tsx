"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface GoldParticlesProps {
  count?: number;
  className?: string;
  active?: boolean;
}

export function GoldParticles({ count = 18, className = "", active = true }: GoldParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 3,
      opacity: Math.random() * 0.6 + 0.3,
    }));
    setParticles(generated);
  }, [count]);

  if (!active) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: "10%",
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, #ECD99A, #B8943F)`,
          }}
          animate={{
            y: [-0, -100 - Math.random() * 80],
            opacity: [0, p.opacity, 0],
            scale: [1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
