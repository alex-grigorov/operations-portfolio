# Remote job portfolio + resume PDF

Minimal personal site: **one featured project** (Geo Logistics Dispatch), **printable resume** for job boards.

## Run locally

```bash
npm install
npm run dev -- -p 43123
```

Open http://localhost:43123

## Before you apply anywhere

1. Edit **`content/profile.ts`** — your name, email, phone, LinkedIn, dates, and stack.
2. Go to **`/resume`**:
   - **Print → Save as PDF** — best for Indeed / LinkedIn (text stays selectable for ATS).
   - **Download PDF for job boards** — quick file when a form only wants a PDF attachment.

## Showcasing Geo Logistics Dispatch

The login screenshot lives in `public/projects/`. You can list this on your resume and portfolio even after leaving the company if you describe **your work**, avoid live credentials, and skip customer PII. The case study page explains that for recruiters.

## Deploy

```bash
npm run build
```

Deploy to Vercel (or similar) and put the URL on LinkedIn and your resume header.
