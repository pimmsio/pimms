export type NavItem = {
  labelKey: string;
  descriptionKey?: string;
  href: string;
  external?: boolean;
  icon?: string;
};

export type NavGroup = {
  labelKey: string;
  items: NavItem[];
};

export const productItems: NavItem[] = [
  {
    labelKey: "nav.product.smart-links",
    descriptionKey: "nav.product.smart-links_desc",
    href: "/landings/smart-links",
    icon: "link"
  },
  {
    labelKey: "nav.product.analytics",
    descriptionKey: "nav.product.analytics_desc",
    href: "/landings/analytics",
    icon: "chart"
  },
  {
    labelKey: "nav.product.utm",
    descriptionKey: "nav.product.utm_desc",
    href: "/landings/utm",
    icon: "target"
  },
  {
    labelKey: "nav.product.qr-codes",
    descriptionKey: "nav.product.qr-codes_desc",
    href: "/landings/qr-codes",
    icon: "qrcode"
  },
  {
    labelKey: "nav.product.bulk-links",
    descriptionKey: "nav.product.bulk-links_desc",
    href: "/landings/bulk-links",
    icon: "folder"
  }
];

export const integrationItems: NavItem[] = [
  { labelKey: "nav.integrations.stripe", href: "/landings/stripe", icon: "stripe" },
  { labelKey: "nav.integrations.calcom", href: "/landings/calcom", icon: "calcom" },
  { labelKey: "nav.integrations.brevo", href: "/landings/brevo", icon: "brevo" },
  { labelKey: "nav.integrations.webflow", href: "/landings/webflow", icon: "webflow" },
  { labelKey: "nav.integrations.framer", href: "/landings/framer", icon: "framer" },
  { labelKey: "nav.integrations.calendly", href: "/landings/calendly", icon: "calendly" },
  { labelKey: "nav.integrations.view-all", href: "/landings/integrations", icon: "globe" }
];

export const resourceItems: NavItem[] = [
  {
    labelKey: "nav.resources.blog",
    href: "/articles/category/digital-marketing"
  },
  {
    labelKey: "nav.resources.guides",
    href: "/articles/category/guides"
  },
  {
    labelKey: "nav.resources.tutorials",
    href: "/articles/category/tutorials"
  },
  {
    labelKey: "nav.resources.api",
    href: "https://pim.ms/api",
    external: true
  },
  {
    labelKey: "nav.resources.sdk",
    href: "https://pim.ms/sdk-ts",
    external: true
  },
  {
    labelKey: "nav.resources.site-checker",
    href: "/freetools/site-checker"
  }
];

export const navGroups: NavGroup[] = [
  { labelKey: "nav.product._label", items: productItems },
  { labelKey: "nav.integrations._label", items: integrationItems },
  { labelKey: "nav.resources._label", items: resourceItems }
];
