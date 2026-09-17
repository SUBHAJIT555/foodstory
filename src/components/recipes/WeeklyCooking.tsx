import { MediaCarousel } from "@/components/media/MediaCarousel";
import { ProductCard } from "@/components/product/ProductCard";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { recipeCards } from "@/data/recipes";

const products = [
  { name: "Hydroponic Flat Kale from Manesar", href: "/shop/product/hydroponic-flat-kale/", price: "₹200", unit: "150 gm" },
  { name: "Unshelled Pine Nuts from Turkey", href: "/shop/product/unshelled-pine-nuts/", price: "₹2400", unit: "200 gm" },
  { name: "Parmigiano Reggiano", href: "/shop/product/parmigiano-reggiano/", price: "₹1875", unit: "250 gm" },
  { name: "Olitalia Sicily IGP Extra Virgin Olive Oil of Olive", href: "/shop/product/olitalia-sicily-igp-evoo/", price: "₹2475", unit: "500 ml" },
];

const weeklyRecipe = recipeCards.find((recipe) => recipe.slug === "mango-avocado-salad") ?? recipeCards[0];

export function WeeklyCooking() {
  return (
    <section className="mx-auto h-full min-w-0 space-y-6 text-center lg:w-11/12">
      <h2 className="px-3 text-center text-[1.625rem] font-bold lg:text-[2.1875rem]">What&apos;s Cooking this Week?</h2>
      <MediaCarousel
        slidesPerView={1.2}
        spaceBetween={16}
        navigation
        breakpoints={{
          375: { slidesPerView: 1.2, spaceBetween: 16 },
          768: { slidesPerView: 2.2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 32 },
          1280: { slidesPerView: 4, spaceBetween: 32 },
        }}
        className="px-3 lg:px-10"
        slideClassName="!h-auto"
      >
        {products.slice(0, 2).map((product) => (
          <ProductCard key={product.href} product={product} />
        ))}
        <RecipeCard recipe={weeklyRecipe} />
        {products.slice(2).map((product) => (
          <ProductCard key={product.href} product={product} />
        ))}
      </MediaCarousel>
    </section>
  );
}
