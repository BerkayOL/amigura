/**
 * Amigurumirem — Scroll performance: idle detection + hero visibility
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var scrollEndTimer = null;
  var scrollEndMs = 140;

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
    if (!hero) return;

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

  window.addEventListener("scroll", markScrolling, { passive: true });
  window.addEventListener("touchmove", markScrolling, { passive: true });
  window.addEventListener("wheel", markScrolling, { passive: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroVisibility);
  } else {
    initHeroVisibility();
  }
})();
