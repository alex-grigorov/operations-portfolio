import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { ResumeDocument } from "@/components/resume-document";
import { PrintResumeButton } from "@/components/print-resume-button";
import { LinkButton } from "@/components/link-button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `Resume — ${profile.name}`,
  description: profile.headline,
};

export default function ResumePage() {
  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 print:hidden sm:px-6">
        <LinkButton href="/" variant="ghost" size="sm">
          <ArrowLeft className="size-4" />
          Back to portfolio
        </LinkButton>
        <PrintResumeButton />
      </div>
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-2 sm:px-6 print:px-0 print:pb-0 print:pt-0">
        <ResumeDocument />
      </div>
    </div>
  );
}
