import { ReactNode } from "react";
import BlogLayoutHero from "@/components/blog/blog-layout-hero";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BlogLayoutHero />
      <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-5xl rounded-2xl overflow-hidden ring-[6px] ring-[#F2F3F5] my-10 bg-[#F2F3F5]">
        {children}
      </div>
    </>
  );
}
