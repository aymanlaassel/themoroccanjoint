export const TIMEZONE = "America/New_York";
export const OPEN_MINUTES = 16 * 60; // 4:00 PM
export const CLOSE_MINUTES = 10; // 12:10 AM, next day
export const HOURS_LABEL = "4:00 PM – 12:10 AM";

function nowInET(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: TIMEZONE }));
}

export function openStatus(): { open: boolean; text: string } {
  const et = nowInET();
  const mins = et.getHours() * 60 + et.getMinutes();
  const open = mins >= OPEN_MINUTES || mins < CLOSE_MINUTES;
  if (open) {
    const left = mins >= OPEN_MINUTES ? 24 * 60 - mins + CLOSE_MINUTES : CLOSE_MINUTES - mins;
    return { open, text: left <= 45 ? `Open, closing in ${left} min` : "Open now until 12:10 AM" };
  }
  const until = OPEN_MINUTES - mins;
  const h = Math.floor(until / 60);
  const m = until % 60;
  const wait = h > 0 ? `${h}h ${m.toString().padStart(2, "0")}m` : `${m} min`;
  return { open, text: `Opens at 4:00 PM, in ${wait}` };
}

/** Time left until Thursday 23:59 ET, the last call for Friday couscous. */
export function fridayCountdown(): { isFriday: boolean; days: number; hours: number; minutes: number } {
  const et = nowInET();
  const dow = et.getDay(); // 0 Sun … 4 Thu, 5 Fri
  if (dow === 5) return { isFriday: true, days: 0, hours: 0, minutes: 0 };
  const target = new Date(et);
  target.setDate(et.getDate() + ((4 - dow + 7) % 7));
  target.setHours(23, 59, 0, 0);
  if (target < et) target.setDate(target.getDate() + 7);
  const diff = Math.max(0, target.getTime() - et.getTime());
  return {
    isFriday: false,
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5) / 6e4),
  };
}
