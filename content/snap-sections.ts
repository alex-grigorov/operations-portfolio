export type SnapSection = {
  id: string;
  label: string;
  eyebrow?: string;
  title: string;
  tagline?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
};

export const snapSections: SnapSection[] = [
  {
    id: "intro",
    label: "Intro",
    eyebrow: "Intro",
    title: "Alex Grigorov",
    tagline: "Personal Portfolio",
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
