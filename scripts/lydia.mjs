import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});

// ---- desktop ----
const d=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await d.getByText("Blessed by").first().scrollIntoViewIfNeeded();
await d.waitForTimeout(900);
await d.screenshot({path:`${OUT}/lydia-desk.png`});

// hover Lydia's card to reveal the popover
const lydia=d.getByText("Lydia",{exact:true}).first();
await lydia.scrollIntoViewIfNeeded();
const box=await lydia.boundingBox();
if(box){ await d.mouse.move(box.x+box.width/2, box.y-60); }
await d.waitForTimeout(700);
await d.screenshot({path:`${OUT}/lydia-desk-hover.png`});
await d.close();

// ---- mobile ----
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.getByText("Blessed by").first().scrollIntoViewIfNeeded();
await m.waitForTimeout(600);
// scroll the carousel to the last card (Lydia)
const track = m.locator("#testimonials .snap-x").first();
await track.evaluate((el)=>{ el.scrollLeft = el.scrollWidth; });
await m.waitForTimeout(500);
await m.screenshot({path:`${OUT}/lydia-mob.png`});
// tap Read more
const rm = m.getByRole("button",{name:"Read more"}).first();
if(await rm.count()){ await rm.click(); }
await m.waitForTimeout(500);
await m.screenshot({path:`${OUT}/lydia-mob-expanded.png`});
await m.close();

console.log("ok");
await b.close();
