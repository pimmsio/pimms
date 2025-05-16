import Header from "@/components/blog/header";
import Footer from "@/components/footer/footer";

const tkey = "blog";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen mx-auto">
        <Header tkey={tkey} />
        {children}
      </div>
      <Footer showRef={false} showApps={false} className="mt-0" />
    </>
  );
}
