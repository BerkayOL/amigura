/**
 * Amigura ? Product detail page (premium PDP)
 */
(function () {
  "use strict";

  /** @type {{ product: object | null, stickyIo: IntersectionObserver | null, bound: boolean, ready: boolean }} */
  var pdpState = {
    product: null,
    stickyIo: null,
    bound: false,
    ready: false,
  };

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $$(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getBrandName() {
    if (window.Irem && window.Irem.Brand && window.Irem.Brand.config && window.Irem.Brand.config.displayName) {
      return window.Irem.Brand.config.displayName;
    }
    return "Amigurumirem";
  }

  function getParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch {
      return null;
    }
  }

  function getI18n() {
    return window.Irem && window.Irem.I18n ? window.Irem.I18n : null;
  }

  function t(key, vars) {
    const I = getI18n();
    return I && I.t ? I.t(key, vars) : key;
  }

  function getIntentFromUrl() {
    return getParam("intent") === "gift" ? "gift" : "self";
  }

  function setUrlIntent(intent) {
    try {
      const u = new URL(window.location.href);
      u.searchParams.set("intent", intent);
      window.history.replaceState({}, "", u.toString());
    } catch {
      return;
    }
  }

  function pdpUrl(id, intent) {
    return (
      "urun.html?id=" +
      encodeURIComponent(String(id)) +
      "&intent=" +
      encodeURIComponent(intent === "gift" ? "gift" : "self")
    );
  }

  function getSiteOrigin() {
    const cfg = window.Amigura && window.Amigura.Config;
    const origin = (cfg && cfg.siteOrigin) || window.location.origin;
    return String(origin).replace(/\/$/, "");
  }

  function ensureMeta(attr, key, value) {
    let el = document.querySelector("meta[" + attr + '="' + key + '"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  }

  /**
   * @param {ReturnType<window.Irem.Products.getById>} product
   */
  function updateProductMeta(product) {
    const origin = getSiteOrigin();
    const url = origin + "/urun.html?id=" + encodeURIComponent(String(product.id));
    const imagePath = product.imageFallback || product.image;
    const image = /^https?:\/\//i.test(imagePath) ? imagePath : origin + "/" + imagePath.replace(/^\//, "");
    const title = product.name + " | " + getBrandName();

    document.title = title;
    ensureMeta("name", "description", product.description);
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", product.description);
    ensureMeta("property", "og:url", url);
    ensureMeta("property", "og:image", image);
    ensureMeta("property", "og:type", "product");
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:image", image);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const priceDigits = String(product.price || "").replace(/[^\d]/g, "");
    const ld = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: image,
      offers: {
        "@type": "Offer",
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock",
      },
    };
    if (priceDigits) ld.offers.price = priceDigits;

    let script = document.getElementById("pdp-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "pdp-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ld);
  }

  function buildHeroImageHtml(product, alt) {
    const webp = product.image;
    const jpg = product.imageFallback || product.image;
    if (webp && jpg && webp !== jpg && /\.webp$/i.test(webp)) {
      return (
        "<picture>" +
        '<source srcset="' +
        escapeHtml(webp) +
        '" type="image/webp">' +
        '<img class="pdp-gallery__hero" id="pdp-hero-img" src="' +
        escapeHtml(jpg) +
        '" alt="' +
        alt +
        '" width="900" height="1200" loading="eager" decoding="async" fetchpriority="high">' +
        "</picture>"
      );
    }
    return (
      '<img class="pdp-gallery__hero" id="pdp-hero-img" src="' +
      escapeHtml(jpg || webp) +
      '" alt="' +
      alt +
      '" width="900" height="1200" loading="eager" decoding="async" fetchpriority="high">'
    );
  }

  const ICON_HAND =
    '<svg class="pdp-bullet__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12"/><path d="M11 12V4.5a1.5 1.5 0 0 1 3 0V12"/><path d="M14 12V6.5a1.5 1.5 0 0 1 3 0V14"/><path d="M8 13l-2 2.5a4 4 0 0 0 3.2 6.5H14a5 5 0 0 0 5-5v-3"/></svg>';
  const ICON_LEAF =
    '<svg class="pdp-bullet__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';
  const ICON_LOCK =
    '<svg class="pdp-bullet__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
  const ICON_DOC =
    '<svg class="pdp-bullet__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/></svg>';
  const ICON_PACKAGE =
    '<svg class="pdp-trust-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>';
  const ICON_GIFT =
    '<svg class="pdp-gift-banner__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M12 8v13"/><path d="M3 12h18"/><path d="M12 8H7.5a2.5 2.5 0 1 1 0-5C11 3 12 8 12 8z"/><path d="M12 8h4.5a2.5 2.5 0 0 0 0-5C13 3 12 8 12 8z"/></svg>';
  const ICON_RULER =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 12h20"/><path d="M6 12v4"/><path d="M10 12v2"/><path d="M14 12v4"/><path d="M18 12v2"/></svg>';
  const ICON_SHIELD =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 2 20 6v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4z"/><path d="m9 12 2 2 4-4"/></svg>';

  function renderTrustStack() {
    const items = [
      { icon: ICON_PACKAGE, text: t("pdp.deliveryNote") },
      { icon: ICON_HAND, text: t("pdp.handmadeNote") },
    ];
    return (
      '<div class="pdp-trust-stack pdp-float" role="group" aria-label="' +
      escapeHtml(t("trust.label")) +
      '">' +
      '<div class="pdp-trust-stack__head">' +
      '<span class="pdp-trust-stack__head-ico" aria-hidden="true">' +
      ICON_SHIELD +
      "</span>" +
      '<div class="pdp-trust-stack__head-txt">' +
      '<p class="pdp-trust-stack__title">' +
      escapeHtml(t("pdp.trustHeading")) +
      "</p>" +
      '<p class="pdp-trust-stack__sub">' +
      escapeHtml(t("pdp.trustSub")) +
      "</p></div></div>" +
      '<ul class="pdp-trust-stack__list">' +
      items
        .map(function (item) {
          return (
            '<li class="pdp-trust-item">' +
            '<span class="pdp-trust-item__ico">' +
            item.icon +
            "</span>" +
            '<span class="pdp-trust-item__text">' +
            escapeHtml(item.text) +
            "</span></li>"
          );
        })
        .join("") +
      "</ul></div>"
    );
  }

  function renderHighlightBullets() {
    const rows = [
      { icon: ICON_HAND, text: t("trust.handmade") },
      { icon: ICON_LEAF, text: t("trust.organic") },
      { icon: ICON_LOCK, text: t("trust.instagram") },
      { icon: ICON_DOC, text: t("trust.kvkk") },
    ];
    return (
      '<ul class="pdp-bullets">' +
      rows
        .map(function (row) {
          return (
            "<li><span class=\"pdp-bullet__ico\">" +
            row.icon +
            '</span><span class="pdp-bullet__text">' +
            escapeHtml(row.text) +
            "</span></li>"
          );
        })
        .join("") +
      "</ul>"
    );
  }

  /**
   * @param {string} title
   * @param {string} bodyHtml
   * @param {boolean} open
   * @param {string=} id
   */
  function renderAccordion(title, bodyHtml, open, id) {
    return (
      '<details class="pdp-acc pdp-float"' +
      (id ? ' id="' + escapeHtml(id) + '"' : "") +
      (open ? " open" : "") +
      ">" +
      '<summary class="pdp-acc__sum">' +
      '<span class="pdp-acc__sum-text">' +
      escapeHtml(title) +
      "</span>" +
      '<span class="pdp-acc__chev" aria-hidden="true"></span>' +
      "</summary>" +
      '<div class="pdp-acc__collapse"><div class="pdp-acc__body">' +
      bodyHtml +
      "</div></div></details>"
    );
  }

  /**
   * @param {ReturnType<window.Irem.Products.getById>} current
   */
  function renderSimilar(current) {
    if (!window.Irem || !window.Irem.Products) return "";
    const others =
      typeof window.Irem.Products.getSimilar === "function"
        ? window.Irem.Products.getSimilar(current.id, 4)
        : window.Irem.Products.getAll().filter(function (p) {
            return p.id !== current.id;
          }).slice(0, 4);
    if (!others.length) return "";

    const cards = others
      .map(function (p) {
        return (
          '<a class="pdp-similar-card pdp-float" href="' +
          escapeHtml(pdpUrl(p.id, "self")) +
          '">' +
          '<div class="pdp-similar-card__media">' +
          '<img src="' +
          escapeHtml(p.thumbnail || p.image) +
          '" alt="' +
          escapeHtml(t("product.alt", { name: p.name })) +
          '" width="320" height="320" loading="lazy" decoding="async" data-fallback="' +
          escapeHtml(p.thumbnailFallback || p.imageFallback || p.image) +
          '">' +
          "</div>" +
          '<div class="pdp-similar-card__body">' +
          '<p class="pdp-similar-card__title">' +
          escapeHtml(p.name) +
          "</p>" +
          '<p class="pdp-similar-card__price">' +
          escapeHtml(p.price) +
          "</p>" +
          "</div></a>"
        );
      })
      .join("");

    return (
      '<section class="pdp-similar" aria-labelledby="pdp-similar-title">' +
      '<header class="pdp-similar__head">' +
      '<h2 id="pdp-similar-title" class="pdp-similar__title">' +
      escapeHtml(t("pdp.similarTitle")) +
      "</h2>" +
      '<p class="pdp-similar__lead">' +
      escapeHtml(t("pdp.similarLead")) +
      "</p></header>" +
      '<div class="pdp-similar__grid">' +
      cards +
      "</div></section>"
    );
  }

  function renderNotFound(root) {
    root.innerHTML =
      '<section class="pdp-empty glass-surface">' +
      '<h1 class="pdp-title">' +
      escapeHtml(t("pdp.notFoundTitle")) +
      "</h1>" +
      '<p class="pdp-desc">' +
      escapeHtml(t("pdp.notFoundLead")) +
      "</p>" +
      '<a class="btn-primary" href="index.html#products">' +
      escapeHtml(t("pdp.notFoundCta")) +
      "</a></section>";
    document.title = t("pdp.notFoundTitle") + " | " + getBrandName();
  }

  /**
   * @param {HTMLElement} root
   * @param {ReturnType<window.Irem.Products.getById>} product
   */
  function renderProduct(root, product) {
    const intent = getIntentFromUrl();
    const gallery =
      product.gallery && product.gallery.length
        ? product.gallery
        : [product.imageFallback || product.image];
    const heroAlt = escapeHtml(t("product.alt", { name: product.name }));

    const thumbs = gallery
      .map(function (src, i) {
        const thumbSrc =
          product.galleryThumbs && product.galleryThumbs[i]
            ? product.galleryThumbs[i]
            : src;
        return (
          '<button type="button" class="pdp-gallery__thumb' +
          (i === 0 ? " is-active" : "") +
          '" data-pdp-thumb="' +
          escapeHtml(src) +
          '" data-pdp-webp="' +
          escapeHtml(product.galleryWebp && product.galleryWebp[i] ? product.galleryWebp[i] : "") +
          '" data-pdp-alt="' +
          heroAlt +
          '" aria-label="' +
          escapeHtml(t("product.alt", { name: product.name })) +
          " " +
          (i + 1) +
          '">' +
          '<img src="' +
          escapeHtml(thumbSrc) +
          '" alt="" width="96" height="96" loading="lazy" decoding="async" data-fallback="' +
          escapeHtml(src) +
          '">' +
          "</button>"
        );
      })
      .join("");

    root.innerHTML =
      '<div class="pdp-layout">' +
      '<div class="pdp-col-media">' +
      '<section class="pdp-gallery pdp-float" aria-label="' +
      escapeHtml(t("pdp.galleryLabel")) +
      '">' +
      '<div class="pdp-gallery__stage">' +
      buildHeroImageHtml(product, heroAlt) +
      "</div>" +
      '<div class="pdp-gallery__thumbs" role="list">' +
      thumbs +
      "</div>" +
      "</section>" +
      renderTrustStack() +
      "</div>" +
      '<div class="pdp-col-buy">' +
      '<header class="pdp-head">' +
      '<p class="pdp-eyebrow">' +
      getBrandName() +
      " \u00b7 " +
      escapeHtml(t("trust.handmade")) +
      "</p>" +
      '<h1 class="pdp-title" id="pdp-title">' +
      escapeHtml(product.name) +
      "</h1>" +
      '<p class="pdp-price" id="pdp-price">' +
      escapeHtml(product.price) +
      "</p>" +
      '<p class="pdp-desc" id="pdp-desc">' +
      escapeHtml(product.description) +
      "</p>" +
      "</header>" +
      '<div class="pdp-checkout pdp-float">' +
      '<div class="pdp-checkout__head">' +
      '<h2 class="pdp-checkout__title">' +
      escapeHtml(t("pdp.checkoutHeading")) +
      "</h2>" +
      '<p class="pdp-checkout__sub">' +
      escapeHtml(t("pdp.checkoutSub")) +
      "</p>" +
      "</div>" +
      '<p class="pdp-checkout__intent-label">' +
      escapeHtml(t("product.intentLabel")) +
      "</p>" +
      '<div class="pdp-intent pdp-intent--segmented" role="group" aria-label="' +
      escapeHtml(t("product.intentLabel")) +
      '">' +
      '<button type="button" class="pdp-intent__btn' +
      (intent === "self" ? " is-active" : "") +
      '" data-intent="self" aria-pressed="' +
      (intent === "self" ? "true" : "false") +
      '">' +
      escapeHtml(t("product.intentSelf")) +
      "</button>" +
      '<button type="button" class="pdp-intent__btn' +
      (intent === "gift" ? " is-active" : "") +
      '" data-intent="gift" aria-pressed="' +
      (intent === "gift" ? "true" : "false") +
      '">' +
      escapeHtml(t("product.intentGift")) +
      "</button>" +
      "</div>" +
      '<div class="pdp-gift-banner' +
      (intent === "gift" ? " is-visible" : "") +
      '" data-gift-tip role="status">' +
      '<span class="pdp-gift-banner__ico">' +
      ICON_GIFT +
      "</span>" +
      "<p>" +
      escapeHtml(t("product.giftTip")) +
      "</p></div>" +
      '<button type="button" class="btn-primary pdp-checkout__buy" id="pdp-buy">' +
      escapeHtml(intent === "gift" ? t("product.buyGift") : t("product.buy")) +
      "</button>" +
      '<span class="pdp-buy-anchor" id="pdp-buy-anchor" aria-hidden="true"></span>' +
      '<a class="pdp-care-link" href="#pdp-care-acc" id="pdp-care">' +
      '<span class="pdp-checkout__care-ico">' +
      ICON_RULER +
      "</span>" +
      '<span class="pdp-checkout__care-text">' +
      escapeHtml(t("product.care")) +
      "</span>" +
      "</a>" +
      "</div>" +
      '<section class="pdp-sections">' +
      renderAccordion(t("pdp.highlights"), renderHighlightBullets(), true) +
      renderAccordion(
        t("pdp.careTab"),
        "<p><strong>" +
          escapeHtml(t("modal.careWash")) +
          ":</strong> " +
          escapeHtml(product.care.washing) +
          "</p><p><strong>" +
          escapeHtml(t("modal.careSize")) +
          ":</strong> " +
          escapeHtml(product.care.size) +
          "</p>" +
          (product.care.safety
            ? "<p><strong>" +
              escapeHtml(t("modal.careSafety")) +
              ":</strong> " +
              escapeHtml(product.care.safety) +
              "</p>"
            : ""),
        false,
        "pdp-care-acc"
      ) +
      renderAccordion(
        t("pdp.returnsTab"),
        "<p>" + escapeHtml(t("pdp.returnsBody")) + "</p>",
        false
      ) +
      "</section>" +
      renderSimilar(product) +
      "</div></div>" +
      '<div class="pdp-sticky" id="pdp-sticky" aria-hidden="true">' +
      '<div class="pdp-sticky__inner">' +
      '<div class="pdp-sticky__meta">' +
      '<p class="pdp-sticky__title">' +
      escapeHtml(product.name) +
      "</p>" +
      '<p class="pdp-sticky__price">' +
      escapeHtml(product.price) +
      "</p>" +
      "</div>" +
      '<button type="button" class="btn-primary pdp-sticky__cta" id="pdp-sticky-buy">' +
      escapeHtml(intent === "gift" ? t("product.buyGift") : t("pdp.stickyBuy")) +
      "</button></div></div>";

    const crumb = $("#pdp-crumb-current");
    if (crumb) crumb.textContent = product.name;
    bindImageFallbacks(root);
    updateProductMeta(product);
  }

  function bindImageFallbacks(root) {
    $$("img[data-fallback]", root).forEach(function (img) {
      if (!(img instanceof HTMLImageElement)) return;
      img.addEventListener(
        "error",
        function onImgError() {
          var fallback = img.getAttribute("data-fallback");
          if (fallback && img.getAttribute("src") !== fallback) {
            img.src = fallback;
          }
        },
        { once: true }
      );
    });
  }

  function teardownPdpUi() {
    if (pdpState.stickyIo) {
      pdpState.stickyIo.disconnect();
      pdpState.stickyIo = null;
    }
    document.body.classList.remove("is-pdp-sticky-visible");
  }

  /**
   * @param {HTMLElement} root
   */
  function initPdpSticky(root) {
    teardownPdpUi();
    const stickyBar = $("#pdp-sticky", root);
    if (!stickyBar || !("IntersectionObserver" in window)) return;

    const buyAnchor = $("#pdp-buy-anchor", root) || $("#pdp-buy", root);
    if (!buyAnchor) return;

    var stickyOn = false;
    var showTimer = 0;
    var hideTimer = 0;

    function applySticky(show) {
      if (show === stickyOn) return;
      stickyOn = show;
      document.body.classList.toggle("is-pdp-sticky-visible", show);
      stickyBar.setAttribute("aria-hidden", show ? "false" : "true");
    }

    pdpState.stickyIo = new IntersectionObserver(
      function (entries) {
        var entry = entries[0];
        if (!entry) return;
        var shouldShow = !entry.isIntersecting;
        window.clearTimeout(showTimer);
        window.clearTimeout(hideTimer);
        if (shouldShow) {
          showTimer = window.setTimeout(function () {
            applySticky(true);
          }, 100);
        } else {
          hideTimer = window.setTimeout(function () {
            applySticky(false);
          }, 320);
        }
      },
      { root: null, threshold: 0, rootMargin: "0px 0px 24px 0px" }
    );
    pdpState.stickyIo.observe(buyAnchor);
  }

  /**
   * @param {HTMLElement} root
   * @param {"self" | "gift"} next
   */
  function updateIntent(root, next) {
    var isGift = next === "gift";
    var product = pdpState.product;
    if (!product) return;

    $$('.pdp-intent__btn[data-intent="self"]', root).forEach(function (btn) {
      btn.classList.toggle("is-active", !isGift);
      btn.setAttribute("aria-pressed", String(!isGift));
    });
    $$('.pdp-intent__btn[data-intent="gift"]', root).forEach(function (btn) {
      btn.classList.toggle("is-active", isGift);
      btn.setAttribute("aria-pressed", String(isGift));
    });
    var tip = $("[data-gift-tip]", root);
    if (tip) tip.classList.toggle("is-visible", isGift);
    var label = isGift ? t("product.buyGift") : t("product.buy");
    var buyBtn = $("#pdp-buy", root);
    var stickyBuy = $("#pdp-sticky-buy", root);
    if (buyBtn) buyBtn.textContent = label;
    if (stickyBuy) {
      stickyBuy.textContent = isGift ? t("product.buyGift") : t("pdp.stickyBuy");
    }
    setUrlIntent(isGift ? "gift" : "self");
  }

  /**
   * @param {HTMLElement} trigger
   */
  function openInstagram(trigger) {
    var product = pdpState.product;
    if (!product || !product.instagramLink) return;
    window.open(product.instagramLink, "_blank", "noopener,noreferrer");
    if (trigger instanceof HTMLElement) trigger.blur();
  }

  /**
   * @param {HTMLElement} root
   * @param {HTMLButtonElement} thumb
   */
  function updateHeroFromThumb(root, thumb) {
    var heroImg = $("#pdp-hero-img", root);
    if (!(heroImg instanceof HTMLImageElement)) return;

    var fallback = thumb.getAttribute("data-pdp-thumb") || "";
    var webp = thumb.getAttribute("data-pdp-webp") || "";
    var alt = thumb.getAttribute("data-pdp-alt") || heroImg.alt;
    if (!fallback && !webp) return;

    var picture = heroImg.closest("picture");
    var source = picture ? $("source[type='image/webp']", picture) : null;
    var firstThumb = $(".pdp-gallery__thumb", root);
    var firstFallback =
      firstThumb instanceof HTMLButtonElement ? firstThumb.getAttribute("data-pdp-thumb") || "" : "";
    var firstWebp =
      firstThumb instanceof HTMLButtonElement ? firstThumb.getAttribute("data-pdp-webp") || "" : "";

    heroImg.onerror = function onHeroError() {
      heroImg.onerror = null;
      if (source instanceof HTMLSourceElement) {
        source.srcset = "";
      }
      if (fallback) {
        heroImg.src = fallback;
        return;
      }
      if (firstFallback) {
        if (source instanceof HTMLSourceElement && /\.webp$/i.test(firstWebp)) {
          source.srcset = firstWebp;
        }
        heroImg.src = firstFallback;
      }
    };

    if (source instanceof HTMLSourceElement) {
      source.srcset = /\.webp$/i.test(webp) ? webp : "";
    }
    heroImg.src = fallback || webp;
    heroImg.alt = alt;
  }

  /**
   * @param {HTMLElement} root
   */
  function ensurePdpBound(root) {
    if (pdpState.bound) return;
    pdpState.bound = true;

    root.addEventListener("click", function (e) {
      var product = pdpState.product;
      if (!product) return;

      var target = /** @type {HTMLElement} */ (e.target);
      var intentBtn = target.closest(".pdp-intent__btn");
      if (intentBtn instanceof HTMLButtonElement) {
        var next = intentBtn.getAttribute("data-intent") === "gift" ? "gift" : "self";
        updateIntent(root, next);
        return;
      }

      var thumb = target.closest("[data-pdp-thumb]");
      if (thumb instanceof HTMLButtonElement) {
        updateHeroFromThumb(root, thumb);
        $$(".pdp-gallery__thumb", root).forEach(function (el) {
          el.classList.toggle("is-active", el === thumb);
        });
        return;
      }

      if (target.closest("#pdp-buy")) {
        openInstagram(/** @type {HTMLElement} */ (target.closest("#pdp-buy")));
        return;
      }
      if (target.closest("#pdp-sticky-buy")) {
        openInstagram(/** @type {HTMLElement} */ (target.closest("#pdp-sticky-buy")));
        return;
      }

      var careLink = target.closest("#pdp-care");
      if (careLink) {
        e.preventDefault();
        var careAcc = $("#pdp-care-acc", root);
        if (careAcc instanceof HTMLDetailsElement) {
          careAcc.open = true;
          careAcc.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }

  function unlockPdpPage() {
    if (typeof window.AmiguraPageUnlock === "function") {
      window.AmiguraPageUnlock();
    }
    document.body.classList.remove("is-modal-open", "is-nav-open", "is-quickview-open");
    var main = document.getElementById("main");
    if (main) {
      main.removeAttribute("inert");
      main.style.removeProperty("visibility");
      main.style.removeProperty("opacity");
      main.style.removeProperty("pointer-events");
    }
  }

  function loadPdp() {
    var root = $("#pdp-root");
    if (!root) return;

    unlockPdpPage();
    ensurePdpBound(root);

    if (!window.Irem || !window.Irem.Products) {
      pdpState.product = null;
      teardownPdpUi();
      renderNotFound(root);
      return;
    }

    var id = Number(getParam("id"));
    var product = window.Irem.Products.getById(id);
    if (!product) {
      pdpState.product = null;
      teardownPdpUi();
      renderNotFound(root);
      return;
    }

    pdpState.product = product;
    renderProduct(root, product);
    initPdpSticky(root);
    pdpState.ready = true;
  }

  function boot() {
    var root = $("#pdp-root");
    if (!root) return;

    var I = getI18n();
    if (I && I.apply) I.apply(document);

    loadPdp();
  }

  function onLangChange() {
    if (!$("#pdp-root")) return;
    var I = getI18n();
    if (I && I.apply) I.apply(document);
    loadPdp();
  }

  function start() {
    document.addEventListener("amigura:ready", boot, { once: true });
    document.addEventListener("amigura:langchange", onLangChange);
    window.addEventListener("pageshow", function () {
      if (!$("#pdp-root")) return;
      unlockPdpPage();
      if (pdpState.ready) {
        loadPdp();
        return;
      }
      if (window.Irem && window.Irem.I18n) {
        boot();
      }
    });
  }

  start();
})();
