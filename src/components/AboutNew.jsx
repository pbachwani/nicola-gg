"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

const AboutNew = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const lineRef = useRef(null);
  const labelRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.ticker.lagSmoothing(0);

      const split = new SplitText(headingRef.current, { type: "lines" });

      gsap.set(split.lines, { yPercent: 100, opacity: 0 });
      gsap.set(bodyRef.current, { opacity: 0, y: 16 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(labelRef.current, { opacity: 0, y: 8 });
      gsap.set(imageRef.current, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ paused: true });

      tl.to(
        labelRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5",
      )
        .to(split.lines, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        })

        .to(
          bodyRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4",
        )
        .to(
          lineRef.current,
          { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
          "-=0.4",
        )
        .to(
          imageRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "+=0.1",
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full md:min-h-screen flex items-center px-6 gap-10 md:px-16 py-24"
    >
      <div className="max-w-5xl w-full">
        {/* Label */}
        <p
          ref={labelRef}
          className="text-white/30 text-xs tracking-[0.25em] font-mono uppercase mb-8"
        >
          About
        </p>

        {/* Heading — overflow hidden per line for mask reveal */}
        <div className="overflow-hidden mb-6">
          <h2
            ref={headingRef}
            className="text-white text-xl md:text-3xl font-light leading-snug"
          >
            Groundglass is a boutique colour studio with roots in Florence and
            Shanghai.
          </h2>
        </div>

        {/* Divider line */}
        <div ref={lineRef} className="w-full h-px bg-white/15 mb-8" />

        {/* Body */}
        <p
          ref={bodyRef}
          className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl font-light"
        >
          A cross-cultural perspective shapes a refined approach to
          image-making. Our team brings together different sensibilities and
          experiences, creating distinctive work through a careful balance of
          taste, precision, and cinematic craft.
        </p>
      </div>
      <div className="max-lg:hidden w-fit relative" ref={imageRef}>
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 backdrop-blur-xs rounded-lg">
          <p className="text-white text-lg tracking-wide">
            [studio coming soon]
          </p>
        </div>

        <img
          src="/studio-image.webp"
          alt="Studio Image"
          className="object-cover w-auto h-full rounded-lg"
        />
      </div>
    </section>
  );
};

export default AboutNew;
