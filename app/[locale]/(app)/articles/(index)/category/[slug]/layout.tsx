import { ReactNode, use } from "react";
import BlogLayoutHero from "@/components/blog/blog-layout-hero";
import { Section } from "@/components/base/section";

type Props = {
  params: Promise<{ slug: string }>;
  children: ReactNode;
};

export default function BlogLayout({ params, children }: Props) {
  const { slug } = use(params);

  return (
    <>
      <BlogLayoutHero slug={slug} />

      {/* Blog grid container */}
      <Section className="py-10 sm:py-14 md:py-16 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">{children}</div>
      </Section>
    </>
  );
}
