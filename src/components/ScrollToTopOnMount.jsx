"use client";
import { useEffect } from "react";

export default function ScrollToTopOnMount() {
  useEffect(() => {
    window.lenis?.scrollTo(0, { immediate: true });
  }, []);

  return null;
}
