export type SnapSection = {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  /** Optional image shown below text (contained, not full-bleed) */
  image?: string;
  imageAlt?: string;
};

export const snapSections: SnapSection[] = [
  {
    id: "intro",
    label: "Intro",
    title: "Alex Grigorov",
  },
  {
    id: "focus",
    label: "Focus",
    title: "Remote",
    subtitle: "Open to legitimate teams · learn fast · ship work",
  },
  {
    id: "work",
    label: "Work",
    title: "Dispatch",
    subtitle: "Geo Logistics — internal operations platform",
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
