import { chromium } from "playwright-core";

const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";

const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await page.goto("http://localhost:3000/about", { waitUntil: "networkidle" });
await page.getByText("The faces behind Praisetival").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
const clip = await page.evaluate(() => {
  const h = [...document.querySelectorAll("h2")].find((e) => e.textContent?.includes("faces behind"));
  const sec = h.closest("section");
  const r = sec.getBoundingClientRect();
  return { x: 0, y: Math.max(0, r.top), width: 390, height: Math.min(844, r.height) };
});
await page.screenshot({ path: `${OUT}/team-mobile.png`, clip });
console.log("captured team-mobile");
await browser.close();
