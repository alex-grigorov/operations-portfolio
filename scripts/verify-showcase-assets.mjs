import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const snapPath = path.join(root, "content/snap-sections.ts");
const projectsDir = path.join(root, "public/projects");
const text = fs.readFileSync(snapPath, "utf8");
const srcMatches = [...text.matchAll(/src: "(\/projects\/[^"]+)"/g)].map((m) => m[1]);

let missing = 0;
for (const src of srcMatches) {
  const rel = src.replace(/^\//, "");
  const diskPath = path.join(root, "public", rel.replace(/^projects\//, "projects/"));
  const pngFallback = diskPath.replace(/\.webp$/i, ".png");

  if (!fs.existsSync(diskPath)) {
    console.error(`Missing asset: ${src} (expected at ${diskPath})`);
    missing += 1;
    continue;
  }

  if (!fs.existsSync(pngFallback)) {
    console.warn(`Warning: PNG fallback missing for ${src}`);
  }
}

if (missing > 0) {
  console.error(`\n${missing} showcase asset(s) missing.`);
  process.exit(1);
}

console.log(`Verified ${srcMatches.length} showcase image paths.`);
