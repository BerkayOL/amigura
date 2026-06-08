/**
 * Patch tr.js / en.js with generated product catalog locales
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const generated = JSON.parse(
  fs.readFileSync(path.join(__dirname, "product-locales.generated.json"), "utf8")
);

const REVIEWS_TR = {
  lead:
    "Barbie'den Sonic'e, el ùrgùsù ùantalardan nostaljik telefonlara ù ilmek ilmek el eme?i. Favorinizi seùin ve Trendyol ùzerinden gùvenle sipari? verin.",
  r1: {
    quote:
      "K?z?m Elsa figùrùnù her gece kucu?una bas?yor. Dokusu gerùekten farkl? ù ma?aza oyunca?? gibi de?il, s?cak ve yumu?ak.",
    name: "Elif K.",
    city: "?stanbul",
    product: "Elsa Amigurumi",
  },
  r2: {
    quote:
      "Kuromi'nin pembe-siyah detaylar? foto?raftan bile belli oluyor. Trendyol sipari?ine ra?men butik hissi verdi.",
    name: "Mert A.",
    city: "Ankara",
    product: "Kuromi Amigurumi",
  },
  r3: {
    quote:
      "Wednesday figùrùnùn saù ùrgùsù ve ifadesi harika. Koleksiyon parùas? olarak vitrinde duruyor.",
    name: "Zeynep D.",
    city: "?zmir",
    product: "Wednesday Amigurumi",
  },
  r4: {
    quote:
      "O?lum 3 ya??nda; Olaf'?n yumu?ak dokusu ve gùvenli gùz detay? iùin tercih ettik. Tam istedi?imiz gibiydi.",
    name: "Ay?e T.",
    city: "Bursa",
    product: "Olaf Amigurumi",
  },
  r5: {
    quote:
      "Maui figùrùnùn i?ùili?i mùkemmel. Hediye notu da ùok tatl?yd?, te?ekkùrler ?rem Han?m.",
    name: "Can Y.",
    city: "Antalya",
    product: "Maui Amigurumi",
  },
};

const REVIEWS_EN = {
  lead:
    "From Barbie to Sonic, crochet bags to nostalgic phones ù stitch by stitch handcraft. Pick your favourite and order safely on Trendyol.",
  r1: {
    quote:
      "My daughter hugs her Elsa figure every night. The texture is so different from store toys ù warm and soft.",
    name: "Elif K.",
    city: "Istanbul",
    product: "Elsa Amigurumi",
  },
  r2: {
    quote:
      "Kuromi's pink-black details are stunning even in photos. Felt boutique despite ordering on Trendyol.",
    name: "Mert A.",
    city: "Ankara",
    product: "Kuromi Amigurumi",
  },
  r3: {
    quote:
      "Wednesday's braids and expression are wonderful. It sits proudly in our display cabinet.",
    name: "Zeynep D.",
    city: "Izmir",
    product: "Wednesday Amigurumi",
  },
  r4: {
    quote:
      "We chose Olaf for our 3-year-old ù soft touch and safe embroidered eyes. Exactly what we hoped for.",
    name: "Ayse T.",
    city: "Bursa",
    product: "Olaf Amigurumi",
  },
  r5: {
    quote:
      "Maui's craftsmanship is excellent. Lovely gift note too ù thank you Irem.",
    name: "Can Y.",
    city: "Antalya",
    product: "Maui Amigurumi",
  },
};

function patchFile(filename, productsBlock, wizardBlock, reviews) {
  let src = fs.readFileSync(path.join(ROOT, "js", "locales", filename), "utf8");

  src = src.replace(/  "products": \{[\s\S]*?\n  \},\n  "product":/, productsBlock + ',\n  "product":');

  for (let i = 1; i <= 5; i++) {
    const r = reviews["r" + i];
    const re = new RegExp(
      `"r${i}": \\{[\\s\\S]*?"product": "[^"]*"\\n    \\}`,
      "m"
    );
    src = src.replace(
      re,
      `"r${i}": {
      "quote": ${JSON.stringify(r.quote)},
      "name": ${JSON.stringify(r.name)},
      "city": ${JSON.stringify(r.city)},
      "product": ${JSON.stringify(r.product)}
    }`
    );
  }

  src = src.replace(
    /"figureGroup": "Figùr tipi",\n    "harryPotter":[\s\S]*?"ronald": "[^"]*"/,
    `"figureGroup": "Figùr tipi",\n${wizardBlock}`
  );

  if (filename === "en.js") {
    src = src.replace(/"figureGroup": "Figure type",\n    "harryPotter":[\s\S]*?"ronald": "[^"]*"/, 
      `"figureGroup": "Figure type",\n${wizardBlock}`);
  }

  fs.writeFileSync(path.join(ROOT, "js", "locales", filename), src, "utf8");
  console.log("Patched", filename);
}

const productsTr = `  "products": {\n    "sectionLabel": "ùrùn koleksiyonu",\n    "eyebrow": "Koleksiyon",\n    "title": "ùzenle ùrùlen Parùalar",\n    "lead": ${JSON.stringify(REVIEWS_TR.lead)},\n${generated.productsTr}\n  }`;

const productsEn = `  "products": {\n    "sectionLabel": "Product collection",\n    "eyebrow": "Collection",\n    "title": "Carefully Crocheted Pieces",\n    "lead": ${JSON.stringify(REVIEWS_EN.lead)},\n${generated.productsEn}\n  }`;

patchFile("tr.js", productsTr, generated.wizardTr, REVIEWS_TR);
patchFile("en.js", productsEn, generated.wizardEn, REVIEWS_EN);
