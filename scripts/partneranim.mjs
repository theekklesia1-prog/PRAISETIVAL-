import { chromium } from "playwright-core";

const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const URL = "http://localhost:3001/partner";

const browser = await chromium.launch({ executablePath: EXEC });

// desktop — capture the pull at a few moments
const d = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await d.goto(URL, { waitUntil: "domcontentloaded" });
await d.waitForTimeout(750);
await d.screenshot({ path: `${OUT}/pa-1.png` });
await d.waitForTimeout(650);
await d.screenshot({ path: `${OUT}/pa-2.png` });
await d.waitForTimeout(1600);
await d.screenshot({ path: `${OUT}/pa-settled.png` });
await d.close();

// mobile settled full
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await m.goto(URL, { waitUntil: "networkidle" });
await m.waitForTimeout(2400);
await m.screenshot({ path: `${OUT}/partner-mobile-full.png`, fullPage: true });
await m.close();

console.log("captured pa-1 / pa-2 / pa-settled / mobile-full");
await browser.close();
