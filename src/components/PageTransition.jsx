"use client";

import { motion } from "motion/react";

const EASE = [0.76, 0, 0.24, 1];

export default function PageTransition({ children }) {
  return (
    <div style={{ position: "relative" }}>
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
