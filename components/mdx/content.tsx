import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { H2 as BaseH2 } from "@/components/base/h2";
import {
  FaArrowTrendUp,
  FaRegClock,
  FaDollarSign,
  FaMedal,
  FaQuestion,
  BiSolidZap,
  MdRocketLaunch,
  Share2,
  Target,
  DollarSign as DollarIcon,
  TrendingUp,
  Youtube,
  Users,
  CreditCard,
  CalendarCheck
} from "@/components/icons/custom-icons";
import Image from "next/image";
import { cn } from "../../lib/utils";

// Typography components
export const H1 = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Stronger = ({ children, className }: { children: ReactNode; className?: string }) => (
  <strong className={cn("font-bold", className)}>{children}</strong>
);
export const H2 = ({
  children,
  align = "center",
  variant = "default"
}: {
  children: ReactNode;
  align?: "center" | "left";
  variant?: "default" | "white";
}) => {
  const colorClass = variant === "white" ? "text-white" : "";
  return <BaseH2 className={`${align === "left" ? "text-left" : ""} ${colorClass}`}>{children}</BaseH2>;
};
export const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 leading-tight">{children}</h3>
);
export const H4 = ({ children }: { children: ReactNode }) => (
  <h4 className="text-xl md:text-2xl font-semibold text-text-primary mb-4 leading-tight">{children}</h4>
);
export const Summary = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Text = ({
  children,
  size = "base",
  variant = "default",
  className
}: {
  children: ReactNode;
  size?: "sm" | "base" | "md" | "lg";
  variant?: "default" | "white";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "text-sm md:text-base",
    base: "text-base md:text-lg",
    md: "text-lg md:text-xl",
    lg: "text-xl md:text-2xl"
  };

  // Improved spacing and color consistency
  const spacing = size === "lg" ? "mb-8" : "mb-6";
  const colorClass = variant === "white" ? "text-white/90" : "text-text-secondary";

  return (
    <p className={`${sizeClasses[size]} ${colorClass} ${spacing} leading-relaxed font-medium ${className}`}>
      {children}
    </p>
  );
};
export const SmallText = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Label = ({
  children,
  variant = "default"
}: {
  children: ReactNode;
  variant?: "default" | "problem" | "solution" | "why" | "none";
}) => {
  const icons = {
    default: null,
    problem: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    solution: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    why: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
        />
      </svg>
    ),
    none: () => null
  };

  const variantClasses: Record<string, string> = {
    default: "bg-white text-primary border border-gray-200",
    problem: "bg-gray-50 text-gray-900 border border-gray-200",
    solution: "bg-success-light/20 text-success border border-success-border/50",
    why: "bg-info-light/20 text-info border border-info-border/50",
    none: "bg-transparent text-gray-900"
  };

  return (
    <div className="inline-flex items-center justify-center mb-8">
      <div
        className={`rounded-full flex items-center justify-center gap-2 uppercase text-xs font-semibold px-4 py-2 ${variantClasses[variant]}`}
      >
        {variant !== "none" && icons[variant]}
        {children}
      </div>
    </div>
  );
};

// List components
export const List = ({
  children,
  layout = "vertical"
}: {
  children: ReactNode;
  layout?: "vertical" | "horizontal";
}) => {
  const layoutClasses = layout === "horizontal" ? "grid gap-6 md:grid-cols-2" : "space-y-6";

  return <div className={layoutClasses}>{children}</div>;
};

export const Item = ({
  children,
  variant = "default"
}: {
  children: ReactNode;
  variant?: "default" | "problem" | "solution";
}) => {
  if (variant === "problem") {
    const X = () => (
      <svg className="w-5 h-5 text-vibrant-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );

    return (
      <div className="rounded-xl flex items-start gap-4 p-6 bg-gray-50 border border-gray-200">
        <div className="rounded-full flex-shrink-0 w-6 h-6 bg-gray-100 flex items-center justify-center mt-0.5">
          <X />
        </div>
        <p className="text-gray-900 font-medium flex-1 leading-relaxed">{children}</p>
      </div>
    );
  }

  if (variant === "solution") {
    const Check = () => (
      <svg className="w-5 h-5 text-vibrant-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );

    return (
      <div className="rounded-xl flex items-start gap-4 p-6 bg-success-light border border-success-border">
        <div className="rounded-full flex-shrink-0 w-6 h-6 bg-success-light flex items-center justify-center mt-0.5">
          <Check />
        </div>
        <p className="text-gray-900 font-medium flex-1 leading-relaxed">{children}</p>
      </div>
    );
  }

  return <>{children}</>;
};

// Feature components
export const Feature = ({ children }: { children: ReactNode }) => <>{children}</>;
export const FeatureTitle = ({ children }: { children: ReactNode }) => <>{children}</>;
export const FeatureText = ({ children }: { children: ReactNode }) => <>{children}</>;

export const FeatureCard = ({
  children,
  variant = "simple",
  color = "brand"
}: {
  children: ReactNode;
  variant?: "simple" | "fancy";
  color?: "brand" | "cyan" | "orange" | "green";
}) => {
  const colorConfig = {
    brand: {
      gradient: "from-brand-primary/5 via-brand-secondary/5 to-transparent",
      border: "border-brand-primary/20 hover:border-brand-primary/40",
      highlight: "from-brand-primary/10 to-transparent"
    },
    cyan: {
      gradient: "from-brand-primary/8 via-brand-secondary/8 to-transparent",
      border: "border-brand-primary/20 hover:border-brand-primary/40",
      highlight: "from-brand-primary/15 to-transparent"
    },
    orange: {
      gradient: "from-vibrant-orange/8 via-amber-400/8 to-transparent",
      border: "border-vibrant-orange/20 hover:border-vibrant-orange/40",
      highlight: "from-vibrant-orange/15 to-transparent"
    },
    green: {
      gradient: "from-vibrant-green/8 via-teal-400/8 to-transparent",
      border: "border-vibrant-green/20 hover:border-vibrant-green/40",
      highlight: "from-vibrant-green/15 to-transparent"
    }
  };

  const config = colorConfig[color];

  if (variant === "fancy") {
    return (
      <div
        className={`group/card relative text-center space-y-4 rounded-3xl p-8 bg-gradient-to-br ${config.gradient} backdrop-blur-sm border-2 ${config.border} transition-all duration-300 overflow-hidden`}
      >
        {/* Animated gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${config.highlight} opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mb-0`}
          aria-hidden
        />

        {/* Top accent line */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r ${config.border.replace("border-", "from-").replace("/20", "/60").replace("hover:", "").split(" ")[0]} to-transparent rounded-full`}
          aria-hidden
        />

        <div className="relative space-y-4">{children}</div>
      </div>
    );
  }

  return <div className="text-center space-y-4 p-6">{children}</div>;
};

export const IconBox = ({
  icon,
  color = "brand"
}: {
  icon:
    | "zap"
    | "globe"
    | "share"
    | "target"
    | "mobile"
    | "chart"
    | "link"
    | "integration"
    | "check"
    | "cash"
    | "arrowUp"
    | "youtube"
    | "users"
    | "creditCard"
    | "calendar"
    | "rocket";
  color?: "brand" | "cyan" | "orange" | "green";
}) => {
  // Color configurations with branded gradients
  const colorConfig = {
    brand: {
      iconClass: "text-white drop-shadow-lg",
      bgGradient: "to-brand-secondary from-brand-primary"
    },
    cyan: {
      iconClass: "text-white drop-shadow-lg",
      bgGradient: "to-brand-secondary from-brand-primary"
    },
    orange: {
      iconClass: "text-white drop-shadow-lg",
      bgGradient: "to-amber-400 from-vibrant-orange"
    },
    green: {
      iconClass: "text-white drop-shadow-lg",
      bgGradient: "to-teal-400 from-vibrant-green"
    }
  };

  const config = colorConfig[color];

  const icons = {
    zap: <BiSolidZap size={28} className={config.iconClass} />,
    arrowUp: <TrendingUp size={28} className={config.iconClass} />,
    cash: <DollarIcon size={28} className={config.iconClass} />,
    globe: <Share2 size={28} className={config.iconClass} />,
    share: <Share2 size={28} className={config.iconClass} />,
    target: <Target size={28} className={config.iconClass} />,
    mobile: <Share2 size={28} className={config.iconClass} />,
    chart: <TrendingUp size={28} className={config.iconClass} />,
    link: <Share2 size={28} className={config.iconClass} />,
    integration: <Share2 size={28} className={config.iconClass} />,
    check: <Share2 size={28} className={config.iconClass} />,
    youtube: <Youtube size={28} className={config.iconClass} />,
    users: <Users size={28} className={config.iconClass} />,
    creditCard: <CreditCard size={28} className={config.iconClass} />,
    calendar: <CalendarCheck size={28} className={config.iconClass} />,
    rocket: <MdRocketLaunch size={28} className={config.iconClass} />
  } as const;

  return (
    <div
      className={`relative inline-grid place-items-center w-20 h-20 rounded-2xl mb-6 transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-3`}
    >
      {/* Gradient background with animation */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${config.bgGradient} group-hover/card:bg-gradient-to-br transition-all duration-500`}
      />

      {/* Shine effect */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-50 group-hover/card:opacity-70 transition-opacity"
        aria-hidden
      />

      <div className="relative z-[1]">{icons[icon]}</div>
    </div>
  );
};

// Group components
export const Group = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Features = ({ children }: { children: ReactNode }) => <>{children}</>;

// CTA components
export const CTA = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Fast = () => <BiSolidZap size={32} fill="currentColor" />;
export const CtaButton = ({
  children,
  variant = "default",
  href
}: {
  children: ReactNode;
  variant?: "default" | "inverse";
  href?: string;
}) => {
  const handleClick = () => {
    if (href) {
      window.location.href = href;
      return;
    }

    // Scroll to waitlist or redirect to app
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open("https://app.pim.ms/register", "_blank");
    }
  };

  return (
    <div className="flex items-center justify-center lg:justify-start mb-4">
      <button
        onClick={handleClick}
        className={`relative overflow-hidden inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap font-semibold leading-tight transition-transform duration-200 h-12 px-8 text-base hover:scale-105 ${
          variant === "inverse"
            ? "rounded-full bg-white text-brand-primary hover:bg-gray-50 shadow-lg hover:shadow-xl border border-white/20"
            : "rounded-2xl text-white bg-gradient-to-r from-brand-primary-400 to-brand-primary"
        }`}
        style={
          variant === "inverse"
            ? undefined
            : {
                boxShadow:
                  "rgba(255, 255, 255, 0.25) 0px 2.4px 1.2px 0px inset, rgba(0, 0, 0, 0.1) 0px 1.2px 1.2px 0px inset, rgba(0, 0, 0, 0.1) 0px -2.4px 0px 0px inset, rgba(255, 255, 255, 0.16) 0px 0px 9.6px 4.8px inset, rgba(0, 0, 0, 0.2) 0px 8px 20px -4px"
              }
        }
      >
        {variant !== "inverse" && (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-28 h-8 bg-white/20 blur-[6px] rotate-[-30deg] opacity-100 shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
            <div className="absolute left-12 top-1/2 -translate-y-1/2 w-36 h-8 bg-white/20 blur-[10px] rotate-[-30deg] opacity-90" />
          </div>
        )}
        <span className="relative z-[1]">{children}</span>
      </button>
    </div>
  );
};
export const CtaBottomText = ({
  children,
  variant = "default"
}: {
  children: ReactNode;
  variant?: "default" | "white";
}) => {
  const colorClass = variant === "white" ? "text-white/80" : "text-text-secondary";
  return (
    <div className={`flex flex-row items-center justify-center lg:justify-start gap-2 mt-2 text-xs ${colorClass}`}>
      {children}
    </div>
  );
};

// Layout components
export const Centered = ({
  children,
  margin = "default"
}: {
  children: ReactNode;
  margin?: "default" | "sm" | "md" | "lg" | "none";
}) => {
  const marginClasses = {
    default: "mb-6 sm:mb-16",
    sm: "mb-4 sm:mb-8",
    md: "mb-8 sm:mb-16",
    lg: "mb-16 sm:mb-32",
    none: ""
  };

  return (
    <div
      className={`flex flex-col items-center text-center space-y-6 max-w-5xl mx-auto sm:px-4 w-full ${marginClasses[margin]}`}
    >
      {children}
    </div>
  );
};

export const ContentWrapper = ({ children }: { children: ReactNode }) => (
  <div className="space-y-6 text-center lg:text-left">{children}</div>
);

export const Section = ({
  children,
  variant = "plain",
  maxWidth = "6xl",
  margin = "default",
  id,
  background = "none",
  noPadding = false
}: {
  children: ReactNode;
  variant?: "card" | "branded" | "plain";
  maxWidth?: "full" | "6xl" | "4xl" | "2xl";
  margin?: "default" | "sm" | "md" | "lg" | "none";
  id?: string;
  background?: "none" | "subtle" | "brandGlow" | "grid";
  noPadding?: boolean;
}) => {
  const marginClasses = {
    default: "sm:mb-16",
    sm: "sm:mb-4",
    md: "sm:mb-8",
    lg: "sm:mb-16",
    none: ""
  };

  const getBaseClasses = () => {
    if (variant === "card") {
      return "bg-white rounded-3xl border border-gray-200 px-4 py-8 sm:p-8 lg:p-12 mb-16";
    }
    if (variant === "branded") {
      return "rounded-3xl border border-brand-primary/20 px-2 py-8 sm:p-8 lg:p-12 mb-16";
    }
    return `${marginClasses[margin]} ${noPadding ? "p-0 m-0" : "py-8 mb-0"}`;
  };

  const widthClasses = {
    full: "lg:max-w-4xl xl:max-w-full",
    "6xl": "max-w-6xl mx-auto lg:max-w-4xl xl:max-w-6xl",
    "4xl": "max-w-4xl mx-auto lg:max-w-4xl xl:max-w-4xl",
    "2xl": "max-w-2xl mx-auto lg:max-w-2xl xl:max-w-2xl"
  };

  const getBackgroundStyle = () => {
    if (variant === "branded") {
      return { backgroundColor: "#3970ff" };
    }
    return undefined;
  };

  // Special rendering for gradient border + grid background card
  if (variant === "card" && background === "grid") {
    return (
      <div className={`${widthClasses[maxWidth]} py-8 mb-16`} id={id}>
        <div className="relative">
          <div className="relative sm:bg-white sm:rounded-3xl sm:border sm:border-gray-200 sm:p-8 lg:p-12 overflow-hidden">
            <div className="relative">{children}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={`${getBaseClasses()} ${widthClasses[maxWidth]} ${background !== "none" ? "relative" : ""}`}
      style={getBackgroundStyle()}
    >
      {background !== "none" && (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-white overflow-hidden">
          {background === "subtle" && (
            <>
              <div className="absolute -top-24 -left-32 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(57,112,255,0.16),transparent_60%)] blur-2xl" />
              <div className="absolute -bottom-24 -right-32 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(47,205,250,0.14),transparent_60%)] blur-2xl" />
            </>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export const TwoColumns = ({
  children,
  ratio = "1-1",
  variant = "default",
  background = "none",
  noPadding = false
}: {
  children: ReactNode;
  ratio?: "1-1" | "1-2" | "2-1" | "1-1-1" | "5-7" | "7-5";
  variant?: "default" | "card";
  background?: "none" | "subtle";
  noPadding?: boolean;
}) => {
  const ratioClasses = {
    "1-1": "flex flex-col md:flex-row", // 1:1 ratio (2 columns)
    "1-2": "grid grid-cols-1 lg:grid-cols-3", // 1:2 ratio (2 columns with different spans)
    "2-1": "grid grid-cols-1 lg:grid-cols-3", // 2:1 ratio (2 columns with different spans)
    "1-1-1": "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3", // 1:1:1 ratio (3 equal columns, responsive)
    "5-7": "flex flex-col md:flex-row", // 5:7 ratio
    "7-5": "flex flex-col md:flex-row" // 7:5 ratio
  };

  const gapClasses = ratio === "1-1-1" ? "gap-8 md:gap-12 lg:gap-8" : "gap-8 sm:gap-0";
  const alignClasses = ratio === "1-1-1" ? "items-stretch" : "items-start sm:items-center";
  const cardClasses =
    variant === "card"
      ? `bg-white rounded-3xl border border-gray-200 ${noPadding ? "p-0 md:p-0" : "pt-8 md:py-12"}`
      : "";
  const backgroundClasses = background === "subtle" ? "white" : "";

  return (
    <div className={`${ratioClasses[ratio]} ${gapClasses} ${alignClasses} ${cardClasses} ${backgroundClasses}`}>
      {children}
    </div>
  );
};

export const Column = ({
  children,
  span = 1,
  order = "default",
  position = "center"
}: {
  children: ReactNode;
  span?: 1 | 2 | 3 | 5 | 7;
  order?: "default" | "text" | "visual";
  position?: "center" | "start";
}) => {
  const spanClasses = {
    1: "md:basis-1/2 w-full",
    2: "md:col-span-2",
    3: "md:col-span-3",
    5: "md:basis-5/12 w-full",
    7: "md:basis-7/12 w-full"
  };

  // On mobile, text columns come first (order-1), visual columns come second (order-2)
  // On desktop, reset to default order (lg:order-none)
  const orderClasses = {
    default: "",
    text: "order-1 md:order-none px-4 sm:px-8 text-pretty md:text-wrap",
    visual: "order-2 md:order-none"
  };

  const positionClasses = {
    center: "",
    start: "self-start"
  };

  return (
    <div className={`${spanClasses[span]} ${orderClasses[order]} space-y-6 min-w-0 ${positionClasses[position]}`}>
      {children}
    </div>
  );
};

// Problem components
export const WithoutPimms = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale, namespace: "general" });

  return (
    <div className="inline-flex items-center gap-2 text-gray-600 font-semibold text-xs uppercase tracking-wider mb-4">
      <div className="w-8 h-[2px] bg-gray-300"></div>
      {t("without_pimms")}
      <div className="w-8 h-[2px] bg-gray-300"></div>
    </div>
  );
};

// Media components
export const Video = ({ src }: { src: string }) => (
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-auto object-contain md:object-cover border border-gray-200 rounded-3xl"
  >
    <source src={src} type="video/mp4" />
  </video>
);

// Logo components
export const InlineLogo = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <Image
    src={src}
    alt={alt}
    width={183}
    height={39}
    className={cn("inline-block h-12 md:h-15 lg:h-18 w-auto ml-2 md:ml-3 lg:ml-4", className)}
    style={{
      display: "inline-block",
      verticalAlign: "middle"
    }}
  />
);

// Styling components
export const Primary = ({
  children,
  variant = "h2",
  icon
}: {
  children: React.ReactNode;
  variant?: "h1" | "h2";
  icon?: "sales" | "growth" | "why" | "pricing" | "minutes" | "questions" | "target" | "cash";
}) => {
  return (
    <span className="bg-gradient-to-r from-brand-secondary to-brand-primary bg-clip-text text-transparent pr-[2px] [-webkit-text-fill-color:transparent] inline-flex items-baseline gap-1">
      {icon && <TitleIcon icon={icon} variant={variant} />}
      <span>{children}</span>
    </span>
  );
};

export const TitleIcon = ({
  icon,
  variant = "h1"
}: {
  icon: "sales" | "growth" | "why" | "pricing" | "minutes" | "questions" | "target" | "cash";
  variant?: "h1" | "h2";
}) => {
  const sizeClasses =
    variant === "h2"
      ? "w-9 h-9 md:w-10 md:h-10 xl:w-12 xl:h-12 ml-1"
      : "w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 ml-3";

  const sizeIconClasses =
    variant === "h2" ? "w-5 h-5 md:w-6 md:h-6 xl:w-7 xl:h-7" : "w-8 h-8 md:w-10 md:h-10 xl:w-11 xl:h-11";

  const iconMap = {
    sales: FaArrowTrendUp,
    growth: MdRocketLaunch,
    why: FaMedal,
    pricing: FaDollarSign,
    minutes: FaRegClock,
    questions: FaQuestion,
    target: Target,
    cash: DollarIcon
  } as const;

  const LucideIcon = iconMap[icon];

  return (
    <span
      className={`inline-flex items-center align-baseline justify-center bg-gradient-to-tr to-brand-secondary from-brand-primary rounded-lg rotate-7 -translate-x-0.5 -translate-y-0.5 md:-translate-y-1 shadow-md shadow-brand-primary/40 ${sizeClasses}`}
    >
      <LucideIcon className={`${sizeIconClasses} drop-shadow-lg drop-shadow-brand-primary text-white`} />
    </span>
  );
};

export const HideOnMobile = ({ children }: { children: React.ReactNode }) => (
  <span className="hidden sm:inline">{children}</span>
);

export const HideOnDesktop = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block sm:hidden">{children}</span>
);
