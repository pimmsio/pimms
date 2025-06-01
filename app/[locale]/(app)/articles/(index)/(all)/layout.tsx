import { ReactNode } from "react";
import BlogLayoutHero from "@/components/blog/blog-layout-hero";
import { Section } from "@/components/base/section";

type Props = {
  children: ReactNode;
};

export default function BlogLayout({ children }: Props) {
  return (
    <>
      <BlogLayoutHero />

      {/* Blog grid container */}
      <Section className="py-10 sm:py-14 md:py-16 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">{children}</div>
      </Section>
    </>
  );
}
