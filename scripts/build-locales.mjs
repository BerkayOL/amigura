/**
 * DEPRECATED: Canonical locales are js/locales/tr.js and en.js.
 * This module loads the TR locale object for legacy tooling only.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const code = fs
  .readFileSync(path.join(root, "js/locales/tr.js"), "utf8")
  .replace(
    '})(typeof window !== "undefined" ? window : globalThis);',
    "})(sandbox);"
  );
const sandbox = {};
vm.runInNewContext(code, { sandbox });
export default sandbox.Irem.locales.tr;
