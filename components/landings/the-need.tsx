"use client";

import { useState } from "react";
import { CircleX, CheckCircle } from "lucide-react";
import { LinkedinPost } from "@/components/linkedin-post";
import { H2 } from "@/components/base/h2";
import { Label } from "@/components/base/label";
import { useInterval } from "ahooks";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const TheNeed = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(`${tkey}.the_need`);
  const [showSolution, setShowSolution] = useState(false);

  useInterval(() => {
    setShowSolution(!showSolution);
  }, 2500);

  return (
    <div className="w-11/12 mx-auto flex flex-col items-center gap-8">
      <div className="flex flex-row items-center">
        <Label
          className={`text-center ${
            showSolution ? "bg-[#3971ff]" : "bg-red-400"
          } text-white py-1.5 flex items-center justify-center gap-2 uppercase px-4 text-sm`}
        >
          {showSolution ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <CircleX className="w-4 h-4" />
          )}
          {showSolution ? t("solution") : t("problem")}
        </Label>

        {/* <label className="inline-block cursor-pointer relative w-fit justify-between items-center group text-xl scale-80">
          <input
            type="checkbox"
            checked={showSolution}
            onChange={() => setShowSolution(!showSolution)}
            className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md hidden"
          />
          <span className="w-16 h-10 flex items-center flex-shrink-0 p-1 bg-red-400 rounded-full duration-300 ease-in-out peer-checked:bg-[#3971ff] after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
        </label> */}
      </div>

      <H2 className="text-center [text-wrap:balance]">
        {showSolution
          ? t.rich("success", {
              logo: () => (
                <Image
                  src="/static/logo.svg"
                  alt="pim.ms"
                  width={1000}
                  height={179}
                  className="w-26 inline-block mb-[2px] ml-0.5"
                />
              ),
            })
          : t("fail")}
      </H2>

      <LinkedinPost
        className="w-11/12 md:w-[555px] md:scale-125 lg:scale-150 mx-auto my-8 md:my-20 lg:mt-24 lg:mb-30"
        name="Arnaud Belinga"
        profile="Co-Founder @Breakcold | The sales CRM for 2025, not 2010."
        time="2 d"
        title={showSolution ? t("post_success") : t("post_fail")}
        comments={showSolution ? 39 : 0}
        likes={showSolution ? 734 : 1}
        shares={showSolution ? 12 : 0}
        showSolution={showSolution}
        avatar="https://d1w1ev8fdwdvmy.cloudfront.net/space_eb8edc65-129a-4cb6-abbe-6bf8979c0658/lead_63ec9c59-ab1c-495c-b7a6-ad3b1018886f/avatar_63ec9c59-ab1c-495c-b7a6-ad3b1018886f_k2t94m.jpeg"
      />
    </div>
  );
};
