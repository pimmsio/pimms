export type FrameDataType = { base: string; nologo: string };
export type FrameShapeType = "square" | "circle";
export type FrameMetadata<T> = {
  key: string;
  metadata: T;
  svg: string;
};

export type FrameChoicesMetadata<T> = {
  base: FrameMetadata<T>;
  nologo: FrameMetadata<T>;
};
