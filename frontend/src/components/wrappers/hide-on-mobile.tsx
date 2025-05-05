"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface HideOnMobileProps {
  children?: React.ReactNode;
}

export default function HideOnMobile({ children }: HideOnMobileProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return isMobile ? null : <>{children}</>;
}
