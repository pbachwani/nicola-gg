"use client";

import { motion } from "framer-motion";

export default function ProjectContent({ project }) {
  return (
    <motion.div
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 z-20 pointer-events-none"
    >
      <div className="flex justify-between items-end h-screen pt-20">
        <div className="w-screen h-fit flex flex-col md:flex-row justify-between items-start md:px-16 px-4 py-16 md:py-6 relative max-md:gap-4">
          {/* LEFT */}
          <div className="flex flex-col justify-end max-w-xs">
            <div>
              <motion.h1
                layoutId={`project-title-${project.id}`}
                className="text-xl md:text-2xl mb-2"
              >
                {project.name}
              </motion.h1>
              <p className="text-sm text-white/60">{project.category}</p>
            </div>

            {/* <div className="text-sm text-white/50">Tags / description</div> */}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-end md:text-right max-w-xs gap-2">
            <div>
              <p className="text-sm text-white/60">Director</p>
              <h2 className="text-lg">{project.director}</h2>
            </div>

            <div>
              <p className="text-sm text-white/60">Director</p>
              <h2 className="text-lg">{project.director}</h2>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
