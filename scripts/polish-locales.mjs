import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function replaceProductBlock(content, slug, fields) {
  const lines = Object.entries(fields)
    .map(([key, value]) => `      "${key}": ${JSON.stringify(value)}`)
    .join(",\n");
  const pattern = new RegExp(`"${slug}":\\s*\\{[\\s\\S]*?\\r?\\n    \\},`);
  const replacement = `"${slug}": {\n${lines}\n    },`;
  if (!pattern.test(content)) {
    console.warn("Missing product block:", slug);
    return content;
  }
  return content.replace(pattern, replacement);
}

function patchFile(relPath, mutator) {
  const filePath = path.join(root, relPath);
  let content = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  content = mutator(content);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("Patched", relPath);
}

const DEG = "\u00B0";
const EM = "\u2014";
const MID = "\u00B7";
const ELL = "\u2026";
const LIRA = "\u20BA";

const trWizarding = {
  harryPotter: {
    name: "Harry Potter Amigurumi",
    desc: "Yuvarlak g\u00F6zl\u00FCk, Gryffindor atk\u0131s\u0131 ve y\u0131ld\u0131z i\u015Flemeli \u015Fapka ile sevilen b\u00FCy\u00FCc\u00FC.",
    price: `549 ${LIRA}`,
    careWash: `So\u011Fuk y\u0131kama (30${DEG}C), yumu\u015Fak deterjan.`,
    careSize: "Yakla\u015F\u0131k 18 cm oturur pozisyon.",
    careSafety: "G\u00FCvenli g\u00F6z i\u015Fleme; 3 ya\u015F alt\u0131 i\u00E7in uygundur.",
  },
  hermione: {
    name: "Hermione Granger Amigurumi",
    desc: "Kahverengi bukle sa\u00E7, Hogwarts uniformas\u0131 ve asa detay\u0131yla zeki kahraman.",
    price: `529 ${LIRA}`,
    careWash: "So\u011Fuk y\u0131kama, sererek kurutma.",
    careSize: "Yakla\u015F\u0131k 17 cm oturur pozisyon.",
    careSafety: "Organik pamuk iplik; el nak\u0131\u015F\u0131 detaylar.",
  },
  malefiz: {
    name: "Malefiz Amigurumi",
    desc: "Siyah pelerin, boynuzlu ba\u015Fl\u0131k ve mor aksesuarlarla g\u00F6rkemli k\u00F6t\u00FC karakter.",
    price: `579 ${LIRA}`,
    careWash: "So\u011Fuk y\u0131kama, sererek kurutma.",
    careSize: "Yakla\u015F\u0131k 19 cm (ba\u015Fl\u0131k detay\u0131yla).",
    careSafety: "S\u0131n\u0131rl\u0131 seri; kalite kontroll\u00FC el i\u015F\u00E7ili\u011Fi.",
  },
  ronald: {
    name: "Ronald Weasley Amigurumi",
    desc: "Turuncu sa\u00E7, Gryffindor kazak ve sevimli ifadeyle sad\u0131k arkada\u015F.",
    price: `499 ${LIRA}`,
    careWash: "So\u011Fuk y\u0131kama, sererek kurutma.",
    careSize: "Yakla\u015F\u0131k 17 cm oturur pozisyon.",
    careSafety: "G\u00FCvenli diki\u015F ve g\u00F6z i\u015Fleme.",
  },
};

const enWizarding = {
  harryPotter: {
    name: "Harry Potter Amigurumi",
    desc: "The beloved wizard with round glasses, a Gryffindor scarf, and a star-embroidered hat.",
    price: "549 TRY",
    careWash: `Cold wash (30${DEG}C), mild detergent.`,
    careSize: "Approx. 18 cm in a seated pose.",
    careSafety: "Secure embroidered eyes; suitable for ages 3+ with supervision.",
  },
  hermione: {
    name: "Hermione Granger Amigurumi",
    desc: `Brown curly hair, Hogwarts uniform, and wand detail ${EM} the clever hero of the trio.`,
    price: "529 TRY",
    careWash: "Cold wash, lay flat to dry.",
    careSize: "Approx. 17 cm in a seated pose.",
    careSafety: "Organic cotton yarn with hand-embroidered details.",
  },
  malefiz: {
    name: "Maleficent Amigurumi",
    desc: "A striking villain in black cape, horned headpiece, and rich purple accents.",
    price: "579 TRY",
    careWash: "Cold wash, lay flat to dry.",
    careSize: "Approx. 19 cm tall (including headpiece).",
    careSafety: "Limited edition; quality-checked handcraft.",
  },
  ronald: {
    name: "Ron Weasley Amigurumi",
    desc: `Ginger hair, Gryffindor jumper, and a warm loyal smile ${EM} Harry's steadfast friend.`,
    price: "499 TRY",
    careWash: "Cold wash, lay flat to dry.",
    careSize: "Approx. 17 cm in a seated pose.",
    careSafety: "Secure stitching and embroidered eyes.",
  },
};

patchFile("js/locales/tr.js", (content) => {
  for (const [slug, fields] of Object.entries(trWizarding)) {
    content = replaceProductBlock(content, slug, fields);
  }
  content = content.replace(
    /"olaf":\s*\{[\s\S]*?"desc":\s*"[^"]*"/,
    (m) => m.replace(/"desc":\s*"[^"]*"/, `"desc": "Sevimli havu\u00E7 burun, dal kollar ve s\u0131cak g\u00FCl\u00FCmsemeyle k\u0131\u015F\u0131n en sevilen kardan adam\u0131."`),
  );
  return content;
});

patchFile("js/locales/en.js", (content) => {
  for (const [slug, fields] of Object.entries(enWizarding)) {
    content = replaceProductBlock(content, slug, fields);
  }

  const set = (key, value) => {
    content = content.replace(new RegExp(`"${key}":\\s*"[^"]*"`), `"${key}": ${JSON.stringify(value)}`);
  };

  set("homeDesc", `Amigura ${EM} Luxury handmade amigurumi crafted in organic yarn. Discover the collection and order via Instagram.`);
  set("productDesc", `Handmade amigurumi product details ${EM} explore and order through Instagram.`);
  set("ozelDesc", `Amigura custom orders ${EM} design your dream amigurumi figure in our four-step personalisation wizard.`);
  set("thanksDesc", "Thank you for your order. Care tips, studio updates, and ways to stay in touch.");
  set("iadeDesc", `Amigura returns and cancellation policy ${EM} Instagram orders and made-to-order exceptions.`);
  set("kvkkDesc", `Amigura Privacy Policy ${EM} how we collect, use, and protect personal data on our showcase website.`);

  content = content.replace(
    /("hero":\s*\{[\s\S]*?"subtitle":\s*)"[^"]*"/,
    `$1${JSON.stringify("Every figure is patiently crocheted with warmth and care. Discover the finest handcraft in our signature amigurumi collection.")}`,
  );
  content = content.replace(
    /("products":\s*\{[\s\S]*?"lead":\s*)"[^"]*"/,
    `$1${JSON.stringify(`From Barbie to Sonic, crochet bags to nostalgic phones ${EM} each piece is made stitch by stitch. Find your favourite and order on Instagram.`)}`,
  );

  set("buyGift", "Send as a Gift");
  set("buyGiftAria", "Order {name} as a gift on Instagram");
  set("giftTip", "Complimentary gift wrapping on request");
  set("similarLead", "More lovingly crocheted pieces from the same studio.");
  set("trustSub", "Every piece leaves our studio with the same care we put into every stitch.");
  set("checkoutSub", "Order via the Instagram post");
  set("verifiedNote", "Fast, personal contact via Instagram DM");
  set("handoffLoading", `Redirecting you to the product post on Instagram${ELL}`);
  set(
    "handoffLead",
    "You are being redirected to the product post on Instagram to place your order or send a message. Each piece is handmade with care in the Amigura studio.",
  );
  set("quickViewTrust2", "Careful packaging and attentive delivery");

  content = content.replace(/"eyebrow": "Amigura - Handmade Art"/, `"eyebrow": "Amigura ${MID} Handmade Art"`);
  content = content.replace(/Cold wash \(30C\)/g, `Cold wash (30${DEG}C)`);
  content = content.replace(/\(30C\)/g, `(30${DEG}C)`);
  content = content.replace(/an established Turkish marketplace with buyer protection/g, "our official Instagram channel");
  content = content.replace(/Turkiye/g, "T\u00FCrkiye");

  return content;
});

const urunPath = path.join(root, "urun.html");
let urun = fs.readFileSync(urunPath, "utf8");
urun = urun.replace(/<title>[^<]*<\/title>/, "<title>\u00Dcr\u00FCn | Amigura</title>");
urun = urun.replace(
  /<a class="skip-link" href="#main" data-i18n="a11y.skip">[^<]*<\/a>/,
  '<a class="skip-link" href="#main" data-i18n="a11y.skip">\u0130\u00E7eri\u011Fe atla</a>',
);
urun = urun.replace(
  /<span class="pdp__crumb-current" id="pdp-crumb-current">[^<]*<\/span>/,
  '<span class="pdp__crumb-current" id="pdp-crumb-current">\u00Dcr\u00FCn</span>',
);
fs.writeFileSync(urunPath, urun, "utf8");
console.log("Patched urun.html");
