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
  /** Public URL if you have one; omit for internal tools */
  liveUrl?: string;
  /** Case-study bullets — use outcomes, not confidential data */
  highlights: string[];
  /** How to present work from a past employer */
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

/** Edit this file — it drives the site and printable resume. */
export const profile: Profile = {
  name: "Your Name",
  headline: "Software engineer · AI-assisted product development",
  location: "City, Country · Open to remote",
  openTo: ["Full-time remote", "Contract", "US / EU time zones"],
  email: "you@email.com",
  phone: "+1 000 000 0000",
  linkedIn: "https://linkedin.com/in/your-handle",
  github: "https://github.com/your-handle",
  summary:
    "Engineer who ships web products end-to-end — from dispatch and operations tools to customer-facing apps. Comfortable pairing modern frameworks with AI-assisted workflows (spec → implementation → review) while keeping quality, security, and maintainability in focus.",
  skills: [
    {
      label: "Core",
      items: ["TypeScript", "React", "Next.js", "Node.js", "REST APIs", "SQL"],
    },
    {
      label: "AI & tooling",
      items: [
        "Cursor / agentic coding",
        "Prompt design for dev tasks",
        "Evaluating model output",
        "Documentation from code",
      ],
    },
    {
      label: "Delivery",
      items: ["CI/CD", "Code review", "Stakeholder demos", "Internal tools"],
    },
  ],
  experience: [
    {
      company: "Previous employer (update me)",
      title: "Software Engineer",
      location: "Remote",
      start: "2023",
      end: "2025",
      highlights: [
        "Built and maintained an internal dispatch web app used by operations daily.",
        "Reduced manual coordination by automating status updates and assignment views.",
        "Collaborated with non-technical stakeholders to iterate on workflows.",
      ],
    },
    {
      company: "Earlier role (optional)",
      title: "Developer",
      location: "On-site / Hybrid",
      start: "2021",
      end: "2023",
      highlights: [
        "Replace this block or delete it once you add real history.",
      ],
    },
  ],
  projects: [
    {
      slug: "dispatch-operations-platform",
      title: "Internal dispatch & operations platform",
      summary:
        "Web application for coordinating field dispatch — schedules, assignments, and status tracking for internal teams.",
      role: "Primary builder / full-stack contributor (update to match your role)",
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Update stack"],
      highlights: [
        "Designed role-based views so dispatchers and managers see the right data without clutter.",
        "Integrated real-time or near-real-time updates for assignment state (describe what you actually shipped).",
        "Handled edge cases in routing and handoffs that previously lived in spreadsheets.",
      ],
      internalOnly: true,
      showcaseNotes:
        "You can list this project even after leaving the company if you describe your contribution honestly, avoid secrets (credentials, customer PII, proprietary algorithms), and use sanitized screenshots or a redacted demo. A one-page case study on your portfolio often works better than a live link recruiters cannot access.",
    },
    {
      slug: "ai-dev-workflow",
      title: "AI-assisted development portfolio (this site)",
      summary:
        "Personal site with printable resume, project case studies, and a small interactive demo of structured AI-style output for job materials.",
      role: "Solo project",
      stack: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
      liveUrl: undefined,
      highlights: [
        "Single source of truth in content/profile.ts for resume and web.",
        "Print-optimized resume route for PDF export from the browser.",
        "Demonstrates how you communicate about AI tooling to hiring managers.",
      ],
      showcaseNotes:
        "Use this to show you can ship polished UI quickly — relevant for remote hiring loops that skim links before interviews.",
    },
  ],
  education: [
    {
      school: "Your university or bootcamp",
      credential: "Degree or certificate",
      year: "Year",
    },
  ],
};

export function getProject(slug: string): Project | undefined {
  return profile.projects.find((p) => p.slug === slug);
}
