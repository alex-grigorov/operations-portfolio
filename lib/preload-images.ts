/** Warm browser cache for image URLs (safe to call repeatedly). */
export function preloadImages(urls: string[]) {
  if (typeof window === "undefined") return;

  for (const src of urls) {
    if (!src) continue;
    const img = new window.Image();
    img.decoding = "async";
    img.src = src;
  }
}
