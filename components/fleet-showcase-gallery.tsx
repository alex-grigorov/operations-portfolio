"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectShowcase, ShowcaseScreenshot } from "@/content/snap-sections";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type FleetShowcaseGalleryProps = {
  showcase: ProjectShowcase;
};

export function FleetShowcaseGallery({ showcase }: FleetShowcaseGalleryProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ShowcaseScreenshot | null>(null);

  function openShot(shot: ShowcaseScreenshot) {
    setActive(shot);
    setOpen(true);
  }

  return (
    <>
      <p className="mx-auto mt-4 max-w-2xl text-center font-serif text-sm leading-relaxed text-foreground/90 sm:text-base">
        {showcase.summary}
      </p>

      <div className="mx-auto mt-6 flex w-full max-w-4xl items-start justify-start gap-2.5 overflow-x-auto pb-2 sm:gap-3">
          {showcase.screenshots.map((shot) => (
            <button
              key={shot.id}
              type="button"
              onClick={() => openShot(shot)}
              aria-label={`Enlarge ${shot.alt}`}
              className="group w-32 shrink-0 overflow-hidden rounded-md border border-foreground/15 bg-foreground/[0.02] transition hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 sm:w-36"
            >
            <div className="relative aspect-video w-full">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                unoptimized
                className="object-cover object-center transition duration-200 group-hover:opacity-95"
                sizes="176px"
              />
            </div>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="max-h-[90vh] overflow-y-auto border-foreground/15 bg-background p-0 sm:max-w-3xl"
        >
          {active && (
            <>
              <DialogTitle className="sr-only">{active.alt}</DialogTitle>
              <div className="relative w-full bg-muted/30">
                <Image
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
