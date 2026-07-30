"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { artists, impactIntro, type Artist } from "@/lib/impact";

const ease = [0.22, 1, 0.36, 1] as const;

function ArtistCard({ artist, index }: { artist: Artist; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease, delay: (index % 2) * 0.08 }}
      className="group h-full"
    >
      {/* white card: 12px padding, 32px bottom (Figma spec) */}
      <div className="flex h-full flex-col gap-2.5 rounded-[20px] bg-white px-3 pb-8 pt-3">
        <div className="relative aspect-[266/369] w-full overflow-hidden rounded-[10px] bg-fog">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            sizes="(max-width:640px) 45vw, 22vw"
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-[20px] font-semibold leading-[30px] tracking-tight text-ink">
            {artist.name}
          </h3>
          <p className="text-[16px] leading-[24px] text-[#424242]">{artist.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ImpactArtists() {
  return (
    <section id="artists" className="bg-white py-20">
      <div className="mx-auto grid max-w-[1440px] items-start gap-12 px-5 sm:px-8 lg:px-20 lg:grid-cols-2 lg:gap-10">
        {/* left — sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <h2 className="max-w-[580px] text-[clamp(1.8rem,2.6vw,2.2rem)] font-semibold leading-[1.18] tracking-tight">
              {impactIntro.heading}
            </h2>
            <p className="mt-4 max-w-[510px] text-[15px] leading-relaxed text-slate">
              {impactIntro.body}
            </p>
            <div className="mt-10">
              <Button variant="solid" href="/#lineup">
                {impactIntro.cta}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* right — artist grid */}
        <div className="grid grid-cols-2 gap-5">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.slug} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
