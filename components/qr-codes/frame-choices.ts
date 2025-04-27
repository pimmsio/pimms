import { FrameDataType, FrameShapeType } from "../react-qr";

export type LOCALES = "en" | "fr";
export type MandatoryLocales = "en";
export type OptionalLocales = Exclude<LOCALES, MandatoryLocales>;

export type FrameChoicesType = {
  [K in MandatoryLocales]: FrameDataType;
} & {
  [K in OptionalLocales]?: FrameDataType;
};

export const DEFAULT_FRAME_HOME: Record<FrameShapeType, FrameChoicesType[]> = {
  circle: [
    {
      en: {
        base: "IWJg3SFcrCT_V6MTeRUYp",
        nologo: "u6LRLrPRhF_8n8W9EV_oQ",
      },
    },
  ],
  square: [
    {
      en: {
        base: "BHwHhcpbzAwIm1JgLoZzI",
        nologo: "8RhM45aZcimJv9oL4tf0Y",
      },
    },
  ],
};
