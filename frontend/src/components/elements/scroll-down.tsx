"use client";

import { useEffect } from "react";

interface ScrollDownProps {
  pixels: number;
}

export function ScrollDown({ pixels }: ScrollDownProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, pixels);
    }
  }, [pixels]);

  return null;
}
