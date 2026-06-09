/**
 * Amigura — Product card UI
 */
(function (global) {
  "use strict";

  function i18n() {
    return global.Irem && global.Irem.I18n;
  }

  /**
   * @param {string} str
   */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const BUY_ICON_SVG =
    '<svg class="product-card__buy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>';

  /**
   * @param {string} src
   * @param {string} alt
   * @param {string} [fallback]
   * @param {string} [mime]
   * @returns {string}
   */
  function buildProductPictureHtml(src, alt, fallback, mime, eager) {
    var fb = fallback || src;
    var type = mime || (/\.webp$/i.test(src) ? "image/webp" : "image/jpeg");
    var loading = eager ? "eager" : "lazy";
    var imgAttrs =
      'alt="' +
      alt +
      '" class="product-card__image" width="600" height="600" loading="' +
      loading +
      '" decoding="async" data-fallback="' +
      fb +
      '"';

    if (type === "image/webp" && fb !== src) {
      return (
        "<picture>" +
        '<source srcset="' +
        src +
        '" type="image/webp">' +
        "<img src=\"" +
        fb +
        "\" " +
        imgAttrs +
        "></picture>"
      );
    }

    return "<img src=\"" + src + "\" " + imgAttrs + ">";
  }

  /**
   * @param {ReturnType<global.Irem.Products.resolve>} product
   */
  function createHtml(product, eager) {
    const I = i18n();
    const t = I ? I.t.bind(I) : function (k) {
      return k;
    };

    const name = escapeHtml(product.name);
    const description = escapeHtml(product.description);
    const price = escapeHtml(product.price);
    const image = escapeHtml(product.image);
    const fallback = escapeHtml(product.imageFallback);
    const link = escapeHtml(product.instagramLink);
    const alt = escapeHtml(t("product.alt", { name: product.name }));
    const buyLabel = escapeHtml(t("product.buyAria", { name: product.name }));
    const careLabel = escapeHtml(t("product.careAria", { name: product.name }));

    const pdpHref =
      "urun.html?id=" +
      encodeURIComponent(String(product.id)) +
      "&intent=self";

    return (
      '<li class="products__item">' +
      '<article class="product-card glass-surface" data-product-id="' +
      product.id +
      '" data-intent="self">' +
      '<a class="product-card__open" href="' +
      pdpHref +
      '" aria-label="' +
      escapeHtml(t("product.viewAria", { name: product.name })) +
      '"></a>' +
      '<div class="product-card__media">' +
      buildProductPictureHtml(image, alt, fallback, product.imageMime, eager) +
      "</div>" +
      '<div class="product-card__body">' +
      '<h3 class="product-card__title">' +
      name +
      "</h3>" +
      '<p class="product-card__price">' +
      price +
      "</p>" +
      '<p class="product-card__desc">' +
      description +
      "</p>" +
      '<div class="product-card__shop">' +
      '<div class="product-card__intent" role="group" data-i18n-aria="product.intentLabel">' +
      '<button type="button" class="product-card__intent-btn is-active" data-intent="self" aria-pressed="true">' +
      '<span data-i18n="product.intentSelf"></span></button>' +
      '<button type="button" class="product-card__intent-btn" data-intent="gift" aria-pressed="false">' +
      '<span data-i18n="product.intentGift"></span></button>' +
      "</div>" +
      '<p class="product-card__gift-tip" data-gift-tip hidden>' +
      '<span class="product-card__gift-tip-inner" data-i18n="product.giftTip"></span>' +
      "</p>" +
      '<div class="product-card__actions">' +
      '<button type="button" class="product-card__care" aria-label="' +
      careLabel +
      '">' +
      '<span class="product-card__care-icon" aria-hidden="true">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
      '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></span>' +
      '<span class="product-card__care-text" data-i18n="product.care"></span>' +
      "</button>" +
      '<a href="' +
      link +
      '" class="product-card__buy" target="_blank" rel="noopener noreferrer" aria-label="' +
      buyLabel +
      '">' +
      '<span class="product-card__buy-text" data-i18n="product.buy"></span>' +
      BUY_ICON_SVG +
      "</a></div></div></div></article></li>"
    );
  }

  /**
   * @param {HTMLElement} card
   * @param {"self" | "gift"} intent
   */
  function setIntent(card, intent) {
    const I = i18n();
    const t = I ? I.t.bind(I) : function (k) {
      return k;
    };
    const isGift = intent === "gift";
    card.dataset.intent = intent;

    card.querySelectorAll(".product-card__intent-btn").forEach(function (btn) {
      if (!(btn instanceof HTMLButtonElement)) return;
      const btnIntent = btn.getAttribute("data-intent");
      const active = btnIntent === intent;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    const buyText = card.querySelector(".product-card__buy-text");
    if (buyText) {
      buyText.textContent = isGift ? t("product.buyGift") : t("product.buy");
    }

    const buyLink = card.querySelector(".product-card__buy");
    const openLink = card.querySelector(".product-card__open");
    const productId = card.getAttribute("data-product-id");
    const product =
      global.Irem && global.Irem.Products
        ? global.Irem.Products.getById(Number(productId))
        : null;
    if (openLink instanceof HTMLAnchorElement && product) {
      openLink.href =
        "urun.html?id=" +
        encodeURIComponent(String(product.id)) +
        "&intent=" +
        encodeURIComponent(isGift ? "gift" : "self");
    }
    if (buyLink instanceof HTMLAnchorElement && product) {
      buyLink.setAttribute(
        "aria-label",
        isGift ? t("product.buyGiftAria", { name: product.name }) : t("product.buyAria", { name: product.name })
      );
    }

    const tip = card.querySelector("[data-gift-tip]");
    if (tip instanceof HTMLElement) {
      tip.hidden = !isGift;
    }
  }

  /**
   * @param {HTMLElement} container
   */
  function bindImageFallbacks(container) {
    container.querySelectorAll(".product-card__image").forEach(function (img) {
      if (!(img instanceof HTMLImageElement)) return;
      img.addEventListener(
        "error",
        function onImgError() {
          const fallback = img.getAttribute("data-fallback");
          if (fallback && img.getAttribute("src") !== fallback) {
            img.src = fallback;
          }
        },
        { once: true }
      );
    });
  }

  /**
   * @param {HTMLElement} container
   */
  function renderInto(container) {
    if (!global.Irem || !global.Irem.Products) return;
    const products = global.Irem.Products.getAll();
    const BATCH = 6;
    let index = 0;

    container.replaceChildren();

    function appendBatch() {
      const slice = products.slice(index, index + BATCH);
      if (!slice.length) return;
      const html = slice
        .map(function (product, i) {
          return createHtml(product, index + i < 6);
        })
        .join("");
      const wrap = document.createElement("div");
      wrap.innerHTML = html;
      while (wrap.firstElementChild) {
        container.appendChild(wrap.firstElementChild);
      }
      bindImageFallbacks(container);
      if (i18n()) i18n().apply(container);
      index += BATCH;
      if (index < products.length) {
        if (typeof requestIdleCallback === "function") {
          requestIdleCallback(appendBatch, { timeout: 200 });
        } else {
          setTimeout(appendBatch, 0);
        }
      } else {
        document.dispatchEvent(
          new CustomEvent("amigura:products-complete", { bubbles: true })
        );
      }
    }

    appendBatch();
  }

  /**
   * @param {HTMLElement} container
   */
  function updateTextsInPlace(container) {
    if (!global.Irem || !global.Irem.Products) return;

    container.querySelectorAll(".product-card").forEach(function (card) {
      if (!(card instanceof HTMLElement)) return;
      const id = Number(card.getAttribute("data-product-id"));
      const intent = card.dataset.intent === "gift" ? "gift" : "self";
      const product = global.Irem.Products.getById(id);
      if (!product) return;

      const title = card.querySelector(".product-card__title");
      if (title) title.textContent = product.name;

      const price = card.querySelector(".product-card__price");
      if (price) price.textContent = product.price;

      const desc = card.querySelector(".product-card__desc");
      if (desc) desc.textContent = product.description;

      const img = card.querySelector(".product-card__image");
      if (img instanceof HTMLImageElement) {
        img.alt =
          global.Irem.I18n && global.Irem.I18n.t
            ? global.Irem.I18n.t("product.alt", { name: product.name })
            : product.name;
      }

      const buyLink = card.querySelector(".product-card__buy");
      if (buyLink instanceof HTMLAnchorElement) {
        buyLink.href = product.instagramLink;
      }

      setIntent(card, intent);
    });

    if (i18n()) i18n().apply(container);
  }

  global.Irem = global.Irem || {};
  global.Irem.ProductCard = {
    createHtml: createHtml,
    setIntent: setIntent,
    bindImageFallbacks: bindImageFallbacks,
    renderInto: renderInto,
    updateTextsInPlace: updateTextsInPlace,
  };
})(typeof window !== "undefined" ? window : globalThis);
