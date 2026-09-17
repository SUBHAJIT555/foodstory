/**
 * Discover public Foodstories routes from sitemaps + a shallow homepage crawl.
 *
 * Usage (after Playwright is installed):
 *   npx tsx scripts/discover-routes.ts
 *
 * Throttled. Does not hit /admin, /account, or /checkout.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = "https://www.foodstories.shop";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "docs", "discovered-routes.json");

const SITEMAPS = [
  `${ORIGIN}/sitemap.xml`,
  `${ORIGIN}/shop/sitemap.xml`,
  `${ORIGIN}/shop/product/sitemap.xml`,
  `${ORIGIN}/stories/sitemap.xml`,
  `${ORIGIN}/recipes/sitemap.xml`,
];

const DISALLOW = ["/admin/", "/account/", "/checkout/"];

export type PageTemplate =
  | "home"
  | "shop-listing"
  | "shop-product"
  | "gifting-landing"
  | "gifting-listing"
  | "gifting-product"
  | "gifting-builder"
  | "recipe-listing"
  | "recipe-detail"
  | "story-listing"
  | "story-detail"
  | "editorial"
  | "faq"
  | "store-locator"
  | "form"
  | "search-results"
  | "unknown";

function classify(pathname: string): PageTemplate {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return "home";
  if (p === "/shop" || p.startsWith("/shop/") && !p.startsWith("/shop/product/")) {
    return "shop-listing";
  }
  if (p.startsWith("/shop/product/")) return "shop-product";
  if (p === "/gifting") return "gifting-landing";
  if (p.startsWith("/gifting/all-gifts")) return "gifting-listing";
  if (p.startsWith("/gifting/product/")) return "gifting-product";
  if (p.startsWith("/gifting/build-your-own-box")) return "gifting-builder";
  if (p === "/recipes" || p === "/recipes/list") return "recipe-listing";
  if (p.startsWith("/recipes/")) return "recipe-detail";
  if (p === "/stories" || p === "/stories/discover-all") return "story-listing";
  if (p.startsWith("/stories/")) return "story-detail";
  if (p === "/faqs" || p.startsWith("/faqs/")) return "faq";
  if (p === "/store-locator") return "store-locator";
  if (p.startsWith("/form/")) return "form";
  if (p === "/search-results") return "search-results";
  if (
    [
      "/about-us",
      "/services",
      "/contact-us",
      "/kitchen-studio",
      "/bulk-gifting",
      "/sitemap",
    ].includes(p) ||
    p.startsWith("/policies/")
  ) {
    return "editorial";
  }
  return "unknown";
}

function allowed(url: string): boolean {
  try {
    const u = new URL(url, ORIGIN);
    if (u.origin !== ORIGIN) return false;
    return !DISALLOW.some((d) => u.pathname.startsWith(d));
  } catch {
    return false;
  }
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "foodstories-reference-audit/0.1" },
  });
  if (!res.ok) {
    throw new Error(`${url} -> ${res.status}`);
  }
  return res.text();
}

function locs(xml: string): string[] {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
}

async function main(): Promise<void> {
  const urls = new Set<string>();

  for (const sitemap of SITEMAPS) {
    try {
      const xml = await fetchText(sitemap);
      for (const loc of locs(xml)) {
        if (allowed(loc)) urls.add(new URL(loc).href);
      }
      await new Promise((r) => setTimeout(r, 400));
    } catch (error) {
      console.warn(`skip ${sitemap}:`, error);
    }
  }

  const grouped: Record<PageTemplate, string[]> = {
    home: [],
    "shop-listing": [],
    "shop-product": [],
    "gifting-landing": [],
    "gifting-listing": [],
    "gifting-product": [],
    "gifting-builder": [],
    "recipe-listing": [],
    "recipe-detail": [],
    "story-listing": [],
    "story-detail": [],
    editorial: [],
    faq: [],
    "store-locator": [],
    form: [],
    "search-results": [],
    unknown: [],
  };

  for (const href of [...urls].sort()) {
    const template = classify(new URL(href).pathname);
    grouped[template].push(href);
  }

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(
    OUT,
    JSON.stringify(
      {
        origin: ORIGIN,
        generatedAt: new Date().toISOString(),
        total: urls.size,
        grouped,
      },
      null,
      2,
    ),
  );
  console.log(`Wrote ${urls.size} URLs to ${OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
