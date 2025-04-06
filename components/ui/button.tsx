"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "hover:scale-105 cursor-pointer rounded-2xl transition duration-500 text-xl group/primary relative inline-flex gap-[0.45em] font-bold bg-primary text-primary-foreground items-center justify-center overflow-hidden shadow-primary-200/50 fill-current shadow-primary-200/50",
        noring:
          "cursor-pointer rounded-b-xl md:rounded-l-none md:rounded-r-xl transition duration-500 text-xl group/primary relative inline-flex gap-[0.45em] font-bold bg-primary text-primary-foreground items-center justify-center overflow-hidden shadow-primary-200/50 fill-current shadow-primary-200/50",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "cursor-pointer rounded-lg ring-[6px] ring-[#3970ff] transition duration-500 text-2xl group/primary relative inline-flex gap-[0.45em] font-bold bg-[#3970ff] text-white items-center justify-center overflow-hidden shadow-primary-200/50 fill-current shadow-primary-200/50",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "py-[0.8em] px-[1.1em]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    if (variant === "default" || variant === "noring") {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          <div className="relative flex flex-col leading-tight pt-[0.1em] pb-[0.15em]">
            {props.children}
          </div>
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
