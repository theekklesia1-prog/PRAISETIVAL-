"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Plus, X } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { ministers, type Minister } from "@/lib/ministers";

const bySlug = (s: string) => ministers.find((m) => m.slug === s)!;

const columns: { smOrder: string; raised: boolean; cards: Minister[] }[] = [
  {
    smOrder: "sm:order-2",
    raised: true,
    cards: [
      "abayomi-eniade",
      "surefunmi-eniade",
      "tommy-emmanuel",
      "damilola-salami",
    ].map(bySlug),
  },
  {
    smOrder: "sm:order-1",
    raised: false,
    cards: ["paul-tomisin", "gwen-samuel", "tomi-favored"].map(bySlug),
  },
  {
    smOrder: "sm:order-3",
    raised: false,
    cards: ["peter-akomere", "onos-ariyo", "solomon-emmanuel"].map(bySlug),
  },
];
const TOTAL = columns.reduce((n, c) => n + c.cards.length, 0);

// z-order + fan angle of the stacked deck — Abayomi sits on top.
const deckOrder = [
  "abayomi-eniade",
  "surefunmi-eniade",
  "peter-akomere",
  "paul-tomisin",
  "onos-ariyo",
  "tommy-emmanuel",
  "gwen-samuel",
  "solomon-emmanuel",
  "damilola-salami",
  "tomi-favored",
];
const deckIndexOf = (slug: string) => deckOrder.indexOf(slug);

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

type Pt = { x: number; y: number };
type Win = { start: number; end: number };

function MinisterCard({
  minister,
  progress,
  deck,
  cell,
  win,
  angle,
  zi,
  enabled,
  order,
}: {
  minister: Minister;
  progress: MotionValue<number>;
  deck: Pt;
  cell: Pt;
  win: Win;
  angle: number;
  zi: number;
  enabled: boolean;
  order: number;
}) {
  const t = useTransform(progress, [win.start, win.end], [0, 1], {
    clamp: true,
  });

  const x = useTransform(t, (v) => (deck.x - cell.x) * (1 - v));
  const y = useTransform(t, (v) => (deck.y - cell.y) * (1 - v));
  const rotate = useTransform(t, (v) => angle * (1 - v));
  const scale = useTransform(t, (v) => 0.92 + 0.08 * v);
  const labelOpacity = useTransform(t, [0.55, 1], [0, 1]);

  // flip to the bio on hover (desktop) or tap (mobile); a tap pins it open.
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const flipped = pinned || hovered;

  return (
    <motion.div
      style={
        enabled
          ? { x, y, rotate, scale, transformOrigin: "50% 100%", zIndex: zi }
          : undefined
      }
      initial={
        enabled
          ? false
          : { opacity: 0, x: order % 2 === 0 ? "-60%" : "60%", scale: 0.94 }
      }
      animate={enabled ? { opacity: 1 } : undefined}
      whileInView={enabled ? undefined : { opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={
        enabled
          ? { duration: 0.4, ease: "easeOut" }
          : { duration: 1.15, ease: [0.16, 1, 0.3, 1] }
      }
      className="block w-full"
    >
      <div
        className="relative aspect-413/591 cursor-pointer [perspective:1400px]"
        role="button"
        tabIndex={0}
        aria-label={`Read ${minister.name}’s bio`}
        aria-pressed={flipped}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setPinned((p) => !p)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setPinned((p) => !p);
          }
        }}
      >
        <div
          className="relative size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* front — portrait */}
          <div className="absolute inset-0 overflow-hidden rounded-[18px] bg-fog shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
            <Image
              src={minister.image}
              alt={minister.name}
              fill
              sizes="(max-width: 640px) 100vw, 30vw"
              className="object-cover"
            />
            <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-[7px] border border-white/70 bg-black/15 text-white backdrop-blur-sm">
              <Plus className="size-4" strokeWidth={2} />
            </span>
          </div>

          {/* back — photo stays, bio below */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] ring-1 ring-black/[0.06] [backface-visibility:hidden] [transform:rotateY(180deg)] [-webkit-backface-visibility:hidden]">
            <div className="relative aspect-[389/283] w-full shrink-0 overflow-hidden bg-fog">
              <Image
                src={minister.image}
                alt={minister.name}
                fill
                sizes="(max-width: 640px) 100vw, 30vw"
                className="object-cover object-top"
              />
            </div>
            <button
              type="button"
              aria-label={`Close ${minister.name}’s bio`}
              onClick={(e) => {
                e.stopPropagation();
                setPinned(false);
                setHovered(false);
              }}
              onKeyDown={(e) => e.stopPropagation()}
              className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-[7px] border border-white/70 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            >
              <X className="size-4" strokeWidth={2} />
            </button>
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-5 [scrollbar-width:thin]">
              {minister.bio.map((para, i) => (
                <p
                  key={i}
                  className="text-[13px] leading-relaxed text-charcoal"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        style={enabled ? { opacity: labelOpacity } : undefined}
        className="mt-4"
      >
        <h3 className="text-xl font-semibold tracking-tight">
          {minister.name}
        </h3>
        <p className="mt-0.5 text-sm text-slate">{minister.role}</p>
      </motion.div>
    </motion.div>
  );
}

export default function LineUp() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [cells, setCells] = useState<Pt[]>([]);
  const [wins, setWins] = useState<Win[]>([]);
  const [deck, setDeck] = useState<Pt>({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // forward-only playhead: advances while scrolling down, holds on scroll-up
  // (so the settled grid stays readable), and re-arms once the section is fully
  // below the viewport again.
  const playhead = useMotionValue(0);
  useMotionValueEvent(scrollY, "change", () => {
    const section = sectionRef.current;
    if (!section) return;
    if (section.getBoundingClientRect().top >= window.innerHeight) {
      playhead.set(0);
      return;
    }
    const p = scrollYProgress.get();
    if (p > playhead.get()) playhead.set(p);
  });

  useLayoutEffect(() => {
    const measure = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const grid = gridRef.current;
      const section = sectionRef.current;
      if (!grid || !section) return;
      if (!desktop) {
        setEnabled(false);
        setCells([]);
        setWins([]);
        return;
      }
      const gRect = grid.getBoundingClientRect();
      const sRect = section.getBoundingClientRect();
      const gridTopInSection = gRect.top - sRect.top;
      const vh = window.innerHeight;
      const scrollDist = Math.max(1, section.offsetHeight - vh);

      const centers = cardRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left - gRect.left + r.width / 2,
          y: r.top - gRect.top + r.height / 2,
        };
      });
      // each card drops as its row travels from the bottom of the screen up to
      // ~40% of the way up — i.e. exactly as you scroll it into view
      const windows = centers.map((c) => {
        const Y = gridTopInSection + c.y;
        const start = clamp((Y - vh * 0.98) / scrollDist, 0, 0.94);
        const end = clamp((Y - vh * 0.42) / scrollDist, start + 0.06, 1);
        return { start, end };
      });

      setEnabled(true);
      setCells(centers);
      setWins(windows);
      setDeck(centers[0] ?? { x: 0, y: 0 }); // Abayomi = top of the deck
    };
    measure();
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section ref={sectionRef} id="lineup" className="bg-white py-10 lg:py-32">
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-20">
        {/* heading */}
        <div className="flex flex-col items-center text-center">
          <Tag variant="dark">The Line Up</Tag>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold tracking-tight">
            10+ Ministers
          </h2>
          <p className="text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-tight tracking-tight text-slate">
            One Stage.
          </p>
        </div>

        {/* masonry — stacked deck that drops into place as you scroll */}
        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-1 gap-x-6 sm:grid-cols-3"
        >
          {columns.map((col, ci) => (
            <div
              key={ci}
              className={`flex flex-col gap-y-10 ${col.smOrder} ${col.raised ? "" : "sm:mt-24"}`}
            >
              {col.cards.map((minister, mi) => {
                const myIdx = columns.slice(0, ci).reduce((sum, c) => sum + c.cards.length, 0) + mi;
                const d = deckIndexOf(minister.slug);
                const angle =
                  d === 0 ? 0 : (d % 2 === 1 ? -1 : 1) * Math.ceil(d / 2) * 4;
                return (
                  <div
                    key={minister.slug}
                    ref={(el) => {
                      cardRefs.current[myIdx] = el;
                    }}
                    style={
                      enabled
                        ? { position: "relative", zIndex: TOTAL - d }
                        : undefined
                    }
                  >
                    <MinisterCard
                      minister={minister}
                      progress={playhead}
                      deck={deck}
                      cell={cells[myIdx] ?? { x: 0, y: 0 }}
                      win={wins[myIdx] ?? { start: 0, end: 1 }}
                      angle={angle}
                      zi={TOTAL - d}
                      enabled={enabled}
                      order={myIdx}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
