import { chromium } from "playwright-core";
const EXEC =
  "/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT =
  "/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b = await chromium.launch({ executablePath: EXEC });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:3000/about", { waitUntil: "networkidle" });
await p.getByText("hardwork").scrollIntoViewIfNeeded();
await p.waitForTimeout(900);
const clip = await p.evaluate(() => {
  const el = [...document.querySelectorAll("p")].find((e) => e.textContent?.includes("hardwork"));
  const row = el.closest(".marquee-row");
  const r = row.getBoundingClientRect();
  return { x: 0, y: Math.max(0, r.top - 10), width: 1440, height: Math.min(880, r.height + 20) };
});
await p.screenshot({ path: `${OUT}/team-tagline.png`, clip });
console.log("ok");
await b.close();
