export type SnapSection = {
  id: string;
  label: string;
  title: string;
  tagline?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  /** Only the title, centered — no subtitle or media */
  titleOnly?: boolean;
  /** Multi-paragraph copy (e.g. Introduction page) */
  paragraphs?: string[];
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
      "I'm Alex Grigorov, with hands-on experience in truck dispatch and day-to-day logistics operations. I'm looking for remote work where that operational background matters—not strictly software engineering.",
      "In my recent role, I helped build and use an internal web hub that brought information into one place: our TMS (Sylectus), fleet GPS (Samsara), ELD logs, and other sources—so dispatch and operations could access what they needed without jumping between systems.",
      "I'm a high school graduate, a fast learner, and comfortable with technology because I've lived in it on the job. I'm open to remote roles in dispatch, logistics coordination, operations support, fleet/TMS-adjacent work, and similar paths with established companies.",
    ],
  },
  {
    id: "focus",
    label: "Focus",
    title: "Open to remote",
    subtitle:
      "Dispatch · logistics · operations · fleet & TMS tools · coordinator and support roles",
  },
  {
    id: "work",
    label: "Work",
    title: "Operations hub",
    subtitle:
      "Internal web app — Sylectus, Samsara, ELD, and other data in one dispatch-facing workspace",
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
