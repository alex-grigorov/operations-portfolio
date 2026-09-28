"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const verbs = ["Shipped", "Designed", "Automated", "Reduced", "Led", "Integrated"] as const;

function craftBullet(role: string, outcome: string, metric: string): string {
  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  const r = role.trim() || "full-stack features";
  const o = outcome.trim() || "improved operational workflows";
  const m = metric.trim() || "measurable time savings for the team";
  return `${verb} ${r} that ${o}, resulting in ${m}.`;
}

export function AiBulletDemo() {
  const [role, setRole] = useState("internal dispatch web app");
  const [outcome, setOutcome] = useState("cut manual coordination steps");
  const [metric, setMetric] = useState("faster assignment turnaround for dispatchers");
  const [seed, setSeed] = useState(0);

  const bullet = useMemo(
    () => craftBullet(role, outcome, metric),
    [role, outcome, metric, seed],
  );

  return (
    <Card className="border-dashed">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-lg">Resume bullet workshop</CardTitle>
          <Badge variant="secondary">Demo — no API key required</Badge>
        </div>
        <CardDescription>
          Shows how you turn raw project facts into resume-ready bullets — the same
          workflow you can run with Cursor or any LLM in your real job search.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="space-y-1 text-sm">
            <span className="font-medium">What you built</span>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </label>
          <label className="space-y-1 text-sm">
            <span className="font-medium">Outcome</span>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
            />
          </label>
          <label className="space-y-1 text-sm">
            <span className="font-medium">Metric / impact</span>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
            />
          </label>
        </div>
        <div className="rounded-lg bg-muted/60 p-4 font-mono text-sm leading-relaxed">
          {bullet}
        </div>
        <Button type="button" variant="secondary" onClick={() => setSeed((s) => s + 1)}>
          Regenerate wording
        </Button>
      </CardContent>
    </Card>
  );
}
