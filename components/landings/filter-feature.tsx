import { Laptop, Tag, Tablet, SmartphoneCharging, Instagram, Calendar } from "lucide-react";
import React from "react";
import { Label } from "../base/label";

const getFlagUrl = (country: string) => `https://flag.vercel.app/m/${country}.svg`;

const getFaviconUrl = (url: string) => {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;
};

export const FilterFeature = ({}: { tkey: string }) => {
  const utmLabel = (
    <Label className="text-xs font-medium bg-blue-50 text-[#3970ff] border border-blue-200 px-2 py-0.5 rounded">
      UTM
    </Label>
  );



  const tagLabel = <Tag size={12} className="text-[#3970ff]" />;

  const ROWS = [
    // Première rangée : Géolocalisation
    [
      {
        icon: <img alt="France" src={getFlagUrl("FR")} className="rounded-md" />,
        label: "Pays",
        value: "France"
      },
      {
        icon: <img alt="CH" src={getFlagUrl("CH")} className="rounded-md" />,
        label: "Ville",
        value: "Zurich"
      },
      {
        icon: <img alt="US" src={getFlagUrl("US")} className="rounded-md" />,
        label: "Ville",
        value: "New York"
      },
      {
        icon: <img alt="FR" src={getFlagUrl("FR")} className="rounded-md" />,
        label: "Ville",
        value: "Lyon"
      },
      {
        icon: <img alt="AU" src={getFlagUrl("AU")} className="rounded-md" />,
        label: "Ville",
        value: "Melbourne"
      }
    ],
    // Deuxième rangée : Sources de trafic spécifiques
    [
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://linkedin.com")}
            alt="LinkedIn"
          />
        ),
        label: "Campagne",
        value: "Post LinkedIn du 12",
        highlight: true
      },
      {
        icon: <Instagram size={16} className="text-pink-500" />,
        label: "Lien",
        value: "Profil Instagram",
        highlight: true
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://youtube.com")}
            alt="Youtube"
          />
        ),
        label: "Campagne",
        value: "Vidéo YouTube du 8",
        highlight: true
      },
      {
        icon: <Calendar size={16} className="text-blue-500" />,
        label: "Event",
        value: "Webinar du 15",
        highlight: true
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://tally.so")}
            alt="Tally"
          />
        ),
        label: "Formulaire",
        value: "Landing A/B test"
      }
    ],
    // Troisième rangée : UTM parameters
    [
      {
        icon: utmLabel,
        label: "Campagne",
        value: "linkedin_launch",
        highlight: true
      },
      {
        icon: utmLabel,
        label: "Source",
        value: "newsletter_april"
      },
      {
        icon: utmLabel,
        label: "Medium",
        value: "google_promo"
      },
      {
        icon: utmLabel,
        label: "Campagne",
        value: "calendly_partner",
        highlight: true
      },
      {
        icon: utmLabel,
        label: "Medium",
        value: "webinar_jean"
      }
    ],
    // Quatrième rangée : Tags
    [
      {
        icon: tagLabel,
        label: "Tag",
        value: "Lancement"
      },
      {
        icon: tagLabel,
        label: "Tag",
        value: "Onboarding"
      },
      {
        icon: tagLabel,
        label: "Tag",
        value: "Retargeting"
      },
      {
        icon: tagLabel,
        label: "Tag",
        value: "Emailing"
      },
      {
        icon: tagLabel,
        label: "Tag",
        value: "Ventes"
      },
      {
        icon: tagLabel,
        label: "Tag",
        value: "Démo"
      },
      {
        icon: tagLabel,
        label: "Tag",
        value: "Publicités Meta"
      },
      {
        icon: tagLabel,
        label: "Tag",
        value: "Beta"
      }
    ],
    // Cinquième rangée : Outils marketing et automatisation
    [
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://brevo.com")}
            alt="Brevo"
          />
        ),
        label: "Campagne",
        value: "Emailing Brevo #47",
        highlight: true
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://lemlist.com")}
            alt="Lemlist"
          />
        ),
        label: "Séquence",
        value: "Lemlist Cold Outreach",
        highlight: true
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://make.com")}
            alt="Make"
          />
        ),
        label: "Automation",
        value: "Make.com Lead Flow"
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://zapier.com")}
            alt="Zapier"
          />
        ),
        label: "Workflow",
        value: "Zapier CRM Sync"
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://typeform.com")}
            alt="Typeform"
          />
        ),
        label: "Formulaire",
        value: "Typeform Qualification",
        highlight: true
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://hubspot.com")}
            alt="HubSpot"
          />
        ),
        label: "Pipeline",
        value: "HubSpot Demo Call"
      }
    ],
    // Sixième rangée : Navigateurs et appareils
    [
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://arc.net")}
            alt="Arc"
          />
        ),
        label: "Navigateur",
        value: "Arc"
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://chrome.com")}
            alt="Chrome"
          />
        ),
        label: "Navigateur",
        value: "Chrome"
      },
      {
        icon: <SmartphoneCharging size={18} />,
        label: "Appareil",
        value: "Mobile"
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://www.apple.com/safari")}
            alt="Safari"
          />
        ),
        label: "Navigateur",
        value: "Safari"
      },
      {
        icon: <Tablet size={18} />,
        label: "Appareil",
        value: "Tablet"
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://firefox.com")}
            alt="Firefox"
          />
        ),
        label: "Navigateur",
        value: "Firefox"
      },
      {
        icon: <Laptop size={18} />,
        label: "Appareil",
        value: "Desktop"
      }
    ]
  ];

  return (
    <div className="relative [mask-image:linear-gradient(black_30%,transparent)]">
      <div className="relative [mask-image:linear-gradient(to right, transparent, black 10%, black 90%, transparent)] overflow-hidden w-full">
        <div className="flex flex-col gap-4 py-4">
          {ROWS.map((blocks, rowIndex) => (
            <InfiniteRow key={rowIndex} blocks={blocks} speed={getSpeed(rowIndex, blocks.length)} />
          ))}
        </div>
      </div>
    </div>
  );
};

const getSpeed = (i: number, length: number) => {
  // Base duration on number of elements: more elements = longer loop
  const secondsPerBlock = 20;
  return `${(length / ((i % 2) + 1)) * secondsPerBlock}s`;
};

const InfiniteRow = ({
  blocks,
  speed
}: {
  blocks: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }[];
  speed: string;
}) => {
  const duplicated = [...blocks, ...blocks];
  return (
    <div className="overflow-hidden w-full">
      <div className="flex w-max whitespace-nowrap animate-scroll-loop" style={{ animationDuration: speed }}>
        {duplicated.map((block, idx) => (
          <div key={idx} className="flex gap-4 px-4 min-w-max items-center">
            <FilterBlock {...block} />
          </div>
        ))}
      </div>
    </div>
  );
};

const FilterBlock = ({
  icon,
  label,
  value,
  highlight = false
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div
    className={`flex h-9 rounded-lg border-[2px] text-sm leading-none [&>*]:h-full transition-all duration-300 ${
      highlight
        ? "border-neutral-100 bg-gradient-to-r from-blue-50 to-indigo-50 text-[#3970ff]"
        : "border-neutral-100 text-neutral-800"
    }`}
  >
    <div className={`flex items-center gap-2 px-3 rounded-l-lg ${highlight ? "text-[#3970ff]" : "text-neutral-500"}`}>
      <span className="shrink-0">{icon}</span>
      {label}
    </div>
    <div className={`flex items-center px-1 ${highlight ? "text-[#3970ff]" : "text-neutral-500"}`}>=</div>
    <div
      className={`flex items-center gap-2 px-3 font-semibold rounded-r-lg ${highlight ? "text-[#3970ff]" : "text-neutral-800"}`}
    >
      {value}
    </div>
  </div>
);
