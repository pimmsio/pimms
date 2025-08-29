import { ReactNode } from "react";
import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { H2 as BaseH2 } from "@/components/base/h2";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], style: ["italic"] });

// Typography components
export const H1 = ({ children }: { children: ReactNode }) => <>{children}</>;
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
  variant = "default"
}: {
  children: ReactNode;
  size?: "base" | "lg";
  variant?: "default" | "white";
}) => {
  const sizeClasses = {
    base: "text-base md:text-lg",
    lg: "text-lg md:text-xl"
  };

  // Default color is muted (gray-600), lg size gets mb-8
  const spacing = size === "lg" ? "mb-8" : "mb-4";
  const colorClass = variant === "white" ? "text-white/90" : "text-gray-600";

  return <div className={`${sizeClasses[size]} ${colorClass} ${spacing} leading-relaxed`}>{children}</div>;
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
    default: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
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
    default: "bg-gray-50 text-gray-900 border border-gray-200",
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
  const layoutClasses = layout === "horizontal" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-6";

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
      <svg className="w-5 h-5 text-vibrant-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export const FeatureCard = ({ children }: { children: ReactNode }) => (
  <div className="text-center space-y-4 p-6">{children}</div>
);

export const IconBox = ({
  icon
}: {
  icon: "zap" | "globe" | "share" | "target" | "mobile" | "chart" | "link" | "integration" | "check";
}) => {
  const icons = {
    zap: <Zap size={32} className="text-brand-primary" />,
    globe: (
      <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3 12h18 M12 3c1.66 0 3 4.03 3 9s-1.34 9-3 9-3-4.03-3-9 1.34-9 3-9z"
        />
      </svg>
    ),
    share: (
      <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98M21 5a3 3 0 11-6 0 3 3 0 016 0zM3 12a3 3 0 116 0 3 3 0 01-6 0zm18 7a3 3 0 11-6 0 3 3 0 616 0z"
        />
      </svg>
    ),
    target: (
      <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M15 12a3 3 0 11-6 0 3 3 0 016 0z M12 12h.01"
        />
      </svg>
    ),
    mobile: (
      <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
        />
      </svg>
    ),
    chart: (
      <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    link: (
      <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
    integration: (
      <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
    check: (
      <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    )
  };

  return (
    <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary/10 rounded-2xl mb-6">
      {icons[icon]}
    </div>
  );
};

// Group components
export const Group = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Features = ({ children }: { children: ReactNode }) => <>{children}</>;

// CTA components
export const CTA = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Fast = () => <Zap size={32} fill="currentColor" />;
export const CtaButton = ({
  children,
  variant = "default"
}: {
  children: ReactNode;
  variant?: "default" | "inverse";
}) => {
  const handleClick = () => {
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
        className={`inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap font-semibold leading-tight transition-all duration-200 h-12 px-8 text-base rounded-full hover:scale-105 ${
          variant === "inverse"
            ? "bg-white text-brand-primary hover:bg-gray-50 shadow-lg hover:shadow-xl border border-white/20"
            : "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm hover:shadow-md"
        }`}
      >
        {children}
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
    <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
      <span className={`text-sm ${colorClass}`}>{children}</span>
    </div>
  );
};

// Layout components
export const Centered = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center text-center space-y-6 mb-16 max-w-4xl mx-auto sm:px-4 w-full">
    {children}
  </div>
);

export const ContentWrapper = ({ children }: { children: ReactNode }) => (
  <div className="space-y-6 text-center lg:text-left">{children}</div>
);

export const Section = ({
  children,
  variant = "plain",
  maxWidth = "6xl",
  id
}: {
  children: ReactNode;
  variant?: "card" | "branded" | "plain";
  maxWidth?: "full" | "6xl" | "4xl" | "2xl";
  id?: string;
}) => {
  const getBaseClasses = () => {
    if (variant === "card") {
      return "bg-white rounded-3xl border border-gray-200 px-2 py-8 sm:p-8 lg:p-12 mb-16";
    }
    if (variant === "branded") {
      return "rounded-3xl border border-brand-primary/20 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10 mb-16";
    }
    return "py-8 mb-16";
  };

  const widthClasses = {
    full: "",
    "6xl": "max-w-6xl mx-auto",
    "4xl": "max-w-4xl mx-auto",
    "2xl": "max-w-2xl mx-auto"
  };

  const getBackgroundStyle = () => {
    if (variant === "branded") {
      return { backgroundColor: "#3970ff" };
    }
    return undefined;
  };

  return (
    <div id={id} className={`${getBaseClasses()} ${widthClasses[maxWidth]}`} style={getBackgroundStyle()}>
      {children}
    </div>
  );
};

export const TwoColumns = ({
  children,
  ratio = "1-1",
  mobileCard = false
}: {
  children: ReactNode;
  ratio?: "1-1" | "1-2" | "2-1" | "1-1-1" | "5-7" | "7-5";
  mobileCard?: boolean;
}) => {
  const ratioClasses = {
    "1-1": "lg:grid-cols-2", // 1:1 ratio (2 columns)
    "1-2": "lg:grid-cols-3", // 1:2 ratio (2 columns with different spans)
    "2-1": "lg:grid-cols-3", // 2:1 ratio (2 columns with different spans)
    "1-1-1": "md:grid-cols-1 lg:grid-cols-3", // 1:1:1 ratio (3 equal columns, responsive)
    "5-7": "lg:grid-cols-12", // 5:7 ratio
    "7-5": "lg:grid-cols-12" // 7:5 ratio
  };

  const gapClasses = ratio === "1-1-1" ? "gap-8 md:gap-12 lg:gap-8" : "gap-8 lg:gap-16";
  const alignClasses = ratio === "1-1-1" ? "items-stretch" : "items-start sm:items-center";
  const cardClasses = mobileCard
    ? "bg-white rounded-3xl border border-gray-200 py-12 px-4 sm:bg-transparent sm:rounded-none sm:border-none sm:py-0 sm:px-0"
    : "";

  return (
    <div className={`grid grid-cols-1 ${ratioClasses[ratio]} ${gapClasses} ${alignClasses} ${cardClasses}`}>
      {children}
    </div>
  );
};

export const Column = ({
  children,
  span = 1,
  order = "default"
}: {
  children: ReactNode;
  span?: 1 | 2 | 3 | 5 | 7;
  order?: "default" | "text" | "visual";
}) => {
  const spanClasses = {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    5: "lg:col-span-5",
    7: "lg:col-span-7"
  };

  // On mobile, text columns come first (order-1), visual columns come second (order-2)
  // On desktop, reset to default order (lg:order-none)
  const orderClasses = {
    default: "",
    text: "order-1 lg:order-none px-4 sm:px-0 text-pretty sm:text-wrap",
    visual: "order-2 lg:order-none sm:bg-white sm:rounded-3xl sm:border sm:border-gray-200"
  };

  return <div className={`${spanClasses[span]} ${orderClasses[order]} space-y-6`}>{children}</div>;
};

// Problem components
export const WithoutPimms = () => {
  const t = useTranslations("general");

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
  <video autoPlay loop muted playsInline className="w-full h-auto object-cover border border-gray-200 rounded-3xl">
    <source src={src} type="video/mp4" />
  </video>
);

// Styling components
export const Primary = ({ children }: { children: React.ReactNode }) => (
  <span className={`text-brand-primary ${inter.className} font-bold italic`}>{children}</span>
);

export const HideOnMobile = ({ children }: { children: React.ReactNode }) => (
  <span className="hidden sm:inline">{children}</span>
);

export const HideOnDesktop = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block sm:hidden">{children}</span>
);
