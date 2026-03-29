"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState, useCallback } from "react";

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
  const autoplayRef = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false }),
  );

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

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
      startProgress();
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, startProgress]);

  useEffect(() => () => clearInterval(progressInterval.current), []);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
    autoplayRef.current?.reset();
  };
  const scrollNext = () => {
    emblaApi?.scrollNext();
    autoplayRef.current?.reset();
  };

  const videoRefs = useRef([]);

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean);
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      },
      { threshold: 0.3 },
    );

    videos.forEach((vid) => observer.observe(vid));
    return () => videos.forEach((vid) => observer.unobserve(vid));
  }, []);

  return (
    <section className="relative w-full h-svh overflow-hidden">
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
                autoPlay
                loop
                muted
                controlsList="nodownload noplaybackrate"
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
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
            {/* <div className="flex gap-4 items-center">
              <p className="text-white/20 text-xs tracking-[0.2em] uppercase mb-2">
                [
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                >
                  {slides[activeIndex].index} /{" "}
                </motion.span>
                {String(slides.length).padStart(2, "0")}]
              </p>
              <div className="flex items-center gap-2 z-10 mb-2">
                <button
                  onClick={scrollPrev}
                  className="text-white/20 hover:text-white transition-colors duration-200 text-xs tracking-[0.15em]  hover:cursor-pointer"
                >
                  Prev
                </button>
                <div className="w-px h-3 bg-white/20" />
                <button
                  onClick={scrollNext}
                  className="text-white/20 hover:text-white transition-colors duration-200 text-xs tracking-[0.15em]  hover:cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div> */}
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

      {/* Prev / Next */}
      {/* <div className="absolute bottom-12 right-8 md:right-14 flex items-center gap-5 z-10">
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
      </div> */}
    </section>
  );
};

export default Hero;
