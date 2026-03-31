"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Page = () => {
  const markRef = useRef(null);
  const stackedRef = useRef(null);
  const navLogoRef = useRef(null);

  useEffect(() => {
    const mark = markRef.current;
    const stacked = stackedRef.current;
    const navLogo = navLogoRef.current;

    // Get final position of nav logo for the "fly to nav" animation
    const getNavLogoRect = () => navLogo.getBoundingClientRect();

    const tl = gsap.timeline();

    // -- Phase 1: Logo mark appears
    tl.fromTo(
      mark,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
    )

      // -- Phase 2: Logo mark fades out, stacked logo fades in (centered)

      .to(
        mark,
        {
          rotate: 180,
          duration: 0.6,
          x: "-50%",
          ease: "power2.inOut",
          delay: 0.5,
        },
        // "-=0.5",
      )
      .to(
        mark,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          delay: 1.5,
        },
        // "+=2",
      )

      .fromTo(
        stacked,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          //   delay: 0.5,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.9",
      )

      // -- Phase 3: Stacked logo flies to top-left nav position
      .add(() => {
        // Capture positions right before animating
        const stackedRect = stacked.getBoundingClientRect();
        const navRect = getNavLogoRect();

        const dx = navRect.left - stackedRect.left;
        const dy = navRect.top - stackedRect.top;
        const scaleX = navRect.width / stackedRect.width;
        const scaleY = navRect.height / stackedRect.height;
        const scale = Math.min(scaleX, scaleY);

        gsap.to(stacked, {
          x: dx,
          y: dy,
          scale,
          transformOrigin: "top left",
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            // Swap: hide animated logo, show real nav logo
            gsap.set(stacked, { opacity: 0 });
            gsap.to(navLogo, { opacity: 1, duration: 0.15 });
          },
        });
      }, "+=0.6");

    return () => tl.kill();
  }, []);

  return (
    <div className="relative w-full min-h-svh bg-black">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-16 py-4 z-50">
        {/* Nav logo — hidden until animation swaps to it */}
        <img
          ref={navLogoRef}
          src="/logo-files/PNG/white stacked.png"
          alt="Ground Glass Studio"
          className="h-16 w-auto object-contain"
          style={{ opacity: 0 }}
        />
        {/* <div className="flex gap-8 text-white text-sm tracking-widest">
          <a href="#">Work</a>
          <a href="#">Artists</a>
          <a href="#">Contact</a>
        </div> */}
      </nav>

      {/* Center stage */}
      <main className="w-full min-h-svh flex justify-center items-center">
        {/* Phase 1: Logo mark (icon only) */}
        <img
          ref={markRef}
          src="/logo-files/PNG/white logo mark.png"
          alt="logo mark"
          className="h-20 w-auto object-contain absolute"
          style={{ opacity: 0 }}
        />

        {/* Phase 2+3: Full stacked logo */}
        <img
          ref={stackedRef}
          src="/logo-files/PNG/white stacked.png"
          alt="Ground Glass Studio"
          className="h-20 w-auto object-contain absolute"
          style={{ opacity: 0 }}
        />
      </main>
    </div>
  );
};

export default Page;
