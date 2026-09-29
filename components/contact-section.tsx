"use client";

import { profile } from "@/content/profile";
import { DownloadResumePdf } from "@/components/download-resume-pdf";
import { LinkButton } from "@/components/link-button";
import { ResumeDocument } from "@/components/resume-document";
import { cn } from "@/lib/utils";

function contactEmail(): string | null {
  const fromProfile = profile.email.trim();
  if (fromProfile) return fromProfile;
  const link = profile.socialLinks.find((l) => l.platform === "email");
  if (!link?.url.trim()) return null;
  return link.url.replace(/^mailto:/i, "").trim() || null;
}

function contactLinks() {
  return profile.socialLinks.filter((l) => l.url.trim().length > 0);
}

type ContactRowProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

function ContactRow({ label, children, className }: ContactRowProps) {
  return (
    <div
      className={cn(
        "grid gap-2 border-b border-foreground/10 py-4 text-left sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-6 sm:py-5",
        className,
      )}
    >
      <p className="font-mono text-xs font-medium tabular-nums tracking-[0.25em] text-foreground sm:text-sm">
        {label}
      </p>
      <div className="font-serif text-base leading-relaxed text-foreground/90 sm:text-lg">
        {children}
      </div>
    </div>
  );
}

export function ContactSection() {
  const email = contactEmail();
  const phone = profile.phone.trim();
  const links = contactLinks();

  return (
    <div className="mt-8 w-full max-w-lg text-left">
      <p className="text-center font-serif text-base leading-relaxed text-foreground/90 sm:text-lg">
        Remote-ready from Bulgaria. I&apos;m happy to connect for account operations, customer
        success, CRM coordination, logistics, or fast-moving remote teams—email, LinkedIn, or
        Telegram.
      </p>

      {profile.openTo.length > 0 && (
        <ul className="mt-6 space-y-2 border-t border-foreground/10 pt-6 text-left">
          <li className="font-mono text-xs tracking-[0.25em] text-foreground uppercase">
            Open to
          </li>
          {profile.openTo.map((line) => (
            <li
              key={line}
              className="font-serif text-sm leading-relaxed text-foreground/85 sm:text-base"
            >
              {line}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 border-t border-foreground/15">
        <ContactRow label="Location">
          <p>{profile.location}</p>
        </ContactRow>

        {profile.telegram.trim() && (
          <ContactRow label="Telegram">
            <p>{profile.telegram.startsWith("@") ? profile.telegram : `@${profile.telegram}`}</p>
          </ContactRow>
        )}

        {email && (
          <ContactRow label="Email">
            <a
              href={`mailto:${email}`}
              className="underline decoration-foreground/25 underline-offset-4 transition hover:decoration-foreground/60"
            >
              {email}
            </a>
          </ContactRow>
        )}

        {phone && (
          <ContactRow label="Phone">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="underline decoration-foreground/25 underline-offset-4 transition hover:decoration-foreground/60"
            >
              {phone}
            </a>
          </ContactRow>
        )}

        {links
          .filter((l) => l.platform !== "email")
          .map((link) => (
            <ContactRow key={link.platform} label={link.label}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-foreground/25 underline-offset-4 transition hover:decoration-foreground/60"
              >
                {link.url.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            </ContactRow>
          ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <DownloadResumePdf
          variant="outline"
          size="lg"
          label="Download CV (PDF)"
          className="min-w-[12rem] font-mono text-xs tracking-[0.15em] uppercase"
        />
        <LinkButton
          href="/resume"
          variant="ghost"
          size="lg"
          className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase hover:text-foreground"
        >
          View résumé online
        </LinkButton>
      </div>

      <p className="mt-6 text-center font-serif text-xs leading-relaxed text-muted-foreground sm:text-sm">
        PDF is generated from the same résumé used on the dedicated résumé page. For job boards
        that need selectable text, open the online résumé and use Print → Save as PDF.
      </p>

      {/* Off-screen source for html2canvas PDF export */}
      <div
        aria-hidden
        className="pointer-events-none fixed -left-[10000px] top-0 w-[816px] opacity-0"
      >
        <ResumeDocument />
      </div>
    </div>
  );
}
