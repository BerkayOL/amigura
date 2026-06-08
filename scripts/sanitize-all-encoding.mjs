/**
 * Sanitize U+FFFD / mojibake across locales, HTML fallbacks, and generated assets.
 * node scripts/sanitize-all-encoding.mjs
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import {
  LEGAL_PRIVACY_TR,
  LEGAL_RETURNS_TR,
  LEGAL_PRIVACY_EN,
  LEGAL_RETURNS_EN,
} from "./legal-content.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const LEGAL_TR = {
  eyebrow: "Yasal Bilgilendirme",
  contactHeading: "\u0130leti\u015Fim",
  emailCta: "E-posta ile ileti\u015Fime ge\u00E7",
  privacy: {
    title: "KVKK ve Gizlilik Politikas\u0131",
    updated: "Son g\u00FCncelleme: 8 Haziran 2026",
    body: LEGAL_PRIVACY_TR,
    contactLead: "KVKK ba\u015Fvurular\u0131 i\u00E7in:",
  },
  returns: {
    title: "\u0130ptal ve \u0130ade Ko\u015Fullar\u0131",
    updated: "Son g\u00FCncelleme: 8 Haziran 2026",
    body: LEGAL_RETURNS_TR,
    contactLead: "\u0130ade sorular\u0131 i\u00E7in:",
  },
};

const LEGAL_EN = {
  eyebrow: "Legal Information",
  contactHeading: "Contact",
  emailCta: "Contact us by email",
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: 8 June 2026",
    body: LEGAL_PRIVACY_EN,
    contactLead: "For privacy requests:",
  },
  returns: {
    title: "Returns & Cancellation",
    updated: "Last updated: 8 June 2026",
    body: LEGAL_RETURNS_EN,
    contactLead: "For return questions:",
  },
};

function wrap(lang, data) {
  return (
    '(function (g) {\n  "use strict";\n  g.Irem = g.Irem || {};\n  g.Irem.locales = g.Irem.locales || {};\n  g.Irem.locales.' +
    lang +
    " = " +
    JSON.stringify(data, null, 2) +
    ';\n})(typeof window !== "undefined" ? window : globalThis);\n'
  );
}

function loadLocale(rel, lang) {
  const code = fs.readFileSync(path.join(root, rel), "utf8").replace(/^\uFEFF/, "");
  const sandbox = {};
  const patched = code.replace(
    "})(typeof window !== \"undefined\" ? window : globalThis);",
    "})(sandbox);"
  );
  vm.runInNewContext(patched, { sandbox });
  return sandbox.Irem.locales[lang];
}

function deepSanitize(value) {
  if (typeof value === "string") {
    return value.replace(/\uFFFD/g, "");
  }
  if (Array.isArray(value)) return value.map(deepSanitize);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = deepSanitize(v);
    return out;
  }
  return value;
}

function writeLocale(lang) {
  const rel = `js/locales/${lang}.js`;
  const data = deepSanitize(loadLocale(rel, lang));
  data.legal = lang === "tr" ? LEGAL_TR : LEGAL_EN;
  fs.writeFileSync(path.join(root, rel), wrap(lang, data), "utf8");
  console.log("locale", rel);
  return data;
}

function buildProductLocales(tr, en) {
  const out = {};
  for (const slug of Object.keys(tr.products || {})) {
    const t = tr.products[slug];
    const e = en.products[slug];
    if (!t || !e || typeof t !== "object" || !t.name) continue;
    out[slug] = {
      tr: {
        name: t.name,
        desc: t.desc,
        price: t.price,
        careWash: t.careWash,
        careSize: t.careSize,
        careSafety: t.careSafety,
        wizard: tr.wizard?.[slug] || t.name,
      },
      en: {
        name: e.name,
        desc: e.desc,
        price: e.price,
        careWash: e.careWash,
        careSize: e.careSize,
        careSafety: e.careSafety,
        wizard: en.wizard?.[slug] || e.name,
      },
    };
  }
  return out;
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function patchHtmlFallback(file, patches) {
  let html = fs.readFileSync(path.join(root, file), "utf8");
  for (const [key, text] of Object.entries(patches)) {
    const re = new RegExp(
      `(data-i18n="${key}"[^>]*>)([\\s\\S]*?)(</[^>]+>)`,
      "g"
    );
    html = html.replace(re, `$1${escHtml(text)}$3`);
  }
  fs.writeFileSync(path.join(root, file), html, "utf8");
  console.log("html", file);
}

function patchMeta(file, meta) {
  let html = fs.readFileSync(path.join(root, file), "utf8");
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${escHtml(meta.desc)}">`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${escHtml(meta.ogTitle)}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${escHtml(meta.ogDesc)}">`
  );
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(meta.title)}</title>`);
  fs.writeFileSync(path.join(root, file), html, "utf8");
}

function fixJsComments() {
  const fixes = [
    ["js/irem-modal.js", /\/\*\*[\s\S]*?\*\//, "/**\n * Amigurumirem  Modals (care, Instagram outbound)\n */"],
    ["js/irem-cookie.js", /\/\*\*[\s\S]*?\*\//, "/**\n * Amigurumirem  Cookie consent banner\n */"],
    ["js/irem-utils.js", /\/\*\*[\s\S]*?\*\//, "/**\n * Amigurumirem  Shared utilities (i18n helper, HTML escape)\n */"],
    ["js/delight.js", /\/\*\*[\s\S]*?\*\//, null],
  ];
  for (const [rel, re, replacement] of fixes) {
    const file = path.join(root, rel);
    let src = fs.readFileSync(file, "utf8");
    if (src.includes("\uFFFD") || src.includes("") || /Amigura [^\w]/.test(src)) {
      if (replacement) {
        src = src.replace(re, replacement);
      } else {
        src = src.replace(/\uFFFD|/g, "");
        src = src.replace(/Amigura/g, "Amigurumirem");
      }
      fs.writeFileSync(file, src, "utf8");
      console.log("js comment", rel);
    }
  }
}

function replaceBuildLocales() {
  const stub = `/**
 * DEPRECATED: Canonical locales are js/locales/tr.js and en.js.
 * This module loads the TR locale object for legacy tooling only.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const code = fs
  .readFileSync(path.join(root, "js/locales/tr.js"), "utf8")
  .replace(
    '})(typeof window !== "undefined" ? window : globalThis);',
    "})(sandbox);"
  );
const sandbox = {};
vm.runInNewContext(code, { sandbox });
export default sandbox.Irem.locales.tr;
`;
  fs.writeFileSync(path.join(root, "scripts/build-locales.mjs"), stub, "utf8");
  console.log("scripts/build-locales.mjs (deprecated stub)");
}

function fixRepairLegalScript() {
  const file = path.join(root, "scripts/repair-legal.mjs");
  let src = fs.readFileSync(file, "utf8");
  src = src.replace(
    /function buildLegalBlock[\s\S]*?\n\}/,
    `function buildLegalBlock(lang, privacy, returns) {
  const legal = lang === "tr" ? ${JSON.stringify(LEGAL_TR, null, 2)} : ${JSON.stringify(LEGAL_EN, null, 2)};
  legal.privacy.body = privacy;
  legal.returns.body = returns;
  return '  "legal": ' + JSON.stringify(legal, null, 4).replace(/^/gm, "  ") + ",";
}`
  );
  fs.writeFileSync(file, src, "utf8");
  console.log("scripts/repair-legal.mjs");
}

// --- run ---
const tr = writeLocale("tr");
const en = writeLocale("en");

const productLocales = buildProductLocales(tr, en);
fs.writeFileSync(
  path.join(root, "scripts/product-locales.generated.json"),
  JSON.stringify(productLocales, null, 2) + "\n",
  "utf8"
);
console.log("scripts/product-locales.generated.json");

patchMeta("tesekkur.html", {
  desc: tr.meta.thanksDesc,
  ogTitle: tr.meta.thanksTitle,
  ogDesc: tr.thanks.lead,
  title: tr.meta.thanksTitle,
});
patchHtmlFallback("tesekkur.html", {
  "a11y.skip": tr.a11y.skip,
  "thanks.eyebrow": tr.thanks.eyebrow,
  "thanks.title": tr.thanks.title,
  "thanks.lead": tr.thanks.lead,
  "thanks.careTitle": tr.thanks.careTitle,
  "thanks.care1": tr.thanks.care1,
  "thanks.care2": tr.thanks.care2,
  "thanks.care3": tr.thanks.care3,
  "thanks.care4": tr.thanks.care4,
  "thanks.socialTitle": tr.thanks.socialTitle,
  "thanks.socialLead": tr.thanks.socialLead,
  "thanks.home": tr.thanks.home,
});

patchMeta("ozel-siparis.html", {
  desc: tr.meta.ozelDesc,
  ogTitle: tr.meta.ozelTitle,
  ogDesc: tr.wizard.lead,
  title: tr.meta.ozelTitle,
});
patchHtmlFallback("ozel-siparis.html", {
  "a11y.skip": tr.a11y.skip,
  "wizard.eyebrow": tr.wizard.eyebrow,
  "wizard.title": tr.wizard.title,
  "wizard.lead": tr.wizard.lead,
  "wizard.stepFigure": tr.wizard.stepFigure,
  "wizard.stepColor": tr.wizard.stepColor,
  "wizard.stepSize": tr.wizard.stepSize,
  "wizard.stepSummary": tr.wizard.stepSummary,
  "wizard.figureTitle": tr.wizard.figureTitle,
  "wizard.figureLead": tr.wizard.figureLead,
  "wizard.errFigure": tr.wizard.errFigure,
  "wizard.colorTitle": tr.wizard.colorTitle,
  "wizard.colorLead": tr.wizard.colorLead,
  "wizard.colorNone": tr.wizard.colorNone,
  "wizard.errColor": tr.wizard.errColor,
  "wizard.sizeTitle": tr.wizard.sizeTitle,
  "wizard.sizeLead": tr.wizard.sizeLead,
  "wizard.sizeLabel": tr.wizard.sizeLabel,
  "wizard.notesTitle": tr.wizard.notesTitle,
  "wizard.notesLead": tr.wizard.notesLead,
  "wizard.notesLabel": tr.wizard.notesLabel,
  "wizard.disclaimer": tr.wizard.disclaimer,
  "wizard.mailSend": tr.wizard.mailSend,
  "wizard.waSend": tr.wizard.waSend,
  "wizard.back": tr.wizard.back,
  "wizard.next": tr.wizard.next,
});

fixRepairLegalScript();
replaceBuildLocales();

const gitignore = path.join(root, ".gitignore");
const gi = fs.existsSync(gitignore) ? fs.readFileSync(gitignore, "utf8") : "";
if (!gi.includes(".history")) {
  fs.writeFileSync(gitignore, gi.trimEnd() + "\n.history/\n", "utf8");
  console.log(".gitignore + .history/");
}

// verify
let bad = 0;
function scanDir(dir, exts) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".git") continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === ".history") continue;
      scanDir(p, exts);
    } else if (exts.some((e) => ent.name.endsWith(e))) {
      const t = fs.readFileSync(p, "utf8");
      if (t.includes("\uFFFD")) {
        console.warn("STILL BAD:", path.relative(root, p));
        bad++;
      }
    }
  }
}
scanDir(root, [".js", ".html", ".json", ".mjs"]);
console.log(bad ? `WARN: ${bad} files still have corruption` : "OK: no corruption in active source");
