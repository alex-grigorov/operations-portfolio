"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { snapSections } from "@/content/snap-sections";
import { SocialLinks } from "@/components/social-links";
import { FleetShowcaseGallery } from "@/components/fleet-showcase-gallery";
import { ContactSection } from "@/components/contact-section";
import { formatExperienceMeta } from "@/lib/format-experience-meta";
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
  const sectionVisibilityRef = useRef<number[]>(
    snapSections.map(() => 0),
  );
  const deckScrollTopRef = useRef(0);

  const pickActiveFromVisibility = useCallback(() => {
    let nextActive = 0;
    let bestRatio = -1;

    sectionVisibilityRef.current.forEach((ratio, index) => {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        nextActive = index;
      }
    });

    if (bestRatio >= 0.5) {
      setActive((prev) => (prev === nextActive ? prev : nextActive));
      return true;
    }

    return false;
  }, []);

  const updateActiveFromScroll = useCallback(() => {
    if (pickActiveFromVisibility()) return;

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
  }, [pickActiveFromVisibility]);

  const handleFleetGalleryOpenChange = useCallback(
    (open: boolean) => {
      const root = scrollerRef.current;
      if (!root) return;

      if (open) {
        deckScrollTopRef.current = root.scrollTop;
        return;
      }

      requestAnimationFrame(() => {
        root.scrollTop = deckScrollTopRef.current;
        updateActiveFromScroll();
      });
    },
    [updateActiveFromScroll],
  );

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
      (entries) => {
        if (isAnimatingRef.current) return;

        for (const entry of entries) {
          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (index >= 0) {
            sectionVisibilityRef.current[index] = entry.intersectionRatio;
          }
        }

        updateActiveFromScroll();
      },
      {
        root,
        threshold: [0, 0.25, 0.5, 0.6, 0.75, 1],
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
      if (document.querySelector('[data-slot="dialog-content"][data-open]')) {
        return;
      }

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
        className="fixed right-3 top-1/2 z-50 flex -translate-y-1/2 scale-90 flex-col gap-3 sm:right-8 sm:scale-100"
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

      <div className="safe-top fixed left-5 right-5 top-6 z-50 flex items-start justify-between gap-2 pr-10 sm:left-8 sm:right-8 sm:top-8 sm:gap-4 sm:pr-0">
        <p
          className="font-mono text-xs tabular-nums tracking-[0.15em] text-foreground max-sm:shrink-0 sm:text-sm sm:tracking-[0.25em] md:text-base"
          aria-live="polite"
          aria-atomic="true"
        >
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(snapSections.length).padStart(2, "0")}
        </p>
        <SocialLinks className="shrink-0" variant="compact" />
      </div>

      <main
        ref={scrollerRef}
        aria-label="Portfolio deck"
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
              "snap-section relative flex min-h-dvh w-full flex-col items-center bg-background px-6 sm:px-12",
              section.experiences
                ? "min-h-dvh justify-start overflow-x-hidden pb-8 pt-[max(6vh,calc(env(safe-area-inset-top)+4.5rem))] max-md:overflow-y-auto max-md:overscroll-y-contain sm:pt-[7vh] md:overflow-hidden md:pb-4"
                : section.projectShowcase
                  ? "showcase-section h-dvh max-h-dvh min-h-dvh justify-start overflow-x-hidden overflow-y-auto overscroll-y-contain pt-[2.5vh] pb-8 max-md:overflow-y-auto md:overflow-hidden md:pb-10 md:pt-[2.75vh]"
                  : section.id === "contact"
                    ? "min-h-dvh justify-start overflow-x-hidden py-8 pb-[max(2rem,env(safe-area-inset-bottom))] max-md:overflow-y-auto max-md:overscroll-y-contain sm:py-10 md:justify-center md:overflow-hidden"
                    : "justify-center py-20",
            )}
          >
            <div
              className={cn(
                "flex flex-col items-center text-center",
                section.experiences
                  ? "w-full max-w-5xl items-stretch px-1 text-left"
                  : section.projectShowcase
                    ? "slide-4-container flex h-full min-h-0 w-full max-w-5xl flex-1 flex-col justify-between overflow-hidden px-2 max-md:overflow-y-visible md:box-border"
                    : section.id === "contact"
                      ? "w-full max-w-4xl px-2"
                      : section.paragraphs
                        ? "max-w-2xl px-2"
                        : "max-w-lg",
              )}
            >
              {section.supertitle && (
                <p className="mb-4 font-mono text-sm tabular-nums tracking-[0.25em] text-foreground sm:mb-5 sm:text-base">
                  {section.supertitle}
                </p>
              )}
              <h2
                className={cn(
                  "font-medium tracking-tight text-foreground",
                  index === 0
                    ? "text-4xl sm:text-5xl md:text-6xl"
                    : section.experiences
                      ? "w-full text-center text-2xl sm:text-3xl"
                      : section.projectShowcase
                        ? "mx-auto max-w-2xl shrink-0 text-lg leading-tight sm:text-xl md:text-2xl md:leading-snug"
                        : section.id === "contact"
                          ? "text-2xl sm:text-3xl"
                          : section.paragraphs
                            ? "text-3xl sm:text-4xl"
                            : "text-2xl sm:text-3xl",
                )}
              >
                {section.title}
              </h2>
              {section.experiences && (
                <div className="mt-3 w-full border-t border-foreground/10 pt-3 sm:mt-4 sm:pt-4">
                  <div className="grid grid-cols-1 text-left sm:grid-cols-2">
                    {section.experiences.map((job, jobIndex) => (
                      <article
                        key={job.role}
                        className={cn(
                          "flex h-full flex-col px-2.5 py-3 sm:px-3.5 sm:py-4",
                          jobIndex % 2 === 0 && "sm:border-r sm:border-foreground/15",
                          (jobIndex < 2 || !section.experienceSpotlight) &&
                            "border-b border-foreground/15",
                          !section.experienceSpotlight &&
                            jobIndex < section.experiences!.length - 1 &&
                            "max-sm:border-b max-sm:border-foreground/15",
                          section.experienceSpotlight &&
                            jobIndex < section.experiences!.length - 1 &&
                            "max-sm:border-b max-sm:border-foreground/15",
                        )}
                      >
                        <h3 className="font-mono text-xs font-medium leading-tight tracking-[0.1em] text-foreground sm:text-sm">
                          {job.role}
                        </h3>
                        {job.meta && (
                          <p className="mt-1.5 max-w-full text-pretty break-words font-serif text-xs leading-snug text-muted-foreground max-sm:whitespace-normal sm:text-[0.8125rem] sm:whitespace-nowrap">
                            <span className="sm:hidden">{job.meta}</span>
                            <span className="hidden sm:inline">
                              {formatExperienceMeta(job.meta, { compact: true })}
                            </span>
                          </p>
                        )}
                        <ul className="mt-2 list-outside list-disc space-y-1 pl-4 marker:text-foreground sm:pl-4">
                          {job.highlights.map((line) => (
                            <li
                              key={line}
                              className="font-serif text-xs leading-snug text-foreground/90 sm:text-sm sm:leading-relaxed"
                            >
                              {line}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                  {section.experienceSpotlight && (
                    <article className="border-t border-foreground/15 px-3 py-3 text-left sm:px-5 sm:py-4">
                      <h3 className="font-mono text-xs font-medium leading-tight tracking-[0.1em] text-foreground sm:text-sm">
                        {section.experienceSpotlight.role}
                      </h3>
                      {section.experienceSpotlight.meta && (
                        <p className="mt-1.5 max-w-full text-pretty break-words font-serif text-xs leading-snug text-muted-foreground max-sm:whitespace-normal sm:text-[0.8125rem] sm:whitespace-nowrap">
                          <span className="sm:hidden">{section.experienceSpotlight.meta}</span>
                          <span className="hidden sm:inline">
                            {formatExperienceMeta(section.experienceSpotlight.meta, {
                              compact: true,
                            })}
                          </span>
                        </p>
                      )}
                      <ul className="mt-2 list-outside list-disc space-y-1 pl-4 marker:text-foreground sm:pl-4">
                        {section.experienceSpotlight.highlights.map((line) => (
                          <li
                            key={line}
                            className="font-serif text-xs leading-snug text-foreground/90 sm:text-sm sm:leading-relaxed"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </article>
                  )}
                </div>
              )}
              {section.projectShowcase && (
                <FleetShowcaseGallery
                  showcase={section.projectShowcase}
                  onDeckModalOpenChange={handleFleetGalleryOpenChange}
                />
              )}
              {section.id === "contact" && <ContactSection />}
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
              {!section.titleOnly && section.subtitle && !section.projectShowcase && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {section.subtitle}
                </p>
              )}
              {!section.titleOnly && section.image && !section.projectShowcase && (
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
              <p className="absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] font-mono text-sm tracking-[0.2em] text-muted-foreground sm:text-base">
                Scroll to Introduction
              </p>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
