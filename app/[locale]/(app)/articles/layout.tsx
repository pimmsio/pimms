import Header from "@/components/blog/header";
import Footer from "@/components/footer/footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto">
        <Header />
        {children}
      </div>
      <Footer showRef={false} showApps={false} className="mt-0" />
    </>
  );
}
