/**
 * Amigura - Bespoke order wizard
 */
(function (global) {
  "use strict";

  function getConfig() {
    return global.Amigura && global.Amigura.Config;
  }

  function getOrderEmail() {
    var cfg = getConfig();
    var parts = cfg && cfg.brandEmailParts ? cfg.brandEmailParts : null;
    if (parts && parts.length >= 3) return parts[0] + "@" + parts[1] + "." + parts[2];
    return "";
  }

  function getWhatsAppE164() {
    var cfg = getConfig();
    var parts = cfg && cfg.whatsappParts ? cfg.whatsappParts : null;
    if (parts && parts.length) return parts.join("").replace(/[^\d]/g, "");
    return "";
  }

  // Note: CSP-hardening removed inline styles. Swatch colors are defined via CSS classes.
  const PALETTE = [
    { hex: "#E8B89A", nameKey: "palette.peach", className: "wizard__swatch--peach" },
    { hex: "#9BB89A", nameKey: "palette.sage", className: "wizard__swatch--sage" },
    { hex: "#C9A227", nameKey: "palette.gold", className: "wizard__swatch--gold" },
    { hex: "#F5E6D3", nameKey: "palette.cream", className: "wizard__swatch--cream" },
    { hex: "#8B9DC3", nameKey: "palette.blue", className: "wizard__swatch--blue" },
    { hex: "#D4A5A5", nameKey: "palette.rose", className: "wizard__swatch--rose" },
    { hex: "#3D4450", nameKey: "palette.charcoal", className: "wizard__swatch--charcoal" },
    { hex: "#FFFFFF", nameKey: "palette.white", className: "wizard__swatch--white" },
  ];

  const MAX_COLORS = 3;
  const TOTAL_STEPS = 4;

  /** @type {{ step: number, figureKey: string | null, colors: string[], sizeCm: number, notes: string, orderRef: string }} */
  const state = {
    step: 1,
    figureKey: null,
    colors: [],
    sizeCm: 20,
    notes: "",
    orderRef: "",
  };

  let wizardEl = null;
  let wizardBound = false;

  function t(key, vars) {
    return global.Irem && global.Irem.I18n ? global.Irem.I18n.t(key, vars) : key;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function generateOrderRef() {
    return "IRM-" + Date.now().toString(36).toUpperCase().slice(-8);
  }

  function getFigureKeys() {
    if (global.Irem && global.Irem.Products && typeof global.Irem.Products.getFigureSlugs === "function") {
      return global.Irem.Products.getFigureSlugs();
    }
    return [];
  }

  function getFigureLabel(key) {
    if (key && getFigureKeys().indexOf(key) !== -1) {
      return t("wizard." + key);
    }
    return key || "\u2014";
  }

  function getFigureThumb(slug) {
    if (!global.Irem || !global.Irem.Products) return "assets/images/placeholder.svg";
    var item = global.Irem.Products.catalog.find(function (p) {
      return p.slug === slug;
    });
    if (!item) return "assets/images/placeholder.svg";
    return global.Irem.Products.galleryPaths(item.folder, 1)[0];
  }

  function renderFigureGrid() {
    var grid = document.querySelector(".wizard__figure-grid");
    if (!grid) return;
    var keys = getFigureKeys();
    grid.innerHTML = keys
      .map(function (key) {
        var thumb = getFigureThumb(key);
        return (
          '<button type="button" class="wizard__figure-card" data-figure-key="' +
          escapeHtml(key) +
          '" aria-pressed="false">' +
          '<img class="wizard__figure-thumb" src="' +
          escapeHtml(thumb) +
          '" alt="" width="72" height="72" loading="lazy" decoding="async">' +
          '<span class="wizard__figure-name" data-i18n="wizard.' +
          escapeHtml(key) +
          '"></span></button>'
        );
      })
      .join("");
    if (global.Irem && global.Irem.I18n) global.Irem.I18n.apply(grid);
  }

  function getColorNames() {
    return state.colors.map(function (hex) {
      const found = PALETTE.find(function (p) {
        return p.hex.toLowerCase() === hex.toLowerCase();
      });
      const name = found ? t(found.nameKey) : hex;
      return name + " (" + hex + ")";
    });
  }

  function buildOrderMessage() {
    return [
      t("wizard.msgIntro"),
      "",
      t("wizard.msgTitle"),
      t("wizard.msgRef") + ": " + state.orderRef,
      "",
      t("wizard.msgFigure") + ": " + getFigureLabel(state.figureKey),
      t("wizard.msgColors") + ": " + (getColorNames().join(", ") || "\u2014"),
      t("wizard.msgSize") + ": " + state.sizeCm + " cm",
      "",
      t("wizard.msgNotes") + ":",
      state.notes.trim() || "\u2014",
      "",
      t("wizard.msgThanks"),
    ].join("\n");
  }

  function updateSendLinks() {
    const mailto = document.getElementById("wizard-mailto");
    const whatsapp = document.getElementById("wizard-whatsapp");
    const actions = document.getElementById("wizard-send-actions");
    if (!mailto || !whatsapp || !actions) return;

    const subject = encodeURIComponent(
      t("wizard.mailSubject", {
        ref: state.orderRef,
        figure: getFigureLabel(state.figureKey),
      })
    );
    const emailAddr = getOrderEmail();
    mailto.href = emailAddr
      ? "mailto:" + emailAddr + "?subject=" + subject + "&body=" + encodeURIComponent(buildOrderMessage())
      : "#";
    whatsapp.href =
      "https://wa.me/" + getWhatsAppE164() + "?text=" + encodeURIComponent(buildOrderMessage());
    actions.hidden = false;
  }

  function renderSummary() {
    const summary = document.getElementById("wizard-summary");
    if (!summary) return;

    summary.innerHTML =
      '<div class="wizard__summary-row"><dt>' +
      escapeHtml(t("wizard.ref")) +
      "</dt><dd>" +
      escapeHtml(state.orderRef) +
      "</dd></div>" +
      '<div class="wizard__summary-row"><dt>' +
      escapeHtml(t("wizard.figure")) +
      "</dt><dd>" +
      escapeHtml(getFigureLabel(state.figureKey)) +
      "</dd></div>" +
      '<div class="wizard__summary-row"><dt>' +
      escapeHtml(t("wizard.colors")) +
      "</dt><dd>" +
      escapeHtml(getColorNames().join(", ") || "\u2014") +
      "</dd></div>" +
      '<div class="wizard__summary-row"><dt>' +
      escapeHtml(t("wizard.size")) +
      "</dt><dd>" +
      state.sizeCm +
      " cm</dd></div>";
    updateSendLinks();
  }

  function updatePaletteLabel() {
    const label = document.getElementById("wizard-palette-label");
    if (!label) return;
    if (!state.colors.length) {
      label.textContent = t("wizard.colorNone");
      return;
    }
    label.textContent = t("wizard.colorSelected", { value: getColorNames().join(", ") });
  }

  function renderPalette() {
    const container = document.getElementById("wizard-palette");
    if (!container) return;

    container.innerHTML = PALETTE.map(function (swatch) {
      const hex = swatch.hex;
      const selected = state.colors.includes(hex);
      const name = t(swatch.nameKey);
      return (
        '<button type="button" class="wizard__swatch ' +
        swatch.className +
        (selected ? " is-selected" : "") +
        '" data-color="' +
        hex +
        '" aria-pressed="' +
        selected +
        '" aria-label="' +
        escapeHtml(name) +
        " \u2014 " +
        hex +
        '" title="' +
        escapeHtml(name) +
        '"></button>'
      );
    }).join("");
  }

  function updateSizeVisual() {
    const figure = document.getElementById("wizard-size-figure");
    const output = document.getElementById("wizard-size-output");
    const pct = ((state.sizeCm - 10) / 30) * 100;
    if (figure) figure.style.height = pct + "%";
    if (output) output.textContent = state.sizeCm + " cm";
  }

  function showStepError(step, show) {
    const err = document.getElementById("wizard-error-" + step);
    if (err) err.hidden = !show;
  }

  function goToStep(step) {
    if (!wizardEl) return;

    state.step = Math.max(1, Math.min(TOTAL_STEPS, step));

    wizardEl.querySelectorAll("[data-wizard-step]").forEach(function (panel) {
      const panelStep = Number(panel.getAttribute("data-wizard-step"));
      const active = panelStep === state.step;
      panel.classList.toggle("is-active", active);
      if (active) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    });

    wizardEl.querySelectorAll("[data-step-indicator]").forEach(function (dot) {
      const dotStep = Number(dot.getAttribute("data-step-indicator"));
      dot.classList.toggle("is-active", dotStep === state.step);
      dot.classList.toggle("is-complete", dotStep < state.step);
    });

    const progress = document.getElementById("wizard-progress");
    if (progress) progress.setAttribute("aria-valuenow", String(state.step));

    const back = document.getElementById("wizard-back");
    const next = document.getElementById("wizard-next");
    if (back) back.hidden = state.step === 1;
    if (next) {
      next.textContent = state.step === TOTAL_STEPS ? t("wizard.finish") : t("wizard.next");
    }

    if (state.step === 4) {
      if (!state.orderRef) state.orderRef = generateOrderRef();
      renderSummary();
    }
  }

  function validateCurrentStep() {
    if (state.step === 1) {
      const ok = !!state.figureKey;
      showStepError(1, !ok);
      return ok;
    }
    if (state.step === 2) {
      const ok = state.colors.length > 0;
      showStepError(2, !ok);
      return ok;
    }
    return true;
  }

  function onWizardClick(e) {
    const target = /** @type {HTMLElement} */ (e.target);

    const figureCard = target.closest(".wizard__figure-card");
    if (figureCard instanceof HTMLButtonElement) {
      const key = figureCard.getAttribute("data-figure-key");
      if (!key) return;
      state.figureKey = key;
      wizardEl.querySelectorAll(".wizard__figure-card").forEach(function (card) {
        if (!(card instanceof HTMLButtonElement)) return;
        const active = card === figureCard;
        card.classList.toggle("is-selected", active);
        card.setAttribute("aria-pressed", String(active));
      });
      showStepError(1, false);
      return;
    }

    const swatch = target.closest(".wizard__swatch");
    if (swatch instanceof HTMLButtonElement) {
      const hex = swatch.getAttribute("data-color");
      if (!hex) return;
      const idx = state.colors.indexOf(hex);
      if (idx >= 0) state.colors.splice(idx, 1);
      else if (state.colors.length < MAX_COLORS) state.colors.push(hex);
      renderPalette();
      updatePaletteLabel();
      showStepError(2, state.colors.length === 0);
      return;
    }

    if (target.id === "wizard-next") {
      if (!validateCurrentStep()) return;
      if (state.step < TOTAL_STEPS) goToStep(state.step + 1);
      else {
        const notesEl = document.getElementById("wizard-notes");
        if (notesEl instanceof HTMLTextAreaElement) state.notes = notesEl.value;
        renderSummary();
        var sendActions = document.getElementById("wizard-send-actions");
        if (sendActions && sendActions.scrollIntoView) {
          sendActions.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
      return;
    }

    if (target.id === "wizard-back") goToStep(state.step - 1);
  }

  function onWizardInput(e) {
    const target = e.target;
    if (!(target instanceof HTMLInputElement) || target.id !== "wizard-size-slider") return;
    state.sizeCm = Number(target.value);
    updateSizeVisual();
  }

  function ensurePageUsable() {
    if (global.Irem && global.Irem.Nav && global.Irem.Nav.resetNav) {
      global.Irem.Nav.resetNav();
    }
  }

  function bindWizard() {
    if (wizardBound || document.body.dataset.page !== "ozel") return;

    wizardEl = document.querySelector("[data-wizard]");
    if (!wizardEl) return;

    ensurePageUsable();
    wizardBound = true;
    state.orderRef = generateOrderRef();

    renderFigureGrid();
    renderPalette();
    updateSizeVisual();
    goToStep(1);

    if (global.Irem && global.Irem.I18n) global.Irem.I18n.apply(wizardEl);

    wizardEl.addEventListener("click", onWizardClick);
    wizardEl.addEventListener("input", onWizardInput);

    const notesEl = document.getElementById("wizard-notes");
    if (notesEl) {
      notesEl.addEventListener("input", function () {
        state.notes = notesEl.value;
      });
    }

    document.addEventListener("amigura:langchange", function () {
      renderFigureGrid();
      if (global.Irem && global.Irem.I18n) global.Irem.I18n.apply(wizardEl);
      renderPalette();
      updatePaletteLabel();
      goToStep(state.step);
    });
  }

  function boot() {
    function tryBind() {
      if (document.body.dataset.page === "ozel") bindWizard();
    }

    document.addEventListener("amigura:ready", tryBind, { once: true });
    document.addEventListener("DOMContentLoaded", tryBind, { once: true });
    window.addEventListener("pageshow", function () {
      if (document.body.dataset.page === "ozel") ensurePageUsable();
    });

    if (document.readyState !== "loading") tryBind();
  }

  boot();
})(typeof window !== "undefined" ? window : globalThis);
