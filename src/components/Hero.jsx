import React from "react";

const Hero = () => {
  return (
    <section className="w-full h-full min-h-screen">
      <div id="hero-video">
        <video
          playsInline
          preload="auto"
          className="w-full h-screen object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/videos/Apple-Security.mp4" />
        </video>
      </div>
    </section>
  );
};

export default Hero;
