/**
 * Amigurumirem - Brand mark and wordmark
 */
(function () {
  "use strict";

  /** @type {{ displayName: string; namePrefix: string; nameAccent: string; logos: { src: string; type: string }[]; logoSize: number }} */
  var BRAND = {
    displayName: "Amigurumirem",
    namePrefix: "Amigurum",
    nameAccent: "\u0130rem",
    logos: [
      { src: "assets/logo.webp", type: "image/webp" },
      { src: "assets/logo.png", type: "image/png" },
    ],
    logoSize: 52,
  };

  /**
   * @param {string} href
   * @returns {string}
   */
  function renderNavBrand(href) {
    var fallback = BRAND.logos[BRAND.logos.length - 1];
    var sources = BRAND.logos
      .map(function (logo) {
        return '<source srcset="' + logo.src + '" type="' + logo.type + '">';
      })
      .join("");

    return (
      '<a href="' +
      href +
      '" class="site-brand" data-i18n-aria="nav.home">' +
      '<span class="site-brand__mark" aria-hidden="true">' +
      '<picture class="site-brand__picture">' +
      sources +
      '<img class="site-brand__logo" src="' +
      fallback.src +
      '" alt="" width="' +
      BRAND.logoSize +
      '" height="' +
      BRAND.logoSize +
      '" decoding="async" fetchpriority="high">' +
      "</picture></span>" +
      '<span class="site-brand__wordmark">' +
      '<span class="site-brand__name" aria-hidden="true">' +
      '<span class="site-brand__name-rest">' +
      BRAND.namePrefix +
      "</span>" +
      '<span class="site-brand__name-accent">' +
      BRAND.nameAccent +
      "</span></span>" +
      '<span class="site-brand__tagline" data-i18n="nav.brandTagline">El Yap\u0131m\u0131 At\u00f6lye</span>' +
      "</span></a>"
    );
  }

  window.Irem = window.Irem || {};
  window.Irem.Brand = {
    config: BRAND,
    renderNav: renderNavBrand,
  };
})();
