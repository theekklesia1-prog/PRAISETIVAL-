import type { ReactNode } from "react";
import Image from "next/image";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { team } from "@/lib/about";

const dotted =
  "[background-image:radial-gradient(var(--color-line)_1.2px,transparent_1.2px)] [background-size:16px_16px]";

function Slide({ src }: { src: string }) {
  return (
    <div className="relative mr-4 aspect-4/5 w-[clamp(150px,20vw,230px)] shrink-0 overflow-hidden rounded-2xl bg-fog">
      <Image
        src={src}
        alt="Praisetival team"
        fill
        sizes="(max-width:640px) 45vw, 230px"
        className="object-cover object-[center_28%]"
      />
    </div>
  );
}

/**
 * One marquee row: two copies of the photos loop seamlessly. On mobile the row
 * runs full-width with soft edges; on desktop a pinned text card sits on top and
 * the photos dissolve underneath it (the text stays readable either way).
 */
function Row({
  photos,
  direction,
  side,
  card,
}: {
  photos: string[];
  direction: "left" | "right";
  side: "left" | "right";
  card: ReactNode;
}) {
  const loop = [...photos, ...photos];
  const isLeft = side === "left";
  return (
    <div className="marquee-row relative overflow-hidden">
      <div
        className={`flex w-max ${direction === "left" ? "marquee-left" : "marquee-right"}`}
      >
        {loop.map((src, i) => (
          <Slide key={i} src={src} />
        ))}
      </div>

      {/* soft edges on both ends */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-white to-transparent lg:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-white to-transparent lg:w-24" />

      {/* desktop only: pinned text + a soft dissolve into the photos */}
      <div
        className={`absolute inset-y-0 z-20 hidden lg:flex ${
          isLeft ? "left-0" : "right-0 flex-row-reverse"
        }`}
      >
        {card}
        <div
          className={`pointer-events-none w-28 from-white to-transparent ${
            isLeft ? "bg-linear-to-r" : "bg-linear-to-l"
          }`}
        />
      </div>
    </div>
  );
}

export default function TheTeam() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-20">
        <Reveal>
          <Tag variant="outline">{team.label}</Tag>
          <h2 className="mt-6 max-w-md text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
            {team.heading}
          </h2>
        </Reveal>

        {/* stat — inline on mobile, overlaid on row 1 on desktop */}
        <div className="mt-8 flex items-end gap-3 lg:hidden">
          <span className="text-[2.75rem] font-semibold leading-none tracking-tight">
            {team.stat.value}
          </span>
          <span className="pb-1 text-sm text-slate">{team.stat.label}</span>
        </div>

        <Reveal delay={0.1} className="mt-6 space-y-4 lg:mt-12">
          {/* Row 1 — scrolls left, photos dissolve under the 80+ Volunteers text */}
          <Row
            photos={team.photos}
            direction="left"
            side="left"
            card={
              <div
                className={`flex h-full w-[clamp(140px,20vw,220px)] flex-col justify-center bg-white pl-1 pr-4 ${dotted}`}
              >
                <p className="text-[clamp(2.5rem,5vw,3.25rem)] font-semibold leading-none tracking-tight">
                  {team.stat.value}
                </p>
                <p className="mt-2 text-sm text-slate">{team.stat.label}</p>
              </div>
            }
          />

          {/* Row 2 — scrolls right, photos dissolve under the tagline + CTA */}
          <Row
            photos={[...team.photos].reverse()}
            direction="right"
            side="right"
            card={
              <div className="flex h-full w-[clamp(230px,32vw,380px)] flex-col justify-center bg-white pl-4 pr-1">
                <p className="max-w-xs text-lg font-medium leading-snug text-ink">
                  {team.tagline}
                </p>
                <div className="mt-5">
                  <Button
                    variant="solid"
                    href="https://forms.gle/VDbMGPwcqsLFSzQE8"
                  >
                    {team.cta}
                  </Button>
                </div>
              </div>
            }
          />
        </Reveal>

        {/* tagline + CTA — stacked on mobile, overlaid on row 2 on desktop */}
        <div className="mt-8 max-w-sm lg:hidden">
          <p className="text-lg font-medium leading-snug text-ink">
            {team.tagline}
          </p>
          <div className="mt-5">
            <Button variant="solid" href="/contact#volunteer">
              {team.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
