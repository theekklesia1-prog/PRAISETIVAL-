import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export default function Sponsorship() {
  return (
    <section
      id="sponsorship"
      className="relative flex min-h-135 items-center overflow-hidden bg-white py-20"
    >
      {/* hands cutout — full width, centered, with white space above & below */}
      <div
        className="pointer-events-none absolute inset-0 bg-size-[auto_46%] bg-center bg-no-repeat opacity-90 sm:bg-size-[130%_auto] lg:bg-size-[100%_auto]"
        style={{ backgroundImage: "url(/images/brand/hands.png)" }}
      />
      {/* light white overlay so the text stays readable over the image */}
      <div className="pointer-events-none absolute inset-0 bg-white/60" />
      {/* soft halo behind the copy so the text stays crisp */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_30%_36%_at_center,rgba(255,255,255,0.55),transparent_72%)]" />

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center px-5 text-center sm:px-8">
        <Reveal className="flex flex-col items-center">
          <Tag variant="outline">Sponsorship</Tag>

          <h2 className="mt-6 text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-tight text-ink">
            Fuel the Praise
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[15px] font-medium leading-relaxed text-charcoal">
            Praisetival is fully funded by kingdom partners, sponsors, and
            voluntary donations from those who believe in our vision and
            mission. Every support we receive helps us do more for the Kingdom.
          </p>

          <div className="mt-8">
            <Button variant="solid" href="/partner">
              Partner With Us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
