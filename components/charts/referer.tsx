import Image from "next/image";
import BarList from "./bar-list";

export default function Referer() {
  const refererData = [
    {
      value: 560,
      title: "LinkedIn",
      href: "linkedin.com"
    },
    {
      value: 87,
      title: "Calendly",
      href: "calendly.com"
    },
    {
      value: 54,
      title: "Twitter",
      href: "twitter.com"
    },
    {
      value: 29,
      title: "Instagram",
      href: "instagram.com"
    },
    {
      value: 12,
      title: "Google",
      href: "google.com"
    }
  ];

  const data = refererData?.map((d) => ({
    icon: (
      <Image src={getGoogleFavicon(d.href)} width={20} height={20} className="h-4 w-4 rounded-full" alt={d.title} />
    ),
    title: d.title,
    value: d.value
  }));

  return (
    <div className="w-full p-4 bg-white">
      <BarList data={data} maxValue={100} />
    </div>
  );
}

export const GOOGLE_FAVICON_URL = "https://www.google.com/s2/favicons?sz=64&domain_url=";

export const getGoogleFavicon = (url: string) => {
  return `${GOOGLE_FAVICON_URL}${url}`;
};
