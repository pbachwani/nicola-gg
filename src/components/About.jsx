"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/SplitText";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger, SplitText);

const images = [
  "nicola/amazon-prime/1.jpg",
  "nicola/amazon-prime/2.jpg",
  "nicola/amazon-prime/3.jpg",
  "nicola/amazon-prime/4.jpg",
  "nicola/amazon-prime/5.jpg",
  "nicola/amazon-prime/6.jpg",
  "nicola/apple-security/1.jpg",
  "nicola/apple-security/2.jpg",
  "nicola/apple-security/3.jpg",
];

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const imagesRef = useRef([]);
  //   imagesRef.current = [];

  const addToRefs = (el) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  const text = `Groundglass is a boutique colour studio with roots in Florence and Shanghai, where a cross-cultural perspective shapes a refined approach to image-making. Our team brings together different sensibilities and experiences, creating distinctive work through a careful balance of taste, precision, and cinematic craft.`;

  const words = text.split(" ");
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.ticker.lagSmoothing(0);

      const totalWords = words.length;
      const totalImages = images.length;

      // IMAGE HEIGHT (unchanged)
      // gsap.fromTo(
      //   imageRef.current,
      //   {
      //     height: "0vh",
      //   },
      //   {
      //     height: "100vh",
      //     ease: "none",
      //     scrollTrigger: {
      //       trigger: sectionRef.current,
      //       start: "top top",
      //       end: "+=800",
      //       scrub: true,
      //       pin: true,
      //     },
      //   },
      // );

      // TEXT HIGHLIGHT (unchanged)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "+=800",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const wordIndex = Math.floor(progress * totalWords);
          setCurrentWord(wordIndex);
        },
      });

      // 🔥 IMAGE SWITCH (NO FADE)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=800",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.min(
            totalImages - 1,
            Math.floor(progress * totalImages),
          );

          imagesRef.current.forEach((img, i) => {
            img.style.opacity = i === activeIndex ? "1" : "0";
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [words.length]);

  return (
    <main className="relative -z-10">
      <div className="sticky top-1/2 -translate-y-1/2 bg-transparent px-4 md:px-16 py-10">
        <h1 className="md:text-3xl text-left max-w-6xl leading-snug">
          {words.map((word, wordIndex) => (
            <span
              key={wordIndex}
              className={twMerge(
                "transition-colors duration-500 text-white/10 opacity-20 blur-sm cursor-default",
                wordIndex < currentWord && "text-white blur-none opacity-100",
              )}
            >
              {word}{" "}
            </span>
          ))}
        </h1>
      </div>

      <section
        ref={sectionRef}
        className="relative w-full min-h-screen h-[150vh]"
      >
        {/* IMAGE WRAPPER */}
        {/* <div className="relative w-full h-svh">
          <div
            ref={imageRef}
            className="absolute bottom-0 left-0 w-full h-full opacity-50"
          >
            {images.map((src, i) => (
              <img
                key={i}
                ref={addToRefs}
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: i === 0 ? 1 : 0, duration: 0.15 }}
              />
            ))}
          </div>
        </div> */}
      </section>
    </main>
  );
};

export default About;
