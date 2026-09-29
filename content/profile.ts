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
  screenshot?: string;
  screenshotCaption?: string;
  highlights: string[];
  showcaseNotes: string;
  internalOnly?: boolean;
};

export type Certification = {
  name: string;
  issuer: string;
  year?: string;
};

export type SocialPlatform =
  | "linkedin"
  | "github"
  | "email"
  | "telegram"
  | "x"
  | "instagram"
  | "globe";

export type SocialLink = {
  platform: SocialPlatform;
  /** Full URL, or mailto:you@email.com for email */
  url: string;
  label: string;
};

export type Profile = {
  name: string;
  headline: string;
  location: string;
  openTo: string[];
  email: string;
  phone: string;
  /** e.g. @username — shown on contact & résumé when set */
  telegram: string;
  linkedIn: string;
  github: string;
  /** Top-right icons — leave url empty to hide a link */
  socialLinks: SocialLink[];
  summary: string;
  skills: { label: string; items: string[] }[];
  experience: Experience[];
  projects: Project[];
  education: { school: string; credential: string; year: string }[];
  certifications: Certification[];
};

export const profile: Profile = {
  name: "Alex Grigorov",
  headline:
    "Operations & client success · high-volume coordination · systems builder",
  location: "Near Sofia, Bulgaria · Open to remote",
  openTo: [
    "Account management & retention (remote)",
    "Customer success & client operations",
    "CRM / RevOps coordination (HubSpot and similar)",
    "Dispatch, logistics & operations coordination",
    "Crypto / trading-adjacent remote teams (Telegram-first comms)",
  ],
  email: "",
  phone: "",
  /** Header icon + contact row — with or without @ */
  telegram: "yourusername",
  linkedIn: "https://linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
  socialLinks: [
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/your-profile",
      label: "LinkedIn",
    },
    {
      platform: "github",
      url: "https://github.com/your-username",
      label: "GitHub",
    },
    {
      platform: "email",
      url: "mailto:you@email.com",
      label: "Email",
    },
  ],
  summary:
    "Performance-driven operations and client-success specialist with three years in high-volume dispatch and live account coordination—real-time updates, escalations, multi-channel communication, and accurate records across dashboards and partner systems. Built and deployed an internal operations hub and driver mobile app (API integrations, notifications, workflows) using AI-assisted development. Fluent English; based near Sofia, Bulgaria. Seeking remote roles in account management, retention, customer success, CRM operations, logistics, and fast-paced remote teams—including crypto-adjacent environments.",
  skills: [
    {
      label: "Client & account operations",
      items: [
        "Account coordination & follow-through",
        "Escalation handling & issue resolution",
        "High-touch phone, email & messaging",
        "Data hygiene across platforms",
        "Retention-minded service under SLA pressure",
      ],
    },
    {
      label: "Platforms & systems",
      items: [
        "HubSpot CRM (hands-on practice; certification in progress)",
        "Logistics TMS / GPS / ELD (Sylectus, Samsara)",
        "Google Workspace · Excel (sort/filter, lookups)",
        "Telegram & Discord for remote comms",
        "AI-assisted build: Next.js, React, TypeScript, APIs",
      ],
    },
    {
      label: "Professional strengths",
      items: [
        "Cross-functional coordination",
        "Structured logging & reporting",
        "Process improvement from the floor",
        "Quick learner on new SaaS tools",
      ],
    },
  ],
  experience: [
    {
      company: "Dispatch On Demand · Geo Logistics LLC",
      title: "Dispatch Specialist · Operations Coordinator",
      location: "Hybrid · US freight hauling",
      start: "2023",
      end: "2026",
      highlights: [
        "Geo Logistics LLC—US-based freight hauling operation.",
        "Primary point of contact for high-volume accounts—live status, schedule changes, and route disruptions.",
        "Maintained accurate account data across internal dashboards and partner systems.",
        "High-touch communication via phone, email, and messaging with clients, brokers, and field operators.",
        "Built structured daily logs and updates; improved handoffs between ops, management, and partners.",
        "Built and maintained internal operations hub and Geo Driver mobile app used in production.",
      ],
    },
    {
      company: "",
      title: "Public Relations · Client Communications",
      location: "Bulgaria",
      start: "2021",
      end: "2023",
      highlights: [
        "Managed client-facing communication assets, campaign metrics, and stakeholder reporting.",
        "Press releases and media materials with accuracy and visual quality.",
        "Targeted distribution aligned to client communication strategy.",
      ],
    },
    {
      company: "AQ Electric AD",
      title: "Electrical Assembly & Quality Technician",
      location: "Pernik, Bulgaria",
      start: "2019",
      end: "2021",
      highlights: [
        "Technical workflows under strict QA and production deadlines.",
        "Coordinated with team leads to reduce line errors and bottlenecks.",
        "Documented inventories and production logs with high accuracy.",
      ],
    },
    {
      company: "",
      title: "Gas Station Sales & Operations",
      location: "Pernik, Bulgaria",
      start: "2018",
      end: "2019",
      highlights: [
        "Direct service to high daily customer volume; POS and transaction accuracy.",
        "Resolved on-site complaints and maintained professional service standards.",
        "Inventory, forecourt safety, and facility standards.",
      ],
    },
  ],
  projects: [
    {
      slug: "fleet-operations-hub",
      title: "Custom operations & visibility platform",
      summary:
        "Internal hub and mobile app—dashboards, alerts, integrations, and field workflows (originally for fleet/logistics; demonstrates systems skills applicable to CRM and client ops).",
      role: "Sole builder — requirements through deployment",
      stack: ["Next.js", "React", "TypeScript", "Mapbox", "REST APIs"],
      internalOnly: true,
      highlights: [
        "Unified data from multiple systems into one workspace with role-based access.",
        "Notifications, pipelines-style statuses, and mobile submissions from the field.",
        "Delivered with AI-assisted development and production API integrations.",
      ],
      showcaseNotes: "Detailed screenshots on portfolio home (section 04).",
    },
    {
      slug: "hubspot-crm-practice",
      title: "CRM & sales operations (HubSpot — hands-on practice)",
      summary:
        "Self-directed HubSpot configuration to mirror real account workflows: pipelines, segmentation, and task automation.",
      role: "Independent learning project",
      stack: ["HubSpot CRM", "Lists", "Workflows", "Deal pipelines"],
      highlights: [
        "Configured deal pipelines and stages aligned to account lifecycle.",
        "Built contact lists/segments and task-tracking for follow-ups.",
        "Practiced workflow automation for reminders and handoffs.",
      ],
      showcaseNotes: "Add HubSpot Academy certification to profile when complete.",
    },
  ],
  education: [
    {
      school: "Pernik, Bulgaria",
      credential: "Secondary education",
      year: "",
    },
  ],
  certifications: [
    {
      name: "HubSpot Sales Software & CRM",
      issuer: "HubSpot Academy",
      year: "",
    },
  ],
};

export function getProject(slug: string): Project | undefined {
  return profile.projects.find((p) => p.slug === slug);
}
