"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintResumeButton() {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => window.print()}
      className="print:hidden"
    >
      <Printer className="size-4" />
      Save as PDF (print)
    </Button>
  );
}
