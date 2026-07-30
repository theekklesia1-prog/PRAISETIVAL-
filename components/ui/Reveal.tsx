"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const; // soft "expo-out" ease

type Direction = "up" | "down" | "left" | "right";

const offsetFor = (from: Direction, d = 40) =>
  ({
    up: { y: d },
    down: { y: -d },
    left: { x: -d },
    right: { x: d },
  })[from];

/**
 * Scroll-into-view reveal (fade + slide). Re-plays every time it scrolls back
 * into view (once: false) unless overridden.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
  duration = 0.7,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: Direction;
  duration?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsetFor(from) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers the reveal of its direct <RevealItem> children. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.1,
  delayChildren = 0,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
}) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  from = "up",
}: {
  children: ReactNode;
  className?: string;
  from?: Direction;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offsetFor(from) },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
