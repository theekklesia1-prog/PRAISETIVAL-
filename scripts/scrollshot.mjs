import { chromium } from "playwright-core";

const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";

const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage({ viewport: { width: 1440, height: 860 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/about", { waitUntil: "networkidle" });
// find the "Our Story" section top and scroll partway into it
const y = await page.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find((s) =>
    s.textContent?.includes("THE EKKLESIA")
  );
  return el ? window.scrollY + el.getBoundingClientRect().top : 0;
});
for (const [i, off] of [200, 450].entries()) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y + off);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/story-scroll-${i + 1}.png` });
  console.log(`captured story-scroll-${i + 1} at scrollY ${y + off}`);
}
await browser.close();
