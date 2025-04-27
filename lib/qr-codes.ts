import {
  CornerType,
  QRPatternWithScale,
  QrCustom,
  QrCustomOptions,
} from "@7qr.codes/qr";
import {
  CreateQRCodesPostResponseBody,
  CreateStaticQRCodesPostRequestBody,
  ImageType,
  QrCodesCustomization,
} from "../components/types";
import { storage } from "./storage";
import { registerWindow } from "@svgdotjs/svg.js";
import { createSVGWindow } from "svgdom";
import { Transformer } from "@napi-rs/image";

const defaultOptions: Omit<QrCustomOptions, "frame"> = {
  colors: ["#000000", "#000000"],
  corner: "corner1",
  level: "H",
  logo: undefined,
  patterns: [{ name: "pattern1", scales: [1] }],
  type: 0,
};

export function formatCreateQrCodesResponse(data: any, url: string) {
  return {
    archived: data.archived,
    created_at: data.createdAt,
    destination: {
      type: "url",
      redirect_value: {
        url: `https://${data.domain}/${data.key}`,
      },
    },
    id: data.id,
    public: data.publicStats,
    url,
  } as CreateQRCodesPostResponseBody;
}

export async function generateStaticQRCode(
  reqBody: CreateStaticQRCodesPostRequestBody,
  frameSvg: string
) {
  const options = generateQrOptions(
    reqBody.customization,
    frameSvg,
    reqBody.customization?.id
  );
  return new QrCustom(reqBody.value, options);
}

export async function staticQRCodeImage(
  qrcode: QrCustom,
  imageType: ImageType
) {
  const svgString = (await qrcode.render()).svg();

  // upload convert file if imageType = png or jpeg
  if (imageType !== "svg") {
    // const resizeSvgString = QrCustom.resize(svgString, 3000).svg();
    // const convertBuffer = await convertImage(resizeSvgString, imageType, 90);
    // return convertBuffer;
  } else {
    return svgString;
  }
}

export async function storeQRCodesImages(
  qrcode: QrCustom,
  imageType: ImageType,
  link: any
) {
  const svgString = (await qrcode.render()).svg();
  const svgBase64 = await qrcode.getSvgDataUri();

  // upload svg file
  const url = await storeImage("qr-codes", link, "image/svg+xml", svgBase64);

  // upload convert file if imageType = png or jpeg
  if (imageType !== "svg") {
    // const resizeSvgString = QrCustom.resize(svgString, 2000).svg();
    // const convertBuffer = await convertImage(resizeSvgString, imageType, 90);
    // const convertBase64 = `data:image/${imageType};base64,${Buffer.from(
    //   convertBuffer
    // ).toString("base64")}`;
    // return {
    //   url: await storeImage(
    //     "generator",
    //     link,
    //     `image/${imageType}`,
    //     convertBase64
    //   ),
    //   imageResponse: convertBuffer,
    // };
  } else {
    return { url, imageResponse: svgString };
  }
}

export async function generateQRCodeImage(
  svgString: string,
  imageType: ImageType,
  imageQuality: number,
  link: any,
  size: number = 2000
) {
  // const resizeSvgString = QrCustom.resize(svgString, size).svg();
  // const convertBuffer = await convertImage(
  //   resizeSvgString,
  //   imageType,
  //   imageQuality
  // );
  // const convertBase64 = `data:image/${imageType};base64,${Buffer.from(
  //   convertBuffer
  // ).toString("base64")}`;
  // return {
  //   url: await storeImage(
  //     "generator",
  //     link,
  //     `image/${imageType}`,
  //     convertBase64
  //   ),
  //   imageResponse: convertBuffer,
  // };
}

export async function convertImage(
  svgString: string | Buffer,
  imageType: ImageType,
  imageQuality?: number
) {
  const transformer = await Transformer.fromSvg(
    svgString,
    imageType === "png" ? null : "rgb(255,255,255)"
  );
  return imageType === "png"
    ? await transformer.png()
    : await transformer.jpeg(imageQuality);
}

async function storeImage(
  prefix: string,
  link: any,
  contentType: string,
  base64: string
) {
  const { url } = await storage.upload(
    `${prefix}/${link.projectId}/${link.id}`,
    base64,
    { contentType }
  );
  return url;
}

function generateQrOptions(
  customization: QrCodesCustomization | undefined,
  frameSvg: string,
  id?: string
) {
  const colors = customization?.colors;
  const corner = customization?.corner as CornerType;
  const logo = customization?.logo;
  const patterns = customization?.patterns as unknown as QRPatternWithScale[];
  const whitedots = customization?.whitedots;

  const options: QrCustomOptions = {
    ...defaultOptions,
    ...(colors && { colors }),
    ...(corner && { corner }),
    frame: frameSvg,
    ...(id && { id }),
    ...(logo && { logo }),
    ...(patterns && { patterns }),
    ...(whitedots !== undefined && { whitedots }),
  };

  return options;
}

export function createWindow() {
  const window = createSVGWindow();
  const document = window.document;
  registerWindow(window, document);
}
