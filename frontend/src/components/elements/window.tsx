import React from "react";
import { twMerge } from "tailwind-merge";

interface WindowProps {
  children: React.ReactNode;
  className?: string;
}

export function Window({ children, className }: WindowProps) {
  return (
    <div
      className={twMerge(
        `p-4 transition-[border-radius] bg-gradient-to-br from-[rgba(0,0,0,0.5)] to-[rgba(17,24,39,0.7)] backdrop-blur-md border border-white/20 rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white overflow-auto flex flex-col justify-between`,
        className
      )}
    >
      {children}
    </div>
  );
}
