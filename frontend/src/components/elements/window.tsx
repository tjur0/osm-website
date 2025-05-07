import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const windowVariants = cva(
  "bg-gradient-to-br from-[rgba(0,0,0,0.5)] to-[rgba(17,24,39,0.7)] backdrop-blur-md border border-white/20 rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white overflow-auto flex flex-col justify-between",
  {
    variants: {
      padding: {
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
