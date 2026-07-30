import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});

// DESKTOP regression guard
const d=await b.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await d.getByText("10+ Ministers").first().scrollIntoViewIfNeeded();
await d.waitForTimeout(300);
for(let i=0;i<4;i++){ await d.mouse.wheel(0, 320); await d.waitForTimeout(150); }
await d.waitForTimeout(500);
const dop = await d.evaluate(()=>[...document.querySelectorAll('#lineup .block.w-full')].slice(0,3).map(w=>getComputedStyle(w).opacity));
console.log("desktop opacities:", JSON.stringify(dop));
await d.close();

// MOBILE: alternating translateX on below-fold cards, no page overflow
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.getByText("10+ Ministers").first().scrollIntoViewIfNeeded();
await m.waitForTimeout(500);
const info = await m.evaluate(()=>{
  const wraps=[...document.querySelectorAll('#lineup .block.w-full')];
  const tx=(el)=>{ const m=new DOMMatrixReadOnly(getComputedStyle(el).transform); return Math.round(m.m41); };
  return {
    card2_tx: tx(wraps[2]),   // even → from left (negative)
    card3_tx: tx(wraps[3]),   // odd  → from right (positive)
    card4_tx: tx(wraps[4]),   // even → from left (negative)
    docW: document.documentElement.scrollWidth,
    winW: window.innerWidth,
  };
});
console.log("mobile:", JSON.stringify(info));

// capture a mid-slide frame: scroll a fresh pair into view, snapshot fast
await m.mouse.wheel(0, 900);
await m.waitForTimeout(160);
await m.screenshot({path:`${OUT}/slide-mid.png`});
await m.waitForTimeout(1300);
await m.screenshot({path:`${OUT}/slide-settled.png`});
await m.close();

await b.close();
console.log("ok");
