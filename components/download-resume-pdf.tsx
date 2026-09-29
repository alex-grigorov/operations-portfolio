"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { Download, Loader2 } from "lucide-react";
import { PUBLIC_CV } from "@/content/public-cv";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

function safeFilename(name: string) {
  return name.replace(/[^\w\-]+/g, "-").replace(/-+/g, "-").toLowerCase();
}

async function downloadStaticPublicCv(): Promise<boolean> {
  const res = await fetch(PUBLIC_CV.path, { method: "GET" });
  if (!res.ok) return false;
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = PUBLIC_CV.downloadName;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return true;
}

type DownloadResumePdfProps = VariantProps<typeof buttonVariants> & {
  label?: string;
  className?: string;
};

export function DownloadResumePdf({
  variant = "default",
  size = "default",
  label = "Download PDF for job boards",
  className,
}: DownloadResumePdfProps) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      if (await downloadStaticPublicCv()) return;

      const el = document.querySelector(".resume-document");
      if (!el || !(el instanceof HTMLElement)) return;

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 36;
      const contentWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * contentWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, "PNG", margin, position, contentWidth, imgHeight);
      heightLeft -= pageHeight - margin * 2;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, contentWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;
      }

      pdf.save(`${safeFilename(profile.name)}-resume.pdf`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={loading}
      className={cn("print:hidden", className)}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      {label}
    </Button>
  );
}
