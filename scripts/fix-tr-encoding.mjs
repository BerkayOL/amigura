import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "js", "locales", "tr.js");
let content = fs.readFileSync(filePath, "utf8");

const fixes = [
  [
    /"lead": "[^"]*"/,
    '"lead": "Barbie\'den Sonic\'e, el rgs antalardan nostaljik telefonlara  ilmek ilmek el eme?i. Favorinizi sein ve Instagram\'da ke?fedin."',
  ],
  [/"buy": "Instagram'da G[^"]*"/, '"buy": "Instagram\'da Gr"'],
  [
    /"handoffTitle": "[^"]*"/,
    '"handoffTitle": "Instagram\'a ynlendiriliyorsunuz"',
  ],
  [
    /"handoffLoading": "[^"]*"/,
    '"handoffLoading": "rn gnderisine ynlendiriliyorsunuz"',
  ],
  [
    /"handoffLead": "[^"]*"/,
    '"handoffLead": "Sipari? ve ileti?im iin rnn Instagram gnderisine ynlendiriliyorsunuz. Amigura atlyesinden zenle haz?rlanm?? paralar."',
  ],
  [
    /"handoffLi1": "[^"]*"/,
    '"handoffLi1": "@amigura resmi Instagram hesab?"',
  ],
  [
    /"handoffLi2": "[^"]*"/,
    '"handoffLi2": "DM ile h?zl? ileti?im ve sipari?"',
  ],
  [
    /"handoffLi3": "[^"]*"/,
    '"handoffLi3": "El yap?m? rnlerde zenli paketleme"',
  ],
  [
    /"handoffLi4": "[^"]*"/,
    '"handoffLi4": "Atlyeden do?rudan, ki?isel hizmet"',
  ],
  [
    /"quickViewTrust1": "[^"]*"/,
    '"quickViewTrust1": "Instagram zerinden gvenli ileti?im"',
  ],
  [
    /"quickViewTrust2": "[^"]*"/,
    '"quickViewTrust2": "zenli paketleme ve teslimat"',
  ],
  [
    /"checkoutSub": "[^"]*"/,
    '"checkoutSub": "Instagram gnderisinden sipari?"',
  ],
];

for (const [pattern, value] of fixes) {
  content = content.replace(pattern, value);
}

fs.writeFileSync(filePath, content, "utf8");
console.log("Fixed tr.js encoding and Instagram copy");
