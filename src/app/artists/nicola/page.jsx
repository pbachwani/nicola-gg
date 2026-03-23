"use client";
import { projects } from "@/app/constants/data";
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import React from "react";

const NicolaProjects = () => {
  return (
    <PageTransition>
      <div className="text-white min-h-screen px-4 md:px-16 py-20">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-semibold my-16 opacity-80">
          Projects
        </h1>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 relative">
          {projects?.map((project, i) => {
            if (!project) return null;

            return (
              <ProjectCard key={project.id || i} project={project} i={i} />
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
};

export default NicolaProjects;
