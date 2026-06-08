import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "js", "locales", "en.js");
let c = fs.readFileSync(filePath, "utf8");
const D = "\u00B0";
const MID = "\u00B7";
const EM = "\u2014";

c = c.replace(/"eyebrow": "Amigura[^"]*Handmade Art"/, `"eyebrow": "Amigura ${MID} Handmade Art"`);
c = c.replace(/"careWash": "Cold wash \(30[^"]*\), mild detergent\."/g, `"careWash": "Cold wash (30${D}C), mild detergent."`);
c = c.replace(/\(30C\)/g, `(30${D}C)`);
c = c.replace(/"home": "Amigura - Home"/, `"home": "Amigura ${EM} Home"`);
c = c.replace(/"stickyBuy": "Buy on Instagram"/, '"stickyBuy": "View on Instagram"');
c = c.replace(/"alt": "\{name\} - handmade/, `"alt": "{name} ${EM} handmade`);
c = c.replace(/"viewOnIg": "\{alt\} - view/, `"viewOnIg": "{alt} ${EM} view`);
c = c.replace(/"careTitle": "\{name\} - Care/, `"careTitle": "{name} ${EM} Care`);
c = c.replace(/"mailSubject": "Custom Order - /, `"mailSubject": "Custom Order ${EM} `);
c = c.replace(/ - decorative/g, ` ${EM} decorative`);
c = c.replace(/ - vintage/g, ` ${EM} vintage`);
c = c.replace(/ - set for/g, ` ${EM} set for`);
c = c.replace(/ - colourful/g, ` ${EM} colourful`);

fs.writeFileSync(filePath, c, "utf8");
console.log("EN cleanup complete");
