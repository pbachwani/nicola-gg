"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NextProject = ({ nextProject }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;

    gsap.fromTo(
      el,
      {
        scale: 0.85,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
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
          className="w-full h-auto object-cover min-h-screen"
        />

        <div className="text-center z-40">
          <p className="absolute w-full top-2/3 opacity-50 text-xs">
            [next project]
          </p>

          <h2 className="absolute inset-0 top-1/2 text-xl md:text-2xl">
            {nextProject.name}
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default NextProject;
