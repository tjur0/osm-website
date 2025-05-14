import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const windowVariants = cva(
  "bg-gradient-to-br from-[rgba(255,255,255,0.6)] to-[rgba(243,244,246,0.8)] backdrop-blur-md border border-black/10 rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] text-black overflow-auto flex flex-col justify-between dark:from-[rgba(0,0,0,0.5)] dark:to-[rgba(17,24,39,0.7)] dark:border-white/20 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] dark:text-white",
  {
    variants: {
      padding: {
        2: "p-2",
        4: "p-4",
        8: "p-4 xl:p-8",
      },
    },
    defaultVariants: {
      padding: 4,
    },
  }
);

function Window({
  children,
  className,
  padding,
  asChild,
}: React.ComponentProps<"div"> &
  VariantProps<typeof windowVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="div"
      className={cn(windowVariants({ padding, className }))}
    >
      {children}
    </Comp>
  );
}

export { Window, windowVariants };
