"use client";

import { profile } from "@/content/profile";
import { DownloadResumePdf } from "@/components/download-resume-pdf";
import { telegramChatUrl, telegramDisplayHandle } from "@/lib/telegram";
function contactEmail(): string | null {
  const fromProfile = profile.email.trim();
  if (fromProfile) return fromProfile;
  const link = profile.socialLinks.find((l) => l.platform === "email");
  if (!link?.url.trim()) return null;
  return link.url.replace(/^mailto:/i, "").trim() || null;
}

function linkByPlatform(platform: "linkedin" | "github" | "email") {
  return profile.socialLinks.find((l) => l.platform === platform && l.url.trim());
}

function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/^mailto:/i, "");
}

type InfoRowProps = {
  label: string;
  children: React.ReactNode;
};

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-foreground/10 py-2 text-left">
      <span className="shrink-0 font-mono text-xs tracking-[0.2em] text-foreground uppercase sm:text-[0.6875rem]">
        {label}
      </span>
      <span className="min-w-0 text-right font-serif text-xs leading-snug text-foreground/90 sm:text-sm">
        {children}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium tracking-[0.22em] text-foreground uppercase">
      {children}
    </p>
  );
}

export function ContactSection() {
  const email = contactEmail();
  const phone = profile.phone.trim();
  const telegramUrl = profile.telegram.trim() ? telegramChatUrl(profile.telegram) : null;
  const linkedIn = linkByPlatform("linkedin");
  const github = linkByPlatform("github");

  const locationLine = "Near Sofia, BG (UTC+2)";

  return (
    <div className="mt-3 w-full max-w-4xl text-left sm:mt-4">
      <p className="mx-auto max-w-2xl text-center font-serif text-sm leading-snug text-pretty text-foreground/90 sm:text-[0.9375rem] sm:leading-relaxed">
        Based near Sofia, Bulgaria · Open to remote roles across account management, customer
        success, CRM coordination, and logistics operations.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:mt-5 md:grid-cols-2 md:gap-10">
        <div className="min-w-0">
          <SectionLabel>Open to</SectionLabel>
          <ul className="mt-2.5 space-y-1.5">
            {profile.openTo.map((line) => (
              <li
                key={line}
                className="text-pretty font-serif text-xs leading-relaxed text-foreground/85 sm:text-sm"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionLabel>Direct contact</SectionLabel>
          <div className="mt-2.5">
            <InfoRow label="Location">
              <span>{locationLine}</span>
            </InfoRow>

            {telegramUrl && (
              <InfoRow label="Telegram">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words underline decoration-foreground/25 underline-offset-2 hover:decoration-foreground/60"
                >
                  {telegramDisplayHandle(profile.telegram)}
                </a>
              </InfoRow>
            )}

            {email && (
              <InfoRow label="Email">
                <a
                  href={`mailto:${email}`}
                  className="break-all underline decoration-foreground/25 underline-offset-2 hover:decoration-foreground/60"
                >
                  {email}
                </a>
              </InfoRow>
            )}

            {phone && (
              <InfoRow label="Phone">
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="break-words underline decoration-foreground/25 underline-offset-2 hover:decoration-foreground/60"
                >
                  {phone}
                </a>
              </InfoRow>
            )}

            {linkedIn && (
              <InfoRow label="LinkedIn">
                <a
                  href={linkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all underline decoration-foreground/25 underline-offset-2 hover:decoration-foreground/60"
                >
                  {displayUrl(linkedIn.url)}
                </a>
              </InfoRow>
            )}

            {github && (
              <InfoRow label="GitHub">
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all underline decoration-foreground/25 underline-offset-2 hover:decoration-foreground/60"
                >
                  {displayUrl(github.url)}
                </a>
              </InfoRow>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center sm:mt-6">
        <DownloadResumePdf
          variant="outline"
          size="lg"
          label="Download CV (PDF)"
          className="min-w-[12rem] font-mono text-xs tracking-[0.15em] uppercase"
        />
      </div>
    </div>
  );
}
