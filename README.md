# Remote job portfolio + resume PDF

Minimal personal site: **one featured project** (Geo Logistics Dispatch), **printable resume** for job boards.

## Run locally

```bash
npm install
npm run dev -- -p 43123
```

Open http://localhost:43123

## Before you apply anywhere

1. Edit **`content/profile.ts`** — name, email, LinkedIn, dates, stack. Keep **`phone` empty** for the public site CV (no number on the download).
2. **Public download:** `public/downloads/Alex-Grigorov-CV-X.pdf` — Enhancv export (phone: *Available on request*). **Download CV (PDF)** on Contact and `/resume` serves this file. Copy from your PC into that path, commit, and push.
3. Go to **`/resume`**:
   - **Print → Save as PDF** — best for Indeed / LinkedIn (text stays selectable for ATS).
   - **Download PDF** — uses the static file above (falls back to on-page render if missing).

## Showcasing Geo Logistics Dispatch

The login screenshot lives in `public/projects/`. You can list this on your resume and portfolio even after leaving the company if you describe **your work**, avoid live credentials, and skip customer PII. The case study page explains that for recruiters.

Showcase screenshots are served as **WebP** (see `content/snap-sections.ts`). After replacing PNGs in `public/projects/`, regenerate with:

```bash
npm run convert:webp
```

## Deploy

```bash
npm run build
```

Deploy to Vercel (or similar) and put the URL on LinkedIn and your resume header.
