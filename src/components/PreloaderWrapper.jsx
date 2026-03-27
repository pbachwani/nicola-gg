"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreloaderWrapper({ children }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayNum, setDisplayNum] = useState(0);
  const progressInterval = useRef(null);

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
    if (displayNum >= 100) {
      const t = setTimeout(() => setCounterDone(true), 300);
      return () => clearTimeout(t);
    }
  }, [displayNum]);

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
              style={{ position: "fixed", inset: 0, zIndex: 10000 }}
            >
              {/* Wordmark — top left */}
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

              {/* Counter — bottom right */}
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

              {/* Progress bar — perfectly centered */}
              <div
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
