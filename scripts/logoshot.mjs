import { chromium } from "playwright-core";

const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";

const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

const clip = { x: 360, y: 120, width: 720, height: 420 };

// strong tilt to the right
await page.mouse.move(1360, 760);
await page.waitForTimeout(1100);
await page.screenshot({ path: `${OUT}/logo-tilt-r.png`, clip });

// tilt to the left
await page.mouse.move(80, 120);
await page.waitForTimeout(1100);
await page.screenshot({ path: `${OUT}/logo-tilt-l.png`, clip });

// near-centre (idle)
await page.mouse.move(720, 450);
await page.waitForTimeout(1100);
await page.screenshot({ path: `${OUT}/logo-center.png`, clip });

console.log("captured 3 logo frames");
await browser.close();
