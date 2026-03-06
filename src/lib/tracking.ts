export type TrackingEvent = "form_submit" | "whatsapp_click" | "scroll_depth";

export type ConsentState = {
  analytics: boolean;
  ads: boolean;
  adUserData: boolean;
  adPersonalization: boolean;
};

export const CONSENT_STORAGE_KEY = "kh_consent_v1";

type DataLayerValue = string | number | boolean | null | undefined;
type DataLayerEvent = {
  event: string;
  [key: string]: DataLayerValue;
};

type WindowWithDataLayer = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function getClientWindow(): WindowWithDataLayer | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window as WindowWithDataLayer;
}

export function getCurrentPagePath(): string {
  const clientWindow = getClientWindow();
  if (!clientWindow) {
    return "";
  }

  return `${clientWindow.location.pathname}${clientWindow.location.search}`;
}

export function track(
  eventName: TrackingEvent,
  params: Record<string, DataLayerValue>
): void {
  const clientWindow = getClientWindow();
  if (!clientWindow) {
    return;
  }

  clientWindow.dataLayer = clientWindow.dataLayer || [];
  const eventPayload: DataLayerEvent = {
    event: eventName,
    ...params,
  };
  clientWindow.dataLayer.push(eventPayload);
}

function consentValue(enabled: boolean): "granted" | "denied" {
  return enabled ? "granted" : "denied";
}

export function setConsent(state: ConsentState): void {
  const clientWindow = getClientWindow();
  if (!clientWindow) {
    return;
  }

  clientWindow.dataLayer = clientWindow.dataLayer || [];
  clientWindow.gtag =
    clientWindow.gtag ||
    function gtag(...args: unknown[]) {
      clientWindow.dataLayer?.push(args);
    };

  clientWindow.gtag("consent", "update", {
    analytics_storage: consentValue(state.analytics),
    ad_storage: consentValue(state.ads),
    ad_user_data: consentValue(state.adUserData),
    ad_personalization: consentValue(state.adPersonalization),
  });

  clientWindow.dataLayer.push({
    event: "consent_update",
    analytics: state.analytics,
    ads: state.ads,
    ad_user_data: state.adUserData,
    ad_personalization: state.adPersonalization,
  });
}
