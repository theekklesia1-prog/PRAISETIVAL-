"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { testimonials, type Testimonial } from "@/lib/content";

const toneClass: Record<Testimonial["tone"], string> = {
  cream: "bg-cream",
  lavender: "bg-lavender",
  mint: "bg-mint",
  rose: "bg-rose",
};

function Stars() {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, s) => (
        <Star
          key={s}
          className="size-4.5 fill-accent text-accent"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function Byline({ t }: { t: Testimonial }) {
  return (
    <figcaption className="mt-5 flex items-center gap-3 border-t border-black/6 pt-4">
      <span
        className="flex size-10 items-center justify-center rounded-full text-xs font-semibold text-white"
        style={{ backgroundColor: t.avatar }}
      >
        {t.initials}
      </span>
      <span className="text-[15px] font-semibold text-ink">{t.name}</span>
    </figcaption>
  );
}

/* Detect whether a line-clamped element is actually overflowing (so the
   Read more / hover-reveal affordance only appears when there's hidden text). */
function useTruncated(active = true) {
  const ref = useRef<HTMLQuoteElement>(null);
  const [truncated, setTruncated] = useState(false);
  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    const check = () => setTruncated(el.scrollHeight - el.clientHeight > 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);
  return { ref, truncated };
}

/* Desktop: every quote is clamped to keep the cards compact; the full text
   reveals in a soft same-tone popover on hover (only if actually truncated). */
function DesktopCard({ t }: { t: Testimonial }) {
  const { ref, truncated } = useTruncated();
  return (
    <figure
      className={`group relative flex h-full flex-col rounded-card p-5 sm:p-6 ${toneClass[t.tone]}`}
    >
      <Stars />
      <div className="mt-4 flex-1">
        <blockquote
          ref={ref}
          className="text-[14px] leading-relaxed text-charcoal line-clamp-3"
        >
          {t.quote}
        </blockquote>
      </div>
      <Byline t={t} />

      {truncated && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 z-20 flex min-h-full flex-col rounded-card p-5 opacity-0 shadow-float ring-1 ring-black/5 transition duration-300 ease-out group-hover:-translate-y-1 group-hover:opacity-100 sm:p-6 ${toneClass[t.tone]}`}
        >
          <Stars />
          <div className="mt-4 flex-1">
            <blockquote className="text-[14px] leading-relaxed text-charcoal">
              {t.quote}
            </blockquote>
          </div>
          <Byline t={t} />
        </div>
      )}
    </figure>
  );
}

/* Mobile: every quote is clamped with a Read more / Read less toggle. */
function MobileCard({ t }: { t: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, truncated } = useTruncated(!expanded);
  return (
    <figure
      className={`flex flex-col rounded-card p-5 ${toneClass[t.tone]}`}
    >
      <Stars />
      <div className="mt-4">
        <blockquote
          ref={ref}
          className={`text-[14px] leading-relaxed text-charcoal ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {t.quote}
        </blockquote>
        {(truncated || expanded) && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2.5 text-[13px] font-semibold text-ink underline decoration-black/20 underline-offset-4"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
      <Byline t={t} />
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-10 lg:py-28">
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-20">
        <Reveal className="relative mb-12 lg:mb-14">
          <Tag
            variant="dark"
            className="mb-8 inline-flex lg:absolute lg:left-0 lg:top-1 lg:mb-0"
          >
            Testimonials
          </Tag>
          <h2 className="mx-auto max-w-3xl text-center text-[clamp(2rem,4.4vw,3rem)] font-medium leading-normal tracking-tight text-slate">
            Blessed by <span className="font-semibold text-ink">+1,500</span>
            <br />
            People Worldwide
          </h2>
        </Reveal>

        {/* desktop: wide/narrow alternating grid */}
        <RevealGroup
          className="hidden gap-5 md:grid md:grid-cols-3"
          stagger={0.1}
        >
          {testimonials.map((t, i) => (
            <RevealItem
              key={i}
              className={`relative hover:z-30 ${t.wide ? "md:col-span-2" : "md:col-span-1"}`}
            >
              <DesktopCard t={t} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* mobile: swipeable carousel */}
        <div className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-2 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t, i) => (
            <div key={i} className="w-[82%] shrink-0 snap-center">
              <MobileCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
