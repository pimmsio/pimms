import { X } from "lucide-react";
import React from "react";

export const ABTestingDemo = () => {
  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Modal/Card Container */}
      <div className="p-8 md:p-10 relative">
        {/* Testing URLs Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-base font-semibold text-text-primary">Testing URLs</h3>
          </div>

          {/* URL Inputs */}
          <div className="space-y-4">
            {/* URL 1 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">1</span>
              </div>
              <div className="flex-1 bg-info-light border border-info-border rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-gray-800 text-sm">https://pimms.io</span>
              </div>
            </div>

            {/* URL 2 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">2</span>
              </div>
              <div className="flex-1 bg-info-light border border-info-border rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-gray-800 text-sm">https://pimms.framer.website</span>
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">2</span>
              </div>
              <div className="flex-1 bg-info-light border border-info-border rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-gray-800 text-sm">https://pimms.lovable.app</span>
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Completion Date Section */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-text-primary mb-2">Completion Date</h3>
          <p className="text-sm text-gray-600">6 weeks maximum</p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-info rounded-2xl -z-10 blur-3xl scale-110"></div>
    </div>
  );
};
