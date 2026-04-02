"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

const CURTAIN_EASE = [0.76, 0, 0.24, 1];
const CURTAIN_DURATION = 0.85;

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Page content — delayed until curtains have parted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.95 }}
        >
          {children}
        </motion.div>

        {/* Top curtain */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{
            scaleY: [0, 1, 1, 0],
            transition: {
              duration: CURTAIN_DURATION,
              times: [0, 0.4, 0.5, 1],
              ease: CURTAIN_EASE,
            },
          }}
          style={{
            position: "fixed",
            inset: 0,
            bottom: "50%",
            background: "#fff",
            zIndex: 9998,
            transformOrigin: "bottom",
            pointerEvents: "none",
          }}
        />

        {/* Bottom curtain */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{
            scaleY: [0, 1, 1, 0],
            transition: {
              duration: CURTAIN_DURATION,
              times: [0, 0.4, 0.5, 1],
              ease: CURTAIN_EASE,
            },
          }}
          style={{
            position: "fixed",
            inset: 0,
            top: "50%",
            background: "#000",
            zIndex: 9998,
            transformOrigin: "top",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
