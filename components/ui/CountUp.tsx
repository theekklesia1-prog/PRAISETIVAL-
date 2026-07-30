"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const; // long, soft settle
const SPINS = 2; // full rotations before landing

/** A single digit on a vertical reel that rolls down and lands on `digit`. */
function Reel({
  digit,
  delay,
  duration,
  inView,
}: {
  digit: number;
  delay: number;
  duration: number;
  inView: boolean;
}) {
  // strip goes digit, digit+1 … so both ends land on `digit` after full spins
  const strip = Array.from({ length: SPINS * 10 + 1 }, (_, i) => (digit + i) % 10);
  const start = `-${((strip.length - 1) / strip.length) * 100}%`;
  return (
    <span className="relative inline-block h-[1em] w-[1ch] overflow-hidden">
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={{ y: start }}
        animate={{ y: inView ? "0%" : start }}
        transition={{ duration, delay, ease }}
      >
        {strip.map((n, i) => (
          <span
            key={i}
            className="flex h-[1em] items-center justify-center leading-none"
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/**
 * Rolling odometer: each digit spins on its own reel and settles (staggered
 * left→right). Re-runs every time it scrolls back into view.
 */
export function CountUp({
  value,
  className = "",
  duration = 2.4,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });

  const m = value.match(/^([\d.,]+)(.*)$/);
  const numStr = m ? m[1] : value;
  const suffix = m ? m[2] : "";
  const chars = numStr.split("");
  // stagger index per digit = how many digits precede it in the string
  const digitOrder = chars.map(
    (_, i) => chars.slice(0, i).filter((c) => /\d/.test(c)).length,
  );

  return (
    <span ref={ref} className={`inline-flex items-end tabular-nums ${className}`}>
      {chars.map((c, i) => {
        if (!/\d/.test(c)) return <span key={i}>{c}</span>;
        return (
          <Reel
            key={i}
            digit={Number(c)}
            delay={digitOrder[i] * 0.12}
            duration={duration}
            inView={inView}
          />
        );
      })}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
