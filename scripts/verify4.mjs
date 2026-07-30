import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.waitForTimeout(600);
// scroll to About feature cards
await m.getByText("United in Worship").first().scrollIntoViewIfNeeded();
await m.waitForTimeout(900);
await m.screenshot({path:`${OUT}/v4-about-mob.png`});
// overflow after scrolling (animations settled)
const info = await m.evaluate(()=>({docW:document.documentElement.scrollWidth, winW:window.innerWidth}));
console.log("after-scroll overflow:", JSON.stringify(info));
// navbar sticky/white check: is header opaque now?
const navBg = await m.evaluate(()=>{
  const h=document.querySelector("header");
  return h ? getComputedStyle(h).backgroundColor : "none";
});
console.log("navbar bg after scroll:", navBg);
await m.close();
await b.close();
console.log("ok");
