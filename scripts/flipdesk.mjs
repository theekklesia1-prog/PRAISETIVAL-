import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});
const d=await b.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});

// bring the lineup heading to the top of the viewport
await d.getByText("10+ Ministers").first().scrollIntoViewIfNeeded();
await d.waitForTimeout(400);
// scroll down enough to land the first couple of rows (they settle as they pass ~42% vh)
for(let i=0;i<4;i++){ await d.mouse.wheel(0, 320); await d.waitForTimeout(160); }
await d.waitForTimeout(500);
await d.screenshot({path:`${OUT}/fd-front.png`});

// hover the centre (Surefunmi) card — index 1 in DOM order
const dcard = d.locator('#lineup [role="button"]').nth(1);
const box = await dcard.boundingBox();
console.log("card box:", JSON.stringify(box));
if(box){ await d.mouse.move(box.x+box.width/2, box.y+Math.min(box.height/2, 300)); }
await d.waitForTimeout(1100);
await d.screenshot({path:`${OUT}/fd-back.png`});
await d.close();
await b.close();
console.log("ok");
