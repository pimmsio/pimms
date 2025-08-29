import Header from "@/components/landings/header";
import Footer from "@/components/footer/footer";
import { generateLandingMetadata } from "@/lib/utils";
import SiteCheckerForm from "@/components/SiteCheckerForm";

type MetadataProps = {
  params: Promise<{ locale: "en" | "fr"; slug: string }>;
};

export async function generateMetadata({ params }: MetadataProps) {
  return generateLandingMetadata({ params, lkey: "site-checker", pathname: "/freetools/site-checker" });
}

export default function SiteCheckerPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-background-secondary text-foreground w-11/12 mx-auto">
        <Header />
      </div>

      {/* Main Content */}
      <div className="bg-background-secondary text-foreground">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">PIMMS script checker</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Verify that your website has correctly installed the PIMMS analytics script for complete conversion
              tracking.
            </p>
          </div>

          {/* Form Component */}
          <SiteCheckerForm />

          {/* About Section */}
          <div className="bg-gradient-info border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About This Tool</h3>
            <p className="text-gray-700 leading-relaxed">
              This free tool validates that your website has the PIMMS analytics script properly installed. It checks
              your site&apos;s HTML for the tracking script and verifies the analytics configuration.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer showRef={true} showApps={true} />
    </>
  );
}
