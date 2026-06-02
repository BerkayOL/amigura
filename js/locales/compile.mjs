import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

function wrap(lang, data) {
  return (
    '(function (g) {\n  "use strict";\n  g.Irem = g.Irem || {};\n  g.Irem.locales = g.Irem.locales || {};\n  g.Irem.locales.' +
    lang +
    " = " +
    JSON.stringify(data, null, 2) +
    ';\n})(typeof window !== "undefined" ? window : globalThis);\n'
  );
}

for (const lang of ["tr", "en"]) {
  const jsonPath = path.join(dir, lang + ".json");
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  fs.writeFileSync(path.join(dir, lang + ".js"), wrap(lang, data), "utf8");
  console.log("Compiled", lang + ".js");
}
