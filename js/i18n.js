/**
 * Amigura - i18n (TR / EN)
 * Locales: js/locales/tr.js, js/locales/en.js
 */
(function (global) {
  "use strict";

  const STORAGE_KEY = "amigura-lang";
  const DEFAULT_LANG = "tr";
  const PAGE_META = {
    home: { title: "meta.homeTitle", desc: "meta.homeDesc" },
    ozel: { title: "meta.ozelTitle", desc: "meta.ozelDesc" },
    tesekkur: { title: "meta.thanksTitle", desc: "meta.thanksDesc" },
    kvkk: { title: "meta.kvkkTitle", desc: "meta.kvkkDesc" },
    iade: { title: "meta.iadeTitle", desc: "meta.iadeDesc" },
    product: { title: "meta.productTitle", desc: "meta.productDesc" },
  };

  let currentLang = DEFAULT_LANG;
  let applying = false;

  function isTurkishTag(tag) {
    return String(tag || "")
      .toLowerCase()
      .startsWith("tr");
  }

  /** First visit: TR if browser prefers Turkish, otherwise English for international visitors */
  function detectBrowserLang() {
    const list =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || ""];
    for (let i = 0; i < list.length; i++) {
      if (isTurkishTag(list[i])) return "tr";
    }
    return "en";
  }

  function resolveInitialLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "tr" || stored === "en") return stored;
    return detectBrowserLang();
  }

  function messagesFor(lang) {
    const locales = global.Irem && global.Irem.locales;
    if (!locales) return null;
    return locales[lang] || locales[DEFAULT_LANG] || null;
  }

  function t(key, vars) {
    const parts = key.split(".");
    let node = messagesFor(currentLang);
    for (let i = 0; i < parts.length; i++) {
      if (node && typeof node === "object" && parts[i] in node) {
        node = node[parts[i]];
      } else {
        node = messagesFor(DEFAULT_LANG);
        for (let j = 0; j < parts.length; j++) {
          if (node && typeof node === "object" && parts[j] in node) {
            node = node[parts[j]];
          } else {
            return key;
          }
        }
        break;
      }
    }
    let str = typeof node === "string" ? node : key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
      });
    }
    return str;
  }

  function getLang() {
    return currentLang;
  }

  function applyPageMeta() {
    const page = document.body && document.body.dataset.page;
    const meta = PAGE_META[page];
    if (!meta) return;
    if (meta.title) document.title = t(meta.title);
    if (meta.desc) {
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", t(meta.desc));
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && meta.title) ogTitle.setAttribute("content", t(meta.title));
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && meta.desc) ogDesc.setAttribute("content", t(meta.desc));
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute("content", currentLang === "en" ? "en_US" : "tr_TR");
    }
  }

  /**
   * Lightweight HTML sanitizer for i18n strings (legal pages, rich copy).
   * @param {string} html
   */
  function sanitizeI18nHtml(html) {
    const allowed = {
      p: true,
      h2: true,
      h3: true,
      ul: true,
      ol: true,
      li: true,
      a: true,
      b: true,
      strong: true,
      i: true,
      em: true,
      br: true,
    };

    /**
     * @param {string} href
     */
    function sanitizeHref(href) {
      const h = String(href || "").trim();
      if (!h || h === "#") return "#";
      if (/^javascript:/i.test(h) || /^data:/i.test(h)) return "#";
      if (/^https?:\/\//i.test(h)) return h;
      if (/^[a-z0-9./#?=&_%-]+$/i.test(h)) return h;
      return "#";
    }

    /**
     * @param {HTMLElement} el
     */
    function sanitizeElement(el) {
      const tag = el.tagName.toLowerCase();
      const keep = {};
      if (tag === "a") {
        const href = el.getAttribute("href");
        if (href) keep.href = sanitizeHref(href);
        const cls = el.getAttribute("class");
        if (cls === "protected-contact") keep.class = "protected-contact";
        const contactType = el.getAttribute("data-contact-type");
        if (contactType === "email") keep["data-contact-type"] = "email";
      }
      Array.from(el.attributes).forEach(function (attr) {
        if (!(attr.name in keep)) el.removeAttribute(attr.name);
      });
      Object.keys(keep).forEach(function (name) {
        el.setAttribute(name, keep[name]);
      });
    }

    const tpl = document.createElement("template");
    tpl.innerHTML = String(html || "");

    /** @param {Node} node */
    function walk(node) {
      const children = Array.from(node.childNodes);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.nodeType === Node.ELEMENT_NODE) {
          const el = /** @type {HTMLElement} */ (child);
          const tag = el.tagName.toLowerCase();
          if (!allowed[tag]) {
            const text = document.createTextNode(el.textContent || "");
            el.replaceWith(text);
            continue;
          }
          sanitizeElement(el);
          walk(el);
        } else if (child.nodeType === Node.COMMENT_NODE) {
          child.parentNode && child.parentNode.removeChild(child);
        }
      }
    }

    walk(tpl.content);
    return tpl.innerHTML;
  }

  function apply(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    scope.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-html");
      if (key) el.innerHTML = sanitizeI18nHtml(t(key));
    });
    scope.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key && (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) {
        el.placeholder = t(key);
      }
    });
    scope.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-aria");
      if (key) el.setAttribute("aria-label", t(key));
    });
    scope.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-title");
      if (key) el.setAttribute("title", t(key));
    });
    scope.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-alt");
      if (key && el instanceof HTMLImageElement) el.alt = t(key);
    });
    scope.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      if (!(btn instanceof HTMLButtonElement)) return;
      const lang = btn.getAttribute("data-lang");
      btn.classList.toggle("is-active", lang === currentLang);
      btn.setAttribute("aria-pressed", String(lang === currentLang));
    });
    if (!root || root === document) applyPageMeta();
  }

  function setLang(lang) {
    if ((lang !== "tr" && lang !== "en") || lang === currentLang || applying) return;
    applying = true;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);
    apply(document);
    document.dispatchEvent(
      new CustomEvent("amigura:langchange", { bubbles: true, detail: { lang: lang } })
    );
    applying = false;
  }

  function init() {
    currentLang = resolveInitialLang();
    document.documentElement.lang = currentLang;
    document.documentElement.setAttribute("data-lang", currentLang);
  }

  init();

  global.Irem = global.Irem || {};
  global.Irem.I18n = {
    t: t,
    getLang: getLang,
    setLang: setLang,
    apply: apply,
    init: init,
    detectBrowserLang: detectBrowserLang,
  };
})(typeof window !== "undefined" ? window : globalThis);
