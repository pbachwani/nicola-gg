"use client";

import Link from "next/link";
import { projects_nicola } from "@/app/constants/data";
import { motion } from "motion/react";

export default function FeaturedProjects() {
  return (
    <section className="px-6 md:px-16 py-32">
      <h1 className="text-2xl mb-10">Selected Projects</h1>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
        {projects_nicola.map((project) => {
          const span = project.span || 3;

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
                loading="lazy"
                src={project.cover}
                alt={project.name}
                className="w-full h-full max-h-120 object-cover transition-transform duration-700 ease-out group-hover:scale-100 scale-110"
              />

              {/* hover overlay */}
              <div className="absolute inset-0 flex items-end md:p-6 p-4 bg-black/0 group-hover:bg-black/10 transition duration-200 ease-out ">
                <h3 className="text-white md:text-lg md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                  {project.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
