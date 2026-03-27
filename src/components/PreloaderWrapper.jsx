"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreloaderWrapper({ children }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayNum, setDisplayNum] = useState(0);
  const progressInterval = useRef(null);

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll("#hero-video video"));

    if (!videos.length) {
      setReady(true);
      return;
    }

    let loaded = 0;

    const onReady = () => {
      loaded++;
      const pct = Math.round((loaded / videos.length) * 100);
      setProgress(pct);
      if (loaded === videos.length) setTimeout(() => setReady(true), 600);
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

  // Smooth counter — chases real progress but max speed is capped so it never rushes
  useEffect(() => {
    clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setDisplayNum((prev) => {
        if (prev >= progress) return prev;
        // Move at most 1 per tick — tick is 30ms → max ~33/sec, feels like ~3s to 100
        return Math.min(prev + 1, progress);
      });
    }, 30); // slowed from 18ms → 30ms per tick
    return () => clearInterval(progressInterval.current);
  }, [progress]);

  // Only mark display-ready once counter itself reaches 100
  const [counterDone, setCounterDone] = useState(false);
  useEffect(() => {
    if (displayNum >= 100) {
      const t = setTimeout(() => setCounterDone(true), 300);
      return () => clearTimeout(t);
    }
  }, [displayNum]);

  // Gate the curtain exit on BOTH videos loaded AND counter finished
  const showPreloader = !ready || !counterDone;

  return (
    <>
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
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 10000,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
              }}
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontWeight: 300,
                }}
              >
                Ground Glass
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  color: "#fff",
                  fontSize: "clamp(60px, 12vw, 40px)",
                  fontWeight: 200,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  //   fontVariantNumeric: "tabular-nums",
                  //   fontFamily: "var(--font-khand, serif)",
                }}
              >
                {displayNum}
              </motion.div>

              <div
                style={{
                  width: "80px",
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
                  transition={{ ease: "linear", duration: 0.2 }}
                />
              </div>
            </motion.div>
          </>
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
