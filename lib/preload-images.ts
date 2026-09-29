import { showcaseImageCandidates } from "@/lib/showcase-image";

/** Warm browser cache for image URLs (safe to call repeatedly). */
export function preloadImages(urls: string[]) {
  if (typeof window === "undefined") return;

  const unique = new Set<string>();
  for (const src of urls) {
    for (const candidate of showcaseImageCandidates(src)) {
      unique.add(candidate);
    }
  }

  for (const src of unique) {
    const img = new window.Image();
    img.decoding = "async";
    img.src = src;
  }
}
