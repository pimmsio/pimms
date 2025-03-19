import { notFound } from "next/navigation";
import { formatDate, getPage, getPages } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { twMerge } from "tailwind-merge";
import { use } from "react";
import { locales } from "@/i18n/config";
import { useLocale } from "next-intl";
import { generatePagesMetadata } from "@/lib/utils";
import { TallyIframe } from "@/components/mdx/TallyIframe";

export async function generateStaticParams() {
  const allParams = [];

  for (const locale of locales) {
    const pages = getPages(locale, "legal");
    allParams.push(
      ...pages.map((page) => ({
        locale,
        slug: page.slug,
      }))
    );
  }

  return allParams;
}

export async function generateMetadata({ params }: MetadataProps) {
  const { slug, locale } = await params;
  const post = getPage(locale, "legal", slug);

  if (!post) {
    return;
  }

  return generatePagesMetadata({
    params,
    dir: "legal",
    slug,
    metadata: post.metadata,
  });
}

type Props = {
  params: Promise<{ slug: string }>;
};

const components = {
  Tally: TallyIframe,
};

export default function LegalPage({ params }: Props) {
  const { slug } = use(params);
  const locale = useLocale();
  const post = getPage(locale, "legal", slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="w-full mt-4 mb-12 md:my-16 px-1 md:px-6">
        <div className="max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl !leading-normal lg:!leading-tight font-extrabold !tracking-tighter text-balance text-[#08272E]">
            {post.metadata.title}
          </h1>
        </div>
      </section>

      <section className="w-full mt-4 mb-12 md:my-16 px-1 md:px-6">
        <article className="bg-card w-full py-6 px-1 flex flex-col items-start gap-4 mt-8 rounded-3xl">
          <div
            className={twMerge(
              "flex flex-col w-full px-4 md:px-8 md:py-4 max-w-4xl mx-auto",
              // h2: text-2xl font-bold mt-4
              "prose prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-4",
              // h3: text-xl font-semibold mt-4
              "prose prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-4",
              // h4: text-lg font-medium mt-4
              "prose prose-h4:text-lg prose-h4:font-medium prose-h4:mt-4",
              // p: text-md md:text-lg leading-relaxed text-balance text-[#5C5B61]
              "prose-p:text-md prose-p:md:text-lg prose-p:leading-relaxed prose-p:text-balance prose-p:text-[#5C5B61]"
            )}
          >
            <MDXRemote source={post.content} components={components} />
          </div>
        </article>
        <div className="flex mt-2 mt-8">
          <p className="text-md md:text-lg text-[#5C5B61] mx-auto">
            Last updated at: {formatDate(post.metadata.updatedAt)}
          </p>
        </div>
      </section>
    </>
  );
}
