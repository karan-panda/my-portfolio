import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "text";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  download?: boolean | string;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full px-6 font-mono text-[0.78rem] tracking-[0.12em] uppercase transition-colors duration-300";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-text",
  ghost: "border border-line-strong text-text hover:border-text",
  text: "min-h-11 px-0 text-text-dim hover:text-text",
};

/**
 * Link styled as a button. The icon slides out and a copy slides in on hover —
 * purely CSS, so it works without hydration.
 */
export function Button({ href, children, variant = "primary", icon, download, external, className, ariaLabel }: Props) {
  const glyph = icon ?? <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />;
  const content = (
    <>
      <span className="relative">{children}</span>
      <span className="relative grid size-4 place-items-center overflow-hidden" aria-hidden="true">
        <span className="col-start-1 row-start-1 transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-[120%] group-hover:-translate-y-[120%]">
          {glyph}
        </span>
        <span className="col-start-1 row-start-1 -translate-x-[120%] translate-y-[120%] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-0">
          {glyph}
        </span>
      </span>
    </>
  );
  const cls = cn(base, variants[variant], className);

  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
