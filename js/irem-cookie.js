/**
 * Amigurumirem - Cookie consent banner
 */
(function (global) {
  "use strict";

  const CONSENT_KEY = "amigura-consent";
  const body = document.body;

  /** @type {{ refreshElements: () => void, getEls: () => object, t: (k: string) => string, escapeHtml: (s: string) => string } | null} */
  let deps = null;
  let bannerBuilt = false;

  /**
   * @param {{ refreshElements: () => void, getEls: () => object, t: (k: string) => string, escapeHtml: (s: string) => string }} d
   */
  function init(d) {
    deps = d;
  }

  /**
   * @param {boolean} enabled
   */
  function applyAnalyticsConsent(enabled) {
    if (global.Amigura && global.Amigura.Config && typeof global.Amigura.Config.applyAnalyticsConsent === "function") {
      global.Amigura.Config.applyAnalyticsConsent(enabled);
      return;
    }
    global.AmiguraAnalytics = !!enabled;
  }

  function ensureCookieRootElement() {
    let cookieRoot = document.getElementById("irem-cookie-root");
    if (!cookieRoot) {
      cookieRoot = document.createElement("div");
      cookieRoot.id = "irem-cookie-root";
      cookieRoot.className = "cookie-root";
      cookieRoot.hidden = true;
      document.body.appendChild(cookieRoot);
    }
    return cookieRoot;
  }

  function hideCookieBanner() {
    if (!deps) return;
    deps.refreshElements();
    const els = deps.getEls();
    body.classList.remove("has-cookie-banner");
    if (els.cookieRoot) {
      els.cookieRoot.hidden = true;
      els.cookieRoot.innerHTML = "";
    }
    bannerBuilt = false;
  }

  /**
   * @param {"all" | "essential"} choice
   */
  function setConsent(choice) {
    localStorage.setItem(CONSENT_KEY, choice);
    applyAnalyticsConsent(choice === "all");
    hideCookieBanner();
  }

  function ensureCookieBanner() {
    if (!deps) return;
    const t = deps.t;
    const escapeHtml = deps.escapeHtml;
    const cookieRoot = ensureCookieRootElement();
    deps.refreshElements();
    const els = deps.getEls();
    els.cookieRoot = cookieRoot;

    const existing = localStorage.getItem(CONSENT_KEY);
    if (existing === "all" || existing === "essential") {
      applyAnalyticsConsent(existing === "all");
      return;
    }

    if (bannerBuilt) return;

    els.cookieRoot.hidden = false;
    els.cookieRoot.innerHTML =
      '<div class="cookie-banner glass-surface" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-desc">' +
      '<p id="cookie-desc" class="cookie-banner__text">' +
      '<span id="cookie-title" class="visually-hidden">' +
      escapeHtml(t("cookie.title")) +
      "</span> " +
      escapeHtml(t("cookie.text")) +
      ' <a href="kvkk-gizlilik.html">' +
      escapeHtml(t("cookie.link")) +
      "</a> " +
      escapeHtml(t("cookie.linkSuffix")) +
      "</p>" +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="cookie-banner__btn cookie-banner__btn--essential" data-consent="essential">' +
      escapeHtml(t("cookie.essential")) +
      "</button>" +
      '<button type="button" class="cookie-banner__btn cookie-banner__btn--accept" data-consent="all">' +
      escapeHtml(t("cookie.accept")) +
      "</button>" +
      "</div></div>";

    body.classList.add("has-cookie-banner");
    bannerBuilt = true;
  }

  /**
   * @param {HTMLElement} target
   * @returns {boolean}
   */
  function handleConsentClick(target) {
    const consentBtn = target.closest("[data-consent]");
    if (!(consentBtn instanceof HTMLElement)) return false;
    const choice = consentBtn.getAttribute("data-consent");
    if (choice === "all" || choice === "essential") {
      setConsent(choice);
      return true;
    }
    return false;
  }

  global.Irem = global.Irem || {};
  global.Irem.Cookie = {
    init: init,
    ensureCookieBanner: ensureCookieBanner,
    hideCookieBanner: hideCookieBanner,
    setConsent: setConsent,
    handleConsentClick: handleConsentClick,
    applyAnalyticsConsent: applyAnalyticsConsent,
  };
})(typeof window !== "undefined" ? window : globalThis);
