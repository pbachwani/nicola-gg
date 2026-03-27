"use client";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const artists = [
  {
    id: "nicola",
    name: "Nicola Gasparri",
    href: "/artists/nicola",
    video: "/videos/Apple-Security.mp4",
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
    }, 7000);
  };

  useEffect(() => {
    resetCycle();
    return () => clearInterval(intervalRef.current);
  }, []);

  // When hovering, show that artist — when not, fall back to cycling active
  const displayId = hoveredId ?? artists[activeIndex].id;
  const displayArtist = artists.find((a) => a.id === displayId);

  return (
    <PageTransition>
      <div className="relative w-full min-h-svh bg-black overflow-hidden">
        {/* Background video — cycles on desktop too */}
        <AnimatePresence mode="wait">
          <motion.div
            key={displayArtist.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <video
              src={displayArtist.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 " />
          </motion.div>
        </AnimatePresence>

        {/* Artist list */}
        <div className="relative z-10 flex flex-col justify-end min-h-svh pb-16 px-6 md:px-16">
          <div className="w-full">
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
                  className="group block w-full"
                >
                  <div className="flex items-end justify-between w-full py-6 border-t border-white/15 transition-colors duration-300">
                    <div className="flex items-end gap-6">
                      <span className="text-white/30 text-xs tracking-widest mb-1">
                        {artist.index}
                      </span>
                      <motion.h2
                        className="text-white font-light tracking-tight leading-none"
                        animate={{
                          fontSize: isActive
                            ? "clamp(52px, 7vw, 72px)"
                            : "clamp(36px, 5vw, 56px)",
                          opacity: isActive ? 1 : 0.3,
                        }}
                        transition={{
                          duration: 0.45,
                          ease: [0.33, 1, 0.68, 1],
                        }}
                      >
                        {artist.name}
                      </motion.h2>
                    </div>

                    {/* See projects */}
                    <motion.div
                      className={`flex items-center gap-2 pb-1 hover:text-white text-white/50 transition-colors duration-200 ease-out`}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={` text-xs tracking-widest font-regular`}>
                        Show projects
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className=""
                      >
                        <path
                          d="M3 13L13 3M13 3H6M13 3V10"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Progress bar under active artist */}
                  <div className="h-px w-full bg-white/10 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={artist.id + activeIndex}
                          className="h-full bg-white/40"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0, transition: { duration: 0.2 } }}
                          transition={{ duration: 7, ease: "linear" }}
                          style={{ transformOrigin: "left" }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              );
            })}
            <div className="w-full border-t border-white/15" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ArtistsPage;
