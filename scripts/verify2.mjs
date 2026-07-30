import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});

// ---- mobile ----
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.waitForTimeout(1000);
await m.screenshot({path:`${OUT}/v2-heromob.png`});
const info = await m.evaluate(()=>({docW:document.documentElement.scrollWidth, winW:window.innerWidth}));
console.log("overflow check:", JSON.stringify(info));

// testimonials mobile
await m.getByText("Blessed by").first().scrollIntoViewIfNeeded();
await m.waitForTimeout(600);
await m.screenshot({path:`${OUT}/v2-testimob.png`});
await m.close();

// ---- desktop ----
const d=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await d.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await d.getByText("Blessed by").first().scrollIntoViewIfNeeded();
await d.mouse.move(10, 300);
await d.waitForTimeout(700);
await d.screenshot({path:`${OUT}/v2-testidesk.png`, fullPage:false});
await d.close();

console.log("ok");
await b.close();
