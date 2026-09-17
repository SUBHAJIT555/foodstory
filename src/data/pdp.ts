import { galleryFor, mediaFor } from "@/data/media";
import { getProductBySlug, isShopProduct, products, type Product } from "@/data/products";

export type PdpFaq = {
  question: string;
  answer: string;
};

export type PdpRecipe = {
  title: string;
  href: string;
  cuisine: string;
  level: string;
  byline: string;
  cookTime: string;
};

export type PdpReason = {
  label: string;
};

export type PdpDetail = {
  slug: string;
  description: string;
  howToEnjoy?: string;
  weLoveThisIn?: string;
  ingredients?: string;
  idealFor?: string[];
  info: Array<{ label: string; value: string }>;
  faqs?: PdpFaq[];
  recipes?: PdpRecipe[];
  reasons?: PdpReason[];
  vegetarian?: boolean;
  imageCount?: number;
};

export type ProductPage = Product & PdpDetail;

const recipes: PdpRecipe[] = [
  { title: "Spicy Korean Tofu Steaks", href: "/recipes/spicy-korean-tofu-steaks/", cuisine: "Asian", level: "Easy", byline: "By Team Foodstory", cookTime: "25 minutes" },
  { title: "Nori Kimchi Quesadillas", href: "/recipes/nori-kimchi-quesadillas/", cuisine: "Asian", level: "Easy", byline: "By Team Foodstory", cookTime: "20 minutes" },
  { title: "Mango Sticky Rice Pudding", href: "/recipes/mango-sticky-rice-pudding/", cuisine: "Asian", level: "Easy", byline: "By Team Foodstory", cookTime: "30 minutes" },
  { title: "Mango Avocado Salad", href: "/recipes/mango-avocado-salad/", cuisine: "American", level: "Easy", byline: "By Team Foodstory", cookTime: "20 minutes" },
  { title: "Tahini Ramen Bowl", href: "/recipes/tahini-ramen-bowl/", cuisine: "Asian", level: "Intermediate", byline: "By Team Foodstory", cookTime: "20 minutes" },
  { title: "Kimchi Grilled Cheese", href: "/recipes/kimchi-grilled-cheese/", cuisine: "American", level: "Easy", byline: "By Team Foodstory", cookTime: "15 minutes" },
];

const avocadoReasons: PdpReason[] = [
  { label: "Gut Health" },
  { label: "Immunity Booster" },
  { label: "Brain Fuel" },
  { label: "Anti-Inflammatory" },
  { label: "Rich in Antioxidants" },
  { label: "Rich in Minerals" },
];

const details: Record<string, PdpDetail> = {
  "hass-avocado-ripe": {
    slug: "hass-avocado-ripe",
    description:
      "Picked at optimal maturity, these avocados offer a rich, buttery bite with every scoop, naturally packed with nutrients and freshness. Sourced exclusively from Peru, these prized fruits bring a perfect harmony of natural flavour and nourishing goodness.",
    howToEnjoy: "Scoop half of Hass Avocado (Ripe) onto toast or salads for a creamy, heart-healthy twist.",
    weLoveThisIn: "Avocado Fried Egg, Avocado Toast, Avocado Buddha Bowl",
    idealFor: ["Keto"],
    info: [
      { label: "Brand", value: "Foodstory" },
      { label: "Shelf Life", value: "3 Days" },
    ],
    vegetarian: true,
    imageCount: 5,
    reasons: avocadoReasons,
    faqs: [
      { question: "What does \"Hass Ripe Avocado\" mean?", answer: "Hass Ripe Avocado means the fruit is already soft, creamy, and ready to eat when delivered and no waiting for ripening." },
      { question: "How should I store ripe avocados?", answer: "Once ripe, store avocados in the refrigerator to slow further softening and maintain their flavor for an extra one to two days." },
      { question: "How do I keep a cut avocado green?", answer: "Leave the pit in the unused half, brush the cut face with lemon, and wrap tightly before refrigerating." },
      { question: "Why is the texture creamy?", answer: "Hass avocados picked at optimal maturity develop a buttery, scoopable texture when ripe." },
      { question: "Can I use ripe Hass Avocados for smoothies?", answer: "Yes. Ripe Hass avocados blend smoothly and are marked Perfect for Smoothie on this SKU." },
      { question: "Can ripe avocado be frozen?", answer: "Mashed ripe avocado can be frozen; whole halves change texture after thawing." },
      { question: "What if ripe avocado feels too soft?", answer: "Use very soft fruit immediately in smoothies or dressings if the flesh is still green and smells clean." },
      { question: "Is avocado good for heart health?", answer: "Hass avocados are naturally rich in fats used in heart-healthy recipes such as toast and salads." },
      { question: "What if avocado is spoiled inside?", answer: "Discard fruit that is grey-brown throughout or has a sour smell." },
    ],
    recipes,
  },
  "hass-avocado": {
    slug: "hass-avocado",
    description:
      "Hass avocados from Peru with a rich, buttery bite. Enjoy as a single fruit or a pack of two when you need more for the table.",
    howToEnjoy: "Scoop half of Hass Avocado onto toast or salads for a creamy, heart-healthy twist.",
    weLoveThisIn: "Avocado Sushi, Avocado Devilled Eggs, Avocado Brownies",
    idealFor: ["Keto"],
    info: [
      { label: "Brand", value: "Foodstory" },
      { label: "Shelf Life", value: "5 Days" },
    ],
    vegetarian: true,
    imageCount: 4,
    reasons: avocadoReasons,
    faqs: [
      { question: "How should I store ripe Hass Avocados?", answer: "Refrigerate once ripe and use within a few days." },
      { question: "Can I freeze Hass Avocados?", answer: "Mash and freeze; whole fruit is better used fresh." },
      { question: "Why is my Hass Avocado turning brown after cutting?", answer: "Oxidation. Cover the cut face and add citrus to slow browning." },
      { question: "What are the health benefits of Hass Avocados?", answer: "They are used across Foodstory recipes for a creamy, nourishing fat." },
      { question: "How are Hass Avocados different from Indian varieties?", answer: "Hass is known for a thicker skin and a richer, nuttier flesh when ripe." },
      { question: "What are the best ways to use Hass Avocados in recipes?", answer: "Toast, sushi, bowls, and desserts such as avocado brownies." },
      { question: "Where does Foodstory source its Hass Avocados from?", answer: "This SKU is sourced from Peru." },
      { question: "How does Foodstory ensure the freshness of its avocados?", answer: "Fruit is selected for the listed shelf life and ripeness of the SKU." },
    ],
    recipes,
  },
  "tbof-a2-gir-cow-ghee": {
    slug: "tbof-a2-gir-cow-ghee",
    description:
      "Take your culinary adventures to the next level with this 5-litre pack of Gir Cow Ghee, ideal for festive preparations and large families. Made traditionally with grass-fed Gir cow milk, this ghee offers unmatched quality, nutrition, and aroma. Enjoy a special price while unlocking endless creative possibilities in your kitchen and beyond.",
    howToEnjoy: "Use in festive sweets, everyday meals, or as a nourishing addition to your skincare routine.",
    weLoveThisIn:
      "Besan Laddoos! Roast besan in ghee until fragrant, mix with powdered sugar, and shape into laddoos for a rich, festive treat that melts in your mouth.",
    ingredients: "A2 Gir Cow Milk, Gir Cow Milk Curd Starter",
    info: [
      { label: "Brand", value: "Two Brothers" },
      { label: "Shelf Life", value: "365 Days" },
      { label: "Country of Origin", value: "India" },
    ],
    vegetarian: true,
    imageCount: 3,
    recipes,
  },
  "salt-bread": {
    slug: "salt-bread",
    description: "Salt Bread (Pack of 2), a bakery staple from the Foodstory kitchen.",
    howToEnjoy: "Warm and tear, or toast and serve with cultured butter.",
    info: [
      { label: "Brand", value: "Foodstory" },
      { label: "Shelf Life", value: "2 Days" },
    ],
    vegetarian: true,
    imageCount: 3,
    recipes,
  },
  blueberries: {
    slug: "blueberries",
    description: "Peruvian blueberries with a plump, sweet bite. A bestseller for snacking and desserts.",
    howToEnjoy: "Eat from the punnet, fold into yoghurt, or scatter over dessert.",
    weLoveThisIn: "Blueberry pancakes, yoghurt bowls, tarts",
    info: [
      { label: "Brand", value: "Foodstory" },
      { label: "Shelf Life", value: "5 Days" },
    ],
    vegetarian: true,
    imageCount: 3,
    recipes,
  },
};

function fallbackDetail(product: Product): PdpDetail {
  return {
    slug: product.slug,
    description: `${product.name} from Foodstory.`,
    info: [{ label: "Brand", value: "Foodstory" }],
    vegetarian: !product.filters.includes("meat"),
    imageCount: 3,
    recipes,
  };
}

export function getProductPage(slug: string): ProductPage | undefined {
  const product = getProductBySlug(slug);
  if (!product || !isShopProduct(product)) return undefined;
  const extra = details[product.slug] ?? fallbackDetail(product);
  return { ...product, ...extra };
}

export function allProductSlugs(): string[] {
  return products.filter(isShopProduct).map((item) => item.slug);
}

export type GalleryImage = {
  alt: string;
  src?: string;
  tone?: "cream" | "charcoal" | "fig";
};

export function galleryImages(name: string, slug?: string): GalleryImage[] {
  const sources = slug ? galleryFor(slug, name) : [];
  const fallback = mediaFor(slug, name);
  const list = sources.length ? sources : fallback ? [fallback] : [];
  return list.map((src, index) => ({
    alt: index === 0 ? name : `${name}, view ${index + 1}`,
    src,
  }));
}

export function discountPercent(price: number, compareAt?: number): number | undefined {
  if (!compareAt || compareAt <= price) return undefined;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
