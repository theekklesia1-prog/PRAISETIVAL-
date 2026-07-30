import { chromium } from "playwright-core";
const EXEC="/Users/mac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const OUT="/private/tmp/claude-501/-Users-mac/f443c058-a6d6-453c-b267-409f9b508792/scratchpad";
const b=await chromium.launch({executablePath:EXEC});
const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await p.goto("http://localhost:3001/about",{waitUntil:"networkidle"});
async function shot(txt,name){
  try{await p.getByText(txt,{exact:false}).first().scrollIntoViewIfNeeded();}catch{}
  await p.waitForTimeout(900);
  await p.screenshot({path:`${OUT}/${name}.png`});
}
await shot("Successful Editions","about-numbers-mob");
await shot("Celebrating","about-shapers-mob");
console.log("ok");
await b.close();
