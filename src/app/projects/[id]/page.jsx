import { projects } from "@/app/constants/data";
import PageTransition from "@/components/PageTransition";
import ProjectHero from "@/components/ProjectHero";
import ProjectHeroMedia from "@/components/ProjectHeroMedia";
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }) {
  const { id } = await params;

  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-black text-white">
      <ScrollToTopOnMount />
      <ProjectHero project={project} />
      <PageTransition>
        {/* project video */}
        <ProjectHeroMedia project={project} />
        {/* v1 - personal */}
        {/* ✅ SCROLLING IMAGES */}
        <div className="flex flex-col items-center gap-10 py-10 md:pb-40 pb-80">
          {project.images?.map((img, i) => (
            <div key={i} className="w-[90%] md:w-[65%]">
              <img
                src={img}
                alt=""
                className="w-full h-auto object-cover transition-transform duration-500 ease-out hover:scale-[1.05]"
              />
            </div>
          ))}
        </div>
      </PageTransition>
    </div>
  );
}

{
  /* v2 */
}

{
  /* <div className="flex flex-col">
          {project.images?.map((img, i) => (
            <div key={i} className="h-[150vh] flex items-center justify-center">
              <div className="sticky top-1/2 -translate-y-1/2 w-[90%] md:w-[65%] border border-white/20">
                <img src={img} alt="" className="w-full h-auto object-cover" />
              </div>
            </div>
          ))}
        </div> */
}
