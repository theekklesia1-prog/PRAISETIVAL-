"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Parts = { d: number; h: number; m: number; s: number };

function diffParts(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor(diff / 3_600_000) % 24,
    m: Math.floor(diff / 60_000) % 60,
    s: Math.floor(diff / 1000) % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

const ease = [0.22, 1, 0.36, 1] as const;

/** A single value + label. The value slides up out of view and the next one
 * slides up into place every time it changes, so the countdown visibly ticks. */
function Unit({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span
        className="relative inline-block overflow-hidden tabular-nums"
        style={{ height: "2em" }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease }}
            className="inline-block"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <span>{label}</span>
    </span>
  );
}

/** Live countdown to `date`. Renders a placeholder on the server to avoid
 * hydration mismatch, then ticks every second on the client. */
export function Countdown({
  date,
  className = "",
  seconds = true,
}: {
  date: string;
  className?: string;
  seconds?: boolean;
}) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const target = new Date(date).getTime();
    const tick = () => setParts(diffParts(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [date]);

  if (!parts) {
    return (
      <span className={className} suppressHydrationWarning>
        {seconds ? "— DAYS : — HRS : — MIN : — SEC" : "— DAYS : — HRS : — MIN"}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-baseline gap-1 ${className}`}
      suppressHydrationWarning
    >
      <Unit value={String(parts.d)} label="DAYS" />
      <span>:</span>
      <Unit value={pad(parts.h)} label="HRS" />
      <span>:</span>
      <Unit value={pad(parts.m)} label="MIN" />
      {seconds && (
        <>
          <span>:</span>
          <Unit value={pad(parts.s)} label="SEC" />
        </>
      )}
    </span>
  );
}
