import { chromium } from "playwright-core";

const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";

const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
// scroll About into view
await page.evaluate(() => document.querySelector("#about")?.scrollIntoView());
await page.waitForTimeout(120); // mid-animation
await page.screenshot({ path: `${OUT}/slide-mid.png` });
const t1 = await page.evaluate(() => {
  const card = [...document.querySelectorAll("h3")].find((h) => h.textContent?.includes("World-Class"));
  const item = card?.closest("[style]");
  return item ? getComputedStyle(item).transform : "none";
});
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/slide-settled.png` });
console.log("mid transform:", t1);
await browser.close();
