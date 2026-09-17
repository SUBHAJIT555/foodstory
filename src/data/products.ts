export type ProductBadgeTone = "charcoal" | "salmon";

export type ProductBadge = {
  label: string;
  tone: ProductBadgeTone;
};

export type ProductMedia = {
  objectFit?: "contain" | "cover";
  scale?: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  href: string;
  price: number;
  compareAtPrice?: number;
  unit?: string;
  units?: string[];
  badges?: ProductBadge[];
  available?: boolean;
  image?: string;
  images?: string[];
  media?: ProductMedia;
  listings: string[];
  filters: string[];
  collections?: string[];
  aliases?: string[];
};

function badge(label: string, tone: ProductBadgeTone = "charcoal"): ProductBadge {
  return { label, tone: label === "Bestseller" ? "salmon" : tone };
}

function giftPriceBand(price: number): { listing: string; filter: string } {
  if (price < 2000) return { listing: "all-gifts/under-2000", filter: "under-2000" };
  if (price < 3500) return { listing: "all-gifts/2000-3500", filter: "2000-3500" };
  if (price < 5000) return { listing: "all-gifts/3500-5000", filter: "3500-5000" };
  return { listing: "all-gifts/gifts-above-inr-5000", filter: "gifts-above-inr-5000" };
}

function giftTaxonomy(occasions: string[], types: string[], price: number) {
  const band = giftPriceBand(price);
  return {
    listings: [
      "all-gifts",
      ...occasions.map((id) => `all-gifts/gift-by-occasion/${id}`),
      ...types.map((id) => `all-gifts/gifts-by-type/${id}`),
      band.listing,
    ],
    filters: [...occasions, ...types, band.filter],
  };
}

function fruitLeaves(...leaves: string[]): string[] {
  return ["shop", "fruits-vegetables", "fruits-vegetables/fruits", ...leaves.map((leaf) => `fruits-vegetables/fruits/${leaf}`)];
}

export const products: Product[] = [
  { id: "blueberries", slug: "blueberries", name: "Peruvian Blueberry", href: "/shop/product/blueberries/", price: 400, unit: "125gm", badges: [badge("1.25x Bigger"), badge("Bestseller")], listings: [...fruitLeaves("berries-grapes", "organic-fruits"), "healthy-alternatives"], filters: ["fruits", "organic"], collections: ["bestsellers"], available: true },
  { id: "cherry", slug: "cherry-from-usa", name: "Sentennial Cherry From Canada", href: "/shop/product/cherry-from-usa/", price: 1500, unit: "250gm", badges: [badge("Ideal for Dessert"), badge("In Season")], listings: fruitLeaves("stone-fruits", "seasonal-fruits"), filters: ["fruits"], available: true },
  { id: "hass", slug: "hass-avocado", name: "Hass Avocado From Peru", href: "/shop/product/hass-avocado/", price: 400, unit: "1 pc", units: ["1 pc", "Pack of 2"], badges: [badge("1.4x Bigger"), badge("Bestseller")], listings: [...fruitLeaves("avocado"), "avocado-guacamole-essentials"], filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "hass-ripe", slug: "hass-avocado-ripe", name: "Hass Avocado (Ripe) From Peru", href: "/shop/product/hass-avocado-ripe/", price: 400, unit: "1 pc", badges: [badge("Perfect for Smoothie"), badge("Bestseller")], listings: [...fruitLeaves("avocado"), "avocado-guacamole-essentials"], filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "guac", slug: "cre", name: "Foodstory Signature Guacamole (Made Fresh to Order)", href: "/shop/product/cre/", price: 400, unit: "250gm", badges: [badge("Bestseller")], listings: ["shop", "fruits-vegetables", "fruits-vegetables/fruits", "fruits-vegetables/fruits/avocado", "dips-spreads-batters-ferments", "avocado-guacamole-essentials"], filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "orange-sweet", slug: "orange-sweet-potato-from-usa", name: "Orange Sweet Potato From USA", href: "/shop/product/orange-sweet-potato-from-usa/", price: 1540, unit: "700gm", badges: [badge("Moist Texture")], listings: ["shop", "fruits-vegetables", "fruits-vegetables/vegetables"], filters: ["vegetables"], available: true },
  { id: "mangosteen", slug: "mangosteen", name: "Mangosteen From Thailand", href: "/shop/product/mangosteen/", price: 800, unit: "500gm", listings: fruitLeaves("other-exotic-fruits"), filters: ["fruits"], available: true },
  { id: "coconut", slug: "thai-tender-coconut", name: "Nam Hom Thai Coconut", href: "/shop/product/thai-tender-coconut/", price: 1000, unit: "1 pc", badges: [badge("Bestseller")], listings: fruitLeaves("other-exotic-fruits"), filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "raspberry", slug: "raspberries", name: "Raspberry from Netherlands", href: "/shop/product/raspberries/", price: 1400, unit: "125 gm", badges: [badge("Bestseller")], listings: fruitLeaves("berries-grapes"), filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "edamame", slug: "edamame-beans", name: "Edamame Beans From Thailand", href: "/shop/product/edamame-beans/", price: 600, unit: "500gm", badges: [badge("Buttery Crunch"), badge("Bestseller")], listings: ["shop", "fruits-vegetables", "fruits-vegetables/vegetables"], filters: ["vegetables"], collections: ["bestsellers"], available: true },
  { id: "mini-orange", slug: "mini-orange-from-thailand", name: "Mini Orange From Thailand", href: "/shop/product/mini-orange-from-thailand/", price: 450, unit: "500gm", badges: [badge("Easy to Peel"), badge("Bestseller")], listings: fruitLeaves("oranges"), filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "green-grapes", slug: "seedless-green-grapes", name: "Seedless Green Grapes From Spain", href: "/shop/product/seedless-green-grapes/", price: 450, unit: "250gm", badges: [badge("Firm & Mildly Sweet"), badge("Bestseller")], listings: fruitLeaves("berries-grapes"), filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "asparagus", slug: "green-asparagus", name: "Green Asparagus From Thailand", href: "/shop/product/green-asparagus/", price: 320, unit: "200gm", badges: [badge("Bestseller")], listings: ["shop", "fruits-vegetables", "fruits-vegetables/vegetables"], filters: ["vegetables"], collections: ["bestsellers"], available: true },
  { id: "purple-sweet", slug: "purple-sweet-potato", name: "Purple Sweet Potato From USA", href: "/shop/product/purple-sweet-potato/", price: 1540, unit: "700gm", badges: [badge("Powerful Antioxidant")], listings: ["shop", "fruits-vegetables", "fruits-vegetables/vegetables"], filters: ["vegetables"], available: true },
  { id: "peach", slug: "peach-from-spain", name: "Peach from Spain", href: "/shop/product/peach-from-spain/", price: 1100, unit: "500gm", badges: [badge("Smoothie Ready")], listings: fruitLeaves("stone-fruits"), filters: ["fruits"], available: true },
  { id: "nectarine", slug: "nectarine-from-spain", name: "Nectarine From Spain", href: "/shop/product/nectarine-from-spain/", price: 1100, unit: "500gm", badges: [badge("Firm & Fuzz-Free")], listings: fruitLeaves("stone-fruits"), filters: ["fruits"], available: true },
  { id: "red-grapes", slug: "seedless-red-grapes", name: "Seedless Red Grapes From Spain", href: "/shop/product/seedless-red-grapes/", price: 450, unit: "250gm", badges: [badge("Mildly Sweet with Zing"), badge("Bestseller")], listings: fruitLeaves("berries-grapes"), filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "rockit", slug: "rockit-apple", name: "Rockit Apple From New Zealand", href: "/shop/product/rockit-apple/", price: 650, unit: "1 pack", badges: [badge("Bestseller")], listings: fruitLeaves("apples"), filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "pomegranate", slug: "pomegranate", name: "Pomegranate", href: "/shop/product/pomegranate/", price: 210, unit: "500gm", listings: fruitLeaves("other-exotic-fruits", "seasonal-fruits"), filters: ["fruits"], available: true },
  { id: "lemon", slug: "lemon-from-italy", name: "Lemon From Italy", href: "/shop/product/lemon-from-italy/", price: 225, unit: "250gm", listings: fruitLeaves("oranges", "other-exotic-fruits"), filters: ["fruits"], available: true },
  { id: "fuji", slug: "fuji-apple", name: "Fuji Apple From China", href: "/shop/product/fuji-apple/", price: 250, unit: "500gm", listings: fruitLeaves("apples"), filters: ["fruits"], available: true },
  { id: "strawberry", slug: "strawberries", name: "Strawberry From USA", href: "/shop/product/strawberries/", price: 1800, unit: "400 gm", badges: [badge("Bestseller")], listings: fruitLeaves("berries-grapes", "seasonal-fruits"), filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "blackberry", slug: "blackberries", name: "Blackberry from Netherlands", href: "/shop/product/blackberries/", price: 1400, unit: "125 gm", badges: [badge("Bestseller")], listings: fruitLeaves("berries-grapes"), filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "coconut-pack", slug: "thai-tender-coconut-pack-of-4", name: "Nam Hom Thai Coconut Pack of 4", href: "/shop/product/thai-tender-coconut-pack-of-4/", price: 3600, unit: "4 pc", badges: [badge("Bestseller")], listings: fruitLeaves("other-exotic-fruits"), filters: ["fruits"], collections: ["bestsellers"], available: true },
  { id: "emmer", slug: "emmer-wheat-sourdough550gm-1", name: "Emmer Wheat Sourdough", href: "/shop/product/emmer-wheat-sourdough550gm-1/", price: 250, badges: [badge("Foodstory Exclusive")], listings: ["shop", "the-bakery", "baked-today", "healthy-alternatives", "healthy-alternatives/organic"], filters: ["bakery", "organic"], collections: ["bestsellers"], available: true },
  { id: "baguette", slug: "sourdough-baguette", name: "French Baguette", href: "/shop/product/sourdough-baguette/", price: 225, listings: ["shop", "the-bakery", "baked-today"], filters: ["bakery"], available: true },
  { id: "rye", slug: "dark-rye-sourdough-1", name: "Dark Rye Sourdough", href: "/shop/product/dark-rye-sourdough-1/", price: 250, badges: [badge("Chef's Special")], listings: ["shop", "the-bakery", "baked-today"], filters: ["bakery"], available: true },
  { id: "quinoa-bread", slug: "gluten-free-quinoa", name: "Gluten Free Quinoa Bread", href: "/shop/product/gluten-free-quinoa/", price: 395, listings: ["shop", "the-bakery", "healthy-alternatives", "healthy-alternatives/gluten-free-range"], filters: ["bakery", "gluten-free-range"], available: true },
  { id: "cracker-pizza", slug: "cracker-pizza-base", name: "Cracker Pizza Base (Pack of 2)", href: "/shop/product/cracker-pizza-base/", price: 150, badges: [badge("Chef's Special")], listings: ["shop", "the-bakery"], filters: ["bakery"], available: true },
  { id: "sourdough-pizza", slug: "sourdough-pizza-base", name: "Sourdough Pizza Base", href: "/shop/product/sourdough-pizza-base/", price: 150, listings: ["shop", "the-bakery", "baked-today"], filters: ["bakery"], available: true },
  { id: "olive-cheddar", slug: "olive-cheddar-sourdough-1", name: "Kalamata Olive & Cheddar Sourdough", href: "/shop/product/olive-cheddar-sourdough-1/", price: 250, badges: [badge("Bestseller")], listings: ["shop", "the-bakery", "baked-today"], filters: ["bakery"], collections: ["bestsellers"], available: true },
  { id: "salt-bread", slug: "salt-bread", name: "Salt Bread (Pack of 2)", href: "/shop/product/salt-bread/", price: 225, unit: "100 gm", listings: ["shop", "the-bakery", "baked-today"], filters: ["bakery"], available: true },
  { id: "truffle-chips", slug: "truffle-croissant-chips", name: "Truffle Croissant Chips", href: "/shop/product/truffle-croissant-chips/", price: 275, unit: "40 gm", badges: [badge("Chef's Special")], listings: ["shop", "the-bakery", "pantry-perks"], filters: ["bakery"], available: true },
  { id: "country", slug: "country-sourdough-1", name: "Country Sourdough", href: "/shop/product/country-sourdough-1/", price: 175, badges: [badge("Bestseller")], listings: ["shop", "the-bakery", "baked-today"], filters: ["bakery"], collections: ["bestsellers"], available: true },
  { id: "croissant-tissue", slug: "croissant-tissue-bread", name: "Croissant Tissue Bread", href: "/shop/product/croissant-tissue-bread/", price: 325, badges: [badge("Chef's Special")], listings: ["shop", "the-bakery"], filters: ["bakery"], collections: ["bestsellers"], available: true },
  { id: "almond-drink", slug: "137-degrees-almond-drink-unsweetened", name: "137 Degrees Almond Drink Unsweetened", href: "/shop/product/137-degrees-almond-drink-unsweetened/", price: 495, listings: ["shop", "healthy-alternatives", "healthy-alternatives/vegan", "milk-butter-yoghurt", "tea-coffee-beverages"], filters: ["vegan"], collections: ["bestsellers"], media: { objectFit: "contain", scale: 1.35 }, available: true },
  { id: "oat-drink", slug: "oatly-oat-drink", name: "Oatly Oat Drink", href: "/shop/product/oatly-oat-drink/", price: 395, listings: ["shop", "healthy-alternatives", "healthy-alternatives/vegan", "healthy-alternatives/diet-swaps", "milk-butter-yoghurt", "tea-coffee-beverages"], filters: ["vegan", "diet-swaps"], available: true },
  { id: "evian", slug: "evian-water-pack-of-12", name: "Evian Natural Water Pet Bottle 1 Ltr (Pack of 12)", href: "/shop/product/evian-water-pack-of-12/", price: 2400, badges: [badge("Pantry Perks")], listings: ["shop", "pantry-perks", "the-pantry", "everyday-staples"], filters: ["pantry-perks"], available: true },
  { id: "evian-750", slug: "evian-water-pack-of-9000ml", name: "Evian Natural Water Pet Bottle 750 ml (Pack of 12)", href: "/shop/product/evian-water-pack-of-9000ml/", price: 3070, unit: "9 ltr", badges: [badge("Pantry Perks")], listings: ["shop", "pantry-perks", "the-pantry", "everyday-staples"], filters: ["pantry-perks"], collections: ["bestsellers"], available: true },
  { id: "evian-330", slug: "evian-water-pack-of-7920ml", name: "Evian Natural Water Pet Bottle 330 ml (Pack of 24)", href: "/shop/product/evian-water-pack-of-7920ml/", price: 1720, badges: [badge("Pantry Perks")], listings: ["shop", "pantry-perks", "the-pantry", "everyday-staples"], filters: ["pantry-perks"], available: true },
  { id: "perrier-330", slug: "perrier-sparkling-330-pack-24", name: "Perrier Sparkling Water Glass Bottle 330 ml (Pack of 24)", href: "/shop/product/perrier-sparkling-330-pack-24/", price: 3750, compareAtPrice: 4680, unit: "7.9 ltr", badges: [badge("Pantry Perks")], listings: ["shop", "pantry-perks", "the-pantry"], filters: ["pantry-perks"], aliases: ["perrier-water-pack-of-24"], available: true },
  { id: "perrier-750", slug: "perrier-sparkling-750-pack-12", name: "Perrier Sparkling Water Glass Bottle 750 ml (Pack of 12)", href: "/shop/product/perrier-sparkling-750-pack-12/", price: 3500, compareAtPrice: 3900, unit: "9 ltr", badges: [badge("Pantry Perks")], listings: ["shop", "pantry-perks", "the-pantry"], filters: ["pantry-perks"], aliases: ["perrier-water-pack-of-12"], available: true },
  { id: "himalayan", slug: "himalayan-mineral-water-pack-of-12", name: "Himalayan Mineral Water Pet Bottle 1 Ltr (Pack of 12)", href: "/shop/product/himalayan-mineral-water-pack-of-12/", price: 850, badges: [badge("Pantry Perks")], listings: ["shop", "pantry-perks", "the-pantry"], filters: ["pantry-perks"], available: true },
  { id: "himalayan-500", slug: "himalayan-mineral-water-pack-of-30", name: "Himalayan Mineral Water Pet Bottle 500 ml (Pack of 30)", href: "/shop/product/himalayan-mineral-water-pack-of-30/", price: 1350, badges: [badge("Pantry Perks")], listings: ["shop", "pantry-perks", "the-pantry", "everyday-staples"], filters: ["pantry-perks"], available: true },
  { id: "aava-250", slug: "aava-still-water-glass-bottle-250-ml-pack-of-16", name: "Aava Still Water Glass Bottle 250 ml (Pack of 16)", href: "/shop/product/aava-still-water-glass-bottle-250-ml-pack-of-16/", price: 1350, badges: [badge("Pantry Perks")], listings: ["shop", "pantry-perks", "the-pantry"], filters: ["pantry-perks"], available: true },
  { id: "aava-750", slug: "aava-still-water-glass-bottle-750-ml-pack-of-9", name: "Aava Still Water Glass Bottle 750 ml (Pack of 9)", href: "/shop/product/aava-still-water-glass-bottle-750-ml-pack-of-9/", price: 2500, badges: [badge("Pantry Perks")], listings: ["shop", "pantry-perks", "the-pantry"], filters: ["pantry-perks"], available: true },
  { id: "chicken", slug: "chicken-breast", name: "Chicken Breast", href: "/shop/product/chicken-breast/", price: 240, unit: "400 gm", badges: [badge("Halal")], listings: ["shop", "eggs-seafood-meats", "your-meat-and-fish-essentials"], filters: ["meat"], collections: ["bestsellers"], available: true },
  { id: "ghee", slug: "tbof-a2-gir-cow-ghee", name: "Two Brothers Organic Farms A2 Cultured Gir Cow Ghee", href: "/shop/product/tbof-a2-gir-cow-ghee/", price: 15135, compareAtPrice: 16995, unit: "5 ltr", badges: [badge("Limited Stock"), badge("Bestseller")], listings: ["shop", "healthy-alternatives", "healthy-alternatives/organic", "the-pantry", "everyday-staples"], filters: ["organic"], collections: ["bestsellers"], available: true },
  { id: "thai-guac", slug: "thai-guacamole-300gm", name: "Thai Guacamole", href: "/shop/product/thai-guacamole-300gm/", price: 400, unit: "250 gm", badges: [badge("Chef's Special")], listings: ["shop", "dips-spreads-batters-ferments", "avocado-guacamole-essentials", "healthy-alternatives", "healthy-alternatives/vegan", "fruits-vegetables/fruits/avocado"], filters: ["vegan"], available: true },
  { id: "platter", slug: "mediterranean-sunset-platter", name: "Mediterranean Sunset Cheese Platter", href: "/shop/product/mediterranean-sunset-platter/", price: 3000, unit: "Serves 6", listings: ["shop", "cheese"], filters: ["cheese"], collections: ["gifting-edit-hosting"], available: true },
  { id: "cream-crust", slug: "the-cream-and-crust-grazer-cheese-platter", name: "The Cream and Crust Grazer Cheese Platter", href: "/shop/product/the-cream-and-crust-grazer-cheese-platter/", price: 3650, unit: "Serves 2", badges: [badge("Bestseller")], listings: ["shop", "cheese"], filters: ["cheese"], collections: ["bestsellers"], available: true },
  { id: "fondue", slug: "chocolate-fondue-kit", name: "Chocolate Fondue Kit", href: "/shop/product/chocolate-fondue-kit/", price: 1200, listings: ["shop", "chocolates-confectionery", ...giftTaxonomy(["hosting", "birthdays", "weddings"], ["chocolate-sweets"], 1200).listings], filters: ["chocolates-confectionery", ...giftTaxonomy(["hosting", "birthdays", "weddings"], ["chocolate-sweets"], 1200).filters], collections: ["gifting-edit-hosting"], available: true },
  { id: "lindt-lindor", slug: "lindt-lindor-60", name: "Lindt Lindor 60% Cocoa", href: "/shop/product/lindt-lindor-60/", price: 1249, unit: "200 gm", listings: ["shop", "chocolates-confectionery"], filters: ["chocolates-confectionery"], collections: ["gifting-edit-dry-fruits"], available: true },
  { id: "lindt-gold", slug: "lindt-gold-hazelnut", name: "Lindt Swiss Premium Gold Bar Milk With Hazelnut", href: "/shop/product/lindt-gold-hazelnut/", price: 1499, listings: ["shop", "chocolates-confectionery"], filters: ["chocolates-confectionery"], collections: ["gifting-edit-dry-fruits"], available: true },
  { id: "keto-bread", slug: "keto-seed-loaf", name: "Keto Seed Loaf", href: "/shop/product/keto-seed-loaf/", price: 425, listings: ["shop", "healthy-alternatives", "healthy-alternatives/keto", "healthy-alternatives/diet-swaps", "the-bakery"], filters: ["keto", "diet-swaps", "bakery"], available: true },
  { id: "collagen", slug: "collagen-peptides", name: "Collagen Peptides", href: "/shop/product/collagen-peptides/", price: 1890, listings: ["shop", "healthy-alternatives", "healthy-alternatives/bio-hacking"], filters: ["bio-hacking"], available: true },
  { id: "pudding-post", slug: "pudding-post", name: "Pudding Post", href: "/gifting/product/pudding-post/", price: 1195, ...giftTaxonomy(["festive", "birthdays"], ["snacking-hampers", "chocolate-sweets"], 1195), collections: ["gift-story", "festive-picks"], available: true },
  { id: "regional-road", slug: "the-regional-road-box", name: "The Regional Road Box", href: "/gifting/product/the-regional-road-box/", price: 1795, ...giftTaxonomy(["hosting", "housewarming", "weddings"], ["snacking-hampers"], 1795), collections: ["gift-story", "gifting-edit-hosting"], available: true },
  { id: "med-afternoon", slug: "the-mediterranean-afternoon", name: "The Mediterranean Afternoon", href: "/gifting/product/the-mediterranean-afternoon/", price: 1795, ...giftTaxonomy(["hosting", "congratulations"], ["cheese-grazing-boxes", "fruits-baskets"], 1795), collections: ["gift-story"], available: true },
  { id: "wellbeing", slug: "the-wellbeing-chapters", name: "The Wellbeing Chapters - Box of 3", href: "/gifting/product/the-wellbeing-chapters/", price: 1200, ...giftTaxonomy(["corporate"], ["tea-coffee-hampers"], 1200), collections: ["gift-story"], available: true },
  { id: "dried-tray", slug: "dried-fruits-delights-tray", name: "Dried Fruits Delights Gift Tray", href: "/gifting/product/dried-fruits-delights-tray/", price: 2750, ...giftTaxonomy(["festive", "housewarming"], ["dry-fruit-trays", "fruits-baskets"], 2750), collections: ["gift-story", "festive-picks", "gifting-edit-dry-fruits"], available: true },
  { id: "nut-trio", slug: "the-everyday-nut-trio-box", name: "The Everyday Nut Trio Box", href: "/gifting/product/the-everyday-nut-trio-box/", price: 2100, ...giftTaxonomy(["corporate", "congratulations"], ["dry-fruit-trays"], 2100), collections: ["gift-story", "festive-picks", "gifting-edit-dry-fruits"], available: true },
  { id: "verses-tea", slug: "diwali-verses-of-tea-and-light-hamper", name: "Verses of Tea and Light Hamper", href: "/gifting/product/diwali-verses-of-tea-and-light-hamper/", price: 5350, ...giftTaxonomy(["festive", "corporate"], ["tea-coffee-hampers"], 5350), collections: ["festive-picks"], available: true },
  { id: "ode-longevity", slug: "the-ode-to-longevity-wellness-diwali-hamper", name: "The Ode to Longevity Wellness Hamper", href: "/gifting/product/the-ode-to-longevity-wellness-diwali-hamper/", price: 11000, ...giftTaxonomy(["festive", "corporate"], ["tea-coffee-hampers"], 11000), collections: ["festive-picks"], available: true },
  { id: "letters-thailand", slug: "letters-from-thailand-fruit-hamper", name: "Letters From Thailand Fruit Hamper", href: "/gifting/product/letters-from-thailand-fruit-hamper/", price: 5500, ...giftTaxonomy(["festive", "hosting", "housewarming"], ["fruits-baskets"], 5500), collections: ["festive-picks"], available: true },
  { id: "epicurean", slug: "epicurean-bounty", name: "Epicurean Bounty", href: "/gifting/product/epicurean-bounty/", price: 9500, ...giftTaxonomy(["festive", "hosting", "weddings", "corporate"], ["fruits-baskets", "snacking-hampers"], 9500), collections: ["festive-picks"], available: true },
  { id: "regal-tray", slug: "regal-dry-fruit-tray", name: "Regal Dry Fruit Tray", href: "/gifting/product/regal-dry-fruit-tray/", price: 2400, ...giftTaxonomy(["festive", "housewarming", "weddings"], ["dry-fruit-trays"], 2400), collections: ["festive-picks"], available: true },
  { id: "zen-matcha", slug: "the-zen-of-matcha", name: "The Zen of Matcha Hamper", href: "/gifting/product/the-zen-of-matcha/", price: 3000, ...giftTaxonomy(["corporate", "congratulations", "festive"], ["tea-coffee-hampers"], 3000), collections: ["festive-picks"], available: true },
  { id: "nuts-berries", slug: "nuts-and-berries-box", name: "Nuts and Berries Dry Fruit Box", href: "/gifting/product/nuts-and-berries-box/", price: 2000, ...giftTaxonomy(["festive", "corporate", "birthdays"], ["dry-fruit-trays", "snacking-hampers"], 2000), collections: ["festive-picks"], available: true },
];

export function formatPrice(value: number): string {
  return `₹${value}`;
}

export function productSlugFromHref(href: string): string {
  return href.replace(/\/+$/, "").split("/").filter(Boolean).at(-1) ?? href;
}

export function getProductBySlug(slug: string): Product | undefined {
  const key = slug.replace(/\/+$/, "");
  return products.find((item) => item.slug === key || item.aliases?.includes(key));
}

export function getProductByHref(href: string): Product | undefined {
  const target = href.replace(/\/+$/, "") || "/";
  const slug = productSlugFromHref(href);
  return products.find((item) => item.href.replace(/\/+$/, "") === target) ?? getProductBySlug(slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs.flatMap((slug) => {
    const product = getProductBySlug(slug);
    return product ? [product] : [];
  });
}

export function isGiftProduct(product: Product): boolean {
  return product.listings.some((listing) => listing === "all-gifts" || listing.startsWith("all-gifts/"));
}

export function isShopProduct(product: Product): boolean {
  return product.listings.includes("shop");
}

export function getProductsByCollection(id: string): Product[] {
  return products.filter((product) => product.collections?.includes(id));
}
