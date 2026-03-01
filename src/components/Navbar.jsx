import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed w-full h-20 z-50 bg-blue-200/0">
      <div className="flex w-full h-full justify-between pb-2 items-end px-4 md:px-16">
        <div>
          <Link href={"/"} className="md:text-2xl">
            Nicola Gasparri
          </Link>
          <p className="text-xs">test-version</p>
        </div>
        <div className="flex gap-2 text-sm max-md:hidden">
          <Link href={"/projects"}>Projects</Link>
          <Link href={"/artists"} className="hidden">
            Artists
          </Link>
          <Link href={"/contact"}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
