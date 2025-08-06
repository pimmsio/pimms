import Image from "next/image";
import BarList from "./bar-list";

interface RefererProps {
  showABTesting?: boolean;
}

export default function Referer({ showABTesting = false }: RefererProps) {
  if (showABTesting) {
    return <ABTestingReferer />;
  }

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

function ABTestingReferer() {
  return (
    <div className="w-full p-4 bg-white space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">A/B Test Results</h3>
        <p className="text-sm text-gray-600">Conversions by channel and variation</p>
      </div>

      {/* LinkedIn */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src={getGoogleFavicon("linkedin.com")}
            width={20}
            height={20}
            className="h-5 w-5 rounded-full"
            alt="LinkedIn"
          />
          <span className="font-medium text-gray-700">LinkedIn</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Variation A</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">7.7%</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">43 conversions</div>
            <div className="text-xs text-gray-500">560 clicks</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Variation B</span>
              <span className="text-xs bg-green-200 px-2 py-1 rounded font-medium">12.1%</span>
            </div>
            <div className="text-lg font-semibold text-green-700">67 conversions</div>
            <div className="text-xs text-gray-500">554 clicks</div>
          </div>
        </div>
      </div>

      {/* Twitter */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src={getGoogleFavicon("twitter.com")}
            width={20}
            height={20}
            className="h-5 w-5 rounded-full"
            alt="Twitter"
          />
          <span className="font-medium text-gray-700">Twitter</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Variation A</span>
              <span className="text-xs bg-green-200 px-2 py-1 rounded font-medium">14.8%</span>
            </div>
            <div className="text-lg font-semibold text-green-700">8 conversions</div>
            <div className="text-xs text-gray-500">54 clicks</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Variation B</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">11.3%</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">6 conversions</div>
            <div className="text-xs text-gray-500">53 clicks</div>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src={getGoogleFavicon("gmail.com")}
            width={20}
            height={20}
            className="h-5 w-5 rounded-full"
            alt="Email"
          />
          <span className="font-medium text-gray-700">Email</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Variation A</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">15.4%</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">12 conversions</div>
            <div className="text-xs text-gray-500">78 clicks</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Variation B</span>
              <span className="text-xs bg-green-200 px-2 py-1 rounded font-medium">22.5%</span>
            </div>
            <div className="text-lg font-semibold text-green-700">18 conversions</div>
            <div className="text-xs text-gray-500">80 clicks</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const GOOGLE_FAVICON_URL = "https://www.google.com/s2/favicons?sz=64&domain_url=";

export const getGoogleFavicon = (url: string) => {
  return `${GOOGLE_FAVICON_URL}${url}`;
};
