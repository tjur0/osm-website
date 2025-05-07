"use client";
import { Window } from "@/components/elements/window";

import { useLayoutSettings } from "@/contexts/layout-settings-context";
import { twMerge } from "tailwind-merge";

interface WindowWithDynamicRoundingProps {
  children: React.ReactNode;
  className?: string;
  dynamicRoundingClassName?: string;
  padding?: 8 | 4 | null | undefined;
}

export default function WindowWithDynamicRounding({
  children,
  className,
  dynamicRoundingClassName = "rounded-none",
  padding,
}: WindowWithDynamicRoundingProps) {
  const { rounded } = useLayoutSettings();

  return (
    <Window
      className={twMerge(rounded ? "" : dynamicRoundingClassName, className)}
      padding={padding}
    >
      {children}
    </Window>
  );
}
