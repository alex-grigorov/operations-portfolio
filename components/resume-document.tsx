import { profile } from "@/content/profile";
import { Separator } from "@/components/ui/separator";

type ResumeDocumentProps = {
  compact?: boolean;
};

function headerEmail(): string {
  if (profile.email.trim()) return profile.email.trim();
  const link = profile.socialLinks.find((l) => l.platform === "email");
  if (!link?.url.trim()) return "";
  return link.url.replace(/^mailto:/i, "").trim();
}

export function ResumeDocument({ compact }: ResumeDocumentProps) {
  const {
    name,
    headline,
    location,
    phone,
    telegram,
    linkedIn,
    github,
    summary,
    skills,
    experience,
    projects,
    education,
    certifications,
  } = profile;
  const email = headerEmail();

  return (
    <article
      className={`resume-document mx-auto max-w-3xl text-foreground ${compact ? "text-sm" : ""}`}
    >
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{name}</h1>
        <p className="text-base font-medium text-muted-foreground">{headline}</p>
        <p className="text-sm text-muted-foreground">{location}</p>
        <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {email ? (
            <a className="underline-offset-2 hover:underline" href={`mailto:${email}`}>
              {email}
            </a>
          ) : null}
          {phone ? <span>{phone}</span> : null}
          {linkedIn ? (
            <a className="underline-offset-2 hover:underline" href={linkedIn} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          ) : null}
          {github ? (
            <a className="underline-offset-2 hover:underline" href={github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : null}
          {telegram ? <span>Telegram: {telegram.startsWith("@") ? telegram : `@${telegram}`}</span> : null}
        </p>
      </header>

      <Separator className="my-5" />

      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Summary
        </h2>
        <p className="leading-relaxed">{summary}</p>
      </section>

      <Separator className="my-5" />

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Skills
        </h2>
        <ul className="space-y-2">
          {skills.map((group) => (
            <li key={group.label}>
              <span className="font-medium">{group.label}: </span>
              <span className="text-muted-foreground">{group.items.join(" · ")}</span>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="my-5" />

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Experience
        </h2>
        {experience.map((job) => (
          <div key={job.title} className="space-y-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">
                {job.title}
                {job.company ? ` · ${job.company}` : ""}
              </h3>
              <span className="text-sm text-muted-foreground">
                {job.start} – {job.end} · {job.location}
              </span>
            </div>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <Separator className="my-5" />

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Selected projects
        </h2>
        {projects.map((p) => (
          <div key={p.slug} className="space-y-1">
            <h3 className="font-semibold">
              {p.title}
              {p.internalOnly ? " (internal)" : ""}
            </h3>
            <p className="text-sm text-muted-foreground">{p.role}</p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {p.highlights.slice(0, 3).map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {certifications.some((c) => c.name.trim()) && (
        <>
          <Separator className="my-5" />
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Certifications
            </h2>
            <ul className="space-y-1">
              {certifications
                .filter((c) => c.name.trim())
                .map((c) => (
                  <li key={c.name}>
                    <span className="font-medium">{c.name}</span>
                    {c.issuer ? ` — ${c.issuer}` : ""}
                    {c.year ? ` (${c.year})` : " (in progress)"}
                  </li>
                ))}
            </ul>
          </section>
        </>
      )}

      <Separator className="my-5" />

      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Education
        </h2>
        {education.map((e) => (
          <p key={e.school}>
            <span className="font-medium">{e.credential}</span>
            {e.school ? `, ${e.school}` : ""}
            {e.year ? ` (${e.year})` : ""}
          </p>
        ))}
      </section>
    </article>
  );
}
