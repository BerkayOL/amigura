/**
 * Schema.org JSON-LD injection (CSP-safe: no inline scripts).
 */
(function () {
  "use strict";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Amigurumirem",
    url: "https://www.amigurumirem.com.tr",
    logo: "https://www.amigurumirem.com.tr/assets/logo.png",
    description: "El yap\u0131m\u0131, organik ipliklerle \u00f6r\u00fclen l\u00fcks amigurumi koleksiyonu.",
    telephone: "+90-534-017-52-72",
    email: "calanguirem@gmail.com",
    sameAs: ["https://www.instagram.com/amigurumi__rem", "https://www.etsy.com/shop/amigura"],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Amigurumirem",
    alternateName: "Elsa Amigurumi",
    url: "https://www.amigurumirem.com.tr/",
  };

  const data = [organization, website];

  try {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(data);
    document.head && document.head.appendChild(el);
  } catch {
    // no-op
  }
})();
