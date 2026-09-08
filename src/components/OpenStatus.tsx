"use client";

import { useEffect, useState } from "react";
import { openStatus } from "@/lib/hours";

export default function OpenStatus({ className = "" }: { className?: string }) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setText(openStatus().text);
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={className} aria-live="polite">
      {text ?? "Open daily 4:00 PM – 12:10 AM"}
    </p>
  );
}
