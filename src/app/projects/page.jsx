"use client";
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "../constants/data";

export default function Work() {
  // console.log(projects[0].id);
  return (
    <PageTransition>
      <div className="text-white min-h-screen px-4 md:px-16 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 relative mt-20">
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
