import React from "react";
import ImageCompare from "./ImageCompare";
import Link from "next/link";

const Footer = () => {
  return (
    <main
      className="h-full px-4 md:px-16 py-10 flex flex-col justify-end"
      id="footer"
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full w-full justify-end items-center p-4">
          <img
            src="/logo-files/PNG/white horizontal.png"
            alt=""
            className="w-full h-auto px-4"
          />
        </div>
      </div>
    </main>
  );
};

export default Footer;
