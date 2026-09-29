/**
 * Builds public/downloads/Alex-Grigorov-CV.pdf from /resume (profile.phone must stay empty).
 * Usage: start dev server, then node scripts/generate-public-cv-pdf.mjs [baseUrl]
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:43123";
const outPath = join(dirname(fileURLToPath(import.meta.url)), "../public/downloads/Alex-Grigorov-CV.pdf");

await mkdir(dirname(outPath), { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/resume`, { waitUntil: "networkidle", timeout: 120_000 });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: outPath,
    format: "Letter",
    printBackground: true,
    margin: { top: "0.45in", right: "0.5in", bottom: "0.45in", left: "0.5in" },
  });
  console.log(`Wrote ${outPath}`);
} finally {
  await browser.close();
}
