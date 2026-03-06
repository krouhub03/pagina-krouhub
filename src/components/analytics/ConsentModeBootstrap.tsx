import { CONSENT_STORAGE_KEY } from "@/lib/tracking";

export default function ConsentModeBootstrap() {
  return (
    <script
      id="consent-mode-bootstrap"
      // This runs before GTM script execution because it is rendered in <head>.
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;

          gtag("consent", "default", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            wait_for_update: 500
          });

          try {
            var rawConsent = localStorage.getItem("${CONSENT_STORAGE_KEY}");
            if (rawConsent) {
              var saved = JSON.parse(rawConsent);
              gtag("consent", "update", {
                analytics_storage: saved.analytics ? "granted" : "denied",
                ad_storage: saved.ads ? "granted" : "denied",
                ad_user_data: saved.adUserData ? "granted" : "denied",
                ad_personalization: saved.adPersonalization ? "granted" : "denied"
              });
            }
          } catch (e) {}
        `,
      }}
    />
  );
}
