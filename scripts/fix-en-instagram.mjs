import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "js", "locales", "en.js");
let content = fs.readFileSync(filePath, "utf8");

const fixes = [
  [/"handoffLoading": "[^"]*"/, '"handoffLoading": "Redirecting you to the product post on Instagram"'],
  [
    /"handoffLead": "[^"]*"/,
    '"handoffLead": "You are being redirected to the product post on Instagram for orders and messages. Every piece is handmade with care at the Amigura studio."',
  ],
  [/"handoffLi1": "[^"]*"/, '"handoffLi1": "Official @amigura Instagram account"'],
  [/"handoffLi2": "[^"]*"/, '"handoffLi2": "Quick contact and orders via DM"'],
  [/"handoffLi3": "[^"]*"/, '"handoffLi3": "Careful packaging for handmade items"'],
  [/"handoffLi4": "[^"]*"/, '"handoffLi4": "Direct service from our studio"'],
  [/"quickViewTrust1": "[^"]*"/, '"quickViewTrust1": "Secure contact via Instagram"'],
  [/"checkoutSub": "[^"]*"/, '"checkoutSub": "Order from the Instagram post"'],
];

for (const [pattern, value] of fixes) {
  content = content.replace(pattern, value);
}

fs.writeFileSync(filePath, content, "utf8");
console.log("Updated en.js Instagram copy");
