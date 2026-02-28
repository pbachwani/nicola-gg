// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/all";
// import { SplitText } from "gsap/SplitText";
// import { twMerge } from "tailwind-merge";

// gsap.registerPlugin(ScrollTrigger, SplitText);

// const images = [
//   "/amazon-prime/1.jpg",
//   "/amazon-prime/2.jpg",
//   "/amazon-prime/3.jpg",
//   "/amazon-prime/4.jpg",
//   "/amazon-prime/5.jpg",
//   "/amazon-prime/6.jpg",
// ];

// const About = () => {
//   const sectionRef = useRef(null);
//   const imageRef = useRef(null);

//   // NEW: store all images
//   const imagesRef = useRef([]);
//   //   imagesRef.current = [];

//   const addToRefs = (el) => {
//     if (el && !imagesRef.current.includes(el)) {
//       imagesRef.current.push(el);
//     }
//   };

//   const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et pariatur aliquam quam. Maxime explicabo harum cumque error quaerat ipsa optio quisquam alias porro praesentium molestiae omnis, exercitationem esse vero laboriosam deserunt, modi obcaecati. Vero neque sequi blanditiis rerum, non molestiae error asperiores unde, odit dolores at tempora quaerat sit doloremque?`;

//   const words = text.split(" ");
//   const [currentWord, setCurrentWord] = useState(0);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.ticker.lagSmoothing(0);

//       const totalWords = words.length;

//       // EXISTING IMAGE HEIGHT ANIMATION (unchanged)
//       gsap.fromTo(
//         imageRef.current,
//         {
//           height: "0vh",
//         },
//         {
//           height: "100vh",
//           ease: "none",
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top top",
//             end: "+=500",
//             scrub: true,
//             pin: true,
//           },
//         },
//       );

//       // EXISTING TEXT HIGHLIGHT (unchanged)
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "+=800",
//         scrub: true,
//         onUpdate: (self) => {
//           const progress = self.progress;
//           const wordIndex = Math.floor(progress * totalWords);
//           setCurrentWord(wordIndex);
//         },
//       });

//       // 🔥 NEW: IMAGE CROSSFADE
//       if (imagesRef.current.length) {
//         const totalImages = imagesRef.current.length;

//         gsap.set(imagesRef.current, { opacity: 0 });
//         gsap.set(imagesRef.current[0], { opacity: 1 });

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top top",
//             end: "+=800",
//             scrub: true,
//           },
//         });

//         imagesRef.current.forEach((img, i) => {
//           if (i === 0) return;

//           tl.to(
//             img,
//             {
//               opacity: 1,
//               ease: "none",
//             },
//             i / totalImages,
//           );
//         });
//       }
//     }, sectionRef);

//     return () => ctx.revert();
//   }, [words.length]);

//   return (
//     <main className="relative">
//       <div className="sticky top-1/2 bg-transparent z-50 px-4 md:px-16 py-10">
//         <h1 className="md:text-2xl">
//           {words.map((word, wordIndex) => (
//             <span
//               key={wordIndex}
//               className={twMerge(
//                 "transition-colors duration-300 text-white/10 ",
//                 wordIndex < currentWord && "text-white",
//               )}
//             >
//               {word}{" "}
//             </span>
//           ))}
//         </h1>
//       </div>

//       <section ref={sectionRef} className="relative w-full">
//         {/* IMAGE WRAPPER */}
//         <div className="relative w-full h-screen">
//           <div
//             ref={imageRef}
//             className="absolute bottom-0 left-0 w-full h-full"
//           >
//             {/* 🔥 STACKED IMAGES */}
//             {images.map((src, i) => (
//               <img
//                 key={i}
//                 ref={addToRefs}
//                 src={src}
//                 alt=""
//                 className="absolute inset-0 w-full h-full object-cover opacity-0"
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default About;

"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/SplitText";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger, SplitText);

const images = [
  "/amazon-prime/1.jpg",
  "/amazon-prime/2.jpg",
  "/amazon-prime/3.jpg",
  "/amazon-prime/4.jpg",
  "/amazon-prime/5.jpg",
  "/amazon-prime/6.jpg",
  "/apple-security/1.jpg",
  "/apple-security/2.jpg",
  "/apple-security/3.jpg",
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

  const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et pariatur aliquam quam. Maxime explicabo harum cumque error quaerat ipsa optio quisquam alias porro praesentium molestiae omnis, exercitationem esse vero laboriosam deserunt, modi obcaecati. Vero neque sequi blanditiis rerum, non molestiae error asperiores unde, odit dolores at tempora quaerat sit doloremque?`;

  const words = text.split(" ");
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.ticker.lagSmoothing(0);

      const totalWords = words.length;
      const totalImages = images.length;

      // IMAGE HEIGHT (unchanged)
      gsap.fromTo(
        imageRef.current,
        {
          height: "0vh",
        },
        {
          height: "100vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=800",
            scrub: true,
            pin: true,
          },
        },
      );

      // TEXT HIGHLIGHT (unchanged)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
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
    <main className="relative">
      <div className="sticky top-1/3 bg-transparent z-50 px-4 md:px-16 py-10">
        <h1 className="md:text-2xl">
          {words.map((word, wordIndex) => (
            <span
              key={wordIndex}
              className={twMerge(
                "transition-colors duration-300 text-white/10 ",
                wordIndex < currentWord && "text-white",
              )}
            >
              {word}{" "}
            </span>
          ))}
        </h1>
      </div>

      <section ref={sectionRef} className="relative w-full">
        {/* IMAGE WRAPPER */}
        <div className="relative w-full h-screen">
          <div
            ref={imageRef}
            className="absolute bottom-0 left-0 w-full h-full"
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
        </div>
      </section>
    </main>
  );
};

export default About;
