/**
 * Amigurumirem - Mobile and desktop navigation
 */
(function (global) {
  "use strict";

  const body = document.body;

  /** @type {{ refreshElements: () => void, getEls: () => object, t: (k: string) => string } | null} */
  let deps = null;

  /**
   * @param {{ refreshElements: () => void, getEls: () => object, t: (k: string) => string }} d
   */
  function init(d) {
    deps = d;
  }

  /**
   * Force closed nav state (fixes blank screen after menu + page navigation / bfcache).
   */
  function resetNav() {
    body.classList.remove("is-nav-open", "is-modal-open");
    document.documentElement.classList.remove("is-nav-open", "is-modal-open");
    body.style.overflow = "";
    body.style.removeProperty("overflow");
    document.documentElement.style.overflow = "";
    document.documentElement.style.removeProperty("overflow");

    const main = document.getElementById("main");
    if (main) main.removeAttribute("inert");

    const header = document.getElementById("siteHeader");
    if (header) header.classList.remove("is-nav-open");

    const siteNav = document.getElementById("siteNav");
    if (siteNav) {
      siteNav.setAttribute("aria-hidden", "true");
      siteNav.setAttribute("inert", "");
    }

    const backdrop = document.getElementById("navBackdrop");
    if (backdrop) {
      backdrop.hidden = true;
      backdrop.setAttribute("aria-hidden", "true");
    }

    const toggle = document.getElementById("navToggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }

    if (global.Irem && global.Irem.Modal && global.Irem.Modal.forceReset) {
      global.Irem.Modal.forceReset();
    }
  }

  /**
   * @param {boolean} isOpen
   */
  function setNavOpen(isOpen) {
    if (!isOpen) {
      resetNav();
      if (deps) {
        deps.refreshElements();
        const els = deps.getEls();
        const t = deps.t;
        if (els.navToggle) {
          els.navToggle.setAttribute("aria-label", t("nav.openMenu"));
        }
      }
      return;
    }

    if (!deps) return;
    deps.refreshElements();
    const els = deps.getEls();
    const t = deps.t;

    if (!els.siteHeader || !els.navToggle || !els.siteNav) return;

    resetNav();

    els.siteHeader.classList.add("is-nav-open");
    els.navToggle.setAttribute("aria-expanded", "true");
    els.navToggle.setAttribute("aria-label", t("nav.closeMenu"));
    els.siteNav.setAttribute("aria-hidden", "false");
    els.siteNav.removeAttribute("inert");
    body.classList.add("is-nav-open");

    if (els.main) els.main.setAttribute("inert", "");

    if (els.navBackdrop) {
      els.navBackdrop.hidden = false;
      els.navBackdrop.setAttribute("aria-hidden", "false");
    }

    const closeBtn = els.siteNav.querySelector("#navClose, .glass-nav__close");
    if (closeBtn instanceof HTMLElement) {
      closeBtn.focus();
    } else {
      const link = els.siteNav.querySelector(".glass-nav__drawer-link, .glass-nav__link");
      if (link instanceof HTMLElement) link.focus();
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  function trapNavFocus(e) {
    if (!deps || e.key !== "Tab") return;
    deps.refreshElements();
    const els = deps.getEls();
    if (!els.siteHeader?.classList.contains("is-nav-open") || !els.siteNav) return;

    const focusables = els.siteNav.querySelectorAll(
      "a, button, .glass-nav__close, .glass-nav__drawer-link"
    );
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  global.Irem = global.Irem || {};
  global.Irem.Nav = {
    init: init,
    setNavOpen: setNavOpen,
    resetNav: resetNav,
    trapNavFocus: trapNavFocus,
  };

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", resetNav);
    window.addEventListener("pageshow", resetNav);
    document.addEventListener(
      "click",
      function (e) {
        const link = e.target.closest(".glass-nav a[href]");
        if (link instanceof HTMLAnchorElement && link.href && !link.target) {
          resetNav();
        }
      },
      true
    );
  }
})(typeof window !== "undefined" ? window : globalThis);
