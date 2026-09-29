"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectShowcase, ShowcaseScreenshot } from "@/content/snap-sections";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FleetShowcaseGalleryProps = {
  showcase: ProjectShowcase;
};

export function FleetShowcaseGallery({ showcase }: FleetShowcaseGalleryProps) {
  const { screenshots } = showcase;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const active: ShowcaseScreenshot | undefined = screenshots[activeIndex];
  const canNavigate = screenshots.length > 1;

  const goTo = useCallback(
    (delta: number) => {
      if (screenshots.length === 0) return;
      setActiveIndex(
        (prev) => (prev + delta + screenshots.length) % screenshots.length,
      );
    },
    [screenshots.length],
  );

  function openAt(index: number) {
    setActiveIndex(index);
    setOpen(true);
  }

  useEffect(() => {
    if (!open || !canNavigate) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, canNavigate, goTo]);

  return (
    <>
      <p className="mx-auto mt-4 max-w-2xl text-center font-serif text-sm leading-relaxed text-foreground/90 sm:text-base">
        {showcase.summary}
      </p>

      {showcase.featureHighlights && showcase.featureHighlights.length > 0 && (
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <p className="font-mono text-[0.6875rem] font-medium tracking-[0.2em] text-foreground uppercase sm:text-xs">
            Key features
          </p>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {showcase.featureHighlights.map((label) => (
              <li
                key={label}
                className="rounded-full border border-foreground/15 bg-foreground/[0.03] px-3 py-1 font-mono text-[0.625rem] tracking-wide text-foreground/90 sm:text-[0.6875rem]"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mx-auto mt-6 grid w-full max-w-5xl grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-2.5 md:grid-cols-5 lg:grid-cols-6">
        {screenshots.map((shot, index) => (
          <button
            key={shot.id}
            type="button"
            onClick={() => openAt(index)}
            aria-label={`Enlarge ${shot.alt}`}
            className="group min-w-0 overflow-hidden rounded-md border border-foreground/15 bg-foreground/[0.02] transition hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                unoptimized
                className="object-cover object-center transition duration-200 group-hover:opacity-95"
                sizes="(max-width: 1024px) 20vw, 140px"
              />
            </div>
          </button>
        ))}
      </div>

      {(showcase.techStackLine || showcase.integrationsLine) && (
        <div className="mx-auto mt-8 max-w-2xl space-y-2 text-center font-serif text-xs leading-relaxed text-muted-foreground sm:text-sm sm:leading-relaxed">
          {showcase.techStackLine && <p>{showcase.techStackLine}</p>}
          {showcase.integrationsLine && <p>{showcase.integrationsLine}</p>}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="max-h-[90vh] overflow-y-auto border-foreground/15 bg-background p-0 sm:max-w-3xl"
        >
          {active && (
            <>
              <DialogTitle className="sr-only">{active.alt}</DialogTitle>
              <div className="relative w-full bg-muted/30">
                {canNavigate && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label="Previous screenshot"
                      className={cn(
                        "absolute top-1/2 left-2 z-10 size-9 -translate-y-1/2 rounded-full border-foreground/20 bg-background/90 shadow-sm backdrop-blur-sm",
                        "hover:bg-background",
                      )}
                      onClick={() => goTo(-1)}
                    >
                      <ChevronLeft className="size-5" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label="Next screenshot"
                      className={cn(
                        "absolute top-1/2 right-2 z-10 size-9 -translate-y-1/2 rounded-full border-foreground/20 bg-background/90 shadow-sm backdrop-blur-sm",
                        "hover:bg-background",
                      )}
                      onClick={() => goTo(1)}
                    >
                      <ChevronRight className="size-5" />
                    </Button>
                  </>
                )}
                <Image
                  key={active.id}
                  src={active.src}
                  alt={active.alt}
                  width={1600}
                  height={900}
                  unoptimized
                  className="h-auto max-h-[70vh] w-full object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
              <div className="border-t border-foreground/10 px-4 py-4 sm:px-6 sm:py-5">
                {canNavigate && (
                  <p className="mb-2 text-center font-mono text-[0.6875rem] tabular-nums tracking-[0.2em] text-muted-foreground sm:text-xs">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(screenshots.length).padStart(2, "0")}
                    <span className="mx-2 text-foreground/20">·</span>
                    <span className="tracking-normal text-foreground/50">
                      Arrow keys to browse
                    </span>
                  </p>
                )}
                <p className="font-serif text-sm leading-relaxed text-foreground/95 sm:text-base sm:leading-relaxed">
                  {active.description}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
