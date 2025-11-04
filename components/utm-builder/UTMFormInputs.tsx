"use client";

import { Input } from "@/components/ui/input";
import { useLocale } from "next-intl";

interface UTMFormInputsProps {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  onUrlChange: (value: string) => void;
  onSourceChange: (value: string) => void;
  onMediumChange: (value: string) => void;
  onCampaignChange: (value: string) => void;
  onTermChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export function UTMFormInputs({
  url,
  source,
  medium,
  campaign,
  term,
  content,
  onUrlChange,
  onSourceChange,
  onMediumChange,
  onCampaignChange,
  onTermChange,
  onContentChange
}: UTMFormInputsProps) {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">
      <div className="space-y-6">
        {/* Website URL - Required */}
        <div>
          <label htmlFor="url" className="block text-sm font-semibold text-gray-900 mb-2">
            {isEn ? "Website URL" : "URL du Site Web"} <span className="text-brand-primary">*</span>
          </label>
          <Input
            id="url"
            type="text"
            placeholder={isEn ? "https://www.yourdomain.com/" : "https://www.tondomaine.com/"}
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className="w-full h-12 text-base rounded-full px-6"
            required
          />
        </div>

        {/* Campaign Source */}
        <div>
          <label htmlFor="source" className="block text-sm font-semibold text-gray-900 mb-2">
            {isEn ? "Campaign Source" : "Source de Campagne"}
          </label>
          <Input
            id="source"
            type="text"
            placeholder="google, facebook, newsletter"
            value={source}
            onChange={(e) => onSourceChange(e.target.value)}
            className="w-full h-12 text-base rounded-full px-6"
          />
          <p className="text-xs text-gray-500 mt-1">
            {isEn
              ? "referrer: google, emailnewsletter2, facebook"
              : "référent: google, emailnewsletter2, facebook"}
          </p>
        </div>

        {/* Campaign Medium */}
        <div>
          <label htmlFor="medium" className="block text-sm font-semibold text-gray-900 mb-2">
            {isEn ? "Campaign Medium" : "Support de Campagne"}
          </label>
          <Input
            id="medium"
            type="text"
            placeholder="cpc, banner, email, social"
            value={medium}
            onChange={(e) => onMediumChange(e.target.value)}
            className="w-full h-12 text-base rounded-full px-6"
          />
          <p className="text-xs text-gray-500 mt-1">
            {isEn ? "marketing medium: cpc, banner, email, social" : "support marketing: cpc, banner, email, social"}
          </p>
        </div>

        {/* Campaign Name */}
        <div>
          <label htmlFor="campaign" className="block text-sm font-semibold text-gray-900 mb-2">
            {isEn ? "Campaign Name" : "Nom de Campagne"}
          </label>
          <Input
            id="campaign"
            type="text"
            placeholder={isEn ? "product, promo code, slogan" : "produit, code promo, slogan"}
            value={campaign}
            onChange={(e) => onCampaignChange(e.target.value)}
            className="w-full h-12 text-base rounded-full px-6"
          />
          <p className="text-xs text-gray-500 mt-1">
            {isEn ? "e.g. product, promo code, slogan" : "ex. produit, code promo, slogan"}
          </p>
        </div>

        {/* Campaign Term - Optional */}
        <div>
          <label htmlFor="term" className="block text-sm font-semibold text-gray-900 mb-2">
            {isEn ? "Campaign Term" : "Terme de Campagne"}{" "}
            <span className="text-xs font-normal text-gray-500">({isEn ? "optional" : "optionnel"})</span>
          </label>
          <Input
            id="term"
            type="text"
            placeholder={isEn ? "paid keywords" : "mots-clés payants"}
            value={term}
            onChange={(e) => onTermChange(e.target.value)}
            className="w-full h-12 text-base rounded-full px-6"
          />
          <p className="text-xs text-gray-500 mt-1">
            {isEn ? "Identify the paid keywords" : "Identifie les mots-clés payants"}
          </p>
        </div>

        {/* Campaign Content - Optional */}
        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2">
            {isEn ? "Campaign Content" : "Contenu de Campagne"}{" "}
            <span className="text-xs font-normal text-gray-500">({isEn ? "optional" : "optionnel"})</span>
          </label>
          <Input
            id="content"
            type="text"
            placeholder={isEn ? "differentiate ads" : "différencier les annonces"}
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full h-12 text-base rounded-full px-6"
          />
          <p className="text-xs text-gray-500 mt-1">
            {isEn ? "use to differentiate ads" : "utilise pour différencier les annonces"}
          </p>
        </div>
      </div>
    </div>
  );
}
