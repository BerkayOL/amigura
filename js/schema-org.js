/**
 * Schema.org JSON-LD injection (CSP-safe: no inline scripts).
 */
(function () {
  "use strict";

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Amigurumirem",
    url: "https://www.amigura.com",
    logo: "https://www.amigura.com/assets/logo.png",
    description: "El yap\u0131m\u0131, organik ipliklerle \u00f6r\u00fclen l\u00fcks amigurumi koleksiyonu.",
    sameAs: ["https://www.instagram.com/amigurumi__rem", "https://www.etsy.com/shop/amigura"],
  };

  try {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(data);
    document.head && document.head.appendChild(el);
  } catch {
    // no-op
  }
})();

