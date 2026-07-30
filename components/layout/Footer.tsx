import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { footerColumns } from "@/lib/nav";

const socials = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/praisetival_ireland?igsh=emtjMHlycnF4NWNu&utm_source=qr",
    label: "Instagram",
  },
  {
    icon: YoutubeIcon,
    href: "https://youtube.com/@praisetival_ireland?si=oQBcGp-tA_sH9B6d",
    label: "YouTube",
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto w-full max-w-360 px-5 py-16 sm:px-8 lg:px-20 sm:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <Logo light className="w-46" />

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:gap-x-20">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/55 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 sm:mt-20">
          <div className="flex items-center justify-between gap-6 flex-row sm:items-center">
            <p className="text-sm text-white/55">
              © {new Date().getFullYear()} Praisetival. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex sm:size-11 size-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  <Icon className="size-4.5" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
