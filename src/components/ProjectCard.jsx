"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ProjectCard({ project, i }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -60]);
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  if (!project) return null;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative flex flex-col"
    >
      <motion.div
        ref={ref}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: i * 0.05,
          duration: 0.6,
          ease: "easeOut",
        }}
        className="relative w-full aspect-4/5 overflow-hidden transition-all duration-500 ease-out group-hover:scale-[0.98]"
      >
        {/* Image */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut" }}
          layoutId={`project-media-${project.id}`}
          style={{ y: imageY }}
          src={project.cover}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
        />

        {/* Gradient */}
        {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" /> */}
      </motion.div>
      {/* 🔥 Title with scroll movement */}
      <motion.div
        ref={ref}
        style={{ y }}
        className="absolute bottom-4 z-10 w-full flex flex-col justify-between items-baseline px-4 gap-2 "
      >
        <div className="flex justify-between items-baseline w-full">
          <motion.h2
            layoutId={`project-title-${project.id}`}
            className="text-xl md:text-2xl font-medium"
          >
            {project.name}
          </motion.h2>
          <p className="text-sm font-regular">{project.category}</p>
        </div>

        <div className="flex justify-between items-baseline w-full opacity-70 font-regular text-lg">
          <p className="">{project.director}</p>
          <p className=" text-right">{project.cinematographer}</p>
        </div>
      </motion.div>
    </Link>
  );
}

// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function ProjectCard({ project, i }) {
//   if (!project) return null;

//   return (
//     <Link href={`/projects/${project.id}`} className="group block">
//       <motion.div
//         // initial={{ opacity: 0, y: 40 }}
//         initial={false}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{
//           delay: i * 0.05,
//           duration: 0.6,
//           ease: "easeOut",
//         }}
//         className="relative w-full aspect-4/5 overflow-hidden bg-neutral-800 transition-all duration-300 ease-out group-hover:scale-[0.98]"
//       >
//         {/* Image */}
//         <motion.img
//           src={project.cover}
//           alt={project.name}
//           // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           // loading="eager"
//           className="absolute w-full h-full inset-0 object-cover transition-transform duration-300 ease-out group-hover:scale-107"
//         />

//         {/* Gradient Overlay */}
//         <div
//           className="
//           absolute inset-0
//           bg-linear-to-t from-black/80 via-black/20 to-transparent
//           opacity-80
//           "
//         />

//         {/* Title */}
//         <div className="absolute bottom-4 left-4 right-4">
//           <h2
//             className="
//             text-xl md:text-2xl font-medium leading-tight
//             transition-all duration-500 ease-out
//             group-hover:-translate-y-1
//             "
//           >
//             {project.name}
//           </h2>
//         </div>
//       </motion.div>
//     </Link>
//   );
// }

// "use client";

// import Link from "next/link";
// import { motion, useScroll, useTransform } from "motion/react";
// import { useRef } from "react";

// export default function ProjectCard({ project, i }) {
//   const ref = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

//   if (!project) return null;

//   return (
//     <Link href={`/projects/${project.id}`} className="group block">
//       <motion.div
//         initial={false}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{
//           delay: i * 0.05,
//           duration: 0.6,
//           ease: "easeOut",
//         }}
//         className="relative w-full aspect-4/5 overflow-hidden bg-neutral-800 transition-all duration-500 ease-out group-hover:scale-[0.98]"
//       >
//         {/* Image */}
//         <img
//           src={project.cover}
//           alt={project.name}
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
//         />

//         {/* Gradient */}
//         <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" />

//         {/* Title */}
//         <motion.div className="absolute bottom-4 left-4 right-4">
//           <h2 className="text-xl md:text-2xl font-medium leading-tight transition-all duration-500 ease-out group-hover:-translate-y-1">
//             {project.name}
//           </h2>
//         </motion.div>
//       </motion.div>
//     </Link>
//   );
// }
