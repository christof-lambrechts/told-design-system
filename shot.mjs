import { chromium } from 'playwright';
const b=await chromium.launch(); const p=await b.newPage({deviceScaleFactor:3});
await p.goto('http://localhost:6007/iframe.html?id=composants-saisie-et-choix-checkbox-radio-switch--interrupteurs&viewMode=story').catch(()=>{});
await p.waitForTimeout(1500); await p.screenshot({path:'/tmp/sw.png'}); await b.close();
