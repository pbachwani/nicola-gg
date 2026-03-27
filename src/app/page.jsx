import About from "@/components/About";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ImageCompare from "@/components/ImageCompare";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <PreloaderWrapper>
      <main className="">
        <Hero />
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 mt-20 cursor-default"></div>
        <About />
        <FeaturedProjects />
        <Footer />
      </main>
    </PreloaderWrapper>
  );
};

export default Home;
