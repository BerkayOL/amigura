/**
 * Amigurumirem - Product availability labels
 */
(function (global) {
  "use strict";

  var BADGE_CLASS = "product-card__badge";

  /**
   * Normalize for matching (lowercase, strip combining marks).
   * @param {string} str
   * @returns {string}
   */
  function normalize(str) {
    return String(str)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  /**
   * @param {string} status
   * @returns {"stock" | "custom" | "limited"}
   */
  function getVariant(status) {
    var s = normalize(status);
    if (/limited|sinirli|kaldi|left/.test(s)) return "limited";
    if (/custom|ozel|siparis|gun|day|order/.test(s)) return "custom";
    if (/stock|stok|stokta|available/.test(s)) return "stock";
    return "custom";
  }

  /**
   * @param {HTMLElement | null} badge
   * @param {string} statusText
   */
  function applyToElement(badge, statusText) {
    if (!badge) return;
    var variant = getVariant(statusText);
    badge.textContent = statusText;
    badge.className = BADGE_CLASS + " " + BADGE_CLASS + "--" + variant;
  }

  global.Irem = global.Irem || {};
  global.Irem.ProductStatus = {
    getVariant: getVariant,
    applyToElement: applyToElement,
    badgeClass: BADGE_CLASS,
  };
})(typeof window !== "undefined" ? window : globalThis);
