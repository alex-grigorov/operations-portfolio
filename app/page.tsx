import { profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-background">
      <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
        {profile.name}
      </h1>
    </main>
  );
}
