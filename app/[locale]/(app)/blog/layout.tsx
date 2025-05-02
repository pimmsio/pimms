import Header from "@/components/blog/header";
import Footer from "@/components/footer/footer";
import LogosCircle from "@/components/logos-circle";

const tkey = "blog";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen bg-background-secondary text-foreground w-11/12 mx-auto">
        <Header tkey={tkey} />
        {children}
      </div>
      <div className="bg-zinc-100 w-full py-16">
        <LogosCircle />
      </div>
      <Footer showRef={false} showApps={false} className="mt-0" />
    </>
  );
}
