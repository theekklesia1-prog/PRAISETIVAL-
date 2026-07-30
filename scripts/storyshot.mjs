import { chromium } from "playwright-core";

const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";

const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.getByText("PRESS PLAY TO WATCH OUR STORY").click();
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/story-modal.png` });
const info = await page.evaluate(() => {
  const v = document.querySelector("video");
  return v ? { src: v.currentSrc, w: v.videoWidth, h: v.videoHeight, t: v.currentTime, paused: v.paused } : null;
});
console.log("video:", JSON.stringify(info));
await browser.close();
