export type ExperienceEntry = {
  role: string;
  highlights: string[];
};

export type ShowcaseScreenshot = {
  id: string;
  src: string;
  alt: string;
  /** Shown under the enlarged image in the lightbox */
  description: string;
};

export type ProjectShowcase = {
  summary: string;
  screenshots: ShowcaseScreenshot[];
};

export type SnapSection = {
  id: string;
  label: string;
  title: string;
  tagline?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  titleOnly?: boolean;
  paragraphs?: string[];
  experiences?: ExperienceEntry[];
  /** Full-width row below the 2×2 grid (horizontal rule only) */
  experienceSpotlight?: ExperienceEntry;
  projectShowcase?: ProjectShowcase;
};

export const snapSections: SnapSection[] = [
  {
    id: "home",
    label: "Home",
    title: "Alex Grigorov",
    tagline: "Personal Portfolio",
  },
  {
    id: "introduction",
    label: "Introduction",
    title: "Introduction",
    paragraphs: [
      "I'm Alex Grigorov, based near Sofia, Bulgaria. I have three years of experience in truck dispatching and the full range of related fleet operations—coordinating loads and drivers, working with compliance and ELD workflows, and keeping day-to-day freight moving.",
      "In my recent role, I built an internal web operations hub myself—not as a side experiment, but as the system our team used every day. I developed it with AI-assisted tools including Cursor, ChatGPT, and others, and wired in API connections to our TMS (Sylectus), fleet GPS (Samsara), ELD logs, and additional sources so dispatch and management could access everything from one place.",
      "I'm open to remote roles in logistics and in other fields as well. I'm not tied to trucking-only work: I'm willing to learn new tools and industries and to show results quickly. I have a high school education, a strong work ethic, and I'm looking for a legitimate remote team where I can contribute and grow.",
    ],
  },
  {
    id: "experience",
    label: "Experience",
    title: "Professional Experience",
    experiences: [
      {
        role: "Gas Station Sales & Forecourt Associate",
        highlights: [
          "POS—cash, card, mobile—and drawer balancing.",
          "Forecourt fueling, pumps, and safety protocols.",
          "Inventory, restocking, and facility standards.",
        ],
      },
      {
        role: "Electrical Assembly Operator",
        highlights: [
          "High-/low-voltage cabinets and panels from schematics.",
          "Wiring, terminal blocks, breakers, and relay systems.",
          "ISO-aligned inspections; crimping and line machinery.",
        ],
      },
      {
        role: "Public Relations Coordinator",
        highlights: [
          "PR research, campaign metrics, and client reporting.",
          "Press releases and media materials for news, events, and products.",
          "Quality-checked visuals; distributed to targeted outlets.",
        ],
      },
      {
        role: "Truck Dispatcher & Fleet Operations",
        highlights: [
          "Three years coordinating loads, drivers, and day-to-day fleet operations.",
          "Daily use of Sylectus (TMS), Samsara GPS, and ELD workflows.",
          "Booked shipments, negotiated rates with carriers and brokers, and tracked freight through delivery.",
        ],
      },
    ],
    experienceSpotlight: {
      role: "AI-Assisted Development · Fleet Operations Hub",
      highlights: [
        "Self-built internal web platform that unified fleet, dispatch, and compliance data in one workspace.",
        "API integrations with Sylectus (TMS), Samsara (GPS), ELD logs, and additional operational systems.",
        "End-to-end delivery using AI-assisted development (Cursor, ChatGPT)—from requirements through deployment.",
        "Production-ready sign-in, structured data views, and workflows tailored to daily dispatch operations.",
      ],
    },
  },
  {
    id: "fleet-hub",
    label: "Project",
    title: "Fleet Operations Hub Project Showcase",
    projectShowcase: {
      summary:
        "Internal fleet and dispatch platform I built with AI-assisted development—API-connected data from Sylectus, Samsara, ELD, and other systems in one workspace. Select a preview to enlarge and read what each area does.",
      screenshots: [
        {
          id: "sign-in",
          src: "/projects/fleet-hub-sign-in.png",
          alt: "Fleet hub sign-in screen",
          description:
            "Authentication entry point with a live Mapbox map in the background, animating a route across the U.S. to give dispatch immediate geographic context. Three production-ready sign-in paths—one-time code, magic link, and password—each fully implemented and tested. Visual design aligns with company branding (logo, color, and typography) for a consistent operations-facing experience.",
        },
        {
          id: "operations-dashboard",
          src: "/projects/fleet-hub-dashboard.png",
          alt: "Operations workspace dashboard",
          description:
            "Operations workspace landing view: live fleet KPIs (total assets, availability, unassigned loads, trailer status), collaborative shift notes with @-mention tagging for handoffs between teams, maintenance alerts fed from Samsara (overdue service by asset), and integrated entry points to the work schedule and AI shift briefing—so dispatch starts from one consolidated screen.",
        },
        {
          id: "weekly-performance",
          src: "/projects/fleet-hub-weekly-performance.png",
          alt: "Weekly performance analytics",
          description:
            "Weekly performance module for completed load closeouts (Monday–Sunday, Eastern). Summary metrics for load count, loaded and deadhead miles, average closeout duration linked to Sylectus clearance-to-done workflow, and trailer tracking coverage. Includes unit-level load bars, loaded-versus-deadhead efficiency, multi-week trend comparison, and a trailer-level table for operational review.",
        },
        {
          id: "work-schedule",
          src: "/projects/fleet-hub-work-schedule.png",
          alt: "Work schedule and shift timeline",
          description:
            "Work schedule view with a 24-hour timeline across 1st, 2nd, and 3rd shifts, assigned personnel per rotation, and clear highlighting of the active shift. Surfaces absences and scheduled time off, plus a live countdown to the next shift change—built to support continuous dispatch coverage and shift-to-shift continuity.",
        },
        {
          id: "shift-briefing",
          src: "/projects/fleet-hub-shift-briefing.png",
          alt: "AI-generated shift briefing",
          description:
            "AI-assisted shift briefing panel summarizing fleet disposition (on load, on duty, off duty) with freshness status and regeneration when data is stale. Expandable sections cover weather and road conditions, fuel, Sylectus compliance dates, completed loads, trailer yard status, and external market intelligence—giving each shift a structured operational snapshot before work begins.",
        },
      ],
    },
  },
  {
    id: "contact",
    label: "Contact",
    title: "Hello",
    subtitle: "Resume and contact details coming next",
  },
];
