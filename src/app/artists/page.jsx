"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
// import { motion } from "motion/react";

const ArtistsPage = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full h-full min-h-svh">
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out 
  ${show ? "opacity-100" : "opacity-0"}`}
      >
        <video
          src="/videos/Apple-Security.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute w-full h-full flex justify-center items-center px-4 md:px-16 gap-10">
        <div className="flex gap-4 text-2xl">
          <Link
            href={"/artists/nicola"}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            Nicola Gasparri
          </Link>
          <h1>Agua</h1>
        </div>
      </div>
    </div>
  );
};

export default ArtistsPage;

{
  /* <div
          className="hover:border border-white/10 relative bg-none"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <img
            src="/test-image1.png"
            alt=""
            className="w-full h-full object-fill w-60 hover:opacity-0 z-10 transition-opacity ease-out duration-500"
          />
          <p className="absolute top-1/2">Go to his projects</p>
        </div> */
}

{
  /* <div
          className="relative group border border-white/10"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >

          <Image
            width={10}
            height={13}
            src="/test-image1.png"
            alt=""
            className="w-60 object-cover transition-all duration-500 ease-out 
               group-hover:opacity-0"
          />


          <div
            className="absolute inset-0 flex items-center justify-center 
               opacity-0 group-hover:opacity-100 
               transition-opacity duration-500"
          >
            <p className="text-sm tracking-wide">Go to his projects</p>
          </div>
        </div>
         */
}
