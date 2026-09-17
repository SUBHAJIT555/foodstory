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
  | "search-results";

export type NavItem = {
  label: string;
  href: string;
};

export type MegaItem = {
  label: string;
  href: string;
  children?: MegaItem[];
};

export type MegaCategory = MegaItem;

export type OverlayName =
  | "mega"
  | "search"
  | "location"
  | "mobile"
  | "cart"
  | "login"
  | "shelf"
  | null;
