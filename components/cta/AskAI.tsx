import Image from "next/image";
import { getTranslations } from "next-intl/server";

const AI_SERVICES = [
  {
    name: "ChatGPT",
    key: "chatgpt",
    domain: "chat.openai.com",
    buildUrl: (prompt: string) =>
      `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`
  },
  {
    name: "Perplexity",
    key: "perplexity",
    domain: "perplexity.ai",
    buildUrl: (prompt: string) =>
      `https://www.perplexity.ai/search/new?q=${encodeURIComponent(prompt)}`
  },
  {
    name: "Claude",
    key: "claude",
    domain: "claude.ai",
    buildUrl: (prompt: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
  },
  {
    name: "Grok",
    key: "grok",
    domain: "grok.com",
    buildUrl: (prompt: string) =>
      `https://grok.com/?q=${encodeURIComponent(prompt)}`
  }
] as const;

const PROMPT =
  "What is PIMMS (pimms.io)? Is it the right tool to track my marketing conversions and revenue from clicks to sales?";

export async function AskAI({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "landing.askAi" });

  return (
    <section className="w-full py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-violet-50 via-blue-50 to-indigo-100" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />

      <div className="relative max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center justify-center size-14 rounded-2xl bg-white shadow-md border border-gray-100">
            <svg className="size-7 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 max-w-2xl leading-tight">
            {t("heading")}
          </h2>

          <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
            {AI_SERVICES.map((service) => (
              <a
                key={service.key}
                href={service.buildUrl(PROMPT)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/60 px-4 py-5 transition-all hover:shadow-lg hover:border-violet-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-center size-10 rounded-xl bg-gray-50 group-hover:bg-violet-50 transition-colors">
                  <Image
                    src={`https://www.google.com/s2/favicons?domain=${service.domain}&sz=64`}
                    alt=""
                    width={24}
                    height={24}
                    className="size-6"
                    unoptimized
                  />
                </div>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-violet-700 transition-colors">
                  {t("askButton", { service: service.name })}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
