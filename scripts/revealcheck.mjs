import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});

// ---------- DESKTOP: regression guard — settled cards must be opacity 1 ----------
const d=await b.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await d.getByText("10+ Ministers").first().scrollIntoViewIfNeeded();
await d.waitForTimeout(400);
for(let i=0;i<4;i++){ await d.mouse.wheel(0, 320); await d.waitForTimeout(160); }
await d.waitForTimeout(600);
const dop = await d.evaluate(()=>{
  const cards=[...document.querySelectorAll('#lineup [role="button"]')].slice(0,3);
  return cards.map(c=>{ const mv=c.closest('.block')||c.parentElement; return getComputedStyle(mv).opacity; });
});
console.log("desktop settled opacities:", JSON.stringify(dop));
await d.screenshot({path:`${OUT}/reveal-desk.png`});
await d.close();

// ---------- MOBILE: below-fold cards hidden, in-view cards reveal ----------
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.getByText("10+ Ministers").first().scrollIntoViewIfNeeded();
await m.waitForTimeout(600);
// read opacity of the wrapper motion divs (first in view vs far below)
const readOps = async () => m.evaluate(()=>{
  const wraps=[...document.querySelectorAll('#lineup .block.w-full')];
  return wraps.map(w=>+getComputedStyle(w).opacity.slice(0,4));
});
console.log("mobile opacities (top settled, later below-fold):", JSON.stringify(await readOps()));
// scroll a fresh card into view and grab a mid-reveal frame
await m.mouse.wheel(0, 700);
await m.waitForTimeout(140);
await m.screenshot({path:`${OUT}/reveal-mob-mid.png`});
await m.waitForTimeout(900);
await m.screenshot({path:`${OUT}/reveal-mob-settled.png`});
await m.close();

await b.close();
console.log("ok");
