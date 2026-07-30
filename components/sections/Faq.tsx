"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { faqs } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-20">
        <div className="grid gap-10 rounded-4xl bg-fog p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          {/* heading */}
          <div>
            <Tag variant="dark">FAQ</Tag>
            <h2 className="mt-8 text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
              <span className="text-ink">Everything</span>{" "}
              <span className="text-cloud">You</span>
              <br />
              <span className="text-ink">Need to Know</span>
            </h2>
          </div>

          {/* accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`overflow-hidden bg-white shadow-card ${
                    isOpen ? "rounded-2xl" : "rounded-full"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-medium text-ink">
                      {item.q}
                    </span>
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isOpen ? "border-ink text-ink" : "border-line text-slate"
                      }`}
                    >
                      <ChevronDown
                        className={`size-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-slate">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
