"use client";

import Link from "next/link";
import { projects_nicola, projects_agua, projects } from "@/app/constants/data";
import { motion } from "motion/react";
import { RollText } from "./RollText";

export default function FeaturedProjects() {
  const allProjects = [...projects_nicola, ...projects_agua];
  return (
    <section className="px-6 md:px-16 py-32">
      <h1 className="text-2xl mb-10">Featured Projects</h1>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
        {projects.slice(0, 16).map((project) => {
          const span = project.span || "full";

          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className={`col-span-${span} group relative overflow-hidden max-lg:col-span-6`}
            >
              <motion.img
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.18, // 👈 stagger delay
                  ease: "easeOut",
                }}
                loading="eager"
                src={project.cover}
                alt={project.name}
                className="w-full h-full max-h-120 object-cover transition-transform duration-700 ease-out group-hover:scale-100 scale-110"
              />

              {/* hover overlay */}
              <div className="absolute inset-0 flex items-end md:p-6 p-4 bg-black/0 group-hover:bg-black/10 transition duration-200 ease-out ">
                <h3 className="text-white md:text-lg md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                  <RollText>{project.name}</RollText>
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
