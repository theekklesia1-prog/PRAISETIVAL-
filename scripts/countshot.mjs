import { chromium } from "playwright-core";

const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";

const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/about", { waitUntil: "networkidle" });

await page.getByText("OUR NUMBERS").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const diag1 = await page.evaluate(() => {
  const el = [...document.querySelectorAll("span,div")].find((e) => e.textContent?.trim() === "OUR NUMBERS");
  const sec = el?.closest("section");
  const rect = sec?.getBoundingClientRect();
  return {
    scrollY: window.scrollY,
    sectionTop: rect?.top,
    values: [...document.querySelectorAll("span.tabular-nums")].map((s) => s.textContent),
  };
});
await page.screenshot({ path: `${OUT}/count-mid.png` });
await page.waitForTimeout(2200);
const done = await page.evaluate(() =>
  [...document.querySelectorAll("span.tabular-nums")].map((s) => s.textContent)
);
await page.screenshot({ path: `${OUT}/count-done.png` });
console.log("diag(mid):", JSON.stringify(diag1));
console.log("done:", JSON.stringify(done));
await browser.close();
