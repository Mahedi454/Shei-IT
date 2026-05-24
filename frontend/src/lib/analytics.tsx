import Script from "next/script";

import { API_BASE_URL, type ApiResponse } from "@/lib/api";

export type AnalyticsSettings = {
  googleAnalyticsEnabled: boolean;
  googleAnalyticsMeasurementId: string;
  googleTagManagerId: string;
  googleSearchConsoleVerification: string;
  metaPixelId: string;
  linkedInInsightTagId: string;
  customHeadScripts: string;
  customBodyScripts: string;
};

const defaultAnalyticsSettings: AnalyticsSettings = {
  googleAnalyticsEnabled: false,
  googleAnalyticsMeasurementId: "",
  googleTagManagerId: "",
  googleSearchConsoleVerification: "",
  metaPixelId: "",
  linkedInInsightTagId: "",
  customHeadScripts: "",
  customBodyScripts: "",
};

export async function getAnalyticsSettings() {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics-settings`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return defaultAnalyticsSettings;
    }

    const payload = (await response.json()) as ApiResponse<AnalyticsSettings>;
    return payload.data;
  } catch {
    return defaultAnalyticsSettings;
  }
}

const hasValue = (value: string | null | undefined) => Boolean(value?.trim());

export async function AnalyticsHeadScripts() {
  const settings = await getAnalyticsSettings();
  const gaId = settings.googleAnalyticsMeasurementId.trim();
  const gtmId = settings.googleTagManagerId.trim();
  const metaPixelId = settings.metaPixelId.trim();
  const linkedInId = settings.linkedInInsightTagId.trim();
  const searchConsoleVerification = settings.googleSearchConsoleVerification.trim();

  return (
    <>
      {hasValue(searchConsoleVerification) ? (
        <meta
          name="google-site-verification"
          content={searchConsoleVerification}
        />
      ) : null}

      {settings.googleAnalyticsEnabled && hasValue(gaId) ? (
        <>
          <Script
            id="google-analytics-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}

      {hasValue(gtmId) ? (
        <Script id="google-tag-manager-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      ) : null}

      {hasValue(metaPixelId) ? (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}

      {hasValue(linkedInId) ? (
        <Script id="linkedin-insight-init" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${linkedInId}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      ) : null}

      {hasValue(settings.customHeadScripts) ? (
        <Script id="custom-head-scripts" strategy="afterInteractive">
          {settings.customHeadScripts}
        </Script>
      ) : null}
    </>
  );
}

export async function AnalyticsBodyScripts() {
  const settings = await getAnalyticsSettings();
  const gtmId = settings.googleTagManagerId.trim();

  return (
    <>
      {hasValue(gtmId) ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      ) : null}
      {hasValue(settings.customBodyScripts) ? (
        <Script id="custom-body-scripts" strategy="afterInteractive">
          {settings.customBodyScripts}
        </Script>
      ) : null}
    </>
  );
}
