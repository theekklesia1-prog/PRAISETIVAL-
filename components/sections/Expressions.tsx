"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Maximize2, Minimize2 } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

const YOUTUBE_ID = "jMqLLrYh4b8";

export default function Expressions() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="expressions" className="bg-ink py-24 text-white lg:py-32">
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-20">
        <Reveal className="flex flex-col items-center text-center">
          <Tag variant="light">Events</Tag>
          <h2 className="mt-6 text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-tight">
            Our Expressions
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Audience of One — video card (expands to full width + YouTube on maximize) */}
          <Reveal className={expanded ? "lg:col-span-5" : "lg:col-span-3"}>
            {expanded ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                  title="Audience of One"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={() => setExpanded(false)}
                  aria-label="Minimize"
                  className="absolute right-6 top-6 z-10 flex size-9 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                >
                  <Minimize2 className="size-4" />
                </button>
              </div>
            ) : (
              <article className="group relative aspect-4/3 overflow-hidden rounded-3xl lg:aspect-auto lg:h-150">
                <Image
                  src="/images/events/audience-of-one.jpg"
                  alt="Audience of One"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/10" />
                <button
                  onClick={() => setExpanded(true)}
                  aria-label="Expand and play video"
                  className="absolute right-6 top-6 flex size-9 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <Maximize2 className="size-4" />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold">Audience of One</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
                    Tune in live every month for Audience of One, our monthly
                    gathering where we worship, pray, and fellowship in God’s
                    presence. Stream with us live on our YouTube channel.
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => setExpanded(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
                    >
                      Watch Now
                      <Play className="size-4 fill-current" />
                    </button>
                  </div>
                </div>
              </article>
            )}
          </Reveal>

          {/* Shekinah Glory — event poster card (hidden while the video is expanded) */}
          {!expanded && (
            <Reveal className="lg:col-span-2" delay={0.1}>
              <article className="group relative aspect-3/4 overflow-hidden rounded-3xl lg:aspect-auto lg:h-150">
                <Image
                  src="/images/events/shekinah-glory.jpg"
                  alt="Shekinah Glory — Praisetival"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="text-xl font-semibold">Praisetival</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Tickets are free, but registration is COMPULSORY
                  </p>
                  <a
                    href="https://www.eventbrite.ie/e/1993679298450?aff=oddtdtcreator"
                    target="_blank"
                    className="mt-4 inline-block border-b border-white pb-0.5 text-sm font-semibold"
                  >
                    REGISTER NOW
                  </a>
                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-3 text-xs tracking-wide text-white/60">
                    <span>3:30 PM</span>
                    <span>Lee Road, Dublin 11</span>
                    <span>Nov 2025</span>
                  </div>
                </div>
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
