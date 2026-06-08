import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "js", "irem-modal.js");
let content = fs.readFileSync(filePath, "utf8");

const start = content.indexOf("  function openQuickViewModal(product, trigger) {");
const end = content.indexOf("  /**\n   * @param {KeyboardEvent} e\n   */\n  function trapFocusInModal(e) {");
if (start === -1 || end === -1) {
  console.error("Could not locate openQuickViewModal boundaries");
  process.exit(1);
}

const replacement = `  function openQuickViewModal(product, trigger) {
    if (!deps) return;
    const t = deps.t;
    const escapeHtml = deps.escapeHtml;
    ensureModalRoot();
    state.returnFocus = trigger;

    const bodyEl = document.getElementById("irem-modal-body");
    if (!bodyEl) return;

    const title = escapeHtml(product.name);
    const price = escapeHtml(product.price);
    const trackedLink = buildTrackedUrl(product.instagramLink, trigger) || product.instagramLink;
    const link = escapeHtml(trackedLink);

    const careWash = product.care && product.care.washing ? escapeHtml(product.care.washing) : "";
    const careSize = product.care && product.care.size ? escapeHtml(product.care.size) : "";
    const careSafety = product.care && product.care.safety ? escapeHtml(product.care.safety) : "";

    const ICON_LOCK =
      '<svg class="trust-stack__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M7 11V7a5 5 0 0 1 10 0v4"/><rect x="5" y="11" width="14" height="10" rx="2"/></svg>';
    const ICON_TRUCK =
      '<svg class="trust-stack__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 7h11v10H3z"/><path d="M14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="1.6"/><circle cx="18" cy="19" r="1.6"/></svg>';
    const ICON_HAND =
      '<svg class="trust-stack__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12"/><path d="M11 12V4.5a1.5 1.5 0 0 1 3 0V12"/><path d="M14 12V6.5a1.5 1.5 0 0 1 3 0V14"/><path d="M8 13l-2 2.5a4 4 0 0 0 3.2 6.5H14a5 5 0 0 0 5-5v-3"/></svg>';

    bodyEl.innerHTML =
      '<div class="quickview">' +
      '<div class="quickview__media glass-surface" aria-hidden="true">' +
      '<div class="quickview__media-inner">' +
      '<img class="quickview__img" src="' +
      escapeHtml(product.imageFallback || product.image) +
      '" alt="" loading="lazy" decoding="async">' +
      "</div></div>" +
      '<div class="quickview__content">' +
      '<header class="quickview__header">' +
      '<h2 id="modal-title" class="quickview__title modal-panel__title">' +
      title +
      "</h2>" +
      '<p class="quickview__price">' +
      price +
      "</p>" +
      '<div class="quickview__badges"><span class="quickview__badge">' +
      escapeHtml(t("modal.quickViewOrganic")) +
      "</span></div>" +
      "</header>" +
      '<details class="quickview__details" open>' +
      '<summary class="quickview__summary">' +
      escapeHtml(t("modal.quickViewCareTitle")) +
      "</summary>" +
      '<div class="quickview__details-body">' +
      (careWash ? '<p><strong>' + escapeHtml(t("modal.careWash")) + ":</strong> " + careWash + "</p>" : "") +
      (careSize ? '<p><strong>' + escapeHtml(t("modal.careSize")) + ":</strong> " + careSize + "</p>" : "") +
      (careSafety ? '<p><strong>' + escapeHtml(t("modal.careSafety")) + ":</strong> " + careSafety + "</p>" : "") +
      "</div></details>" +
      '<div class="quickview__actions">' +
      '<button type="button" class="btn-primary quickview__cta" data-quickview-go data-url="' +
      link +
      '">' +
      escapeHtml(t("modal.quickViewCta")) +
      "</button>" +
      '<ul class="trust-stack" aria-label="' +
      escapeHtml(t("trust.label")) +
      '">' +
      '<li class="trust-stack__item">' +
      ICON_LOCK +
      '<span class="trust-stack__text">' +
      escapeHtml(t("modal.quickViewTrust1")) +
      "</span></li>" +
      '<li class="trust-stack__item">' +
      ICON_TRUCK +
      '<span class="trust-stack__text">' +
      escapeHtml(t("modal.quickViewTrust2")) +
      "</span></li>" +
      '<li class="trust-stack__item">' +
      ICON_HAND +
      '<span class="trust-stack__text">' +
      escapeHtml(t("modal.quickViewTrust3")) +
      "</span></li>" +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</div>";

    const panel = document.getElementById("irem-modal-panel");
    if (panel) panel.classList.add("modal-panel--quickview");
    body.classList.add("is-quickview-open");

    openModal();
  }

`;

content = content.slice(0, start) + replacement + content.slice(end);
content = content.replace(
  /Amigura . Modals \(care, Trendyol handoff\)/,
  "Amigura  Modals (care, Instagram outbound)"
);

fs.writeFileSync(filePath, content, "utf8");
console.log("Replaced openQuickViewModal in irem-modal.js");
