import { QrCustomOptions } from "@7qr.codes/qr";

export const defaultColor = "#000000";
export const defaultQrCustomOptions: Omit<QrCustomOptions, "frame"> = {
  colors: ["#000000", "#000000", "#F0F0F0"],
  corner: "corner1",
  level: "H",
  logo: undefined,
  patterns: [
    {
      name: "pattern10",
      scales: [1],
    },
  ],
  type: 0,
};

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
];

export const ACCEPTED_IMAGE_MIME_TYPES = [
  { name: "jpg", types: ["image/jpg", "image/jpeg"] },
  { name: "png", types: ["image/png"] },
  { name: "svg", types: ["image/svg+xml"] },
];

export const MAX_FILE_SIZE = 5000000; // 5 MB

export const QR_COOKIES_LIST = [
  "auth_callback",
  "hook_backhalf",
  "hook_colors",
  "hook_corner",
  "hook_frame",
  "hook_level",
  "hook_logo",
  "hook_patterns",
  "hook_whitedots",
  "hook_type",
  "hook_url",
  // product relatesd
  "hook_product",
  "hook_pack",
  // payment related
  "hook_currency",
  "pay_email",
  "pay_id",
  "pay_gtm_data",
  "pay_url",
];
