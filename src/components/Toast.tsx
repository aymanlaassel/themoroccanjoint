"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";

export default function Toast() {
  const lastAdded = useCart((s) => s.lastAdded);
  const addedAt = useCart((s) => s.addedAt);
  const setOpen = useCart((s) => s.setOpen);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!addedAt) return;
    const show = setTimeout(() => setVisible(true), 0);
    const hide = setTimeout(() => setVisible(false), 2600);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [addedAt]);

  return (
    <AnimatePresence>
      {visible && lastAdded && (
        <motion.div
          role="status"
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-full bg-green-deep px-5 py-3 text-sm text-cream shadow-lg"
          initial={{ opacity: 0, y: 16, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 12, x: "-50%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span>
            <span className="font-bold">Added</span> {lastAdded}
          </span>
          <button
            type="button"
            onClick={() => {
              setVisible(false);
              setOpen(true);
            }}
            className="rounded-full bg-cream px-3 py-1 text-xs font-medium uppercase tracking-wide text-green-deep hover:bg-red hover:text-cream"
          >
            View bag
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
