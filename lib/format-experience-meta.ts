/** Keep city/country and date ranges from breaking onto orphan lines in narrow grid cells. */
export function formatExperienceMeta(text: string): string {
  return text
    .replace(/, /g, ",\u00A0")
    .replace(/ – /g, "\u00A0–\u00A0")
    .replace(/ · /g, "\u00A0·\u00A0");
}
