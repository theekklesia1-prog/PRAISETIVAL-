import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const TICKET_URL = "https://www.eventbrite.ie/e/1993679298450?aff=oddtdtcreator";

export default function GetTickets() {
  return (
    <section className="relative flex min-h-135 items-end overflow-hidden bg-ink text-white lg:min-h-160">
      <Image
        src="/images/tickets/hall.jpg"
        alt="Empty auditorium seating set up for Praisetival"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/10" />

      <Reveal className="relative flex w-full flex-col items-start gap-8 px-5 py-16 sm:px-8 lg:px-20 lg:py-20">
        <h2 className="max-w-100 text-[clamp(2.25rem,5vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
          Don’t <span className="font-serif italic">Watch</span> the Moment.{" "}
          <span className="font-serif">Live</span> It.
        </h2>

        <a
          href={TICKET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-white/90"
        >
          Get Tickets
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </section>
  );
}
