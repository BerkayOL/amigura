/**
 * Amigurumirem - Page transition unlock helper
 */
(function (global) {
  "use strict";

  function unlockPage() {
    var doc = global.document;
    if (!doc || !doc.body) return;

    doc.documentElement.classList.remove("is-nav-open", "is-modal-open");
    doc.body.classList.remove("is-nav-open", "is-modal-open");
    doc.body.style.overflow = "";

    var main = doc.getElementById("main");
    if (main) {
      main.removeAttribute("inert");
      main.style.removeProperty("visibility");
      main.style.removeProperty("opacity");
    }

    var header = doc.getElementById("siteHeader");
    if (header) header.classList.remove("is-nav-open");

    var modal = doc.getElementById("irem-modal-root");
    if (modal) {
      modal.hidden = true;
      modal.setAttribute("hidden", "");
      modal.setAttribute("aria-hidden", "true");
    }

    var backdrop = doc.getElementById("navBackdrop");
    if (backdrop) {
      backdrop.hidden = true;
      backdrop.setAttribute("hidden", "");
      backdrop.setAttribute("aria-hidden", "true");
    }

    var siteNav = doc.getElementById("siteNav");
    if (siteNav) {
      siteNav.setAttribute("aria-hidden", "true");
      if (!siteNav.hasAttribute("inert")) siteNav.setAttribute("inert", "");
    }

    if (global.Irem && global.Irem.Modal && global.Irem.Modal.forceReset) {
      global.Irem.Modal.forceReset();
    }
  }

  global.AmiguraPageUnlock = unlockPage;

  if (global.document) {
    global.document.addEventListener("DOMContentLoaded", unlockPage);
    global.document.addEventListener("amigura:ready", unlockPage);
    global.addEventListener("pageshow", unlockPage);
  }
})(typeof window !== "undefined" ? window : globalThis);
