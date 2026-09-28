"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { snapSections } from "@/content/snap-sections";
import { SocialLinks } from "@/components/social-links";
import { FleetShowcaseGallery } from "@/components/fleet-showcase-gallery";
import { ContactSection } from "@/components/contact-section";
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
              "snap-section relative flex min-h-dvh w-full flex-col items-center bg-background px-6 sm:px-12",
              section.experiences
                ? "justify-start overflow-hidden pb-4 pt-[6vh] sm:pt-[7vh]"
                : section.projectShowcase
                  ? "justify-start pb-16 pt-[6vh] sm:pb-20 sm:pt-[7vh]"
                  : section.id === "contact"
                    ? "justify-center py-16 sm:py-20"
                    : "justify-center py-20",
            )}
          >
            <div
              className={cn(
                "flex flex-col items-center text-center",
                section.experiences
                  ? "max-w-4xl px-1"
                  : section.projectShowcase
                    ? "w-full max-w-5xl px-2"
                    : section.id === "contact"
                      ? "w-full max-w-xl px-2"
                      : section.paragraphs
                        ? "max-w-2xl px-2"
                        : "max-w-lg",
              )}
            >
              <h2
                className={cn(
                  "font-medium tracking-tight text-foreground",
                  index === 0
                    ? "text-4xl sm:text-5xl md:text-6xl"
                    : section.experiences
                      ? "text-2xl sm:text-3xl"
                      : section.projectShowcase
                        ? "mx-auto max-w-2xl text-xl leading-tight sm:text-2xl md:text-3xl"
                        : section.id === "contact"
                          ? "text-3xl sm:text-4xl"
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
                          "flex h-full flex-col px-3 py-3 sm:px-5 sm:py-4",
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
                        <h3 className="text-center font-mono text-xs font-medium tabular-nums tracking-[0.25em] text-foreground sm:text-sm">
                          {job.role}
                        </h3>
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
                    <article className="border-t border-foreground/15 px-3 py-3 sm:px-5 sm:py-4">
                      <h3 className="text-center font-mono text-[0.6875rem] font-medium tabular-nums tracking-[0.25em] text-foreground sm:text-xs">
                        {section.experienceSpotlight.role}
                      </h3>
                      <ul className="mx-auto mt-2 max-w-md list-outside list-disc space-y-1 pl-4 marker:text-foreground sm:max-w-lg sm:pl-4">
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
                <FleetShowcaseGallery showcase={section.projectShowcase} />
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
