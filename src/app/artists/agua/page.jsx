"use client";
import { cdnBase, projects_agua } from "@/app/constants/data";
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const AguaProjects = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const artistProjects = projects_agua;

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 80);
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Sticky side label + scroll indicator */}
        <motion.div
          className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="text-[10px] tracking-[0.25em] uppercase opacity-40"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Agua Jiang
          </span>

          <div className="relative w-px h-40 overflow-hidden">
            {/* Track */}
            <div className="absolute inset-0 bg-current opacity-10" />
            {/* Fill */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-current opacity-60"
              style={{
                scaleY: scrollProgress,
                transformOrigin: "top",
              }}
            />
          </div>
        </motion.div>

        {/* Header */}
        <div className="min-h-screen flex flex-col justify-center relative">
          {/* video */}
          <div className="w-full h-full min-h-screen max-h-svh z-0">
            <video
              src={`${cdnBase}/homepage/agua-artistpage.mp4`}
              autoPlay
              loop
              muted
              className="w-full object-cover h-screen opacity-60"
            ></video>
          </div>
          {/* content */}
          <div className="flex flex-col w-full justify-center items-center gap-10 z-10 absolute px-4">
            <h1 className="text-3xl md:text-5xl font-light tracking-tight leading-none">
              Agua Jiang
            </h1>
            <p className="text-sm mt-2 max-w-5xl text-center ">
              Agua is a partner and colourist at Groundglass, working between
              Florence and Shanghai. Her work is characterised by a modern and
              precise approach to colour, with a strong sensitivity to tone,
              texture, and balance. Her work spans commercials and moving image,
              with a focus on clean, contemporary visuals and a refined use of
              colour. With a keen eye for color and a strong foundation in
              visual aesthetics, she excels at using color to shape emotions,
              enhance storytelling, and bring a distinctive visual style to
              every project.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="px-6 md:px-16 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10">
            {artistProjects?.map((project, i) => {
              if (!project) return null;
              return (
                <ProjectCard
                  key={project.id || i}
                  project={project}
                  i={i}
                  source="agua"
                />
              );
            })}
          </div>
        </div>

        {/* Next artist — bottom */}
        <div className="px-6 md:px-16 py-20 ">
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-30 mb-6">
            Next Artist
          </p>
          <Link
            href="/artists/nicola"
            className="group flex items-end justify-between w-full"
          >
            <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-none opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              Nicola Gasparri
            </h2>
            <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity duration-300 pb-1">
              <span className="text-xs tracking-widest uppercase">
                See projects
              </span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 13L13 3M13 3H6M13 3V10"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default AguaProjects;
