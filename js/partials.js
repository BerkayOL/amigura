/**
 * Amigura — Shared header and footer injection (DRY layout).
 */
(function () {
  "use strict";

  /**
   * @returns {"home" | "kvkk" | "iade" | "tesekkur" | "ozel" | "product"}
   */
  function getPageType() {
    const page = document.body.dataset.page;
    if (
      page === "kvkk" ||
      page === "iade" ||
      page === "tesekkur" ||
      page === "ozel" ||
      page === "product"
    ) {
      return page;
    }
    return "home";
  }

  /**
   * @param {string} hash
   * @param {"home" | "kvkk" | "iade" | "tesekkur" | "ozel"} page
   */
  function navHref(hash, page) {
    return page === "home" ? hash : "index.html" + hash;
  }

  function getInstagramUrl() {
    if (window.Amigura && window.Amigura.Config && window.Amigura.Config.instagramUrl) {
      return window.Amigura.Config.instagramUrl;
    }
    return "https://www.instagram.com/amigurumi__rem";
  }

  function renderInstagramIcon() {
    return (
      '<svg class="nav-social__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="2" y="2" width="20" height="20" rx="5"/>' +
      '<circle cx="12" cy="12" r="4"/>' +
      '<path d="M17.5 6.5h.01"/>' +
      "</svg>"
    );
  }

  /**
   * @param {string} className
   * @param {boolean} [showLabel]
   */
  function renderInstagramLink(className, showLabel) {
    var labelMarkup = showLabel
      ? '<span data-i18n="nav.instagram">Instagram</span>'
      : '<span class="visually-hidden" data-i18n="nav.instagram">Instagram</span>';

    return (
      '<a href="' +
      getInstagramUrl() +
      '" class="' +
      className +
      '" target="_blank" rel="noopener noreferrer" data-i18n-aria="nav.instagram" data-i18n-title="nav.instagram">' +
      renderInstagramIcon() +
      labelMarkup +
      "</a>"
    );
  }

  /**
   * @param {"home" | "kvkk" | "iade" | "tesekkur" | "ozel"} page
   */
  function renderHeader(page) {
    const products = navHref("#products", page);
    const about = navHref("#about", page);
    const contact = navHref("#contact", page);
    const ozelCurrent = page === "ozel" ? ' aria-current="page"' : "";
    const brandHref = page === "home" ? "index.html#hero" : "index.html";
    const brandMarkup =
      window.Irem && window.Irem.Brand
        ? window.Irem.Brand.renderNav(brandHref)
        : '<a href="' + brandHref + '" class="site-brand" data-i18n-aria="nav.home">Amigurumirem</a>';

    return `
      <header class="glass-nav" id="siteHeader" role="banner">
        <div class="glass-nav__bar glass-surface">
          <div class="glass-nav__inner">
            ${brandMarkup}

            <nav class="glass-nav__links glass-nav__links--desktop" data-i18n-aria="nav.menuLabel">
              <a href="${products}" class="glass-nav__link" data-i18n="nav.collection">Koleksiyon</a>
              <a href="ozel-siparis.html" class="glass-nav__link"${ozelCurrent} data-i18n="nav.custom">Özel Sipariş</a>
              <a href="${about}" class="glass-nav__link" data-i18n="nav.about">Hakkımızda</a>
              <a href="${contact}" class="glass-nav__link" data-i18n="nav.contact">İletişim</a>
            </nav>

            <div class="glass-nav__controls">
              ${renderInstagramLink("nav-social glass-surface")}

              <div class="lang-switch" role="group" data-i18n-aria="lang.label">
                <button type="button" class="lang-switch__btn is-active" data-lang="tr" aria-pressed="true">TR</button>
                <button type="button" class="lang-switch__btn" data-lang="en" aria-pressed="false">EN</button>
              </div>

              <button
                type="button"
                class="theme-toggle"
                id="themeToggle"
                data-i18n-aria="theme.toDark"
                aria-pressed="false"
              >
                <span class="theme-toggle__track" aria-hidden="true">
                  <span class="theme-toggle__thumb"></span>
                </span>
                <span class="theme-toggle__label" data-i18n="theme.light">Açık</span>
              </button>

              <button
                type="button"
                class="nav-toggle"
                id="navToggle"
                aria-controls="siteNav"
                aria-expanded="false"
                data-i18n-aria="nav.openMenu"
              >
                <span class="nav-toggle__bars" aria-hidden="true">
                  <span class="nav-toggle__bar"></span>
                  <span class="nav-toggle__bar"></span>
                  <span class="nav-toggle__bar"></span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div class="glass-nav__backdrop glass-scrim" id="navBackdrop" hidden aria-hidden="true"></div>

        <nav class="glass-nav__panel glass-surface" id="siteNav" data-i18n-aria="nav.menuMobile" aria-hidden="true" inert>
          <div class="glass-nav__drawer-head">
            <p class="glass-nav__drawer-label" data-i18n="nav.menuLabel">Ana menü</p>
            <button type="button" class="glass-nav__close" id="navClose" data-i18n-aria="nav.closeMenu">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="glass-nav__drawer-body">
            <a href="${products}" class="glass-nav__drawer-link glass-nav__link" data-i18n="nav.collection">Koleksiyon</a>
            <a href="ozel-siparis.html" class="glass-nav__drawer-link glass-nav__link"${ozelCurrent} data-i18n="nav.custom">Özel Sipariş</a>
            <a href="${about}" class="glass-nav__drawer-link glass-nav__link" data-i18n="nav.about">Hakkımızda</a>
            <a href="${contact}" class="glass-nav__drawer-link glass-nav__link" data-i18n="nav.contact">İletişim</a>
          </div>
        </nav>
      </header>
    `;
  }

  /**
   * @param {"home" | "kvkk" | "iade" | "tesekkur" | "ozel"} page
   */
  function renderFooter(page) {
    const kvkkCurrent = page === "kvkk" ? ' aria-current="page"' : "";
    const iadeCurrent = page === "iade" ? ' aria-current="page"' : "";

    return `
      <footer class="site-footer" role="contentinfo">
        <div class="site-footer__inner">
          <nav class="site-footer__nav" data-i18n-aria="footer.socialNav">
            ${renderInstagramLink("site-footer__link site-footer__link--ig", true)}
            <a href="https://www.etsy.com/shop/amigura" class="site-footer__link" target="_blank" rel="noopener noreferrer">Etsy</a>
            <a href="#" class="site-footer__link" data-contact-email data-i18n="footer.email">E-posta</a>
          </nav>
          <nav class="site-footer__legal" data-i18n-aria="footer.legalNav">
            <a href="kvkk-gizlilik.html" class="site-footer__link"${kvkkCurrent} data-i18n="footer.kvkk">KVKK ve Gizlilik</a>
            <a href="iade-sartlari.html" class="site-footer__link"${iadeCurrent} data-i18n="footer.returns">İptal ve İade Koşulları</a>
          </nav>
          <button
            type="button"
            class="sound-toggle glass-surface"
            id="soundToggle"
            aria-pressed="false"
            data-i18n-aria="sound.off"
            data-i18n-title="sound.off"
            title="Atölye sesleri (kapalı)"
          >
            <svg class="sound-toggle__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path class="sound-toggle__wave" d="M11 5 6 9 3 9v6h3l5 4V5z"/>
              <path class="sound-toggle__slash" d="M16 8 9 16"/>
            </svg>
            <span class="sound-toggle__label" data-i18n="sound.label">Ses</span>
          </button>
          <p class="site-footer__copy"><span class="site-footer__mark" aria-hidden="true">©</span> <span data-i18n="footer.copy">2026 Amigurumirem. T\u00fcm haklar\u0131 sakl\u0131d\u0131r.</span></p>
        </div>
      </footer>
    `;
  }

  function injectPartials() {
    var headerMount = document.getElementById("site-header");
    var footerMount = document.getElementById("site-footer");
    if (!headerMount || !footerMount) return Promise.resolve();

    var page = getPageType();
    headerMount.outerHTML = renderHeader(page);
    footerMount.outerHTML = renderFooter(page);
    return Promise.resolve();
  }

  function bootstrap() {
    injectPartials();
    if (window.Irem && window.Irem.Nav && window.Irem.Nav.resetNav) {
      window.Irem.Nav.resetNav();
    } else {
      document.body.classList.remove("is-nav-open", "is-modal-open");
      var main = document.getElementById("main");
      if (main) main.removeAttribute("inert");
      var backdrop = document.getElementById("navBackdrop");
      if (backdrop) backdrop.hidden = true;
    }
    if (window.Irem && window.Irem.I18n) {
      window.Irem.I18n.apply(document);
    }
    if (typeof window.AmiguraPageUnlock === "function") {
      window.AmiguraPageUnlock();
    }
    document.dispatchEvent(
      new CustomEvent("amigura:ready", { bubbles: true })
    );
    if (typeof window.AmiguraPageUnlock === "function") {
      window.requestAnimationFrame(window.AmiguraPageUnlock);
    }
  }

  document.addEventListener("DOMContentLoaded", bootstrap);
})();
