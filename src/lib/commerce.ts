import { mediaFor } from "@/data/media";
import { getProductByHref, products } from "@/data/products";

export type CatalogInput = {
  id?: string;
  href: string;
  name: string;
  price: number | string;
  unit?: string;
  image?: string;
  available?: boolean;
};

export type CartItem = {
  key: string;
  productId: string;
  name: string;
  href: string;
  image?: string;
  variant: string;
  unitPrice: number;
  quantity: number;
};

export type ShelfItem = {
  productId: string;
  name: string;
  href: string;
  image?: string;
  price: number;
  unit?: string;
  available?: boolean;
};

export function normalizeHref(href: string) {
  return href.replace(/\/+$/, "") || "/";
}

export function parseMoney(value: number | string): number {
  if (typeof value === "number") return value;
  return Number(value.replace(/[^\d.]/g, "")) || 0;
}

export function cartItemKey(productId: string, variant = "default") {
  return `${productId}::${variant || "default"}`;
}

export function findCatalogProduct(href: string) {
  return getProductByHref(href) ?? products.find((item) => normalizeHref(item.href) === normalizeHref(href));
}

export function catalogId(input: CatalogInput) {
  if (input.id) return input.id;
  return findCatalogProduct(input.href)?.id ?? normalizeHref(input.href).split("/").at(-1) ?? input.href;
}

export function resolveImage(input: Pick<CatalogInput, "href" | "name" | "image">) {
  return input.image ?? findCatalogProduct(input.href)?.image ?? mediaFor(input.href, input.name);
}

export function toCartDraft(input: CatalogInput, variant?: string): Omit<CartItem, "quantity"> {
  const product = findCatalogProduct(input.href);
  const productId = catalogId(input);
  const chosen = variant || input.unit || product?.unit || "default";
  return {
    key: cartItemKey(productId, chosen),
    productId,
    name: product?.name ?? input.name,
    href: product?.href ?? input.href,
    image: resolveImage(input),
    variant: chosen,
    unitPrice: product?.price ?? parseMoney(input.price),
  };
}

export function toShelfItem(input: CatalogInput): ShelfItem {
  const product = findCatalogProduct(input.href);
  return {
    productId: catalogId(input),
    name: product?.name ?? input.name,
    href: product?.href ?? input.href,
    image: resolveImage(input),
    price: product?.price ?? parseMoney(input.price),
    unit: input.unit ?? product?.unit,
    available: input.available ?? product?.available,
  };
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export const CART_STORAGE_KEY = "fs.cart.v1";
export const SHELF_STORAGE_KEY = "fs.shelf.v1";
