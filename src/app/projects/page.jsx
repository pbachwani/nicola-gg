"use client";
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "../constants/data";

export default function ProjectsPage() {
  console.log(projects[0].id); // this is showing data
  return (
    <PageTransition>
      <div className="bg-black text-white min-h-screen px-6 md:px-12 py-20">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-semibold mb-16 opacity-80">
          Projects
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative">
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
}
