"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

const NextProject = ({ nextProject }) => {
  const containerRef = useRef(null);

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   const el = containerRef.current;

  //   gsap.fromTo(
  //     el,
  //     {
  //       // scale: 0.75,
  //       opacity: 0,
  //       // borderRadius: "40px",
  //     },
  //     {
  //       // scale: 1,
  //       opacity: 1,
  //       // borderRadius: "0px",
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: el,
  //         start: "top bottom",
  //         end: "top 50%",
  //         // scrub: true,
  //       },
  //     },
  //   );
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 80 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="relative w-full z-30 overflow-hidden"
    >
      <motion.div
        initial={{ borderRadius: 48 }}
        whileInView={{ borderRadius: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-full overflow-hidden"
      >
        <Link
          href={`/projects/${nextProject.id}`}
          className="md:w-full h-full relative block"
          onClick={() => console.log(nextProject.id)}
        >
          <Image
            loading="lazy"
            width={16}
            height={9}
            src={nextProject.cover}
            alt=""
            onLoadingComplete={() => {
              ScrollTrigger.refresh();
            }}
            className="w-full object-cover min-h-screen max-h-screen"
          />

          <motion.div className="text-center z-40">
            {/* small label */}
            <div className="absolute w-full top-[45%] overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                transition={{
                  duration: 0.7,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.1,
                }}
                className="opacity-50 text-xs"
              >
                [next project]
              </motion.p>
            </div>

            {/* project name */}
            <div className="absolute w-full top-[50%] overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                transition={{
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.15,
                }}
                className="text-xl md:text-2xl"
              >
                {nextProject.name}
              </motion.h2>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NextProject;
