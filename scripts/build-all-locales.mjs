import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { tr } from "./tr-data.mjs";
import { en } from "./en-data.mjs";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "js", "locales");

function wrap(lang, data) {
  return (
    '(function (g) {\n  "use strict";\n  g.Irem = g.Irem || {};\n  g.Irem.locales = g.Irem.locales || {};\n  g.Irem.locales.' +
    lang +
    " = " +
    JSON.stringify(data, null, 2) +
    ';\n})(typeof window !== "undefined" ? window : globalThis);\n'
  );
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "tr.js"), wrap("tr", tr), "utf8");
fs.writeFileSync(path.join(outDir, "en.js"), wrap("en", en), "utf8");
console.log("Built js/locales/tr.js and en.js");
