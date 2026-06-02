/**
 * Self-host Google Fonts (Poppins) as local WOFF2 files.
 * - Downloads Google Fonts CSS and WOFF2 binaries
 * - Writes /assets/fonts/*
 * - Writes /css/fonts.generated.css with local URLs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outFontsDir = path.join(root, "assets", "fonts");
const outCssFile = path.join(root, "css", "fonts.generated.css");

const cssUrl =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function sha1(buf) {
  // lightweight hash without deps (not cryptographic use)
  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;
  let h4 = 0xc3d2e1f0;
  for (let i = 0; i < buf.length; i++) {
    const c = buf[i];
    h0 = (h0 ^ c) >>> 0;
    h1 = (h1 + c) >>> 0;
    h2 = (h2 ^ (c << (i % 8))) >>> 0;
    h3 = (h3 + (c << (i % 5))) >>> 0;
    h4 = (h4 ^ (c << (i % 3))) >>> 0;
  }
  return (
    h0.toString(16).padStart(8, "0") +
    h1.toString(16).padStart(8, "0") +
    h2.toString(16).padStart(8, "0") +
    h3.toString(16).padStart(8, "0") +
    h4.toString(16).padStart(8, "0")
  );
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      // Force woff2 responses.
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error("Fetch failed " + res.status + " " + url);
  return await res.text();
}

async function fetchBinary(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error("Fetch failed " + res.status + " " + url);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

function rewriteCssAndCollectUrls(cssText) {
  const urlRe = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+?\.woff2)\)/g;
  const urls = [];
  let m;
  while ((m = urlRe.exec(cssText))) urls.push(m[1]);
  return { urls: Array.from(new Set(urls)) };
}

function replaceAll(text, map) {
  let out = text;
  for (const [from, to] of map.entries()) {
    out = out.split(from).join(to);
  }
  return out;
}

async function main() {
  ensureDir(outFontsDir);

  const cssText = await fetchText(cssUrl);
  const { urls } = rewriteCssAndCollectUrls(cssText);
  if (!urls.length) throw new Error("No woff2 URLs found in CSS");

  const urlToLocal = new Map();

  for (const url of urls) {
    const bin = await fetchBinary(url);
    const id = sha1(bin).slice(0, 12);
    const filename = `poppins-${id}.woff2`;
    const abs = path.join(outFontsDir, filename);
    fs.writeFileSync(abs, bin);
    urlToLocal.set(url, `../assets/fonts/${filename}`);
  }

  const localCss = replaceAll(cssText, urlToLocal);
  fs.writeFileSync(outCssFile, localCss, "utf8");

  process.stdout.write(
    `Wrote ${urls.length} font files to assets/fonts and generated css/fonts.generated.css\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

