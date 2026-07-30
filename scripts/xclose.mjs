import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});

// ---------- MOBILE: tap → bio, click × → should return to image ----------
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.getByText("10+ Ministers").first().scrollIntoViewIfNeeded();
await m.waitForTimeout(400);
await m.mouse.wheel(0, 400);
await m.waitForTimeout(400);
const card = m.locator('#lineup [role="button"]').first();
await card.click();               // flip to bio
await m.waitForTimeout(900);
await m.locator('#lineup button[aria-label^="Close"]').first().click(); // click ×
await m.waitForTimeout(900);
await m.screenshot({path:`${OUT}/x-mob-after.png`});
await m.close();

// ---------- DESKTOP: hover → bio, click × → should return to image ----------
const d=await b.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await d.getByText("10+ Ministers").first().scrollIntoViewIfNeeded();
await d.waitForTimeout(400);
for(let i=0;i<4;i++){ await d.mouse.wheel(0, 320); await d.waitForTimeout(160); }
await d.waitForTimeout(500);
const dcard = d.locator('#lineup [role="button"]').nth(1);
const box = await dcard.boundingBox();
await d.mouse.move(box.x+box.width/2, box.y+Math.min(box.height/2,300)); // hover → bio
await d.waitForTimeout(900);
// click the × of that card
const closeBtn = dcard.locator('button[aria-label^="Close"]');
const cb = await closeBtn.boundingBox();
console.log("close btn box:", JSON.stringify(cb));
await d.mouse.click(cb.x+cb.width/2, cb.y+cb.height/2);
await d.waitForTimeout(1000);
await d.screenshot({path:`${OUT}/x-desk-after.png`});
await d.close();

await b.close();
console.log("ok");
