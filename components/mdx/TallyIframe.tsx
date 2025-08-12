"use client";

import { useEffect } from "react";
import { ExternalLink, FileText } from "lucide-react";

export default function TallyIframe({ src = "https://tally.so/embed/3jo7Wx?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1", title = "Report Abuse" }: { src?: string; title?: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
    `;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="my-4 sm:my-6 md:my-8 rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 bg-white">
      {/* Header */}
      <div className="bg-[#3970ff]/5 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#3970ff]/10 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#3970ff]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-base">Interactive Form</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <span>Powered by Tally</span>
              <ExternalLink className="w-3 h-3" />
            </p>
          </div>
        </div>
      </div>

      {/* Iframe container */}
      <div className="aspect-video w-full bg-gray-50">
        <iframe
          data-tally-src={src}
          loading="lazy"
          width="100%"
          height="659"
          title={title}
        ></iframe>
      </div>
    </div>
  );
}
