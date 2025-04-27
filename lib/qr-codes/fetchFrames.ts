import { PUBLIC_FRAME_URL, WEB_URL } from "../../app/constants";
import { FrameChoicesType } from "../../components/qr-codes/frame-choices";
import { FrameMetadata, FrameChoicesMetadata } from "../../components/react-qr";
import { QrCodesCustomization } from "../../components/types";

async function fetchFrameData(
  key: string
): Promise<FrameMetadata<QrCodesCustomization> | undefined> {
  const response = await fetch(`${WEB_URL}/api/templates/${key}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch frame template for key: ${key}`);
  }

  const data: { metadata: { customization?: string } } = await response.json();

  const res = await fetch(`${PUBLIC_FRAME_URL}${key}`);
  const svg = await res.text();

  if (!data.metadata?.customization) {
    return undefined;
  }

  const metadata: QrCodesCustomization = JSON.parse(
    data.metadata.customization
  );
  return { key, metadata, svg };
}

export async function fetchFrames(
  frameChoices: Record<string, FrameChoicesType[]>,
  locale: string
): Promise<Record<string, FrameChoicesMetadata<QrCodesCustomization>[]>> {
  const result: Partial<
    Record<string, FrameChoicesMetadata<QrCodesCustomization>[]>
  > = {};

  const shapes = Object.keys(frameChoices) as string[];

  for (const shape of shapes) {
    const filteredFrameChoices = frameChoices[shape].filter(
      (frameChoice) => locale in frameChoice || "en" in frameChoice
    );

    const frameMetadataArray = await Promise.all(
      filteredFrameChoices.map(async (frameChoice: any) => {
        const frame = frameChoice[locale] || frameChoice["en"];

        if (!frame) {
          throw new Error(`Frame data for locale: ${locale} is undefined`);
        }

        const baseData = await fetchFrameData(frame.base);
        const nologoData = await fetchFrameData(frame.nologo);

        if (!baseData || !nologoData) {
          throw new Error(`Failed to fetch frame data for locale: ${locale}`);
        }

        return { base: baseData, nologo: nologoData };
      })
    );

    result[shape] = frameMetadataArray;
  }

  return result as Record<string, FrameChoicesMetadata<QrCodesCustomization>[]>;
}

export async function fetchExtendedFrame(
  frames:
    | Record<string, FrameChoicesMetadata<QrCodesCustomization>[]>
    | undefined,
  extendedFrame: string
): Promise<Record<string, FrameChoicesMetadata<QrCodesCustomization>[]>> {
  const extendedFrameData = await fetchFrameData(extendedFrame);

  if (!extendedFrameData) {
    throw new Error(
      `Failed to fetch extended frame data for key: ${extendedFrame}`
    );
  }

  const updatedFrames = { ...frames };

  for (const shape in updatedFrames) {
    updatedFrames[shape].unshift({
      base: extendedFrameData,
      nologo: extendedFrameData, // both base and nologo are the same for the extended frame
    });
  }

  return updatedFrames;
}
