import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "js", "locales", "tr.js");
let content = fs.readFileSync(filePath, "utf8");

const fixes = [
  [
    /"lead": "[^"]*"/,
    '"lead": "Barbie\'den Sonic\'e, el örgüsü çantalardan nostaljik telefonlara — ilmek ilmek el eme?i. Favorinizi seçin ve Instagram\'da ke?fedin."',
  ],
  [/"buy": "Instagram'da G[^"]*"/, '"buy": "Instagram\'da Gör"'],
  [
    /"handoffTitle": "[^"]*"/,
    '"handoffTitle": "Instagram\'a yönlendiriliyorsunuz"',
  ],
  [
    /"handoffLoading": "[^"]*"/,
    '"handoffLoading": "Ürün gönderisine yönlendiriliyorsunuz…"',
  ],
  [
    /"handoffLead": "[^"]*"/,
    '"handoffLead": "Sipari? ve ileti?im için ürünün Instagram gönderisine yönlendiriliyorsunuz. Amigura atölyesinden özenle haz?rlanm?? parçalar."',
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
    '"handoffLi3": "El yap?m? ürünlerde özenli paketleme"',
  ],
  [
    /"handoffLi4": "[^"]*"/,
    '"handoffLi4": "Atölyeden do?rudan, ki?isel hizmet"',
  ],
  [
    /"quickViewTrust1": "[^"]*"/,
    '"quickViewTrust1": "Instagram üzerinden güvenli ileti?im"',
  ],
  [
    /"quickViewTrust2": "[^"]*"/,
    '"quickViewTrust2": "Özenli paketleme ve teslimat"',
  ],
  [
    /"checkoutSub": "[^"]*"/,
    '"checkoutSub": "Instagram gönderisinden sipari?"',
  ],
];

for (const [pattern, value] of fixes) {
  content = content.replace(pattern, value);
}

fs.writeFileSync(filePath, content, "utf8");
console.log("Fixed tr.js encoding and Instagram copy");
