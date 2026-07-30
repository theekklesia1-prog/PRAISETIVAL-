import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Contact Us — Praisetival",
};

export default function ContactPage() {
  return (
    <ComingSoon
      label="Contact Us"
      title="Let’s Build the Movement Together."
      blurb="The Contact page — with partnership, volunteering, and enquiries — is on the way. Send the Figma design link and I’ll build it to match."
    />
  );
}
