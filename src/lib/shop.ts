import {
  getProductBySlug,
  getProductsByCollection,
  isGiftProduct,
  isShopProduct,
  products,
  type Product,
} from "@/data/products";
import type { SortValue } from "@/data/shop";

export const shopAllPreviewCount = 6;

export function listingKeyFromHref(href: string): string {
  return href.replace(/^\/(?:shop|gifting|category)\/?/, "").replace(/\/+$/, "");
}

export function productsForCategory(items: Product[], href: string): Product[] {
  const key = listingKeyFromHref(href);
  if (!key) return items.filter(isShopProduct);
  return items.filter((product) => matchesListing(product, key));
}

const giftFamilyKeys = new Set([
  "all-gifts",
  "all-gifts/gift-by-occasion",
  "all-gifts/gifts-by-type",
  "all-gifts/gift-by-price",
]);

const collectionAliases: Record<string, string> = {
  "bestseller-delhi": "bestsellers",
  bestsellers: "bestsellers",
  "gifts-that-speak-your-story": "gift-story",
};

function matchesListing(product: Product, key: string): boolean {
  if (product.listings.includes(key) || product.filters.includes(key)) return true;
  if (product.collections?.includes(key)) return true;
  const last = key.split("/").filter(Boolean).at(-1);
  if (last && last !== key && (product.filters.includes(last) || product.listings.includes(last) || product.collections?.includes(last))) {
    return true;
  }
  return false;
}

export function productsForListing(path: string): Product[] {
  const key = path.replace(/^\/+|\/+$/g, "") || "shop";
  if (!key || key === "shop") return products.filter(isShopProduct);

  const collection = collectionAliases[key] ?? collectionAliases[key.split("/").filter(Boolean).at(-1) ?? ""];
  if (collection) return getProductsByCollection(collection);

  const exact = products.filter((product) => product.listings.includes(key));
  if (exact.length > 0) return exact;

  const last = key.split("/").filter(Boolean).at(-1);
  if (last && last !== key) {
    const byLeaf = products.filter(
      (product) => product.filters.includes(last) || product.listings.includes(last) || product.collections?.includes(last),
    );
    if (byLeaf.length > 0) return byLeaf;
  }

  if (giftFamilyKeys.has(key)) return products.filter(isGiftProduct);
  return [];
}

export function getProductsByCategory(categoryId: string): Product[] {
  return productsForListing(categoryId);
}

export function getProductsByGiftOccasion(occasionId: string): Product[] {
  return productsForListing(`all-gifts/gift-by-occasion/${occasionId}`);
}

export function getProductsByGiftType(typeId: string): Product[] {
  return productsForListing(`all-gifts/gifts-by-type/${typeId}`);
}

export { getProductBySlug, getProductsByCollection };

export function applyFilters(items: Product[], selected: string[]): Product[] {
  if (selected.length === 0) return items;
  return items.filter((product) => selected.some((value) => matchesListing(product, value)));
}

export function applySort(items: Product[], sort: SortValue): Product[] {
  const next = [...items];
  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => a.price - b.price);
    case "price-desc":
      return next.sort((a, b) => b.price - a.price);
    case "name-asc":
      return next.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return next.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return next;
  }
}

export function parseSort(value: string | undefined): SortValue {
  if (
    value === "price-asc" ||
    value === "price-desc" ||
    value === "name-asc" ||
    value === "name-desc" ||
    value === "relevance"
  ) {
    return value;
  }
  return "relevance";
}

export function parseFilters(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return (Array.isArray(value) ? value : value.split(",")).filter(Boolean);
}

export function availableCountLabel(count: number): string {
  return count === 1 ? "1 Product Available" : `${count} Products Available`;
}
