import { mediaFor } from "@/data/media";
import { giftOccasions, giftPrices, giftTypes } from "@/data/gifting";
import { isGiftProduct, isShopProduct, products, type Product } from "@/data/products";
import { shopListings } from "@/data/shop";
import { productsForListing } from "@/lib/shop";

export type CatalogAudit = {
  total: number;
  shop: number;
  gift: number;
  multiCollection: number;
  orphans: string[];
  duplicateIds: string[];
  duplicateSlugs: string[];
  missingImages: string[];
  invalidListings: Array<{ slug: string; listing: string }>;
  invalidFilters: Array<{ slug: string; filter: string }>;
  emptyShopCategories: Array<{ label: string; path: string; count: number }>;
  emptyShopSubcategories: Array<{ label: string; path: string; count: number }>;
  emptyGiftOccasions: Array<{ label: string; path: string; count: number }>;
  emptyGiftTypes: Array<{ label: string; path: string; count: number }>;
  emptyGiftPrices: Array<{ label: string; path: string; count: number }>;
};

function pathFromHref(href: string): string {
  return href.replace(/^\/(?:shop|gifting)\/?/, "").replace(/\/+$/, "");
}

function knownKeys(): Set<string> {
  const keys = new Set<string>([
    "shop",
    "all-gifts",
    "baked-today",
    "avocado-guacamole-essentials",
    "your-meat-and-fish-essentials",
    "bestsellers",
    "gift-story",
    "festive-picks",
    "gifting-edit-dry-fruits",
    "gifting-edit-hosting",
    "meals-on-the-go",
    "cuisines",
    "fresh-dip-spread",
    "the-bakery/boulangerie",
    "dried-fruit-nuts-seeds/dried-fruit/dates",
  ]);

  for (const listing of shopListings) {
    if (listing.path) keys.add(listing.path);
    for (const chip of listing.chips) keys.add(pathFromHref(chip.href));
    for (const filter of listing.filters) keys.add(filter.value);
  }

  for (const item of [...giftOccasions, ...giftTypes, ...giftPrices]) {
    keys.add(item.slug);
    keys.add(pathFromHref(item.href).replace(/^all-gifts\//, ""));
    keys.add(pathFromHref(item.href));
  }

  return keys;
}

function duplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const extra = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) extra.add(value);
    seen.add(value);
  }
  return [...extra];
}

function imageFor(product: Product): string | undefined {
  return product.image ?? mediaFor(product.href, product.slug, product.name);
}

export function auditProductCatalog(): CatalogAudit {
  const known = knownKeys();
  const orphans = products.filter((product) => product.listings.length === 0).map((product) => product.slug);
  const missingImages = products.filter((product) => !imageFor(product)).map((product) => product.slug);
  const invalidListings: CatalogAudit["invalidListings"] = [];
  const invalidFilters: CatalogAudit["invalidFilters"] = [];

  for (const product of products) {
    for (const listing of product.listings) {
      if (!known.has(listing)) invalidListings.push({ slug: product.slug, listing });
    }
    for (const filter of product.filters) {
      if (!known.has(filter)) invalidFilters.push({ slug: product.slug, filter });
    }
  }

  const shopChips = [
    ...(shopListings[0]?.chips ?? []),
    { label: "Fresh Meals", href: "/shop/meals-on-the-go/" },
    { label: "Cuisines", href: "/shop/cuisines/" },
  ];
  const emptyShopCategories = shopChips.map((chip) => {
    const path = pathFromHref(chip.href);
    return { label: chip.label, path, count: productsForListing(path).length };
  });

  const fruitListing = shopListings.find((item) => item.path === "fruits-vegetables/fruits");
  const lifestyleListing = shopListings.find((item) => item.path === "healthy-alternatives");
  const emptyShopSubcategories = [...(fruitListing?.chips ?? []), ...(lifestyleListing?.chips ?? [])].map((chip) => {
    const path = pathFromHref(chip.href);
    return { label: chip.label, path, count: productsForListing(path).length };
  });

  const emptyGiftOccasions = giftOccasions.map((item) => ({
    label: item.label,
    path: pathFromHref(item.href),
    count: productsForListing(pathFromHref(item.href)).length,
  }));
  const emptyGiftTypes = giftTypes.map((item) => ({
    label: item.label,
    path: pathFromHref(item.href),
    count: productsForListing(pathFromHref(item.href)).length,
  }));
  const emptyGiftPrices = giftPrices.map((item) => ({
    label: item.label,
    path: pathFromHref(item.href),
    count: productsForListing(pathFromHref(item.href)).length,
  }));

  return {
    total: products.length,
    shop: products.filter(isShopProduct).length,
    gift: products.filter(isGiftProduct).length,
    multiCollection: products.filter((product) => isShopProduct(product) && isGiftProduct(product) || (product.collections?.length ?? 0) > 1).length,
    orphans,
    duplicateIds: duplicates(products.map((product) => product.id)),
    duplicateSlugs: duplicates(products.map((product) => product.slug)),
    missingImages,
    invalidListings,
    invalidFilters,
    emptyShopCategories: emptyShopCategories.filter((item) => item.count === 0),
    emptyShopSubcategories: emptyShopSubcategories.filter((item) => item.count === 0),
    emptyGiftOccasions: emptyGiftOccasions.filter((item) => item.count === 0),
    emptyGiftTypes: emptyGiftTypes.filter((item) => item.count === 0),
    emptyGiftPrices: emptyGiftPrices.filter((item) => item.count === 0),
  };
}

function linesFor(title: string, rows: Array<{ label: string; count?: number }>): string[] {
  if (!rows.length) return [`${title}: none`];
  return [title, ...rows.map((row) => (row.count === undefined ? `- ${row.label}` : `- ${row.label}: ${row.count}`))];
}

export function formatProductAudit(report = auditProductCatalog()): string {
  return [
    "PRODUCT DATA AUDIT",
    "",
    `Total products: ${report.total}`,
    `Shop products: ${report.shop}`,
    `Gifting products: ${report.gift}`,
    `Valid products: ${report.total - report.orphans.length - report.missingImages.length}`,
    "",
    `Missing images: ${report.missingImages.length}`,
    `Invalid categories: ${report.invalidListings.length}`,
    `Invalid filters: ${report.invalidFilters.length}`,
    `Duplicate IDs: ${report.duplicateIds.length}`,
    `Duplicate slugs: ${report.duplicateSlugs.length}`,
    `Orphan products: ${report.orphans.length}`,
    "",
    ...linesFor("EMPTY SHOP CATEGORIES:", report.emptyShopCategories),
    "",
    ...linesFor("EMPTY SHOP SUBCATEGORIES:", report.emptyShopSubcategories),
    "",
    ...linesFor("EMPTY GIFT OCCASIONS:", report.emptyGiftOccasions),
    "",
    ...linesFor("EMPTY GIFT TYPES:", report.emptyGiftTypes),
    "",
    ...linesFor("EMPTY GIFT PRICES:", report.emptyGiftPrices),
    "",
    report.invalidListings.length ? `Invalid listings:\n${report.invalidListings.map((item) => `- ${item.slug} → ${item.listing}`).join("\n")}` : "Invalid listings: none",
    report.missingImages.length ? `Missing image slugs: ${report.missingImages.join(", ")}` : "Missing image slugs: none",
  ].join("\n");
}
