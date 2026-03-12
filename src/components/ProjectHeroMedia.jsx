"use client";
import { useEffect, useRef } from "react";

export default function ProjectHeroMedia({ project }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.3, // play when 30% visible
      },
    );

    if (video) observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
    };
  }, []);

  return (
    <div className="w-[90%] md:w-[75%] flex items-center mx-auto py-24 relative overflow-hidden">
      <video
        ref={videoRef}
        src="https://nicola-gasparri.b-cdn.net/project-videos/hsrLaunchshow_MIP01.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls
        controlsList="nodownload noplaybackrate"
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
        className="w-full h-auto aspect-video object-cover"
      />
    </div>
  );
}

{
  /* <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-50 pointer-events-none">
        [replace with project video later]
      </p> */
}
