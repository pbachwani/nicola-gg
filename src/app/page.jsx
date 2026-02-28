import About from "@/components/About";
import Hero from "@/components/Hero";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main className="">
      <Hero />
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 mt-10">
        <section>Nicola Gasparri</section>
        <Link href="/projects">projects</Link>
        <Link href="/contact">contact</Link>
      </div>
      <About />
      <div className="w-full h-full min-h-screen">section 3</div>
      <div className="w-full h-full min-h-screen"> section 4</div>
    </main>
  );
};

export default Home;
