const MONTH =
  "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec";

/** Keep city/country and date ranges from breaking onto orphan lines in narrow grid cells. */
export function formatExperienceMeta(text: string): string {
  return text
    .replace(new RegExp(`\\b(${MONTH})\\s+(\\d{4})\\b`, "g"), "$1\u00A0$2")
    .replace(/(\d{4})\s+–\s+(\d{4})/g, "$1\u00A0–\u00A0$2")
    .replace(/, /g, ",\u00A0")
    .replace(/ – /g, "\u00A0–\u00A0")
    .replace(/ · /g, "\u00A0·\u00A0");
}
