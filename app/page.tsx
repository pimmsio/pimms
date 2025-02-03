/* eslint-disable @next/next/no-img-element */

import { Toaster } from "@/components/ui/toaster";
import { WaitlistForm } from "../components/waitlist-form";
import { Metadata } from "next";
import CtaButton from "./components/cta/CtaButton";

const title =
  "Pimms - le SaaS de lien direct : transformez chaque clic LinkedIn en vue, like ou abonnement YouTube.";
const description =
  "Remplacez vos liens classiques par nos liens directs : vos lecteurs LinkedIn ouvrent directement l’app YouTube et s’abonnent sans effort.";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title,
    description,
  },
};

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground w-11/12 mx-auto">
        <header className="w-full bg-white relative py-3 my-4 border-4 px-1 md:px-6 flex justify-between items-center">
          <div className="flex items-start flex-col space-y-2 mx-auto md:mx-0">
            <img src="/static/logo.svg" alt="pim.ms" className="h-6" />
            <span className="font-bold text-sm tracking-wide">
              Liens directs pim.ms
            </span>
          </div>
          <CtaButton />
        </header>

        <section className="w-full py-6 md:py-12 text-center px-1 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-extrabold leading-snug tracking-tight text-balance">
              Transformez chaque post{" "}
              <span className="text-primary">Linkedin</span> en machine à
              abonnés sur <span className="text-primary">YouTube</span>
            </h1>
            <p className="text-lg md:text-xl mt-3 max-w-3xl mx-auto leading-relaxed text-balance">
              Les <strong>liens directs</strong> pim.ms génèrent{" "}
              <strong>5× plus d’abonnements</strong> sur votre chaîne YouTube.
            </p>
          </div>
        </section>

        <section id="waitlist" className="w-full py-8 px-1 md:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <WaitlistForm />
          </div>
        </section>

        <section className="w-full py-6 flex justify-center px-1 md:px-6">
          <div className="w-full max-w-4xl">
            <div className="bg-card flex justify-center items-center aspect-[16/9] relative overflow-hidden outline outline-4 outline-[#D4F0FE]">
              <button className="absolute bg-white h-12 w-12 outline outline-4 outline-[#DC2E65] hover:scale-105 transition-transform">
                ▶
              </button>
            </div>
          </div>
        </section>

        <section className="w-full py-6 md:py-12 px-1 flex flex-col md:flex-row items-start mx-auto max-w-7xl gap-12">
          <div className="bg-card flex flex-col w-full p-6 border-4">
            <h2 className="text-2xl md:text-3xl font-bold text-balance">
              Problème
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-balance mt-4">
              Chaque clic depuis vos posts Linkedin ouvre le navigateur par
              défaut et vous coûte un abonné.
            </p>
            <ul className="list-decimal list-inside gap-2 flex flex-col mt-4">
              <li>
                Personne n&apos;est connecté à son compte YouTube dans le
                navigateur mobile (Google Chrome, Safari).
              </li>
              <li>
                Ils doivent gérer les pop-ups et accepter les cookies, ce qui
                casse l&apos;expérience.
              </li>
              <li>
                Ils ne peuvent pas interagir pleinement avec le contenu (liker,
                commenter, s’abonner) sans passer par une série d’étapes
                frustrantes.
              </li>
            </ul>
          </div>

          <div className="bg-card flex flex-col w-full p-6 border-4">
            <h2 className="text-2xl md:text-3xl font-bold text-balance">
              Solution
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-balance mt-4">
              Finis les parcours cassés avec Pimms :{" "}
              <strong>
                en un clic sur le lien direct pim.ms, vos visiteurs ouvrent
                directement l’application YouTube
              </strong>
              .
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-balance mt-4">
              Comme ils sont déjà connectés à leur compte Youtube sur
              l&apos;app, ils s&apos;abonnent et like en un clic.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-balance mt-4">
              Résultat, vous multipliez x5 votre taux de conversion
              LinkedIn‐vers‐YouTube grâce à nos liens directs.
            </p>
          </div>
        </section>

        <section className="w-full py-6 md:py-12 px-1 md:px-6 flex flex-col md:flex-row items-center mx-auto max-w-7xl">
          <div className="w-full md:w-3/5 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-balance">
              Accès en avant première à{" "}
              <span className="text-primary">Pimms</span>.
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-balance">
              Arrêtez de perdre des abonnés YouTube depuis vos posts Linkedin –
              On vous offre 3 liens directs pour démarrer.
            </p>
            <div className="mt-8">
              <CtaButton />
            </div>
          </div>
          <div className="w-full md:w-2/5 mt-6 md:mt-0 flex justify-center aspect-[16/9] bg-white outline outline-4 outline-[#D4F0FE]"></div>
        </section>
      </div>

      <footer className="w-full py-6 bg-[#08272E] text-white text-center text-sm">
        © 2025 pim.ms. All Rights Reserved.
      </footer>

      <Toaster />
    </>
  );
}
