"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { Monogram } from "@/components/ui/Monogram";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useActiveSection } from "./useActiveSection";

/**
 * Fixed header. Hides while scrolling down, returns on scroll up.
 * Mobile: full-screen menu (Motion presence), focus trapped by `inert` on
 * the page behind it, Escape closes it.
 */
const SECTION_IDS = ["about", "work", "capabilities", "experience", "impact", "recognition", "contact"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Observe every home section so in-between sections (impact, capabilities…) clear the indicator.
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 240 && y > lastY.current);
        lastY.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const main = document.getElementById("main");
    const footer = document.getElementById("site-footer");
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      window.dispatchEvent(new Event("kp:scroll-lock"));
      document.body.style.overflow = "hidden";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.dispatchEvent(new Event("kp:scroll-unlock"));
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out)]",
        hidden && !open && "-translate-y-full",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 border-b transition-colors duration-500",
          scrolled || open ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      />
      <nav aria-label="Primary" className="shell flex h-[var(--nav-h)] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={close}>
          <Monogram className="text-2xl" />
          <span className="text-label sr-only text-text-dim sm:not-sr-only">{profile.name}</span>
          <span className="sr-only">, home</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href.replace("/#", "") ? "location" : undefined}
                className={cn(
                  "link-underline text-label relative py-2 transition-colors hover:text-text",
                  active === item.href.replace("/#", "") ? "text-text" : "text-text-dim",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 -left-3 size-1 -translate-y-1/2 rounded-full bg-accent transition-transform duration-500",
                    active === item.href.replace("/#", "") ? "scale-100" : "scale-0",
                  )}
                />
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener"
              className="text-label inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-text transition-colors hover:border-accent hover:text-accent"
            >
              Resume <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </li>
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="grid size-11 place-items-center rounded-full border border-line-strong md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-[var(--nav-h)] bottom-0 bg-bg md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: ease.outBezier }}
          >
            <ul className="shell flex flex-col gap-2 pt-10">
              {[...navItems, { label: "Resume", href: profile.links.resume }].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.6, ease: ease.outBezier }}
                  className="border-b border-line"
                >
                  <a
                    href={item.href}
                    onClick={close}
                    className="flex items-baseline justify-between py-5"
                    {...(item.label === "Resume" ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    <span className="text-display">{item.label}</span>
                    <span className="text-label text-muted">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="shell text-label mt-10 text-muted">{profile.location}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
