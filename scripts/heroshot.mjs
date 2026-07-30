import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});
// desktop default
const d=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await d.waitForTimeout(1500);
await d.screenshot({path:`${OUT}/hero-desk.png`});
// hover the event cards
try{await d.getByText("AUDIENCE OF ONE").first().hover();}catch(e){console.log("hover err",e.message);}
await d.waitForTimeout(900);
await d.screenshot({path:`${OUT}/hero-desk-hover.png`});
await d.close();
// mobile
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.waitForTimeout(1500);
await m.screenshot({path:`${OUT}/hero-mob.png`});
await m.close();
console.log("ok");
await b.close();
