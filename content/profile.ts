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

export const profile: Profile = {
  name: "Alex Grigorov",
  headline: "",
  location: "",
  openTo: [],
  email: "",
  phone: "",
  linkedIn: "",
  github: "",
  summary: "",
  skills: [],
  experience: [],
  projects: [],
  education: [],
};

export function getProject(slug: string): Project | undefined {
  return profile.projects.find((p) => p.slug === slug);
}
