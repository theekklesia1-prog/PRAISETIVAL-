import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const b=await chromium.launch({executablePath:EXEC});
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await m.goto("http://localhost:3001/",{waitUntil:"networkidle"});
await m.waitForTimeout(800);
const offenders = await m.evaluate(()=>{
  const vw = window.innerWidth;
  const out=[];
  document.querySelectorAll("*").forEach(el=>{
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 && r.width > 0) {
      out.push({tag:el.tagName, cls:(el.className&&el.className.toString().slice(0,90))||"", right:Math.round(r.right), left:Math.round(r.left), w:Math.round(r.width)});
    }
  });
  return out.slice(0,25);
});
console.log(JSON.stringify(offenders,null,1));
await m.close();
await b.close();
