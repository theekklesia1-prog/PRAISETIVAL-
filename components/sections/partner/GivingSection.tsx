"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { giving } from "@/lib/partner";

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return (
    <div className="flex flex-col gap-1 rounded-[5px] bg-white px-1.5 py-2 lg:p-2.5">
      <p className="text-[14px] leading-[21px] text-[#6c6c6c] lg:text-[16px] lg:leading-[24px]">
        {label}
      </p>
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[14px] font-medium leading-[21px] text-ink lg:text-[16px] lg:leading-[24px]">
          {value}
        </p>
        <button
          onClick={onCopy}
          aria-label={`Copy ${label}`}
          className="shrink-0 text-slate transition-colors hover:text-ink"
        >
          {copied ? (
            <Check className="size-4 text-green-600 lg:size-5" />
          ) : (
            <Copy className="size-4 lg:size-5" strokeWidth={1.6} />
          )}
        </button>
      </div>
    </div>
  );
}

export default function GivingSection() {
  return (
    <section id="give" className="bg-[#fffaf3] py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-20">
        <Reveal className="flex flex-col items-center gap-2.5 rounded-[20px] bg-white px-2 pb-10 pt-5 sm:px-10 sm:py-12 lg:p-20">
          <span className="inline-flex h-8 items-center rounded-full border border-[#181818] px-4 text-[14px] uppercase leading-[21px] tracking-tight text-ink">
            {giving.label}
          </span>
          <h2 className="text-[24px] font-semibold leading-[36px] tracking-[-0.02em] text-ink lg:text-[28px] lg:leading-[42px]">
            {giving.title}
          </h2>

          {/* dark account card */}
          <div className="flex w-full flex-col gap-4 rounded-[10px] bg-ink p-4 lg:gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-[16px] font-medium leading-[24px] text-white lg:text-[20px] lg:leading-[30px]">
                {giving.bank}
              </p>
              <p className="text-[14px] leading-[21px] text-white/70">
                {giving.reference}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:gap-5">
              {giving.fields.map((f) => (
                <CopyField key={f.label} label={f.label} value={f.value} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
