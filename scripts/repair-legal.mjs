import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const LEGAL_PRIVACY_TR = fs.readFileSync(path.join(root, "scripts/fix-site-encoding.mjs"), "utf8").match(/const LEGAL_PRIVACY_TR = `([\s\S]*?)`;/)[1];
const LEGAL_RETURNS_TR = fs.readFileSync(path.join(root, "scripts/fix-site-encoding.mjs"), "utf8").match(/const LEGAL_RETURNS_TR = `([\s\S]*?)`;\n\nfunction replaceProductPrice/)[1];

// Read EN from fix script - extract after LEGAL_PRIVACY_EN
const fixSrc = fs.readFileSync(path.join(root, "scripts/fix-site-encoding.mjs"), "utf8");
const LEGAL_PRIVACY_EN = fixSrc.match(/const LEGAL_PRIVACY_EN = `([\s\S]*?)`;\n\nconst LEGAL_RETURNS_EN/)[1];
const LEGAL_RETURNS_EN = fixSrc.match(/const LEGAL_RETURNS_EN = `([\s\S]*?)`;\n\nlet enContent/)[1];

function buildLegalBlock(lang, privacy, returns) {
  if (lang === "tr") {
    return `  "legal": {
    "eyebrow": "Yasal Bilgilendirme",
    "contactHeading": "?leti?im",
    "emailCta": "E-posta ile ileti?ime geç",
    "privacy": {
      "title": "KVKK ve Gizlilik Politikas?",
      "updated": "Son güncelleme: 8 Haziran 2026",
      "body": ${JSON.stringify(privacy)},
      "contactLead": "KVKK ba?vurular? için:"
    },
    "returns": {
      "title": "?ptal ve ?ade Ko?ullar?",
      "updated": "Son güncelleme: 8 Haziran 2026",
      "body": ${JSON.stringify(returns)},
      "contactLead": "?ade sorular? için:"
    }
  },`;
  }
  return `  "legal": {
    "eyebrow": "Legal Information",
    "contactHeading": "Contact",
    "emailCta": "Contact us by email",
    "privacy": {
      "title": "Privacy Policy",
      "updated": "Last updated: 8 June 2026",
      "body": ${JSON.stringify(privacy)},
      "contactLead": "For privacy requests:"
    },
    "returns": {
      "title": "Returns & Cancellation",
      "updated": "Last updated: 8 June 2026",
      "body": ${JSON.stringify(returns)},
      "contactLead": "For return questions:"
    }
  },`;
}

function repair(file, lang, privacy, returns) {
  let content = fs.readFileSync(path.join(root, file), "utf8");
  content = content.replace(/  "legal": \{[\s\S]*?  \},\r?\n  "sticky_order"/, buildLegalBlock(lang, privacy, returns) + '\n  "sticky_order"');
  fs.writeFileSync(path.join(root, file), content, "utf8");
  console.log("repaired", file);
}

repair("js/locales/tr.js", "tr", LEGAL_PRIVACY_TR, LEGAL_RETURNS_TR);
repair("js/locales/en.js", "en", LEGAL_PRIVACY_EN, LEGAL_RETURNS_EN);
