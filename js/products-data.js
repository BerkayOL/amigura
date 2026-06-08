/**
 * Amigurumirem - Product catalog (locale keys via Irem.I18n)
 */
(function (global) {
  "use strict";

  var IMAGE_BASE = "assets/images/products/";

  /**
   * @param {string} folder
   * @param {number} count
   * @returns {string[]}
   */
  function galleryPaths(folder, count) {
    var paths = [];
    for (var i = 1; i <= count; i++) {
      paths.push(IMAGE_BASE + folder + "/" + String(i).padStart(2, "0") + ".jpg");
    }
    return paths;
  }

  /** @type {Array<{ id: number, slug: string, folder: string, galleryCount: number, category: string }>} */
  var catalog = [
    { id: 1, slug: "barbie", folder: "barbie", galleryCount: 3, category: "disney" },
    { id: 2, slug: "elsa", folder: "elsa", galleryCount: 3, category: "disney" },
    { id: 3, slug: "olaf", folder: "olaf", galleryCount: 3, category: "disney" },
    { id: 4, slug: "moana", folder: "moana", galleryCount: 1, category: "disney" },
    { id: 5, slug: "maui", folder: "maui", galleryCount: 5, category: "disney" },
    { id: 6, slug: "harryPotter", folder: "harry-potter", galleryCount: 1, category: "wizarding" },
    { id: 7, slug: "hermione", folder: "hermonie-granger", galleryCount: 1, category: "wizarding" },
    { id: 8, slug: "malefiz", folder: "malefiz", galleryCount: 1, category: "wizarding" },
    { id: 9, slug: "ronald", folder: "ronald-weasley", galleryCount: 1, category: "wizarding" },
    { id: 10, slug: "wednesday", folder: "wednesday", galleryCount: 2, category: "wednesday" },
    { id: 11, slug: "thing", folder: "thing", galleryCount: 3, category: "wednesday" },
    { id: 12, slug: "pugsleyAddams", folder: "pugsley-addams", galleryCount: 3, category: "wednesday" },
    { id: 13, slug: "enidSinclair", folder: "enid-sinclair", galleryCount: 2, category: "wednesday" },
    { id: 14, slug: "kuromi", folder: "kuromi", galleryCount: 3, category: "sanrio" },
    { id: 15, slug: "myMelody", folder: "my-melody", galleryCount: 3, category: "sanrio" },
    { id: 16, slug: "sonicBlue", folder: "sonic-blue", galleryCount: 3, category: "sonic" },
    { id: 17, slug: "sonicRed", folder: "sonic-red", galleryCount: 3, category: "sonic" },
    { id: 18, slug: "sonicBlack", folder: "sonic-black", galleryCount: 3, category: "sonic" },
    { id: 19, slug: "tails", folder: "tails", galleryCount: 4, category: "sonic" },
    { id: 20, slug: "lolSurpriseDoll", folder: "lol-surprise-doll", galleryCount: 3, category: "play" },
    { id: 21, slug: "crossbodyPaperBag", folder: "crossbody-paper-bag", galleryCount: 3, category: "accessories" },
    { id: 22, slug: "lavenderClutch", folder: "lavender-clutch", galleryCount: 3, category: "accessories" },
    { id: 23, slug: "nostalgicPhoneBlue", folder: "nostalgic-phone-blue", galleryCount: 1, category: "accessories" },
    { id: 24, slug: "nostalgicPhonePink", folder: "nostalgic-phone-pink", galleryCount: 1, category: "accessories" },
    { id: 25, slug: "nostalgicPhoneOrange", folder: "nostalgic-phone-orange", galleryCount: 1, category: "accessories" },
    { id: 26, slug: "fruitSet", folder: "fruit-set", galleryCount: 2, category: "play" },
    { id: 27, slug: "vegetableSet", folder: "vegetable-set", galleryCount: 1, category: "play" },
    { id: 28, slug: "trexDinosaur", folder: "trex-dinosaur", galleryCount: 3, category: "play" },
  ];

  function getConfig() {
    return global.Amigura && global.Amigura.Config;
  }

  /**
   * @param {typeof catalog[0]} item
   * @returns {string}
   */
  function resolveInstagramLink(item) {
    var cfg = getConfig();
    if (cfg && typeof cfg.getInstagramLink === "function") {
      return cfg.getInstagramLink(item.slug);
    }
    return cfg && cfg.instagramUrl ? cfg.instagramUrl : "https://www.instagram.com/amigura";
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
    var gallery = galleryPaths(item.folder, item.galleryCount);
    var primary = gallery[0] || "";

    return {
      id: item.id,
      slug: item.slug,
      folder: item.folder,
      category: item.category,
      price: t(base + ".price"),
      image: primary,
      imageFallback: primary,
      imageMime: "image/jpeg",
      gallery: gallery,
      instagramLink: resolveInstagramLink(item),
      name: t(base + ".name"),
      description: t(base + ".desc"),
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

  /**
   * @param {number} productId
   * @param {number} [limit]
   */
  function getSimilar(productId, limit) {
    var max = limit || 4;
    var current = catalog.find(function (p) {
      return p.id === productId;
    });
    if (!current) return [];

    var sameCategory = catalog.filter(function (p) {
      return p.id !== productId && p.category === current.category;
    });
    var others = catalog.filter(function (p) {
      return p.id !== productId && p.category !== current.category;
    });
    var ordered = sameCategory.concat(others);
    return ordered.slice(0, max).map(resolve);
  }

  /**
   * @returns {string[]}
   */
  function getFigureSlugs() {
    return catalog.map(function (p) {
      return p.slug;
    });
  }

  global.Irem = global.Irem || {};
  global.Irem.Products = {
    catalog: catalog,
    getAll: getAll,
    getById: getById,
    getSimilar: getSimilar,
    resolve: resolve,
    getFigureSlugs: getFigureSlugs,
    galleryPaths: galleryPaths,
  };
})(typeof window !== "undefined" ? window : globalThis);
