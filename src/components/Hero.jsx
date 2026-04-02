"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState, useCallback } from "react";
import cursor from "@/app/data/cursor1.svg";
import { usePreloader } from "@/app/context/PreloaderContext";

const slides = [
  {
    src: "https://nicola-gasparri.b-cdn.net/homepage/01_Apple_Security_HP.mp4",
    project: "Apple Security",
    index: "01",
  },
  {
    src: "https://nicola-gasparri.b-cdn.net/homepage/01_Samsung_HP.mp4",
    project: "Samsung",
    index: "02",
  },
  {
    src: "https://nicola-gasparri.b-cdn.net/homepage/Astropulse_Final_HP.mp4.mp4",
    project: "Astropulse",
    index: "03",
  },
  {
    src: "https://nicola-gasparri.b-cdn.net/homepage/04_Lotus_HP.mp4",
    project: "Lotus Limitless",
    index: "04",
  },
];

const AUTOPLAY_DELAY = 8500;

const Hero = () => {
  const { preloaderDone } = usePreloader();

  const autoplayRef = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false }),
  );
  const videoRefs = useRef([]);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: "trimSnaps" },
    [autoplayRef.current],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);

  const startProgress = useCallback(() => {
    setProgress(0);
    clearInterval(progressInterval.current);
    const start = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(progressInterval.current);
    }, 30);
  }, []);

  // useEffect(() => {
  //   if (!emblaApi) return;
  //   const onSelect = () => {
  //     setActiveIndex(emblaApi.selectedScrollSnap());
  //     startProgress();
  //   };
  //   emblaApi.on("select", onSelect);
  //   onSelect();
  //   return () => emblaApi.off("select", onSelect);
  // }, [emblaApi, startProgress]);

  // useEffect(() => () => clearInterval(progressInterval.current), []);

  // useEffect(() => {
  //   if (!preloaderDone) return;

  //   const videos = videoRefs.current.filter(Boolean);
  //   if (!videos.length) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) entry.target.play();
  //       else entry.target.pause();
  //     },
  //     { threshold: 0.3 },
  //   );

  //   videos.forEach((vid) => {
  //     vid.currentTime = 0;
  //     observer.observe(vid);
  //   });

  //   return () => videos.forEach((vid) => observer.unobserve(vid));
  // }, [preloaderDone]);

  // useEffect(() => {
  //   if (!emblaApi) return;
  //   const onSelect = () => {
  //     const index = emblaApi.selectedScrollSnap();
  //     setActiveIndex(index);
  //     startProgress();

  //     // Reset the active slide's video to the start
  //     const activeVideo = videoRefs.current[index];
  //     if (activeVideo) {
  //       activeVideo.currentTime = 0;
  //       activeVideo.play();
  //     }
  //   };
  //   emblaApi.on("select", onSelect);
  //   onSelect();
  //   return () => emblaApi.off("select", onSelect);
  // }, [emblaApi, startProgress]);
  // 1. Cleanup progress interval on unmount
  useEffect(() => () => clearInterval(progressInterval.current), []);

  // 2. Start videos + progress bar after preloader, reset on slide change
  useEffect(() => {
    if (!emblaApi || !preloaderDone) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setActiveIndex(index);
      startProgress();

      const activeVideo = videoRefs.current[index];
      if (activeVideo) {
        activeVideo.currentTime = 0;
        activeVideo.play();
      }
    };

    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, startProgress, preloaderDone]);

  // 3. IntersectionObserver — pause/play based on visibility
  useEffect(() => {
    if (!preloaderDone) return;

    const videos = videoRefs.current.filter(Boolean);
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.play();
        else entry.target.pause();
      },
      { threshold: 0.3 },
    );

    videos.forEach((vid) => {
      vid.currentTime = 0;
      observer.observe(vid);
    });

    return () => videos.forEach((vid) => observer.unobserve(vid));
  }, [preloaderDone]);
  return (
    <section
      className="relative w-full h-svh overflow-hidden"
      style={{
        cursor: `url(${cursor.src}), auto`,
      }}
    >
      {/* Embla viewport */}
      <div className="w-full h-full overflow-hidden" ref={emblaRef}>
        <div id="hero-video" className="flex h-full">
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{ flex: "0 0 100%" }}
              className="relative h-full"
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)} // 👈 replaces ref={videoRef}
                src={slide.src}
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                loop
                muted
                controlsList="nodownload noplaybackrate"
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
                starttime={0.1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />

      {/* Project name — animated on slide change */}
      <div className="absolute bottom-12 left-1/2 max-md:-translate-x-1/2 md:left-14">
        <AnimatePresence mode="wait">
          <div className="max-w-sm max-md:text-center">
            <motion.h2
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-white/80 text-2xl md:text-3xl font-light tracking-wide"
            >
              {slides[activeIndex].project}
            </motion.h2>

            {/* Progress bar */}
            <div className="mt-2 w-xs h-px bg-white/20 overflow-hidden ml-0.5">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;

// const scrollPrev = () => {
//   emblaApi?.scrollPrev();
//   autoplayRef.current?.reset();
// };
// const scrollNext = () => {
//   emblaApi?.scrollNext();
//   autoplayRef.current?.reset();
// };

{
  /* Prev / Next */
}
{
  /* <div className="absolute bottom-12 right-8 md:right-14 flex items-center gap-5 z-10">
        <button
          onClick={scrollPrev}
          className="text-white/20 hover:text-white transition-colors duration-200 text-xs tracking-[0.15em] uppercase hover:cursor-pointer"
        >
          Prev
        </button>
        <div className="w-px h-3 bg-white/20" />
        <button
          onClick={scrollNext}
          className="text-white/20 hover:text-white transition-colors duration-200 text-xs tracking-[0.15em] uppercase hover:cursor-pointer"
        >
          Next
        </button>
      </div> */
}
