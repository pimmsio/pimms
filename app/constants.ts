const formatUrl = (path: string | undefined): string => {
  if (!path) {
    return "";
  }

  // Check if the path is in the format of "localhost:port"
  if (/^localhost:\d+$/.test(path)) {
    return `http://${path}`;
  }

  // For all other paths, prepend "https://"
  return `https://${path}`;
};

const getRootDomain = (urlString: string) => {
  try {
    const url = new URL(urlString);
    const hostnameParts = url.hostname.split(".");

    // Ensuring there are at least two parts (second-level and top-level)
    if (hostnameParts.length >= 2) {
      const rootDomain = "." + hostnameParts.slice(-2).join(".");
      return rootDomain;
    }

    return undefined;
  } catch {
    console.error("Invalid URL provided:", urlString);
    return undefined;
  }
};

export const WEB_DOMAIN = process.env.NEXT_PUBLIC_WEB_DOMAIN as string;
export const WEB_URL = formatUrl(WEB_DOMAIN);

export const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN as string;
export const APP_URL = formatUrl(APP_DOMAIN);

export const COOKIE_DOMAIN = getRootDomain(WEB_URL);

export const WORDMARK = "https://assets.pimms.io/wordmark.png";
export const WORDMARK_BLACK = "https://assets.pimms.io/wordmark-black.png";
export const THUMBNAIL = "https://assets.pimms.io/thumbnail.jpg?v=3";

export const BLOG_CATEGORIES = [
  // "company",
  "guides",
  "tutorials",
  "digital-marketing",
  "legal",
  "tool-comparison"
];

export const BLOG_TAGS: {
  [key: string]: {
    en: { slug: string; label: string };
    fr: { slug: string; label: string };
  };
} = {
  "utm-parameters": {
    en: { slug: "utm-parameters", label: "UTM Parameters" },
    fr: { slug: "parametres-utm", label: "Paramètres UTM" }
  },
  stripe: {
    en: { slug: "stripe", label: "Stripe" },
    fr: { slug: "stripe", label: "Stripe" }
  },
  calcom: {
    en: { slug: "calcom", label: "Cal.com" },
    fr: { slug: "calcom", label: "Cal.com" }
  },
  framer: {
    en: { slug: "framer", label: "Framer" },
    fr: { slug: "framer", label: "Framer" }
  },
  webflow: {
    en: { slug: "webflow", label: "Webflow" },
    fr: { slug: "webflow", label: "Webflow" }
  },
  calendly: {
    en: { slug: "calendly", label: "Calendly" },
    fr: { slug: "calendly", label: "Calendly" }
  },
  zapier: {
    en: { slug: "zapier", label: "Zapier" },
    fr: { slug: "zapier", label: "Zapier" }
  },
  iclosed: {
    en: { slug: "iclosed", label: "iClosed" },
    fr: { slug: "iclosed", label: "iClosed" }
  },
  elementor: {
    en: { slug: "elementor", label: "Elementor" },
    fr: { slug: "elementor", label: "Elementor" }
  },
  wordpress: {
    en: { slug: "wordpress", label: "WordPress" },
    fr: { slug: "wordpress", label: "WordPress" }
  },
  tally: {
    en: { slug: "tally", label: "Tally" },
    fr: { slug: "tally", label: "Tally" }
  },
  systemeio: {
    en: { slug: "systemeio", label: "Systeme.io" },
    fr: { slug: "systemeio", label: "Systeme.io" }
  },
  "no-code": {
    en: { slug: "no-code", label: "No-Code" },
    fr: { slug: "sans-code", label: "Sans Code" }
  },
  developers: {
    en: { slug: "developers", label: "Developers" },
    fr: { slug: "developpeurs", label: "Développeurs" }
  },
  "payment-tracking": {
    en: { slug: "payment-tracking", label: "Payment Tracking" },
    fr: { slug: "suivi-paiements", label: "Suivi des Paiements" }
  },
  "booking-tracking": {
    en: { slug: "booking-tracking", label: "Booking Tracking" },
    fr: { slug: "suivi-reservations", label: "Suivi des Réservations" }
  },
  "form-tracking": {
    en: { slug: "form-tracking", label: "Form Tracking" },
    fr: { slug: "suivi-formulaires", label: "Suivi des Formulaires" }
  },
  "website-builder": {
    en: { slug: "website-builder", label: "Website Builder" },
    fr: { slug: "constructeur-site", label: "Constructeur de Site" }
  }
};

export const AUTHORS: {
  name: string;
  image: string;
  role: string;
  slug: string;
}[] = [
  {
    name: "Alexandre Sarfati",
    role: "Founder",
    image: "https://assets.pimms.io/linkedin-profile-alex.webp",
    slug: "alexandre"
  },
  {
    name: "Emma",
    role: "Page",
    image: "https://assets.pimms.io/linkedin-profile-emma.webp",
    slug: "emma"
  }
];
