"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectShowcase, ShowcaseScreenshot } from "@/content/snap-sections";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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

      <div
        className={cn(
          "mx-auto mt-6 grid w-full max-w-2xl gap-3",
          showcase.screenshots.length === 1
            ? "grid-cols-1 place-items-center sm:max-w-xs"
            : "grid-cols-2 sm:grid-cols-3",
        )}
      >
        {showcase.screenshots.map((shot) => (
          <button
            key={shot.id}
            type="button"
            onClick={() => openShot(shot)}
            className="group overflow-hidden rounded-md border border-foreground/15 bg-foreground/[0.02] text-left transition hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                className="object-cover object-top transition duration-200 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 45vw, 200px"
              />
            </div>
            <p className="px-2 py-1.5 font-mono text-[0.625rem] tracking-[0.15em] text-muted-foreground uppercase sm:text-[0.6875rem]">
              Tap to enlarge
            </p>
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
              <div className="relative aspect-video w-full bg-muted/30">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-contain object-center"
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
