"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Countdown } from "@/components/ui/Countdown";
import { heroEvents, type HeroEvent } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

function EventCardInner({
  event,
  expanded,
  showHint = false,
}: {
  event: HeroEvent;
  expanded: boolean;
  showHint?: boolean;
}) {
  return (
    <div className="flex h-full items-stretch gap-4 rounded-[22px] bg-white p-2 pr-3 text-ink shadow-float">
      <motion.div
        animate={{ width: expanded ? 108 : 68, height: expanded ? 140 : 68 }}
        transition={{ duration: 0.4, ease }}
        className="relative shrink-0 self-center overflow-hidden rounded-2xl bg-fog"
      >
        <Image
          src={event.poster}
          alt={event.title}
          fill
          sizes="120px"
          className="object-cover"
        />
      </motion.div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-lg font-semibold uppercase leading-tight">
          {event.title}
        </p>
        <AnimatePresence mode="wait" initial={false}>
          {expanded ? (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mt-1.5 text-sm font-medium text-ink">
                {event.date}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-slate">
                {event.venue[0]}
                <br />
                {event.venue[1]}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="compact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* live countdown when there's a fixed date, otherwise the
                  recurring schedule — so the slot is never empty */}
              {event.countdown ? (
                <Countdown
                  date={event.countdown}
                  seconds={false}
                  className="mt-1 block text-[11px] font-medium tracking-wide text-slate"
                />
              ) : (
                <p className="mt-1 text-[11px] font-medium tracking-wide text-slate">
                  {event.date}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {showHint && !expanded && (
          <div className="mt-auto flex items-center justify-between border-t border-line/70 pt-2.5">
            <span className="text-sm text-slate">View More</span>
            <ArrowRight className="size-4 text-slate" />
          </div>
        )}
      </div>
    </div>
  );
}

/** Desktop: the two cards sit stacked as a deck; hovering fans them apart and
 *  reveals each event's date + venue. */
function DesktopStack() {
  const [open, setOpen] = useState(false);
  // render back → front so the front card (Shekinah) sits lowest and the others
  // peek above it as a deck
  const cards = [...heroEvents].reverse();
  const front = cards.length - 1;
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative hidden w-full lg:block"
    >
      <div className="flex flex-col">
        {cards.map((event, i) => {
          const isFront = i === front;
          return (
            <motion.div
              key={event.title}
              animate={{
                marginBottom: isFront ? 0 : open ? 12 : -72,
                scale: open || isFront ? 1 : 0.94,
                opacity: open || isFront ? 1 : 0.75,
              }}
              transition={{ duration: 0.45, ease }}
              style={{ zIndex: i }}
              className="relative"
            >
              <EventCardInner event={event} expanded={open} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** Mobile: a swipeable carousel; each card's "View More" flips the countdown to
 *  the event's date + venue. */
function MobileCard({ event }: { event: HeroEvent }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="w-[86%] shrink-0 snap-center text-left"
    >
      <EventCardInner event={event} expanded={open} showHint={!open} />
    </button>
  );
}

function MobileCarousel() {
  return (
    <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
      {heroEvents.map((event) => (
        <MobileCard key={event.title} event={event} />
      ))}
    </div>
  );
}

export default function HeroEvents() {
  return (
    <div className="w-full">
      <DesktopStack />
      <MobileCarousel />
    </div>
  );
}
