type FormatExperienceMetaOptions = {
  /** Use non-breaking spaces for single-line desktop grid cells. */
  compact?: boolean;
};

/** Meta line for experience cards — optional NBSP compaction on wider layouts. */
export function formatExperienceMeta(
  text: string,
  options: FormatExperienceMetaOptions = {},
): string {
  if (!options.compact) return text;
  return text.replace(/ /g, "\u00A0");
}
