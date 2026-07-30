import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});

// ---- mobile: measure both hero cards ----
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.waitForTimeout(1200);
await m.screenshot({path:`${OUT}/hc-mob-1.png`});
// scroll carousel to card 2
const track = m.locator("#home .snap-x").first();
await track.evaluate((el)=>{ el.scrollLeft = el.scrollWidth; });
await m.waitForTimeout(600);
await m.screenshot({path:`${OUT}/hc-mob-2.png`});
// measure white-card heights
const dims = await m.evaluate(()=>{
  const cards=[...document.querySelectorAll("#home .snap-x .rounded-\\[22px\\], #home .snap-x [class*='rounded-']")];
  return cards.slice(0,4).map(c=>{const r=c.getBoundingClientRect();return {cls:c.className.slice(0,40),w:Math.round(r.width),h:Math.round(r.height)};});
});
console.log("mobile card dims:", JSON.stringify(dims));
await m.close();

// ---- desktop ----
const d=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await d.waitForTimeout(1000);
await d.screenshot({path:`${OUT}/hc-desk.png`, clip:{x:820,y:520,width:560,height:360}});
// hover the stack
await d.mouse.move(1080, 640);
await d.waitForTimeout(700);
await d.screenshot({path:`${OUT}/hc-desk-hover.png`, clip:{x:820,y:420,width:560,height:460}});
await d.close();

await b.close();
console.log("ok");
