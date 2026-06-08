import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SLUGS = [
  "barbie", "elsa", "olaf", "moana", "maui", "wednesday", "thing", "pugsleyAddams",
  "enidSinclair", "kuromi", "myMelody", "sonicBlue", "sonicRed", "sonicBlack", "tails",
  "lolSurpriseDoll", "crossbodyPaperBag", "lavenderClutch", "nostalgicPhoneBlue",
  "nostalgicPhonePink", "nostalgicPhoneOrange", "fruitSet", "vegetableSet", "trexDinosaur",
];

function productEntry(slug, tr, en) {
  return {
    tr: {
      name: tr[0],
      desc: tr[1],
      price: tr[2],
      careWash: tr[3],
      careSize: tr[4],
      careSafety: tr[5],
      wizard: tr[6],
    },
    en: {
      name: en[0],
      desc: en[1],
      price: en[2],
      careWash: en[3],
      careSize: en[4],
      careSafety: en[5],
      wizard: en[6],
    },
  };
}

const DATA = {
  barbie: productEntry("barbie",
    ["Barbie Amigurumi", "\u0130konik pembe tonlar\u0131, \u00f6zenli sa\u00e7 detay\u0131 ve zarif elbise i\u015flemesiyle klasik Barbie sil\u00fceti.", "549 \u20ba", "So\u011fuk y\u0131kama (30\u00b0C), yumu\u015fak deterjan.", "Yakla\u015f\u0131k 20 cm oturur pozisyon.", "G\u00fcvenli g\u00f6z i\u015fleme; organik pamuk iplik.", "Barbie"],
    ["Barbie Amigurumi", "Classic Barbie silhouette with signature pink tones, detailed hair and a delicate dress finish.", "549 TRY", "Cold wash (30C), mild detergent.", "Approx. 20 cm sitting.", "Safe embroidered eyes; organic cotton yarn.", "Barbie"]
  ),
  elsa: productEntry("elsa",
    ["Elsa Amigurumi", "Buz mavisi elbise, \u00f6rg\u00fc sa\u00e7 \u00f6rg\u00fcs\u00fc ve kar tanesi detaylar\u0131yla Arendelle prensesi.", "579 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 19 cm oturur pozisyon.", "El nak\u0131\u015f\u0131 detaylar; yumu\u015fak dokulu iplik.", "Elsa"],
    ["Elsa Amigurumi", "Arendelle princess with ice-blue gown, braided hair and snowflake accents.", "579 TRY", "Cold wash, lay flat to dry.", "Approx. 19 cm sitting.", "Hand-embroidered details; soft-touch yarn.", "Elsa"]
  ),
  olaf: productEntry("olaf",
    ["Olaf Amigurumi", "Sevimli havu\u00e7 burun, dala\u00e7 kollar ve s\u0131cak g\u00fcl\u00fcmsemeyle k\u0131\u015f\u0131n en sevilen kardan adam\u0131.", "499 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 16 cm oturur pozisyon.", "\u00c7ocuklar i\u00e7in g\u00fcvenli diki\u015f ve g\u00f6z i\u015fleme.", "Olaf"],
    ["Olaf Amigurumi", "Beloved snowman with carrot nose, twig arms and a warm cheerful smile.", "499 TRY", "Cold wash, lay flat to dry.", "Approx. 16 cm sitting.", "Child-safe stitching and embroidered eyes.", "Olaf"]
  ),
  moana: productEntry("moana",
    ["Moana Amigurumi", "Tropikal renkler, \u00f6zg\u00fcr ruhlu ifade ve el i\u015fi aksesuar detaylar\u0131yla cesur denizci k\u0131z\u0131.", "569 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 18 cm oturur pozisyon.", "Organik pamuk iplik; el eme\u011fi kalite kontrol\u00fc.", "Moana"],
    ["Moana Amigurumi", "Brave wayfinder with tropical colours, spirited expression and hand-finished accessories.", "569 TRY", "Cold wash, lay flat to dry.", "Approx. 18 cm sitting.", "Organic cotton yarn; hand-finished quality check.", "Moana"]
  ),
  maui: productEntry("maui",
    ["Maui Amigurumi", "G\u00fc\u00e7l\u00fc sil\u00fcet, d\u00f6vme desenli detaylar ve karakteristik sa\u00e7/topuz i\u015f\u00e7ili\u011fiyle efsanevi yar\u0131 tanr\u0131.", "589 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 20 cm oturur pozisyon.", "S\u0131n\u0131rl\u0131 \u00fcretim; \u00f6zenli el nak\u0131\u015f\u0131.", "Maui"],
    ["Maui Amigurumi", "Legendary demigod with bold silhouette, tattoo-style details and signature topknot.", "589 TRY", "Cold wash, lay flat to dry.", "Approx. 20 cm sitting.", "Limited run; careful hand embroidery.", "Maui"]
  ),
  wednesday: productEntry("wednesday",
    ["Wednesday Amigurumi", "Siyah elbise, \u00f6rg\u00fcl\u00fc sa\u00e7 ve karakteristik ciddi ifadeyle Addams ailesinin ikonik k\u0131z\u0131.", "559 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 18 cm oturur pozisyon.", "Koleksiyon par\u00e7as\u0131; el i\u015f\u00e7ili\u011fi detaylar.", "Wednesday"],
    ["Wednesday Amigurumi", "Iconic Addams daughter with black dress, braided hair and signature solemn expression.", "559 TRY", "Cold wash, lay flat to dry.", "Approx. 18 cm sitting.", "Collector piece; handcrafted details.", "Wednesday"]
  ),
  thing: productEntry("thing",
    ["Thing Amigurumi", "Wednesday evreninden sevimli el fig\u00fcr\u00fc \u2014 ifadeli parmak detaylar\u0131 ve yumu\u015fak dokulu \u00f6rg\u00fc.", "449 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 12 cm.", "Dekoratif ve oyun ama\u00e7l\u0131; g\u00fcvenli diki\u015f.", "Thing"],
    ["Thing Amigurumi", "Charming hand figure from the Wednesday universe with expressive finger details.", "449 TRY", "Cold wash, lay flat to dry.", "Approx. 12 cm.", "Decorative and play-friendly; secure stitching.", "Thing"]
  ),
  pugsleyAddams: productEntry("pugsleyAddams",
    ["Pugsley Addams Amigurumi", "\u00c7izgili kaza\u011f\u0131 ve sevimli ifadesiyle Addams ailesinin ne\u015feli \u00fcyesi.", "529 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 17 cm oturur pozisyon.", "Organik pamuk iplik; el nak\u0131\u015f\u0131 g\u00f6z detay\u0131.", "Pugsley Addams"],
    ["Pugsley Addams Amigurumi", "Cheerful Addams family member with striped jumper and playful expression.", "529 TRY", "Cold wash, lay flat to dry.", "Approx. 17 cm sitting.", "Organic cotton yarn; embroidered eyes.", "Pugsley Addams"]
  ),
  enidSinclair: productEntry("enidSinclair",
    ["Enid Sinclair Amigurumi", "Pastel renkler, canl\u0131 ifade ve \u00f6zenli sa\u00e7 detay\u0131yla Wednesday evreninin renkli karakteri.", "549 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 18 cm oturur pozisyon.", "Yumu\u015fak dokulu iplik; el eme\u011fi aksesuarlar.", "Enid Sinclair"],
    ["Enid Sinclair Amigurumi", "Colourful Wednesday character with pastel tones, bright expression and detailed hair.", "549 TRY", "Cold wash, lay flat to dry.", "Approx. 18 cm sitting.", "Soft-touch yarn; hand-finished accessories.", "Enid Sinclair"]
  ),
  kuromi: productEntry("kuromi",
    ["Kuromi Amigurumi", "Siyah-pembe palet, ikonik kukuleta ve sevimli asi ifadeyle Sanrio favorisi.", "539 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 16 cm oturur pozisyon.", "G\u00fcvenli g\u00f6z i\u015fleme; organik iplik.", "Kuromi"],
    ["Kuromi Amigurumi", "Sanrio favourite with black-pink palette, iconic hood and mischievous charm.", "539 TRY", "Cold wash, lay flat to dry.", "Approx. 16 cm sitting.", "Safe embroidered eyes; organic yarn.", "Kuromi"]
  ),
  myMelody: productEntry("myMelody",
    ["My Melody Amigurumi", "Pembe kukuleta, yumu\u015fak kulak detaylar\u0131 ve tatl\u0131 pastel tonlarla Sanrio klasi\u011fi.", "539 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 16 cm oturur pozisyon.", "El nak\u0131\u015f\u0131 detaylar; yumu\u015fak pamuk iplik.", "My Melody"],
    ["My Melody Amigurumi", "Sanrio classic with pink hood, soft ear details and sweet pastel tones.", "539 TRY", "Cold wash, lay flat to dry.", "Approx. 16 cm sitting.", "Hand-embroidered details; soft cotton yarn.", "My Melody"]
  ),
  sonicBlue: productEntry("sonicBlue",
    ["Mavi Sonic Amigurumi", "Canl\u0131 mavi tonlar, h\u0131zl\u0131 duru\u015f ve ikonik ayakkab\u0131 detaylar\u0131yla efsanevi kirpi.", "519 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 17 cm oturur pozisyon.", "G\u00fcvenli diki\u015f; koleksiyon oyunca\u011f\u0131.", "Mavi Sonic"],
    ["Blue Sonic Amigurumi", "Legendary hedgehog in vivid blue with dynamic pose and iconic shoe details.", "519 TRY", "Cold wash, lay flat to dry.", "Approx. 17 cm sitting.", "Secure stitching; collector-friendly toy.", "Blue Sonic"]
  ),
  sonicRed: productEntry("sonicRed",
    ["K\u0131rm\u0131z\u0131 Sonic Amigurumi", "K\u0131rm\u0131z\u0131 renk varyant\u0131, enerjik ifade ve \u00f6zenli aksesuar i\u015f\u00e7ili\u011fiyle \u00f6zel seri kirpi.", "529 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 17 cm oturur pozisyon.", "S\u0131n\u0131rl\u0131 seri; kalite kontroll\u00fc el i\u015f\u00e7ili\u011fi.", "K\u0131rm\u0131z\u0131 Sonic"],
    ["Red Sonic Amigurumi", "Special-series hedgehog in bold red with energetic expression and detailed accessories.", "529 TRY", "Cold wash, lay flat to dry.", "Approx. 17 cm sitting.", "Limited edition; quality-controlled handcraft.", "Red Sonic"]
  ),
  sonicBlack: productEntry("sonicBlack",
    ["Siyah Sonic Amigurumi", "Koyu tonlar, \u015f\u0131k sil\u00fcet ve karakteristik h\u0131z \u00e7izgisi detaylar\u0131yla modern varyant.", "519 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 17 cm oturur pozisyon.", "Organik pamuk iplik; g\u00fcvenli g\u00f6z i\u015fleme.", "Siyah Sonic"],
    ["Black Sonic Amigurumi", "Modern variant in deep tones with sleek silhouette and speed-line accents.", "519 TRY", "Cold wash, lay flat to dry.", "Approx. 17 cm sitting.", "Organic cotton yarn; safe embroidered eyes.", "Black Sonic"]
  ),
  tails: productEntry("tails",
    ["Tails Amigurumi", "Turuncu t\u00fcyler, \u00e7ift kuyruk ve merakl\u0131 ifadeyle Sonic'in sad\u0131k arkada\u015f\u0131 Miles.", "549 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 16 cm oturur pozisyon.", "El eme\u011fi kuyruk detay\u0131; yumu\u015fak dokulu iplik.", "Tails"],
    ["Tails Amigurumi", "Sonic's loyal friend Miles with orange fur, twin tails and curious expression.", "549 TRY", "Cold wash, lay flat to dry.", "Approx. 16 cm sitting.", "Hand-finished tail detail; soft-touch yarn.", "Tails"]
  ),
  lolSurpriseDoll: productEntry("lolSurpriseDoll",
    ["LoL Bebek Amigurumi", "Parlak renkler, moda aksesuarlar\u0131 ve koleksiyonluk ifadeyle LoL tarz\u0131 bebek fig\u00fcr\u00fc.", "559 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 18 cm oturur pozisyon.", "G\u00fcvenli g\u00f6z i\u015fleme; hediye paketine uygun.", "LoL Bebek"],
    ["LOL Surprise Doll Amigurumi", "LOL-inspired doll figure with bold colours, fashion accessories and collector appeal.", "559 TRY", "Cold wash, lay flat to dry.", "Approx. 18 cm sitting.", "Safe embroidered eyes; gift-ready finish.", "LOL Doll"]
  ),
  crossbodyPaperBag: productEntry("crossbodyPaperBag",
    ["\u00c7apraz Ask\u0131l\u0131 Ka\u011f\u0131t \u0130p \u00c7anta", "El \u00f6rg\u00fcs\u00fc ka\u011f\u0131t iplik, \u00e7apraz ask\u0131 ve g\u00fcnl\u00fck kullan\u0131ma uygun \u015f\u0131k sil\u00fcet.", "479 \u20ba", "Nemli bezle silin; y\u0131kamay\u0131n.", "Yakla\u015f\u0131k 22 \u00d7 18 cm g\u00f6vde.", "Dayan\u0131kl\u0131 ka\u011f\u0131t iplik; metal aksesuar detay\u0131.", "\u00c7apraz Ask\u0131l\u0131 \u00c7anta"],
    ["Crossbody Paper Rope Bag", "Hand-crocheted paper yarn crossbody with everyday-ready elegant silhouette.", "479 TRY", "Spot clean with a damp cloth; do not machine wash.", "Approx. 22 x 18 cm body.", "Durable paper yarn; metal hardware detail.", "Crossbody Bag"]
  ),
  lavenderClutch: productEntry("lavenderClutch",
    ["Eflatun Ka\u011f\u0131t \u0130p Kol \u00c7antas\u0131", "Eflatun tonlar\u0131nda el \u00f6rg\u00fcs\u00fc kol \u00e7antas\u0131 \u2014 ka\u011f\u0131t iplik dokusu ve minimal tasar\u0131m.", "459 \u20ba", "Nemli bezle silin; y\u0131kamay\u0131n.", "Yakla\u015f\u0131k 20 \u00d7 14 cm.", "Hafif ve dayan\u0131kl\u0131; \u00f6zel g\u00fcnler i\u00e7in ideal.", "Eflatun Kol \u00c7antas\u0131"],
    ["Lavender Paper Rope Clutch", "Hand-crocheted lavender clutch in paper yarn with a minimal refined design.", "459 TRY", "Spot clean with a damp cloth; do not machine wash.", "Approx. 20 x 14 cm.", "Lightweight and durable; ideal for special occasions.", "Lavender Clutch"]
  ),
  nostalgicPhoneBlue: productEntry("nostalgicPhoneBlue",
    ["Nostaljik Mavi Telefon", "Ankes\u00f6rl\u00fc retro telefon formu, mavi pastel tonlar ve dekoratif el \u00f6rg\u00fcs\u00fc detay.", "429 \u20ba", "Kuru bezle temizleyin.", "Yakla\u015f\u0131k 18 cm y\u00fckseklik.", "Dekoratif par\u00e7a; ger\u00e7ek telefon de\u011fildir.", "Nostaljik Mavi Telefon"],
    ["Nostalgic Blue Cord Phone", "Retro corded phone shape in blue pastel tones - decorative crochet piece.", "429 TRY", "Clean with a dry cloth.", "Approx. 18 cm tall.", "Decorative item; not a functional phone.", "Nostalgic Blue Phone"]
  ),
  nostalgicPhonePink: productEntry("nostalgicPhonePink",
    ["Nostaljik Pembe Telefon", "Pembe tonlarda ankes\u00f6rl\u00fc telefon fig\u00fcr\u00fc \u2014 vintage dekor ve koleksiyon par\u00e7as\u0131.", "429 \u20ba", "Kuru bezle temizleyin.", "Yakla\u015f\u0131k 18 cm y\u00fckseklik.", "Dekoratif par\u00e7a; \u00e7ocuk odas\u0131 i\u00e7in sevimli aksesuar.", "Nostaljik Pembe Telefon"],
    ["Nostalgic Pink Cord Phone", "Corded phone figure in pink tones - vintage decor and collector piece.", "429 TRY", "Clean with a dry cloth.", "Approx. 18 cm tall.", "Decorative item; charming nursery accent.", "Nostalgic Pink Phone"]
  ),
  nostalgicPhoneOrange: productEntry("nostalgicPhoneOrange",
    ["Nostaljik Turuncu Telefon", "Turuncu retro telefon tasar\u0131m\u0131, ankes\u00f6r detay\u0131 ve el \u00f6rg\u00fcs\u00fc nostalji dokusu.", "429 \u20ba", "Kuru bezle temizleyin.", "Yakla\u015f\u0131k 18 cm y\u00fckseklik.", "Dekoratif par\u00e7a; raflarda vitrin g\u00f6r\u00fcn\u00fcm\u00fc.", "Nostaljik Turuncu Telefon"],
    ["Nostalgic Orange Cord Phone", "Orange retro phone design with cord detail and nostalgic crochet texture.", "429 TRY", "Clean with a dry cloth.", "Approx. 18 cm tall.", "Decorative item; display-shelf ready.", "Nostalgic Orange Phone"]
  ),
  fruitSet: productEntry("fruitSet",
    ["Meyve Seti Amigurumi", "Elma, armut ve daha fazlas\u0131 \u2014 oyun ve dekor i\u00e7in renkli meyve fig\u00fcrleri seti.", "399 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Par\u00e7a ba\u015f\u0131na yakla\u015f\u0131k 8\u201312 cm.", "Oyun mutfa\u011f\u0131 ve \u00f6\u011fretici oyun i\u00e7in uygun.", "Meyve Seti"],
    ["Fruit Set Amigurumi", "Apples, pears and more - colourful fruit figures for play and decor.", "399 TRY", "Cold wash, lay flat to dry.", "Approx. 8-12 cm per piece.", "Suitable for play kitchens and learning play.", "Fruit Set"]
  ),
  vegetableSet: productEntry("vegetableSet",
    ["Sebze Seti Amigurumi", "Taze renklerde sebze fig\u00fcrleri \u2014 mutfak oyunu ve dekoratif sunum i\u00e7in set.", "389 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Par\u00e7a ba\u015f\u0131na yakla\u015f\u0131k 8\u201314 cm.", "Yumu\u015fak iplik; g\u00fcvenli el i\u015f\u00e7ili\u011fi.", "Sebze Seti"],
    ["Vegetable Set Amigurumi", "Vegetable figures in fresh colours - set for kitchen play and decorative display.", "389 TRY", "Cold wash, lay flat to dry.", "Approx. 8-14 cm per piece.", "Soft yarn; safe handcraft finish.", "Vegetable Set"]
  ),
  trexDinosaur: productEntry("trexDinosaur",
    ["T-Rex Dinozor Amigurumi", "Ye\u015fil tonlar, g\u00fc\u00e7l\u00fc duru\u015f ve sevimli ifadeyle \u00e7ocuklar\u0131n favori dinozor fig\u00fcr\u00fc.", "549 \u20ba", "So\u011fuk y\u0131kama, sererek kurutma.", "Yakla\u015f\u0131k 20 cm oturur pozisyon.", "S\u0131n\u0131rl\u0131 seri; g\u00fcvenli g\u00f6z i\u015fleme.", "T-Rex Dinozor"],
    ["T-Rex Dinosaur Amigurumi", "Children's favourite dinosaur in green tones with bold stance and cute expression.", "549 TRY", "Cold wash, lay flat to dry.", "Approx. 20 cm sitting.", "Limited edition; safe embroidered eyes.", "T-Rex Dinosaur"]
  ),
};

function fmtProduct(slug, lang) {
  const p = DATA[slug][lang];
  return `    "${slug}": {
      "name": ${JSON.stringify(p.name)},
      "desc": ${JSON.stringify(p.desc)},
      "price": ${JSON.stringify(p.price)},
      "careWash": ${JSON.stringify(p.careWash)},
      "careSize": ${JSON.stringify(p.careSize)},
      "careSafety": ${JSON.stringify(p.careSafety)}
    }`;
}

function buildProducts(lang, meta) {
  const items = SLUGS.map((s) => fmtProduct(s, lang)).join(",\n");
  return `  "products": {
    "sectionLabel": ${JSON.stringify(meta.sectionLabel)},
    "eyebrow": ${JSON.stringify(meta.eyebrow)},
    "title": ${JSON.stringify(meta.title)},
    "lead": ${JSON.stringify(meta.lead)},
${items}
  }`;
}

const META_TR = {
  sectionLabel: "\u00dcr\u00fcn koleksiyonu",
  eyebrow: "Koleksiyon",
  title: "\u00d6zenle \u00d6r\u00fclen Par\u00e7alar",
  lead: "Barbie'den Sonic'e, el \u00f6rg\u00fcs\u00fc \u00e7antalardan nostaljik telefonlara \u2014 ilmek ilmek el eme\u011fi. Favorinizi se\u00e7in ve Trendyol \u00fczerinden g\u00fcvenle sipari\u015f verin.",
};

const META_EN = {
  sectionLabel: "Product collection",
  eyebrow: "Collection",
  title: "Carefully Crocheted Pieces",
  lead: "From Barbie to Sonic, crochet bags to nostalgic phones - stitch by stitch handcraft. Pick your favourite and order safely on Trendyol.",
};

function buildWizard(lang) {
  const lines = SLUGS.map((s) => `    "${s}": ${JSON.stringify(DATA[s][lang].wizard)}`);
  return lines.join(",\n");
}

const REVIEWS = {
  tr: [
    ["K\u0131z\u0131m Elsa fig\u00fcr\u00fcn\u00fc her gece kucu\u011funa bas\u0131yor. Dokusu ger\u00e7ekten farkl\u0131 \u2014 ma\u011faza oyunca\u011f\u0131 gibi de\u011fil, s\u0131cak ve yumu\u015fak.", "Elif K.", "\u0130stanbul", "Elsa Amigurumi"],
    ["Kuromi'nin pembe-siyah detaylar\u0131 g\u00f6rsellerde bile belli oluyor. Trendyol sipari\u015fine ra\u011fmen butik hissi verdi.", "Mert A.", "Ankara", "Kuromi Amigurumi"],
    ["Wednesday fig\u00fcr\u00fcn\u00fcn sa\u00e7 \u00f6rg\u00fcs\u00fc ve ifadesi harika. Koleksiyon par\u00e7as\u0131 olarak vitrinde duruyor.", "Zeynep D.", "\u0130zmir", "Wednesday Amigurumi"],
    ["O\u011flum 3 ya\u015f\u0131nda; Olaf'\u0131n yumu\u015fak dokusu ve g\u00fcvenli g\u00f6z detay\u0131 i\u00e7in tercih ettik. Tam istedi\u011fimiz gibiydi.", "Ay\u015fe T.", "Bursa", "Olaf Amigurumi"],
    ["Maui fig\u00fcr\u00fcn\u00fcn i\u015f\u00e7ili\u011fi m\u00fckemmel. Hediye notu da \u00e7ok tatl\u0131yd\u0131, te\u015fekk\u00fcrler \u0130rem Han\u0131m.", "Can Y.", "Antalya", "Maui Amigurumi"],
  ],
  en: [
    ["My daughter hugs her Elsa figure every night. The texture is so different from store toys - warm and soft.", "Elif K.", "Istanbul", "Elsa Amigurumi"],
    ["Kuromi's pink-black details are stunning even in photos. Felt boutique despite ordering on Trendyol.", "Mert A.", "Ankara", "Kuromi Amigurumi"],
    ["Wednesday's braids and expression are wonderful. It sits proudly in our display cabinet.", "Zeynep D.", "Izmir", "Wednesday Amigurumi"],
    ["We chose Olaf for our 3-year-old - soft touch and safe embroidered eyes. Exactly what we hoped for.", "Ayse T.", "Bursa", "Olaf Amigurumi"],
    ["Maui's craftsmanship is excellent. Lovely gift note too - thank you Irem.", "Can Y.", "Antalya", "Maui Amigurumi"],
  ],
};

function patchLocale(file, lang) {
  let src = fs.readFileSync(path.join(ROOT, "js", "locales", file), "utf8");
  const productsBlock = buildProducts(lang, lang === "tr" ? META_TR : META_EN);
  src = src.replace(/  "products": \{[\s\S]*?\n  \},\n  "product":/, productsBlock + ',\n  "product":');

  REVIEWS[lang].forEach((r, i) => {
    const n = i + 1;
    const re = new RegExp(`"r${n}": \\{[\\s\\S]*?"product": "[^"]*"\\n    \\}`, "m");
    src = src.replace(re, `"r${n}": {
      "quote": ${JSON.stringify(r[0])},
      "name": ${JSON.stringify(r[1])},
      "city": ${JSON.stringify(r[2])},
      "product": ${JSON.stringify(r[3])}
    }`);
  });

  const wizardLabel = lang === "tr" ? "Fig\u00fcr tipi" : "Figure type";
  src = src.replace(
    /"figureGroup": "[^"]*",\n    "harryPotter":[\s\S]*?"ronald": "[^"]*"/,
    `"figureGroup": ${JSON.stringify(wizardLabel)},\n${buildWizard(lang)}`
  );

  fs.writeFileSync(path.join(ROOT, "js", "locales", file), src, "utf8");
  console.log("Updated", file);
}

patchLocale("tr.js", "tr");
patchLocale("en.js", "en");
