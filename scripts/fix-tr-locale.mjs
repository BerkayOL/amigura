import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "js", "locales", "tr.js");
let content = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");

const lead =
  "Barbie'den Sonic'e, el \u00f6rg\u00fcs\u00fc \u00e7antalardan nostaljik telefonlara \u2014 ilmek ilmek el eme\u011fi. Favorinizi se\u00e7in ve Instagram'da ke\u015ffedin.";

content = content.replace(/("products":\s*\{[\s\S]*?"title":\s*"[^"]+",\s*"lead":\s*)"[^"]*"/, `$1"${lead}"`);

content = content.replace(/("product":\s*\{[\s\S]*?"buy":\s*)"[^"]*"/, `$1"Instagram'da G\u00f6r"`);

content = content.replace(
  /("checkoutHeading":\s*"[^"]+",\s*"checkoutSub":\s*)"[^"]*"/,
  `$1"Instagram g\u00f6nderisinden sipari\u015f"`,
);

content = content.replace(
  /("checkoutSub":\s*"Instagram g\u00f6nderisinden sipari\u015f",\s*"verifiedNote":\s*)"[^"]*"/,
  `$1"Instagram DM ile h\u0131zl\u0131 ileti\u015fim"`,
);

const modal = {
  handoffTitle: "Instagram'a y\u00f6nlendiriliyorsunuz",
  handoffLoading: "\u00dcr\u00fcn g\u00f6nderisine y\u00f6nlendiriliyorsunuz\u2026",
  handoffLead:
    "Sipari\u015f ve ileti\u015fim i\u00e7in \u00fcr\u00fcn\u00fcn Instagram g\u00f6nderisine y\u00f6nlendiriliyorsunuz. Amigura at\u00f6lyesinden \u00f6zenle haz\u0131rlanm\u0131\u015f par\u00e7alar.",
  handoffLi1: "@amigura resmi Instagram hesab\u0131",
  handoffLi2: "DM ile h\u0131zl\u0131 ileti\u015fim ve sipari\u015f",
  handoffLi3: "El yap\u0131m\u0131 \u00fcr\u00fcnlerde \u00f6zenli paketleme",
  handoffLi4: "At\u00f6lyeden do\u011frudan, ki\u015fisel hizmet",
  quickViewTrust1: "Instagram \u00fczerinden g\u00fcvenli ileti\u015fim",
  quickViewTrust2: "\u00d6zenli paketleme ve teslimat",
};

for (const [key, value] of Object.entries(modal)) {
  content = content.replace(new RegExp(`("${key}":\\s*)"[^"]*"`), `$1"${value}"`);
}

fs.writeFileSync(filePath, content, "utf8");
console.log("Fixed tr.js locale strings");
