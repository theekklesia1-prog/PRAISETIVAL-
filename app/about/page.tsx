import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import OurStory from "@/components/sections/about/OurStory";
import OurNumbers from "@/components/sections/about/OurNumbers";
import Shapers from "@/components/sections/about/Shapers";
import TheTeam from "@/components/sections/about/TheTeam";

export const metadata: Metadata = {
  title: "About Us — Praisetival",
  description:
    "The Ekklesia was founded in 2015 with a clear vision: to spread the gospel through music. Praisetival is the sound of a chosen generation.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <OurNumbers />
      <Shapers />
      <TheTeam />
    </>
  );
}
