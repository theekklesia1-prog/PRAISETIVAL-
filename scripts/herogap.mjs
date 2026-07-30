import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});

// ---- mobile ----
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.waitForTimeout(1200);
await m.screenshot({path:`${OUT}/gap-mob.png`});
const gap = await m.evaluate(()=>{
  const h1=document.querySelector("#home h1");
  const card=document.querySelector("#home .snap-x")?.firstElementChild;
  if(!h1||!card) return null;
  const hb=h1.getBoundingClientRect().bottom;
  const ct=card.getBoundingClientRect().top;
  return {h1Bottom:Math.round(hb), cardTop:Math.round(ct), gap:Math.round(ct-hb)};
});
console.log("mobile gap:", JSON.stringify(gap));
await m.close();

// ---- desktop ----
const d=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await d.waitForTimeout(1000);
await d.screenshot({path:`${OUT}/gap-desk.png`});
await d.close();

await b.close();
console.log("ok");
