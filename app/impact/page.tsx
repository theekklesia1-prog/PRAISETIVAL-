import type { Metadata } from "next";
import ImpactHero from "@/components/sections/impact/ImpactHero";
import ImpactArtists from "@/components/sections/impact/ImpactArtists";
import ImpactNumbers from "@/components/sections/impact/ImpactNumbers";
import ImpactDonations from "@/components/sections/impact/ImpactDonations";

export const metadata: Metadata = {
  title: "Our Impact — Praisetival",
  description:
    "Praisetival has grown into one of Ireland’s most anticipated gospel music and worship gatherings — impacting lives, strengthening faith, and fostering Christian community.",
};

export default function ImpactPage() {
  return (
    <>
      <ImpactHero />
      <ImpactArtists />
      <ImpactNumbers />
      <ImpactDonations />
    </>
  );
}
