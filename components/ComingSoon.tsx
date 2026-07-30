import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";

export default function ComingSoon({
  label,
  title,
  blurb,
}: {
  label: string;
  title: string;
  blurb: string;
}) {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col items-center justify-center px-5 py-32 text-center sm:px-8 lg:px-20">
        <Tag variant="light">{label}</Tag>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight">
          {title}
        </h1>
        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/55">
          {blurb}
        </p>
        <div className="mt-10">
          <Button variant="light" href="/">
            Back Home
          </Button>
        </div>
      </div>
    </section>
  );
}
