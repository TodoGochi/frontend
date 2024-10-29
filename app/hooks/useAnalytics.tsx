// hooks/useAnalytics.ts
import { useCallback } from "react";
import { sendGAEvent, EventParams } from "../utils/analytics";

export const useAnalytics = () => {
  const trackEvent = useCallback((params: EventParams) => {
    sendGAEvent(params);
  }, []);

  return { trackEvent };
};
