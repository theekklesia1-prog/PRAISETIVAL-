"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/nav";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Avoid calling setState synchronously within an effect to prevent
    // cascading renders — schedule it on the next tick instead.
    const t = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // transparent over the home hero video; solid white once scrolled / off-home
  const transparent = pathname === "/" && !scrolled && !mobileOpen;
  const linkCls = (active: boolean) =>
    transparent
      ? active
        ? "text-white"
        : "text-white/80 hover:text-white"
      : active
        ? "text-ink"
        : "text-slate hover:text-ink";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        transparent ? "bg-transparent" : "bg-white/90 backdrop-blur-md"
      } ${
        scrolled
          ? "border-b border-line/70 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.25)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-19 w-full max-w-360 items-center justify-between px-5 sm:px-8 lg:px-20">
        <Logo className="w-37.5 sm:w-42" light={transparent} priority />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 text-[15px] font-medium transition-colors ${linkCls(
                    isActive(link.href),
                  )}`}
                >
                  {link.label}
                  <ChevronDown
                    className={`size-4 transition-transform duration-300 ${
                      openDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl border border-line/70 bg-white p-2 shadow-float">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block rounded-xl px-4 py-2.5 text-sm text-slate transition-colors hover:bg-fog hover:text-ink"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[15px] font-medium transition-colors ${linkCls(
                  isActive(link.href),
                )}`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="https://www.eventbrite.ie/e/1993679298450?aff=oddtdtcreator"
            target="_blank"
            className="group hidden items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-ink/90 sm:inline-flex"
          >
            Get Tickets
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            className={`inline-flex size-11 items-center justify-center rounded-full lg:hidden ${
              transparent ? "text-white" : "text-ink"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-3 py-3 text-base font-medium ${
                      isActive(link.href) ? "bg-fog text-ink" : "text-slate"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="ml-3 flex flex-col border-l border-line pl-3">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="py-2 text-sm text-slate"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="https://www.eventbrite.ie/e/1993679298450?aff=oddtdtcreator"
                target="_blank"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white"
              >
                Get Tickets
                <ArrowUpRight className="size-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
