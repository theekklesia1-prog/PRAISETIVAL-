import type { ReactNode } from "react";

type Variant = "dark" | "light" | "outline";

const styles: Record<Variant, string> = {
  dark: "bg-ink text-white",
  light: "bg-white text-ink",
  outline: "border border-line text-ink",
};

/** Small pill label used above section headings (e.g. "ABOUT US", "FAQ"). */
export function Tag({
  children,
  variant = "dark",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
