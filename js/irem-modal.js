/**
 * Amigura  Modals (care, Trendyol handoff)
 */
(function (global) {
  "use strict";

  const HANDOFF_DELAY_MS = 2500;
  const body = document.body;

  /** @type {{ refreshElements: () => void, getEls: () => object, t: (k: string, v?: object) => string, escapeHtml: (s: string) => string } | null} */
  let deps = null;
  let rootBuilt = false;

  const state = {
    active: false,
    returnFocus: /** @type {HTMLElement | null} */ (null),
    handoffTimer: /** @type {ReturnType<typeof setTimeout> | null} */ (null),
    handoffUrl: /** @type {string | null} */ (null),
  };

  /**
   * @param {{ refreshElements: () => void, getEls: () => object, t: (k: string, v?: object) => string, escapeHtml: (s: string) => string }} d
   */
  function init(d) {
    deps = d;
  }

  function clearHandoffTimer() {
    if (state.handoffTimer !== null) {
      clearTimeout(state.handoffTimer);
      state.handoffTimer = null;
    }
  }

  function ensureModalRoot() {
    if (!deps) return;
    deps.refreshElements();
    const els = deps.getEls();
    let modalRoot = els.modalRoot;
    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.id = "irem-modal-root";
      modalRoot.className = "modal-root";
      modalRoot.hidden = true;
      document.body.appendChild(modalRoot);
      els.modalRoot = modalRoot;
    }

    if (rootBuilt) return;

    modalRoot.innerHTML =
      '<div class="modal-root__backdrop glass-scrim" data-modal-close tabindex="-1" aria-hidden="true"></div>' +
      '<div class="modal-panel glass-surface" role="dialog" aria-modal="true" aria-labelledby="modal-title" id="irem-modal-panel">' +
      '<button type="button" class="modal-panel__close" data-modal-close data-i18n-aria="modal.close">&times;</button>' +
      '<div class="modal-panel__body" id="irem-modal-body"></div></div>';

    rootBuilt = true;
  }

  /**
   * @param {HTMLElement} container
   * @returns {HTMLElement[]}
   */
  function getFocusableElements(container) {
    return /** @type {HTMLElement[]} */ (
      Array.from(
        container.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      )
    ).filter(function (el) {
      return !el.hasAttribute("disabled") && el.offsetParent !== null;
    });
  }

  function openModal() {
    ensureModalRoot();
    if (!deps) return;
    deps.refreshElements();
    const els = deps.getEls();
    if (!els.modalRoot) return;

    state.active = true;
    els.modalRoot.hidden = false;
    body.classList.add("is-modal-open");

    if (els.main) els.main.setAttribute("inert", "");

    const panel = document.getElementById("irem-modal-panel");
    const closeBtn = panel?.querySelector(".modal-panel__close");
    if (closeBtn instanceof HTMLElement) closeBtn.focus();
  }

  function closeModal() {
    clearHandoffTimer();
    state.handoffUrl = null;
    if (!deps) return;
    deps.refreshElements();
    const els = deps.getEls();
    if (!els.modalRoot) return;

    state.active = false;
    els.modalRoot.hidden = true;
    body.classList.remove("is-modal-open");

    if (els.main && !els.siteHeader?.classList.contains("is-nav-open")) {
      els.main.removeAttribute("inert");
    }

    const bodyEl = document.getElementById("irem-modal-body");
    if (bodyEl) bodyEl.innerHTML = "";

    if (state.returnFocus instanceof HTMLElement) {
      state.returnFocus.focus();
    }
    state.returnFocus = null;
  }

  /** Clear overlay state without deps (page load / bfcache / nav away from modal). */
  function forceReset() {
    clearHandoffTimer();
    state.active = false;
    state.handoffUrl = null;
    state.returnFocus = null;

    const modalRoot = document.getElementById("irem-modal-root");
    if (modalRoot) modalRoot.hidden = true;

    body.classList.remove("is-modal-open");

    const main = document.getElementById("main");
    if (main) main.removeAttribute("inert");
  }

  /**
   * @param {string} url
   */
  function navigateHandoff(url) {
    clearHandoffTimer();
    window.open(url, "_blank", "noopener,noreferrer");
    closeModal();
  }

  /**
   * @param {string} url
   * @param {HTMLElement} trigger
   */
  function openHandoffModal(url, trigger) {
    if (!deps) return;
    const t = deps.t;
    const escapeHtml = deps.escapeHtml;
    ensureModalRoot();
    state.returnFocus = trigger;
    state.handoffUrl = url;

    const bodyEl = document.getElementById("irem-modal-body");
    if (!bodyEl) return;

    bodyEl.innerHTML =
      '<h2 id="modal-title" class="modal-panel__title">' +
      escapeHtml(t("modal.handoffTitle")) +
      "</h2>" +
      '<div class="modal-panel__loader" aria-live="polite"><span class="modal-panel__spinner" aria-hidden="true"></span><span>' +
      escapeHtml(t("modal.handoffLoading")) +
      "</span></div>" +
      '<p class="modal-panel__lead">' +
      escapeHtml(t("modal.handoffLead")) +
      "</p>" +
      '<ul class="modal-panel__list"><li>' +
      escapeHtml(t("modal.handoffLi1")) +
      "</li><li>" +
      escapeHtml(t("modal.handoffLi2")) +
      "</li><li>" +
      escapeHtml(t("modal.handoffLi3")) +
      "</li><li>" +
      escapeHtml(t("modal.handoffLi4")) +
      '</li></ul><div class="modal-panel__actions"><button type="button" class="modal-panel__cta btn-primary" data-handoff-go>' +
      escapeHtml(t("modal.handoffGo")) +
      "</button></div>";

    openModal();

    state.handoffTimer = setTimeout(function () {
      if (state.handoffUrl) navigateHandoff(state.handoffUrl);
    }, HANDOFF_DELAY_MS);
  }

  /**
   * @param {ReturnType<global.Irem.Products.resolve>} product
   * @param {HTMLElement} trigger
   */
  function openCareModal(product, trigger) {
    if (!deps) return;
    const t = deps.t;
    const escapeHtml = deps.escapeHtml;
    ensureModalRoot();
    state.returnFocus = trigger;

    const bodyEl = document.getElementById("irem-modal-body");
    if (!bodyEl) return;

    const safety = product.care.safety
      ? '<div class="modal-panel__section"><h3 class="modal-panel__section-title">' +
        escapeHtml(t("modal.careSafety")) +
        "</h3><p>" +
        escapeHtml(product.care.safety) +
        "</p></div>"
      : "";

    bodyEl.innerHTML =
      '<h2 id="modal-title" class="modal-panel__title">' +
      escapeHtml(t("modal.careTitle", { name: product.name })) +
      "</h2>" +
      '<p class="modal-panel__lead">' +
      escapeHtml(t("modal.careLead")) +
      "</p>" +
      '<div class="modal-panel__section"><h3 class="modal-panel__section-title">' +
      escapeHtml(t("modal.careWash")) +
      "</h3><p>" +
      escapeHtml(product.care.washing) +
      "</p></div>" +
      '<div class="modal-panel__section"><h3 class="modal-panel__section-title">' +
      escapeHtml(t("modal.careSize")) +
      "</h3><p>" +
      escapeHtml(product.care.size) +
      "</p></div>" +
      safety +
      '<div class="modal-panel__actions"><button type="button" class="modal-panel__cta btn-secondary" data-modal-close>' +
      escapeHtml(t("modal.ok")) +
      "</button></div>";

    openModal();
  }

  /**
   * @param {KeyboardEvent} e
   */
  function trapFocusInModal(e) {
    if (!state.active || e.key !== "Tab") return;
    const panel = document.getElementById("irem-modal-panel");
    if (!panel) return;

    const focusables = getFocusableElements(panel);
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

  /**
   * @param {HTMLElement} target
   * @returns {boolean}
   */
  function handleClick(target) {
    if (target.closest("[data-modal-close]")) {
      closeModal();
      return true;
    }
    if (target.closest("[data-handoff-go]")) {
      if (state.handoffUrl) navigateHandoff(state.handoffUrl);
      return true;
    }
    return false;
  }

  global.Irem = global.Irem || {};
  global.Irem.Modal = {
    init: init,
    open: openModal,
    close: closeModal,
    forceReset: forceReset,
    openHandoff: openHandoffModal,
    openCare: openCareModal,
    trapFocus: trapFocusInModal,
    isActive: function () {
      return state.active;
    },
    handleClick: handleClick,
  };
})(typeof window !== "undefined" ? window : globalThis);
