import { ReactNode, use } from "react";
import BlogLayoutHero from "@/components/blog/blog-layout-hero";
import { Section } from "@/components/base/section";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
  children: ReactNode;
};

export default function BlogLayout({ params, children }: Props) {
  const { slug, locale } = use(params);

  return (
    <>
      <BlogLayoutHero slug={slug} locale={locale} />

      {/* Blog grid container */}
      <Section className="py-10 sm:py-14 md:py-16 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">{children}</div>
      </Section>
    </>
  );
}
