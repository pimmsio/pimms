"use client";

import { useExtendedFrame } from "../hooks/useExtendedFrame";
import { QrOptionsProvider } from "../qr-provider";
import { QrCodeContainer } from "./qr-code-container";
import { TypeFormSimple } from "./type-form-simple";
import { QrCodesCustomization } from "../../types";
import { FrameChoicesMetadata } from "../../react-qr";
import { Step, StepItem, Stepper } from "../../ui/stepper";

export function QrContainer({
  id,
  frames,
}: {
  id: string;
  frames:
    | Record<string, FrameChoicesMetadata<QrCodesCustomization>[]>
    | undefined;
}) {
  const { frames: allFrames, loading } = useExtendedFrame({ frames });

  const steps = [
    { id: "step1", label: "Logo" },
    { id: "step2", label: "Type" },
    { id: "step3", label: "" },
  ] satisfies StepItem[];

  // if (!allFrames) {
  //   window.location.replace(WEB_URL);
  //   return null;
  // }

  if (loading) {
    return null;
  }

  return (
    <QrOptionsProvider>
      <div className="flex w-full flex-col gap-4">
        <Stepper
          initialStep={0}
          steps={steps}
          orientation="horizontal"
          responsive={false}
          styles={{ "main-container": "max-w-md mx-auto px-4" }}
          onClickStep={(step, setStep) => {
            if (step === 0) {
              setStep(step);
            }
          }}
        >
          {steps.map(({ id: stepId, label }, i) => {
            switch (stepId) {
              default:
              case "step1":
                return (
                  <Step key={label} label={label}>
                    <QrCodeContainer id={id} frames={allFrames} />
                  </Step>
                );
              case "step2":
                return (
                  <Step key={label} label={label}>
                    <TypeFormSimple id={id} />
                  </Step>
                );
            }
          })}
        </Stepper>
      </div>
      {/* <AddQrSuccessModal id={id} /> */}
    </QrOptionsProvider>
  );
}
