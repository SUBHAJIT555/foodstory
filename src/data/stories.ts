export type StoryType = "article" | "hierarchical" | "listicle";

export type StoryCardItem = {
  slug: string;
  type: StoryType;
  title: string;
  href: string;
  excerpt?: string;
  byline: string;
  readTime: string;
  section?: "shelves" | "table" | "people" | "featured";
};

export type StoryBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "question"; text: string };

export type Story = StoryCardItem & {
  pageTitle: string;
  deck: string;
  blocks: StoryBlock[];
  related?: StoryCardItem[];
};

export const storyCards: StoryCardItem[] = [
  {
    slug: "manuka-honey-guide",
    type: "article",
    title: "The Manuka Miracle",
    href: "/stories/article/manuka-honey-guide/",
    excerpt: "A golden elixir from the Southern Hemisphere with extraordinary healing power",
    byline: "By Team Foodstory",
    readTime: "5-Minute Read",
    section: "featured",
  },
  {
    slug: "when-ice-cream-is-good-for-you-the-get-a-way-story",
    type: "article",
    title: "When Ice Cream Is Good For You: The Get-A-Whey Story",
    href: "/stories/article/when-ice-cream-is-good-for-you-the-get-a-way-story/",
    excerpt: "Meet the founding family behind the dessert brand that is embracing the power of protein",
    byline: "By Team Foodstory",
    readTime: "4-Minute Read",
    section: "people",
  },
  {
    slug: "everything-you-want-to-know-about-truffle",
    type: "article",
    title: "Truffle 101",
    href: "/stories/article/everything-you-want-to-know-about-truffle/",
    excerpt: "Everything you wanted to know about the fanciest fungi in the world",
    byline: "By Team Foodstory",
    readTime: "5-Minute Read",
    section: "shelves",
  },
  {
    slug: "help-my-dinner-guests-are-vegan",
    type: "listicle",
    title: "Help! My Dinner Guests Are Vegan!",
    href: "/stories/listicle/help-my-dinner-guests-are-vegan/",
    excerpt: "Romaine Calm! Here’s a guide to hosting the ultimate vegan dinner party by planet-based chef Raveena Taurani",
    byline: "By Team Foodstory",
    readTime: "5-Minute Read",
    section: "table",
  },
  {
    slug: "peel-slice-and-try",
    type: "article",
    title: "Avocado: A ‘Toast’ To Everyone’s Favourite Green Fruit!",
    href: "/stories/article/peel-slice-and-try/",
    byline: "By Team Foodstory",
    readTime: "5-Minute Read",
    section: "shelves",
  },
  {
    slug: "what-came-first-chicken-or-keggs",
    type: "article",
    title: "5 Ways To Use Avocado Way Beyond The Toast",
    href: "/stories/article/what-came-first-chicken-or-keggs/",
    byline: "By Team Foodstory",
    readTime: "5-Minute Read",
    section: "shelves",
  },
  {
    slug: "four-telltale-signs-of-good-quality-chocolate",
    type: "article",
    title: "White Strawberry, Berry Beyond Ordinary",
    href: "/stories/article/four-telltale-signs-of-good-quality-chocolate/",
    byline: "By Team Foodstory",
    readTime: "3–Minute Read",
    section: "shelves",
  },
  {
    slug: "koji-koo-up-close-and-funky-with-brown-koji-boy",
    type: "article",
    title: "Miso In Love",
    href: "/stories/article/koji-koo-up-close-and-funky-with-brown-koji-boy/",
    byline: "By Team Foodstory",
    readTime: "5-Minutes Read",
    section: "shelves",
  },
  {
    slug: "coffee-is-so-much-more-than-a-lazy-morning-hack",
    type: "article",
    title: "The Brie-tiful French Cheese You Should Know About",
    href: "/stories/article/coffee-is-so-much-more-than-a-lazy-morning-hack/",
    byline: "By Team Foodstory",
    readTime: "5-Minute Read",
    section: "shelves",
  },
  {
    slug: "your-guide-to-hosting-a-modern-day-afternoon-tea-party",
    type: "article",
    title: "Your Guide To Hosting A Modern-Day Afternoon Tea Party",
    href: "/stories/article/your-guide-to-hosting-a-modern-day-afternoon-tea-party/",
    excerpt:
      "Hosting a tea party is a delightful way to gather friends and family for a relaxed and elegant social gathering. A tradition inherited from European aristocracy, tea parties have a unique charm and feel to them along with delightful menus that pair the most charming tea-time snacks. If you're looking to host a modern-day afternoon tea party, here's your go-to guide to make it an enjoyable affair.",
    byline: "By Team Foodstory",
    readTime: "2-Minute Read",
    section: "featured",
  },
  {
    slug: "allergies-eat-these-foods-to-savour-spring-without-a-sneeze",
    type: "article",
    title: "Allergies? Eat These Foods To Savour Spring Without A Sneeze",
    href: "/stories/article/allergies-eat-these-foods-to-savour-spring-without-a-sneeze/",
    byline: "By Team Foodstory",
    readTime: "5-Minute Read",
    section: "table",
  },
  {
    slug: "10-things-to-always-have-on-hand-for-last-minute-guests",
    type: "listicle",
    title: "10 Things To Always Have On Hand For Last-Minute Guests",
    href: "/stories/listicle/10-things-to-always-have-on-hand-for-last-minute-guests/",
    byline: "By Team Foodstory",
    readTime: "3-Minute Read",
    section: "table",
  },
];

const iceCream: Story = {
  ...storyCards.find((story) => story.slug === "when-ice-cream-is-good-for-you-the-get-a-way-story")!,
  pageTitle: "Jimmy Shah on Building Get-A-Way Protein Ice Cream Brand",
  deck: "Meet the founding family behind the dessert brand that is embracing the power of protein",
  blocks: [
    {
      kind: "paragraph",
      text: "Kids, never underestimate the power of asking your mom for something you want. What started as a simple request from two siblings to their mom in 2018 has, over the years, grown into Get-A-Way — a high-protein dessert brand now loved across India.",
    },
    { kind: "question", text: "How did it all begin?" },
    {
      kind: "paragraph",
      text: "It was honestly my children who had started working out at that point and were on diets that were high in protein. They came up to me one day asking for an ice cream that would still fit into that routine.",
    },
    { kind: "question", text: "How did you convince customers that this dessert was actually good for them?" },
    {
      kind: "paragraph",
      text: "It was extremely hard to convince people how an ice cream can be healthy. At first, we had to let people taste it before they believed the label.",
    },
    { kind: "question", text: "How did you go about developing the product and perfecting the ice cream recipes?" },
    {
      kind: "paragraph",
      text: "It was challenging to balance protein with the yumminess of an ice cream. We kept tasting, adjusting, and going back to the kitchen until the scoop felt familiar.",
    },
    { kind: "question", text: "Why should people incorporate more protein into their diet?" },
    {
      kind: "paragraph",
      text: "Protein is the building-block for our bodies. To maintain or increase the strength in our bodies, we need enough of it through the day — including dessert.",
    },
    { kind: "question", text: "The Indian diet allows for consumption of protein via legumes and dals. Why would someone need a product like Get a Way?" },
    {
      kind: "paragraph",
      text: "While there are a variety of sources for protein in an Indian kitchen, a high-protein dessert makes it easier to keep that habit going after a meal.",
    },
    { kind: "question", text: "Tell us about running a business with your children." },
    {
      kind: "paragraph",
      text: "It has been a phenomenal experience. Working together has changed how we talk about food, family, and what we want Get-A-Way to stand for.",
    },
  ],
};

const truffle: Story = {
  ...storyCards.find((story) => story.slug === "everything-you-want-to-know-about-truffle")!,
  pageTitle: "Truffle 101",
  deck: "Everything you wanted to know about the fanciest fungi in the world",
  blocks: [
    {
      kind: "paragraph",
      text: "When most people think of truffles, images of elegant Michelin-star dining experiences come to mind. This fungi shines like precious black diamonds on plates of creamy pasta or risotto, instantly transforming a simple dish into something unforgettable. The deep umami, the earthy aroma, and the subtle chocolate-like undertones of black truffles make them one of the most coveted ingredients in the food world, cherished by chefs and food lovers alike.",
    },
    {
      kind: "paragraph",
      text: "Here’s the hook. What if truffles didn’t have to feel mysterious or intimidating? What if understanding them, cooking with them, and truly enjoying them could be simple, approachable, and exciting? Once you get to know this luxurious ingredient a little better, you’ll realise it can elevate your cooking in ways you never imagined.",
    },
    { kind: "heading", text: "Why Are Truffles So Expensive?" },
    {
      kind: "paragraph",
      text: "So what makes black truffles so darn expensive and special? Well, it’s a combination of factors. Truffle cultivation is a time-consuming process, taking years before a truffle-bearing tree can produce. Adding to that, their limited growth and the meticulous processes of foraging them contribute to their price tag.",
    },
    { kind: "heading", text: "Forest Friends and Ecosystem Guardians" },
    {
      kind: "paragraph",
      text: "But they are not just a luxe food, they’re vital to the ecosystems they inhabit. Typically growing at the base of oak, poplar, and beech trees, truffles help absorb water and nutrients. In return, the trees nurture the fungi.",
    },
    { kind: "heading", text: "From European Forests to Indian Plates" },
    {
      kind: "paragraph",
      text: "Today, truffles are transcending their geographical boundaries, spreading their aromatic charm and capturing the hearts of gourmands worldwide. India is witnessing a growing interest in the ingredient, too. From truffle-infused oils to truffle butter naans, the truffle trend is undoubtedly here to stay as more chefs and food enthusiasts explore the possibilities.",
    },
    { kind: "heading", text: "Myth, Mystery, and the Hunt for Gold" },
    {
      kind: "paragraph",
      text: "There’s something almost mythical about truffles: the way they hide beneath the earth, unseen, until they’re found by trained dogs (or, once upon a time, pigs) with an extraordinary sense of smell. The best truffles grow in regions that are as romantic as the ingredient itself: the oak forests of Périgord in France, the rolling hills of Umbria, and the fog-draped landscapes of Alba in northern Italy.",
    },
    { kind: "heading", text: "A Once-in-a-Season Miracle" },
    {
      kind: "paragraph",
      text: "What makes them even rarer is their brief season. Black winter truffles appear only for a few short months, while white truffles, the crown jewels of Piedmont, emerge for an even shorter spell, typically from October to December.",
    },
    { kind: "heading", text: "Perfume for the Plate" },
    {
      kind: "paragraph",
      text: "In the kitchen, a truffle behaves like perfume. Just a whisper, shaved over hot pasta, folded into scrambled eggs, stirred through risotto, is enough to transform the dish. Too much, and it overwhelms. Too little, and it teases. The art lies in restraint.",
    },
    { kind: "heading", text: "Everyday Luxuries: Truffle in Your Pantry" },
    {
      kind: "paragraph",
      text: "You do not need a whole tuber to cook with truffle. Oils, butters, and salts bring that forest perfume into weeknight food — as long as the ingredient list is honest.",
    },
    { kind: "heading", text: "The Truffle Trove at Foodstory" },
    {
      kind: "paragraph",
      text: "At Foodstory, the truffle shelf is for cooking, not just collecting. Look for oils, condiments, and seasonal specials that belong on eggs, pasta, and cheese.",
    },
    { kind: "heading", text: "Earth, Elegance, and a Little Bit of Magic" },
    {
      kind: "paragraph",
      text: "Once you understand the hunt, the season, and the restraint, truffle stops being a mystery reserved for tasting menus and becomes a story you can cook at home.",
    },
  ],
  related: [
    {
      slug: "4-ways-to-upgrade-your-favourite-foods-with-a-touch-of-truffle",
      type: "listicle",
      title: "4 Ways To Upgrade Your Favourite Foods With A Touch Of Truffle",
      href: "/stories/listicle/4-ways-to-upgrade-your-favourite-foods-with-a-touch-of-truffle/",
      byline: "By Team Foodstory",
      readTime: "5-Minute Read",
    },
    {
      slug: "white-truffle-vs-black-truffle-whats-the-difference",
      type: "article",
      title: "White Truffle vs. Black Truffle–What's The Difference?",
      href: "/stories/article/white-truffle-vs-black-truffle-whats-the-difference/",
      byline: "By Team Foodstory",
      readTime: "5-Minute Read",
    },
  ],
};

const vegan: Story = {
  ...storyCards.find((story) => story.slug === "help-my-dinner-guests-are-vegan")!,
  pageTitle: "Ultimate Vegan Dinner Party Guide by Chef Raveena Taurani",
  deck: "Romaine Calm! Here’s a guide to hosting the ultimate vegan dinner party by planet-based chef Raveena Taurani",
  blocks: [
    {
      kind: "paragraph",
      text: "So, you have some vegan guests coming over for dinner. Or maybe you want to experiment and host a theme-based dinner party. Whether you follow the vegan way or just want to dip your metaphorical cracker into a dairy-free dip, there’s no denying that vegan food has a certain hold on all of us. But if you’re daunted by the aspect of hosting a vegan-themed dinner party, there’s no one better to allay your fears than a certified plant-based chef like Raveena Taurani herself. “Remember, hosting is a sensational experience so you must always cater to the five senses: sight, smell, taste, hearing and touch.”",
    },
    { kind: "paragraph", text: "Read on to find out the ins and outs of hosting the ultimate vegan dinner party." },
    { kind: "question", text: "What is your hosting philosophy? How does that extend into the experience you provide your guests at home?" },
    {
      kind: "paragraph",
      text: "My hosting philosophy is simple: \"you enter my home, you must eat!\" For any dinner/tea parties I host at home, I always have a food plan nailed three days before the actual party. I feel planning in advance allows me to think of a menu that will excite me to prepare for my guests, give me enough time to source all the ingredients I may need and think about presentation.",
    },
    { kind: "question", text: "What would be the menu for this meal? What cuisine would you tap into and how would you go about creating this menu?" },
    {
      kind: "paragraph",
      text: "A typical dinner menu would consist of three appetisers, two mains and one great dessert but it would also depend on the season and locally available ingredients. In terms of cuisine, my go to cuisines are Asian, Indian, Lebanese and Mexican. But first priority is ingredients - I let them decide what I will eventually make.",
    },
    {
      kind: "paragraph",
      text: "I also feel at the end of the day, you have to be mindful of wastage, so if you serve one great dessert, it's way more satisfying than having too many to choose from and feeling like you're missing out.",
    },
    { kind: "question", text: "For those who are new to vegan cooking, what are some essential pantry staples they should have on hand for preparing delicious meals?" },
    { kind: "paragraph", text: "A Great Vegan Feta Cheese - it goes well in salads, inside tikkis/kebabs and can be used even on a charcuterie board." },
    { kind: "paragraph", text: "Vegan Milk - Almond or Oat Milk for desserts, especially as you will need a liquid ingredient to bring your batter together if you are baking a recipe." },
    { kind: "paragraph", text: "Vegan Sauces/Dips - it really helps to have some of these in stock so that you are not starting from scratch." },
    { kind: "paragraph", text: "Good Quality Silken Tofu - Good tofu is a versatile ingredient that takes the flavour of anything and everything and is super blendable for desserts too." },
    {
      kind: "question",
      text: "Hosting a dinner often involves catering to various dietary restrictions. How do you approach menu planning to accommodate different dietary needs while keeping the focus on vegan options?",
    },
    {
      kind: "paragraph",
      text: "I think this has been my special skill for over 10 years - to be able to cook for anyone with any dietary restriction. Once, I made food for a client who had an allergy list to 35 different types of foods! My main approach is to always consider what main dishes I am cooking that can incorporate a batch of the same dish with the dietary restriction too.",
    },
  ],
};

const stories: Story[] = [
  iceCream,
  truffle,
  vegan,
  {
    ...storyCards[0],
    pageTitle: "The Manuka Miracle | Foodstory",
    deck: "A golden elixir from the Southern Hemisphere with extraordinary healing power",
    blocks: [
      {
        kind: "paragraph",
        text: "Manuka honey is more than a pantry sweetener. Harvested from the nectar of Leptospermum scoparium in New Zealand, it has become one of the most talked-about ingredients on the Foodstory shelves.",
      },
    ],
  },
  {
    ...storyCards.find((story) => story.slug === "your-guide-to-hosting-a-modern-day-afternoon-tea-party")!,
    pageTitle: "Your Guide To Hosting A Modern-Day Afternoon Tea Party | Foodstory",
    deck: "Discover stories that turn every occasion into a memorable celebration",
    blocks: [
      {
        kind: "paragraph",
        text: "Hosting a tea party is a delightful way to gather friends and family for a relaxed and elegant social gathering. A tradition inherited from European aristocracy, tea parties have a unique charm and feel to them along with delightful menus that pair the most charming tea-time snacks. If you're looking to host a modern-day afternoon tea party, here's your go-to guide to make it an enjoyable affair.",
      },
    ],
  },
];

const extraRelated: Story[] = [
  {
    slug: "4-ways-to-upgrade-your-favourite-foods-with-a-touch-of-truffle",
    type: "listicle",
    title: "4 Ways To Upgrade Your Favourite Foods With A Touch Of Truffle",
    href: "/stories/listicle/4-ways-to-upgrade-your-favourite-foods-with-a-touch-of-truffle/",
    byline: "By Team Foodstory",
    readTime: "5-Minute Read",
    pageTitle: "4 Ways To Upgrade Your Favourite Foods With A Touch Of Truffle | Foodstory",
    deck: "A few pantry moves that make truffle feel everyday.",
    blocks: [{ kind: "paragraph", text: "A little truffle goes a long way on eggs, pasta, cheese, and warm bread." }],
  },
  {
    slug: "white-truffle-vs-black-truffle-whats-the-difference",
    type: "article",
    title: "White Truffle vs. Black Truffle–What's The Difference?",
    href: "/stories/article/white-truffle-vs-black-truffle-whats-the-difference/",
    byline: "By Team Foodstory",
    readTime: "5-Minute Read",
    pageTitle: "White Truffle vs. Black Truffle | Foodstory",
    deck: "Two seasons, two aromas, two ways to cook.",
    blocks: [{ kind: "paragraph", text: "White and black truffles share a forest story but they do not cook the same way." }],
  },
];

const allStories = [...stories, ...extraRelated];

const aliases: Record<string, string> = {
  "truffle-101": "everything-you-want-to-know-about-truffle",
};

export function getStory(type: string, slug: string): Story | undefined {
  const resolved = aliases[slug] ?? slug;
  if (type === "hierarchical" && resolved === "everything-you-want-to-know-about-truffle") {
    return allStories.find((story) => story.slug === resolved);
  }
  return allStories.find((story) => story.slug === resolved && story.type === type);
}

export function allStoryParams(): Array<{ type: StoryType; slug: string }> {
  return [
    ...allStories.map((story) => ({ type: story.type, slug: story.slug })),
    { type: "hierarchical", slug: "truffle-101" },
  ];
}

export function storiesIn(section: StoryCardItem["section"]): StoryCardItem[] {
  return storyCards.filter((story) => story.section === section);
}
