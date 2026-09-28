import Image from "next/image";
import { profile, getProject } from "@/content/profile";
import { SiteHeader } from "@/components/site-header";
import { LinkButton } from "@/components/link-button";

const featured = getProject("geo-logistics-dispatch");

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-3xl flex-1 flex-col px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Seeking remote work
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {profile.headline}. I learn quickly, show up reliably, and want my
          next role with a legitimate team building real software.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/resume" size="lg">
            Get resume PDF
          </LinkButton>
          {featured && (
            <LinkButton href={`/work/${featured.slug}`} variant="outline" size="lg">
              See featured project
            </LinkButton>
          )}
        </div>

        {featured?.screenshot && (
          <section className="mt-20 border-t pt-16">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Featured work
            </h2>
            <p className="mt-2 text-xl font-medium">{featured.title}</p>
            <p className="mt-2 text-muted-foreground">{featured.summary}</p>
            <LinkButton
              href={`/work/${featured.slug}`}
              variant="link"
              className="mt-4 h-auto p-0"
            >
              Full case study →
            </LinkButton>
            <div className="mt-8 overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
              <Image
                src={featured.screenshot}
                alt={`${featured.title} sign-in screen`}
                width={1200}
                height={675}
                className="h-auto w-full"
                priority
              />
              {featured.screenshotCaption && (
                <p className="border-t px-4 py-3 text-xs text-muted-foreground">
                  {featured.screenshotCaption}
                </p>
              )}
            </div>
          </section>
        )}
      </main>
      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        Update your details in{" "}
        <code className="rounded bg-muted px-1 py-0.5">content/profile.ts</code>
      </footer>
    </>
  );
}
