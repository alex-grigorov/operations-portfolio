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

type FleetShowcaseGalleryProps = {
  showcase: ProjectShowcase;
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
  showDivider?: boolean;
};

function ChannelStripRow({
  channel,
  hero,
  galleryCount,
  onOpenGallery,
  showDivider,
}: ChannelStripRowProps) {
  const isMobile = channel.platform === "mobile";

  return (
    <>
      {showDivider && (
        <div
          className="h-px w-full max-w-md bg-foreground/10 sm:max-w-none"
          aria-hidden
        />
      )}
      <div className="feature-row grid w-full grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-8">
        <div className="feature-text flex w-full flex-col gap-2 text-left md:col-span-5 md:max-w-[350px] md:justify-self-start">
          <p className="font-mono text-[0.625rem] font-medium tracking-[0.22em] text-foreground uppercase sm:text-[0.6875rem]">
            {channel.title}
          </p>
          <p className="font-serif text-xs leading-snug text-foreground/90 sm:text-sm">
            {channel.caption}
          </p>
          <button
            type="button"
            onClick={onOpenGallery}
            className="inline-flex w-fit items-center gap-1 font-mono text-[0.625rem] tracking-wide text-foreground underline-offset-4 transition hover:text-foreground/80 hover:underline sm:text-xs"
          >
            View {channel.platform === "web" ? "web" : "mobile"} gallery (
            {galleryCount})
            <ArrowRight className="size-3.5 shrink-0" aria-hidden />
          </button>
        </div>

        <div
          className={cn(
            "flex items-center justify-center md:col-span-7 md:justify-end",
            isMobile && "md:justify-end",
          )}
        >
          <button
            type="button"
            onClick={onOpenGallery}
            aria-label={`Open ${channel.title} gallery — ${hero.alt}`}
            className={cn(
              "group shrink-0 overflow-hidden rounded-lg border border-foreground/15 bg-foreground/[0.02] shadow-[0_6px_15px_rgba(0,0,0,0.08)] transition hover:border-foreground/30 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30",
              isMobile
                ? "w-[168px] sm:w-[180px]"
                : "w-full max-w-[400px] md:max-w-[420px]",
            )}
          >
          <div
            className={cn(
              "relative w-full bg-muted/20",
              isMobile ? "aspect-[9/16]" : "aspect-[16/10]",
            )}
          >
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              unoptimized
              className={cn(
                "rounded-lg transition duration-200 group-hover:opacity-95",
                isMobile ? "object-cover object-top" : "object-cover object-center",
              )}
              sizes={isMobile ? "180px" : "420px"}
            />
          </div>
          </button>
        </div>
      </div>
    </>
  );
}

export function FleetShowcaseGallery({ showcase }: FleetShowcaseGalleryProps) {
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
    setGalleryPlatform(platform);
    setActiveIndex(0);
  }

  function handleOpenChange(next: boolean) {
    if (!next) setGalleryPlatform(null);
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
      <p className="mx-auto mt-2 max-w-2xl text-center font-serif text-xs leading-snug text-foreground/90 sm:mt-3 sm:text-sm sm:leading-relaxed">
        {showcase.summary}
      </p>

      {showcase.featureHighlights && showcase.featureHighlights.length > 0 && (
        <div className="mx-auto mt-2 w-full max-w-5xl sm:mt-3">
          <ul className="flex flex-nowrap items-center justify-center gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2">
            {showcase.featureHighlights.map((label) => (
              <li
                key={label}
                className="shrink-0 rounded-full border border-foreground/15 bg-foreground/[0.03] px-2 py-0.5 font-mono text-[0.5625rem] tracking-wide whitespace-nowrap text-foreground/90 sm:px-2.5 sm:py-1 sm:text-[0.625rem]"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="slide-4-previews mx-auto mt-3 flex w-full max-w-6xl flex-col items-stretch gap-10 border-t border-foreground/10 pt-4 sm:mt-4 sm:gap-12 sm:pt-5">
        {channels.map((channel, index) => {
          const list = shotsForPlatform(screenshots, channel.platform);
          const hero =
            findShot(screenshots, channel.heroScreenshotId) ?? list[0];
          if (!hero) return null;

          return (
            <ChannelStripRow
              key={channel.platform}
              channel={channel}
              hero={hero}
              galleryCount={list.length}
              showDivider={index > 0}
              onOpenGallery={() => openGallery(channel.platform)}
            />
          );
        })}
      </div>

      {(showcase.techStackLine || showcase.integrationsLine) && (
        <div className="tech-stack-footer mx-auto mt-6 max-w-2xl space-y-1 border-t border-foreground/10 pt-6 pb-10 text-center font-serif text-[0.6875rem] leading-relaxed text-muted-foreground sm:mt-8 sm:pb-12 sm:text-xs">
          {showcase.techStackLine && <p>{showcase.techStackLine}</p>}
          {showcase.integrationsLine && <p>{showcase.integrationsLine}</p>}
        </div>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton
          className="flex max-h-[92vh] flex-col overflow-hidden border-foreground/15 bg-background p-0 sm:max-w-4xl"
        >
          {active && (
            <>
              <DialogTitle className="sr-only">{active.alt}</DialogTitle>
              <div className="relative min-h-0 flex-1 overflow-y-auto">
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
                    className="h-auto max-h-[52vh] w-full object-contain object-center sm:max-h-[58vh]"
                    sizes="(max-width: 768px) 100vw, 896px"
                    priority
                  />
                </div>
                <div className="border-t border-foreground/10 px-4 py-3 sm:px-6 sm:py-4">
                  {canNavigate && (
                    <p className="mb-2 text-center font-mono text-[0.6875rem] tabular-nums tracking-[0.2em] text-muted-foreground sm:text-xs">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(galleryShots.length).padStart(2, "0")}
                      <span className="mx-2 text-foreground/20">·</span>
                      <span className="tracking-normal text-foreground/50">
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
    </>
  );
}
