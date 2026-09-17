import type { MegaItem } from "@/types";

export type ShopChip = {
  label: string;
  href: string;
};

export type ShopFilterOption = {
  label: string;
  value: string;
};

export type ShopCrumb = {
  label: string;
  href?: string;
};

export type ShopFilterGroup = {
  heading: string;
  options: ShopFilterOption[];
};

export type ShopListing = {
  path: string;
  title: string;
  crumbs: ShopCrumb[];
  chips: ShopChip[];
  filterHeading: string;
  filters: ShopFilterOption[];
  filterGroups?: ShopFilterGroup[];
  cta?: "add" | "gift";
  seo?: {
    title: string;
    paragraphs: string[];
  };
};

export const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-desc", label: "By Price: High to Low" },
  { value: "price-asc", label: "By Price: Low to High" },
  { value: "name-asc", label: "By Name: A to Z" },
  { value: "name-desc", label: "By Name: Z to A" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export const shopListings: ShopListing[] = [
  {
    path: "",
    title: "Shop All",
    crumbs: [{ label: "Home", href: "/" }, { label: "Shop" }],
    chips: [
      { label: "Fresh Produce", href: "/shop/fruits-vegetables/" },
      { label: "Bakery", href: "/shop/the-bakery/" },
      { label: "Cheese", href: "/shop/cheese/" },
      { label: "Pantry Perks", href: "/shop/pantry-perks/" },
      { label: "Meat Market", href: "/shop/eggs-seafood-meats/" },
      { label: "Pantry", href: "/shop/the-pantry/" },
      { label: "Dips and Spreads", href: "/shop/dips-spreads-batters-ferments/" },
      { label: "Everyday Staples", href: "/shop/everyday-staples/" },
      { label: "Tea & Beverages", href: "/shop/tea-coffee-beverages/" },
      { label: "Dried Fruits & Nuts", href: "/shop/dried-fruit-nuts-seeds/" },
      { label: "Dairy", href: "/shop/milk-butter-yoghurt/" },
      { label: "Chocolate & Sweets", href: "/shop/chocolates-confectionery/" },
      { label: "Lifestyle & Diet", href: "/shop/healthy-alternatives/" },
      { label: "Frozen", href: "/shop/frozen/" },
      { label: "Beyond Food", href: "/shop/general-merchandising/" },
    ],
    filterHeading: "Filter By Category",
    filters: [
      { label: "Fresh Produce", value: "fruits-vegetables" },
      { label: "Bakery", value: "the-bakery" },
      { label: "Cheese", value: "cheese" },
      { label: "Pantry Perks", value: "pantry-perks" },
      { label: "Meat Market", value: "eggs-seafood-meats" },
      { label: "Pantry", value: "the-pantry" },
      { label: "Dips and Spreads", value: "dips-spreads-batters-ferments" },
      { label: "Everyday Staples", value: "everyday-staples" },
      { label: "Tea & Beverages", value: "tea-coffee-beverages" },
      { label: "Dried Fruits & Nuts", value: "dried-fruit-nuts-seeds" },
      { label: "Dairy", value: "milk-butter-yoghurt" },
      { label: "Chocolate & Sweets", value: "chocolates-confectionery" },
      { label: "Lifestyle & Diet", value: "healthy-alternatives" },
      { label: "Frozen", value: "frozen" },
      { label: "Beyond Food", value: "general-merchandising" },
    ],
  },
  {
    path: "fruits-vegetables",
    title: "Fresh Produce",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop/" },
      { label: "Fruits Vegetables" },
    ],
    chips: [
      { label: "Fruits", href: "/shop/fruits-vegetables/fruits/" },
      { label: "Vegetables", href: "/shop/fruits-vegetables/vegetables/" },
    ],
    filterHeading: "Filter By Category",
    filters: [
      { label: "Fruits", value: "fruits" },
      { label: "Vegetables", value: "vegetables" },
    ],
    seo: {
      title: "Buy Fresh Fruits & Vegetables Online at Foodstory",
      paragraphs: [
        "Capture the essence of farm fresh fruits and vegetables in your home through the services of Foodstory. With a range of fruits, fresh vegetables, hydroponic salads, herbs, mushrooms, and sprouts, both imported and locally sourced, Foodstory offers a selection of the freshest possible fruits and vegetables. Whether you are preparing meals for your family or creating gourmet dishes, Foodstory offers quality fresh produce for every occasion.",
        "Fresh Produce for Every Kitchen",
        "Discover a wide array of fresh fruits and vegetables, such as apples, avocados, berries, grapes, mangoes, citrus fruits, melons, seasonal fruits, tomatoes, broccoli, mushrooms, leafy vegetables, herbs, sprouts, root vegetables, organic vegetables and hydroponic vegetables.",
      ],
    },
  },
  {
    path: "fruits-vegetables/fruits",
    title: "Fruits",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop/" },
      { label: "Fruits Vegetables", href: "/shop/fruits-vegetables/" },
      { label: "Fruits" },
    ],
    chips: [
      { label: "Avocado", href: "/shop/fruits-vegetables/fruits/avocado/" },
      { label: "Berries & Grapes", href: "/shop/fruits-vegetables/fruits/berries-grapes/" },
      { label: "Mangoes", href: "/shop/fruits-vegetables/fruits/mangoes/" },
      { label: "Melons", href: "/shop/fruits-vegetables/fruits/melons/" },
      { label: "Other Exotic Fruits", href: "/shop/fruits-vegetables/fruits/other-exotic-fruits/" },
      { label: "Stone Fruits", href: "/shop/fruits-vegetables/fruits/stone-fruits/" },
      { label: "Oranges", href: "/shop/fruits-vegetables/fruits/oranges/" },
      { label: "Apples", href: "/shop/fruits-vegetables/fruits/apples/" },
      { label: "Organic Fruits", href: "/shop/fruits-vegetables/fruits/organic-fruits/" },
      { label: "Seasonal Fruits", href: "/shop/fruits-vegetables/fruits/seasonal-fruits/" },
      { label: "Diced & Sliced Fruits", href: "/shop/fruits-vegetables/fruits/diced-sliced-fruits/" },
    ],
    filterHeading: "Filter By Category",
    filters: [{ label: "Fruits", value: "fruits" }],
  },
  {
    path: "fruits-vegetables/vegetables",
    title: "Vegetables",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop/" },
      { label: "Fruits Vegetables", href: "/shop/fruits-vegetables/" },
      { label: "Vegetables" },
    ],
    chips: [],
    filterHeading: "Filter By Category",
    filters: [{ label: "Vegetables", value: "vegetables" }],
  },
  {
    path: "healthy-alternatives",
    title: "Lifestyle & Diet",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop/" },
      { label: "Healthy Alternatives" },
    ],
    chips: [
      { label: "Vegan", href: "/shop/healthy-alternatives/vegan/" },
      { label: "Gluten-Free Range", href: "/shop/healthy-alternatives/gluten-free-range/" },
      { label: "Organic", href: "/shop/healthy-alternatives/organic/" },
      { label: "Diet Swaps", href: "/shop/healthy-alternatives/diet-swaps/" },
      { label: "Bio-Hacking", href: "/shop/healthy-alternatives/bio-hacking/" },
      { label: "Keto", href: "/shop/healthy-alternatives/keto/" },
    ],
    filterHeading: "Filter By Category",
    filters: [
      { label: "Vegan", value: "vegan" },
      { label: "Gluten-Free Range", value: "gluten-free-range" },
      { label: "Organic", value: "organic" },
      { label: "Diet Swaps", value: "diet-swaps" },
      { label: "Bio-Hacking", value: "bio-hacking" },
      { label: "Keto", value: "keto" },
    ],
  },
  {
    path: "the-bakery",
    title: "Bakery",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop/" },
      { label: "The Bakery" },
    ],
    chips: [],
    filterHeading: "Filter By Category",
    filters: [{ label: "Bakery", value: "bakery" }],
  },
  {
    path: "pantry-perks",
    title: "Pantry Perks",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop/" },
      { label: "Pantry Perks" },
    ],
    chips: [],
    filterHeading: "Filter By Category",
    filters: [{ label: "Pantry Perks", value: "pantry-perks" }],
  },
  {
    path: "cheese",
    title: "Cheese",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop/" },
      { label: "Cheese" },
    ],
    chips: [],
    filterHeading: "Filter By Category",
    filters: [{ label: "Cheese", value: "cheese" }],
  },
  {
    path: "eggs-seafood-meats",
    title: "Meat Market",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop/" },
      { label: "Eggs Seafood Meats" },
    ],
    chips: [],
    filterHeading: "Filter By Category",
    filters: [{ label: "Meat Market", value: "meat" }],
  },
  {
    path: "avocado-guacamole-essentials",
    title: "Avocado",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop/" },
      { label: "Avocado Guacamole Essentials" },
    ],
    chips: [],
    filterHeading: "Filter By Category",
    filters: [{ label: "Fruits", value: "fruits" }],
  },
];

const listingAliases: Record<string, string> = {
  "baked-today": "the-bakery",
  "bestseller-delhi": "",
  "gifts-that-speak-your-story": "",
  "your-meat-and-fish-essentials": "eggs-seafood-meats",
  "the-pantry": "pantry-perks",
  "dips-spreads-batters-ferments": "",
  "everyday-staples": "",
  "tea-coffee-beverages": "",
  "dried-fruit-nuts-seeds": "",
  "milk-butter-yoghurt": "",
  frozen: "",
  "general-merchandising": "",
  "chocolates-confectionery": "",
  "healthy-alternatives/vegan": "healthy-alternatives",
  "healthy-alternatives/gluten-free-range": "healthy-alternatives",
  "healthy-alternatives/organic": "healthy-alternatives",
  "healthy-alternatives/diet-swaps": "healthy-alternatives",
  "healthy-alternatives/bio-hacking": "healthy-alternatives",
  "healthy-alternatives/keto": "healthy-alternatives",
  "fruits-vegetables/fruits/stone-fruits": "fruits-vegetables/fruits",
  "fruits-vegetables/fruits/berries-grapes": "fruits-vegetables/fruits",
  "fruits-vegetables/fruits/mangoes": "fruits-vegetables/fruits",
  "fruits-vegetables/fruits/melons-papaya-and-pomegranate": "fruits-vegetables/fruits",
  "fruits-vegetables/fruits/melons": "fruits-vegetables/fruits",
  "fruits-vegetables/fruits/avocado": "avocado-guacamole-essentials",
  "fruits-vegetables/fruits/other-exotic-fruits": "fruits-vegetables/fruits",
  "fruits-vegetables/fruits/apples": "fruits-vegetables/fruits",
  "fruits-vegetables/fruits/oranges": "fruits-vegetables/fruits",
  "fruits-vegetables/fruits/organic-fruits": "fruits-vegetables/fruits",
  "fruits-vegetables/fruits/seasonal-fruits": "fruits-vegetables/fruits",
  "fruits-vegetables/fruits/diced-sliced-fruits": "fruits-vegetables/fruits",
  "the-bakery/boulangerie": "the-bakery",
  "dried-fruit-nuts-seeds/dried-fruit/dates": "",
};

const extraShopRoots = ["meals-on-the-go", "cheese", "fresh-dip-spread", "cuisines"];

function isKnownShopPath(path: string): boolean {
  if (!path) return true;
  const first = path.split("/")[0];
  if (shopListings.some((item) => item.path === first || item.path.startsWith(`${first}/`))) return true;
  if (Object.keys(listingAliases).some((key) => key === first || key.startsWith(`${first}/`))) return true;
  return extraShopRoots.includes(first);
}

export const shopAllHref = "/shop/";

export function listingHref(path: string): string {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  return normalized ? `/shop/${normalized}/` : shopAllHref;
}

function allKnownChips(): ShopChip[] {
  const chips: ShopChip[] = [...(shopListings[0]?.chips ?? [])];
  for (const listing of shopListings) {
    for (const chip of listing.chips) {
      if (!chips.some((item) => item.href === chip.href)) chips.push(chip);
    }
  }
  return chips;
}

export function labelForShopPath(path: string): string | undefined {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  if (!normalized) return shopListings[0]?.title;
  const chip = allKnownChips().find((item) => pathFromHref(item.href) === normalized);
  if (chip) return chip.label;
  return shopListings.find((item) => item.path === normalized)?.title;
}

function withCanonicalLabel(listing: ShopListing): ShopListing {
  const label = labelForShopPath(listing.path);
  const crumbs = listing.crumbs.map((crumb, index, all) => {
    const last = index === all.length - 1;
    if (last) {
      if (!listing.path) return crumb;
      return label ? { ...crumb, label } : crumb;
    }
    if (!crumb.href || crumb.href === "/" || crumb.href === "/shop/" || crumb.href === "/shop") {
      return crumb;
    }
    const fromHref = labelForShopPath(pathFromHref(crumb.href));
    return fromHref ? { ...crumb, label: fromHref } : crumb;
  });
  if (!label || listing.path === "") return { ...listing, crumbs };
  return {
    ...listing,
    title: label,
    crumbs,
  };
}

export function getListing(path: string): ShopListing | undefined {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  const exact = shopListings.find((item) => item.path === normalized);
  if (exact) return withCanonicalLabel(exact);
  if (!isKnownShopPath(normalized)) return undefined;
  const alias = listingAliases[normalized];
  if (alias !== undefined) {
    const mapped = shopListings.find((item) => item.path === alias);
    if (mapped) {
      const label = labelForShopPath(normalized) ?? titleFromPath(normalized, mapped.title);
      return withCanonicalLabel({
        ...mapped,
        path: normalized,
        title: label,
        crumbs: [
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop/" },
          { label },
        ],
      });
    }
  }
  const fallback = fallbackListing(normalized);
  return fallback ? withCanonicalLabel(fallback) : undefined;
}

function titleFromPath(path: string, fallback: string): string {
  const last = path.split("/").filter(Boolean).at(-1);
  if (!last) return fallback;
  return last
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function fallbackListing(path: string): ShopListing | undefined {
  if (!path) return shopListings[0];
  const shopAll = shopListings[0];
  const label = labelForShopPath(path) ?? titleFromPath(path, "Shop");
  return {
    ...shopAll,
    path,
    title: label,
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop/" },
      { label },
    ],
  };
}

export const pageSize = 30;

function pathFromHref(href: string): string {
  return href.replace(/^\/shop\/?/, "").replace(/\/+$/, "");
}

function listingForHref(href: string): ShopListing | undefined {
  const path = pathFromHref(href);
  return shopListings.find((item) => item.path === path);
}

function megaNodeFromChip(chip: ShopChip): MegaItem {
  const listing = listingForHref(chip.href);
  const children = listing?.chips.filter((item) => item.href !== chip.href).map(megaNodeFromChip);
  return children?.length ? { label: chip.label, href: chip.href, children } : { label: chip.label, href: chip.href };
}

const megaOnlyInserts: { after: string; chip: ShopChip }[] = [
  { after: "Pantry", chip: { label: "Fresh Meals", href: "/shop/meals-on-the-go/" } },
  { after: "Frozen", chip: { label: "Cuisines", href: "/shop/cuisines/" } },
];

export function buildShopMegaTree(): MegaItem[] {
  const chips = [...(shopListings[0]?.chips ?? [])];
  megaOnlyInserts.forEach(({ after, chip }) => {
    if (chips.some((item) => item.href === chip.href || item.label === chip.label)) return;
    const at = chips.findIndex((item) => item.label === after);
    if (at >= 0) chips.splice(at + 1, 0, chip);
    else chips.push(chip);
  });
  return chips.map(megaNodeFromChip);
}
