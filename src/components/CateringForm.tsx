"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/shopify";

const field =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 font-display text-xl text-ivory placeholder:text-sand/50 focus:border-gold focus:outline-none transition-colors";

export default function CateringForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      `Catering request from ${f.get("name")}`,
      f.get("phone") && `Phone: ${f.get("phone")}`,
      f.get("date") && `Date: ${f.get("date")}`,
      f.get("guests") && `Guests: ${f.get("guests")}`,
      f.get("area") && `Location: ${f.get("area")}`,
      "",
      f.get("message"),
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="label">Name</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="label">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="305 …" />
        </label>
        <label className="block">
          <span className="label">Event date</span>
          <input name="date" type="date" className={`${field} [color-scheme:dark]`} />
        </label>
        <label className="block">
          <span className="label">Guests</span>
          <input name="guests" type="number" min={1} className={field} placeholder="25" />
        </label>
        <label className="block sm:col-span-2">
          <span className="label">Where</span>
          <input name="area" className={field} placeholder="Brickell, Fort Lauderdale, Boca Raton…" />
        </label>
        <label className="block sm:col-span-2">
          <span className="label">Tell us about it</span>
          <textarea
            name="message"
            rows={3}
            className={`${field} resize-none`}
            placeholder="Office lunch for 25, a mix of tajines and paninis, delivered at noon."
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn-primary">Send request</button>
        <p className="text-xs text-sand">
          {sent ? "Opened in WhatsApp. We reply within the day with pricing and availability." : "Opens WhatsApp with your request filled in."}
        </p>
      </div>
    </form>
  );
}
