import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, profile } from "@/content/profile";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/link-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return profile.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <LinkButton href="/#projects" variant="ghost" size="sm" className="mb-6 -ml-2">
          <ArrowLeft className="size-4" />
          All projects
        </LinkButton>

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          {project.internalOnly && <Badge variant="outline">Internal tool</Badge>}
        </div>
        <p className="mt-3 text-lg text-muted-foreground">{project.summary}</p>
        <p className="mt-2 text-sm font-medium">{project.role}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "mt-6")}
          >
            <ExternalLink className="size-4" />
            Live demo
          </a>
        )}

        <section className="mt-10 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Impact
          </h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>

        <Card className="mt-10 border-primary/20 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Showcasing work from a past job</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {project.showcaseNotes}
          </CardContent>
        </Card>

        {project.internalOnly && (
          <section className="mt-10 space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Suggested next steps for you
            </h2>
            <ul className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>
                Ask your former manager if you may describe the project publicly
                (many companies allow anonymized case studies).
              </li>
              <li>
                Add 2–3 redacted screenshots: blur names, addresses, and live map
                data.
              </li>
              <li>
                On your resume, use one bullet with a metric (time saved, errors
                reduced, users served).
              </li>
              <li>
                In interviews, walk through architecture and tradeoffs — no live
                internal URL required.
              </li>
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
