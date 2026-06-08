/**
 * Amigurumirem - Shared utilities (i18n helper, HTML escape)
 */
(function (global) {
  "use strict";

  function t(key, vars) {
    return global.Irem && global.Irem.I18n
      ? global.Irem.I18n.t(key, vars)
      : key;
  }

  /**
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  global.Irem = global.Irem || {};
  global.Irem.Utils = { t: t, escapeHtml: escapeHtml };
})(typeof window !== "undefined" ? window : globalThis);
