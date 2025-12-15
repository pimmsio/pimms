import { AvatarFunnelEvents } from "./AvatarFunnelEvents";
import { WEB_URL } from "../../app/constants";

type Props = {
  seedNonce: string;
};

async function fetchAvatarFunnelSvg(seedNonce: string): Promise<string | null> {
  try {
    const uid = `avatar-funnel-${seedNonce.replace(/[^a-zA-Z0-9-]/g, "-")}`;
    const url = `${WEB_URL}/api/animation-svg/avatar-funnel?uid=${encodeURIComponent(uid)}&seed=${encodeURIComponent(seedNonce)}`;

    const response = await fetch(
      url,
      process.env.NODE_ENV === "development"
        ? { cache: "no-store" }
        : {
            // Cache for 1 hour
            next: { revalidate: 3600 }
          }
    );

    if (response.ok) {
      return await response.text();
    } else {
      console.error("Failed to fetch avatar funnel SVG on server");
      return null;
    }
  } catch (error) {
    console.error("Error fetching avatar funnel SVG on server:", error);
    return null;
  }
}

export default async function AvatarFunnel({ seedNonce }: Props) {
  const svgContent = await fetchAvatarFunnelSvg(seedNonce);

  if (!svgContent) {
    return (
      <div className="w-full h-96 bg-white rounded-lg flex items-center justify-center text-gray-500">
        Loading animation...
      </div>
    );
  }

  return (
    <div className="w-full grid place-items-center" aria-hidden="true" data-nosnippet>
      <div className="relative w-full sm:w-11/12">
        <div className="w-full h-auto" dangerouslySetInnerHTML={{ __html: svgContent }} />
        <AvatarFunnelEvents />
      </div>
    </div>
  );
}
