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
    <div className="relative h-dvh w-full overflow-hidden bg-background text-foreground">
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
              "h-2 w-2 rounded-full border border-foreground/25 transition-all duration-300",
              active === index
                ? "scale-125 bg-foreground"
                : "bg-foreground/15 hover:bg-foreground/40",
            )}
          />
        ))}
      </nav>

      <div className="fixed left-5 top-6 z-50 text-xs tracking-wide text-muted-foreground sm:left-8 sm:top-8">
        {String(active + 1).padStart(2, "0")} /{" "}
        {String(snapSections.length).padStart(2, "0")}
      </div>

      <main
        ref={scrollerRef}
        className="snap-scroll h-dvh w-full overflow-x-hidden overflow-y-auto overscroll-y-contain bg-background"
      >
        {snapSections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={(node) => {
              sectionRefs.current[index] = node;
            }}
            className="snap-section flex min-h-dvh w-full flex-col items-center justify-center bg-background px-6 py-20 sm:px-12"
          >
            <div className="flex max-w-lg flex-col items-center text-center">
              <h2
                className={cn(
                  "font-medium tracking-tight text-foreground",
                  index === 0
                    ? "text-2xl sm:text-3xl"
                    : "text-2xl sm:text-3xl",
                )}
              >
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {section.subtitle}
                </p>
              )}
              {section.image && (
                <div className="mt-8 w-full max-w-md overflow-hidden rounded-lg border border-border">
                  <Image
                    src={section.image}
                    alt={section.imageAlt ?? ""}
                    width={800}
                    height={450}
                    className="h-auto w-full"
                  />
                </div>
              )}
            </div>

            {index === 0 && (
              <p className="absolute bottom-10 text-xs text-muted-foreground">
                Scroll or use arrow keys
              </p>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
