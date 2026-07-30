import Image from "next/image";
import Link from "next/link";

/**
 * Praisetival wordmark (exported from Figma). Monochrome PNG with alpha —
 * `logo-dark` for light surfaces (nav), `logo-white` for dark surfaces
 * (hero watermark, footer). Size is controlled by the caller via a width
 * class on `className` (the image fills it).
 */
export function Logo({
  className = "",
  href = "/",
  light = false,
  priority = false,
}: {
  className?: string;
  href?: string;
  light?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label="Praisetival home"
      className={`inline-block ${className}`}
    >
      <Image
        src={light ? "/images/brand/logo-white.png" : "/images/brand/logo-dark.png"}
        alt="Praisetival"
        width={640}
        height={253}
        priority={priority}
        className="h-auto w-full"
      />
    </Link>
  );
}
