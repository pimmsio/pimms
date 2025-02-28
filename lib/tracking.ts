import { sendGTMEvent } from "@next/third-parties/google";
import posthog from "posthog-js";

const userData = (email: string | undefined) => {
  return {
    customer_details: {
      email,
    },
  };
};

export const trackEvent = (name: string, data: any, email?: string) => {
  // phEvent(name, email, data, {
  //   send_instantly: true,
  // });
  gtmEvent(name, email, data);
};

export const phEvent = (
  event: string,
  email?: string,
  data: any = {},
  options: any = {}
) => {
  posthog.capture(
    event,
    {
      ...data,
      ...{ ...userData(email) },
    },
    { ...options }
  );
};

export const gtmEvent = (event: string, email?: string, data: any = {}) => {
  sendGTMEvent({
    event,
    ...{ ...userData(email), ...data },
  });
};
