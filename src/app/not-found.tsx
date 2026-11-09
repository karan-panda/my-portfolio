import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pt-[var(--nav-h)]">
      <p className="text-label text-accent">404 · Route not found</p>
      <h1 className="text-display mt-6 max-w-[16ch]">This path isn&apos;t in the system.</h1>
      <p className="text-lead mt-6 max-w-[48ch] text-text-dim">
        The page may have moved, or the link was mistyped. The work is still one click away.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/#work">View selected work</Button>
        <Button href="/" variant="ghost">
          Back home
        </Button>
      </div>
    </section>
  );
}
