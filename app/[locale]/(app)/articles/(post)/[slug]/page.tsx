import { notFound } from "next/navigation";
import { formatDate, getPage, getPages } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { twMerge } from "tailwind-merge";
import React from "react";
import { locales } from "@/i18n/config";
import { generatePagesMetadata, getCanonicalLink } from "@/lib/utils";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/base/section";
import Image from "next/image";
import Link from "next/link";
import { AUTHORS } from "../../../../../constants";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeOlStartCounter } from "@/lib/mdx/rehypeOlStartCounter";
import TableOfContents from "@/components/table-of-content";
import remarkDirective from "remark-directive";
import { remarkIframeDirective } from "@/lib/mdx/remarkIframeDirective";
import { remarkFaqDirective } from "@/lib/mdx/remarkFaqDirective";
import { Faq } from "@/components/mdx/Faq";
import { CallToAction } from "@/components/mdx/CallToAction";
import { remarkCtaPlaceholder } from "@/lib/mdx/remarkCtaDirective";
import { BlogStructuredData } from "@/components/mdx/BlogStructuredData";
import { FaqStructuredData } from "@/components/mdx/FaqStructuredData";
import { InfoSection } from "@/components/mdx/InfoSection";
import { LinkCards } from "@/components/mdx/LinkCards";
import { LinkCard } from "@/components/mdx/LinkCards";
import { Quote } from "@/components/mdx/Quote";
import { Steps, Step, StepCompleted } from "@/components/mdx/Steps";
import { Highlight } from "@/components/mdx/Highlight";
import { remarkCustomDirectives } from "@/lib/mdx/remarkCustomDirectives";
import { Pre } from "@/components/mdx/Pre";
import { Figure } from "@/components/mdx/Figure";
import { articleFolders } from "@/i18n/config";
import TallyIframe from "@/components/mdx/TallyIframe";
import { BreadcrumbStructuredData } from "@/components/mdx/BreadcrumbStructuredData";
import { Clock, ChevronRight, Edit3, ArrowUpRight } from "@/components/icons/custom-icons";
import Author from "@/components/blog/author";

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
    "HubSpot",
    "Mailchimp",
    "Shopify",
    "Google Analytics",
    "Facebook",
    "Instagram",
    "LinkedIn",
    "Twitter",
    "TikTok",
    "YouTube",
    "Twitch",
    "Discord",
    "Slack",
    "Notion",
    "Airtable",
    "Zapier",
    "Make",
    "Bubble",
    "Wix",
    "Squarespace"
  ];

  for (const integration of integrations) {
    if (title.toLowerCase().includes(integration.toLowerCase())) {
      return integration;
    }
  }

  return null;
}

export async function generateStaticParams() {
  const allParams = [];

  for (const locale of locales) {
    const pages = getPages(locale, articleFolders);
    allParams.push(
      ...pages.map((page) => ({
        locale,
        slug: page.slug
      }))
    );
  }

  return allParams;
}

// Enable static generation with revalidation for blog posts
export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static";

export async function generateMetadata({ params }: MetadataProps) {
  const { slug, locale } = await params;
  const post = getPage(locale, articleFolders, slug);

  if (!post) {
    return;
  }

  return generatePagesMetadata({
    params,
    dir: "articles",
    slug,
    metadata: post.metadata
  });
}

function MdxLink({ href, children, locale }: { href?: string; children: React.ReactNode; locale: string }) {
  if (!href) {
    return <span>{children}</span>;
  }

  const isInternalLink = href.startsWith("/");

  if (isInternalLink) {
    return (
      <Link
        href={getCanonicalLink(locale, href)}
        className="text-brand-primary hover:text-brand-primary-hover font-normal transition-colors duration-200"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand-primary hover:text-brand-primary-hover font-normal transition-colors duration-200"
    >
      {children}
    </a>
  );
}

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

const createComponents = (locale: string) => ({
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 sm:my-8 -mx-4 sm:-mx-6 md:mx-0 overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-full text-sm border border-gray-100 rounded-lg sm:rounded-xl overflow-hidden">
          {children}
        </table>
      </div>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-50/50 border-b border-gray-100">{children}</thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => <tbody className="bg-white">{children}</tbody>,
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors">{children}</tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold text-text-primary uppercase tracking-wide bg-gray-50/80">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-text-secondary border-t border-gray-100">
      {children}
    </td>
  ),
  img: ({ src, alt }: { src: string; alt: string }) => {
    const ImageBlock = () => (
      <span className="block my-6 sm:my-8 -mx-4 sm:-mx-6 md:mx-0">
        <Image
          src={src}
          alt={alt || ""}
          width={1200}
          height={630}
          className="w-full rounded-none sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
        />
        {alt && <span className="block mt-3 text-center text-xs sm:text-sm text-gray-500 italic px-4">{alt}</span>}
      </span>
    );

    return <ImageBlock />;
  },
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <MdxLink href={href} locale={locale}>
      {children}
    </MdxLink>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-6 sm:my-8 border-l-4 border-brand-primary bg-gradient-primary-soft p-4 sm:p-5 rounded-r-xl">
      <div className="text-gray-700 italic text-base sm:text-lg leading-relaxed">{children}</div>
    </blockquote>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-5 sm:my-6 space-y-2.5 list-disc list-outside ml-1 text-gray-600 text-base marker:text-brand-primary pl-1">
      {children}
    </ul>
  ),
  ol: ({ children, className, style, start, ...rest }: React.OlHTMLAttributes<HTMLOListElement>) => {
    const styleObj: React.CSSProperties = typeof style === "object" && style !== null ? style : {};
    // Derive start value from multiple possible sources
    let startNum = typeof start === "number" ? start : start ? Number(start) : undefined;
    if (!startNum) {
      // Try data-start
      const maybeDataStart = (rest as any)["data-start"] as any;
      if (maybeDataStart) {
        const n = Number(maybeDataStart);
        if (!Number.isNaN(n)) startNum = n;
      }
    }
    if (!startNum) {
      // Inspect first child <li value="N"> if present
      const childArray = React.Children.toArray(children);
      const first = childArray.find((c) => React.isValidElement(c)) as any;
      const liValue = first?.props?.value;
      if (typeof liValue === "number") startNum = liValue;
      else if (typeof liValue === "string") {
        const n = Number(liValue);
        if (!Number.isNaN(n)) startNum = n;
      }
    }
    const computedStyle: React.CSSProperties = {
      ...styleObj,
      ...(startNum && startNum > 1 ? { counterReset: `list-counter ${startNum - 1}` } : {})
    };

    return (
      <ol
        {...rest}
        start={startNum}
        style={computedStyle}
        className={twMerge("prose-list-ol my-5 sm:my-6 space-y-2.5 text-gray-600 text-base pl-1", className)}
      >
        {children}
      </ol>
    );
  },
  li: ({ children }: { children: React.ReactNode }) => <li className="leading-relaxed pl-1">{children}</li>,
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-5 sm:my-6 text-base sm:text-lg leading-relaxed text-text-secondary font-normal">{children}</p>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="px-1.5 py-0.5 text-sm bg-gray-100 text-gray-800 rounded-md font-mono">{children}</code>
  ),
  hr: () => <hr className="my-8 sm:my-10 border-gray-200" />,
  Faq: ({ question, children }: { question: string; children: React.ReactNode }) => (
    <Faq question={question}>{children}</Faq>
  ),
  CallToAction,
  InfoSection,
  LinkCards,
  LinkCard,
  Quote,
  Steps,
  Step,
  StepCompleted,
  Highlight,
  pre: Pre,
  Figure,
  Tally: TallyIframe,
  Stronger: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <strong className={`font-bold ${className || ""}`}>{children}</strong>
  )
});

export default async function BlogPost({ params }: Props) {
  const { slug, locale } = await params;

  // Set locale for server components
  setRequestLocale(locale);

  const post = getPage(locale, articleFolders, slug);
  const t = await getTranslations({ locale, namespace: "blog.post" });

  const relatedArticles =
    (post.metadata.related && post.metadata.related.map((slug: string) => getPage(locale, articleFolders, slug))) || [];

  if (!post) {
    notFound();
  }

  const author = AUTHORS.find((author) => author.slug === post.metadata.author);

  return (
    <>
      {/* Header section */}
      <Section className="py-8 sm:py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-gradient-background-soft">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-secondary mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
          <Link
            href={getCanonicalLink(locale, "/articles")}
            className="hover:text-brand-primary transition-colors whitespace-nowrap font-medium"
          >
            {t("breadcrumb.articles")}
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 opacity-50" />
          {post.metadata.categories.map((category: string, index: number) => (
            <span key={category} className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href={getCanonicalLink(locale, `/articles/category/${category}`)}
                className="hover:text-brand-primary transition-colors capitalize whitespace-nowrap font-medium"
              >
                {category.replace("-", " ")}
              </Link>
              {index < post.metadata.categories.length - 1 && (
                <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 opacity-50" />
              )}
            </span>
          ))}
        </nav>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4 max-w-4xl">
          {post.metadata.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-text-secondary mb-4 sm:mb-6 max-w-3xl leading-relaxed">
          {post.metadata.summary}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-text-secondary">
          {author && (
            <div className="flex items-center gap-2">
              <Author username={author.slug} size="sm" locale={locale} />
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-gray-100/50 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 opacity-60" />
            <span className="font-medium">
              {t("published")} {formatDate(post.metadata.publishedAt)}
            </span>
          </div>
          {post.metadata.updatedAt && (
            <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
              <Edit3 className="w-3.5 h-3.5 text-blue-900" />
              <span className="font-medium text-blue-900">
                {t("updated")} {formatDate(post.metadata.updatedAt)}
              </span>
            </div>
          )}
        </div>
      </Section>

      {/* Main content */}
      <Section className="py-0 sm:py-0 md:py-0 px-4 md:px-0 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4 max-w-6xl mx-auto">
          <article className="lg:col-span-3">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200">
              {post.metadata.image && (
                <div className="mb-6 sm:mb-8 -mx-4 sm:-mx-6 md:-mx-8 lg:mx-0">
                  <Image
                    className="w-full h-full rounded-xl object-cover aspect-[16/7] group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    width={1200}
                    height={630}
                    priority
                  />
                </div>
              )}

              <div
                className={twMerge(
                  "px-4 sm:px-6 md:px-8 lg:px-12",
                  "prose prose-base lg:prose-lg max-w-none",
                  // Headings - much more subtle, closer to paragraph size for readability
                  "prose-headings:font-medium prose-headings:tracking-normal",
                  "prose-h1:text-xl sm:prose-h1:text-2xl prose-h1:leading-relaxed prose-h1:mt-0 prose-h1:mb-4 prose-h1:text-text-primary",
                  "prose-h2:text-lg sm:prose-h2:text-xl prose-h2:leading-relaxed prose-h2:mt-6 sm:prose-h2:mt-8 prose-h2:mb-3 prose-h2:text-text-primary prose-h2:font-medium",
                  "prose-h3:text-base sm:prose-h3:text-lg prose-h3:leading-relaxed prose-h3:mt-5 sm:prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-text-primary prose-h3:font-medium",
                  "prose-h4:text-base prose-h4:leading-relaxed prose-h4:mt-4 sm:prose-h4:mt-5 prose-h4:mb-2 prose-h4:text-text-primary prose-h4:font-medium",
                  // Paragraphs and text
                  "prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-5 sm:prose-p:mb-6",
                  "prose-strong:font-semibold prose-strong:text-text-primary",
                  // Lists
                  "prose-ul:my-5 sm:prose-ul:my-6 prose-ol:my-5 sm:prose-ol:my-6",
                  "prose-li:text-text-secondary prose-li:mb-2 prose-li:leading-relaxed",
                  // Links - clean and readable, no ugly underlines
                  "prose-a:text-brand-primary prose-a:no-underline hover:prose-a:text-brand-primary-hover prose-a:transition-colors prose-a:duration-200",
                  // Code
                  "prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-100 prose-code:text-gray-800",
                  "prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto",
                  // Blockquote styling
                  "prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:bg-gradient-to-r prose-blockquote:from-brand-primary-light prose-blockquote:to-transparent prose-blockquote:p-5 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:rounded-r-xl prose-blockquote:text-text-primary",
                  // Enhanced table styling
                  "prose-table:border-collapse prose-table:border-0 prose-table:w-full",
                  "prose-thead:bg-gray-50/80",
                  "prose-th:border-b prose-th:border-gray-200 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-700",
                  "prose-td:border-b prose-td:border-gray-100 prose-td:px-4 prose-td:py-3 prose-td:text-text-secondary",
                  "prose-tr:hover:bg-gray-50/30 prose-tr:transition-colors",
                  // Images
                  "prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8",
                  // HR styling
                  "prose-hr:my-12 prose-hr:border-gray-200"
                )}
              >
                <MDXRemote
                  source={post.content}
                  components={createComponents(locale)}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [
                        remarkGfm,
                        remarkDirective,
                        remarkIframeDirective,
                        remarkFaqDirective,
                        remarkCtaPlaceholder,
                        remarkCustomDirectives
                      ],
                      rehypePlugins: [
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: "wrap" }],
                        rehypeOlStartCounter,
                        [
                          rehypePrettyCode,
                          {
                            theme: "github-light",
                            keepBackground: false
                          }
                        ]
                      ]
                    }
                  }}
                />
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 sm:top-8 bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
              {author && (
                <>
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-3 sm:mb-4">
                      {t("writtenBy")}
                    </h3>
                    <div className="flex items-center gap-3">
                      <img
                        alt={`${author.name} avatar`}
                        loading="lazy"
                        width="36"
                        height="36"
                        className="rounded-full w-9 h-9 sm:w-10 sm:h-10"
                        src={author.image}
                      />
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-text-primary">{author.name}</p>
                        <p className="text-xs sm:text-sm text-text-secondary">{author.role}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="border-gray-100 mb-5 sm:mb-6" />
                </>
              )}

              <div>
                <h3 className="text-xs font-bold text-text-primary uppercase tracking-wide mb-4">
                  {t("tableOfContents")}
                </h3>
                <TableOfContents content={post.content} />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {relatedArticles.length > 0 && (
        <Section className="py-10 sm:py-14 md:py-20 px-4 md:px-6 lg:px-8 bg-gradient-background-reverse">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-2 sm:mb-3">
              {t("continueReading")}
            </h2>
            <p className="text-base sm:text-lg text-text-secondary">{t("exploreMore")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {relatedArticles.map((post) => {
              const integrationName = extractIntegrationName(post.metadata.title, post.metadata.categories || []);

              return (
                <Link
                  key={post.slug}
                  href={getCanonicalLink(locale, `/articles/${post.slug}`)}
                  className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      className="w-full h-full object-cover aspect-[16/7] group-hover:scale-105 transition-transform duration-500"
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      width={1200}
                      height={630}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="bg-brand-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full capitalize">
                        {post.metadata.categories[0].replace("-", " ")}
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
                      {post.metadata.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-3 mb-5 leading-relaxed text-base">{post.metadata.summary}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        {post.metadata.author && (
                          <Author username={post.metadata.author} size="sm" noLink locale={locale} />
                        )}
                        <span className="text-sm font-medium text-gray-500 ml-0 sm:ml-0">
                          {formatDate(post.metadata.updatedAt || post.metadata.publishedAt)}
                        </span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      <BreadcrumbStructuredData
        slug={slug}
        category={post.metadata.categories[0]}
        metadata={post.metadata}
        locale={locale}
      />
      <BlogStructuredData
        type={post.dir}
        metadata={post.metadata}
        path={getCanonicalLink(locale, `/articles/${slug}`)}
        author={author}
        locale={locale}
      />
      <FaqStructuredData path={getCanonicalLink(locale, `/articles/${slug}`)} faqs={post.faqs} locale={locale} />
    </>
  );
}
