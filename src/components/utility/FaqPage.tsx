import Link from "next/link";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { ProductFaq } from "@/components/pdp/ProductFaq";
import { faqCategories, faqIntro, type FaqCategory } from "@/data/faqs";

type FaqPageProps = {
  category: FaqCategory;
};

export function FaqPage({ category }: FaqPageProps) {
  return (
    <div className="mb-16 space-y-10 lg:mb-24">
      <EditorialBanner
        title="How Can We Help You?"
        intro={faqIntro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Faqs", href: "/faqs/" },
          { label: category.title },
        ]}
      />
      <nav className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 px-4" aria-label="FAQ topics">
        {faqCategories.map((item) => {
          const active = item.slug === category.slug;
          return (
            <Link
              key={item.slug}
              href={`/faqs/${item.slug}/`}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                active ? "border-fig bg-fig text-white" : "border-black/20 text-ink"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-center text-2xl font-bold lg:text-4xl">{category.title}</h2>
        <ProductFaq faqs={category.faqs} heading="" className="mx-auto max-w-4xl px-0 pt-0" />
      </div>
      <section className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 text-2xl font-bold">Don’t have the answer to your question yet?</h2>
        <p className="mb-6 text-base">
          <Link href="/contact-us/" className="underline">
            Contact Us
          </Link>{" "}
          and our customer service team will be happy to help you.
        </p>
        <p className="text-sm font-semibold">Email us at</p>
        <p className="mb-4">
          <a href="mailto:care@foodstories.shop" className="underline">
            care@foodstories.shop
          </a>
        </p>
        <p className="text-sm font-semibold">Call us at</p>
        <p>
          <a href="tel:+919004171401">9004171401</a>
        </p>
      </section>
    </div>
  );
}
