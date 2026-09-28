export type Experience = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  liveUrl?: string;
  /** Path under /public for portfolio screenshots */
  screenshot?: string;
  screenshotCaption?: string;
  highlights: string[];
  showcaseNotes: string;
  internalOnly?: boolean;
};

export type Profile = {
  name: string;
  headline: string;
  location: string;
  openTo: string[];
  email: string;
  phone: string;
  linkedIn: string;
  github: string;
  summary: string;
  skills: { label: string; items: string[] }[];
  experience: Experience[];
  projects: Project[];
  education: { school: string; credential: string; year: string }[];
};

/**
 * Replace placeholders with your real details before applying to jobs.
 * The site and downloadable PDF both read from this file.
 */
export const profile: Profile = {
  name: "Your Name",
  headline: "Full-stack developer · logistics & internal tools · open to remote",
  location: "United States · Remote only",
  openTo: [
    "Full-time remote",
    "Junior / mid-level software roles",
    "Fast learner — ready to ramp on your stack",
  ],
  email: "you@email.com",
  phone: "+1 (000) 000-0000",
  linkedIn: "https://linkedin.com/in/your-handle",
  github: "https://github.com/your-handle",
  summary:
    "Developer who shipped a production dispatch platform for logistics operations — map-backed UI, multi-method sign-in, and workflows for internal teams. Looking for a legitimate remote role where I can contribute immediately, learn your codebase, and grow with the team.",
  skills: [
    {
      label: "Development",
      items: [
        "JavaScript / TypeScript",
        "React",
        "Web APIs",
        "SQL",
        "Git",
        "Update with your stack",
      ],
    },
    {
      label: "Product & ops",
      items: [
        "Internal tools",
        "Dispatch / logistics UX",
        "Auth flows (password, magic link, OTP)",
        "Map-based interfaces",
      ],
    },
    {
      label: "Ways of working",
      items: [
        "AI-assisted development (Cursor)",
        "Clear communication",
        "Documentation",
        "Code review ready",
      ],
    },
  ],
  experience: [
    {
      company: "Geo Logistics (former employer — update title/dates)",
      title: "Software Developer",
      location: "Remote / Hybrid",
      start: "Start year",
      end: "End year",
      highlights: [
        "Built and maintained Geo Logistics Dispatch — internal platform for coordinating field operations.",
        "Delivered sign-in experiences (password, magic link, and code) and map-centric UI used by dispatch staff.",
        "Partnered with operations stakeholders to iterate on workflows that replaced manual coordination.",
        "Add 1–2 bullets with real metrics (time saved, users, load handled) when you have them.",
      ],
    },
  ],
  projects: [
    {
      slug: "geo-logistics-dispatch",
      title: "Geo Logistics Dispatch",
      summary:
        "Internal dispatch web application for logistics operations — branded sign-in over a live map context, built for daily use by dispatch teams.",
      role: "Developer on the team that built and shipped the product (update to your exact role)",
      stack: [
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Maps API",
        "Update stack",
      ],
      screenshot: "/projects/geo-logistics-dispatch-login.png",
      screenshotCaption:
        "Sign-in screen with map-backed context (screenshot shared for portfolio — credentials and live data not exposed).",
      internalOnly: true,
      highlights: [
        "Multi-method authentication: password, magic link, and one-time code tabs on a single sign-in flow.",
        "Operations-focused branding and dark UI designed for dispatch environments.",
        "Map-integrated login and dashboard context centered on active service regions.",
        "Production app used internally for dispatch — not a demo or tutorial project.",
      ],
      showcaseNotes:
        "Past employers often allow portfolio case studies if you stick to your contribution, avoid customer PII, and use screenshots like this login view rather than sharing accounts. You do not need to link a public login for recruiters to take you seriously.",
    },
  ],
  education: [
    {
      school: "Your school, bootcamp, or self-taught + projects",
      credential: "Degree, certificate, or relevant coursework",
      year: "Year",
    },
  ],
};

export function getProject(slug: string): Project | undefined {
  return profile.projects.find((p) => p.slug === slug);
}
