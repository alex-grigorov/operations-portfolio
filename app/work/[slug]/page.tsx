import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, profile } from "@/content/profile";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/link-button";
import { ArrowLeft } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return profile.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work not found" };
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.summary,
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <LinkButton href="/" variant="ghost" size="sm" className="mb-6 -ml-2">
          <ArrowLeft className="size-4" />
          Home
        </LinkButton>

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h1>
          {project.internalOnly && (
            <Badge variant="outline">Internal operations</Badge>
          )}
        </div>
        <p className="mt-3 text-lg text-muted-foreground">{project.summary}</p>
        <p className="mt-2 text-sm font-medium text-foreground/90">{project.role}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        {project.screenshot && (
          <figure className="mt-10 overflow-hidden rounded-xl border bg-muted/20">
            <Image
              src={project.screenshot}
              alt={`${project.title} interface`}
              width={1200}
              height={675}
              className="h-auto w-full"
            />
            {project.screenshotCaption && (
              <figcaption className="border-t px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                {project.screenshotCaption}
              </figcaption>
            )}
          </figure>
        )}

        <section className="mt-10 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            What I contributed
          </h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-lg border bg-muted/30 p-5 text-sm leading-relaxed text-muted-foreground">
          {project.showcaseNotes}
        </section>

        <div className="mt-12 flex flex-wrap gap-3 border-t pt-10">
          <LinkButton href="/resume">Download resume for applications</LinkButton>
        </div>
      </main>
    </>
  );
}
