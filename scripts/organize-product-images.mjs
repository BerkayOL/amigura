/**
 * Organize raw product photos into assets/images/products/{slug}/01.jpg 
 * Run once: node scripts/organize-product-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "assets", "images");
const DEST_ROOT = path.join(SRC_DIR, "products");

/** @type {Array<{ slug: string, folder: string, test: (name: string) => boolean, sort?: (a: string, b: string) => number }>} */
const RULES = [
  { slug: "barbie", folder: "barbie", test: (n) => /^barbie\d*\.jpg$/i.test(n) },
  { slug: "elsa", folder: "elsa", test: (n) => /^elsa\d*\.jpg$/i.test(n) },
  {
    slug: "crossbodyPaperBag",
    folder: "crossbody-paper-bag",
    test: (n) => /capraz|apraz/i.test(n) && /canta|anta/i.test(n),
  },
  {
    slug: "lavenderClutch",
    folder: "lavender-clutch",
    test: (n) => /ka[g?]itip|ka??tip/i.test(n) || /eflatun/i.test(n),
  },
  { slug: "enidSinclair", folder: "enid-sinclair", test: (n) => /enid/i.test(n) },
  {
    slug: "sonicRed",
    folder: "sonic-red",
    test: (n) => /k[i?]rm[i?]z[i?]sonic/i.test(n),
  },
  { slug: "kuromi", folder: "kuromi", test: (n) => /^kuromi\d*\.jpg$/i.test(n) },
  { slug: "lolSurpriseDoll", folder: "lol-surprise-doll", test: (n) => /^lolbebek\d*\.jpg$/i.test(n) },
  { slug: "maui", folder: "maui", test: (n) => /^maui\d+\.jpg$/i.test(n) },
  { slug: "moana", folder: "moana", test: (n) => /^moana\.jpg$/i.test(n) },
  {
    slug: "sonicBlue",
    folder: "sonic-blue",
    test: (n) => /^mavisonic\d*\.jpg$/i.test(n),
  },
  { slug: "fruitSet", folder: "fruit-set", test: (n) => /^meyveler\d*\.jpg$/i.test(n) },
  {
    slug: "tails",
    folder: "tails",
    test: (n) => /^milestailsprower\d*\.jpg$/i.test(n),
  },
  { slug: "myMelody", folder: "my-melody", test: (n) => /^my melody\d*\.jpg$/i.test(n) },
  {
    slug: "nostalgicPhoneBlue",
    folder: "nostalgic-phone-blue",
    test: (n) => /nostaljikmavi/i.test(n),
  },
  {
    slug: "nostalgicPhonePink",
    folder: "nostalgic-phone-pink",
    test: (n) => /nostaljikpembe/i.test(n),
  },
  {
    slug: "nostalgicPhoneOrange",
    folder: "nostalgic-phone-orange",
    test: (n) => /nostaljikturuncu/i.test(n),
  },
  { slug: "olaf", folder: "olaf", test: (n) => /^olaf\d*\.jpg$/i.test(n) },
  { slug: "pugsleyAddams", folder: "pugsley-addams", test: (n) => /pugsley/i.test(n) },
  { slug: "vegetableSet", folder: "vegetable-set", test: (n) => /^sebzeler\.jpg$/i.test(n) },
  {
    slug: "sonicBlack",
    folder: "sonic-black",
    test: (n) => /^siyahsonic\d*\.jpg$/i.test(n),
  },
  {
    slug: "thing",
    folder: "thing",
    test: (n) => /thing|\u015fey|sey/i.test(n),
  },
  {
    slug: "trexDinosaur",
    folder: "trex-dinosaur",
    test: (n) => /t-rex|dinozor/i.test(n),
  },
  { slug: "wednesday", folder: "wednesday", test: (n) => /^wednesday\d*\.jpg$/i.test(n) },
];

const SKIP = new Set([
  "harry-potter.jpg",
  "hermione-granger.jpg",
  "malefiz.jpg",
  "ronald-weasley.jpg",
  "placeholder.svg",
]);

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function pad(num) {
  return String(num).padStart(2, "0");
}

const files = fs
  .readdirSync(SRC_DIR)
  .filter((f) => f.toLowerCase().endsWith(".jpg") && !SKIP.has(f.toLowerCase()));

const assigned = new Set();
const manifest = {};

for (const rule of RULES) {
  const matched = files
    .filter((f) => !assigned.has(f) && rule.test(f))
    .sort(rule.sort || naturalSort);

  if (!matched.length) {
    console.warn("No images matched:", rule.slug);
    continue;
  }

  const destDir = path.join(DEST_ROOT, rule.folder);
  fs.mkdirSync(destDir, { recursive: true });

  const paths = [];
  matched.forEach((file, i) => {
    const destName = pad(i + 1) + ".jpg";
    const destPath = path.join(destDir, destName);
    const srcPath = path.join(SRC_DIR, file);
    fs.copyFileSync(srcPath, destPath);
    assigned.add(file);
    paths.push(`assets/images/products/${rule.folder}/${destName}`);
  });

  manifest[rule.slug] = paths;
  console.log(`${rule.slug}: ${matched.length} image(s)`);
}

const leftover = files.filter((f) => !assigned.has(f));
if (leftover.length) {
  console.warn("Unassigned files:", leftover);
}

// Remove old placeholder jpgs from root
for (const f of SKIP) {
  if (!f.endsWith(".jpg")) continue;
  const p = path.join(SRC_DIR, f);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log("Removed placeholder:", f);
  }
}

// Remove assigned source jpgs from root (keep products/ copies)
for (const f of assigned) {
  const p = path.join(SRC_DIR, f);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

fs.writeFileSync(
  path.join(ROOT, "scripts", "product-images-manifest.json"),
  JSON.stringify(manifest, null, 2),
  "utf8"
);

console.log("Done. Manifest:", Object.keys(manifest).length, "products");
