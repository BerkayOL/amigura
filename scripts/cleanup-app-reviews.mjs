import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "js", "app.js");
let content = fs.readFileSync(filePath, "utf8");

// Remove review constants and getReviews
content = content.replace(
  /\n  const REVIEW_COUNT = 5;\n  const REVIEW_INTERVAL_MS = 5500;\n\n  function getConfig/,
  "\n  function getConfig"
);
content = content.replace(/\n  function getReviews\(\) \{[\s\S]*?\n  \}\n\n  \/\*\* @type/, "\n  /** @type");

// Remove review state vars
content = content.replace(/\n  let reviewsCarouselBound = false;\n/, "\n");
content = content.replace(
  /\n  \/\*\* @type \{ReturnType<typeof setInterval> \| null\} \*\/\n  let reviewAutoTimer = null;\n/,
  "\n"
);
content = content.replace(
  /\n  const reviewState = \{ index: 0, paused: false, reducedMotion: false \};\n/,
  "\n"
);

// Remove review element refs from cacheElements
content = content.replace(
  /\n      reviewsTrack: document\.getElementById\("reviews-track"\),\n      reviewsDots: document\.getElementById\("reviews-dots"\),\n      reviewsCarousel: document\.getElementById\("reviews-carousel"\),\n/,
  "\n"
);

// Remove review functions block
const reviewStart = content.indexOf("  function goToReview(index) {");
const reviewEnd = content.indexOf("  /**\n   * @param {SubmitEvent} e\n   */\n  function onDocumentSubmit(e) {");
if (reviewStart !== -1 && reviewEnd !== -1) {
  content = content.slice(0, reviewStart) + content.slice(reviewEnd);
}

// Remove initHomeSections if present
content = content.replace(
  /\n  function initHomeSections\(\) \{\n    initProcessTimeline\(\);\n  \}\n/,
  "\n"
);

// Remove review click handler
content = content.replace(
  /\n    const reviewDot = target\.closest\("\.reviews-carousel__dot"\);[\s\S]*?return;\n    \}\n\n    if \(\n      target\.closest/,
  "\n    if (\n      target.closest"
);

// Remove review keyboard handler
content = content.replace(
  /\n    if \(\n      els\.reviewsCarousel &&[\s\S]*?return;\n    \}\n    if \(e\.key === "Escape"\)/,
  "\n    if (e.key === \"Escape\")"
);

fs.writeFileSync(filePath, content, "utf8");
console.log("Cleaned app.js reviews code");
