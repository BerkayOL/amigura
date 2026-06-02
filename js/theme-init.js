/**
 * Synchronous bootstrap — theme FOUC prevention, language hint, seasonal hero.
 * Must load in <head> before CSS paint.
 */
(function () {
  var root = document.documentElement;
  var stored = localStorage.getItem("amigura-theme");
  if (
    stored === "dark" ||
    (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    root.setAttribute("data-theme", "dark");
  }

  var lang = localStorage.getItem("amigura-lang");
  if (lang !== "en" && lang !== "tr") {
    var list =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || ""];
    lang = "en";
    for (var i = 0; i < list.length; i++) {
      if (String(list[i]).toLowerCase().indexOf("tr") === 0) {
        lang = "tr";
        break;
      }
    }
  }
  if (lang === "en" || lang === "tr") {
    root.lang = lang;
    root.setAttribute("data-lang", lang);
  }

  var month = new Date().getMonth();
  var season = "winter";
  if (month >= 2 && month <= 4) {
    season = "spring";
  } else if (month >= 5 && month <= 7) {
    season = "summer";
  } else if (month >= 8 && month <= 10) {
    season = "autumn";
  }
  root.setAttribute("data-season", season);
})();
