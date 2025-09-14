import { Check } from "@/components/icons/custom-icons";
import { ReactNode } from "react";
import CalComButton from "@/components/landings/cal-com-button";
import CtaButtonBig from "@/components/cta/CtaButtonBig";
import { cn } from "../../lib/utils";

interface PricingCardProps {
  variant?: "starter" | "pro" | "business";
  children: ReactNode;
}

interface PricingTitleProps {
  children: ReactNode;
}

interface PricingSubtitleProps {
  children: ReactNode;
}

interface PricingPriceProps {
  children: ReactNode;
}

interface PricingCtaProps {
  href: string;
  variant?: "starter" | "pro" | "business";
  children: ReactNode;
}

interface PricingFeaturesProps {
  children: ReactNode;
}

interface PricingFeatureProps {
  children: ReactNode;
}

export const PricingCard = ({ variant = "starter", children }: PricingCardProps) => {
  const getCardStyles = () => {
    switch (variant) {
      case "pro":
        return "";
      case "business":
        return "bg-gradient-to-br from-gray-900 to-gray-800 outline-gray-700";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl outline outline-border h-full shadow-sm hover:shadow-md transition-all duration-300",
        getCardStyles()
      )}
    >
      {children}
    </div>
  );
};

export const PricingTitle = ({
  children,
  variant = "starter"
}: PricingTitleProps & { variant?: "starter" | "pro" | "business" }) => (
  <h3 className={`text-xl font-semibold leading-tight ${variant === "business" ? "text-white" : "text-foreground"}`}>
    {children}
  </h3>
);

export const PricingSubtitle = ({
  children,
  variant = "starter"
}: PricingSubtitleProps & { variant?: "starter" | "pro" | "business" }) => (
  <p
    className={`text-sm leading-relaxed max-w-[30ch] ${variant === "business" ? "text-gray-300" : "text-muted-foreground"}`}
  >
    {children}
  </p>
);

export const PricingPrice = ({
  children,
  variant = "starter"
}: PricingPriceProps & { variant?: "starter" | "pro" | "business" }) => {
  if (variant === "business") {
    return (
      <div className="text-left">
        <span className="text-2xl font-medium leading-tight text-gray-300">{children}</span>
      </div>
    );
  }

  return (
    <div className="text-left flex flex-col gap-0">
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-bold leading-tight text-foreground">{children}</span>
        <span className="text-lg text-muted-foreground">HT</span>
      </div>
      <p className="text-muted-foreground text-sm">One-time payment, no subscription</p>
    </div>
  );
};

export const PricingCta = ({ href, variant = "starter", children }: PricingCtaProps) => {
  if (variant === "business") {
    return (
      <CalComButton variant="inverse" className="w-full">
        {children}
      </CalComButton>
    );
  }

  return <CtaButtonBig type="pricing" value={children} href={href} className="w-full" size="lg" />;
};

export const PricingFeatures = ({
  children,
  title = "Everything included:",
  variant = "starter"
}: PricingFeaturesProps & { title?: string; variant?: "starter" | "pro" | "business" }) => {
  const getBorderClass = () => {
    switch (variant) {
      case "pro":
        return "border-t border-brand-primary/20";
      case "business":
        return "border-t border-white/10";
      default:
        return "border-t border-primary/20";
    }
  };

  const getBackgroundClass = () => {
    switch (variant) {
      case "business":
        return "bg-gray-800";
      default:
        return "bg-zinc-50";
    }
  };

  const getTitleClass = () => {
    switch (variant) {
      case "business":
        return "text-gray-300";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div
      className={`${getBackgroundClass()} rounded-b-2xl flex-1 ${getBorderClass()} lg:min-h-[520px] xl:min-h-[455px] p-6 sm:p-8`}
    >
      <p className={`text-[11px] font-semibold uppercase tracking-wide ${getTitleClass()} mb-3`}>{title}</p>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
};

export const PricingFeature = ({
  children,
  variant = "starter"
}: PricingFeatureProps & { variant?: "starter" | "pro" | "business" }) => {
  const getCheckColor = () => {
    switch (variant) {
      case "pro":
        return "text-brand-primary";
      case "business":
        return "text-success";
      default:
        return "text-primary";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "business":
        return "text-gray-300";
      default:
        return "text-foreground";
    }
  };

  return (
    <li className="flex items-start gap-3 py-1">
      <Check className={`w-4 h-4 ${getCheckColor()} flex-shrink-0 mt-0.5`} />
      <span className={`text-sm leading-relaxed font-medium ${getTextColor()}`}>{children}</span>
    </li>
  );
};

// Container for the pricing card header (title, subtitle, price, CTA)
export const PricingHeader = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("p-6 sm:p-8 flex flex-col gap-8", className)}>{children}</div>
);

// Wrapper for title and subtitle
export const PricingTitleGroup = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("text-left flex flex-col gap-1", className)}>{children}</div>
);
