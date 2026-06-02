import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "js", "delight.js");
let s = fs.readFileSync(p, "utf8");
const old = /function updateSoundToggleUi\(\)[\s\S]*?toggle\.classList\.toggle\("is-sound-on", soundEnabled\);\s*\}/;
const neu = `function updateSoundToggleUi() {
    const toggle = document.getElementById("soundToggle");
    if (!toggle) return;
    const t =
      window.Irem && window.Irem.I18n
        ? window.Irem.I18n.t.bind(window.Irem.I18n)
        : function (k) {
            return k;
          };
    toggle.setAttribute("aria-pressed", String(soundEnabled));
    toggle.setAttribute("aria-label", soundEnabled ? t("sound.on") : t("sound.off"));
    toggle.setAttribute("title", soundEnabled ? t("sound.on") : t("sound.off"));
    toggle.classList.toggle("is-sound-on", soundEnabled);
  }`;
if (!old.test(s)) {
  console.error("updateSoundToggleUi block not found");
  process.exit(1);
}
s = s.replace(old, neu);
fs.writeFileSync(p, s, "utf8");
console.log("Patched delight.js");
