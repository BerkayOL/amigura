import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "urun.html");
let content = fs.readFileSync(filePath, "utf8");
content = content.replace(/<title>[^<]*<\/title>/, "<title>Ürün | Amigura</title>");
content = content.replace(
  /<a class="skip-link" href="#main" data-i18n="a11y.skip">[^<]*<\/a>/,
  '<a class="skip-link" href="#main" data-i18n="a11y.skip">?çeri?e atla</a>',
);
content = content.replace(
  /<span class="pdp__crumb-current" id="pdp-crumb-current">[^<]*<\/span>/,
  '<span class="pdp__crumb-current" id="pdp-crumb-current">Ürün</span>',
);
fs.writeFileSync(filePath, content, "utf8");
console.log("Fixed urun.html");
