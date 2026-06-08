/**
 * Amigurumirem - Custom order page bootstrap
 */
(function () {
  "use strict";

  var STORAGE_KEY = "amigura-theme";
  var THEME_LIGHT = "light";
  var THEME_DARK = "dark";
  var root = document.documentElement;
  var body = document.body;

  function utils() {
    return window.Irem && window.Irem.Utils;
  }

  function t(key, vars) {
    var u = utils();
    return u ? u.t(key, vars) : key;
  }

  function escapeHtml(str) {
    var u = utils();
    return u ? u.escapeHtml(str) : String(str);
  }

  var els = null;
  var initialized = false;
  var handlersBound = false;

  function cacheElements() {
    return {
      toggle: document.querySelector(".theme-toggle"),
      siteHeader: document.getElementById("siteHeader"),
      navToggle: document.getElementById("navToggle"),
      navClose: document.getElementById("navClose"),
      siteNav: document.getElementById("siteNav"),
      navBackdrop: document.getElementById("navBackdrop"),
      main: document.getElementById("main"),
      modalRoot: document.getElementById("irem-modal-root"),
      cookieRoot: document.getElementById("irem-cookie-root"),
    };
  }

  function refreshElements() {
    els = cacheElements();
  }

  function getEls() {
    if (!els) refreshElements();
    return els;
  }

  function initModules() {
    var deps = {
      refreshElements: refreshElements,
      getEls: getEls,
      t: t,
      escapeHtml: escapeHtml,
    };
    if (window.Irem.Nav) window.Irem.Nav.init(deps);
    if (window.Irem.Modal) window.Irem.Modal.init(deps);
    if (window.Irem.Cookie) window.Irem.Cookie.init(deps);
  }

  function updateThemeColorMeta(theme) {
    var color = theme === THEME_DARK ? "#141820" : "#f8f6f3";
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
      meta.setAttribute("content", color);
    });
  }

  function applyTheme(theme) {
    var isDark = theme === THEME_DARK;
    root.setAttribute("data-theme", theme);
    updateThemeColorMeta(theme);
    refreshElements();
    document.querySelectorAll(".theme-toggle").forEach(function (toggle) {
      if (!toggle || !toggle.setAttribute) return;
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? t("theme.toLight") : t("theme.toDark"));
      var label = toggle.querySelector(".theme-toggle__label");
      if (label) label.textContent = isDark ? t("theme.dark") : t("theme.light");
    });
  }

  function getPreferredTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === THEME_LIGHT || stored === THEME_DARK) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? THEME_DARK : THEME_LIGHT;
  }

  function ensurePageReady() {
    if (typeof window.AmiguraPageUnlock === "function") {
      window.AmiguraPageUnlock();
    }
    if (window.Irem && window.Irem.Nav && window.Irem.Nav.resetNav) {
      window.Irem.Nav.resetNav();
    }
    var main = document.getElementById("main");
    if (main) {
      main.removeAttribute("inert");
    }
    document.documentElement.classList.add("is-page-ready");
  }

  function onDocumentClick(e) {
    var target = e.target;
    if (!target || !target.closest) return;

    var langBtn = target.closest(".lang-switch__btn");
    if (langBtn && langBtn.getAttribute) {
      var lang = langBtn.getAttribute("data-lang");
      if ((lang === "tr" || lang === "en") && window.Irem.I18n) {
        window.Irem.I18n.setLang(lang);
      }
      return;
    }

    if (target.closest(".theme-toggle")) {
      var current = root.getAttribute("data-theme") || THEME_LIGHT;
      var next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      return;
    }

    if (target.closest("#navToggle")) {
      refreshElements();
      var isOpen = els.siteHeader && els.siteHeader.classList.contains("is-nav-open");
      if (window.Irem.Nav) window.Irem.Nav.setNavOpen(!isOpen);
      return;
    }

    if (target.closest("#navClose") || target.closest("#navBackdrop")) {
      if (window.Irem.Nav) window.Irem.Nav.setNavOpen(false);
      if (els.navToggle) els.navToggle.focus();
      return;
    }

    var navLink = target.closest(".glass-nav a[href]");
    if (navLink && navLink.href && !navLink.target) {
      if (window.Irem.Nav) window.Irem.Nav.resetNav();
    }

    if (window.Irem.Cookie && window.Irem.Cookie.handleConsentClick(target)) return;
    if (window.Irem.Modal && window.Irem.Modal.handleClick(target)) {
      e.preventDefault();
    }
  }

  function onDocumentKeydown(e) {
    refreshElements();
    if (e.key === "Escape") {
      if (window.Irem.Modal && window.Irem.Modal.isActive && window.Irem.Modal.isActive()) {
        window.Irem.Modal.close();
        return;
      }
      if (els.siteHeader && els.siteHeader.classList.contains("is-nav-open")) {
        if (window.Irem.Nav) window.Irem.Nav.setNavOpen(false);
        if (els.navToggle) els.navToggle.focus();
      }
      return;
    }
    if (window.Irem.Modal && window.Irem.Modal.isActive && window.Irem.Modal.isActive()) {
      window.Irem.Modal.trapFocus(e);
      return;
    }
    if (window.Irem.Nav) window.Irem.Nav.trapNavFocus(e);
  }

  function onLangChange() {
    if (window.Irem.I18n) window.Irem.I18n.apply(document);
    applyTheme(root.getAttribute("data-theme") === THEME_DARK ? THEME_DARK : THEME_LIGHT);
    var soundToggle = document.getElementById("soundToggle");
    if (soundToggle) {
      var on = soundToggle.classList.contains("is-sound-on");
      soundToggle.setAttribute("aria-label", t(on ? "sound.on" : "sound.off"));
      soundToggle.setAttribute("title", t(on ? "sound.on" : "sound.off"));
    }
  }

  function bindHandlers() {
    if (handlersBound) return;
    handlersBound = true;
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeydown);
    document.addEventListener("amigura:langchange", onLangChange);
    window.addEventListener("pageshow", ensurePageReady);
  }

  function init() {
    if (initialized) return;
    if (body.dataset.page !== "ozel") return;
    initialized = true;
    initModules();
    ensurePageReady();
    refreshElements();
    bindHandlers();
    if (window.Irem.I18n) window.Irem.I18n.apply(document);
    applyTheme(getPreferredTheme());
    if (window.Irem.Cookie) window.Irem.Cookie.ensureCookieBanner();
  }

  document.addEventListener("amigura:ready", init, { once: true });
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      if (!initialized) init();
    },
    { once: true }
  );
})();
