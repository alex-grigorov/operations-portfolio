"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { snapSections } from "@/content/snap-sections";
import { SocialLinks } from "@/components/social-links";
import { cn } from "@/lib/utils";

function sectionScrollTop(container: HTMLElement, section: HTMLElement) {
  return (
    section.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop
  );
}

export function ScrollSnapPortfolio() {
  const scrollerRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const isAnimatingRef = useRef(false);

  const updateActiveFromScroll = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const centerLine = root.getBoundingClientRect().top + root.clientHeight / 2;
    let nextActive = 0;
    let closest = Number.POSITIVE_INFINITY;

    sectionRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - centerLine);
      if (distance < closest) {
        closest = distance;
        nextActive = index;
      }
    });

    setActive((prev) => (prev === nextActive ? prev : nextActive));
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const root = scrollerRef.current;
      const el = sectionRefs.current[index];
      if (!root || !el) return;

      isAnimatingRef.current = true;
      setActive(index);
      root.scrollTo({
        top: sectionScrollTop(root, el),
        behavior: "smooth",
      });

      window.setTimeout(() => {
        isAnimatingRef.current = false;
        updateActiveFromScroll();
      }, 800);
    },
    [updateActiveFromScroll],
  );

  useLayoutEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!isAnimatingRef.current) updateActiveFromScroll();
      });
    };

    updateActiveFromScroll();
    root.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      () => {
        if (!isAnimatingRef.current) updateActiveFromScroll();
      },
      {
        root,
        threshold: [0, 0.35, 0.5, 0.65, 1],
      },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      root.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
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

      <div className="fixed left-5 right-5 top-6 z-50 flex items-start justify-between gap-4 sm:left-8 sm:right-8 sm:top-8">
        <p
          className="font-mono text-sm tabular-nums tracking-[0.25em] text-foreground sm:text-base"
          aria-live="polite"
          aria-atomic="true"
        >
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(snapSections.length).padStart(2, "0")}
        </p>
        <SocialLinks className="shrink-0" />
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
            className={cn(
              "snap-section relative flex min-h-dvh w-full flex-col bg-background px-6 sm:px-12",
              section.experiences
                ? "items-center justify-start pt-[14vh] pb-16 sm:pt-[16vh]"
                : "items-center justify-center py-20",
            )}
          >
            <div
              className={cn(
                "flex w-full flex-col",
                section.experiences
                  ? "max-w-xl items-start text-left"
                  : cn(
                      "items-center text-center",
                      section.paragraphs ? "max-w-2xl px-2" : "max-w-lg",
                    ),
              )}
            >
              <h2
                className={cn(
                  "font-medium tracking-tight text-foreground",
                  index === 0
                    ? "text-4xl sm:text-5xl md:text-6xl"
                    : section.experiences
                      ? "w-full text-center text-2xl sm:text-3xl"
                      : section.paragraphs
                        ? "text-3xl sm:text-4xl"
                        : "text-2xl sm:text-3xl",
                )}
              >
                {section.title}
              </h2>
              {section.experiences && (
                <ul className="mt-8 w-full space-y-5">
                  {section.experiences.map((job) => (
                    <li
                      key={job.role}
                      className="border-b border-foreground/10 pb-5 last:border-b-0 last:pb-0"
                    >
                      <h3 className="text-sm font-medium text-foreground sm:text-base">
                        {job.role}
                      </h3>
                      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-snug text-muted-foreground">
                        {job.highlights.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
              {section.tagline && (
                <p className="mt-5 font-mono text-sm tabular-nums tracking-[0.25em] text-muted-foreground sm:text-base">
                  {section.tagline}
                </p>
              )}
              {section.paragraphs && (
                <div className="mt-8 w-full space-y-6 border-t border-foreground/10 pt-8 text-left">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="font-serif text-lg leading-[1.75] text-foreground/90 sm:text-xl sm:leading-[1.8]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              {!section.titleOnly && section.subtitle && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {section.subtitle}
                </p>
              )}
              {!section.titleOnly && section.image && (
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
              <p className="absolute bottom-10 font-mono text-sm tracking-[0.2em] text-muted-foreground sm:text-base">
                Scroll to view other sections
              </p>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
