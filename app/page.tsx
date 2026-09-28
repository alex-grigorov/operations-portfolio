import { profile } from "@/content/profile";
import { SiteHeader } from "@/components/site-header";
import { AiBulletDemo } from "@/components/ai-bullet-demo";
import { LinkButton } from "@/components/link-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, MapPin, Mail } from "lucide-react";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b bg-gradient-to-b from-muted/40 to-background">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Open to remote roles
            </p>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              {profile.headline}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.openTo.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/resume" size="lg">
                View resume
                <ArrowRight className="size-4" />
              </LinkButton>
              <a
                href={`mailto:${profile.email}`}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                <Mail className="size-4" />
                Email me
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              {profile.location}
            </p>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {profile.summary}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {profile.skills.map((group) => (
              <Card key={group.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{group.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="border-t bg-muted/20 py-16"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Internal tools count — frame them as case studies with your role,
              stack, and outcomes. Recruiters rarely need a public login.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {profile.projects.map((project) => (
                <Card key={project.slug} className="flex flex-col">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      {project.internalOnly && (
                        <Badge variant="outline">Internal</Badge>
                      )}
                    </div>
                    <CardDescription>{project.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <LinkButton
                      href={`/projects/${project.slug}`}
                      variant="link"
                      className="h-auto w-fit p-0"
                    >
                      Read case study
                      <ArrowRight className="size-4" />
                    </LinkButton>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="ai" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">AI skills</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Hiring teams want proof you can use AI productively — not just chat.
            This section plus a shipped site signals that you document, review, and
            ship with agentic tools.
          </p>
          <div className="mt-8">
            <AiBulletDemo />
          </div>
        </section>
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        Edit <code className="rounded bg-muted px-1.5 py-0.5">content/profile.ts</code>{" "}
        to personalize · {new Date().getFullYear()}
      </footer>
    </>
  );
}
