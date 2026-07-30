import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});
const d=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await d.waitForTimeout(1200);
// find the events stack bounding box
const box = await d.evaluate(()=>{
  const el=document.querySelector("#home .lg\\:block .flex.flex-col") || document.querySelector("#home .relative.hidden");
  if(!el) return null; const r=el.getBoundingClientRect();
  return {x:r.x,y:r.y,w:r.width,h:r.height};
});
console.log("stack box:", JSON.stringify(box));
await d.screenshot({path:`${OUT}/hd-collapsed.png`, clip:{x:800,y:560,width:600,height:320}});
if(box){ await d.mouse.move(box.x+box.w/2, box.y+box.h/2); }
await d.waitForTimeout(800);
await d.screenshot({path:`${OUT}/hd-hover.png`, clip:{x:800,y:440,width:600,height:440}});
await d.close();
await b.close();
console.log("ok");
