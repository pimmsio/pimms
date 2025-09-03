import Image from "next/image";
import Link from "next/link";
import { formatDate, PageMetadata } from "@/lib/mdx";
import Author from "./author";
import { notFound } from "next/navigation";
import { getCanonicalLink } from "../../lib/utils";
import { useLocale } from "next-intl";
import { Clock, ArrowUpRight, Tag, Edit3 } from "lucide-react";

// Function to extract integration name from guide titles
function extractIntegrationName(title: string, categories: string[]): string | null {
  if (!categories.includes("guides")) return null;

  const integrations = [
    "Calendly",
    "Webflow",
    "WordPress",
    "Elementor",
    "Framer",
    "Stripe",
    "Systeme.io",
    "Tally",
    "Cal.com",
    "iClosed",
    "Zapier",
    "HubSpot",
    "Mailchimp",
    "ConvertKit",
    "ActiveCampaign",
    "Typeform",
    "Shopify"
  ];

  for (const integration of integrations) {
    if (title.toLowerCase().includes(integration.toLowerCase())) {
      return integration;
    }
  }

  // Special cases for compound names
  if (title.toLowerCase().includes("systeme.io") || title.toLowerCase().includes("systemeio")) {
    return "Systeme.io";
  }

  return null;
}

export default function BlogCard({ slug, metadata }: { slug: string; metadata: PageMetadata; priority?: boolean }) {
  const locale = useLocale();

  if (!metadata || !slug) {
    return notFound();
  }

  const { title, summary, image, author, publishedAt, updatedAt } = metadata;
  const integrationName = extractIntegrationName(title, metadata.categories || []);

  return (
    <Link
      href={getCanonicalLink(locale, `/articles/${slug}`)}
      className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 hover:shadow-md transition-all duration-200"
    >
      <div className="relative overflow-hidden">
        <Image
          className="w-full h-full object-cover aspect-[1200/630] group-hover:scale-105 transition-transform duration-300"
          src={image}
          alt={title}
          width={1200}
          height={630}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="bg-white/95 backdrop-blur-sm text-brand-primary text-xs font-semibold px-4 py-2 rounded-full capitalize shadow-sm">
            {/* Category badge */}
            {metadata.categories[0].replace("-", " ")}
          </div>
          {integrationName && (
            <div className="bg-blue-500/95 backdrop-blur-sm text-white text-xs font-semibold px-3 py-2 rounded-full shadow-sm flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              {integrationName}
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg sm:text-xl text-text-primary group-hover:text-brand-primary transition-colors mb-3 leading-tight">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-text-secondary line-clamp-3 mb-6 leading-relaxed">{summary}</p>

        <div className="flex items-center justify-between text-xs sm:text-sm text-text-secondary">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
            {author && <Author username={author} imageOnly size="sm" noLink />}
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                <span className="font-medium truncate">Published {formatDate(publishedAt)}</span>
              </div>
              {updatedAt && (
                <div className="flex items-center gap-1.5 text-blue-600/70">
                  <Edit3 className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                  <span className="font-medium text-xs truncate">Updated {formatDate(updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
}
