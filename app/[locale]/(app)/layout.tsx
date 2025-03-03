import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
      <Toaster />
    </>
  );
}
