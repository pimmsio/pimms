import { notFound } from "next/navigation";
import { formatDate, getPage, getPages } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { twMerge } from "tailwind-merge";
import { use } from "react";
import { locales } from "@/i18n/config";
import { useLocale } from "next-intl";
import { generatePagesMetadata } from "@/lib/utils";
import { TallyIframe } from "@/components/mdx/TallyIframe";
import { H1 } from "@/components/base/h1";
import { HeroSection } from "@/components/base/hero-section";
import { Section } from "@/components/base/section";
import { Paragraph } from "@/components/base/paragraph";

export async function generateStaticParams() {
  const allParams = [];

  for (const locale of locales) {
    const pages = getPages(locale, ["legal"]);
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
      <HeroSection>
        <H1>{post.metadata.title}</H1>
      </HeroSection>

      <Section id="content">
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
      </Section>
      <Section className="mx-auto w-fit">
        <Paragraph className="text-semibold">
          Last updated at: {formatDate(post.metadata.updatedAt)}
        </Paragraph>
      </Section>
    </>
  );
}
