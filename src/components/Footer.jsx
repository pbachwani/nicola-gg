"use client";
import React, { useState } from "react";
import ImageCompare from "./ImageCompare";
import Link from "next/link";
import { motion } from "motion/react";

const Footer = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit() {
    if (!email.trim() || !email.includes("@")) return;

    setLoading(true);
    setError(false);

    try {
      const res = await fetch(
        "https://lead-api-nine.vercel.app/api/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            website: "", // honeypot
          }),
        },
      );

      if (res.ok) {
        setDone(true);
        setEmail("");
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }

    setLoading(false);
  }
  return (
    <main className="h-full flex flex-col justify-end " id="footer">
      <>
        <motion.div
          key="contact-panel"
          className="px-4 md:px-16 py-10 w-full bg-black"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Content row */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 z-99">
            {/* Email */}
            <div className="flex justify-start items-baseline  gap-1">
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
              <div className="flex flex-col gap-2 text-xs text-white/30 w-fit">
                <p className="tracking-widest uppercase text-white/60 mb-1">
                  Give us a follow
                </p>
                <a
                  href="https://www.instagram.com/groundglass.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-500"
                  onClick={() => onClose?.()}
                >
                  Instagram
                </a>
                {/* <a
                  href="#"
                  className="hover:text-white transition-colors duration-500"
                  onClick={() => onClose?.()}
                >
                  Vimeo
                </a> */}
              </div>

              {/* site links */}
              {/* <div className="flex flex-col gap-2 text-xs text-white/30 w-fit">
                <p className="tracking-widest uppercase text-white/60 mb-1">
                  SiteLinks
                </p>
                <Link
                  href="/projects"
                  className="hover:text-white transition-colors duration-500"
                  onClick={() => onClose?.()}
                >
                  Work
                </Link>
                <Link
                  href="/artists"
                  className="hover:text-white transition-colors duration-500"
                  onClick={() => onClose?.()}
                >
                  Artist
                </Link>
              </div> */}

              {/* Newsletter */}
              <div className="flex flex-col gap-2">
                <p className="text-xs tracking-widest uppercase text-white/60">
                  Newsletter
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors w-56"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="border border-white/20 rounded-full px-4 py-2 text-xs hover:bg-white hover:text-black transition-colors"
                  >
                    {loading ? "..." : done ? "✓" : "Send"}
                  </button>
                </div>
                {error && (
                  <p className="text-red-400 text-xs pl-2">
                    Something went wrong.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Big wordmark and privacy */}
          <div className="mt-10 overflow-hidden h-fit">
            <div className="flex flex-col lg:flex-row h-full w-full justify-start items-start lg:items-end gap-4 lg:gap-10">
              {/* text */}
              {/* <div className="flex flex-row gap-4 text-xs">
                <Link
                  href={"/"}
                  className="text-white/30 hover:text-white transition-all duration-300 ease-out text-nowrap"
                  onClick={() => onClose?.()}
                >
                  Terms & Conditions
                </Link>
                <Link
                  href={"/"}
                  className="text-white/30 hover:text-white transition-all duration-300 ease-out text-nowrap"
                  onClick={() => onClose?.()}
                >
                  Privacy Policy
                </Link>
              </div> */}

              {/* image */}
              <div className="w-full">
                <img
                  src="/logo-files/PNG/white horizontal.png"
                  alt=""
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </main>
  );
};

export default Footer;
