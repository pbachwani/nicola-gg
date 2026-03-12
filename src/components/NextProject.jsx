"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

const NextProject = ({ nextProject }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;

    gsap.fromTo(
      el,
      {
        // scale: 0.75,
        opacity: 0,
        // borderRadius: "40px",
      },
      {
        // scale: 1,
        opacity: 1,
        // borderRadius: "0px",
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top 50%",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <div ref={containerRef} className="absolute w-full z-30">
      <Link
        href={`/projects/${nextProject.id}`}
        className="md:w-full h-full relative block"
      >
        <Image
          loading="lazy"
          width={16}
          height={9}
          src={nextProject.cover}
          alt=""
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
    </div>
  );
};

export default NextProject;
