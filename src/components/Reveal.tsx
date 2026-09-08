"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  className = "",
  y = 22,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </Tag>
  );
}

/** Section heading with a gold rule that draws in when scrolled into view. */
export function SectionTitle({
  eyebrow,
  title,
  className = "",
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  className?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <Reveal className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? "text-gold" : ""}`}>{eyebrow}</p>}
      <h2 className={`heading mt-3 text-4xl lg:text-5xl ${light ? "text-cream" : ""}`}>{title}</h2>
      <motion.span
        aria-hidden="true"
        className={`mt-4 block h-px w-14 bg-gold-2 ${align === "center" ? "mx-auto" : ""}`}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25, ease }}
        style={{ transformOrigin: align === "center" ? "center" : "left" }}
      />
    </Reveal>
  );
}
