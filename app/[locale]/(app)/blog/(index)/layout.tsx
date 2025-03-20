import { ReactNode } from "react";
import BlogLayoutHero from "@/components/blog/blog-layout-hero";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BlogLayoutHero />
      <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2 mx-auto max-w-5xl">
        {children}
      </div>
    </>
  );
}
