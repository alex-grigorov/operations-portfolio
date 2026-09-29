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
    "Operations & Logistics Specialist · Freight Dispatch & CRM Systems",
  location: "Pernik, Bulgaria · Open to remote",
  openTo: [
    "Account management & retention",
    "Customer success & client operations",
    "CRM & RevOps workflows (HubSpot)",
    "Dispatch & logistics coordination",
    "Crypto / trading-adjacent teams (Telegram-first)",
  ],
  email: "contact@alex-grigorov.com",
  phone: "",
  /** Header icon + contact row — with or without @ */
  telegram: "alexgrigorov12",
  linkedIn: "https://www.linkedin.com/in/alex-grigorov/",
  github: "https://github.com/alex-grigorov",
  socialLinks: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/alex-grigorov/",
      label: "LinkedIn",
    },
    {
      platform: "github",
      url: "https://github.com/alex-grigorov",
      label: "GitHub",
    },
    {
      platform: "email",
      url: "mailto:contact@alex-grigorov.com",
      label: "Email",
    },
  ],
  summary:
    "Operations and logistics specialist with hands-on freight dispatch, account coordination, and CRM-style client operations. Progressed from senior dispatch into operations analyst work on logistics and account data for a US-based carrier environment. Built and shipped AI-assisted internal ops tools—web hub and driver mobile workflows—used in production dispatch. Fluent English; based in Pernik, Bulgaria. Open to remote operations, logistics, CRM, and customer success roles.",
  skills: [
    {
      label: "Operations & logistics",
      items: [
        "Dispatch & freight coordination",
        "Account & client coordination",
        "Logistics tracking & reporting",
        "Broker & carrier communication",
        "Escalation handling · phone · email · messaging",
        "Operational reporting & dashboards",
        "Client database & account data accuracy",
      ],
    },
    {
      label: "Tools",
      items: [
        "Microsoft Excel · Google Workspace",
        "HubSpot CRM (in progress)",
        "TMS systems · Samsara",
        "Telegram",
        "AI-assisted internal systems",
      ],
    },
    {
      label: "Professional",
      items: [
        "Remote & hybrid work",
        "Cross-functional coordination",
        "Detail-oriented under pressure",
      ],
    },
  ],
  experience: [
    {
      company: "Geo Logistics LLC (Roseville, MI)",
      title: "Operations Analyst · Logistics & Account Data (Remote)",
      location: "Pernik, Bulgaria",
      start: "Jul 2026",
      end: "Sep 2026",
      highlights: [
        "Owned account data quality, dispatch-adjacent reporting, and cross-team workflow clarity for live freight operations.",
        "Primary point of contact for account updates, schedule changes, route issues, and escalations.",
        "Maintained accurate load and client records across internal dashboards and partner TMS tools.",
        "Supported dispatch and booking workflows with structured daily logs and operational reporting.",
      ],
    },
    {
      company: "Dispatch On Demand",
      title: "Senior Dispatcher & Operations Specialist (Hybrid)",
      location: "Pernik, Bulgaria",
      start: "Jun 2023",
      end: "Dec 2025",
      highlights: [
        "Account coordination and primary POC for high-volume clients—status, changes, and route disruptions.",
        "Real-time tracking, dashboard reporting, and load accuracy across dispatch systems.",
        "High-touch phone, email, and messaging with clients, brokers, carriers, and field operators.",
        "Booked freight and negotiated rates through delivery close-out.",
        "Built and maintained AI-assisted internal ops hub and Geo Driver mobile workflows used in production.",
      ],
    },
    {
      company: "Workhour Ltd. (Toronto, Canada)",
      title: "CRM & Client Operations Coordinator (Remote)",
      location: "Pernik, Bulgaria",
      start: "Jan 2023",
      end: "Apr 2023",
      highlights: [
        "Managed client database records and CRM-style data for outbound communications.",
        "Helped keep contact and campaign data clean and structured for operational deliverables.",
        "Supported segmented contact lists and consistent outbound messaging workflows.",
      ],
    },
    {
      company: "AQ Electric AD",
      title: "Electrical Assembly Operator (On-site)",
      location: "Pernik, Bulgaria",
      start: "Jun 2022",
      end: "Nov 2022",
      highlights: [
        "Executed precision assembly workflows under strict QA standards and tight production deadlines.",
        "Coordinated with team leads and QA to keep line quality and throughput on target.",
        "Maintained accurate production and inventory logs for shift handoffs.",
      ],
    },
    {
      company: "Largo International Ltd.",
      title: "Gas Station Sales & Operations (On-site)",
      location: "Pernik, Bulgaria",
      start: "Mar 2018",
      end: "May 2022",
      highlights: [
        "Managed high-volume front-line service—POS, cash/card transactions, and daily customer interactions.",
        "Resolved on-site customer complaints calmly during peak periods.",
        "Oversaw inventory, forecourt safety, and accurate shift handoffs.",
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
      school: "\"Simeon Radev\" Foreign Language High School · Pernik, Bulgaria",
      credential: "High School Diploma · Foreign Languages",
      year: "2012 – 2017",
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
