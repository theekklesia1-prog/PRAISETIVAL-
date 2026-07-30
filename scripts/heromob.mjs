import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.waitForTimeout(1200);
await m.screenshot({path:`${OUT}/heromob-current.png`});
// document scrollWidth vs viewport to detect horizontal overflow
const info = await m.evaluate(()=>({docW:document.documentElement.scrollWidth, winW:window.innerWidth, bodyW:document.body.scrollWidth}));
console.log(JSON.stringify(info));
await m.close();
await b.close();
