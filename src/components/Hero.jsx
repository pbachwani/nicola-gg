import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="relative w-full h-svh overflow-hidden">
      <HeroCarousel />
      {/* <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/20 pointer-events-none" /> */}
    </section>
  );
}
