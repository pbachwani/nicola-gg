"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

const EASE = [0.76, 0, 0.24, 1];
const DURATION = 0.75;

function Curtains() {
  return (
    <>
      {/* Top curtain */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{
          scaleY: 0,
          transition: { duration: DURATION, ease: EASE, delay: 0.05 },
        }}
        exit={{
          scaleY: 1,
          transition: { duration: DURATION, ease: EASE },
        }}
        style={{
          position: "fixed",
          inset: 0,
          bottom: "50%",
          background: "#000",
          zIndex: 9998,
          transformOrigin: "top",
          pointerEvents: "none",
        }}
      />

      {/* Bottom curtain */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{
          scaleY: 0,
          transition: { duration: DURATION, ease: EASE, delay: 0.05 },
        }}
        exit={{
          scaleY: 1,
          transition: { duration: DURATION, ease: EASE },
        }}
        style={{
          position: "fixed",
          inset: 0,
          top: "50%",
          background: "#000",
          zIndex: 9998,
          transformOrigin: "bottom",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

export default function TransitionProvider({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} style={{ position: "relative" }}>
        {children}
        <Curtains></Curtains>
      </motion.div>
    </AnimatePresence>
  );
}
