import type { MegaItem, NavItem } from "@/types";
import { buildShopMegaTree, shopAllHref } from "@/data/shop";

export const primaryNav: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: shopAllHref },
  { label: "GIFTING", href: "/gifting/" },
  { label: "BULK GIFTING", href: "/bulk-gifting/" },
  { label: "ABOUT US", href: "/about-us/" },
  { label: "SERVICES", href: "/services/" },
];

export function isPrimaryNavActive(pathname: string, item: NavItem, megaOpen = false): boolean {
  if (item.label === "HOME" || item.href === "/") return pathname === "/";
  if (item.label === "SHOP") return pathname.startsWith("/shop") || megaOpen;
  const prefix = item.href.replace(/\/$/, "");
  return prefix.length > 0 && pathname.startsWith(prefix);
}

/** Nested Shop mega tree derived from `shopListings` chips (plus live-only L1 such as Fresh Meals). */
export const shopMegaCategories: MegaItem[] = buildShopMegaTree();

export const shopMegaDefault =
  shopMegaCategories.find((item) => item.label === "Fresh Produce") ?? shopMegaCategories[0];

export { shopAllHref };

export const announcementMessages = [
  "Free shipping on every order!",
  "Cash on Delivery Available",
  "Call or WhatsApp 9004171401 for any query",
];

export const trendingSearchSlugs = ["salt-bread", "truffle-croissant-chips", "thai-guacamole-300gm"];

export const popularSearches = [
  "cheese",
  "blueberry",
  "avocado",
  "organic",
  "gluten free",
  "paneer",
  "milk",
  "fresh fruit",
];

export const searchPlaceholders = [
  "Search “Gift Hampers”",
  "Search “Strawberries”",
  "Search “Plum Cake”",
  "Search “Chocolates”",
];
