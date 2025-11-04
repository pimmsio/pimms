import { Check } from "@/components/icons/custom-icons";
import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Label } from "@/components/base/label";

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

// Price number only
export const PricingPrice = ({
  children,
  variant = "starter"
}: PricingPriceProps & { variant?: "starter" | "pro" | "business" }) => {
  const isBusinessVariant = variant === "business";
  const textColor = isBusinessVariant ? "text-white" : "text-foreground";

  return <span className={`text-5xl font-bold leading-tight ${textColor}`}>{children}</span>;
};

// Price suffix (like /month or HT)
export const PricingSuffix = ({
  children,
  variant = "starter"
}: {
  children: ReactNode;
  variant?: "starter" | "pro" | "business";
}) => {
  const isBusinessVariant = variant === "business";
  const subTextColor = isBusinessVariant ? "text-gray-300" : "text-muted-foreground";

  return <span className={`text-lg ${subTextColor}`}>{children}</span>;
};

// Complete price display wrapper
export const PriceDisplay = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn("text-left flex flex-col gap-0", className)}>
      <div className="flex items-baseline gap-1">{children}</div>
    </div>
  );
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
      className={`${getBackgroundClass()} rounded-b-2xl flex-1 ${getBorderClass()} lg:min-h-[200px] xl:min-h-[200px] p-6 sm:p-8`}
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

// Title row with toggle on the right (absolute positioned)
export const PricingTitleRow = ({ children }: { children: ReactNode }) => <div className="relative">{children}</div>;

// Absolute positioned toggle wrapper
export const AbsoluteToggle = ({ children }: { children: ReactNode }) => (
  <div className="absolute top-0 right-0">{children}</div>
);

// Features common labels container
export const PricingCommonFeatures = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center max-w-3xl mx-auto">{children}</div>
);

// Common feature label
export const CommonFeatureLabel = ({ children }: { children: ReactNode }) => (
  <Label className="bg-white border border-gray-200">{children}</Label>
);
