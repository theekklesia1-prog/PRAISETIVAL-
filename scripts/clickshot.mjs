import { chromium } from "playwright-core";

const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";

const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.evaluate(() => document.querySelector("#expressions")?.scrollIntoView());
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/events-default.png` });

await page.getByLabel("Expand and play video").click();
await page.waitForTimeout(1500);
await page.evaluate(() => document.querySelector("#expressions")?.scrollIntoView());
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/events-expanded.png` });
console.log("captured events-default + events-expanded");
await browser.close();
