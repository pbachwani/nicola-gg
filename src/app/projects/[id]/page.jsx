import NextProject from "@/components/NextProject";
import PageTransition from "@/components/PageTransition";
import ProjectContent from "@/components/ProjectContent";
import ProjectHeroMedia from "@/components/ProjectHeroMedia";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProjects } from "@/app/constants/data";
import { Suspense } from "react";

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ id: project.id }));
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const projects = getAllProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <PageTransition>
      <ProjectContent project={project} />

      <ProjectHeroMedia project={project} />

      <div className="flex flex-col items-center gap-10 py-10">
        {project.images?.map((img, i) => (
          <div key={i} className="w-[90%] md:w-[65%]">
            <Image
              width={"7500"}
              height={"4000"}
              src={img}
              alt=""
              className="w-full h-auto object-cover transition-transform duration-500 ease-out hover:scale-[1.05]"
            />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Suspense fallback={null}>
          <NextProject currentId={id} />
        </Suspense>
      </div>
    </PageTransition>
  );
}
