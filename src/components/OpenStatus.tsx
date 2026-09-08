"use client";

import { useEffect, useState } from "react";
import { openStatus } from "@/lib/hours";

export default function OpenStatus({ className = "" }: { className?: string }) {
  const [state, setState] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const tick = () => setState(openStatus());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`inline-flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase ${className}`} aria-live="polite">
      <span
        className={`h-1.5 w-1.5 rounded-full ${state?.open ? "bg-sage shadow-[0_0_0_4px_rgba(127,174,141,0.25)]" : "bg-gold"}`}
      />
      <span className="text-cream">{state?.text ?? "Open daily 4:00 PM – 12:10 AM"}</span>
    </span>
  );
}
