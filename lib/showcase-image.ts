/** PNG master path when a WebP showcase asset fails to load. */
export function showcaseImageFallbackSrc(src: string): string {
  return src.replace(/\.webp$/i, ".png");
}

export function showcaseImageCandidates(src: string): string[] {
  if (/\.webp$/i.test(src)) {
    return [src, showcaseImageFallbackSrc(src)];
  }
  return [src];
}
