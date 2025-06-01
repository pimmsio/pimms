import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { APP_URL } from "../../app/constants";
import Link from "next/link";

export default function CtaLink() {
  const tcommon = useTranslations("landing");
  return (
    <Link href={`${APP_URL}/register`} className="hidden md:block">
      <Button variant="link" className="text-sm font-medium text-gray-600 hover:text-gray-900">
        {tcommon("cta.link")}
      </Button>
    </Link>
  );
}
