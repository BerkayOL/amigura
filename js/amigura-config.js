/**
 * Amigura ù Site configuration (single source of truth for external links & feature flags).
 * Update values here before launch; runtime modules read via Amigura.Config.
 */
(function (global) {
  "use strict";

  /** @type {AmiguraConfig} */
  var Config = {
    brandEmail: "hello@amigura.com",
    instagramUrl: "https://www.instagram.com/amigura",
    etsyUrl: "https://www.etsy.com/shop/amigura",
    siteOrigin: "https://www.amigura.com",

    /** Trendyol ma?aza / ùrùn ù gerùek URL'lerle de?i?tirin */
    trendyolStoreUrl: "https://www.trendyol.com/magaza/amigura",
    trendyolLinks: {
      harryPotter: "https://www.trendyol.com/magaza/amigura-m-12345",
      hermione: "https://www.trendyol.com/magaza/amigura-m-12345",
      malefiz: "https://www.trendyol.com/magaza/amigura-m-12345",
      ronald: "https://www.trendyol.com/magaza/amigura-m-12345",
    },

    /** WhatsApp: ùlke kodu + numara, ba??nda 0 yok (ùr. 905551234567) */
    whatsappE164: "905551234567",

    orderRefPrefix: "AMG",

    newsletter: {
      /** "api" | "mailto" ù api: POST endpoint; mailto: istemci e-posta uygulamas? */
      mode: "mailto",
      endpoint: "/api/newsletter",
    },

    analytics: {
      enabled: false,
    },
  };

  /**
   * @param {string} slug
   * @returns {string}
   */
  function getTrendyolLink(slug) {
    if (Config.trendyolLinks && Config.trendyolLinks[slug]) {
      return Config.trendyolLinks[slug];
    }
    return Config.trendyolStoreUrl;
  }

  /**
   * @returns {string}
   */
  function generateOrderRef() {
    return Config.orderRefPrefix + "-" + Date.now().toString(36).toUpperCase().slice(-8);
  }

  /**
   * @param {boolean} allowAnalytics
   */
  function applyAnalyticsConsent(allowAnalytics) {
    global.AmiguraAnalytics = !!(allowAnalytics && Config.analytics.enabled);
  }

  global.Amigura = global.Amigura || {};
  global.Amigura.Config = Config;
  global.Amigura.Config.getTrendyolLink = getTrendyolLink;
  global.Amigura.Config.generateOrderRef = generateOrderRef;
  global.Amigura.Config.applyAnalyticsConsent = applyAnalyticsConsent;
})(typeof window !== "undefined" ? window : globalThis);
