import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Expressions from "@/components/sections/Expressions";
import LineUp from "@/components/sections/LineUp";
import GetTickets from "@/components/sections/GetTickets";
import Testimonials from "@/components/sections/Testimonials";
import Sponsorship from "@/components/sections/Sponsorship";
import Faq from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Expressions />
      <LineUp />
      <GetTickets />
      <Testimonials />
      <Sponsorship />
      <Faq />
    </>
  );
}
