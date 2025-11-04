import Header from "@/components/landings/header";
import Footer from "@/components/footer/footer";
import { generateLandingMetadata, getCanonicalLink } from "@/lib/utils";
import UTMBuilderForm from "@/components/UTMBuilderForm";
import Link from "next/link";

type MetadataProps = {
  params: Promise<{ locale: "en" | "fr"; slug: string }>;
};

export async function generateMetadata({ params }: MetadataProps) {
  return generateLandingMetadata({ params, lkey: "utm-builder", pathname: "/freetools/utm-builder" });
}

// Enable static generation with revalidation for tools
export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static";

export default async function UTMBuilderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === "en";

  return (
    <>
      {/* Header */}
      <div className="bg-background-secondary text-foreground w-11/12 mx-auto">
        <Header />
      </div>

      {/* Main Content */}
      <div className="bg-background-secondary text-foreground">
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {isEn
                ? "Free UTM Builder for Marketing Campaign Links"
                : "Générateur UTM Gratuit pour Liens de Campagne Marketing"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {isEn
                ? "Create trackable campaign URLs in seconds. This free UTM link builder works with Google Analytics, Mixpanel, Amplitude, and all major analytics platforms. Build clean, consistent UTM parameters for better marketing attribution."
                : "Crée des URLs de campagne traçables en quelques secondes. Ce générateur de liens UTM gratuit fonctionne avec Google Analytics, Mixpanel, Amplitude et toutes les principales plateformes d'analytics. Construis des paramètres UTM propres et cohérents pour une meilleure attribution marketing."}
            </p>
          </div>

          {/* Form Component */}
          <UTMBuilderForm />

          {/* Educational Content */}
          <div className="space-y-16">
            {/* Table of Contents */}
            <div className="bg-gradient-info border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{isEn ? "Contents" : "Sommaire"}</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-primary mr-2">•</span>
                  <span>
                    {isEn
                      ? "How to Create UTM Tracking Links – Real-Life Example"
                      : "Comment Créer des Liens de Tracking UTM – Exemple Concret"}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-2">•</span>
                  <span>
                    {isEn
                      ? "What Are UTM Parameters & Why Use Them Consistently"
                      : "Que Sont les Paramètres UTM & Pourquoi les Utiliser de Manière Cohérente"}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-2">•</span>
                  <span>
                    {isEn
                      ? "Complete Guide to UTM Parameters (Source, Medium, Campaign, Term, Content)"
                      : "Guide Complet des Paramètres UTM (Source, Support, Campagne, Terme, Contenu)"}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-2">•</span>
                  <span>
                    {isEn ? "UTM Formatting Best Practices" : "Meilleures Pratiques de Formatage UTM"}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-2">•</span>
                  <span>
                    {isEn
                      ? "UTMs with Analytics Tools (Mixpanel, Amplitude, Kissmetrics)"
                      : "UTMs avec les Outils d'Analytics (Mixpanel, Amplitude, Kissmetrics)"}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-2">•</span>
                  <span>
                    {isEn
                      ? "Advanced UTM Features: Templates, Team Collaboration & More"
                      : "Fonctionnalités UTM Avancées: Modèles, Collaboration d'Équipe & Plus"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 1: How to Create Tracking URLs */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {isEn
                  ? "How to Create UTM Tracking Links – Real-Life Example"
                  : "Comment Créer des Liens de Tracking UTM – Exemple Concret"}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  {isEn
                    ? "Follow the placeholder text in each field above, and create UTM tags like in the example below. Building UTM links is simple once you understand the basics."
                    : "Suis le texte d'exemple dans chaque champ ci-dessus et crée des tags UTM comme dans l'exemple ci-dessous. Construire des liens UTM est simple une fois que tu comprends les bases."}
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {isEn ? "📝 Quick Example:" : "📝 Exemple Rapide:"}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>{isEn ? "Scenario:" : "Scénario:"}</strong>{" "}
                      {isEn
                        ? "You're running a Facebook ad campaign for a product launch"
                        : "Tu lances une campagne publicitaire Facebook pour un lancement de produit"}
                    </p>
                    <div className="bg-white rounded-lg p-4 font-mono text-xs break-all">
                      <p className="mb-2">
                        <strong>{isEn ? "Original URL:" : "URL Originale:"}</strong> https://example.com/product
                      </p>
                      <p>
                        <strong>{isEn ? "With UTM:" : "Avec UTM:"}</strong>{" "}
                        https://example.com/product?utm_source=facebook&utm_medium=cpc&utm_campaign=product-launch&utm_content=ad-version-a
                      </p>
                    </div>
                  </div>
                </div>
                <p>
                  {isEn
                    ? "If you build UTMs regularly, speed up your workflow with Pimms. Create branded short links, save templates, and track conversions—not just clicks."
                    : "Si tu construis régulièrement des UTMs, accélère ton workflow avec Pimms. Crée des liens courts brandés, sauvegarde des modèles et suit les conversions—pas seulement les clics."}
                </p>
              </div>
            </section>

            {/* Section 2: What Are UTMs */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {isEn
                  ? "What Are UTM Parameters & Why Use Them Consistently"
                  : "Que Sont les Paramètres UTM & Pourquoi les Utiliser de Manière Cohérente"}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  {isEn
                    ? "UTM parameters (Urchin Tracking Module parameters) are tags you add to the end of a URL to track the source, medium, and campaign name of your traffic. They answer critical questions like:"
                    : "Les paramètres UTM (Urchin Tracking Module) sont des tags que tu ajoutes à la fin d'une URL pour suivre la source, le support et le nom de campagne de ton trafic. Ils répondent à des questions critiques comme:"}
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 my-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-3 mt-1">✓</span>
                      <span>
                        {isEn
                          ? "Which email link in your newsletter drives the most clicks?"
                          : "Quel lien email dans ta newsletter génère le plus de clics?"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-3 mt-1">✓</span>
                      <span>
                        {isEn
                          ? "Which social media platform converts better—LinkedIn or Twitter?"
                          : "Quelle plateforme de réseaux sociaux convertit mieux—LinkedIn ou Twitter?"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-3 mt-1">✓</span>
                      <span>
                        {isEn
                          ? "Which ad creative generates more sales, not just clicks?"
                          : "Quelle création publicitaire génère plus de ventes, pas seulement des clics?"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-3 mt-1">✓</span>
                      <span>
                        {isEn
                          ? "Is your influencer partnership actually driving revenue?"
                          : "Ton partenariat d'influence génère-t-il vraiment des revenus?"}
                      </span>
                    </li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8">
                  {isEn ? "Anatomy of a UTM URL" : "Anatomie d'une URL UTM"}
                </h3>
                <p>
                  {isEn
                    ? "Here's how a typical UTM link is structured:"
                    : "Voici comment un lien UTM typique est structuré:"}
                </p>

                {/* Visual Example */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 my-6">
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 font-mono text-sm break-all mb-4">
                    <span className="text-blue-600">https://example.com/product</span>
                    <span className="text-red-600 font-bold">?</span>
                    <span className="text-green-600">utm_source=facebook</span>
                    <span className="text-red-600 font-bold">&amp;</span>
                    <span className="text-purple-600">utm_medium=social</span>
                    <span className="text-red-600 font-bold">&amp;</span>
                    <span className="text-orange-600">utm_campaign=product-launch</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-blue-600 font-bold">●</span>{" "}
                      {isEn ? "Base URL (your website)" : "URL de base (ton site web)"}
                    </p>
                    <p>
                      <span className="text-red-600 font-bold">●</span>{" "}
                      {isEn
                        ? "? = Start of tracking parameters (& = separator between parameters)"
                        : "? = Début des paramètres de tracking (& = séparateur entre paramètres)"}
                    </p>
                    <p>
                      <span className="text-green-600 font-bold">●</span> utm_source ={" "}
                      {isEn ? "Where traffic comes from" : "D'où vient le trafic"}
                    </p>
                    <p>
                      <span className="text-purple-600 font-bold">●</span> utm_medium ={" "}
                      {isEn ? "Marketing channel type" : "Type de canal marketing"}
                    </p>
                    <p>
                      <span className="text-orange-600 font-bold">●</span> utm_campaign ={" "}
                      {isEn ? "Campaign identifier" : "Identifiant de campagne"}
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8">
                  {isEn ? "The 5 UTM Parameters" : "Les 5 Paramètres UTM"}
                </h3>
                <p>
                  {isEn
                    ? "Google Analytics recognizes 5 UTM parameters. Three are required, two are optional:"
                    : "Google Analytics reconnaît 5 paramètres UTM. Trois sont obligatoires, deux sont optionnels:"}
                </p>

                {/* UTM Parameters Table */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 my-6 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b-2 border-gray-300">
                      <tr>
                        <th className="pb-3 pr-4 font-bold text-gray-900">
                          {isEn ? "Parameter" : "Paramètre"}
                        </th>
                        <th className="pb-3 pr-4 font-bold text-gray-900">{isEn ? "Required?" : "Requis?"}</th>
                        <th className="pb-3 font-bold text-gray-900">{isEn ? "What It Tracks" : "Ce Qu'il Suit"}</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-200">
                        <td className="py-3 pr-4">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">utm_source</code>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-red-600 font-bold">{isEn ? "Required" : "Requis"}</span>
                        </td>
                        <td className="py-3">
                          {isEn
                            ? "Traffic source (google, facebook, newsletter)"
                            : "Source du trafic (google, facebook, newsletter)"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 pr-4">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">utm_medium</code>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-red-600 font-bold">{isEn ? "Required" : "Requis"}</span>
                        </td>
                        <td className="py-3">
                          {isEn ? "Marketing channel (email, social, cpc)" : "Canal marketing (email, social, cpc)"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 pr-4">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">utm_campaign</code>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-red-600 font-bold">{isEn ? "Required" : "Requis"}</span>
                        </td>
                        <td className="py-3">
                          {isEn ? "Campaign name (product-launch, summer-sale)" : "Nom de campagne (lancement-produit, soldes-ete)"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 pr-4">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">utm_term</code>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-gray-500">{isEn ? "Optional" : "Optionnel"}</span>
                        </td>
                        <td className="py-3">
                          {isEn
                            ? "Paid keywords or headline testing"
                            : "Mots-clés payants ou test de titres"}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">utm_content</code>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-gray-500">{isEn ? "Optional" : "Optionnel"}</span>
                        </td>
                        <td className="py-3">
                          {isEn
                            ? "A/B testing and ad differentiation"
                            : "Tests A/B et différenciation des annonces"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8">
                  {isEn ? "Why Consistency is Critical" : "Pourquoi la Cohérence est Critique"}
                </h3>
                <p>
                  {isEn
                    ? "Building the URL is easy. The hard part? Staying consistent. Here's what happens when you're not:"
                    : "Construire l'URL est facile. La partie difficile? Rester cohérent. Voici ce qui se passe quand tu ne l'es pas:"}
                </p>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-6">
                  <h4 className="text-lg font-bold text-red-900 mb-4">
                    {isEn ? "⚠️ Common Mistakes & Their Consequences:" : "⚠️ Erreurs Courantes & Leurs Conséquences:"}
                  </h4>
                  <ul className="space-y-3 text-sm text-red-900">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">❌</span>
                      <span>
                        <strong>
                          {isEn
                            ? "Using 'Facebook', 'facebook', and 'fb' interchangeably"
                            : "Utiliser 'Facebook', 'facebook' et 'fb' de manière interchangeable"}
                        </strong>
                        <br />
                        {isEn
                          ? "Analytics treats these as 3 separate sources. Your Facebook data is split across multiple reports."
                          : "Les analytics traitent cela comme 3 sources séparées. Tes données Facebook sont divisées dans plusieurs rapports."}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">❌</span>
                      <span>
                        <strong>
                          {isEn ? "Forgetting UTMs on some links" : "Oublier les UTMs sur certains liens"}
                        </strong>
                        <br />
                        {isEn
                          ? "Traffic shows up as 'Direct' instead of your actual campaign. You can't optimize what you can't measure."
                          : "Le trafic apparaît comme 'Direct' au lieu de ta vraie campagne. Tu ne peux pas optimiser ce que tu ne peux pas mesurer."}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">❌</span>
                      <span>
                        <strong>
                          {isEn
                            ? "Using spaces instead of hyphens"
                            : "Utiliser des espaces au lieu de traits d'union"}
                        </strong>
                        <br />
                        {isEn
                          ? "URLs break or show ugly %20 codes. Analytics data becomes unreadable: 'summer%20sale' vs 'summer-sale'."
                          : "Les URLs cassent ou montrent des codes %20 laids. Les données analytics deviennent illisibles: 'soldes%20ete' vs 'soldes-ete'."}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-xl p-6 my-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    💡 {isEn ? "Solution: Establish Team Rules" : "Solution: Établir des Règles d'Équipe"}
                  </h4>
                  <p className="text-gray-700 mb-4">
                    {isEn
                      ? "Before launching campaigns, document your UTM naming convention. Define exactly how your team should tag:"
                      : "Avant de lancer des campagnes, documente ta convention de nommage UTM. Définis exactement comment ton équipe doit taguer:"}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 mb-4">
                    <li>• {isEn ? "Social media platforms (linkedin? LinkedIn? li?)" : "Plateformes sociales (linkedin? LinkedIn? li?)"}</li>
                    <li>• {isEn ? "Email campaigns (newsletter? email? emailing?)" : "Campagnes email (newsletter? email? emailing?)"}</li>
                    <li>• {isEn ? "Paid advertising (ppc? cpc? paid?)" : "Publicité payante (ppc? cpc? paid?)"}</li>
                    <li>• {isEn ? "A/B test variations (v1? version-a? test-1?)" : "Variations de tests A/B (v1? version-a? test-1?)"}</li>
                  </ul>
                  <p className="text-gray-700 text-sm">
                    {isEn
                      ? "When your team grows or campaigns get complex, Pimms enforces these rules automatically with templates, pre-defined values, and validation."
                      : "Quand ton équipe grandit ou que les campagnes deviennent complexes, Pimms applique ces règles automatiquement avec des modèles, des valeurs prédéfinies et de la validation."}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Complete Parameter Guide */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {isEn
                  ? "Complete Guide to Each UTM Parameter"
                  : "Guide Complet de Chaque Paramètre UTM"}
              </h2>

              {/* Campaign Source */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-base">utm_source</code> —{" "}
                  {isEn ? "Campaign Source" : "Source de Campagne"}
                </h3>
                <p className="text-gray-700 mb-4">
                  {isEn
                    ? "Identifies where your traffic originates. This is the specific platform, website, publication, or referrer."
                    : "Identifie d'où provient ton trafic. C'est la plateforme spécifique, le site web, la publication ou le référent."}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">{isEn ? "✓ Good Examples:" : "✓ Bons Exemples:"}</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_source=google</code> —{" "}
                      {isEn ? "Google search or display" : "Recherche ou display Google"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_source=facebook</code> —{" "}
                      {isEn ? "Facebook ads or organic" : "Publicités ou organique Facebook"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_source=newsletter-weekly</code> —{" "}
                      {isEn ? "Your weekly email newsletter" : "Ta newsletter email hebdomadaire"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_source=partner-blog</code> —{" "}
                      {isEn ? "Guest post on partner site" : "Article invité sur site partenaire"}
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>{isEn ? "Pro tip:" : "Conseil pro:"}</strong>{" "}
                  {isEn
                    ? "Be specific but not overly granular. Use 'linkedin' for all LinkedIn traffic, not 'linkedin-post-1', 'linkedin-post-2', etc."
                    : "Sois spécifique mais pas trop granulaire. Utilise 'linkedin' pour tout le trafic LinkedIn, pas 'linkedin-post-1', 'linkedin-post-2', etc."}
                </p>
              </div>

              {/* Campaign Medium */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <code className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-base">utm_medium</code> —{" "}
                  {isEn ? "Campaign Medium" : "Support de Campagne"}
                </h3>
                <p className="text-gray-700 mb-4">
                  {isEn
                    ? "The marketing channel or method. Think of this as the 'category' of traffic. Google Analytics groups data by medium."
                    : "Le canal ou la méthode marketing. Pense à cela comme la 'catégorie' du trafic. Google Analytics groupe les données par support."}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">{isEn ? "✓ Standard Values:" : "✓ Valeurs Standards:"}</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_medium=cpc</code> —{" "}
                      {isEn ? "Cost-per-click (paid search)" : "Coût par clic (recherche payante)"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_medium=email</code> —{" "}
                      {isEn ? "Email campaigns" : "Campagnes email"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_medium=social</code> —{" "}
                      {isEn ? "Organic social posts" : "Publications organiques sur réseaux sociaux"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_medium=social-paid</code> —{" "}
                      {isEn ? "Paid social advertising" : "Publicité payante sur réseaux sociaux"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_medium=display</code> —{" "}
                      {isEn ? "Banner ads" : "Bannières publicitaires"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_medium=referral</code> —{" "}
                      {isEn ? "Referral links" : "Liens de référencement"}
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>{isEn ? "Pro tip:" : "Conseil pro:"}</strong>{" "}
                  {isEn
                    ? "Stick to Google Analytics default channel groupings when possible. This makes your data work seamlessly with built-in reports."
                    : "Reste sur les groupements de canaux par défaut de Google Analytics quand c'est possible. Cela fait fonctionner tes données de manière transparente avec les rapports intégrés."}
                </p>
              </div>

              {/* Campaign Name */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-base">utm_campaign</code> —{" "}
                  {isEn ? "Campaign Name" : "Nom de Campagne"}
                </h3>
                <p className="text-gray-700 mb-4">
                  {isEn
                    ? "The specific campaign identifier. This should be consistent across all channels for a single marketing initiative."
                    : "L'identifiant de campagne spécifique. Cela devrait être cohérent sur tous les canaux pour une seule initiative marketing."}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">{isEn ? "✓ Good Examples:" : "✓ Bons Exemples:"}</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_campaign=product-launch-2025</code>
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_campaign=black-friday-sale</code>
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_campaign=webinar-conversion-tracking</code>
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_campaign=q4-lead-gen</code>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>{isEn ? "Pro tip:" : "Conseil pro:"}</strong>{" "}
                  {isEn
                    ? "Use the same campaign name across Facebook, Google, email, etc. This lets you compare channel performance for the same initiative."
                    : "Utilise le même nom de campagne sur Facebook, Google, email, etc. Cela te permet de comparer la performance des canaux pour la même initiative."}
                </p>
              </div>

              {/* Campaign Term */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-base">utm_term</code> —{" "}
                  {isEn ? "Campaign Term" : "Terme de Campagne"} <span className="text-sm text-gray-500">({isEn ? "optional" : "optionnel"})</span>
                </h3>
                <p className="text-gray-700 mb-4">
                  {isEn
                    ? "Originally for paid search keywords, but creative marketers use it for much more."
                    : "Initialement pour les mots-clés de recherche payante, mais les marketeurs créatifs l'utilisent pour bien plus."}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">{isEn ? "✓ Creative Uses:" : "✓ Utilisations Créatives:"}</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_term=saas-marketing</code> —{" "}
                      {isEn ? "PPC keyword" : "Mot-clé PPC"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_term=headline-test-a</code> —{" "}
                      {isEn ? "Email subject line variation" : "Variation de ligne d'objet email"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_term=influencer-name</code> —{" "}
                      {isEn ? "Which influencer shared" : "Quel influenceur a partagé"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_term=audience-founders</code> —{" "}
                      {isEn ? "Target audience segment" : "Segment d'audience cible"}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Campaign Content */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <code className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-base">utm_content</code> —{" "}
                  {isEn ? "Campaign Content" : "Contenu de Campagne"} <span className="text-sm text-gray-500">({isEn ? "optional" : "optionnel"})</span>
                </h3>
                <p className="text-gray-700 mb-4">
                  {isEn
                    ? "Perfect for A/B testing and distinguishing similar ads or links in the same campaign."
                    : "Parfait pour les tests A/B et distinguer des annonces ou liens similaires dans la même campagne."}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">{isEn ? "✓ Common Use Cases:" : "✓ Cas d'Usage Courants:"}</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_content=banner-blue</code> vs{" "}
                      <code className="bg-white px-2 py-0.5 rounded">banner-red</code> — {isEn ? "Ad creative test" : "Test de créatif publicitaire"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_content=header-cta</code> vs{" "}
                      <code className="bg-white px-2 py-0.5 rounded">footer-cta</code> — {isEn ? "Link placement" : "Placement du lien"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_content=image-product</code> vs{" "}
                      <code className="bg-white px-2 py-0.5 rounded">text-link</code> — {isEn ? "Link format" : "Format du lien"}
                    </li>
                    <li>
                      • <code className="bg-white px-2 py-0.5 rounded">utm_content=v1</code>,{" "}
                      <code className="bg-white px-2 py-0.5 rounded">v2</code>,{" "}
                      <code className="bg-white px-2 py-0.5 rounded">v3</code> — {isEn ? "Version testing" : "Test de versions"}
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>{isEn ? "Pro tip:" : "Conseil pro:"}</strong>{" "}
                  {isEn
                    ? "utm_content is your friend for conversion rate optimization. Test everything: button colors, headlines, images, CTA placement."
                    : "utm_content est ton ami pour l'optimisation du taux de conversion. Teste tout: couleurs de boutons, titres, images, placement des CTA."}
                </p>
              </div>
            </section>

            {/* Section 4: Formatting Best Practices */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {isEn ? "UTM Formatting Best Practices" : "Meilleures Pratiques de Formatage UTM"}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  {isEn
                    ? "Proper formatting isn't just about aesthetics—it directly impacts data quality and analytics accuracy."
                    : "Un formatage approprié n'est pas seulement une question d'esthétique—il impacte directement la qualité des données et la précision des analytics."}
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 my-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {isEn ? "Golden Rules of UTM Formatting" : "Règles d'Or du Formatage UTM"}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="text-2xl mr-4">1️⃣</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          {isEn ? "Always Use Lowercase" : "Toujours Utiliser des Minuscules"}
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {isEn
                            ? "Analytics tools are case-sensitive. 'Facebook', 'facebook', and 'FACEBOOK' appear as three different sources."
                            : "Les outils d'analytics sont sensibles à la casse. 'Facebook', 'facebook' et 'FACEBOOK' apparaissent comme trois sources différentes."}
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                          <p className="text-xs text-red-900">
                            ❌ <code>utm_source=Facebook</code>
                          </p>
                          <p className="text-xs text-red-900">
                            ❌ <code>utm_source=FACEBOOK</code>
                          </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <p className="text-xs text-green-900">
                            ✅ <code>utm_source=facebook</code>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-2xl mr-4">2️⃣</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          {isEn ? "Use Hyphens, Not Spaces" : "Utiliser des Traits d'Union, Pas d'Espaces"}
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {isEn
                            ? "Spaces in URLs are converted to %20, making your data ugly and hard to read."
                            : "Les espaces dans les URLs sont convertis en %20, rendant tes données laides et difficiles à lire."}
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                          <p className="text-xs text-red-900">
                            ❌ <code>utm_campaign=product launch</code> → becomes <code>product%20launch</code>
                          </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <p className="text-xs text-green-900">
                            ✅ <code>utm_campaign=product-launch</code>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-2xl mr-4">3️⃣</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          {isEn ? "Avoid Special Characters" : "Éviter les Caractères Spéciaux"}
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {isEn
                            ? "Stick to letters, numbers, hyphens, and underscores. Special characters can break links or tracking."
                            : "Reste sur les lettres, chiffres, traits d'union et underscores. Les caractères spéciaux peuvent casser les liens ou le tracking."}
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                          <p className="text-xs text-red-900">
                            ❌ <code>utm_campaign=summer_sale_25%_off</code>
                          </p>
                          <p className="text-xs text-red-900">
                            ❌ <code>utm_campaign=promo#2024</code>
                          </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <p className="text-xs text-green-900">
                            ✅ <code>utm_campaign=summer-sale-25-off</code>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-2xl mr-4">4️⃣</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          {isEn ? "Keep It Short But Descriptive" : "Garder Court Mais Descriptif"}
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {isEn
                            ? "UTM URLs can get long. Balance readability with brevity."
                            : "Les URLs UTM peuvent devenir longues. Équilibre lisibilité et brièveté."}
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                          <p className="text-xs text-red-900">
                            ❌ <code>utm_campaign=our-amazing-black-friday-2025-mega-sale-event</code>
                          </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <p className="text-xs text-green-900">
                            ✅ <code>utm_campaign=black-friday-2025</code>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-2xl mr-4">5️⃣</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          {isEn ? "Never Leave Required Parameters Empty" : "Ne Jamais Laisser les Paramètres Requis Vides"}
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {isEn
                            ? "utm_source, utm_medium, and utm_campaign are mandatory. Without them, tracking breaks."
                            : "utm_source, utm_medium et utm_campaign sont obligatoires. Sans eux, le tracking casse."}
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                          <p className="text-xs text-red-900">
                            ❌ <code>?utm_source=facebook&utm_medium=</code>
                          </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <p className="text-xs text-green-900">
                            ✅ <code>?utm_source=facebook&utm_medium=social&utm_campaign=product-launch</code>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">
                    {isEn ? "✨ Automatic Formatting with Pimms" : "✨ Formatage Automatique avec Pimms"}
                  </h4>
                  <p className="text-sm text-blue-900">
                    {isEn
                      ? "This free UTM builder automatically converts to lowercase and replaces spaces with hyphens. For advanced teams, Pimms enforces custom formatting rules, validates parameters, and ensures consistency across thousands of links."
                      : "Ce générateur UTM gratuit convertit automatiquement en minuscules et remplace les espaces par des traits d'union. Pour les équipes avancées, Pimms applique des règles de formatage personnalisées, valide les paramètres et assure la cohérence sur des milliers de liens."}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Analytics Platform Integration */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {isEn
                  ? "UTM Parameters + Analytics Platforms"
                  : "Paramètres UTM + Plateformes d'Analytics"}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  {isEn
                    ? "The beauty of UTM parameters? They work with virtually every analytics platform out of the box. Here's how they integrate with popular tools:"
                    : "La beauté des paramètres UTM? Ils fonctionnent avec pratiquement toutes les plateformes d'analytics directement. Voici comment ils s'intègrent avec les outils populaires:"}
                </p>

                {/* Google Analytics */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 my-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Google Analytics (GA4 & Universal)</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    {isEn
                      ? "UTM parameters were literally built for Google Analytics. They appear automatically in your campaign reports under Acquisition > Traffic Acquisition."
                      : "Les paramètres UTM ont été littéralement construits pour Google Analytics. Ils apparaissent automatiquement dans tes rapports de campagne sous Acquisition > Acquisition de Trafic."}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "No setup required—UTMs work immediately"
                          : "Aucune configuration requise—les UTMs fonctionnent immédiatement"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "View data by source, medium, campaign, term, and content"
                          : "Voir les données par source, support, campagne, terme et contenu"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "Create custom reports and dashboards around UTM data"
                          : "Créer des rapports personnalisés et tableaux de bord autour des données UTM"}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Mixpanel */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 my-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📈</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Mixpanel</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    {isEn
                      ? "Mixpanel's JavaScript library automatically captures UTM parameters when users land on your site. They're stored as user properties for deep behavioral analysis."
                      : "La bibliothèque JavaScript de Mixpanel capture automatiquement les paramètres UTM quand les utilisateurs arrivent sur ton site. Ils sont stockés comme propriétés utilisateur pour une analyse comportementale approfondie."}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "UTMs tracked automatically with first-touch attribution by default"
                          : "UTMs suivis automatiquement avec attribution au premier contact par défaut"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "Combine UTM data with product events to see complete user journeys"
                          : "Combine les données UTM avec les événements produit pour voir les parcours utilisateur complets"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "Create funnels and cohorts based on campaign source"
                          : "Crée des funnels et cohortes basés sur la source de campagne"}
                      </span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-3">
                    {isEn
                      ? "Note: You can switch to last-touch or multi-touch attribution models if preferred."
                      : "Note: Tu peux basculer vers des modèles d'attribution au dernier contact ou multi-touch si préféré."}
                  </p>
                </div>

                {/* Amplitude */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 my-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📱</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Amplitude</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    {isEn
                      ? "Amplitude excels at product analytics. With UTM parameters, you can connect marketing campaigns to in-app behavior and feature adoption."
                      : "Amplitude excelle dans les analytics produit. Avec les paramètres UTM, tu peux connecter les campagnes marketing au comportement dans l'app et à l'adoption des fonctionnalités."}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "See which campaigns drive the most engaged users"
                          : "Vois quelles campagnes génèrent les utilisateurs les plus engagés"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "Track feature adoption by acquisition source"
                          : "Suis l'adoption des fonctionnalités par source d'acquisition"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "Build retention analysis by marketing channel"
                          : "Construis une analyse de rétention par canal marketing"}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Kissmetrics */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 my-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">💋</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Kissmetrics</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    {isEn
                      ? "Kissmetrics JavaScript automatically scans and records UTM parameters for every visitor, making attribution tracking effortless."
                      : "Le JavaScript de Kissmetrics scanne et enregistre automatiquement les paramètres UTM pour chaque visiteur, rendant le tracking d'attribution sans effort."}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "Zero configuration—UTMs captured on first page load"
                          : "Zéro configuration—UTMs capturés au premier chargement de page"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "Connect campaign data to customer lifetime value"
                          : "Connecte les données de campagne à la valeur vie client"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2 mt-0.5">✓</span>
                      <span>
                        {isEn
                          ? "Powerful cohort analysis by acquisition campaign"
                          : "Analyse de cohorte puissante par campagne d'acquisition"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-brand-primary/5 to-purple-500/5 border border-brand-primary/20 rounded-xl p-6 my-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    {isEn ? "🚀 Beyond Clicks: Track Revenue with Pimms" : "🚀 Au-Delà des Clics: Suis les Revenus avec Pimms"}
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    {isEn
                      ? "While these analytics platforms show you clicks and sessions, Pimms connects UTM links directly to conversions and revenue."
                      : "Alors que ces plateformes d'analytics te montrent des clics et sessions, Pimms connecte les liens UTM directement aux conversions et revenus."}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-2 mt-0.5">→</span>
                      <span>
                        {isEn
                          ? "Track Stripe payments, form submissions, and calendar bookings"
                          : "Suis les paiements Stripe, soumissions de formulaires et réservations de calendrier"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-2 mt-0.5">→</span>
                      <span>
                        {isEn
                          ? "See which UTM campaign drove each sale, not just the last click"
                          : "Vois quelle campagne UTM a généré chaque vente, pas seulement le dernier clic"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-2 mt-0.5">→</span>
                      <span>
                        {isEn
                          ? "Calculate true ROI by comparing ad spend to attributed revenue"
                          : "Calcule le vrai ROI en comparant les dépenses publicitaires aux revenus attribués"}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Link
                      href={getCanonicalLink(locale, "/landings/tracking")}
                      className="inline-flex items-center text-brand-primary hover:text-brand-primary/80 font-semibold text-sm"
                    >
                      {isEn ? "Learn about conversion tracking →" : "Découvre le tracking de conversion →"}
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Advanced Features with Pimms */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {isEn
                  ? "Advanced UTM Features with Pimms"
                  : "Fonctionnalités UTM Avancées avec Pimms"}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  {isEn
                    ? "This free UTM builder is perfect for getting started. But as your marketing scales, you'll need more powerful tools to maintain consistency and track true ROI."
                    : "Ce générateur UTM gratuit est parfait pour commencer. Mais à mesure que ton marketing se développe, tu auras besoin d'outils plus puissants pour maintenir la cohérence et suivre le vrai ROI."}
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  {/* Feature 1 */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
                    <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">👥</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {isEn ? "Team Templates & Workspaces" : "Modèles d'Équipe & Espaces de Travail"}
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      {isEn
                        ? "Create reusable UTM templates for common campaigns. Set workspace rules that automatically enforce naming conventions across your entire team."
                        : "Crée des modèles UTM réutilisables pour les campagnes courantes. Définis des règles d'espace de travail qui appliquent automatiquement les conventions de nommage à toute ton équipe."}
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>• {isEn ? "Pre-filled parameter dropdowns" : "Listes déroulantes de paramètres préremplies"}</li>
                      <li>• {isEn ? "Role-based permissions" : "Permissions basées sur les rôles"}</li>
                      <li>• {isEn ? "Bulk link creation from CSV" : "Création de liens en masse depuis CSV"}</li>
                    </ul>
                  </div>

                  {/* Feature 2 */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {isEn ? "Branded Short Links + QR Codes" : "Liens Courts Brandés + QR Codes"}
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      {isEn
                        ? "Turn long UTM URLs into clean branded links. Automatically generate QR codes for every link. Track click patterns in real-time."
                        : "Transforme les longues URLs UTM en liens courts brandés. Génère automatiquement des QR codes pour chaque lien. Suis les patterns de clics en temps réel."}
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>• {isEn ? "Custom domain (go.yourbrand.com)" : "Domaine personnalisé (go.tamarque.com)"}</li>
                      <li>• {isEn ? "Link expiration & scheduling" : "Expiration et planification des liens"}</li>
                      <li>• {isEn ? "A/B test different destinations" : "Test A/B de différentes destinations"}</li>
                    </ul>
                  </div>

                  {/* Feature 3 */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {isEn ? "Revenue Attribution" : "Attribution des Revenus"}
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      {isEn
                        ? "Connect Stripe, Shopify, or any payment platform. See exactly which UTM campaigns drive sales, not just traffic."
                        : "Connecte Stripe, Shopify ou toute plateforme de paiement. Vois exactement quelles campagnes UTM génèrent des ventes, pas seulement du trafic."}
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>• {isEn ? "Revenue by source, medium, campaign" : "Revenus par source, support, campagne"}</li>
                      <li>• {isEn ? "ROI calculations with ad spend" : "Calculs de ROI avec dépenses pub"}</li>
                      <li>• {isEn ? "Customer lifetime value by channel" : "Valeur vie client par canal"}</li>
                    </ul>
                  </div>

                  {/* Feature 4 */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">⚙️</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {isEn ? "Custom Parameters" : "Paramètres Personnalisés"}
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      {isEn
                        ? "Beyond the standard 5 UTM parameters, add unlimited custom fields for tracking specific to your business."
                        : "Au-delà des 5 paramètres UTM standards, ajoute des champs personnalisés illimités pour un tracking spécifique à ton business."}
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>• {isEn ? "ref= for referral partners" : "ref= pour partenaires de référencement"}</li>
                      <li>• {isEn ? "affiliate= for affiliate tracking" : "affiliate= pour tracking d'affiliation"}</li>
                      <li>• {isEn ? "agency= for agency clients" : "agency= pour clients d'agence"}</li>
                      <li>• {isEn ? "product= for ecommerce SKUs" : "product= pour SKUs ecommerce"}</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-brand-primary to-purple-600 text-white rounded-2xl p-8 my-8">
                  <div className="max-w-3xl mx-auto text-center space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold">
                      {isEn
                        ? "Ready to Scale Your UTM Tracking?"
                        : "Prêt à Faire Évoluer Ton Tracking UTM?"}
                    </h3>
                    <p className="text-lg text-white/90">
                      {isEn
                        ? "Join 10,000+ marketers using Pimms to build consistent campaigns and track real ROI."
                        : "Rejoins 10,000+ marketeurs utilisant Pimms pour construire des campagnes cohérentes et suivre le vrai ROI."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                      <Link
                        href={getCanonicalLink(locale, "/landings/tracking")}
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-primary font-bold rounded-full hover:bg-gray-100 transition-colors"
                      >
                        {isEn ? "Start Free Trial" : "Commencer l'Essai Gratuit"}
                      </Link>
                      <Link
                        href={getCanonicalLink(locale, "/landings/utm-builder-campaign-tracking")}
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
                      >
                        {isEn ? "See All Features" : "Voir Toutes les Fonctionnalités"}
                      </Link>
                    </div>
                    <p className="text-sm text-white/70">
                      {isEn
                        ? "✓ No credit card required  ✓ Set up in 5 minutes  ✓ Cancel anytime"
                        : "✓ Aucune carte bancaire requise  ✓ Installation en 5 minutes  ✓ Annulation à tout moment"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <div className="bg-gradient-info border border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isEn ? "About This Free UTM Builder" : "À Propos de Ce Générateur UTM Gratuit"}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEn
                  ? "This free UTM link builder helps you create properly formatted tracking URLs for any marketing campaign. It automatically formats parameters following best practices (lowercase, hyphens, URL-safe). The generated URLs work with Google Analytics, Mixpanel, Amplitude, Kissmetrics, Heap, Adobe Analytics, and any platform that supports standard UTM parameters."
                  : "Ce générateur de liens UTM gratuit t'aide à créer des URLs de tracking correctement formatées pour toute campagne marketing. Il formate automatiquement les paramètres en suivant les meilleures pratiques (minuscules, traits d'union, compatibles URL). Les URLs générées fonctionnent avec Google Analytics, Mixpanel, Amplitude, Kissmetrics, Heap, Adobe Analytics et toute plateforme qui supporte les paramètres UTM standards."}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {isEn
                  ? "For advanced features like branded short links, team collaboration, revenue tracking, and conversion attribution, explore Pimms—the complete marketing analytics platform built for modern teams."
                  : "Pour des fonctionnalités avancées comme les liens courts brandés, la collaboration d'équipe, le tracking des revenus et l'attribution des conversions, explore Pimms—la plateforme d'analytics marketing complète construite pour les équipes modernes."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer showRef={true} showApps={true} />
    </>
  );
}
