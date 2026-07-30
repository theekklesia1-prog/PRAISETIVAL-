import Image from "next/image";
import { impactHero } from "@/lib/impact";

export default function ImpactHero() {
  return (
    <section className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-ink px-5 py-20 text-white">
      <Image
        src="/images/impact/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />
      {/* light overlay only — the design keeps the crowd bright */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ink/20" />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
          {impactHero.label}
        </span>
        <h1 className="mt-4 text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.15] tracking-tight [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">
          {impactHero.title}
        </h1>
      </div>
    </section>
  );
}
