import type { SVGProps } from "react";

/* Standard brand glyphs — lucide dropped its brand icons, so these are
   inlined. Not design assets from Figma. */

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M15.5 8.5h-2a1 1 0 0 0-1 1V12h3l-.5 3h-2.5v6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9.2" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.5 9.2v5.6l4.6-2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}
