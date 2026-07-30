import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});

// ---------- MOBILE (static grid, tap to flip) ----------
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
// scroll to lineup
await m.getByText("10+ Ministers").first().scrollIntoViewIfNeeded();
await m.waitForTimeout(500);
// nudge down so a couple cards are in view
await m.mouse.wheel(0, 400);
await m.waitForTimeout(500);
await m.screenshot({path:`${OUT}/flip-mob-front.png`});
// tap the first visible minister card image (role=button)
const card = m.locator('#lineup [role="button"]').first();
await card.click();
await m.waitForTimeout(900);
await m.screenshot({path:`${OUT}/flip-mob-back.png`});
await m.close();

// ---------- DESKTOP (deck; scroll to settle, then hover) ----------
const d=await b.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});
// scroll down in steps to advance the ratchet and settle the deck
for(let i=0;i<14;i++){ await d.mouse.wheel(0, 700); await d.waitForTimeout(180); }
await d.waitForTimeout(500);
// scroll back up a little so the settled cards are centered
await d.mouse.wheel(0, -900);
await d.waitForTimeout(600);
await d.screenshot({path:`${OUT}/flip-desk-front.png`});
// hover a settled card
const dcard = d.locator('#lineup [role="button"]').nth(1);
const box = await dcard.boundingBox();
if(box){ await d.mouse.move(box.x+box.width/2, box.y+box.height/2); }
await d.waitForTimeout(1000);
await d.screenshot({path:`${OUT}/flip-desk-back.png`});
await d.close();

await b.close();
console.log("ok");
