import type { Metadata } from "next";
import PartnerHero from "@/components/sections/partner/PartnerHero";
import GivingSection from "@/components/sections/partner/GivingSection";

export const metadata: Metadata = {
  title: "Partner With Us — Praisetival",
  description:
    "Praisetival is fully funded by kingdom partners, sponsors, and voluntary donations. Partner with us to help spread the message of Christ through worship.",
};

export default function PartnerPage() {
  return (
    <>
      <PartnerHero />
      <GivingSection />
    </>
  );
}
