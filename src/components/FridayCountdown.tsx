"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fridayCountdown } from "@/lib/hours";

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-top">
      <AnimatePresence initial={false}>
        <motion.span
          key={value}
          className="absolute inset-0"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function FridayCountdown() {
  const [c, setC] = useState<ReturnType<typeof fridayCountdown> | null>(null);

  useEffect(() => {
    const tick = () => setC(fridayCountdown());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  if (!c) return <div className="h-20" aria-hidden="true" />;

  if (c.isFriday) {
    return <p className="text-xl font-bold text-green">It is Friday. Pre-orders for next week are open.</p>;
  }

  const cells = [
    { v: c.days, l: c.days === 1 ? "day" : "days" },
    { v: c.hours, l: "hours" },
    { v: c.minutes, l: "minutes" },
  ];

  return (
    <div aria-live="polite">
      <div className="flex gap-8">
        {cells.map((cell) => {
          const s = cell.v.toString().padStart(2, "0");
          return (
            <div key={cell.l}>
              <span className="tnum block font-display text-5xl font-extrabold leading-none tracking-tight text-green">
                {s.split("").map((d, i) => <Digit key={i} value={d} />)}
              </span>
              <span className="mt-1 block text-xs uppercase tracking-widest text-ink-3">{cell.l}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-ink-2">left to pre-order for this Friday. Last call Thursday.</p>
    </div>
  );
}
