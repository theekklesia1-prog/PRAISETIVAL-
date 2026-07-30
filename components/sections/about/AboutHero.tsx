import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { aboutHero } from "@/lib/about";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-135 items-center justify-center overflow-hidden bg-ink px-5 py-24 text-white">
      <Image
        src="/images/about/hero-crowd.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_28%]"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-transparent to-ink/45" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
          {aboutHero.label}
        </span>
        <h1 className="mt-7 text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight">
          {aboutHero.title}
        </h1>
        <div className="mt-8">
          <Button variant="light" href="/partner">
            {aboutHero.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
