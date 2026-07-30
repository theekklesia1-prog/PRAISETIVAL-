"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { Play, X } from "lucide-react";
import HeroEvents from "@/components/sections/hero/HeroEvents";

const ease = [0.22, 1, 0.36, 1] as const;

function StoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lenis = useLenis();
  useEffect(() => {
    if (open) {
      lenis?.stop();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        lenis?.start();
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="fixed right-5 top-5 z-110 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] w-full items-center justify-center"
          >
            <video
              src="/images/praisetival.mp4"
              controls
              autoPlay
              playsInline
              className="max-h-[88vh] w-auto max-w-full rounded-2xl bg-black shadow-float"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Hero() {
  const [storyOpen, setStoryOpen] = useState(false);
  return (
    <section
      id="home"
      className="relative -mt-19 overflow-hidden bg-ink text-white"
    >
      {/* background video */}
      <video
        src="/images/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      {/* dark scrim so the headline + cards stay legible */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink/40 via-transparent to-ink/85"
      />

      <div className="relative mx-auto flex min-h-svh max-w-360 flex-col px-5 pb-12 pt-23 sm:px-8 lg:min-h-screen lg:px-20 lg:pb-16 lg:pt-25">
        {/* centered headline */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease }}
          className="mt-auto flex items-center justify-start text-left lg:mt-0 lg:flex-1 lg:justify-center lg:text-center"
        >
          <h1 className="max-w-190 text-[clamp(2.6rem,6.2vw,4.5rem)] font-semibold leading-[1.06] tracking-tight">
            The <span className="font-serif font-normal italic">Sound</span>
            <br />
            of a Generation
            <br />
            that Believes
          </h1>
        </motion.div>

        {/* bottom band — on mobile: carousel first, then Press Play (subcopy
            hidden); on desktop: subcopy + Press Play on the left, cards right */}
        <div className="mt-5 grid grid-cols-1 items-end gap-8 lg:mt-0 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="order-2 min-w-0 max-w-130 lg:order-1"
          >
            <p className="hidden text-[15px] leading-relaxed text-white/70 lg:block">
              Every Sound is designed around your comfort, time and ambition so
              you can focus on what truly matters, while we take care of
              everything else.
            </p>
            <div className="mt-5 hidden h-0.75 w-14 rounded-full bg-white/70 lg:block" />
            <button
              onClick={() => setStoryOpen(true)}
              className="group inline-flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.12em] text-white/90 transition-colors hover:text-white lg:mt-6"
            >
              Press Play to Watch Our Story
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:border-white">
                <Play className="size-3.5 fill-current" />
              </span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="order-1 min-w-0 w-full lg:order-2 lg:max-w-120 lg:justify-self-end"
          >
            <HeroEvents />
          </motion.div>
        </div>

        <StoryModal open={storyOpen} onClose={() => setStoryOpen(false)} />
      </div>
    </section>
  );
}
