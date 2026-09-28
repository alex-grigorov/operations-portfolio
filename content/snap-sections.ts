export type ExperienceEntry = {
  role: string;
  highlights: string[];
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
    id: "work",
    label: "Work",
    title: "Operations hub",
    subtitle:
      "Self-built internal platform with API integrations (Sylectus, Samsara, ELD)—developed with Cursor, ChatGPT, and AI-assisted workflows",
    image: "/projects/geo-logistics-dispatch-login.png",
    imageAlt: "Geo Logistics Dispatch sign-in screen",
  },
  {
    id: "contact",
    label: "Contact",
    title: "Hello",
    subtitle: "Resume and contact details coming next",
  },
];
