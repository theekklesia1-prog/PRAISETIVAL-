import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.getByText("10+ Ministers").first().scrollIntoViewIfNeeded();
await m.waitForTimeout(500);
// jump so the SECOND card is just crossing into view from the bottom
await m.mouse.wheel(0, 620);
await m.waitForTimeout(90);   // catch it mid-animation
await m.screenshot({path:`${OUT}/reveal-mid2.png`});
await m.close();
await b.close();
console.log("ok");
