"use client";

import { useState } from "react";
import { useInterval } from "ahooks";
import { Paragraph } from "../base/paragraph";
import { Check, X } from "lucide-react";

interface TheNeedContent {
  label: string;
  heading: React.ReactNode;
  withoutPimms: string;
  withPimms: string;
  problem: {
    description: string;
    points: string[];
  };
  solution: {
    description: string;
    points: string[];
  };
}

export const TheNeedToggle = ({ content }: { content: TheNeedContent }) => {
  const [showSolution, setShowSolution] = useState(false);

  useInterval(() => {
    setShowSolution(!showSolution);
  }, 3000);

  return (
    <div className="bg-white border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSolution(false)}
            className={`px-4 py-2 text-sm font-medium ${
              !showSolution ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {content.withoutPimms}
          </button>
          <button
            onClick={() => setShowSolution(true)}
            className={`px-4 py-2 text-sm font-medium ${
              showSolution ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {content.withPimms}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <Paragraph className="text-lg text-gray-600 leading-relaxed">
          {showSolution ? content.solution.description : content.problem.description}
        </Paragraph>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(showSolution ? content.solution.points : content.problem.points).map((point, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 flex items-center justify-center mt-0.5">
                {showSolution ? <Check className="w-5 h-5 text-blue-600" /> : <X className="w-5 h-5 text-gray-600" />}
              </div>
              <Paragraph className="text-gray-900 font-medium flex-1 leading-relaxed">{point}</Paragraph>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
