import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { numbers } from "@/lib/about";

export default function OurNumbers() {
  return (
    <section className="bg-ink py-20 text-white lg:py-24">
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-20">
        <Reveal className="flex justify-center">
          <span className="inline-flex items-center rounded-full border border-white/25 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            Our Impact
          </span>
        </Reveal>

        <RevealGroup
          className="mt-10 grid grid-cols-4 gap-x-3 sm:gap-x-6 lg:mt-14 lg:gap-x-8"
          stagger={0.1}
        >
          {numbers.map((n) => (
            <RevealItem key={n.label}>
              <div className="text-center">
                <CountUp
                  value={n.value}
                  className="block text-[clamp(1.5rem,7vw,3rem)] font-semibold leading-none tracking-tight"
                />
                <div className="mx-auto mt-3 max-w-45 border-t border-dashed border-white/25 lg:mt-4" />
                <p className="mt-3 text-[11px] leading-tight text-white/50 lg:mt-4 lg:text-sm">
                  {n.label}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
