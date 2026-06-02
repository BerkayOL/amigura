import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { tr as trBase } from "./tr-data.mjs";
import { en as enBase } from "./en-data.mjs";
const root = path.dirname(fileURLToPath(import.meta.url));
const legalDir = path.join(root, "legal");
const outDir = path.join(root, "..", "js", "locales");

function readLegal(name) {
  return fs.readFileSync(path.join(legalDir, name), "utf8").trim();
}

function sanitizeEnString(str) {
  if (typeof str !== "string") return str;
  const isHtml = /<[a-z][\s\S]*>/i.test(str);
  let out = str
    .replace(/\u2014/g, " - ")
    .replace(/\u2013/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00b0C/g, "C")
    .replace(/\((\d+)\s*-\s*C\)/g, "($1C)")
    .replace(/\u00b0/g, "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u00b7/g, " | ")
    .replace(/[\u00a0]/g, " ");
  if (!isHtml) {
    out = out.replace(/\s+/g, " ").replace(/ \-/g, " -").trim();
  } else {
    out = out.trim();
  }
  return out;
}

function sanitizeEnObject(obj) {
  if (typeof obj === "string") return sanitizeEnString(obj);
  if (Array.isArray(obj)) return obj.map(sanitizeEnObject);
  if (obj && typeof obj === "object") {
    const out = {};
    for (const key of Object.keys(obj)) {
      out[key] = sanitizeEnObject(obj[key]);
    }
    return out;
  }
  return obj;
}

function wrap(lang, data) {
  return (
    '(function (g) {\n  "use strict";\n  g.Irem = g.Irem || {};\n  g.Irem.locales = g.Irem.locales || {};\n  g.Irem.locales.' +
    lang +
    " = " +
    JSON.stringify(data, null, 2) +
    ';\n})(typeof window !== "undefined" ? window : globalThis);\n'
  );
}

const tr = {
  ...trBase,
  meta: {
    ...trBase.meta,
    kvkkDesc:
      "Amigura KVKK ve Gizlilik Politikas\u0131 - Ki\u015fisel verilerin korunmas\u0131 hakk\u0131nda bilgilendirme.",
    iadeDesc:
      "Amigura \u0130ptal ve \u0130ade Ko\u015fullar\u0131 - Trendyol sat\u0131\u015flar\u0131 ve ki\u015fiye \u00f6zel \u00fcr\u00fcn istisnalar\u0131.",
  },
  legal: {
    eyebrow: "Yasal Bilgilendirme",
    contactHeading: "\u0130leti\u015fim",
    privacy: {
      title: "KVKK ve Gizlilik Politikas\u0131",
      updated: "Son g\u00fcncelleme: 1 Haziran 2026",
      body: readLegal("privacy-tr.html"),
      contactLead: "KVKK ba\u015fvurular\u0131 i\u00e7in:",
    },
    returns: {
      title: "\u0130ptal ve \u0130ade Ko\u015fullar\u0131",
      updated: "Son g\u00fcncelleme: 1 Haziran 2026",
      body: readLegal("returns-tr.html"),
      contactLead: "\u0130ade sorular\u0131 i\u00e7in:",
    },
  },
};

const en = {
  ...enBase,
  meta: {
    ...enBase.meta,
    kvkkDesc:
      "Amigura Privacy Policy - How we collect and use personal data on our showcase website.",
    iadeDesc:
      "Amigura Returns and Cancellation Policy - Trendyol orders and custom-made exceptions.",
  },
  legal: {
    eyebrow: "Legal Information",
    contactHeading: "Contact",
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: 1 June 2026",
      body: readLegal("privacy-en.html"),
      contactLead: "Privacy enquiries:",
    },
    returns: {
      title: "Returns and Cancellation Policy",
      updated: "Last updated: 1 June 2026",
      body: readLegal("returns-en.html"),
      contactLead: "Returns enquiries:",
    },
  },
};

const enSafe = sanitizeEnObject(en);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "tr.js"), wrap("tr", tr), "utf8");
fs.writeFileSync(path.join(outDir, "en.js"), wrap("en", enSafe), "utf8");

console.log("Rebuilt tr.js and en.js with legal content");
