import { H2 } from "@/components/base/h2";
import { Label } from "@/components/base/label";
import { Section } from "@/components/base/section";
import { Paragraph } from "../base/paragraph";
import { getTranslations } from "next-intl/server";
import { TheNeedToggle } from "./TheNeedToggle";

export const TheNeed = async ({ tkey }: { tkey: string }) => {
  const t = await getTranslations(tkey);

  // Prepare all the content server-side
  const content = {
    label: t("the_need.label"),
    heading: t.rich("the_need.heading", {
      strong: (chunks) => <span className="text-vibrant-blue">{chunks}</span>
    }),
    withoutPimms: t("the_need.without_pimms"),
    withPimms: t("the_need.with_pimms"),
    problem: {
      description: t("the_need.problem.description"),
      points: [t("the_need.problem.point1"), t("the_need.problem.point2"), t("the_need.problem.point3")]
    },
    solution: {
      description: t("the_need.solution.description"),
      points: [t("the_need.solution.point1"), t("the_need.solution.point2"), t("the_need.solution.point3")]
    }
  };

  return (
    <Section id="the-need">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center mb-8">
          <Label className="bg-gray-100 text-gray-900 py-2 px-4 flex items-center justify-center gap-2 uppercase text-sm font-bold">
            {content.label}
          </Label>
        </div>
        <H2>{content.heading}</H2>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Server-side fallback content for SEO */}
        <noscript>
          <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{content.withoutPimms}</h3>
              <Paragraph className="text-lg text-gray-600 leading-relaxed mb-6">
                {content.problem.description}
              </Paragraph>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {content.problem.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 flex items-center justify-center mt-0.5">
                      <span className="text-gray-600">✗</span>
                    </div>
                    <Paragraph className="text-gray-900 font-medium flex-1 leading-relaxed">{point}</Paragraph>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{content.withPimms}</h3>
              <Paragraph className="text-lg text-gray-600 leading-relaxed mb-6">
                {content.solution.description}
              </Paragraph>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {content.solution.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 flex items-center justify-center mt-0.5">
                      <span className="text-vibrant-blue">✓</span>
                    </div>
                    <Paragraph className="text-gray-900 font-medium flex-1 leading-relaxed">{point}</Paragraph>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </noscript>

        {/* Interactive version with JavaScript */}
        <div className="js-only">
          <TheNeedToggle content={content} />
        </div>
      </div>

      {/* Hide interactive version when JS is disabled */}
      <style jsx>{`
        @media (scripting: none) {
          .js-only {
            display: none;
          }
        }
      `}</style>
    </Section>
  );
};
