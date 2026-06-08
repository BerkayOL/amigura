import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function patch(file, replacements) {
  let text = fs.readFileSync(path.join(root, file), "utf8");
  for (const [pattern, value] of replacements) {
    text = text.replace(pattern, value);
  }
  fs.writeFileSync(path.join(root, file), text, "utf8");
  console.log("patched", file);
}

patch("js/locales/tr.js", [
  [/"colorTitleCharacter": "[^"]+"/, '"colorTitleCharacter": "{figure} \u2014 karakter renkleri"'],
  [/"colorLeadCharacter": "[^"]+"/, '"colorLeadCharacter": "{figure} i\u00E7in \u00F6zg\u00FCn karakter tonlar\u0131. Vurgulamak istedi\u011Finiz renkleri se\u00E7in (en fazla 4)."'],
  [/"colorLead": "[^"]+"/, '"colorLead": "Genel renk paletinden en fazla 4 ton se\u00E7ebilirsiniz."'],
]);

patch("js/locales/en.js", [
  [/"colorTitleCharacter": "[^"]+"/, '"colorTitleCharacter": "{figure} \u2014 character colours"'],
  [/"colorLead": "[^"]+"/, '"colorLead": "Choose up to 4 tones from the general palette."'],
]);
