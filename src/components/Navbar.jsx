"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Contact from "@/app/contact/page";
import Footer from "./Footer";

const links = [
  // { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/artists", label: "Artists" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [footerVisible, setFooterVisible] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // wherever you initialize Lenis

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 50) setShow(false);
      else setShow(true);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

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
        <div className={`flex w-full h-full justify-between items-center`}>
          <Link href="/" className="">
            <Image
              alt="Ground Glass logo"
              width={100}
              height={100}
              src="/logo-files/PNG/white stacked.png"
              className="w-auto h-12 object-cover"
              onClick={() => window.scrollTo({ top, behavior: "smooth" })}
            />
          </Link>

          {/* Desktop links */}
          <div className="flex gap-2 text-sm max-md:hidden mt-1 cursor-pointer">
            <Link href={"/projects"} className="hover:cursor-pointer">
              Work
            </Link>
            <Link href={"/artists"} className="hover:cursor-pointer">
              Artists
            </Link>
            <button
              onClick={() => {
                console.log("contact clicked");
                setFooterVisible(!footerVisible);
              }}
              className="hover:cursor-pointer"
            >
              Contact
            </button>
            {/* {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:cursor-pointer">
                {l.label}
              </Link>
            ))} */}
          </div>

          {/* Hamburger button— mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-end gap-1.5 w-8 h-8"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span
              className={`block h-px w-6 bg-current ${drawerOpen && "w-8"} transition-all duration-500 ease-out`}
            />
            <span
              className={`block h-px w-4 bg-current ${drawerOpen && "w-8"} transition-all duration-500 ease-out`}
            />
            <span
              className={`block h-px w-2 bg-current ${drawerOpen && "w-8"} transition-all duration-500 ease-out`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Drawer for mobile */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="drawer"
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs z-50 bg-black flex flex-col px-8 py-10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Close */}
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

              {/* Nav links */}
              <nav className="flex flex-col gap-1">
                {links.map((l, i) => (
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
              </nav>

              {/* Footer detail */}
              <motion.p
                className="mt-auto text-white/20 text-xs tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link href={"/"}>{/* <img src="" alt="" /> */}</Link>
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
