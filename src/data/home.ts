import { formatPrice, getProductsBySlugs, type Product } from "@/data/products";

export type HomeHeroSlide = {
  id: string;
  href: string;
  src: string;
  mobileSrc?: string;
};

export type HomeCategory = {
  label: string;
  href: string;
};

export type HomeProduct = {
  name: string;
  href: string;
  price: string;
  unit?: string;
  badges?: string[];
};

export type HomeRail = {
  title: string;
  exploreHref: string;
  products: HomeProduct[];
};

export type HomeStore = {
  name: string;
  address: string;
  mapHref: string;
};

export type HomeModeTile = {
  label: string;
  href: string;
};

export type HomeGift = {
  name: string;
  href: string;
};

export { homeHeroMedia as homeHeroSlides } from "@/data/media";

function toHomeProduct(product: Product): HomeProduct {
  return {
    name: product.name,
    href: product.href,
    price: formatPrice(product.price),
    unit: product.unit,
    badges: product.badges?.map((item) => item.label),
  };
}

export const homeCategories: HomeCategory[] = [
  { label: "Fresh Produce", href: "/shop/fruits-vegetables/" },
  { label: "Bakery", href: "/shop/the-bakery/" },
  { label: "Cheese", href: "/shop/cheese/" },
  { label: "Pantry Perks", href: "/shop/pantry-perks/" },
  { label: "Meat Market", href: "/shop/eggs-seafood-meats/" },
  { label: "Pantry", href: "/shop/the-pantry/" },
  { label: "Fresh Meals", href: "/shop/meals-on-the-go/" },
  { label: "Dips and Spreads", href: "/shop/dips-spreads-batters-ferments/" },
  { label: "Everyday Staples", href: "/shop/everyday-staples/" },
  { label: "Tea & Beverages", href: "/shop/tea-coffee-beverages/" },
  { label: "Dried Fruits & Nuts", href: "/shop/dried-fruit-nuts-seeds/" },
  { label: "Dairy", href: "/shop/milk-butter-yoghurt/" },
];

export const homeRails: HomeRail[] = [
  {
    title: "Fresh Produce",
    exploreHref: "/category/fruits-vegetables/",
    products: getProductsBySlugs([
      "thai-tender-coconut",
      "raspberries",
      "hass-avocado-ripe",
      "edamame-beans",
      "blueberries",
      "cherry-from-usa",
      "hass-avocado",
      "strawberries",
    ]).map(toHomeProduct),
  },
  {
    title: "Fresh From The Bakery",
    exploreHref: "/category/baked-today/",
    products: getProductsBySlugs([
      "emmer-wheat-sourdough550gm-1",
      "sourdough-baguette",
      "dark-rye-sourdough-1",
      "gluten-free-quinoa",
      "cracker-pizza-base",
      "sourdough-pizza-base",
      "country-sourdough-1",
      "olive-cheddar-sourdough-1",
    ]).map(toHomeProduct),
  },
  {
    title: "Bestsellers",
    exploreHref: "/category/bestseller-delhi/",
    products: getProductsBySlugs([
      "hass-avocado-ripe",
      "croissant-tissue-bread",
      "137-degrees-almond-drink-unsweetened",
      "evian-water-pack-of-9000ml",
      "thai-tender-coconut-pack-of-4",
      "emmer-wheat-sourdough550gm-1",
      "thai-tender-coconut",
      "chicken-breast",
    ]).map(toHomeProduct),
  },
  {
    title: "Pantry Perks",
    exploreHref: "/category/pantry-perks/",
    products: getProductsBySlugs([
      "evian-water-pack-of-12",
      "evian-water-pack-of-7920ml",
      "himalayan-mineral-water-pack-of-12",
      "himalayan-mineral-water-pack-of-30",
      "perrier-sparkling-330-pack-24",
      "perrier-sparkling-750-pack-12",
      "aava-still-water-glass-bottle-250-ml-pack-of-16",
      "aava-still-water-glass-bottle-750-ml-pack-of-9",
    ]).map(toHomeProduct),
  },
];

export const homeStores: HomeStore[] = [
  {
    name: "Bandra, Mumbai",
    address: "Ground Floor, Globus Building, Hill Road, Bandra West, Mumbai",
    mapHref: "https://maps.app.goo.gl/pQrmT3Rz3X9ehtqR6",
  },
  {
    name: "Lokhandwala, Mumbai",
    address: "Bharat AltaVista, 10A, Lokhandwala Circle, Lokhandwala Complex, Andheri West, Mumbai - 400053",
    mapHref: "https://maps.app.goo.gl/t4qbvZMAHRVoa4Ax6",
  },
  {
    name: "Lavelle Road, Bengaluru",
    address: "Ground Floor, Prestige Sterling Square, Lavelle Road",
    mapHref: "https://maps.app.goo.gl/quGgsrxY7sUkPnUS8",
  },
  {
    name: "Ambience Mall, Vasant Kunj, New Delhi",
    address: "Lower Ground Floor, Ambience Mall, Vasant Kunj, Delhi - 110070",
    mapHref: "https://maps.app.goo.gl/FgBhq7fvo6QBYXNi9",
  },
  {
    name: "Banjara Hills, Hyderabad",
    address: "Ground Floor, Vamsiram, BSR One, Banjara Hills, Hyderabad - 500034",
    mapHref: "https://maps.app.goo.gl/j5yjtUQ3ZEQc8yqr5",
  },
];

export const homeModeColumns: HomeModeTile[][] = [
  [
    { label: "Gluten Free", href: "/shop/healthy-alternatives/gluten-free-range/" },
    { label: "Vegan", href: "/shop/healthy-alternatives/vegan/" },
  ],
  [{ label: "Gifting", href: "/gifting/" }],
  [
    { label: "Party Pantry Picks", href: "/shop/pantry-perks/" },
    { label: "Barbeque Essentials", href: "/category/your-meat-and-fish-essentials/" },
  ],
];

export const homeBrandTitles = [
  "Storytellers Come Together",
  "Curated by the Curious",
  "Devoted to the Details",
  "Guardians of Great Taste",
  "The Complete Basket",
];

export const homeGifts: HomeGift[] = getProductsBySlugs([
  "diwali-verses-of-tea-and-light-hamper",
  "the-ode-to-longevity-wellness-diwali-hamper",
  "letters-from-thailand-fruit-hamper",
  "the-everyday-nut-trio-box",
  "epicurean-bounty",
  "regal-dry-fruit-tray",
  "the-zen-of-matcha",
  "dried-fruits-delights-tray",
  "nuts-and-berries-box",
]).map((product) => ({ name: product.name, href: product.href }));

export const homeSeo = {
  title: "Foodstory - Finest Gourmet Grocery Store",
  paragraphs: [
    "Welcome to Foodstory, a premier gourmet grocery store where every meal gets the ingredients it deserves. We bring together farm-fresh fruits and vegetables, artisan bakery, premium cheese, healthy alternatives, and specialty products from around the world, curated carefully so you don't have to look far.",
    "We take gifting seriously too. Our gourmet gift hampers are built to impress, whether it's a festive celebration, a corporate gesture, or something personal. There's something here for every occasion.",
    "Why Foodstory?",
    "A hand-picked selection of fresh and premium ingredients. Delivered across Delhi, Hyderabad, Bengaluru, and Mumbai. Gift hampers tailored to every occasion.",
    "Explore our range of organic and hydroponic produce, global pantry staples, and specialty ingredients, available in-store and online.",
    "Every flavor has a story. Come find yours.",
    "Find us online at foodstory or at our stores near you.",
  ],
};
