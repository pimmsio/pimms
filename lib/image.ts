import sharp from "sharp";

interface ResizeOptions {
  width?: number;
  height?: number;
  quality?: number;
}

export async function resizeAndCropImage(
  buffer: Buffer,
  options: ResizeOptions,
): Promise<Buffer> {
  const { width, height, quality } = options;

  const resizedBuffer = await sharp(buffer)
    .extract({ width: width || 1000, height: height || 1000, left: 0, top: 0 }) // Crop the top part
    .resize(width, height) // Resize to the desired width and height
    .jpeg({ quality: quality || 80 }) // Adjust the quality
    .toBuffer();

  return resizedBuffer;
}

export async function getImageBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image ${imageUrl}: ${response.statusText}`,
    );
  }
  const buffer = await response.arrayBuffer();

  const resizedBuffer = await resizeAndCropImage(Buffer.from(buffer), {
    width: 1000,
    height: 1000,
    quality: 80,
  });

  return resizedBuffer.toString("base64");
}
