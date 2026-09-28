import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { ResumeDocument } from "@/components/resume-document";
import { PrintResumeButton } from "@/components/print-resume-button";
import { DownloadResumePdf } from "@/components/download-resume-pdf";
import { LinkButton } from "@/components/link-button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `Resume — ${profile.name}`,
  description: profile.headline,
};

export default function ResumePage() {
  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-4 print:hidden sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <LinkButton href="/" variant="ghost" size="sm">
            <ArrowLeft className="size-4" />
            Home
          </LinkButton>
          <div className="flex flex-wrap gap-2">
            <PrintResumeButton />
            <DownloadResumePdf />
          </div>
        </div>
        <p className="rounded-lg border border-dashed bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <strong className="font-medium text-foreground">For Indeed, LinkedIn, Greenhouse:</strong>{" "}
          use <strong className="font-medium text-foreground">Print → Save as PDF</strong> so
          applicant tracking systems can read the text. Use{" "}
          <strong className="font-medium text-foreground">Download PDF</strong> when a site only
          asks for any PDF file.
        </p>
      </div>
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-2 sm:px-6 print:px-0 print:pb-0 print:pt-0">
        <ResumeDocument />
      </div>
    </div>
  );
}
