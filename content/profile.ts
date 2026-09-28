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
  headline: "",
  location: "",
  openTo: [],
  email: "",
  phone: "",
  linkedIn: "",
  github: "",
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
  summary: "",
  skills: [],
  experience: [],
  projects: [],
  education: [],
};

export function getProject(slug: string): Project | undefined {
  return profile.projects.find((p) => p.slug === slug);
}
