import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const HP_PRODUCTS_TR = `    "harryPotter": {
      "name": "Harry Potter Amigurumi",
      "desc": "Yuvarlak gözlük, Gryffindor atk? ve y?ld?z i?lemeli ?apka ile sevilen büyücü.",
      "price": "549 ?",
      "careWash": "So?uk y?kama (30°C), yumu?ak deterjan.",
      "careSize": "Yakla??k 18 cm oturur pozisyon.",
      "careSafety": "Güvenli göz i?leme; 3 ya? alt? için uygundur."
    },
    "hermione": {
      "name": "Hermione Granger Amigurumi",
      "desc": "Kahverengi bukle saç, Hogwarts uniformas? ve asa detay?yla zeki kahraman.",
      "price": "529 ?",
      "careWash": "So?uk y?kama, sererek kurutma.",
      "careSize": "Yakla??k 17 cm oturur pozisyon.",
      "careSafety": "Organik pamuk iplik; el nak??? detaylar."
    },
    "malefiz": {
      "name": "Malefiz Amigurumi",
      "desc": "Siyah pelerin, boynuzlu ba?l?k ve mor aksesuarlarla görkemli kötü karakter.",
      "price": "579 ?",
      "careWash": "So?uk y?kama, sererek kurutma.",
      "careSize": "Yakla??k 19 cm (ba?l?k detay?yla).",
      "careSafety": "S?n?rl? seri; kalite kontrollü el i?çili?i."
    },
    "ronald": {
      "name": "Ronald Weasley Amigurumi",
      "desc": "Turuncu saç, Gryffindor kazak ve sevimli ifadeyle sad?k arkada?.",
      "price": "499 ?",
      "careWash": "So?uk y?kama, sererek kurutma.",
      "careSize": "Yakla??k 17 cm oturur pozisyon.",
      "careSafety": "Güvenli diki? ve göz i?leme."
    },`;

const HP_PRODUCTS_EN = `    "harryPotter": {
      "name": "Harry Potter Amigurumi",
      "desc": "Round glasses, Gryffindor scarf and star-embroidered hat - the beloved wizard.",
      "price": "549 TRY",
      "careWash": "Cold wash (30C), mild detergent.",
      "careSize": "Approx. 18 cm sitting.",
      "careSafety": "Safe embroidered eyes; suitable under 3 with supervision."
    },
    "hermione": {
      "name": "Hermione Granger Amigurumi",
      "desc": "Brown curly hair, Hogwarts uniform and wand detail - the clever hero.",
      "price": "529 TRY",
      "careWash": "Cold wash, lay flat to dry.",
      "careSize": "Approx. 17 cm sitting.",
      "careSafety": "Organic cotton yarn; hand-embroidered details."
    },
    "malefiz": {
      "name": "Maleficent Amigurumi",
      "desc": "Black cape, horned headpiece and purple accents - a striking villain.",
      "price": "579 TRY",
      "careWash": "Cold wash, lay flat to dry.",
      "careSize": "Approx. 19 cm (with headpiece).",
      "careSafety": "Limited edition; quality-controlled handcraft."
    },
    "ronald": {
      "name": "Ronald Weasley Amigurumi",
      "desc": "Ginger hair, Gryffindor jumper and a warm loyal expression.",
      "price": "499 TRY",
      "careWash": "Cold wash, lay flat to dry.",
      "careSize": "Approx. 17 cm sitting.",
      "careSafety": "Secure stitching and embroidered eyes."
    },`;

const HP_WIZARD_TR = `    "harryPotter": "Harry Potter",
    "hermione": "Hermione Granger",
    "malefiz": "Malefiz",
    "ronald": "Ronald Weasley",`;

const HP_WIZARD_EN = `    "harryPotter": "Harry Potter",
    "hermione": "Hermione Granger",
    "malefiz": "Maleficent",
    "ronald": "Ronald Weasley",`;

function patchFile(file, isTr) {
  let src = fs.readFileSync(path.join(ROOT, "js", "locales", file), "utf8");

  const replacements = isTr
    ? [
        [/Trendyol üzerinden güvenle sipari? verin/g, "Instagram üzerinden ke?fedin ve sipari? verin"],
        [/Trendyol sat??lar?/g, "Instagram sipari?leri"],
        [/Trendyol üzerinden güvenle sipari? verin\./g, "Instagram'da ke?fedin ve sipari? verin."],
        [/Trendyol üzerinden güvenle sipari? verin/g, "Instagram'da ke?fedin ve sipari? verin"],
        [/"trendyol": "Trendyol güvenli ödeme"/g, '"instagram": "Instagram\'da sipari?"'],
        [/Trendyol üzerinden güvenle sipari? verin/g, "Instagram'da ke?fedin ve sipari? verin"],
        [
          /"lead": "[^"]*Trendyol[^"]*"/,
          '"lead": "Barbie\'den Sonic\'e, el örgüsü çantalardan nostaljik telefonlara — ilmek ilmek el eme?i. Favorinizi seçin ve Instagram\'da ke?fedin."',
        ],
        [/"buy": "Trendyol'da Al"/g, '"buy": "Instagram\'da Gör"'],
        [/"buyGift": "Hediye Gönder"/g, '"buyGift": "Instagram\'da Gör"'],
        [/Trendyol'da \{name\}/g, "Instagram'da {name}"],
        [/Trendyol'da hediye/g, "Instagram'da hediye"],
        [/"stickyBuy": "Trendyol'da sat?n al"/g, '"stickyBuy": "Instagram\'da Gör"'],
        [/"checkoutHeading": "Sat?n alma"/g, '"checkoutHeading": "Sipari?"'],
        [/"checkoutSub": "Trendyol üzerinden güvenli ödeme"/g, '"checkoutSub": "Instagram üzerinden sipari? ve ileti?im"'],
        [/"verifiedNote": "[^"]*"/g, '"verifiedNote": "Instagram DM ile h?zl? ileti?im"'],
        [/Trendyol/g, "Instagram"],
      ]
  : [
        [/Order safely on Trendyol/g, "Discover and order on Instagram"],
        [/Trendyol orders/g, "Instagram orders"],
        [/order securely on Trendyol/g, "view and order on Instagram"],
        [/"trendyol": "Secure Trendyol checkout"/g, '"instagram": "Order on Instagram"'],
        [
          /"lead": "[^"]*Trendyol[^"]*"/,
          '"lead": "From Barbie to Sonic, crochet bags to nostalgic phones - stitch by stitch handcraft. Discover your favourite on Instagram."',
        ],
        [/"buy": "Shop on Trendyol"/g, '"buy": "View on Instagram"'],
        [/"buyGift": "Send as a gift"/g, '"buyGift": "View on Instagram"'],
        [/on Trendyol/g, "on Instagram"],
        [/"stickyBuy": "Buy on Trendyol"/g, '"stickyBuy": "View on Instagram"'],
        [/"checkoutHeading": "Checkout"/g, '"checkoutHeading": "Order"'],
        [/"checkoutSub": "Secure payment through Trendyol"/g, '"checkoutSub": "Order and contact via Instagram"'],
        [/"verifiedNote": "[^"]*"/g, '"verifiedNote": "Quick contact via Instagram DM"'],
        [/Trendyol/g, "Instagram"],
      ];

  for (const [pattern, replacement] of replacements) {
    src = src.replace(pattern, replacement);
  }

  if (!src.includes('"harryPotter":')) {
    src = src.replace(
      /("maui": \{[\s\S]*?\n    \},)\n(\s+"wednesday":)/,
      `$1\n${isTr ? HP_PRODUCTS_TR : HP_PRODUCTS_EN}\n$2`
    );
  }

  if (!src.includes('"wizard"') || !src.match(/"wizard":[\s\S]*"harryPotter"/)) {
    src = src.replace(
      /("maui": "[^"]*",)\n(\s+"wednesday":)/,
      `$1\n${isTr ? HP_WIZARD_TR : HP_WIZARD_EN}\n$2`
    );
  }

  if (!src.includes('"returnsBody"')) {
    src = src.replace(
      /("handmadeNote": "[^"]*",)\n(\s+"status":)/,
      `$1\n    "returnsBody": ${JSON.stringify(
        isTr
          ? "Koleksiyon sipari?leri Instagram üzerinden al?n?r. Özel sipari?ler için özel sipari? sihirbaz?n? veya ileti?im kanallar?m?z? kullanabilirsiniz."
          : "Collection orders are placed via Instagram. For custom pieces, use our custom order wizard or contact channels."
      )},\n$2`
    );
  }

  fs.writeFileSync(path.join(ROOT, "js", "locales", file), src, "utf8");
  console.log("Patched", file);
}

patchFile("tr.js", true);
patchFile("en.js", false);
