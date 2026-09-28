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

  const updateActiveFromScroll = useCallback(() => {
    const root = scrollerRef.current;
    if (!root || isScrollingRef.current) return;

    const viewportMid = root.scrollTop + root.clientHeight / 2;
    let nextActive = 0;
    let closest = Number.POSITIVE_INFINITY;

    sectionRefs.current.forEach((el, index) => {
      if (!el) return;
      const sectionMid = el.offsetTop + el.clientHeight / 2;
      const distance = Math.abs(viewportMid - sectionMid);
      if (distance < closest) {
        closest = distance;
        nextActive = index;
      }
    });

    setActive(nextActive);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = sectionRefs.current[index];
    if (!el) return;
    isScrollingRef.current = true;
    setActive(index);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      isScrollingRef.current = false;
      updateActiveFromScroll();
    }, 650);
  }, [updateActiveFromScroll]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    updateActiveFromScroll();
    root.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    return () => root.removeEventListener("scroll", updateActiveFromScroll);
  }, [updateActiveFromScroll]);

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
              "size-2.5 rounded-full border border-foreground/30 transition-all duration-300",
              active === index
                ? "scale-110 border-foreground bg-foreground"
                : "bg-transparent hover:border-foreground/60",
            )}
          />
        ))}
      </nav>

      <p
        className="fixed left-5 top-6 z-50 font-mono text-sm tabular-nums tracking-[0.25em] text-foreground sm:left-8 sm:top-8 sm:text-base"
        aria-live="polite"
        aria-atomic="true"
      >
        {String(active + 1).padStart(2, "0")} /{" "}
        {String(snapSections.length).padStart(2, "0")}
      </p>

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
            className="snap-section relative flex min-h-dvh w-full flex-col items-center justify-center bg-background px-6 py-20 sm:px-12"
          >
            <div className="flex max-w-lg flex-col items-center text-center">
              {section.eyebrow && (
                <p className="mb-3 text-sm font-medium tracking-wide text-muted-foreground">
                  {section.eyebrow}
                </p>
              )}
              <h2
                className={cn(
                  "font-medium tracking-tight text-foreground",
                  index === 0
                    ? "text-4xl sm:text-5xl md:text-6xl"
                    : "text-2xl sm:text-3xl",
                )}
              >
                {section.title}
              </h2>
              {section.tagline && (
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                  {section.tagline}
                </p>
              )}
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
