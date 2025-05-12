import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export default async function Card({ className, children }: CardProps) {
  return (
    <div
      className={twMerge(
        "bg-white/10 border border-white/20 rounded-lg p-4 shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
