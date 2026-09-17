import type { ShopChip, ShopCrumb, ShopFilterOption, ShopListing } from "@/data/shop";
import type { PdpFaq } from "@/data/pdp";
import { getProductBySlug, getProductsByCollection, isGiftProduct, products, type Product } from "@/data/products";

export type GiftItem = {
  name: string;
  href: string;
  price: number;
  unit?: string;
};

export type GiftListing = ShopListing & {
  cta: "gift";
};

export type GiftKind = "occasion" | "type" | "price" | "family";

export type GiftCategory = ShopChip & {
  id: string;
  slug: string;
  kind: GiftKind;
};

function category(kind: GiftKind, label: string, href: string): GiftCategory {
  const slug = href.split("/").filter(Boolean).at(-1) ?? "";
  return { id: slug, label, slug, href, kind };
}

export const giftOccasions: GiftCategory[] = [
  category("occasion", "Festive", "/gifting/all-gifts/gift-by-occasion/festive/"),
  category("occasion", "Corporate", "/gifting/all-gifts/gift-by-occasion/corporate/"),
  category("occasion", "Hosting", "/gifting/all-gifts/gift-by-occasion/hosting/"),
  category("occasion", "Birthdays", "/gifting/all-gifts/gift-by-occasion/birthdays/"),
  category("occasion", "Housewarming", "/gifting/all-gifts/gift-by-occasion/housewarming/"),
  category("occasion", "Weddings", "/gifting/all-gifts/gift-by-occasion/weddings/"),
  category("occasion", "Congratulations", "/gifting/all-gifts/gift-by-occasion/congratulations/"),
];

export const giftTypes: GiftCategory[] = [
  category("type", "Chocolates & Sweets", "/gifting/all-gifts/gifts-by-type/chocolate-sweets/"),
  category("type", "Dry Fruits", "/gifting/all-gifts/gifts-by-type/dry-fruit-trays/"),
  category("type", "Cheese & Grazing Boxes", "/gifting/all-gifts/gifts-by-type/cheese-grazing-boxes/"),
  category("type", "Fruit Baskets", "/gifting/all-gifts/gifts-by-type/fruits-baskets/"),
  category("type", "Snacking Hampers", "/gifting/all-gifts/gifts-by-type/snacking-hampers/"),
  category("type", "Tea & Coffee Hampers", "/gifting/all-gifts/gifts-by-type/tea-coffee-hampers/"),
];

export const giftFamilies: GiftCategory[] = [
  category("family", "Gift by Occasion", "/gifting/all-gifts/gift-by-occasion/"),
  category("family", "Gift by Type", "/gifting/all-gifts/gifts-by-type/"),
  category("family", "Gift By Price", "/gifting/all-gifts/gift-by-price/"),
];

export const giftPrices: Array<GiftCategory & { lines: string[] }> = [
  { ...category("price", "Under ₹2000", "/gifting/all-gifts/under-2000/"), lines: ["Under", "₹2000"] },
  { ...category("price", "₹2000 to ₹3500", "/gifting/all-gifts/2000-3500/"), lines: ["₹2000", "to", "₹3500"] },
  { ...category("price", "₹3500 to ₹5000", "/gifting/all-gifts/3500-5000/"), lines: ["₹3500", "to", "₹5000"] },
  { ...category("price", "₹5000 Onwards", "/gifting/all-gifts/gifts-above-inr-5000/"), lines: ["₹5000", "Onwards"] },
];

export const giftCatalog: GiftCategory[] = [...giftFamilies, ...giftOccasions, ...giftTypes, ...giftPrices];

export function giftListingHref(path: string): string {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  return `/gifting/${normalized}/`;
}

export function giftCategoryByValue(value: string): GiftCategory | undefined {
  return giftCatalog.find((item) => item.slug === value || item.id === value);
}

export function isGiftPricePath(path: string): boolean {
  if (path === "all-gifts/gift-by-price") return true;
  const last = path.split("/").filter(Boolean).at(-1);
  return giftPrices.some((item) => item.slug === last);
}

export function isGiftFamilyPath(path: string): boolean {
  return (
    path === "all-gifts" ||
    path === "all-gifts/gift-by-occasion" ||
    path === "all-gifts/gifts-by-type" ||
    path === "all-gifts/gift-by-price"
  );
}

export function giftRailChips(path: string): ShopChip[] {
  if (path === "all-gifts") return giftFamilies;
  if (path.startsWith("all-gifts/gift-by-occasion")) return giftOccasions;
  if (path.startsWith("all-gifts/gifts-by-type")) return giftTypes;
  if (isGiftPricePath(path)) return giftPrices;
  return giftFamilies;
}

export const giftTicker = ["Bespoke Gifting", "Personalised For You", "Handcrafted", "Artisanal", "Fine Global Finds"];

function toGiftItem(product: Product): GiftItem {
  return { name: product.name, href: product.href, price: product.price, unit: product.unit };
}

export const landingGifts: GiftItem[] = getProductsByCollection("gift-story").map(toGiftItem);

export const editTabs = [
  { id: "dry-fruits-sweets", label: "Dry Fruits & Sweets" },
  { id: "signature-hampers", label: "Signature Hampers" },
  { id: "hosting", label: "Hosting" },
] as const;

export const editGifts: Record<(typeof editTabs)[number]["id"], GiftItem[]> = {
  "dry-fruits-sweets": getProductsByCollection("gifting-edit-dry-fruits").map(toGiftItem),
  "signature-hampers": landingGifts.slice(0, 4),
  hosting: getProductsByCollection("gifting-edit-hosting").map(toGiftItem),
};

export const personalizePoints = ["Build It Your Way", "Include a Gifting card", "Accessories to choose from"];

export const velvetFeatures = [
  { title: "Personalisation & Monogramming", copy: "Your mark in every detail." },
  { title: "Global Curation & Quality", copy: "The world’s finest, handpicked for you." },
  { title: "Elevated Hosting & Grazing", copy: "Artisan cheeses, laden boards, refined party fare." },
  { title: "Delivered at your doorstep", copy: "Handled with expertise, not haste." },
];

export const giftingWay = [
  { title: "Artisanal Selections", copy: "From small-batch creations to rare finds, only the finest picks" },
  { title: "Personalised Presents", copy: "No fridge needed, always ready" },
  { title: "From the basket to the ribbon", copy: "Signed, sealed and delivered, your way" },
  { title: "Chef's Selection", copy: "Handpicked by expert chefs" },
  { title: "A story for every occasion", copy: "Weddings, Corporate, Celebrations or for Hosting. Ready to be gifted and savoured" },
  { title: "On-time Delivery", copy: "Gifts at your doorstep, right when you want them" },
];

export const landingFaqs: PdpFaq[] = [
  { question: "Can I customise my hamper?", answer: "Yes, you may customise your gift hamper by visiting your nearest Foodstory store. Alternatively, you may also Send an Enquiry via our Gifting Personalisation form on the website and our Gifting experts will help." },
  { question: "Can I order more than one hamper?", answer: "While shopping online on our website, you may order up to a maximum of 10 gift hampers or boxes. If you’d like to order more than 10 gift hampers, please send us an enquiry via the Bulk Gifting form." },
  { question: "Do you personalise hamper packaging?", answer: "We offer Bespoke Gifting services for all orders, where you can personalise packaging, ribbons, and notes." },
  { question: "Do you offer healthy gift hamper options?", answer: "Yes, we can curate gift hampers with a variety of guilt-free and healthy delights as per your preference. You may also browse our selection of Gluten Free hampers." },
  { question: "Where all can you deliver gift hampers?", answer: "We’re currently delivering hampers across Delhi NCR, Hyderabad and Bengaluru. To check if we can deliver to your location, please enter your delivery pin code on our checkout page." },
  { question: "Can I add a note to the gift hamper?", answer: "Yes, you can add a note to your gift hamper while shopping online, just before adding it to your cart. You can also reach out to our gifting experts at our store or WhatsApp at 9004171401." },
  { question: "Do you curate hampers for weddings?", answer: "Yes, we have a number of pre-curated hampers that are perfect for wedding gifting, in-room hampers, bridal showers and bachelorette parties." },
  { question: "How much time do you take to deliver a gift hamper?", answer: "Choose the time slot and delivery date based on your preference while ordering a hamper online and we’ll have it delivered at your doorstep." },
];

export const giftPdpFaqs: PdpFaq[] = [
  { question: "Will the products stay fresh during delivery?", answer: "Gift products are packed to travel. Choose a delivery slot that suits when the hamper should be opened." },
  { question: "What if there are allergy concerns?", answer: "Check the Includes list on the product. For specific allergies, speak with the Gifting Concierge before you order." },
  { question: "What if something breaks during shipping?", answer: "Reach the Gifting Concierge on WhatsApp or phone and we will help replace damaged items." },
  { question: "Can you handle large or bulk gifting orders?", answer: "Orders above ten hampers go through the Bulk Gifting form on /bulk-gifting/." },
  { question: "How long do the items last?", answer: "Shelf life varies by product. The Includes list and More Product Information note each item." },
];

export const bulkFaqs: PdpFaq[] = [
  { question: "Do you offer customisation for bulk gift orders?", answer: "Yes. Packaging, notes, and selections can be shaped around the occasion after you complete the form." },
  { question: "Is there a minimum order quantity for bulk gifting?", answer: "Use the Bulk Gifting form for more than ten hampers. The team confirms minimums for your city." },
  { question: "Can we include our company logo or branding in the hamper?", answer: "Branded For You packaging can be customised with your logo after the enquiry." },
  { question: "How long does it take for a bulk order to be completed?", answer: "We'll reach out with tailor-made ideas in 24 hours. Lead time is confirmed with your selection." },
  { question: "Do you provide delivery to multiple addresses?", answer: "Multi-address delivery can be arranged after the enquiry. Stay updated on deliveries, delivered right on schedule." },
  { question: "What payment methods do you accept for bulk orders?", answer: "Payment is confirmed with your selection after curated options are shared." },
  { question: "Can I get a sample hamper before placing a bulk order?", answer: "Ask in the enquiry. Sample availability depends on the city and the hamper." },
  { question: "Who can I reach out to for assistance with my bulk gifting needs?", answer: "WhatsApp 9004171401 or complete the form on this page." },
];

export const bulkCities = ["New Delhi", "Hyderabad", "Bengaluru", "Other Cities"] as const;

export const bulkBenefits = [
  { title: "Personalisation Made Easy", copy: "From the basket to the ribbon - signed, sealed and delivered, your way." },
  { title: "On-time Delivery", copy: "Gifts at your doorstep, right when you want them." },
  { title: "Gift Baskets Crafted from 8000+ ingredients", copy: "Curate your story, your way." },
  { title: "Pick Your Palate Preferences", copy: "Gift baskets tailored to your dietary choices" },
  { title: "Branded For You", copy: "Packaging designs that can be customised with your logo" },
  { title: "Shaped around your spend", copy: "Customised prices for customised gifting" },
];

export const bulkOccasions = [
  { label: "Corporate Gifting", href: "/gifting/all-gifts/gift-by-occasion/corporate/" },
  { label: "Weddings", href: "/gifting/all-gifts/gift-by-occasion/weddings/" },
  { label: "Baby Showers", href: "/gifting/all-gifts/gift-by-occasion/congratulations/" },
  { label: "Housewarming", href: "/gifting/all-gifts/gift-by-occasion/housewarming/" },
  { label: "Festive Gifting", href: "/gifting/all-gifts/gift-by-occasion/festive/" },
  { label: "Landmark Celebrations", href: "/gifting/all-gifts/gift-by-occasion/hosting/" },
];

export const bulkSteps = [
  { title: "Tell us your story", copy: "Complete the form above to help us understand the occasion, theme & more" },
  { title: "Get Curated Options", copy: "We'll reach out with tailor-made ideas in 24 hours" },
  { title: "Tied Up With A Ribbon", copy: "Confirm your selections and payment" },
  { title: "Sealed & Sent", copy: "Stay updated on your deliveries, delivered right on schedule" },
];

export const bulkPacks = ["Round Hat Box", "Square Hat Box", "Jute Basket", "Leatherite Tray", "Wooden Crate", "Picnic Basket"];

export const giftReassurance = [
  "Delivered at your doorstep, in under 4 hours.",
  "Personalise every detail, from the ribbon to the note.",
];

export type GiftPage = {
  slug: string;
  name: string;
  href: string;
  price: number;
  unit?: string;
  description: string;
  includes: string[];
  favourite?: string;
  vegetarian?: boolean;
};

type GiftPageExtra = {
  description: string;
  includes?: string[];
  favourite?: string;
  vegetarian?: boolean;
};

const giftExtras: Record<string, GiftPageExtra> = {
  "pudding-post": {
    description: "A silky, luxurious pudding quartet showcasing Japanese-style Hokkaido dairy alongside rich tropical and caramelized banana flavors.",
    includes: ["Hokkaido Milk Pudding", "Hokkaido Chocolate Milk Pudding", "Brown Butter Banana Pudding", "Tropical Mango and Coconut Pudding"],
    favourite: "The velvet-smooth, cloud-like texture that melts on the tongue with a sweet, quiet lightness.",
  },
  "dried-fruits-delights-tray": {
    description: "A tray of dried fruits composed for gifting.",
    includes: ["Dried figs", "Apricots", "Dates"],
    favourite: "A generous tray that reads as a complete gift on its own.",
  },
  "chocolate-fondue-kit": {
    description: "A fondue kit for hosting and gifting.",
    includes: ["Chocolate", "Dippers"],
    favourite: "A shared pot that turns the table into the gift.",
  },
  "the-everyday-nut-trio-box": {
    description: "Three nut selections boxed for everyday gifting.",
    includes: ["Almonds", "Cashews", "Pistachios"],
    favourite: "A trio that works as a desk gift or a hostess box.",
  },
  "the-regional-road-box": {
    description: "A regional tasting box assembled as a gift.",
    includes: ["Regional sweets", "Savouries"],
    favourite: "A road-trip of flavours without leaving the table.",
  },
  "the-mediterranean-afternoon": {
    description: "A Mediterranean afternoon spread, boxed.",
    includes: ["Olives", "Crackers", "Spreads"],
    favourite: "An afternoon board that arrives ready to open.",
  },
  "the-wellbeing-chapters": {
    description: "Three wellbeing chapters in one gift box.",
    includes: ["Tea", "Nuts", "A sweet"],
    favourite: "A quieter gift for someone who already has everything.",
  },
  "diwali-verses-of-tea-and-light-hamper": {
    description: "A Diwali tea hamper of honey, fudge, teas, and cake.",
    includes: [
      "Organic Kashmir Raw Forest Honey",
      "Earl Grey & White Chocolate Fudge",
      "Newby Jasmine Blossom Green Tea Bags",
      "TGL Co. Chamomile Tea",
      "Gluten-Free Orange Almond Cake",
    ],
  },
  "the-ode-to-longevity-wellness-diwali-hamper": {
    description: "A Diwali wellness hamper of supplements, walnuts, and honey.",
    includes: [
      "Shyft Plant Protein Isolate Vanilla",
      "Ace Blend Outshine Omega 3 Capsules",
      "Beeja's Sprouted Walnut",
      "Wellbeing Nutrition Organic Vitamin C + Zinc",
      "Sātmya Organic Moringa Spice Powder",
      "Sātmya Fermented Ashwagandha Brew",
      "Haddrell's Manuka Honey Snap Packs UMF 10+",
    ],
  },
  "letters-from-thailand-fruit-hamper": {
    description: "A Thailand fruit hamper of tropical fruit, coconut, and spices.",
    includes: [
      "Nam Hom Thai Coconut",
      "White Guava",
      "Smoked Paprika Basil Salt",
      "Hot Paprika Powder From Mexico",
      "Dragon Fruit (White Flesh) From Thailand",
      "Mini Orange From Thailand",
      "Rambutan From Thailand",
      "Mangosteen From Thailand",
      "Longan From Thailand",
      "Purple Sweet Potato From USA",
    ],
  },
  "epicurean-bounty": {
    description: "A generous fruit hamper assembled as a gift.",
  },
  "regal-dry-fruit-tray": {
    description: "A dry fruit tray of activated nuts, dates, and goji berries.",
    includes: ["Activated Pumpkin Seeds from India", "Activated Almond from USA", "Medjool Dates from Jordan", "Goji Berries from China"],
  },
  "the-zen-of-matcha": {
    description: "A matcha hamper for gifting.",
  },
  "nuts-and-berries-box": {
    description: "A dry fruit box of nuts and berries.",
  },
};

export function getGiftPage(slug: string): GiftPage | undefined {
  const product = getProductBySlug(slug);
  if (!product || !isGiftProduct(product)) return undefined;
  const extra = giftExtras[product.slug];
  return {
    slug: product.slug,
    name: product.name,
    href: product.href,
    price: product.price,
    unit: product.unit,
    description: extra?.description ?? `${product.name} from Foodstory.`,
    includes: extra?.includes ?? [],
    favourite: extra?.favourite,
    vegetarian: extra?.vegetarian ?? true,
  };
}

export function allGiftSlugs(): string[] {
  return products.filter(isGiftProduct).map((item) => item.slug);
}

function filtersFrom(items: GiftCategory[]): ShopFilterOption[] {
  return items.map((item) => ({ label: item.label, value: item.slug }));
}

const occasionFilters = filtersFrom(giftOccasions);
const typeFilters = filtersFrom(giftTypes);
const priceFilters = filtersFrom(giftPrices);

const giftFilterGroups = [
  { heading: "Gift by Occasion", options: occasionFilters },
  { heading: "Gift by Type", options: typeFilters },
  { heading: "Gift By Price", options: priceFilters },
];

function crumbsFor(path: string, title: string): ShopCrumb[] {
  const crumbs: ShopCrumb[] = [
    { label: "Home", href: "/" },
    { label: "Gifting", href: "/gifting/" },
    { label: "All Gifts", href: "/gifting/all-gifts/" },
  ];
  if (path === "all-gifts") return crumbs;

  if (path.startsWith("all-gifts/gift-by-occasion")) {
    const parent = path === "all-gifts/gift-by-occasion";
    crumbs.push({ label: "Gift By Occasion", href: parent ? undefined : "/gifting/all-gifts/gift-by-occasion/" });
    if (!parent) crumbs.push({ label: title });
    return crumbs;
  }

  if (path.startsWith("all-gifts/gifts-by-type")) {
    const parent = path === "all-gifts/gifts-by-type";
    crumbs.push({ label: "Gift by Type", href: parent ? undefined : "/gifting/all-gifts/gifts-by-type/" });
    if (!parent) crumbs.push({ label: title });
    return crumbs;
  }

  if (isGiftPricePath(path)) {
    const parent = path === "all-gifts/gift-by-price";
    crumbs.push({ label: "Gift By Price", href: parent ? undefined : "/gifting/all-gifts/gift-by-price/" });
    if (!parent) crumbs.push({ label: title });
  }

  return crumbs;
}

function listing(path: string, title: string): GiftListing {
  return {
    path,
    title,
    crumbs: crumbsFor(path, title),
    chips: giftRailChips(path),
    filterHeading: "Filter By Category",
    filters: [...occasionFilters, ...typeFilters, ...priceFilters],
    filterGroups: giftFilterGroups,
    cta: "gift",
  };
}

export const giftListings: GiftListing[] = [
  listing("all-gifts", "All Hampers"),
  listing("all-gifts/gift-by-occasion", "Gift by Occasion"),
  listing("all-gifts/gifts-by-type", "Gift by Type"),
  listing("all-gifts/gift-by-price", "Gift By Price"),
  ...giftOccasions.map((item) => listing(`all-gifts/gift-by-occasion/${item.slug}`, item.label)),
  ...giftTypes.map((item) => listing(`all-gifts/gifts-by-type/${item.slug}`, item.label)),
  ...giftPrices.map((item) => listing(`all-gifts/${item.slug}`, item.label)),
];

export function getGiftListing(path: string): GiftListing | undefined {
  const key = path.replace(/^\/+|\/+$/g, "") || "all-gifts";
  return giftListings.find((item) => item.path === key);
}
