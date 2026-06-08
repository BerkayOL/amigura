/**
 * Amigura ? Site configuration (external links & feature flags).
 */
(function (global) {
  "use strict";

  var INSTAGRAM_PROFILE = "https://www.instagram.com/amigurumi__rem";

  /** @type {Record<string, string>} */
  var instagramLinks = {
    barbie: "https://www.instagram.com/p/C7w0pvatzBI/?img_index=1",
    elsa: "https://www.instagram.com/p/Ck8ZFRatqo3/?img_index=1",
    olaf: "https://www.instagram.com/p/Ck8Z4IFN9GV/?img_index=1",
    moana: "https://www.instagram.com/p/DU01Rx1DBtt/?img_index=1",
    maui: "https://www.instagram.com/p/DUvsiVWjLB_/?img_index=1",
    harryPotter: "https://www.instagram.com/p/DEaUDXzM6lq/?img_index=1",
    hermione: "https://www.instagram.com/p/DEaUu7KsdFr/?img_index=1",
    malefiz: "https://www.instagram.com/p/DJssqjGovmW/?img_index=1",
    ronald: "https://www.instagram.com/p/DJnkRXioMww/?img_index=1",
    wednesday: "https://www.instagram.com/p/CuU6eLut46F/?img_index=1",
    thing: "https://www.instagram.com/p/CsMRS0oNcyi/?img_index=1",
    pugsleyAddams: "https://www.instagram.com/p/C1PkWCSsVPc/?img_index=1",
    enidSinclair: "https://www.instagram.com/p/CyHbDE6NLqI/?img_index=1",
    kuromi: "https://www.instagram.com/p/DGdx9yEsSZ_/",
    myMelody: "https://www.instagram.com/p/DGdzBnEs9wV/",
    sonicBlue: "https://www.instagram.com/p/DGdxVeJMfOl/?img_index=1",
    sonicRed: "https://www.instagram.com/p/DUn_DWZDMg3/?img_index=1",
    sonicBlack: "https://www.instagram.com/p/DUvsiVWjLB_/?img_index=1",
    tails: "https://www.instagram.com/p/DNRHoOhsauo/?img_index=1",
    lolSurpriseDoll: "https://www.instagram.com/p/Clttxvetvof/?img_index=1",
    crossbodyPaperBag: "https://www.instagram.com/p/Ceo9fgCqodi/?img_index=1",
    lavenderClutch: "https://www.instagram.com/p/Cfr2VopqtfL/?img_index=1",
    nostalgicPhoneBlue: "https://www.instagram.com/p/CLOnwNThrT9/?img_index=1",
    nostalgicPhonePink: "https://www.instagram.com/p/CLOn7C9BCd2/?img_index=1",
    nostalgicPhoneOrange: "https://www.instagram.com/p/CZRlH1Ct0-h/?img_index=1",
    fruitSet: "https://www.instagram.com/p/CWtVuQ2qNM8/",
    vegetableSet: "https://www.instagram.com/p/CWtVZNmKIJt/?img_index=1",
    trexDinosaur: "https://www.instagram.com/p/CyHY1MotQx0/?img_index=1",
  };

  /** @type {AmiguraConfig} */
  var Config = {
    brandEmail: "calanguirem@gmail.com",
    brandEmailParts: ["calanguirem", "gmail", "com"],
    instagramUrl: INSTAGRAM_PROFILE,
    etsyUrl: "https://www.etsy.com/shop/amigura",
    siteOrigin: "https://www.amigurumirem.com",
    instagramLinks: instagramLinks,

    brandPhoneDisplay: "+90 534 017 52 72",
    whatsappParts: ["90", "534", "017", "5272"],
    orderRefPrefix: "AMG",

    newsletter: {
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
  function getInstagramLink(slug) {
    if (Config.instagramLinks && Config.instagramLinks[slug]) {
      return Config.instagramLinks[slug];
    }
    return Config.instagramUrl;
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

  function getPhoneDigits() {
    return Config.whatsappParts && Config.whatsappParts.length
      ? Config.whatsappParts.join("")
      : "";
  }

  function getBrandPhoneTel() {
    var digits = getPhoneDigits();
    return digits ? "+" + digits : "";
  }

  function buildWhatsappLink() {
    var digits = getPhoneDigits();
    return digits ? "https://wa.me/" + digits : "https://wa.me/";
  }

  function initContactLinks() {
    if (!global.document) return;
    var tel = getBrandPhoneTel();
    var display = Config.brandPhoneDisplay || tel;
    var wa = buildWhatsappLink();
    global.document.querySelectorAll("[data-contact-phone]").forEach(function (el) {
      if (!(el instanceof HTMLAnchorElement) || !tel) return;
      el.href = "tel:" + tel;
      if (el.hasAttribute("data-contact-phone-display")) {
        el.textContent = display;
      }
    });
    global.document.querySelectorAll("[data-contact-whatsapp]").forEach(function (el) {
      if (el instanceof HTMLAnchorElement) el.href = wa;
    });
  }

  global.Amigura = global.Amigura || {};
  global.Amigura.Config = Config;
  global.Amigura.Config.getInstagramLink = getInstagramLink;
  global.Amigura.Config.generateOrderRef = generateOrderRef;
  global.Amigura.Config.applyAnalyticsConsent = applyAnalyticsConsent;
  global.Amigura.Config.getBrandPhoneTel = getBrandPhoneTel;
  global.Amigura.Config.buildWhatsappLink = buildWhatsappLink;
  global.Amigura.Config.initContactLinks = initContactLinks;
})(typeof window !== "undefined" ? window : globalThis);
