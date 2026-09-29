"use client";

import { useEffect, useState } from "react";
import { showcaseImageFallbackSrc } from "@/lib/showcase-image";
import { cn } from "@/lib/utils";

type ShowcaseScreenshotImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export function ShowcaseScreenshotImage({
  src,
  alt,
  className,
  loading = "lazy",
}: ShowcaseScreenshotImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState(src);

  useEffect(() => {
    setResolvedSrc(src);
  }, [src]);

  return (
    // Native img avoids Next/Image dimension mismatches for mixed portrait/web assets.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolvedSrc}
      alt={alt}
      decoding="async"
      loading={loading}
      draggable={false}
      onError={() => {
        setResolvedSrc((current) => {
          const fallback = showcaseImageFallbackSrc(current);
          return fallback === current ? current : fallback;
        });
      }}
      className={cn(className)}
    />
  );
}
