"use client";
import { projects } from "@/app/constants/data";
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import React from "react";

const NicolaProjects = () => {
  return (
    <PageTransition>
      <div className="min-h-screen px-4 md:px-16 py-20">
        {/* Heading */}
        <div className="flex w-full justify-between items-baseline">
          <h1 className="text-2xl md:text-4xl font-semibold my-16 opacity-80">
            Nicola&apos;s projects
          </h1>
          <Link href={"/"}>
            <h3 className="font-regular text-right text-sm">
              See Agua&apos;s projects
            </h3>
          </Link>
        </div>

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
