import Image from "next/image";
import Link from "next/link";
import { formatDate, PageMetadata } from "@/lib/mdx";
import Author from "./author";
import { notFound } from "next/navigation";
import { getCanonicalLink } from "../../lib/utils";
import { ArrowUpRight } from "@/components/icons/custom-icons";

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

export default async function BlogCard({
  slug,
  metadata,
  locale,
  priority = false
}: {
  slug: string;
  metadata: PageMetadata;
  locale: string;
  priority?: boolean;
}) {
  if (!metadata || !slug) {
    return notFound();
  }

  const { title, summary, image, author, publishedAt, updatedAt } = metadata;
  const integrationName = extractIntegrationName(title, metadata.categories || []);

  return (
    <Link
      href={getCanonicalLink(locale, `/articles/${slug}`)}
      className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <Image
          className="w-full h-full object-cover aspect-[16/7] group-hover:scale-105 transition-transform duration-500"
          src={image}
          alt={title}
          width={1200}
          height={630}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="bg-brand-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full capitalize">
            {metadata.categories[0].replace("-", " ")}
          </div>
          {integrationName && (
            <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              {integrationName}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pb-5">
        <h3 className="font-bold text-xl text-gray-900 group-hover:text-brand-primary transition-colors mb-4 leading-tight line-clamp-3">
          {title}
        </h3>

        <p className="text-gray-600 line-clamp-3 mb-5 leading-relaxed text-base">{summary}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            {author && <Author username={author} size="sm" noLink locale={locale} />}
            <span className="text-sm font-medium text-gray-500 ml-0 sm:ml-0">
              {formatDate(updatedAt || publishedAt)}
            </span>
          </div>
          <ArrowUpRight className="w-5 h-5 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
}
