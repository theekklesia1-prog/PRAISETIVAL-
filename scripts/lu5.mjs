import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});
const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await p.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await p.mouse.move(720,450);await p.waitForTimeout(500);
const top=await p.evaluate(()=>{const el=document.querySelector("#lineup");return window.scrollY+el.getBoundingClientRect().top;});
async function to(y){for(let i=0;i<220;i++){const c=await p.evaluate(()=>window.scrollY);if(Math.abs(c-y)<24)break;await p.mouse.wheel(0,Math.max(-340,Math.min(340,y-c)));await p.waitForTimeout(20);}await p.waitForTimeout(400);}
// 1) scroll all the way down through the lineup (unstack everything)
await to(top+1900);
// 2) now scroll BACK UP to the deck position — should stay settled
await to(top+40);
await p.screenshot({path:`${OUT}/lu5-backup-top.png`});
await to(top+800);
await p.screenshot({path:`${OUT}/lu5-backup-mid.png`});
console.log("ok");
await b.close();
