/**
 * Amigura — Product catalog (locale keys via Irem.I18n)
 */
(function (global) {
  "use strict";

  var IMAGE_BASE = "assets/images/";

  /** @type {Array<{ id: number, slug: string, image: string, imageFallback: string, imageMime: string, statusKey: string }>} */
  var catalog = [
    {
      id: 1,
      slug: "harryPotter",
      image: IMAGE_BASE + "harry-potter.jpg",
      imageFallback: IMAGE_BASE + "harry-potter.jpg",
      imageMime: "image/jpeg",
      statusKey: "status.inStock",
    },
    {
      id: 2,
      slug: "hermione",
      image: IMAGE_BASE + "hermione-granger.jpg",
      imageFallback: IMAGE_BASE + "hermione-granger.jpg",
      imageMime: "image/jpeg",
      statusKey: "status.custom7",
    },
    {
      id: 3,
      slug: "malefiz",
      image: IMAGE_BASE + "malefiz.jpg",
      imageFallback: IMAGE_BASE + "malefiz.jpg",
      imageMime: "image/jpeg",
      statusKey: "status.limited",
    },
    {
      id: 4,
      slug: "ronald",
      image: IMAGE_BASE + "ronald-weasley.jpg",
      imageFallback: IMAGE_BASE + "ronald-weasley.jpg",
      imageMime: "image/jpeg",
      statusKey: "status.inStock",
    },
  ];

  function getConfig() {
    return global.Amigura && global.Amigura.Config;
  }

  /**
   * @param {typeof catalog[0]} item
   * @returns {string}
   */
  function resolveTrendyolLink(item) {
    var cfg = getConfig();
    if (cfg && typeof cfg.getTrendyolLink === "function") {
      return cfg.getTrendyolLink(item.slug);
    }
    return cfg && cfg.trendyolStoreUrl
      ? cfg.trendyolStoreUrl
      : "https://www.trendyol.com/magaza/amigura";
  }

  /**
   * @param {typeof catalog[0]} item
   */
  function resolve(item) {
    var t =
      global.Irem && global.Irem.I18n
        ? global.Irem.I18n.t.bind(global.Irem.I18n)
        : function (k) {
            return k;
          };
    var base = "products." + item.slug;
    return {
      id: item.id,
      slug: item.slug,
      price: t(base + ".price"),
      image: item.image,
      imageFallback: item.imageFallback,
      imageMime: item.imageMime,
      trendyolLink: resolveTrendyolLink(item),
      name: t(base + ".name"),
      description: t(base + ".desc"),
      status: t(item.statusKey),
      care: {
        washing: t(base + ".careWash"),
        size: t(base + ".careSize"),
        safety: t(base + ".careSafety"),
      },
    };
  }

  function getAll() {
    return catalog.map(resolve);
  }

  /**
   * @param {number} id
   */
  function getById(id) {
    var item = catalog.find(function (p) {
      return p.id === id;
    });
    return item ? resolve(item) : null;
  }

  global.Irem = global.Irem || {};
  global.Irem.Products = {
    catalog: catalog,
    getAll: getAll,
    getById: getById,
    resolve: resolve,
  };
})(typeof window !== "undefined" ? window : globalThis);
