import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

const [, , url, outPath, page, w = '1600', h = '1700'] = process.argv
if (!url || !outPath) {
  console.error('usage: node scripts/screenshot-page.mjs <url> <outPath> <screen> [width] [height]')
  process.exit(1)
}
await mkdir(dirname(outPath), { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 2,
})
const p = await ctx.newPage()
await p.goto(url, { waitUntil: 'networkidle' })
if (page === 'dashboard') {
  await p.click('text=Dashboard')
  await p.waitForTimeout(600)
}
await p.screenshot({ path: outPath, fullPage: true })
await browser.close()
console.log('wrote', outPath)
