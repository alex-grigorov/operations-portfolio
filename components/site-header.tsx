import { LinkButton } from "@/components/link-button";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="safe-top border-b border-border/60">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
        <LinkButton
          href="/"
          variant="link"
          className="h-auto max-w-[12rem] truncate p-0 font-medium text-foreground no-underline sm:max-w-none"
        >
          {profile.name}
        </LinkButton>
        <nav className="flex items-center gap-1 sm:gap-2">
          <LinkButton href="/work/geo-logistics-dispatch" variant="ghost" size="sm">
            Work
          </LinkButton>
          <LinkButton href="/resume" size="sm">
            Resume
          </LinkButton>
        </nav>
      </div>
    </header>
  );
}
