import { projects } from "@/app/constants/data";
import PageTransition from "@/components/PageTransition";

import { notFound } from "next/navigation";

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
    <PageTransition>
      <div className="">
        <h1 className="text-2xl">{project.name}</h1>
        <div className="h-screen flex justify-center items-center">page 1</div>
        <div className="h-screen flex justify-center items-center">page 2</div>
        <div className="h-screen flex justify-center items-center">page 3</div>
        <div className="h-screen flex justify-center items-center">page 4</div>
      </div>
    </PageTransition>
  );
}
