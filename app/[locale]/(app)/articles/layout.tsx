import Header from "@/components/blog/header";
import Footer from "@/components/footer/footer";

export default async function BlogLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <div className="mx-auto">
        <Header locale={locale} />
        {children}
      </div>
      <Footer showRef={false} showApps={false} className="mt-0" />
    </>
  );
}
