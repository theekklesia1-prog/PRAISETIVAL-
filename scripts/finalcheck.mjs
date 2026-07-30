import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});
const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await p.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await p.waitForTimeout(1200);
await p.screenshot({path:`${OUT}/nav-top.png`,clip:{x:0,y:0,width:1440,height:120}});
await p.mouse.move(720,450);
await p.mouse.wheel(0,300);await p.waitForTimeout(500);
await p.screenshot({path:`${OUT}/nav-scrolled.png`,clip:{x:0,y:0,width:1440,height:120}});
// lineup
const top=await p.evaluate(()=>{const el=document.querySelector("#lineup");return window.scrollY+el.getBoundingClientRect().top;});
async function to(y){for(let i=0;i<130;i++){const c=await p.evaluate(()=>window.scrollY);if(Math.abs(c-y)<30)break;await p.mouse.wheel(0,Math.max(-350,Math.min(350,y-c)));await p.waitForTimeout(24);}await p.waitForTimeout(500);}
await to(top-300); await p.screenshot({path:`${OUT}/lu2-enter.png`});
await to(top+250); await p.screenshot({path:`${OUT}/lu2-mid.png`});
await to(top+900); await p.screenshot({path:`${OUT}/lu2-settled.png`});
console.log("ok");
await b.close();
