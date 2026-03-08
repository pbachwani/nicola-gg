"use client";

import { useRef, useState, useEffect } from "react";

export default function ImageCompare({ before, after }) {
  const containerRef = useRef(null);

  const [target, setTarget] = useState(50);
  const [position, setPosition] = useState(50);

  const updatePosition = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;

    setTarget(Math.max(0, Math.min(100, percent)));
  };

  const handleMove = (e) => {
    updatePosition(e.clientX);
  };

  const handleTouch = (e) => {
    updatePosition(e.touches[0].clientX);
  };

  // Smooth inertia animation
  useEffect(() => {
    let raf;

    const animate = () => {
      setPosition((prev) => prev + (target - prev) * 0.2);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      className="relative w-full aspect-video overflow-hidden cursor-ew-resize group md:h-[70svh] h-[50svh] select-none touch-none rounded-4xl"
    >
      {/* RAW */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src={before}
        className="absolute inset-0 w-full h-full object-cover opacity-80 brightness-75"
      />

      {/* GRADED */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          src={after}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* DIVIDER */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white"
        style={{ left: `${position}%`, transform: "translateX(-1px)" }}
      />

      {/* HANDLE */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white backdrop-blur flex items-center justify-center"
        style={{ left: `${position}%`, transform: "translate(-50%, -50%)" }}
      >
        <div className="w-0.5 h-4 bg-white" />
      </div>

      {/* Labels */}
      <div className="absolute bottom-40 right-4 text-white text-xs">[RAW]</div>
      <div className="absolute bottom-40 left-4 text-white text-xs">
        [GRADED]
      </div>
    </div>
  );
}
