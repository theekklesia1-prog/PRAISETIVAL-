import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});
const d=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});
// bring row 2 (Lydia) into view, neutral mouse
await d.getByText("Lydia",{exact:true}).first().scrollIntoViewIfNeeded();
await d.mouse.move(10, 300);
await d.waitForTimeout(700);
await d.screenshot({path:`${OUT}/v3-row2.png`});
// hover Lydia to reveal
const lydia=d.getByText("Lydia",{exact:true}).first();
const box=await lydia.boundingBox();
if(box){ await d.mouse.move(box.x+box.width/2, box.y-60); }
await d.waitForTimeout(700);
await d.screenshot({path:`${OUT}/v3-row2-hover.png`});
await d.close();
await b.close();
console.log("ok");
