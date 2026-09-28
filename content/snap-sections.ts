export type SnapSection = {
  id: string;
  label: string;
  /** Large display line */
  title: string;
  /** Secondary line under title */
  subtitle?: string;
  /** Tailwind-friendly bg classes on the panel */
  panelClass: string;
  /** If set, show image layer (e.g. project screenshot) */
  image?: string;
  /** Text uses mix-blend-mode: difference over panel */
  blendTitle?: boolean;
};

export const snapSections: SnapSection[] = [
  {
    id: "intro",
    label: "Intro",
    title: "Alex Grigorov",
    subtitle: "Scroll",
    panelClass: "bg-[#e8e4dc]",
    blendTitle: true,
  },
  {
    id: "focus",
    label: "Focus",
    title: "Remote",
    subtitle: "Open to legitimate teams · learn fast · ship work",
    panelClass: "bg-[#111111]",
    blendTitle: true,
  },
  {
    id: "work",
    label: "Work",
    title: "Dispatch",
    subtitle: "Geo Logistics — internal operations platform",
    panelClass: "bg-[#1a0508]",
    image: "/projects/geo-logistics-dispatch-login.png",
    blendTitle: true,
  },
  {
    id: "contact",
    label: "Contact",
    title: "Hello",
    subtitle: "Resume & details coming next",
    panelClass: "bg-[#2563eb]",
    blendTitle: true,
  },
];
