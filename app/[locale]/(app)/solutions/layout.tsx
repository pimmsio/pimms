import Header from "@/components/landings/header";
import Footer from "@/components/footer/footer";

const tkey = "legal";

export default function LegalLayout({
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
      <Footer showRef={false} showApps={false} />
    </>
  );
}
