"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { snapSections } from "@/content/snap-sections";
import { cn } from "@/lib/utils";

export function ScrollSnapPortfolio() {
  const scrollerRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const isScrollingRef = useRef(false);

  const scrollToIndex = useCallback((index: number) => {
    const el = sectionRefs.current[index];
    if (!el) return;
    isScrollingRef.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(index);
    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target) return;
        const idx = sectionRefs.current.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setActive(idx);
      },
      { root, threshold: [0.35, 0.55, 0.75] },
    );

    sectionRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(Math.min(active + 1, snapSections.length - 1));
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(Math.max(active - 1, 0));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, scrollToIndex]);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black text-white">
      <nav
        aria-label="Section navigation"
        className="fixed right-5 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3 sm:right-8"
      >
        {snapSections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            aria-label={`Go to ${section.label}`}
            aria-current={active === index ? "true" : undefined}
            onClick={() => scrollToIndex(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full border border-white/30 transition-all duration-300",
              active === index
                ? "scale-125 bg-white"
                : "bg-white/20 hover:bg-white/50",
            )}
          />
        ))}
      </nav>

      <div className="fixed left-5 top-6 z-50 font-mono text-xs tracking-[0.2em] text-white/70 sm:left-8 sm:top-8">
        {String(active + 1).padStart(2, "0")} /{" "}
        {String(snapSections.length).padStart(2, "0")}
      </div>

      <main
        ref={scrollerRef}
        className="snap-scroll h-dvh w-full overflow-x-hidden overflow-y-auto overscroll-y-contain"
      >
        {snapSections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={(node) => {
              sectionRefs.current[index] = node;
            }}
            className={cn(
              "snap-section relative flex min-h-dvh w-full flex-col items-center justify-center px-6 py-20 sm:px-12",
              section.panelClass,
            )}
          >
            {section.image && (
              <>
                <Image
                  src={section.image}
                  alt=""
                  fill
                  className="object-cover opacity-40"
                  sizes="100vw"
                  priority={index === 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
              </>
            )}

            <div className="relative z-10 flex max-w-6xl flex-col items-center text-center">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-white/60 mix-blend-difference">
                {section.label}
              </p>
              <h2
                className={cn(
                  "max-w-[14ch] text-[clamp(2.75rem,11vw,9rem)] font-semibold leading-[0.92] tracking-tight",
                  section.blendTitle &&
                    "text-white mix-blend-difference",
                )}
              >
                {section.title}
              </h2>
              {section.subtitle && (
                <p
                  className={cn(
                    "mt-8 max-w-md text-sm leading-relaxed sm:text-base",
                    section.blendTitle
                      ? "text-white/90 mix-blend-difference"
                      : "text-white/80",
                  )}
                >
                  {section.subtitle}
                </p>
              )}
            </div>

            {index === 0 && (
              <p className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-pulse font-mono text-[10px] uppercase tracking-[0.4em] text-black/50 mix-blend-difference">
                Scroll or use arrow keys
              </p>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
