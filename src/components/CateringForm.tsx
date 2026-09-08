"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/shopify";

const field =
  "w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-3 focus:border-green focus:outline-none";
const label = "block text-sm font-medium text-ink-2";

export default function CateringForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      `Catering request from ${f.get("name")}`,
      f.get("email") && `Email: ${f.get("email")}`,
      f.get("phone") && `Phone: ${f.get("phone")}`,
      f.get("date") && `Date: ${f.get("date")}`,
      f.get("guests") && `Guests: ${f.get("guests")}`,
      "",
      f.get("message"),
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" required autoComplete="name" className={`${field} mt-1`} />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={`${field} mt-1`} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={`${field} mt-1`} />
        </div>
        <div>
          <label htmlFor="date" className={label}>Event date</label>
          <input id="date" name="date" type="date" className={`${field} mt-1`} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="guests" className={label}>Number of guests</label>
          <input id="guests" name="guests" type="number" min={1} className={`${field} mt-1`} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>Comment</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`${field} mt-1`}
            placeholder="Tell us about your event and what you're looking for."
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-green">Send</button>
        <p className="text-sm text-ink-2">
          {sent ? "Opened in WhatsApp. We'll reply to discuss details, pricing and availability." : "Sends your request to us on WhatsApp."}
        </p>
      </div>
    </form>
  );
}
