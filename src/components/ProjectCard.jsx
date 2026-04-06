"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ProjectCard({ project, i }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [20, -50]);
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  if (!project) return null;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative flex flex-col"
    >
      <div
        ref={ref}
        className="relative w-full aspect-4/5 overflow-hidden transition-all duration-500 ease-out group-hover:scale-[0.98]"
      >
        {/* Image */}
        <Image
          // onLoad={() => console.log("loaded")}
          width={"900"}
          height={"1600"}
          loading="lazy"
          style={{ y: imageY }}
          src={project.cover}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
        />
      </div>
      {/* 🔥 Title with scroll movement */}
      <motion.div
        ref={ref}
        style={{ y }}
        className="absolute bottom-4 z-10 w-full flex flex-col px-4 gap-2"
      >
        <div className="flex justify-between items-baseline w-full">
          <motion.h2
            layoutId={`project-title-${project.id}`}
            className="text-xl md:text-2xl font-medium mix-blend-difference group-hover:scale-105 transition-all duration-300 ease-out"
          >
            {project.name}
          </motion.h2>
          {/* <p className="text-sm font-regular">{project.category}</p> */}
        </div>

        <div className="flex justify-between items-baseline w-full opacity-70 font-regular text-lg font-bold">
          {project.director && (
            <p className="flex flex-col">
              <span className="text-xs opacity-75 font-light">Director</span>
              {project.director}
            </p>
          )}
          {project.cinematographer && (
            <p className="flex flex-col text-right">
              <span className="text-xs opacity-75 font-light">
                Cinematographer
              </span>
              {project.cinematographer}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
