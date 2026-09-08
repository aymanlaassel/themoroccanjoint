"use client";

import { useEffect, useState } from "react";
import { fridayCountdown } from "@/lib/hours";

export default function FridayCountdown() {
  const [c, setC] = useState<ReturnType<typeof fridayCountdown> | null>(null);

  useEffect(() => {
    const tick = () => setC(fridayCountdown());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!c) return <div className="h-24" aria-hidden="true" />;

  if (c.isFriday) {
    return (
      <p className="font-display text-2xl italic text-gold">
        It is Friday. Today&rsquo;s plates are spoken for; next week&rsquo;s pre-orders are open.
      </p>
    );
  }

  const cells = [
    { v: c.days, l: c.days === 1 ? "day" : "days" },
    { v: c.hours, l: "hours" },
    { v: c.minutes, l: "minutes" },
  ];

  return (
    <div aria-live="polite">
      <div className="flex items-baseline gap-8">
        {cells.map((cell) => (
          <div key={cell.l} className="text-center">
            <span className="font-display text-6xl font-light leading-none text-ivory tnum">{cell.v.toString().padStart(2, "0")}</span>
            <span className="label mt-3 block text-sand">{cell.l}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-sand">until pre-orders close, Thursday at midnight.</p>
    </div>
  );
}
