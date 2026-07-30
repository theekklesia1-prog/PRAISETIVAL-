"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { partnerHero, prayerRequest } from "@/lib/partner";

// slow, deliberate "drawing a letter out of an envelope" easing
const letterEase = [0.76, 0, 0.24, 1] as const;

const radialGold = {
  background:
    "radial-gradient(130% 100% at 50% 32%, #ffd494 0%, #dcb169 50%, #b98e3f 100%)",
};

function PartnerBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center gap-6 px-6 text-center text-[#181818] lg:gap-8 ${className}`}
    >
      <span className="inline-flex h-8 items-center justify-center rounded-full border border-[#181818] px-4 text-[13px] uppercase tracking-tight lg:text-[14px]">
        {partnerHero.label}
      </span>
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] lg:text-[34px]">
          {partnerHero.title}
        </h2>
        <p className="max-w-149 text-[14px] leading-5.5 lg:text-[16px] lg:leading-6">
          {partnerHero.body}
        </p>
      </div>
      <a
        href="#give"
        className="group inline-flex h-11 items-center gap-1.5 rounded-full bg-[#181818] px-6 text-[16px] font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
      >
        {partnerHero.cta}
        <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

export default function PartnerHero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, {
    amount: 0.35,
    margin: "0px 0px -12% 0px",
  });
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-360 px-6 sm:px-8 lg:px-20">
        {/* envelope card */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-[10px] border border-[#e6e5e3] bg-white lg:rounded-card"
        >
          {/* GOLD LETTER — slides up out of the envelope (replays on scroll) */}
          <div className="relative overflow-hidden">
            <motion.div
              className="relative bg-linear-to-b from-[#a97f33] to-[#2e1e01]"
              initial={{ y: "100%" }}
              animate={{ y: inView ? "0%" : "100%" }}
              transition={{ duration: 1.7, ease: letterEase, delay: 0.25 }}
            >
              {/* radial-gold inner panel */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-2 bottom-0 top-1.25 rounded-md shadow-[6px_-3px_20px_2px_rgba(0,0,0,0.08)] lg:inset-x-3.75 lg:rounded-[10px]"
                style={radialGold}
              />
              {/* Koinonia content */}
              <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-[clamp(70px,13vw,150px)] pt-[clamp(30px,7vw,80px)] text-center text-[#181818]">
                <span className="inline-flex h-6.5 items-center justify-center rounded-full border border-[#181818] px-3 text-[10px] uppercase tracking-tight lg:h-8 lg:text-[12px]">
                  {prayerRequest.label}
                </span>
                <div className="flex flex-col items-center gap-3 lg:gap-8">
                  <div className="flex flex-col items-center gap-1">
                    <h2 className="text-[24px] font-semibold leading-[1.1] tracking-tight lg:text-[28px]">
                      {prayerRequest.title}
                    </h2>
                    <p className="max-w-78 text-[12px] leading-normal text-[#474036] lg:max-w-124.5 lg:text-[16px]">
                      {prayerRequest.body}
                    </p>
                  </div>
                  <a
                    href={prayerRequest.formUrl}
                    target="_blank"
                    className="inline-flex h-7 items-center justify-center rounded-full bg-white/95 px-4 text-[14px] font-semibold text-black backdrop-blur-[2px] transition-transform duration-300 hover:scale-[1.03] lg:h-11 lg:px-6"
                  >
                    {prayerRequest.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* WHITE ENVELOPE FRONT — notched opening + flap creases; masks the
              letter's base so it reads as coming out of the envelope. Holds the
              Partner With Us block on desktop. */}
          <div className="relative z-20 -mt-11 bg-white pb-11 pt-14 [clip-path:polygon(0px_0px,50%_44px,100%_0px,100%_100%,0px_100%)] filter-[drop-shadow(0_-6px_16px_rgba(0,0,0,0.06))] lg:-mt-20 lg:pb-20 lg:pt-30 lg:[clip-path:polygon(0px_0px,50%_88px,100%_0px,100%_100%,0px_100%)]">
            <PartnerBlock className="hidden lg:flex" />
          </div>
        </div>

        {/* Partner With Us — separate section below the envelope on mobile */}
        <Reveal className="mt-10 lg:hidden">
          <PartnerBlock />
        </Reveal>
      </div>
    </section>
  );
}
