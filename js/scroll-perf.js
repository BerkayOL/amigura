/**
 * Amigurumirem — Scroll performance: idle detection + hero visibility
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var scrollEndTimer = null;
  var scrollEndMs = 140;

  function ensureScrollUnlocked() {
    if (!body) return;
    if (body.classList.contains("is-nav-open") || body.classList.contains("is-modal-open")) {
      return;
    }
    root.classList.remove("is-nav-open", "is-modal-open");
    body.classList.remove("is-nav-open", "is-modal-open");
    root.style.overflow = "";
    body.style.overflow = "";
    body.style.removeProperty("overflow");
    root.style.removeProperty("overflow");
  }

  function markScrolling() {
    if (!root.classList.contains("is-scrolling")) {
      root.classList.add("is-scrolling");
    }
    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(function () {
      root.classList.remove("is-scrolling");
      scrollEndTimer = null;
    }, scrollEndMs);
  }

  function initHeroVisibility() {
    var hero = document.getElementById("hero");
    if (!hero) {
      root.classList.add("is-hero-visible");
      return;
    }

    if (!("IntersectionObserver" in window)) {
      root.classList.add("is-hero-visible");
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        var entry = entries[0];
        root.classList.toggle("is-hero-visible", !!(entry && entry.isIntersecting));
      },
      { root: null, threshold: 0, rootMargin: "0px" }
    );
    io.observe(hero);
  }

  function init() {
    ensureScrollUnlocked();
    initHeroVisibility();
  }

  window.addEventListener("scroll", markScrolling, { passive: true });
  window.addEventListener("pageshow", ensureScrollUnlocked);
  window.addEventListener("load", ensureScrollUnlocked);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
