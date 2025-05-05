"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface HideOnDesktopProps {
  children?: React.ReactNode;
}

export default function HideOnDesktop({ children }: HideOnDesktopProps) {
  const [mounted, setMounted] = useState(false);
  const isDesktop = !useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return isDesktop ? null : <>{children}</>;
}
