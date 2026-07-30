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

// MOBILE: below-fold card should sit ABOVE its slot (translateY negative)
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.getByText("10+ Ministers").first().scrollIntoViewIfNeeded();
await m.waitForTimeout(500);
const tf = await m.evaluate(()=>{
  const wraps=[...document.querySelectorAll('#lineup .block.w-full')];
  // pick a below-fold one (index 3) and read its matrix translateY
  const el=wraps[3];
  const t=getComputedStyle(el).transform;
  const op=getComputedStyle(el).opacity;
  return { transform:t, opacity:op };
});
console.log("below-fold card #3:", JSON.stringify(tf));  // expect translateY negative, opacity ~0

// capture a mid-drop frame of the 2nd card
await m.mouse.wheel(0, 560);
await m.waitForTimeout(110);
await m.screenshot({path:`${OUT}/drop-mid.png`});
await m.waitForTimeout(900);
await m.screenshot({path:`${OUT}/drop-settled.png`});
await m.close();

await b.close();
console.log("ok");
