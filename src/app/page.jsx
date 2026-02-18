import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main className="text-2xl">
      <section>Nicola Gasparri</section>
      <div className="flex flex-col gap-4 mt-10">
        <Link href="/projects">projects</Link>
        <Link href="/contact">contact</Link>
      </div>
    </main>
  );
};

export default Home;
