import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="relative w-full h-svh overflow-hidden">
      <HeroCarousel />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
    </section>
  );
}

// const scrollPrev = () => {
//   emblaApi?.scrollPrev();
//   autoplayRef.current?.reset();
// };
// const scrollNext = () => {
//   emblaApi?.scrollNext();
//   autoplayRef.current?.reset();
// };

{
  /* Prev / Next */
}
{
  /* <div className="absolute bottom-12 right-8 md:right-14 flex items-center gap-5 z-10">
        <button
          onClick={scrollPrev}
          className="text-white/20 hover:text-white transition-colors duration-200 text-xs tracking-[0.15em] uppercase hover:cursor-pointer"
        >
          Prev
        </button>
        <div className="w-px h-3 bg-white/20" />
        <button
          onClick={scrollNext}
          className="text-white/20 hover:text-white transition-colors duration-200 text-xs tracking-[0.15em] uppercase hover:cursor-pointer"
        >
          Next
        </button>
      </div> */
}
