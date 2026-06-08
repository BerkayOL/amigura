import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = fs.readFileSync(path.join(root, "scripts/fix-site-encoding.mjs"), "utf8");

const blocks = [
  ["LEGAL_PRIVACY_TR", /const LEGAL_PRIVACY_TR = `([\s\S]*?)`;\n\nconst LEGAL_RETURNS_TR/],
  ["LEGAL_RETURNS_TR", /const LEGAL_RETURNS_TR = `([\s\S]*?)`;\n\nfunction replaceProductPrice/],
  ["LEGAL_PRIVACY_EN", /const LEGAL_PRIVACY_EN = `([\s\S]*?)`;\n\nconst LEGAL_RETURNS_EN/],
  ["LEGAL_RETURNS_EN", /const LEGAL_RETURNS_EN = `([\s\S]*?)`;\n\nlet enContent/],
];

let out = "/** Canonical KVKK / returns HTML for locale files. */\n";
for (const [name, re] of blocks) {
  const raw = src.match(re)[1];
  const val = Function("return `" + raw + "`")();
  out += "export const " + name + " = " + JSON.stringify(val) + ";\n\n";
}

fs.writeFileSync(path.join(root, "scripts/legal-content.mjs"), out, "utf8");
console.log("wrote scripts/legal-content.mjs");
