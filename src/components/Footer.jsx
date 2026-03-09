import React from "react";
import ImageCompare from "./ImageCompare";
import Link from "next/link";

const Footer = () => {
  return (
    <main className="h-full px-4 md:px-16 py-10 flex flex-col justify-end">
      <div className="flex flex-col h-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 lg:gap-12 max-md:pt-20 pt-10 px-2">
          {/* LOGO */}
          {/* <div className="w-full lg:w-auto text-center lg:text-left">
            <h1 className="font-main uppercase text-sm -tracking-widest">
              [ replace with logo ]
            </h1>
          </div> */}

          {/* NAV LINKS */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
            <Link
              className="font-regular text-white/50 hover:text-white transition-colors duration-300 ease-out"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-regular text-white/50 hover:text-white transition-colors duration-300 ease-out"
              href="/projects"
            >
              Projects
            </Link>
            <Link
              className="font-regular text-white/50 hover:text-white transition-colors duration-300 ease-out"
              href="/artists"
            >
              Artists
            </Link>
          </div>

          {/* EMAIL */}
          <div className="text-right lg:text-right flex gap-2 items-baseline">
            <span className="text-sm text-white/50 cursor-default">Email:</span>
            <p className=" font-regular text-white/50 hover:text-white transition-colors duration-300 ease-out hover:cursor-pointer">
              gasparri.nicola@gmail.com
            </p>
          </div>

          {/* <div className="border-[0.5px] px-4 pt-1.5 text-xs rounded-sm gap-4">
            <input type="emil" placeholder="Join our newsletter" className="" />
            <span>arrow</span>
          </div> */}
        </div>
        <div className="h-full py-8">
          <ImageCompare
            before="/videos/Apple-Security.mp4"
            after="/videos/Apple-Security.mp4"
          />
        </div>

        <div className="w-full flex justify-between text-sm opacity-50 font-regular uppercase px-2">
          <h1>&copy; Ground Glass</h1>
          <h1>All rights reserved</h1>
        </div>
      </div>
    </main>
  );
};

export default Footer;

// <div className="h-full flex flex-col-reverse md:flex-row justify-between items-center pt-10 pb-8 max-md:gap-10 font-regular gap-20">
//   <div className="flex w-full justify-between items-start">
//     <div className="flex gap-2 text-xl">
//       <Link href={"/"}>Home</Link>
//       <Link href={"/projects"}>Projects</Link>
//       <Link href={"/artists"}>Artists</Link>
//     </div>
//   </div>
//   <div>
//     <p>gasparri.nicola@gmail.com</p>
//   </div>
//   <div className="w-fit flex-nowrap text-nowrap">
//     <h1 className="font-main w-fit  uppercase">[replace with logo]</h1>
//   </div>
// </div>
