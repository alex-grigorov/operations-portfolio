# Remote job portfolio & resume

A small Next.js site for a **remote job search**: landing page, **print/PDF resume**, project case studies (including internal tools), and a demo of AI-style resume bullet drafting.

## Quick start

1. Edit **`content/profile.ts`** with your name, contact info, experience, and projects.
2. Run the dev server:

```bash
npm install
npm run dev -- -p 43123
```

3. Open `/resume` and use **Save as PDF (print)** → choose “Save as PDF” in the print dialog.

## Should you use a website?

For remote roles, a **clean link** (this site or GitHub Pages/Vercel) helps when recruiters skim before a screen. You still need a **one-page PDF resume** for ATS uploads — the `/resume` route is formatted for that.

You **can** showcase the dispatch app you built at a previous employer if you:

- Describe **your** contribution and outcomes, not the company’s secrets.
- Use **redacted screenshots** (no customer PII, credentials, or live internal URLs unless you have permission).
- Label it **“Internal operations platform (former employer)”** and offer to walk through architecture in an interview.

When in doubt, ask your former manager in writing if a anonymized portfolio case study is OK.

## Deploy

```bash
npm run build
```

Deploy to [Vercel](https://vercel.com) or any Node host. Set your custom domain on the resume and LinkedIn.

## Project structure

| Path | Purpose |
|------|---------|
| `content/profile.ts` | Single source of truth for CV + site |
| `/` | Portfolio landing |
| `/resume` | Printable CV |
| `/projects/[slug]` | Case studies |
