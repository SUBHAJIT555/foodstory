/**
 * Capture representative Foodstories screenshots at required viewports.
 *
 * Usage (after Playwright is installed):
 *   npx playwright install chromium
 *   npx tsx scripts/capture-reference.ts
 *
 * Stores files at:
 *   reference/screenshots/<route>/<viewport>.png
 *
 * Throttled. Does not crawl the full catalog.
 */
/// <reference types="node" />
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Browser } from "playwright";

const ORIGIN = "https://www.foodstories.shop";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "reference", "screenshots");

export const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900, isMobile: false },
  { name: "1280x800", width: 1280, height: 800, isMobile: false },
  { name: "1024x1366", width: 1024, height: 1366, isMobile: false },
  { name: "768x1024", width: 768, height: 1024, isMobile: true },
  { name: "430x932", width: 430, height: 932, isMobile: true },
  { name: "390x844", width: 390, height: 844, isMobile: true },
  { name: "375x812", width: 375, height: 812, isMobile: true },
] as const;

type CaptureTarget = {
  route: string;
  path: string;
};

const TARGETS: CaptureTarget[] = [
  { route: "home", path: "/" },
  { route: "shop", path: "/shop/" },
  { route: "shop-fruits-vegetables", path: "/shop/fruits-vegetables/" },
  { route: "shop-healthy-alternatives", path: "/shop/healthy-alternatives/" },
  { route: "shop-the-bakery", path: "/shop/the-bakery/" },
  { route: "shop-eggs-seafood-meats", path: "/shop/eggs-seafood-meats/" },
  { route: "shop-product-hass-avocado-ripe", path: "/shop/product/hass-avocado-ripe/" },
  { route: "gifting", path: "/gifting/" },
  { route: "gifting-all-gifts", path: "/gifting/all-gifts/" },
  { route: "gifting-product-chocolate-fondue-kit", path: "/gifting/product/chocolate-fondue-kit/" },
  { route: "bulk-gifting", path: "/bulk-gifting/" },
  { route: "recipes", path: "/recipes/" },
  { route: "recipes-whipped-avocado-toast", path: "/recipes/whipped-avocado-toast/" },
  { route: "stories", path: "/stories/" },
  { route: "about-us", path: "/about-us/" },
  { route: "services", path: "/services/" },
  { route: "store-locator", path: "/store-locator/" },
  { route: "contact-us", path: "/contact-us/" },
];

async function capture(browser: Browser, target: CaptureTarget, viewport: (typeof VIEWPORTS)[number]) {
  const dir = join(OUT_DIR, target.route);
  mkdirSync(dir, { recursive: true });
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.isMobile,
    deviceScaleFactor: 1,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
  });

  await page.goto(`${ORIGIN}${target.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: join(dir, `${viewport.name}.png`),
    fullPage: false,
  });
  await page.close();
}

async function main(): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const target of TARGETS) {
      for (const viewport of VIEWPORTS) {
        console.log(`capture ${target.route} ${viewport.name}`);
        await capture(browser, target, viewport);
        await new Promise((r) => setTimeout(r, 600));
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
