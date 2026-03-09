"use client";

import { motion } from "framer-motion";

export default function ProjectHeroMedia({ project }) {
  return (
    <div className="w-[90%] md:w-[75%] flex items-center mx-auto py-24 relative overflow-hidden">
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-50 pointer-events-none">
        [replace with project video later]
      </p>

      <video
        src="https://nicola-gasparri.b-cdn.net/project-videos/Apple-Security.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto aspect-video object-cover"
      />
    </div>
  );
}
