import About from "@/components/About";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ImageCompare from "@/components/ImageCompare";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main className="">
      <Hero />

      {/* for any text above video */}
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 mt-20 cursor-default">
        {/* <h1>Nicola Gasparri</h1>
        <Link href="/projects">projects</Link>
        <Link href="/contact">contact</Link> */}
      </div>
      <About />
      <FeaturedProjects />
      <Footer />
      {/* <ImageCompare
        before="/videos/Apple-Security.mp4"
        after="/videos/Apple-Security.mp4"
      /> */}
    </main>
  );
};

export default Home;
