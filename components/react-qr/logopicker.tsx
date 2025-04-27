import { useCallback, useState } from "react";
import { PickerChoice } from "./pickerchoices";
import { ShowMoreButton } from "./showmore";
import { LogoType } from "../types";
const LOGO_SIZE = 24;

const DEFAULT_LOGOS = {
  google:
    "https://res.cloudinary.com/dh7z4ooeo/image/upload/v1712526846/web/logos/dkkrxomzn1t0s2csrvri.svg",
  facebook:
    "https://res.cloudinary.com/dh7z4ooeo/image/upload/v1712526846/web/logos/mymz1jjmrukvpjc8sjjo.svg",
  instagram:
    "https://res.cloudinary.com/dh7z4ooeo/image/upload/v1712526846/web/logos/tdh4rsmgblvyxp3lcyzh.svg",
  x: "https://res.cloudinary.com/dh7z4ooeo/image/upload/v1712526929/web/logos/oynvijnxi4dp8rxccis4.svg",
  linkedin:
    "https://res.cloudinary.com/dh7z4ooeo/image/upload/v1712526846/web/logos/sqgufnsgluzo9upkywxn.svg",
  tiktok:
    "https://res.cloudinary.com/dh7z4ooeo/image/upload/v1712526846/web/logos/lgz6hncbxaazhclaspan.svg",
};

export function LogoPicker({
  maxItemsPerLine = 6,
  logo,
  setLogo,
}: {
  maxItemsPerLine?: number;
  logo: string | undefined;
  setLogo: (logo: string | undefined) => void;
}) {
  const handleClick = useCallback(
    (s: string) => {
      if (logo === s) {
        setLogo(undefined);
        return;
      }

      setLogo(s);
    },
    [setLogo]
  );

  const [showAll, setShowAll] = useState(false);
  const visibleChoices = showAll
    ? Object.values(DEFAULT_LOGOS)
    : Object.values(DEFAULT_LOGOS).slice(0, maxItemsPerLine);

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {visibleChoices.map((s) => (
        <PickerChoice
          key={s}
          icon={<img src={s} alt={s} width={LOGO_SIZE} height={LOGO_SIZE} />}
          onClick={() => handleClick(s as LogoType)}
        />
      ))}
      {Object.values(DEFAULT_LOGOS).length > maxItemsPerLine && (
        <ShowMoreButton showAll={showAll} setShowAll={setShowAll} />
      )}
    </div>
  );
}
