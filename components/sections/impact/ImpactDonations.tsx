import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { donations } from "@/lib/impact";

export default function ImpactDonations() {
  return (
    <section className="relative flex min-h-135 items-center overflow-hidden bg-white py-20">
      {/* hands cutout — reused from the sponsorship section */}
      <div
        className="pointer-events-none absolute inset-0 bg-size-[auto_46%] bg-center bg-no-repeat opacity-90 sm:bg-size-[130%_auto] lg:bg-size-[100%_auto]"
        style={{ backgroundImage: "url(/images/brand/hands.png)" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_32%_38%_at_center,rgba(255,255,255,0.6),transparent_72%)]" />

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center px-5 text-center sm:px-8">
        <Reveal className="flex flex-col items-center">
          <Tag variant="outline">{donations.label}</Tag>
          <h2 className="mt-6 text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-tight text-ink">
            {donations.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] font-medium leading-relaxed text-charcoal">
            {donations.body}
          </p>
          <div className="mt-8">
            <Button variant="solid" href="/partner">
              {donations.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
