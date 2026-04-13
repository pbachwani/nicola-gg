"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { RollText } from "./RollText";

const mobileLinks = [
  { href: "/projects", label: "Work" },
  { href: "/artists", label: "Artists" },
];

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen || contactOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, contactOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={clsx(
          "fixed w-full h-20 z-40 transition-all duration-250 ease-out-quint px-4 md:px-16 my-2",
          show ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="flex w-full h-full justify-between items-center">
          <Link href="/">
            <Image
              alt="Ground Glass logo"
              width={100}
              height={100}
              src="/logo-files/PNG/white stacked.png"
              className="w-auto h-12 object-cover"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </Link>

          {/* Desktop links */}
          <div className="flex gap-4 text-sm max-md:hidden mt-1 uppercase font-extralight">
            <Link href="/projects">
              <RollText>Work</RollText>
            </Link>
            <Link href="/artists">
              <RollText>Artists</RollText>
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="uppercase hover:cursor-pointer"
            >
              <RollText>Contact</RollText>
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-end gap-1.5 w-8 h-8"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span
              className={clsx(
                "block h-px bg-current transition-all duration-500 ease-out",
                drawerOpen ? "w-8" : "w-6",
              )}
            />
            <span
              className={clsx(
                "block h-px bg-current transition-all duration-500 ease-out",
                drawerOpen ? "w-8" : "w-4",
              )}
            />
            <span
              className={clsx(
                "block h-px bg-current transition-all duration-500 ease-out",
                drawerOpen ? "w-8" : "w-2",
              )}
            />
          </button>
        </div>
      </motion.nav>

      {/* Contact overlay */}
      <AnimatePresence>
        {contactOpen && (
          <>
            <motion.div
              key="contact-backdrop"
              className="fixed inset-0 z-50 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setContactOpen(false)}
            />

            <motion.div
              key="contact-panel"
              className="fixed bottom-0 left-0 right-0 z-50 bg-black border border-white/10 rounded-t-3xl px-4 md:px-16 py-10 w-full"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Close button */}
              <button
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
              </button>

              {/* Content row */}
              <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
                {/* Email */}
                <div className="flex justify-start items-baseline">
                  <p className="md:text-2xl tracking-widest mb-2 text-white/30">
                    Say
                  </p>
                  <a
                    href="mailto:hello@groundglass.com"
                    className="md:text-3xl font-light tracking-tight text-white hover:text-white/30 transition-all duration-200 ease-out"
                  >
                    hello@groundglass.com
                  </a>
                </div>
                <div className="flex flex-col gap-8 sm:flex-row justify-between w-full">
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
                      onClick={() => setContactOpen(false)}
                    >
                      Work
                    </Link>
                    <Link
                      href="/artists"
                      className="hover:text-white transition-colors"
                      onClick={() => setContactOpen(false)}
                    >
                      Artist
                    </Link>
                  </div>

                  {/* Newsletter */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs tracking-widest uppercase text-white/30">
                      Newsletter
                    </p>
                    <div className="space-x-2 space-y-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-transparent border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors min-w-20 text-[10px]"
                      />
                      <button className="border border-white/20 rounded-full px-4 py-2 text-xs hover:bg-white hover:text-black transition-colors flex-wrap">
                        Submit
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
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
            />

            <motion.div
              key="mobile-drawer"
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs z-50 bg-black flex flex-col px-8 py-10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              <button
                className="self-end mb-14 text-white/40 hover:text-white transition-colors"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
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
              </button>

              <nav className="flex flex-col gap-1">
                {mobileLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.15 + i * 0.07,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setDrawerOpen(false)}
                      className="block text-white text-3xl font-light tracking-wide py-3 border-b border-white/10 hover:text-white/60 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    setContactOpen(true);
                  }}
                  className="hover:cursor-pointer block text-white text-3xl font-light tracking-wide py-3 border-b border-white/10 hover:text-white/60 transition-colors text-left"
                >
                  Contact
                </button>
              </nav>

              {/* Email + socials for mobile */}
              {/* <motion.div
                className="mt-auto flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2>Reach Out</h2>
                <a
                  href="mailto:hello@groundglass.com"
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  hello@groundglass.com
                </a>
                <div className="flex gap-4 text-xs text-white/30 uppercase tracking-widest">
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Vimeo
                  </a>
                </div>
              </motion.div> */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
