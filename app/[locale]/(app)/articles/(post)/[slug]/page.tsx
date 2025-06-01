import { notFound } from "next/navigation";
import { formatDate, getPage, getPages } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { twMerge } from "tailwind-merge";
import { use } from "react";
import React from "react";
import { locales } from "@/i18n/config";
import { useLocale } from "next-intl";
import { generatePagesMetadata, getCanonicalLink } from "@/lib/utils";
import { Section } from "@/components/base/section";
import Image from "next/image";
import Link from "next/link";
import { AUTHORS } from "../../../../../constants";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
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
import { articleFolders } from "@/i18n/config";
import TallyIframe from "@/components/mdx/TallyIframe";
import { BreadcrumbStructuredData } from "@/components/mdx/BreadcrumbStructuredData";
import { Clock, ChevronRight } from "lucide-react";
import Author from "@/components/blog/author";
import { useTranslations } from "next-intl";

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

function MdxLink({ href, children }: { href?: string; children: React.ReactNode }) {
  const locale = useLocale();

  if (!href) {
    return <span>{children}</span>;
  }

  const isInternalLink = href.startsWith("/");

  if (isInternalLink) {
    return (
      <Link
        href={getCanonicalLink(locale, href)}
        className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium"
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
      className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors duration-200 font-medium inline-flex items-center gap-1"
    >
      {children}
    </a>
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

const components = {
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
    <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-600">{children}</td>
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
  a: MdxLink,
  Iframe: ({ src }: { src: string }) => {
    return (
      <div className="my-6 sm:my-8 -mx-4 sm:-mx-6 md:mx-0">
        <div className="aspect-video w-full rounded-none sm:rounded-xl overflow-hidden shadow-sm">
          <iframe src={src} className="w-full h-full" allowFullScreen />
        </div>
      </div>
    );
  },
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-6 sm:my-8 border-l-4 border-[#3970ff] bg-gradient-to-r from-[#3970ff]/5 to-transparent p-4 sm:p-5 rounded-r-xl">
      <div className="text-gray-700 italic text-base sm:text-lg leading-relaxed">{children}</div>
    </blockquote>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-5 sm:my-6 space-y-2.5 list-disc list-outside ml-1 text-gray-600 text-base marker:text-[#3970ff] pl-1">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="prose-list-ol my-5 sm:my-6 space-y-2.5 text-gray-600 text-base pl-1">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => <li className="leading-relaxed pl-1">{children}</li>,
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-4 sm:my-5 text-base leading-relaxed text-gray-600">{children}</p>
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
  Tally: TallyIframe
};

export default function BlogPost({ params }: Props) {
  const { slug } = use(params);
  const locale = useLocale();
  const post = getPage(locale, articleFolders, slug);
  const t = useTranslations("blog.post");

  const relatedArticles =
    (post.metadata.related && post.metadata.related.map((slug: string) => getPage(locale, articleFolders, slug))) || [];

  if (!post) {
    notFound();
  }

  const author = AUTHORS.find((author) => author.slug === post.metadata.author);

  return (
    <>
      {/* Header section */}
      <Section className="py-8 sm:py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50/30 to-white">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#5C5B61] mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
          <Link
            href={getCanonicalLink(locale, "/articles")}
            className="hover:text-[#3970ff] transition-colors whitespace-nowrap font-medium"
          >
            {t("breadcrumb.articles")}
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 opacity-50" />
          {post.metadata.categories.map((category: string, index: number) => (
            <span key={category} className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href={getCanonicalLink(locale, `/articles/category/${category}`)}
                className="hover:text-[#3970ff] transition-colors capitalize whitespace-nowrap font-medium"
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08272E] mb-3 sm:mb-4 max-w-4xl">
          {post.metadata.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#5C5B61] mb-4 sm:mb-6 max-w-3xl leading-relaxed">
          {post.metadata.summary}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#5C5B61]">
          {author && (
            <div className="flex items-center gap-2">
              <Author username={author.slug} size="sm" />
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-gray-100/50 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 opacity-60" />
            <span className="font-medium">{formatDate(post.metadata.publishedAt)}</span>
          </div>
        </div>
      </Section>

      {/* Main content */}
      <Section className="py-8 sm:py-12 md:py-16 bg-white px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          <article className="lg:col-span-3">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-12">
              {post.metadata.image && (
                <div className="mb-6 sm:mb-8 -mx-4 sm:-mx-6 md:-mx-8 lg:mx-0">
                  <Image
                    className="w-full rounded-none sm:rounded-xl"
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
                  "prose prose-base lg:prose-lg max-w-none",
                  "prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-8 sm:prose-h2:mt-10 prose-h2:mb-4 sm:prose-h2:mb-5 prose-h2:text-[#08272E]",
                  "prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:mb-3 sm:prose-h3:mb-4 prose-h3:text-[#08272E]",
                  "prose-p:text-[#5C5B61] prose-p:leading-relaxed prose-p:mb-4 sm:prose-p:mb-5",
                  "prose-ul:my-5 sm:prose-ul:my-6 prose-ol:my-5 sm:prose-ol:my-6",
                  "prose-li:text-[#5C5B61] prose-li:mb-2",
                  "prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-code:bg-transparent prose-code:text-gray-800",
                  "prose-blockquote:border-l-4 prose-blockquote:border-[#3970ff] prose-blockquote:bg-gradient-to-r prose-blockquote:from-[#3970ff]/5 prose-blockquote:to-transparent prose-blockquote:p-4 sm:prose-blockquote:p-5 prose-blockquote:my-6 sm:prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:rounded-r-xl",
                  "prose-a:text-[#3970ff] prose-a:no-underline hover:prose-a:underline prose-a:font-medium",
                  "prose-strong:font-semibold prose-strong:text-[#08272E]",
                  "prose-hr:my-8 sm:prose-hr:my-10 prose-hr:border-gray-200"
                )}
              >
                <MDXRemote
                  source={post.content}
                  components={components}
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
                        rehypeAutolinkHeadings,
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
                    <h3 className="text-xs font-semibold text-[#08272E] uppercase tracking-wide mb-3 sm:mb-4">
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
                        <p className="text-sm sm:text-base font-semibold text-[#08272E]">{author.name}</p>
                        <p className="text-xs sm:text-sm text-[#5C5B61]">{author.role}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="border-gray-100 mb-5 sm:mb-6" />
                </>
              )}

              <div>
                <h3 className="text-xs font-bold text-[#08272E] uppercase tracking-wide mb-4">
                  {t("tableOfContents")}
                </h3>
                <TableOfContents content={post.content} />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {relatedArticles.length > 0 && (
        <Section className="py-10 sm:py-14 md:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50/50">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#08272E] mb-2 sm:mb-3">
              {t("continueReading")}
            </h2>
            <p className="text-base sm:text-lg text-[#5C5B61]">{t("exploreMore")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {relatedArticles.map((post) => (
              <Link
                key={post.slug}
                href={getCanonicalLink(locale, `/articles/${post.slug}`)}
                className="group block bg-white border border-gray-100 rounded-xl sm:rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="relative overflow-hidden aspect-[16/9]">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    width={1200}
                    height={630}
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#3970ff] text-xs font-semibold px-3 py-1.5 rounded-full capitalize shadow-sm">
                    {post.metadata.categories[0].replace("-", " ")}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="font-bold text-lg sm:text-xl text-[#08272E] group-hover:text-[#3970ff] transition-colors mb-2.5 line-clamp-2">
                    {post.metadata.title}
                  </h3>
                  <p className="text-[#5C5B61] line-clamp-2 mb-4 text-sm sm:text-base leading-relaxed">
                    {post.metadata.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-[#5C5B61]">
                    <span className="font-medium">{formatDate(post.metadata.updatedAt)}</span>
                    <span className="text-[#3970ff] opacity-0 group-hover:opacity-100 transition-opacity">Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <BreadcrumbStructuredData slug={slug} category={post.metadata.categories[0]} metadata={post.metadata} />
      <BlogStructuredData
        type={post.dir}
        metadata={post.metadata}
        url={getCanonicalLink(locale, `/articles/${slug}`)}
        author={author}
      />
      <FaqStructuredData url={getCanonicalLink(locale, `/articles/${slug}`)} faqs={post.faqs} />
    </>
  );
}
