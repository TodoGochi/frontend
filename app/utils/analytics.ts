// utils/analytics.ts
export type EventParams = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

export const sendGAEvent = ({
  action,
  category,
  label,
  value,
  ...rest
}: EventParams) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    // GA4 이벤트 전송
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};
