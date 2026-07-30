import { chromium } from "playwright-core";

const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";

const browser = await chromium.launch({ executablePath: EXEC });

// desktop
const d = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await d.goto("http://localhost:3001/partner", { waitUntil: "networkidle" });
await d.waitForTimeout(1200);
await d.screenshot({ path: `${OUT}/partner-desktop-full.png`, fullPage: true });
await d.close();

// mobile
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await m.goto("http://localhost:3001/partner", { waitUntil: "networkidle" });
await m.waitForTimeout(1200);
await m.screenshot({ path: `${OUT}/partner-mobile-full.png`, fullPage: true });
await m.close();

console.log("captured partner desktop + mobile");
await browser.close();
