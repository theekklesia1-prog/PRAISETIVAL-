import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "solid" | "outline" | "light";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-tight transition-all duration-300 whitespace-nowrap";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-white hover:bg-ink/90",
  outline: "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-white/90",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
};

export function Button({
  children,
  variant = "solid",
  arrow = true,
  className = "",
  href,
  ...rest
}: CommonProps &
  ({ href: string } | { href?: undefined }) &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      )}
    </>
  );

  const cls = `${base} ${variants[variant]} px-6 py-3.5 ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
