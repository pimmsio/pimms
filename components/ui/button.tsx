import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap font-semibold leading-tight ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 shadow-sm hover:shadow-md",
        destructive: "bg-error text-white rounded-full hover:bg-error/90 shadow-sm",
        outline: "border-2 border-brand-primary bg-white text-brand-primary rounded-full hover:bg-brand-primary/5",
        secondary:
          "bg-white text-brand-primary rounded-full border border-gray-200 hover:border-brand-primary/30 hover:bg-gray-50",
        inverse:
          "bg-white text-brand-primary rounded-full hover:bg-gray-50 shadow-lg hover:shadow-xl border border-white/20",
        // New vibrant gradient variant for primary CTAs
        gradient:
          "relative rounded-full text-white shadow-md hover:shadow-lg bg-gradient-to-r from-[#2563eb] via-[#6366f1] to-[#8b5cf6] hover:from-[#1d4ed8] hover:via-[#5458ee] hover:to-[#7c3aed]",
        ghost: "hover:bg-gray-100 rounded-full",
        link: "text-brand-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base font-semibold",
        xl: "h-14 px-12 text-lg font-semibold"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
