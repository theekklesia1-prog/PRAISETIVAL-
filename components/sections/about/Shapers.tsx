import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { shapers, shapersHeading } from "@/lib/about";

export default function Shapers() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-360 px-6 text-center sm:px-8 lg:px-20">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-[clamp(1.6rem,3.8vw,2.6rem)] font-semibold leading-[1.15] tracking-tight">
            {shapersHeading}
          </h2>
        </Reveal>

        {/* mobile: 2×2 overlapping tilted cluster */}
        <Reveal
          delay={0.1}
          className="mx-auto mt-10 flex w-70 flex-wrap justify-center sm:hidden"
        >
          {shapers.map((s, i) => (
            <div
              key={i}
              style={{ ["--tilt" as string]: s.tilt }}
              className={`relative aspect-4/5 w-35 overflow-hidden rounded-card shadow-float ring-1 ring-black/5 rotate-(--tilt) ${
                i === 0
                  ? "z-10 -mr-5"
                  : i === 1
                    ? "z-20 -ml-5"
                    : i === 2
                      ? "z-20 -mr-5 -mt-6"
                      : "z-10 -ml-5 -mt-6"
              }`}
            >
              <Image
                src={s.image}
                alt="Praisetival shaper"
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
          ))}
        </Reveal>

        {/* sm+: overlapping row */}
        <Reveal
          delay={0.1}
          className="mt-16 hidden items-center justify-center sm:flex"
        >
          {shapers.map((s, i) => (
            <div
              key={i}
              style={{ ["--tilt" as string]: s.tilt }}
              className={`relative -mx-3 aspect-4/5 w-[42vw] max-w-52.5 shrink-0 overflow-hidden rounded-card shadow-float ring-1 ring-black/5 transition-transform duration-500 rotate-(--tilt) hover:z-10 hover:scale-[1.04] hover:rotate-0 ${
                i % 2 === 0 ? "translate-y-3" : "-translate-y-3"
              }`}
            >
              <Image
                src={s.image}
                alt="Praisetival shaper"
                fill
                sizes="210px"
                className="object-cover"
              />
            </div>
          ))}
        </Reveal>

        <div className="mt-10 sm:mt-14">
          <Button variant="solid" href="/impact">
            View More
          </Button>
        </div>
      </div>
    </section>
  );
}
