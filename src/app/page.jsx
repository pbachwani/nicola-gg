import About from "@/components/About";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import React from "react";
import cursor from "@/app/data/cursor1.svg";

const Home = () => {
  return (
    <PreloaderWrapper>
      <main
        className=""
        // style={{
        //   cursor: `url(${cursor.src}) 0 0, auto`,
        // }}
      >
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
