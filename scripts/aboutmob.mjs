import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});
const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await p.goto("http://localhost:3001/about",{waitUntil:"networkidle"});
// scroll through to trigger reveals
for(let y=0;y<6000;y+=400){await p.mouse.wheel(0,400);await p.waitForTimeout(60);}
await p.waitForTimeout(400);
await p.evaluate(()=>window.scrollTo(0,0));
await p.waitForTimeout(600);
await p.screenshot({path:`${OUT}/about-mob-current.png`,fullPage:true});
console.log("ok");
await b.close();
