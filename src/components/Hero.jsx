"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 4000 })],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const slides = emblaApi.slideNodes();
    console.log(slides);

    const onSelect = () => {
      const centerIndex = emblaApi.selectedScrollSnap();

      slides.forEach((slide, index) => {
        if (index === centerIndex) {
          // console.log(slide);
          slide.classList.add("is-centered");
          console.log(centerIndex + 1, slides.length);
        } else {
          slide.classList.remove("is-centered");
        }
      });
    };

    emblaApi.on("select", onSelect);
    onSelect(); // run once on mount

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // update prev/next availability
  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      // if loop: true, canScrollPrev/Next will always be true, still fine to check tho
      setCanPrev(emblaApi?.canScrollPrev() ?? false);
      setCanNext(emblaApi?.canScrollNext() ?? false);
    };

    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    // call once
    updateButtons();

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  return (
    <section className="w-full h-full overflow-hidden max-h-svh" ref={emblaRef}>
      <div id="hero-video" className="flex">
        {/* slide 1 */}
        <div
          style={{
            flex: "0 0 100%",
            // cursor: `url(${arrowPlay.src}) 50 50, auto`,
          }}
        >
          <video
            playsInline
            preload="auto"
            className="w-full h-screen object-cover"
            autoPlay
            loop
            muted
          >
            <source src="https://nicola-gasparri.b-cdn.net/project-videos/Apple-Security.mp4" />
          </video>
        </div>
        {/* slide 2 */}
        <div
          style={{
            flex: "0 0 100%",
            // cursor: `url(${arrowPlay.src}) 50 50, auto`,
          }}
        >
          <video
            playsInline
            preload="auto"
            className="w-full h-screen object-cover"
            autoPlay
            loop
            muted
          >
            <source src="https://nicola-gasparri.b-cdn.net/project-videos/Apple-Security.mp4" />
          </video>
        </div>
        {/* slide 3 */}
        <div
          style={{
            flex: "0 0 100%",
            // cursor: `url(${arrowPlay.src}) 50 50, auto`,
          }}
        >
          <video
            playsInline
            preload="auto"
            className="w-full h-screen object-cover"
            autoPlay
            loop
            muted
          >
            <source src="https://nicola-gasparri.b-cdn.net/project-videos/Apple-Security.mp4" />
          </video>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-fit">
        <button onClick={() => scrollPrev()}>Prev</button>
        <button onClick={() => scrollNext()}>Next</button>
      </div>
    </section>
  );
};

export default Hero;
