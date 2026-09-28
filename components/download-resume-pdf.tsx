"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { profile } from "@/content/profile";

function safeFilename(name: string) {
  return name.replace(/[^\w\-]+/g, "-").replace(/-+/g, "-").toLowerCase();
}

export function DownloadResumePdf() {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    const el = document.querySelector(".resume-document");
    if (!el || !(el instanceof HTMLElement)) return;

    setLoading(true);
    try {
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
      onClick={handleDownload}
      disabled={loading}
      className="print:hidden"
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      Download PDF for job boards
    </Button>
  );
}
