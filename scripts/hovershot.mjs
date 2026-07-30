import { chromium } from "playwright-core";

const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";

const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage({ viewport: { width: 1440, height: 880 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
// default state
await page.screenshot({ path: `${OUT}/card-default.png`, clip: { x: 820, y: 560, width: 560, height: 300 } });
// hover the Shekinah Glory card
const card = page.getByText("SHEKINAH GLORY").first();
await card.hover();
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/card-hover.png`, clip: { x: 820, y: 500, width: 560, height: 360 } });
console.log("captured card-default + card-hover");
await browser.close();
