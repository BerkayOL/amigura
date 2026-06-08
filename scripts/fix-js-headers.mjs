import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const HEADERS = {
  "js/irem-modal.js": "Amigurumirem - Modals (care, Instagram outbound)",
  "js/irem-cookie.js": "Amigurumirem - Cookie consent banner",
  "js/irem-utils.js": "Amigurumirem - Shared utilities (i18n helper, HTML escape)",
  "js/delight.js": "Amigurumirem P3 - Yarn cursor, opt-in micro-sound, idle-safe rAF",
  "js/irem-brand.js": "Amigurumirem - Brand mark and wordmark",
  "js/irem-nav.js": "Amigurumirem - Mobile and desktop navigation",
  "js/products-data.js": "Amigurumirem - Product catalog (locale keys via Irem.I18n)",
  "js/ozel-app.js": "Amigurumirem - Custom order page bootstrap",
  "js/page-unlock.js": "Amigurumirem - Page transition unlock helper",
  "js/product-status.js": "Amigurumirem - Product availability labels",
};

function stripCorruption(src) {
  return src.replace(/\uFFFD/g, "");
}

function fixFile(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return;
  let src = fs.readFileSync(file, "utf8");
  const title = HEADERS[rel];
  if (title) {
    src = src.replace(/\/\*\*[\s\S]*?\*\//, `/**\n * ${title}\n */`);
  }
  src = stripCorruption(src);
  fs.writeFileSync(file, src, "utf8");
  console.log("fixed", rel);
}

for (const rel of Object.keys(HEADERS)) fixFile(rel);

function walkScripts(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== "node_modules") walkScripts(p);
      continue;
    }
    if (!ent.name.endsWith(".mjs")) continue;
    if (
      ent.name === "legal-content.mjs" ||
      ent.name === "gen-legal-content.mjs" ||
      ent.name === "fix-js-headers.mjs"
    ) {
      continue;
    }
    let src = fs.readFileSync(p, "utf8");
    if (!src.includes("\uFFFD")) continue;
    src = stripCorruption(src);
    fs.writeFileSync(p, src, "utf8");
    console.log("stripped", path.relative(root, p));
  }
}

walkScripts(path.join(root, "scripts"));
