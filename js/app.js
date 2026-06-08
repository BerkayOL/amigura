/**
 * Amigura — Theme, home sections, products orchestration
 */
(function () {
  "use strict";

  const STORAGE_KEY = "amigura-theme";
  const THEME_LIGHT = "light";
  const THEME_DARK = "dark";

  const root = document.documentElement;
  const body = document.body;

  const Utils = function () {
    return window.Irem && window.Irem.Utils;
  };

  function t(key, vars) {
    const u = Utils();
    return u ? u.t(key, vars) : key;
  }

  function escapeHtml(str) {
    const u = Utils();
    return u ? u.escapeHtml(str) : String(str);
  }

  function getConfig() {
    return window.Amigura && window.Amigura.Config;
  }

  /** @type {ReturnType<typeof cacheElements>} */
  let els = null;

  let initialized = false;
  let productsRendered = false;
  let globalHandlersBound = false;
  /** @type {MediaQueryList | null} */
  let mqDark = null;
  /** @type {MediaQueryList | null} */
  let mqDesktop = null;

  function cacheElements() {
    return {
      toggle: document.getElementById("themeToggle"),
      toggleLabel: document.querySelector("#themeToggle .theme-toggle__label"),
      productContainer: document.getElementById("product-container"),
      siteHeader: document.getElementById("siteHeader"),
      navToggle: document.getElementById("navToggle"),
      navClose: document.getElementById("navClose"),
      siteNav: document.getElementById("siteNav"),
      navBackdrop: document.getElementById("navBackdrop"),
      main: document.getElementById("main"),
      modalRoot: document.getElementById("irem-modal-root"),
      cookieRoot: document.getElementById("irem-cookie-root"),
      newsletterForm: document.getElementById("newsletter-form"),
      newsletterSuccess: document.getElementById("newsletter-success"),
      newsletterSection: document.getElementById("newsletter"),
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
    const deps = {
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
    const color = theme === THEME_DARK ? "#141820" : "#f8f6f3";
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
      meta.setAttribute("content", color);
    });
  }

  function applyTheme(theme) {
    const isDark = theme === THEME_DARK;
    root.setAttribute("data-theme", theme);
    updateThemeColorMeta(theme);
    refreshElements();

    if (els.toggle) {
      els.toggle.setAttribute("aria-pressed", String(isDark));
      els.toggle.setAttribute("aria-label", isDark ? t("theme.toLight") : t("theme.toDark"));
    }
    if (els.toggleLabel) {
      els.toggleLabel.textContent = isDark ? t("theme.dark") : t("theme.light");
    }
  }

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === THEME_LIGHT || stored === THEME_DARK) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? THEME_DARK : THEME_LIGHT;
  }

  function onThemeToggleClick() {
    const current = root.getAttribute("data-theme") || THEME_LIGHT;
    const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  function onSystemThemeChange(e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
    }
  }

  function onDesktopBreakpoint(e) {
    if (e.matches && window.Irem.Nav) window.Irem.Nav.setNavOpen(false);
  }

  function renderProducts() {
    refreshElements();
    if (!els.productContainer || !window.Irem.ProductCard) return;
    window.Irem.ProductCard.renderInto(els.productContainer);
    productsRendered = true;
  }

  function onLangChange() {
    refreshElements();
    if (window.Irem.I18n) window.Irem.I18n.apply(document);
    applyTheme(root.getAttribute("data-theme") === THEME_DARK ? THEME_DARK : THEME_LIGHT);

    const soundToggle = document.getElementById("soundToggle");
    if (soundToggle) {
      const on = soundToggle.classList.contains("is-sound-on");
      soundToggle.setAttribute("aria-label", t(on ? "sound.on" : "sound.off"));
      soundToggle.setAttribute("title", t(on ? "sound.on" : "sound.off"));
    }

    if (els.productContainer && window.Irem.ProductCard) {
      if (productsRendered) {
        window.Irem.ProductCard.updateTextsInPlace(els.productContainer);
      } else {
        renderProducts();
        initProductScrollReveal();
      }
    }
    const closeBtn = document.querySelector(".modal-panel__close");
    if (closeBtn) closeBtn.setAttribute("aria-label", t("modal.close"));
    if (window.Irem.Cookie) window.Irem.Cookie.ensureCookieBanner();
  }

  function revealCardsAlreadyVisible(cards) {
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      if (card.classList.contains("fade-in-up")) continue;
      const rect = card.getBoundingClientRect();
      if (rect.top < viewportH * 0.92 && rect.bottom > 0) {
        card.classList.add("fade-in-up");
      }
    }
  }

  function observeProductCards(cards) {
    if (!cards.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach(function (c) {
        c.classList.add("fade-in-up");
      });
      return;
    }
    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (c) {
        c.classList.add("fade-in-up");
      });
      return;
    }
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("fade-in-up");
          observer.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: "0px 0px -4% 0px", threshold: 0.01 }
    );
    cards.forEach(function (c) {
      observer.observe(c);
    });
    requestAnimationFrame(function () {
      revealCardsAlreadyVisible(cards);
    });
  }

  function initProductScrollReveal() {
    refreshElements();
    if (!els.productContainer) return;
    const cards = Array.from(els.productContainer.querySelectorAll(".product-card"));
    observeProductCards(cards);
  }

  /**
   * @param {SubmitEvent} e
   */
  function onDocumentSubmit(e) {
    const form = e.target;
    if (!(form instanceof HTMLFormElement) || form.id !== "newsletter-form") return;
    e.preventDefault();
    refreshElements();

    const emailInput = form.querySelector("#newsletter-email");
    if (!(emailInput instanceof HTMLInputElement)) return;
    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    const email = emailInput.value.trim();
    const cfg = getConfig();
    const newsletterCfg = (cfg && cfg.newsletter) || { mode: "mailto" };
    const brandEmail = getBrandEmailAddress();

    if (newsletterCfg.mode === "api" && typeof fetch === "function") {
      const endpoint = newsletterCfg.endpoint || "/api/newsletter";
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, source: "amigura-vitrin" }),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Newsletter API " + res.status);
          showNewsletterSuccess();
        })
        .catch(function () {
          openNewsletterMailto(brandEmail, email);
          showNewsletterSuccess();
        });
      return;
    }

    openNewsletterMailto(brandEmail, email);
    showNewsletterSuccess();
  }

  function showNewsletterSuccess() {
    if (els.newsletterSection) els.newsletterSection.classList.add("is-submitted");
    if (els.newsletterSuccess) els.newsletterSuccess.hidden = false;
  }

  function openNewsletterMailto(brandEmail, email) {
    if (!brandEmail) return;
    const subject = encodeURIComponent(t("newsletter.mailtoSubject"));
    const body = encodeURIComponent(t("newsletter.mailtoBody", { email: email }));
    window.location.href = "mailto:" + brandEmail + "?subject=" + subject + "&body=" + body;
  }

  function getBrandEmailAddress() {
    const cfg = getConfig();
    const parts = cfg && cfg.brandEmailParts ? cfg.brandEmailParts : null;
    if (parts && parts.length >= 3) return parts[0] + "@" + parts[1] + "." + parts[2];
    return "";
  }

  function buildWhatsappLink() {
    const cfg = getConfig();
    const parts = cfg && cfg.whatsappParts ? cfg.whatsappParts : null;
    const number = parts && parts.length ? parts.join("") : "";
    const digits = number.replace(/[^\d]/g, "");
    if (!digits) return "https://wa.me/";
    return "https://wa.me/" + digits;
  }

  function bindContactLinkAssembly() {
    document.addEventListener(
      "click",
      function (e) {
        const target = /** @type {HTMLElement} */ (e.target);
        const emailLink = target.closest('[data-contact-email], [data-contact-type="email"].protected-contact');
        if (emailLink instanceof HTMLAnchorElement) {
          e.preventDefault();
          const address = getBrandEmailAddress();
          if (!address) return;
          window.location.href = "mailto:" + address;
        }
      },
      true
    );
  }

  function initProcessTimeline() {
    const track = document.getElementById("process-timeline");
    if (!track) return;
    const steps = track.querySelectorAll("[data-process-step]");
    const lineFill = document.getElementById("process-line-fill");
    const stepCount = steps.length;
    if (!stepCount) return;

    function setLineProgress() {
      let visible = 0;
      for (let i = 0; i < steps.length; i++) {
        if (steps[i].classList.contains("is-visible")) visible++;
      }
      const pct = Math.round((visible / stepCount) * 100);
      if (lineFill instanceof HTMLElement) {
        lineFill.style.setProperty("--line-progress", pct + "%");
      }
      if (visible >= stepCount) track.classList.add("is-complete");
    }

    function revealAll() {
      track.classList.add("is-complete");
      for (let i = 0; i < steps.length; i++) steps[i].classList.add("is-visible");
      if (lineFill instanceof HTMLElement) lineFill.style.setProperty("--line-progress", "100%");
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return;
    }
    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
        setLineProgress();
      },
      { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.25 }
    );

    for (let j = 0; j < steps.length; j++) observer.observe(steps[j]);

    requestAnimationFrame(function () {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (let k = 0; k < steps.length; k++) {
        const rect = steps[k].getBoundingClientRect();
        if (rect.top < vh * 0.88 && rect.bottom > 0) {
          steps[k].classList.add("is-visible");
          observer.unobserve(steps[k]);
        }
      }
      setLineProgress();
    });
  }

  function initHomeSections() {
    initProcessTimeline();
  }

  function ensureStickyConversionBar() {
    if (document.body.dataset.page !== "home") return;
    if (document.querySelector(".sticky-convert")) return;

    const bar = document.createElement("div");
    bar.className = "sticky-convert";
    bar.innerHTML =
      '<div class="sticky-convert__inner glass-surface">' +
      '<a class="sticky-convert__cta btn-primary" href="ozel-siparis.html">' +
      '<span data-i18n="sticky_order">Özel Sipariş</span>' +
      "</a>" +
      '<a class="sticky-convert__support" href="' +
      buildWhatsappLink() +
      '" target="_blank" rel="noopener noreferrer" data-i18n-aria="sticky_whatsapp" data-i18n-title="sticky_whatsapp" aria-label="WhatsApp Destek" title="WhatsApp Destek">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">' +
      '<path d="M21 11.5a8.5 8.5 0 1 1-4.1-7.3"/>' +
      '<path d="M22 4 12 14l-3-3"/>' +
      '</svg><span class="visually-hidden" data-i18n="sticky_whatsapp">WhatsApp Destek</span></a>' +
      "</div>";
    document.body.appendChild(bar);
    if (window.Irem && window.Irem.I18n) window.Irem.I18n.apply(bar);

    const hero = document.getElementById("hero");
    if (!hero) return;

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        function (entries) {
          const entry = entries[0];
          const show = !!entry && entry.isIntersecting === false;
          document.body.classList.toggle("is-sticky-convert-visible", show);
        },
        { root: null, threshold: 0, rootMargin: "-12% 0px 0px 0px" }
      );
      io.observe(hero);
      return;
    }

    function onScroll() {
      const rect = hero.getBoundingClientRect();
      const show = rect.bottom < (window.innerHeight || document.documentElement.clientHeight) * 0.88;
      document.body.classList.toggle("is-sticky-convert-visible", show);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function ensureMainVisible() {
    if (window.Irem.Nav && window.Irem.Nav.resetNav) {
      window.Irem.Nav.resetNav();
    } else {
      const main = document.getElementById("main");
      if (main) main.removeAttribute("inert");
      body.classList.remove("is-modal-open", "is-nav-open");
      const header = document.getElementById("siteHeader");
      if (header) header.classList.remove("is-nav-open");
      const backdrop = document.getElementById("navBackdrop");
      if (backdrop) backdrop.hidden = true;
    }
    if (!window.Irem.Nav && window.Irem.Modal && window.Irem.Modal.forceReset) {
      window.Irem.Modal.forceReset();
    } else if (window.Irem.Modal && window.Irem.Modal.isActive && window.Irem.Modal.isActive()) {
      window.Irem.Modal.close();
    }
  }

  function onDocumentClick(e) {
    const target = /** @type {HTMLElement} */ (e.target);

    const langBtn = target.closest(".lang-switch__btn");
    if (langBtn instanceof HTMLButtonElement) {
      const lang = langBtn.getAttribute("data-lang");
      if ((lang === "tr" || lang === "en") && window.Irem.I18n) {
        window.Irem.I18n.setLang(lang);
      }
      return;
    }

    if (target.closest("#themeToggle")) {
      onThemeToggleClick();
      return;
    }

    if (target.closest("#navToggle")) {
      refreshElements();
      const isOpen = els.siteHeader?.classList.contains("is-nav-open");
      if (window.Irem.Nav) window.Irem.Nav.setNavOpen(!isOpen);
      return;
    }

    if (target.closest("#navClose")) {
      if (window.Irem.Nav) window.Irem.Nav.setNavOpen(false);
      els.navToggle?.focus();
      return;
    }

    if (target.closest("#navBackdrop")) {
      if (window.Irem.Nav) window.Irem.Nav.setNavOpen(false);
      return;
    }

    const navPageLink = target.closest(".glass-nav a[href]");
    if (navPageLink instanceof HTMLAnchorElement) {
      if (window.Irem.Nav) window.Irem.Nav.resetNav();
    }

    if (window.Irem.Cookie && window.Irem.Cookie.handleConsentClick(target)) return;
    if (window.Irem.Modal && window.Irem.Modal.handleClick(target)) {
      e.preventDefault();
      return;
    }

    const careBtn = target.closest(".product-card__care");
    if (careBtn instanceof HTMLElement && window.Irem.Products && window.Irem.Modal) {
      e.preventDefault();
      const card = careBtn.closest(".product-card");
      const id = card?.getAttribute("data-product-id");
      const product = window.Irem.Products.getById(Number(id));
      if (product) window.Irem.Modal.openCare(product, careBtn);
      return;
    }

    const intentBtn = target.closest(".product-card__intent-btn");
    if (intentBtn instanceof HTMLButtonElement && window.Irem.ProductCard) {
      const card = intentBtn.closest(".product-card");
      const intent = intentBtn.getAttribute("data-intent");
      if (card instanceof HTMLElement && (intent === "self" || intent === "gift")) {
        window.Irem.ProductCard.setIntent(card, intent);
      }
      return;
    }

    if (
      target.closest(".product-card__open, .pdp-similar-card, a[href*='urun.html']")
    ) {
      return;
    }
  }

  function onDocumentKeydown(e) {
    refreshElements();
    if (e.key === "Escape") {
      if (window.Irem.Modal && window.Irem.Modal.isActive()) {
        window.Irem.Modal.close();
        return;
      }
      if (els.siteHeader?.classList.contains("is-nav-open")) {
        if (window.Irem.Nav) window.Irem.Nav.setNavOpen(false);
        els.navToggle?.focus();
      }
      return;
    }
    if (window.Irem.Modal && window.Irem.Modal.isActive()) {
      window.Irem.Modal.trapFocus(e);
      return;
    }
    if (window.Irem.Nav) window.Irem.Nav.trapNavFocus(e);
  }

  function bindGlobalHandlers() {
    if (globalHandlersBound) return;
    globalHandlersBound = true;
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeydown);
    document.addEventListener("submit", onDocumentSubmit);

    // Outbound performance hint: warm up the handoff origin on intent.
    const warmed = new Set();
    function warmOriginFromLink(el) {
      if (!(el instanceof HTMLAnchorElement)) return;
      const href = el.getAttribute("href");
      if (!href) return;
      try {
        const u = new URL(href, window.location.href);
        if (u.protocol !== "https:") return;
        const origin = u.origin;
        if (warmed.has(origin)) return;
        warmed.add(origin);

        const preconnect = document.createElement("link");
        preconnect.rel = "preconnect";
        preconnect.href = origin;
        preconnect.crossOrigin = "";

        const dns = document.createElement("link");
        dns.rel = "dns-prefetch";
        dns.href = origin;

        document.head && document.head.appendChild(dns);
        document.head && document.head.appendChild(preconnect);
      } catch {
        return;
      }
    }

    document.addEventListener(
      "mouseover",
      function (e) {
        const a = e.target && e.target.closest ? e.target.closest(".product-card__buy") : null;
        if (a instanceof HTMLAnchorElement) warmOriginFromLink(a);
      },
      { passive: true, capture: true }
    );
    document.addEventListener(
      "focusin",
      function (e) {
        const a = e.target && e.target.closest ? e.target.closest(".product-card__buy") : null;
        if (a instanceof HTMLAnchorElement) warmOriginFromLink(a);
      },
      true
    );

    mqDark = window.matchMedia("(prefers-color-scheme: dark)");
    mqDark.addEventListener("change", onSystemThemeChange);
    mqDesktop = window.matchMedia("(min-width: 769px)");
    mqDesktop.addEventListener("change", onDesktopBreakpoint);
    window.addEventListener("pageshow", function () {
      ensureMainVisible();
      if (window.Irem.Modal && window.Irem.Modal.isActive()) window.Irem.Modal.close();
    });
  }

  function init() {
    if (initialized) return;
    initialized = true;
    initModules();
    ensureMainVisible();
    refreshElements();
    bindGlobalHandlers();
    bindContactLinkAssembly();
    if (window.Irem.I18n) window.Irem.I18n.apply(document);
    applyTheme(getPreferredTheme());
    if (window.Irem.Cookie) window.Irem.Cookie.ensureCookieBanner();
    document.addEventListener("amigura:langchange", onLangChange);

    if (els.productContainer && !productsRendered) renderProducts();
    if (els.productContainer) {
      initProductScrollReveal();
      initProcessTimeline();
      ensureStickyConversionBar();
    }
  }

  function boot() {
    document.addEventListener("amigura:ready", init, { once: true });
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        if (!initialized) init();
      },
      { once: true }
    );
  }

  boot();
})();
