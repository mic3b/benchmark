import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

const [, , url, outPath, w = '1600', h = '960'] = process.argv
if (!url || !outPath) {
  console.error('usage: node scripts/screenshot.mjs <url> <outPath> [width] [height]')
  process.exit(1)
}

await mkdir(dirname(outPath), { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 2,
})
const page = await ctx.newPage()
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await page.screenshot({ path: outPath, fullPage: false })
await browser.close()
console.log('wrote', outPath)
