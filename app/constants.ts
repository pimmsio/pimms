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
];

export const AUTHORS: {
  name: string;
  image: string;
  role: string;
  slug: string;
}[] = [
  {
    name: "Alexandre Sarfati",
    role: "Founder",
    image: "https://assets.pimms.io/linkedin-profile-alex-pimms.jpg",
    slug: "alexandre",
  },
  {
    name: "Emma",
    role: "Castro",
    image: "https://assets.pimms.io/linkedin-profile-emma.jpg?v=3",
    slug: "emma",
  },
];
