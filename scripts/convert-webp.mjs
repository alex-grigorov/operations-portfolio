import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const directory = path.join(process.cwd(), "public", "projects");
const quality = Number(process.env.WEBP_QUALITY ?? 85);

const files = fs.readdirSync(directory).filter((file) => file.endsWith(".png"));

if (files.length === 0) {
  console.log("No PNG files found in public/projects");
  process.exit(0);
}

await Promise.all(
  files.map(async (file) => {
    const inputPath = path.join(directory, file);
    const outputPath = path.join(directory, file.replace(/\.png$/i, ".webp"));
    await sharp(inputPath).webp({ quality }).toFile(outputPath);
    const inStat = fs.statSync(inputPath);
    const outStat = fs.statSync(outputPath);
    const saved = ((1 - outStat.size / inStat.size) * 100).toFixed(1);
    console.log(
      `Converted ${file} -> ${path.basename(outputPath)} (${saved}% smaller)`,
    );
  }),
);

console.log(`Done. ${files.length} file(s) at quality ${quality}.`);
