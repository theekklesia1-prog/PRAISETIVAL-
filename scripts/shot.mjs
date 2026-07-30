import { chromium } from "playwright-core";

const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";

const url = process.argv[2] || "http://localhost:3000/";
const tag = process.argv[3] || "page";

async function scrollThrough(page) {
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        window.scrollTo(0, y);
        y += 400;
        if (y < document.body.scrollHeight) setTimeout(step, 60);
        else {
          window.scrollTo(0, 0);
          setTimeout(res, 500);
        }
      };
      step();
    });
  });
}

const browser = await chromium.launch({ executablePath: EXEC });

for (const [name, width, height] of [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await scrollThrough(page);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${tag}-${name}.png`, fullPage: true });
  const dims = page.viewportSize();
  console.log(`${tag}-${name}.png captured @ ${dims.width}w`);
  await page.close();
}

await browser.close();
