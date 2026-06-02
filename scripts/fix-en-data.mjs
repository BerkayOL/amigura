import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "en-data.mjs");
let s = fs.readFileSync(file, "utf8");

const replacements = [
  [/\uFFFD/g, " - "],
  [/\u2014/g, " - "],
  [/\u2013/g, "-"],
  [/\u2026/g, "..."],
  [/\u00b0C/g, "C"],
  [/\u00b0/g, ""],
  [/\u00b7/g, " | "],
];

for (const [re, rep] of replacements) {
  s = s.replace(re, rep);
}

s = s.replace(/ - - /g, " - ").replace(/  +/g, " ");

fs.writeFileSync(file, s, "utf8");
console.log("Fixed en-data.mjs");
