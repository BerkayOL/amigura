/**
 * Amigurumirem - Modals (care, Instagram outbound)
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
    body.classList.remove("is-quickview-open");

    if (els.main && !els.siteHeader?.classList.contains("is-nav-open")) {
      els.main.removeAttribute("inert");
    }

    const bodyEl = document.getElementById("irem-modal-body");
    if (bodyEl) bodyEl.innerHTML = "";

    const panel = document.getElementById("irem-modal-panel");
    if (panel) panel.classList.remove("modal-panel--quickview");

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
    body.classList.remove("is-quickview-open");

    const main = document.getElementById("main");
    if (main) main.removeAttribute("inert");

    const panel = document.getElementById("irem-modal-panel");
    if (panel) panel.classList.remove("modal-panel--quickview");
  }

  /**
   * @param {string} url
   */
  function buildTrackedUrl(url, trigger) {
    try {
      const parsed = new URL(url, window.location.href);
      if (parsed.protocol !== "https:") return "";

      // Minimal, privacy-friendly attribution for outbound handoff.
      if (!parsed.searchParams.has("utm_source")) parsed.searchParams.set("utm_source", "amigura");
      if (!parsed.searchParams.has("utm_medium")) parsed.searchParams.set("utm_medium", "referral");
      if (!parsed.searchParams.has("utm_campaign")) parsed.searchParams.set("utm_campaign", "boutique_handoff");

      const card = trigger && trigger.closest ? trigger.closest(".product-card") : null;
      if (card instanceof HTMLElement) {
        const pid = card.getAttribute("data-product-id");
        const intent = card.getAttribute("data-intent");
        if (pid && !parsed.searchParams.has("amigura_pid")) parsed.searchParams.set("amigura_pid", pid);
        if ((intent === "self" || intent === "gift") && !parsed.searchParams.has("amigura_intent")) {
          parsed.searchParams.set("amigura_intent", intent);
        }
      }
      return parsed.toString();
    } catch {
      return "";
    }
  }

  function navigateHandoff(url) {
    clearHandoffTimer();
    try {
      const trigger = state.returnFocus || null;
      const tracked = buildTrackedUrl(url, trigger);
      if (!tracked) return;
      const parsed = new URL(tracked, window.location.href);
      if (parsed.protocol !== "https:") return;
      window.open(parsed.toString(), "_blank", "noopener,noreferrer");
    } catch {
      return;
    }
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
    // Store a normalized/tracked version of the URL.
    state.handoffUrl = buildTrackedUrl(url, trigger) || url;

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
   * Premium PDP-lite quick view modal.
   * @param {ReturnType<global.Irem.Products.resolve>} product
   * @param {HTMLElement} trigger
   */
  function openQuickViewModal(product, trigger) {
    if (!deps) return;
    const t = deps.t;
    const escapeHtml = deps.escapeHtml;
    ensureModalRoot();
    state.returnFocus = trigger;

    const bodyEl = document.getElementById("irem-modal-body");
    if (!bodyEl) return;

    const title = escapeHtml(product.name);
    const price = escapeHtml(product.price);
    const trackedLink = buildTrackedUrl(product.instagramLink, trigger) || product.instagramLink;
    const link = escapeHtml(trackedLink);

    const careWash = product.care && product.care.washing ? escapeHtml(product.care.washing) : "";
    const careSize = product.care && product.care.size ? escapeHtml(product.care.size) : "";
    const careSafety = product.care && product.care.safety ? escapeHtml(product.care.safety) : "";

    const ICON_LOCK =
      '<svg class="trust-stack__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M7 11V7a5 5 0 0 1 10 0v4"/><rect x="5" y="11" width="14" height="10" rx="2"/></svg>';
    const ICON_TRUCK =
      '<svg class="trust-stack__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 7h11v10H3z"/><path d="M14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="1.6"/><circle cx="18" cy="19" r="1.6"/></svg>';
    const ICON_HAND =
      '<svg class="trust-stack__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12"/><path d="M11 12V4.5a1.5 1.5 0 0 1 3 0V12"/><path d="M14 12V6.5a1.5 1.5 0 0 1 3 0V14"/><path d="M8 13l-2 2.5a4 4 0 0 0 3.2 6.5H14a5 5 0 0 0 5-5v-3"/></svg>';

    bodyEl.innerHTML =
      '<div class="quickview">' +
      '<div class="quickview__media glass-surface" aria-hidden="true">' +
      '<div class="quickview__media-inner">' +
      '<img class="quickview__img" src="' +
      escapeHtml(product.thumbnail || product.image) +
      '" alt="" width="600" height="600" loading="lazy" decoding="async" data-fallback="' +
      escapeHtml(product.thumbnailFallback || product.imageFallback || product.image) +
      '">' +
      "</div></div>" +
      '<div class="quickview__content">' +
      '<header class="quickview__header">' +
      '<h2 id="modal-title" class="quickview__title modal-panel__title">' +
      title +
      "</h2>" +
      '<p class="quickview__price">' +
      price +
      "</p>" +
      '<div class="quickview__badges"><span class="quickview__badge">' +
      escapeHtml(t("modal.quickViewOrganic")) +
      "</span></div>" +
      "</header>" +
      '<details class="quickview__details" open>' +
      '<summary class="quickview__summary">' +
      escapeHtml(t("modal.quickViewCareTitle")) +
      "</summary>" +
      '<div class="quickview__details-body">' +
      (careWash ? '<p><strong>' + escapeHtml(t("modal.careWash")) + ":</strong> " + careWash + "</p>" : "") +
      (careSize ? '<p><strong>' + escapeHtml(t("modal.careSize")) + ":</strong> " + careSize + "</p>" : "") +
      (careSafety ? '<p><strong>' + escapeHtml(t("modal.careSafety")) + ":</strong> " + careSafety + "</p>" : "") +
      "</div></details>" +
      '<div class="quickview__actions">' +
      '<button type="button" class="btn-primary quickview__cta" data-quickview-go data-url="' +
      link +
      '">' +
      escapeHtml(t("modal.quickViewCta")) +
      "</button>" +
      '<ul class="trust-stack" aria-label="' +
      escapeHtml(t("trust.label")) +
      '">' +
      '<li class="trust-stack__item">' +
      ICON_LOCK +
      '<span class="trust-stack__text">' +
      escapeHtml(t("modal.quickViewTrust1")) +
      "</span></li>" +
      '<li class="trust-stack__item">' +
      ICON_TRUCK +
      '<span class="trust-stack__text">' +
      escapeHtml(t("modal.quickViewTrust2")) +
      "</span></li>" +
      '<li class="trust-stack__item">' +
      ICON_HAND +
      '<span class="trust-stack__text">' +
      escapeHtml(t("modal.quickViewTrust3")) +
      "</span></li>" +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</div>";

    const panel = document.getElementById("irem-modal-panel");
    if (panel) panel.classList.add("modal-panel--quickview");
    const img = bodyEl.querySelector(".quickview__img");
    if (img instanceof HTMLImageElement) {
      img.addEventListener(
        "error",
        function onQuickViewImgError() {
          const fallback = img.getAttribute("data-fallback");
          if (fallback && img.getAttribute("src") !== fallback) img.src = fallback;
        },
        { once: true }
      );
    }
    body.classList.add("is-quickview-open");

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
    const qv = target.closest("[data-quickview-go]");
    if (qv instanceof HTMLElement) {
      const url = qv.getAttribute("data-url");
      if (url) navigateHandoff(url);
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
    openQuickView: openQuickViewModal,
    trapFocus: trapFocusInModal,
    isActive: function () {
      return state.active;
    },
    handleClick: handleClick,
  };
})(typeof window !== "undefined" ? window : globalThis);
