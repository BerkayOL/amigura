import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const cssPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "css", "style.css");
let css = fs.readFileSync(cssPath, "utf8");

const oldRootBlock = `  /* Product cards */
  --product-glass-bg: rgba(255, 255, 255, 0.5);
  --product-glass-border: rgba(255, 255, 255, 0.72);
  --product-card-shadow: 0 12px 40px rgba(28, 31, 38, 0.08);
  --product-card-shadow-hover: 0 28px 56px rgba(28, 31, 38, 0.16);
  --color-trendyol: #f27a1a;
  --color-trendyol-hover: #ff8c2e`;

const newRootBlock = `  /* Product cards */
  --product-card-shadow: 0 12px 40px rgba(28, 31, 38, 0.08);
  --product-card-shadow-hover: 0 28px 56px rgba(28, 31, 38, 0.16);
  --color-trendyol: #f27a1a;
  --color-trendyol-hover: #ff8c2e;

  /* Buttons */
  --color-btn-primary: var(--color-trendyol);
  --color-btn-primary-hover: var(--color-trendyol-hover);
  --color-btn-primary-text: #ffffff;
  --color-btn-secondary-bg: var(--color-bg-elevated);
  --color-btn-secondary-text: var(--color-text);
  --color-btn-secondary-border: var(--color-border);
  --color-btn-accent: var(--color-accent);
  --color-btn-accent-text: #1a1608;
  --color-btn-whatsapp: #25d366;
  --color-btn-danger: #c45c4a;

  /* Typography scale (min 12px) */
  --font-family: "Poppins", system-ui, -apple-system, "Segoe UI", sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.8125rem;
  --text-base: 1rem;
  --text-md: 1.0625rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-display: 3rem;
  --leading-tight: 1.2;
  --leading-normal: 1.65;
  --leading-relaxed: 1.75;

  /* Z-index scale */
  --z-base: 1;
  --z-dropdown: 50;
  --z-nav: 100;
  --z-skip: 200;
  --z-cookie: 250;
  --z-modal: 300;
  --z-cursor: 9999`;

css = css.replace(oldRootBlock, newRootBlock);

css = css.replace(
  `  --product-glass-bg: rgba(28, 34, 48, 0.65);
  --product-glass-border: rgba(255, 255, 255, 0.1);
  --product-card-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);`,
  `  --product-card-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);`
);

css = css.replace(
  /  \/\* Typography \(Plus Jakarta Sans \+ Fraunces\) \*\/\n  --font-sans: "[^"]+";[\s\S]*?--font-display: "[^"]+";/,
  ""
);

css = css.replace(
  /h1,\nh2,\nh3,[\s\S]*?\.product-card__title \{\n  font-family: var\(--font-display\);\n  font-weight: 600;\n  letter-spacing: -0\.02em;\n\}\n\n/,
  ""
);

css = css.replace(
  `body {
  font-family: var(--font-sans);
  font-size: 1rem;`,
  `body {
  font-family: var(--font-family);
  font-size: var(--text-base);`
);

css = css.replace(`  z-index: 200;`, `  z-index: var(--z-skip);`);
css = css.replace(`  z-index: 100;`, `  z-index: var(--z-nav);`);
css = css.replace(`  z-index: 300;`, `  z-index: var(--z-modal);`);
css = css.replace(`  z-index: 250;`, `  z-index: var(--z-cookie);`);
css = css.replace(`  z-index: 9999;`, `  z-index: var(--z-cursor);`);

css = css.replace(
  /\.glass-nav \{\n  position: sticky;\n  top: 0;\n  z-index: var\(--z-nav\);\n  width: 100%;\n  padding: var\(--space-sm\) var\(--space-md\);\n  background: var\(--glass-surface\);\n  backdrop-filter: blur\(var\(--glass-blur\)\);\n  -webkit-backdrop-filter: blur\(var\(--glass-blur\)\);\n  border-bottom: 1px solid var\(--glass-stroke\);\n  box-shadow: var\(--glass-shadow\);/,
  `.glass-nav {
  position: sticky;
  top: 0;
  z-index: var(--z-nav);
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border-radius: 0;
  border-left: none;
  border-right: none;
  border-top: none;
  box-shadow: var(--glass-shadow);`
);

css = css.replace(
  /\.product-card \{\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  border-radius: var\(--radius-lg\);\n  background: var\(--product-glass-bg\);\n  backdrop-filter: blur\(var\(--glass-blur\)\);\n  -webkit-backdrop-filter: blur\(var\(--glass-blur\)\);\n  border: 1px solid var\(--product-glass-border\);/,
  `.product-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: var(--radius-lg);`
);

css = css.replace(
  /\.sound-toggle \{\n  display: inline-flex;[\s\S]*?  background: var\(--glass-surface\);\n  backdrop-filter: blur\(var\(--glass-blur\)\);\n  -webkit-backdrop-filter: blur\(var\(--glass-blur\)\);\n  border: 1px solid var\(--glass-stroke\);/,
  `.sound-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  font-family: inherit;
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--footer-text);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast),
    background var(--transition-fast);`
);

const btnBlock = `
/* ==========================================================================
   Button system (primary / secondary / states)
   ========================================================================== */
.btn-primary,
.product-card__buy,
.modal-panel__cta.btn-primary,
.newsletter__submit,
.cookie-banner__btn--accept,
.wizard__btn--next,
.thankyou-card__home.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: inherit;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-btn-primary-text);
  background: var(--color-btn-primary);
  border: none;
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 16px rgba(242, 122, 26, 0.3);
  cursor: pointer;
  transition:
    background var(--transition-fast),
    transform 0.35s var(--ease-premium),
    box-shadow 0.35s var(--ease-premium);
}

.btn-primary:hover,
.product-card__buy:hover,
.modal-panel__cta.btn-primary:hover,
.newsletter__submit:hover,
.cookie-banner__btn--accept:hover,
.wizard__btn--next:hover:not(:disabled),
.thankyou-card__home.btn-primary:hover {
  background: var(--color-btn-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(242, 122, 26, 0.4);
}

.btn-primary:active,
.product-card__buy:active,
.modal-panel__cta.btn-primary:active,
.newsletter__submit:active,
.wizard__btn--next:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:focus-visible,
.product-card__buy:focus-visible,
.modal-panel__cta:focus-visible,
.newsletter__submit:focus-visible,
.cookie-banner__btn:focus-visible,
.wizard__btn:focus-visible,
.thankyou-card__home:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 3px;
}

.btn-primary:disabled,
.wizard__btn:disabled,
.newsletter__submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-secondary,
.modal-panel__cta.btn-secondary,
.product-card__care,
.cookie-banner__btn--essential,
.wizard__btn--back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: inherit;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-btn-secondary-text);
  background: var(--color-btn-secondary-bg);
  border: 1px solid var(--color-btn-secondary-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast),
    background var(--transition-fast),
    transform 0.2s ease;
}

.btn-secondary:hover,
.product-card__care:hover,
.cookie-banner__btn--essential:hover,
.wizard__btn--back:hover:not(:disabled) {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn-secondary:active,
.product-card__care:active,
.wizard__btn--back:active:not(:disabled) {
  transform: scale(0.98);
}

`;

if (!css.includes("Button system (primary / secondary")) {
  css = css.replace(
    "/* ==========================================================================\n   P3 Delight",
    btnBlock + "/* ==========================================================================\n   P3 Delight"
  );
}

/* Min font sizes */
css = css.replace(/font-size: 0\.62rem/g, "font-size: var(--text-xs)");
css = css.replace(/font-size: 0\.65rem/g, "font-size: var(--text-xs)");
css = css.replace(/font-size: 0\.7rem/g, "font-size: var(--text-xs)");
css = css.replace(/font-size: 0\.72rem/g, "font-size: var(--text-xs)");

css = css.replace(/font-family: var\(--font-sans\)/g, "font-family: var(--font-family)");
css = css.replace(/font-family: var\(--font-display\)/g, "font-family: var(--font-family)");

css = css.replace(
  /\.about__title \{\n  font-family: var\(--font-family\);/,
  `.about__title {
  font-family: var(--font-family);
  font-size: clamp(var(--text-2xl), 4.2vw, var(--text-display));`
);

fs.writeFileSync(cssPath, css, "utf8");
console.log("Patched style.css tokens");
