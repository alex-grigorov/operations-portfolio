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

export type SocialPlatform =
  | "linkedin"
  | "github"
  | "email"
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
  linkedIn: string;
  github: string;
  /** Top-right icons — leave url empty to hide a link */
  socialLinks: SocialLink[];
  summary: string;
  skills: { label: string; items: string[] }[];
  experience: Experience[];
  projects: Project[];
  education: { school: string; credential: string; year: string }[];
};

export const profile: Profile = {
  name: "Alex Grigorov",
  headline: "Dispatch & fleet operations · AI-assisted ops platform builder",
  location: "Near Sofia, Bulgaria · Open to remote",
  openTo: [
    "Remote dispatch & fleet operations",
    "Logistics coordination",
    "Operations roles open to learning new tools",
  ],
  email: "",
  phone: "",
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
    "Dispatch and fleet operations professional with three years coordinating loads, drivers, and compliance workflows (Sylectus TMS, Samsara GPS, ELD). Built and deployed an internal Fleet Operations Hub and Geo Driver mobile app using AI-assisted development—unifying TMS, telematics, and field workflows via API integrations. Based near Sofia, Bulgaria; seeking remote roles in logistics and open to other industries where I can learn quickly and deliver results.",
  skills: [
    {
      label: "Operations",
      items: [
        "Truck dispatch & load booking",
        "Carrier / broker communication",
        "Sylectus (TMS)",
        "Samsara fleet GPS",
        "ELD & compliance workflows",
        "Trailer & yard tracking",
      ],
    },
    {
      label: "Technical",
      items: [
        "AI-assisted development (Cursor, ChatGPT)",
        "Next.js · React · TypeScript",
        "REST / API integrations",
        "Mapbox · operational dashboards",
        "Mobile driver app (Android & iOS)",
      ],
    },
  ],
  experience: [
    {
      company: "",
      title: "Truck Dispatcher & Fleet Operations",
      location: "Remote",
      start: "2022",
      end: "Present",
      highlights: [
        "Coordinated loads, drivers, and day-to-day fleet operations for three years.",
        "Used Sylectus, Samsara, and ELD systems daily for booking, tracking, and compliance.",
        "Negotiated rates with carriers and brokers; tracked freight through pickup and delivery.",
        "Built and maintained an internal operations hub and driver mobile app used in production.",
      ],
    },
    {
      company: "",
      title: "Public Relations Coordinator",
      location: "Bulgaria",
      start: "—",
      end: "—",
      highlights: [
        "Supported PR campaigns with research, metrics, and client-facing reports.",
        "Drafted press releases and promotional materials; ensured accuracy and visual quality.",
        "Distributed releases to targeted media outlets.",
      ],
    },
    {
      company: "",
      title: "Electrical Assembly Operator",
      location: "Bulgaria",
      start: "—",
      end: "—",
      highlights: [
        "Assembled high- and low-voltage cabinets and panels from schematics.",
        "Installed wiring, terminal blocks, breakers, and relay systems.",
        "Performed ISO-aligned inspections; operated crimping and line machinery.",
      ],
    },
    {
      company: "",
      title: "Gas Station Sales & Forecourt Associate",
      location: "Bulgaria",
      start: "—",
      end: "—",
      highlights: [
        "Operated POS (cash, card, mobile) and balanced drawers.",
        "Managed forecourt fueling, pumps, and safety protocols.",
        "Handled inventory, restocking, and facility standards.",
      ],
    },
  ],
  projects: [
    {
      slug: "fleet-operations-hub",
      title: "Fleet Operations Hub & Geo Driver App",
      summary:
        "Internal dispatch platform and companion mobile app integrating Sylectus, Samsara, Mapbox, and driver field workflows.",
      role: "Sole builder — requirements through deployment",
      stack: ["Next.js", "React", "TypeScript", "Mapbox", "Sylectus API", "Samsara"],
      internalOnly: true,
      highlights: [
        "Unified TMS, GPS, ELD, compliance imports, fleet map, trailer management, and notifications.",
        "Geo Driver (Android/iOS): documents, inspections, arrivals, navigation, and dispatch alerts.",
        "Delivered with AI-assisted development (Cursor, ChatGPT) and production API integrations.",
      ],
      showcaseNotes: "Showcased on portfolio; built for prior employer internal use.",
    },
  ],
  education: [
    {
      school: "Bulgaria",
      credential: "High school diploma",
      year: "",
    },
  ],
};

export function getProject(slug: string): Project | undefined {
  return profile.projects.find((p) => p.slug === slug);
}
