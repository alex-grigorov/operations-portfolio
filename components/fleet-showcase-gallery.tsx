"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type {
  ProjectShowcase,
  ProjectShowcaseChannel,
  ShowcasePlatform,
  ShowcaseScreenshot,
} from "@/content/snap-sections";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { preloadImages } from "@/lib/preload-images";

type FleetShowcaseGalleryProps = {
  showcase: ProjectShowcase;
  /** Keeps deck scroll position when the lightbox opens/closes. */
  onDeckModalOpenChange?: (open: boolean) => void;
};

function shotsForPlatform(
  screenshots: ShowcaseScreenshot[],
  platform: ShowcasePlatform,
) {
  return screenshots.filter((shot) => shot.platform === platform);
}

function findShot(
  screenshots: ShowcaseScreenshot[],
  id: string,
): ShowcaseScreenshot | undefined {
  return screenshots.find((shot) => shot.id === id);
}

/** One readable line in the lightbox (first sentence of the full description). */
function captionLine(description: string) {
  const match = description.match(/^[\s\S]*?[.!?](?=\s|$)/);
  return match ? match[0].trim() : description.trim();
}

type ChannelStripRowProps = {
  channel: ProjectShowcaseChannel;
  hero: ShowcaseScreenshot;
  galleryCount: number;
  onOpenGallery: () => void;
};

function ChannelStripRow({
  channel,
  hero,
  galleryCount,
  onOpenGallery,
}: ChannelStripRowProps) {
  const isMobile = channel.platform === "mobile";

  return (
    <div className="showcase-row grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-12 lg:items-center lg:gap-8">
      <div className="showcase-text-col col-span-1 text-left lg:col-span-5">
        <p className="mb-1.5 block font-mono text-[0.625rem] font-medium tracking-[0.22em] text-foreground uppercase sm:text-[0.6875rem]">
          {channel.title}
        </p>
        <p className="mb-2 font-serif text-xs leading-snug text-foreground/90 sm:text-sm sm:leading-snug">
          {channel.caption}
        </p>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onOpenGallery();
          }}
          className="inline-flex w-fit items-center gap-1 font-mono text-[0.625rem] tracking-wide text-foreground underline-offset-4 transition hover:text-foreground/80 hover:underline sm:text-xs"
        >
          View {channel.platform === "web" ? "web" : "mobile"} gallery (
          {galleryCount})
          <ArrowRight className="size-3.5 shrink-0" aria-hidden />
        </button>
      </div>

      <div className="showcase-graphic-col col-span-1 flex items-center justify-center lg:col-span-7 lg:justify-end lg:pr-8">
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onOpenGallery();
          }}
          aria-label={`Open ${channel.title} gallery — ${hero.alt}`}
          className="group flex max-w-full items-center justify-center overflow-hidden rounded-md border border-foreground/15 bg-foreground/[0.06] shadow-md transition hover:border-foreground/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            width={960}
            height={600}
            unoptimized
            className={cn(
              "w-auto max-w-full object-contain object-center transition duration-200 group-hover:opacity-95",
              isMobile
                ? "max-h-[240px] rounded-2xl md:max-h-[min(300px,30dvh)]"
                : "max-h-[180px] max-md:max-h-[min(200px,22dvh)] md:max-h-[min(220px,24dvh)]",
            )}
            sizes={isMobile ? "200px" : "(max-width: 768px) 90vw, 480px"}
          />
        </button>
      </div>
    </div>
  );
}

export function FleetShowcaseGallery({
  showcase,
  onDeckModalOpenChange,
}: FleetShowcaseGalleryProps) {
  const { screenshots, channels } = showcase;
  const [galleryPlatform, setGalleryPlatform] =
    useState<ShowcasePlatform | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryShots = useMemo(
    () =>
      galleryPlatform
        ? shotsForPlatform(screenshots, galleryPlatform)
        : [],
    [galleryPlatform, screenshots],
  );

  const active: ShowcaseScreenshot | undefined = galleryShots[activeIndex];
  const open = galleryPlatform !== null;
  const canNavigate = galleryShots.length > 1;

  const goTo = useCallback(
    (delta: number) => {
      if (galleryShots.length === 0) return;
      setActiveIndex(
        (prev) => (prev + delta + galleryShots.length) % galleryShots.length,
      );
    },
    [galleryShots.length],
  );

  function openGallery(platform: ShowcasePlatform) {
    onDeckModalOpenChange?.(true);
    setGalleryPlatform(platform);
    setActiveIndex(0);
  }

  function handleOpenChange(next: boolean) {
    if (!next) setGalleryPlatform(null);
    onDeckModalOpenChange?.(next);
  }

  useEffect(() => {
    preloadImages(screenshots.map((shot) => shot.src));
  }, [screenshots]);

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
    <div className="flex min-h-0 w-full flex-1 flex-col justify-between overflow-hidden max-md:gap-3 md:gap-2">
      <div className="shrink-0">
      <p className="mx-auto mt-0.5 max-w-2xl text-center font-serif text-xs leading-snug text-foreground/90 sm:text-sm">
        {showcase.summary}
      </p>

      {showcase.featureHighlights && showcase.featureHighlights.length > 0 && (
        <div className="mx-auto mt-1 w-full max-w-5xl">
          <ul className="flex flex-nowrap items-center justify-center gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2">
            {showcase.featureHighlights.map((label) => (
              <li
                key={label}
                className="shrink-0 rounded-full border border-foreground/15 bg-foreground/[0.03] px-2 py-0.5 font-mono text-[0.625rem] tracking-wide whitespace-nowrap text-foreground/90 sm:px-2.5 sm:py-1 sm:text-xs"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>

      <div className="showcase-rows mx-auto my-2 flex w-full min-h-0 max-w-5xl flex-col gap-3 border-t border-foreground/10 pt-2 md:my-3 md:gap-4 md:pt-3">
        {channels.map((channel, index) => {
          const list = shotsForPlatform(screenshots, channel.platform);
          const hero =
            findShot(screenshots, channel.heroScreenshotId) ?? list[0];
          if (!hero) return null;

          return (
            <div key={channel.platform}>
              {index > 0 && (
                <hr className="mb-3 border-foreground/10 md:mb-4" aria-hidden />
              )}
              <ChannelStripRow
                channel={channel}
                hero={hero}
                galleryCount={list.length}
                onOpenGallery={() => openGallery(channel.platform)}
              />
            </div>
          );
        })}
      </div>

      {(showcase.techStackLine || showcase.integrationsLine) && (
        <div className="tech-stack-footer mx-auto shrink-0 max-w-2xl space-y-0.5 px-2 pt-3 pb-2 text-center font-serif text-[0.6875rem] leading-relaxed text-muted-foreground md:pt-4 md:pb-4 md:text-xs">
          {showcase.techStackLine && <p>{showcase.techStackLine}</p>}
          {showcase.integrationsLine && <p>{showcase.integrationsLine}</p>}
        </div>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange} modal="trap-focus">
        <DialogContent
          showCloseButton
          overlayClassName="bg-black/40 max-sm:bg-black/50"
          className="flex max-h-[92dvh] flex-col overflow-hidden border-foreground/15 bg-background p-0 max-sm:max-w-[calc(100%-1rem)] sm:max-w-4xl"
        >
          {active && (
            <>
              <DialogTitle className="sr-only">{active.alt}</DialogTitle>
              <div className="relative min-h-0 flex-1 overflow-y-auto">
                <div className="relative w-full bg-foreground/[0.06]">
                  {canNavigate && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Previous screenshot"
                        className={cn(
                          "absolute top-1/2 left-2 z-10 size-11 min-h-11 min-w-11 -translate-y-1/2 rounded-full border-foreground/20 bg-background/90 shadow-sm backdrop-blur-sm",
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
                          "absolute top-1/2 right-2 z-10 size-11 min-h-11 min-w-11 -translate-y-1/2 rounded-full border-foreground/20 bg-background/90 shadow-sm backdrop-blur-sm",
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
                    className="h-auto max-h-[52dvh] w-full object-contain object-center sm:max-h-[58dvh]"
                    sizes="(max-width: 768px) 100vw, 896px"
                    priority
                  />
                </div>
                <div className="border-t border-foreground/10 px-4 py-3 sm:px-6 sm:py-4">
                  {canNavigate && (
                    <p className="mb-2 text-center font-mono text-[0.6875rem] tabular-nums tracking-[0.2em] text-muted-foreground sm:text-xs">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(galleryShots.length).padStart(2, "0")}
                      <span className="mx-2 hidden text-foreground/20 md:inline">·</span>
                      <span className="hidden tracking-normal text-foreground/50 md:inline">
                        Arrow keys to browse
                      </span>
                    </p>
                  )}
                  <p className="font-serif text-sm leading-relaxed text-foreground/95 sm:text-base sm:leading-relaxed">
                    {captionLine(active.description)}
                  </p>
                </div>
              </div>
              {canNavigate && (
                <div className="shrink-0 border-t border-foreground/10 bg-foreground/[0.02] px-3 py-2 sm:px-4">
                  <div className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {galleryShots.map((shot, index) => (
                      <button
                        key={shot.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`View ${shot.alt}`}
                        aria-current={index === activeIndex ? "true" : undefined}
                        className={cn(
                          "relative h-11 w-[4.5rem] shrink-0 overflow-hidden rounded border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30",
                          index === activeIndex
                            ? "border-foreground/40 ring-1 ring-foreground/20"
                            : "border-foreground/15 opacity-80 hover:opacity-100",
                        )}
                      >
                        <Image
                          src={shot.src}
                          alt=""
                          fill
                          unoptimized
                          className="object-cover object-center"
                          sizes="72px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
