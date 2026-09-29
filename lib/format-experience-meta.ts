/** Single-line meta in narrow grid cells — no orphan wraps on dates or locations. */
export function formatExperienceMeta(text: string): string {
  return text.replace(/ /g, "\u00A0");
}
