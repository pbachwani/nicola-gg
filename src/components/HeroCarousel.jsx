"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { cdnBase } from "@/app/constants/data";

const slides = [
  {
    src: `${cdnBase}/homepage/01_Apple_Security_HP.mp4`,
    project: "Apple Security",
    index: "01",
  },
  {
    src: `${cdnBase}/homepage/01_Samsung_HP.mp4`,
    project: "Samsung",
    index: "02",
  },
  {
    src: `${cdnBase}/homepage/Astropulse_Final_HP.mp4.mp4`,
    project: "Astropulse",
    index: "03",
  },
  {
    src: `${cdnBase}/homepage/04_Lotus_HP.mp4`,
    project: "Lotus Limitless",
    index: "04",
  },
];

const AUTOPLAY_DELAY = 8500;

export default function HeroCarousel() {
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
  const [preloaderDone, setPreloaderDone] = useState(false);

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
    const onDone = () => setPreloaderDone(true);
    window.addEventListener("preloader:done", onDone);
    return () => window.removeEventListener("preloader:done", onDone);
  }, []);

  useEffect(() => () => clearInterval(progressInterval.current), []);

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

    autoplayRef.current?.reset();
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, startProgress, preloaderDone]);

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
    <>
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
                ref={(el) => (videoRefs.current[i] = el)}
                src={slide.src}
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                loop
                muted
                controlsList="nodownload noplaybackrate"
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
                starttime={0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project name + progress bar */}
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
            <div className="mt-2 w-xs h-px bg-white/10 overflow-hidden ml-0.5">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </AnimatePresence>
      </div>
    </>
  );
}
