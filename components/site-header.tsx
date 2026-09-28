import { LinkButton } from "@/components/link-button";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#ai", label: "AI skills" },
  { href: "/resume", label: "Resume" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <LinkButton
          href="/"
          variant="link"
          className="h-auto p-0 font-semibold tracking-tight text-foreground no-underline hover:opacity-80"
        >
          Portfolio
        </LinkButton>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <LinkButton key={l.href} href={l.href} variant="ghost" size="sm">
              {l.label}
            </LinkButton>
          ))}
        </nav>
        <LinkButton href="/resume" size="sm" className="shrink-0">
          Download / print CV
        </LinkButton>
      </div>
    </header>
  );
}
