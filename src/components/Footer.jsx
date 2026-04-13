"use client";
import React from "react";
import ImageCompare from "./ImageCompare";
import Link from "next/link";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <main className="h-full flex flex-col justify-end" id="footer">
      <>
        {/* <motion.div
          key="contact-backdrop"
          className="fixed inset-0 z-50 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        /> */}

        <motion.div
          key="contact-panel"
          className="px-4 md:px-16 py-10 w-full"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Close button */}
          {/* <button
            className="absolute top-6 right-8 text-white/40 hover:text-white transition-colors"
            onClick={() => setContactOpen(false)}
            aria-label="Close contact"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line
                x1="2"
                y1="2"
                x2="18"
                y2="18"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <line
                x1="18"
                y1="2"
                x2="2"
                y2="18"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button> */}

          {/* Content row */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
            {/* Email */}
            <div className="flex justify-start items-baseline ">
              <p className="md:text-3xl tracking-widest mb-2 text-white/30">
                Say
              </p>
              <a
                href="mailto:hello@groundglass.com"
                className="md:text-3xl font-light tracking-tight text-white hover:text-white/30 transition-all duration-200 ease-out"
              >
                hello@groundglass.com
              </a>
            </div>
            <div className="flex flex-col gap-8 sm:flex-row justify-between w-full xl:pl-20">
              {/* Socials */}
              <div className="flex flex-col gap-2 text-xs text-white/50 w-fit">
                <p className="tracking-widest uppercase text-white/30 mb-1">
                  Follow
                </p>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Vimeo
                </a>
              </div>

              {/* site links */}
              <div className="flex flex-col gap-2 text-xs text-white/50 w-fit">
                <p className="tracking-widest uppercase text-white/30 mb-1">
                  SiteLinks
                </p>
                <Link
                  href="/projects"
                  className="hover:text-white transition-colors"
                >
                  Work
                </Link>
                <Link
                  href="/artists"
                  className="hover:text-white transition-colors"
                >
                  Artist
                </Link>
              </div>

              {/* Newsletter */}
              <div className="flex flex-col gap-2">
                <p className="text-xs tracking-widest uppercase text-white/30">
                  Newsletter
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-transparent border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors w-56"
                  />
                  <button className="border border-white/20 rounded-full px-4 py-2 text-xs hover:bg-white hover:text-black transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Big wordmark */}
          <div className="mt-10 overflow-hidden h-fit">
            <div className="flex flex-col h-full w-full justify-end items-center p-4">
              <img
                src="/logo-files/PNG/white horizontal.png"
                alt=""
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>
      </>
    </main>
  );
};

export default Footer;
