"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          scale: 1.04,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }}
        exit={{
          opacity: 1,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// option 1
// <motion.div
//   initial={{
//     opacity: 0,
//     y: 40,
//     scale: 0.98,
//     filter: "blur(10px)",
//   }}
//   animate={{
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     filter: "blur(0px)",
//   }}
//   transition={{
//     duration: 0.7,
//     ease: [0.76, 0, 0.24, 1], // cinematic easing
//   }}
// >
//   {children}
// </motion.div>

// option 2

// <motion.div
//   initial={{
//     opacity: 0,
//     scale: 1.04,
//   }}
//   animate={{
//     opacity: 1,
//     scale: 1,
//   }}
//   transition={{
//     duration: 0.8,
//     ease: [0.76, 0, 0.24, 1],
//   }}
// >
//   {children}
// </motion.div>;

// option 3

// <div className="relative">
//       {/* Content */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         {children}
//       </motion.div>

//       {/* Black overlay */}
//       <motion.div
//         initial={{ opacity: 1 }}
//         animate={{ opacity: 0 }}
//         transition={{
//           duration: 0.8,
//           ease: [0.76, 0, 0.24, 1],
//         }}
//         className="fixed inset-0 bg-black pointer-events-none z-50"
//       />
//     </div>

//  <motion.div
//         key={pathname}
//         initial={{
//           opacity: 0.5,
//           // y: 10,
//           scale: 0.98,
//           filter: "blur(10px)",
//         }}
//         animate={{
//           opacity: 1,
//           // y: 0,
//           scale: 1,
//           filter: "blur(0px)",
//         }}
//         exit={{
//           opacity: 0,
//           // y: -10,
//           scale: 0.98,
//           // filter: "blur(10px)",
//         }}
//         transition={{
//           duration: 0.8,
//           ease: [0.76, 0, 0.24, 1],
//         }}
//       >
//         {children}
//       </motion.div>
