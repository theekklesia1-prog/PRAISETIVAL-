import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { story } from "@/lib/about";

export default function OurStory() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-360 items-start gap-10 px-5 sm:px-8 lg:grid-cols-4 lg:gap-8 lg:px-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Tag variant="outline">Our Story</Tag>
        </div>

        <Reveal className="lg:col-span-2 lg:col-start-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-ink">
            {story.heading}
          </h2>
          <div className="mt-5 space-y-4">
            {story.paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-slate">
                {p}
              </p>
            ))}
          </div>

          <hr className="my-9 border-line" />

          <h3 className="text-base font-semibold text-ink">
            {story.vision.title}
          </h3>
          {story.vision.body.map((p, i) => (
            <p key={i} className="mt-2 text-[15px] leading-relaxed text-slate">
              {p}
            </p>
          ))}

          <hr className="my-9 border-line" />

          <h3 className="text-base font-semibold text-ink">
            {story.mission.title}
          </h3>
          <div className="mt-2 space-y-1.5">
            {story.mission.body.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-slate">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
