"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";

export default function PreloaderWrapper({ children }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayNum, setDisplayNum] = useState(0);
  const [barVisible, setBarVisible] = useState(true);
  const progressInterval = useRef(null);
  const logoAnimStarted = useRef(false);

  // Logo refs — live outside preloader-content
  const markRef = useRef(null);
  const stackedRef = useRef(null);
  const navLogoRef = useRef(null);

  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth < 768;
  }, []);

  useEffect(() => {
    const videos = Array.from(
      document.querySelectorAll("#hero-video video"),
    ).slice(0, 2);

    if (!videos.length) {
      setReady(true);
      return;
    }

    let loaded = 0;
    const onReady = () => {
      loaded++;
      const pct = Math.round((loaded / videos.length) * 100);
      setProgress(pct);
      if (loaded === videos.length) setTimeout(() => setReady(true), 400);
    };

    videos.forEach((vid) => {
      if (vid.readyState >= 3) onReady();
      else vid.addEventListener("canplay", onReady, { once: true });
    });

    const fallback = setTimeout(() => setReady(true), 6000);
    return () => {
      clearTimeout(fallback);
      videos.forEach((vid) => vid.removeEventListener("canplay", onReady));
    };
  }, []);

  useEffect(() => {
    clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setDisplayNum((prev) => {
        if (prev >= progress) return prev;
        return Math.min(prev + 1, progress);
      });
    }, 15);
    return () => clearInterval(progressInterval.current);
  }, [progress]);

  const [counterDone, setCounterDone] = useState(false);

  useEffect(() => {
    if (displayNum >= 100 && !logoAnimStarted.current) {
      logoAnimStarted.current = true;

      // Fade out bar first, then start logo anim
      setBarVisible(false);
      setTimeout(() => {
        runLogoAnimation(() => {
          setTimeout(() => setCounterDone(true), 100);
        });
      }, 400); // wait for bar fade to finish
    }
  }, [displayNum]);

  function runLogoAnimation(onDone) {
    const mark = markRef.current;
    const stacked = stackedRef.current;
    const navLogo = navLogoRef.current;

    if (!mark || !stacked || !navLogo) {
      onDone();
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(
      mark,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
    )
      .to(mark, {
        rotate: -90,
        duration: 0.6,
        x: "-50%",
        ease: "power2.inOut",
        delay: 0.5,
      })
      .to(mark, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        delay: 1.1,
      })
      .fromTo(
        stacked,
        { opacity: 0, scale: 0.85, delay: -0.25 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
        "-=0.5",
      )
      .add(() => {
        gsap.to(stacked, {
          top: "1.5rem",
          left: isMobile.current ? "16px" : "64px",
          transform: "translate(0, 0)",
          scale: 0.5, // adjust this until it matches your nav logo size
          transformOrigin: "top left",
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(stacked, { opacity: 0 });
            gsap.to(navLogo, { opacity: 1, duration: 0.15 });
            onDone();
          },
        });
      }, "+=0.6");
  }

  const showPreloader = !ready || !counterDone;

  return (
    <>
      {/* Logo lives here — at top level, above everything, never faded by preloader-content exit */}
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            key="logo-stage"
            exit={{ opacity: 0, transition: { duration: 0 } }} // instant — logo is already gone by now
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10001,
              pointerEvents: "none",
            }}
          >
            <img
              ref={markRef}
              src="/logo-files/PNG/white logo mark.png"
              alt="logo mark"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                height: "80px",
                width: "auto",
                opacity: 0,
              }}
            />

            <img
              ref={stackedRef}
              src="/logo-files/PNG/white stacked.png"
              alt="Ground Glass Studio"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                height: "80px",
                width: "auto",
                opacity: 0,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPreloader && (
          <>
            <motion.div
              key="curtain-top"
              exit={{
                scaleY: 0,
                transition: {
                  duration: 0.85,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.05,
                },
              }}
              style={{
                position: "fixed",
                inset: 0,
                bottom: "50%",
                background: "#000",
                zIndex: 9999,
                transformOrigin: "top",
              }}
            />
            <motion.div
              key="curtain-bottom"
              exit={{
                scaleY: 0,
                transition: {
                  duration: 0.85,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.05,
                },
              }}
              style={{
                position: "fixed",
                inset: 0,
                top: "50%",
                background: "#000",
                zIndex: 9999,
                transformOrigin: "bottom",
              }}
            />

            <motion.div
              key="preloader-content"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              style={{ position: "fixed", inset: 0, zIndex: 10000 }}
            >
              {/* Wordmark */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  right: "5rem",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "12px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontWeight: 300,
                }}
              >
                Ground Glass
              </motion.p>

              {/* Counter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  right: "2rem",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "11px",
                  fontWeight: 300,
                  letterSpacing: "0.05em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {displayNum}
              </motion.div>

              {/* Progress bar */}
              <AnimatePresence>
                {barVisible && (
                  <motion.div
                    key="progress-bar"
                    initial={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      transform: "translateY(-50%)",
                      width: "100%",
                      height: "1px",
                      background: "rgba(255,255,255,0.12)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      style={{
                        height: "100%",
                        background: "rgba(255,255,255,0.6)",
                        transformOrigin: "left",
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: progress / 100 }}
                      transition={{ ease: "linear", duration: 0.5 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Nav logo — outside preloader, persists after curtain exit */}
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            key="nav-logo"
            exit={{
              opacity: 0,
              transition: { duration: 0.3, ease: "easeOut", delay: 1 },
            }}
            style={{ position: "fixed", zIndex: 9998 }}
          >
            <Link
              href={"/"}
              onClick={() => window.scrollTo({ top, behavior: "smooth" })}
              className="hover:cursor-pointer"
            >
              <img
                ref={navLogoRef}
                src="/logo-files/PNG/white stacked.png"
                alt="Ground Glass Studio"
                className="fixed top-6 px-4 md:px-16 h-10 w-auto opacity-0 z-[9999]"
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={!showPreloader ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
