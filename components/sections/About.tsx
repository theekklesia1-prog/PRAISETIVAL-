import { Music, Globe, Calendar, type LucideIcon } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { featureCards } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  music: Music,
  globe: Globe,
  calendar: Calendar,
};

export default function About() {
  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-360 items-start gap-14 px-5 sm:px-8 lg:px-20 lg:grid-cols-2 lg:gap-20">
        {/* Left — copy */}
        <Reveal>
          <Tag variant="dark">About Us</Tag>

          <h2 className="mt-8 text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
            United in Worship
          </h2>

          <div className="mt-3 h-0.75 w-12 rounded-full bg-ink" />

          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#373737]">
            Praisetival is more than a festival it’s a convergence of faith,
            culture, and sound. We believe that worship is the universal
            language that unites every tribe, nation, and tongue. Every year, we
            create a space where thousands gather to experience something truly
            transcendent.
          </p>

          <div className="mt-6">
            <Button variant="outline" href="/about">
              View More
            </Button>
          </div>
        </Reveal>

        {/* Right — feature cards */}
        <RevealGroup className="flex flex-col gap-5" stagger={1}>
          {featureCards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <RevealItem key={card.title} from="right">
                <div className="flex items-start gap-5 rounded-card border border-line/60 bg-white p-7 shadowcard transition-shadow duration-300 shadow-float">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                    <Icon className="size-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate">
                      {card.text}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
