"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 50) {
        // scrolling down
        setShow(false);
      } else {
        // scrolling up
        setShow(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <motion.nav
      className={clsx(
        "fixed w-full h-20 z-40 bg-blue-200/0 transition-all duration-300 ease-out",
        show ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="flex w-full h-full justify-between pb-2 items-end px-4 md:px-16">
        <div>
          <Link
            href={"/"}
            className="md:text-2xl text-xl uppercase tracking-wide"
          >
            Ground Glass
          </Link>
          {/* <p className="text-xs">[test-version]</p> */}
        </div>
        <div className="flex gap-2 text-sm max-md:hidden">
          <Link href={"/projects"}>Work</Link>
          <Link href={"/artists"}>Artists</Link>
          <Link href={"/contact"}>Contact</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
