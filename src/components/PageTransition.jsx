"use client";

import { motion } from "motion/react";

const EASE = [0.76, 0, 0.24, 1];
const DURATION = 0.85;

export default function PageTransition({ children }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Top curtain — enters from top, exits to top */}
      {/* <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: DURATION, ease: EASE, delay: 0.05 }}
        style={{
          position: "fixed",
          inset: 0,
          bottom: "50%",
          background: "#000",
          zIndex: 9999,
          transformOrigin: "top",
          pointerEvents: "none",
        }}
      /> */}

      {/* Bottom curtain — enters from bottom, exits to bottom */}
      {/* <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: DURATION, ease: EASE, delay: 0.05 }}
        style={{
          position: "fixed",
          inset: 0,
          top: "50%",
          background: "#000",
          zIndex: 9999,
          transformOrigin: "bottom",
          pointerEvents: "none",
        }}
      /> */}

      {/* Content fades in after curtains part */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: EASE,
          delay: 0.8,
          delay: 1,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
