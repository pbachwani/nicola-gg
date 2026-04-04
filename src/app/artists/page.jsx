"use client";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransitionProvider from "@/components/TransitionProvider";

const artists = [
  {
    id: "nicola",
    name: "Nicola Gasparri",
    href: "/artists/nicola",
    video:
      "https://nicola-gasparri.b-cdn.net/project-videos/hsrLaunchshow_MIP01.mp4",
    index: "01",
  },
  {
    id: "agua",
    name: "Agua",
    href: "/artists/agua",
    video: "/videos/Apple-Security.mp4",
    index: "02",
  },
];

const ArtistsPage = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const resetCycle = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % artists.length);
    }, 5000);
  };

  useEffect(() => {
    resetCycle();
    return () => clearInterval(intervalRef.current);
  }, []);

  const displayId = hoveredId ?? artists[activeIndex].id;
  const displayArtist = artists.find((a) => a.id === displayId);

  return (
    <PageTransition>
      <div className="relative w-full min-h-svh bg-black overflow-hidden px-4 md:px-16">
        {/* Background video */}
        <AnimatePresence mode="wait">
          <motion.div
            key={displayArtist.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <video
              src={displayArtist.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0" />
          </motion.div>
        </AnimatePresence>

        {/* Centered artist list */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center pb-20 min-h-svh gap-4">
          {artists.map((artist) => {
            const isActive = displayId === artist.id;
            return (
              <Link
                key={artist.id}
                href={artist.href}
                onMouseEnter={() => {
                  setHoveredId(artist.id);
                  resetCycle();
                }}
                onMouseLeave={() => setHoveredId(null)}
                className="group min-w-xs flex flex-col items-center"
              >
                {/* Name row */}
                <div className="flex items-center md:justify-center py-2 px-2 w-full relative">
                  <motion.h2
                    className="text-white font-light tracking-tight leading-none text-center md:min-h-10"
                    animate={{
                      fontSize: isActive
                        ? // ? "clamp(20px, 3vw, 24px)"
                          // : "clamp(16px, 1vw, 20px)",
                          "24px"
                        : "20px",
                      opacity: isActive ? 1 : 0.25,
                    }}
                    transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {artist.name}
                  </motion.h2>

                  {/* See projects — right absolute */}
                  {/* <motion.div
                    className="absolute right-8 md:right-16 flex items-center gap-1.5"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white/50 text-[10px] tracking-widest uppercase hidden md:block">
                      See projects
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-white/50"
                    >
                      <path
                        d="M3 13L13 3M13 3H6M13 3V10"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </motion.div> */}
                </div>

                {/* Progress bar */}
                {/* <div className="w-full max-w-xs max-md:hidden h-px bg-white/0 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={artist.id + activeIndex}
                        className={`h-full bg-white/0 ${isActive && "bg-white/70"}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{
                          opacity: 0,
                          // scaleX: "100%",
                          transition: { duration: 0.2 },
                        }}
                        transition={{ duration: 5, ease: "linear" }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}
                  </AnimatePresence>
                </div> */}
              </Link>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
};

export default ArtistsPage;
