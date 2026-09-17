export type RecipeCategory = {
  id: string;
  label: string;
  value: string;
};

export type RecipeCardItem = {
  slug: string;
  title: string;
  href: string;
  cookTime: string;
  cuisine?: string;
  level?: string;
  byline?: string;
  category?: string;
};

export type IngredientLine = {
  label: string;
  disabled?: boolean;
};

export type IngredientGroup = {
  heading: string;
  items: IngredientLine[];
};

export type InstructionGroup = {
  heading: string;
  steps: string[];
};

export type Recipe = RecipeCardItem & {
  pageTitle: string;
  difficulty?: string;
  serves?: string;
  ingredients?: IngredientGroup[];
  instructions?: InstructionGroup[];
  shopEnabled?: boolean;
};

export const recipeCategories: RecipeCategory[] = [
  { id: "brunch", label: "Brunch", value: "brunch" },
  { id: "lunch-ideas", label: "Lunch Ideas", value: "lunch-ideas" },
  { id: "easy-dinners", label: "Easy Dinners", value: "easy-dinners" },
  { id: "quick-bites", label: "Quick Bites", value: "quick-bites" },
  { id: "dessert", label: "Dessert", value: "american" },
];

export const recipeCards: RecipeCardItem[] = [
  { slug: "cinnamon-sugar-bread-twists", title: "Cinnamon Sugar Bread Twists", href: "/recipes/cinnamon-sugar-bread-twists/", cookTime: "25 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "dessert" },
  { slug: "snickerdoodle-cookies", title: "Snickerdoodle Cookies", href: "/recipes/snickerdoodle-cookies/", cookTime: "40 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "dessert" },
  { slug: "arugula-strawberry-salad-with-burrata", title: "Arugula & Strawberry Salad With Burrata", href: "/recipes/arugula-strawberry-salad-with-burrata/", cookTime: "25 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "lunch-ideas" },
  { slug: "nutella-stuffed-french-toast", title: "Nutella Stuffed French Toast", href: "/recipes/nutella-stuffed-french-toast/", cookTime: "25 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "brunch" },
  { slug: "chai-spiced-hot-chocolate", title: "Chai Spiced Hot Chocolate", href: "/recipes/chai-spiced-hot-chocolate/", cookTime: "25 minutes", cuisine: "Indian", level: "Easy", byline: "By Team Foodstory", category: "dessert" },
  { slug: "kimchi-grilled-cheese", title: "Kimchi Grilled Cheese", href: "/recipes/kimchi-grilled-cheese/", cookTime: "25 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "quick-bites" },
  { slug: "parmesan-brussel-sprouts", title: "Parmesan Brussel Sprouts", href: "/recipes/parmesan-brussel-sprouts/", cookTime: "20 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "easy-dinners" },
  { slug: "keto-deviled-parmesan-crisps", title: "Keto Deviled Parmesan Crisps", href: "/recipes/keto-deviled-parmesan-crisps/", cookTime: "20 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "quick-bites" },
  { slug: "dan-dan-noodles", title: "Dan Dan Noodles", href: "/recipes/dan-dan-noodles/", cookTime: "20 minutes", cuisine: "Asian", level: "Easy", byline: "By Team Foodstory", category: "easy-dinners" },
  { slug: "poached-pears-with-red-wine-vinaigrette", title: "Poached Pears With Red Wine Vinaigrette", href: "/recipes/poached-pears-with-red-wine-vinaigrette/", cookTime: "1 hour", cuisine: "American", level: "Intermediate", byline: "By Team Foodstory", category: "dessert" },
  { slug: "banoffee-baked-oats", title: "Banoffee Baked Oats", href: "/recipes/banoffee-baked-oats/", cookTime: "30 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "brunch" },
  { slug: "medjool-date-snicker-bars", title: "Medjool Date Snicker Bars", href: "/recipes/medjool-date-snicker-bars/", cookTime: "2 hours", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "dessert" },
  { slug: "dahi-kebab-frankie", title: "Dahi Kebab Frankie", href: "/recipes/dahi-kebab-frankie/", cookTime: "50 minutes", cuisine: "Indian", level: "Intermediate", byline: "By Team Foodstory", category: "lunch-ideas" },
  { slug: "frozen-yoghurt-barks", title: "Frozen Yoghurt Barks", href: "/recipes/frozen-yoghurt-barks/", cookTime: "3 hours", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "dessert" },
  { slug: "spicy-korean-tofu-steaks", title: "Spicy Korean Tofu Steaks", href: "/recipes/spicy-korean-tofu-steaks/", cookTime: "25 minutes", cuisine: "Asian", level: "Easy", byline: "By Team Foodstory", category: "easy-dinners" },
  { slug: "saffron-pilaf", title: "Saffron Pilaf", href: "/recipes/saffron-pilaf/", cookTime: "30 minutes", cuisine: "Indian", level: "Easy", byline: "By Team Foodstory", category: "easy-dinners" },
  { slug: "ghevar-with-pistachio-cream", title: "Ghevar with Pistachio Cream", href: "/recipes/ghevar-with-pistachio-cream/", cookTime: "25 minutes", cuisine: "Indian", level: "Intermediate", byline: "By Team Foodstory", category: "dessert" },
  { slug: "almond-thumbprint-cookies", title: "Almond Thumbprint Cookies", href: "/recipes/almond-thumbprint-cookies/", cookTime: "30 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "dessert" },
  { slug: "ashwagandha-berry-sorbet", title: "Ashwagandha Berry Sorbet", href: "/recipes/ashwagandha-berry-sorbet/", cookTime: "15 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "dessert" },
  { slug: "ashwagandha-pumpkin-soup", title: "Ashwagandha Pumpkin Soup", href: "/recipes/ashwagandha-pumpkin-soup/", cookTime: "30 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "easy-dinners" },
  { slug: "black-garlic-linguini", title: "Black Garlic Linguini", href: "/recipes/black-garlic-linguini/", cookTime: "40 minutes", cuisine: "Italian", level: "Intermediate", byline: "By Team Foodstory", category: "easy-dinners" },
  { slug: "copycat-shake-shack-shroom-burger", title: "Copycat Shake Shack ‘Shroom Burger", href: "/recipes/copycat-shake-shack-shroom-burger/", cookTime: "50 minutes", cuisine: "American", level: "Intermediate", byline: "By Team Foodstory", category: "lunch-ideas" },
  { slug: "filo-wrapped-feta-pockets-with-harissa-honey", title: "Filo Wrapped Feta Pockets with Harissa Honey", href: "/recipes/filo-wrapped-feta-pockets-with-harissa-honey/", cookTime: "15 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "quick-bites" },
  { slug: "honey-mustard-glazed-roasted-carrots", title: "Honey Mustard Glazed Roasted Carrots", href: "/recipes/honey-mustard-glazed-roasted-carrots/", cookTime: "15 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "easy-dinners" },
  { slug: "french-omelette", title: "French Omelette", href: "/recipes/french-omelette/", cookTime: "15 minutes", cuisine: "French", level: "Easy", byline: "By Team Foodstory", category: "brunch" },
  { slug: "kimchijeon", title: "Kimchijeon (Kimchi Pancakes)", href: "/recipes/kimchijeon/", cookTime: "20 minutes", cuisine: "Asian", level: "Easy", byline: "By Team Foodstory", category: "quick-bites" },
  { slug: "mango-avocado-salad", title: "Mango Avocado Salad", href: "/recipes/mango-avocado-salad/", cookTime: "20 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "lunch-ideas" },
  { slug: "eggs-kejriwal", title: "Eggs Kejriwal", href: "/recipes/eggs-kejriwal/", cookTime: "20 minutes", cuisine: "Indian", level: "Easy", byline: "By Team Foodstory", category: "brunch" },
  { slug: "gochujang-tahini-noodles", title: "Gochujang Tahini Noodles", href: "/recipes/gochujang-tahini-noodles/", cookTime: "25 minutes", cuisine: "Asian", level: "Easy", byline: "By Team Foodstory", category: "easy-dinners" },
  { slug: "tahini-ramen-bowl", title: "Tahini Ramen Bowl", href: "/recipes/tahini-ramen-bowl/", cookTime: "20 minutes", cuisine: "Asian", level: "Intermediate", byline: "By Team Foodstory", category: "easy-dinners" },
  { slug: "whipped-avocado-toast", title: "Whipped Avocado Toast", href: "/recipes/whipped-avocado-toast/", cookTime: "30 minutes", cuisine: "American", level: "Easy", byline: "By Team Foodstory", category: "brunch" },
];

export const kitchenRail = recipeCards.filter((recipe) =>
  [
    "french-omelette",
    "kimchijeon",
    "nutella-stuffed-french-toast",
    "banoffee-baked-oats",
    "mango-avocado-salad",
    "eggs-kejriwal",
    "filo-wrapped-feta-pockets-with-harissa-honey",
    "honey-mustard-glazed-roasted-carrots",
  ].includes(recipe.slug),
);

export const seasonRail = recipeCards.filter((recipe) =>
  ["gochujang-tahini-noodles", "kimchijeon", "ashwagandha-pumpkin-soup", "eggs-kejriwal", "spicy-korean-tofu-steaks", "chai-spiced-hot-chocolate"].includes(recipe.slug),
);

export const autumnRail = recipeCards.filter((recipe) =>
  ["honey-mustard-glazed-roasted-carrots", "ashwagandha-pumpkin-soup", "mango-avocado-salad"].includes(recipe.slug),
);

const whippedAvocado: Recipe = {
  ...recipeCards.find((recipe) => recipe.slug === "whipped-avocado-toast")!,
  pageTitle: "Whipped Avocado Toast Recipe | Foodstory",
  difficulty: "Easy",
  serves: "2",
  shopEnabled: false,
  instructions: [
    {
      heading: "FOR CANDIED NUTS:",
      steps: [
        "In a saucepan, dry roast mixed nuts for 1 minute.",
        "Add brown sugar, cinnamon, sea salt, and honey.",
        "Toss for 1 minute until sugar is dissolved, coating the nuts evenly.",
      ],
    },
    {
      heading: "FOR SOURDOUGH TOAST:",
      steps: ["Heat a nonstick pan and place the sourdough slices on it.", "Drizzle olive oil and toast until golden and crisp. Set aside."],
    },
    {
      heading: "FOR WHIPPED AVOCADO:",
      steps: [
        "In a blender jar, combine ripe avocado, cream cheese, salt, and a dash of lemon juice.",
        "Slowly add olive oil to the blender on high speed until the mixture is smooth and creamy.",
      ],
    },
    {
      heading: "ASSEMBLING THE WHIPPED AVOCADO TOAST:",
      steps: [
        "Spread the whipped avocado mixture on toasted sourdough slices.",
        "Top each slice with sliced cherry tomatoes and scatter candied nuts generously.",
        "Drizzle with balsamic glaze and serve.",
      ],
    },
  ],
  ingredients: [
    {
      heading: "FOR CANDIED NUTS:",
      items: [
        { label: "1 teaspoon Brown Sugar" },
        { label: "1 teaspoon Ground Cinnamon" },
        { label: "1/2 teaspoon Sea Salt" },
        { label: "1 cup Mixed Nuts (Pecans, Walnuts, Almonds)" },
        { label: "2 teaspoon Honey" },
      ],
    },
    {
      heading: "FOR SOURDOUGH TOAST:",
      items: [{ label: "1 Sourdough Bread Loaf, cut into 4 slices" }, { label: "Olive Oil, to drizzle" }, { label: "4 Cherry Tomatoes, sliced" }],
    },
    {
      heading: "FOR WHIPPED AVOCADO:",
      items: [
        { label: "1 Ripe Avocado" },
        { label: "Salt, to taste" },
        { label: "A dash of Lemon Juice" },
        { label: "¼ cup Extra-Virgin Olive Oil" },
        { label: "1½ cups Cream Cheese", disabled: true },
      ],
    },
    {
      heading: "FOR TOPPING:",
      items: [{ label: "Balsamic Glaze, for drizzling" }],
    },
  ],
};

const recipesBySlug: Record<string, Recipe> = Object.fromEntries(
  recipeCards.map((card) => [
    card.slug,
    card.slug === "whipped-avocado-toast"
      ? whippedAvocado
      : {
          ...card,
          pageTitle: `${card.title} Recipe | Foodstory`,
          difficulty: card.level,
        },
  ]),
);

export function getRecipe(slug: string): Recipe | undefined {
  return recipesBySlug[slug];
}

export function allRecipeSlugs(): string[] {
  return recipeCards.map((recipe) => recipe.slug);
}

export function filterRecipes(categoryIds: string[]): RecipeCardItem[] {
  if (!categoryIds.length) return recipeCards;
  return recipeCards.filter((recipe) => recipe.category && categoryIds.includes(recipe.category));
}
