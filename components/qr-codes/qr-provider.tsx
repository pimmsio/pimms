import { QrCustomOptions } from "@7qr.codes/qr";
import React, {
  JSX,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { defaultQrCustomOptions } from "./constants";
import { FrameChoicesMetadata } from "../react-qr";
import { QrCodesCustomization } from "../types";
import { isValidUrl } from "../../lib/utils";

export interface QrOptionsContextValue {
  options: Omit<QrCustomOptions, "frame">;
  frame: FrameChoicesMetadata<QrCodesCustomization> | undefined;
  svg: string | undefined;
  url: string | undefined;
  updateOption: (
    field: keyof QrCustomOptions,
    update: Partial<Omit<QrCustomOptions, "frame" | "level" | "type">>
  ) => void;
  updateOptions: (
    update: Partial<Omit<QrCustomOptions, "frame" | "level" | "type">>
  ) => void;
  setFrame: React.Dispatch<
    React.SetStateAction<FrameChoicesMetadata<QrCodesCustomization> | undefined>
  >;
  setSvg: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface QrOptionsProviderProps {
  children: React.ReactNode;
}

export const QrOptionsContext = createContext<
  QrOptionsContextValue | undefined
>(undefined) as React.Context<QrOptionsContextValue | undefined>;

export const QrOptionsProvider: (props: QrOptionsProviderProps) => JSX.Element =
  function ({ children }: { children: ReactNode }) {
    const [svg, setSvg] = useState<string>();
    const [frame, setFrame] =
      useState<FrameChoicesMetadata<QrCodesCustomization>>();
    const [url, setUrl] = useState<string | undefined>();
    const [options, setOptions] = useState<Omit<QrCustomOptions, "frame">>(
      defaultQrCustomOptions
    );
    const parsedUrl = url && isValidUrl(url) ? url : undefined;

    const updateOption = useCallback(
      (
        field: keyof QrCustomOptions,
        update: Partial<Omit<QrCustomOptions, "frame" | "level" | "type">>
      ) => {
        setOptions((prevOptions) => ({ ...prevOptions, ...update }));
      },
      []
    );

    const updateOptions = useCallback(
      (update: Partial<Omit<QrCustomOptions, "frame" | "level" | "type">>) => {
        setOptions((prevOptions) => ({ ...prevOptions, ...update }));
      },
      []
    );

    // The context value
    const value = useMemo(
      () => ({
        frame,
        options,
        svg,
        url: parsedUrl,
        setFrame,
        setSvg,
        setUrl,
        updateOption,
        updateOptions,
      }),
      [frame, options, parsedUrl, svg, updateOption]
    );

    return (
      <QrOptionsContext.Provider value={value}>
        {children}
      </QrOptionsContext.Provider>
    );
  };

export const useQrOptionsContext = (): QrOptionsContextValue => {
  const context = useContext(QrOptionsContext);

  if (context === undefined) {
    throw new Error(
      "useQrOptionsContext must be used within a QrOptionsProvider provider"
    );
  }

  return context as QrOptionsContextValue;
};
