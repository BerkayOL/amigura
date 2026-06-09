/**
 * One-shot image optimization for deploy (og, logo, about, product WebP).
 * Run: node scripts/optimize-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productsDir = path.join(root, "assets", "images", "products");

async function optimizeBrandAssets() {
  const og = path.join(root, "assets", "og-cover.jpg");
  if (fs.existsSync(og)) {
    await sharp(og)
      .resize(1200, 630, { fit: "cover", position: "centre" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(og + ".tmp");
    fs.renameSync(og + ".tmp", og);
    console.log("og-cover.jpg optimized");
  }

  const logoPng = path.join(root, "assets", "logo.png");
  if (fs.existsSync(logoPng)) {
    await sharp(logoPng)
      .resize(104, 104, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(logoPng + ".tmp");
    fs.renameSync(logoPng + ".tmp", logoPng);

    await sharp(logoPng)
      .webp({ quality: 85 })
      .toFile(path.join(root, "assets", "logo.webp"));
    console.log("logo.png + logo.webp optimized");
  }

  const logoDir = path.join(root, "assets", "logo", "logo.png");
  if (fs.existsSync(logoDir)) {
    await sharp(logoPng)
      .resize(104, 104, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(logoDir + ".tmp");
    fs.renameSync(logoDir + ".tmp", logoDir);
  }

  const aboutPng = path.join(root, "assets", "about", "amigura.png");
  if (fs.existsSync(aboutPng)) {
    await sharp(aboutPng)
      .resize(800, 900, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(root, "assets", "about", "amigura.webp"));
    console.log("about/amigura.webp created");
  }
}

async function optimizeProductImages() {
  if (!fs.existsSync(productsDir)) return;
  const folders = fs.readdirSync(productsDir, { withFileTypes: true }).filter((d) => d.isDirectory());
  let count = 0;
  for (const folder of folders) {
    const dir = path.join(productsDir, folder.name);
    const jpgs = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));
    for (const file of jpgs) {
      const jpgPath = path.join(dir, file);
      const webpPath = jpgPath.replace(/\.jpe?g$/i, ".webp");
      const img = sharp(jpgPath);
      const meta = await img.metadata();
      const w = meta.width && meta.width > 1200 ? 1200 : meta.width;
      await sharp(jpgPath)
        .resize(w, null, { withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(jpgPath + ".tmp");
      fs.renameSync(jpgPath + ".tmp", jpgPath);
      await sharp(jpgPath).webp({ quality: 80 }).toFile(webpPath);
      count++;
    }
  }
  console.log("Product images optimized:", count, "files (+ webp)");
}

await optimizeBrandAssets();
await optimizeProductImages();
console.log("Done.");
