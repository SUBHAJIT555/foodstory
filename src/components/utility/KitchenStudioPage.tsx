"use client";

import { useState } from "react";
import Link from "next/link";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { ProductFaq } from "@/components/pdp/ProductFaq";
import { EnquiryForm } from "@/components/utility/EnquiryForm";
import type { EnquiryFormConfig } from "@/data/forms";
import {
  kitchenFaqs,
  kitchenFeatures,
  kitchenFormCopy,
  kitchenHero,
  kitchenRentCopy,
  kitchenUses,
} from "@/data/kitchen-studio";

const kitchenForm: EnquiryFormConfig = {
  slug: "kitchen-studio",
  pageTitle: "Kitchen Studio by Foodstory",
  crumb: "Book the Kitchen Studio",
  title: "Kitchen Studio",
  submitLabel: "Submit",
  fields: [{ kind: "store", name: "store", placeholder: "Select Store*", required: true }],
};

export function KitchenStudioPage() {
  const [audience, setAudience] = useState<"individuals" | "businesses">("individuals");

  return (
    <>
    <div className="mb-16 space-y-12 lg:mb-24">
      <EditorialBanner
        title={kitchenHero.title}
        intro={kitchenHero.intro}
        bannerKey="kitchen-studio"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Book the Kitchen Studio" },
        ]}
      />
      <section className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 text-2xl font-bold lg:text-4xl">{kitchenHero.dek}</h2>
        <p className="text-base">{kitchenHero.support}</p>
      </section>
      <ul className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-2">
        {kitchenFeatures.map((feature) => (
          <li key={feature} className="rounded-lg border border-black/10 px-4 py-6 text-center text-base font-semibold">
            {feature}
          </li>
        ))}
      </ul>
      <section className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="mb-8 text-2xl font-bold lg:text-4xl">One Space, Many Uses</h2>
        <p className="mb-10 text-base">Looking to book our kitchen but need some inspiration?</p>
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {kitchenUses.map((use) => (
            <article key={use.title} className="space-y-3">
              <h3 className="text-xl font-bold">{use.title}</h3>
              <p className="font-semibold">{use.headline}</p>
              <p className="text-base">{use.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 text-2xl font-bold">Rent Our Kitchen Studio</h2>
        <p className="mb-6 text-base">
          {kitchenRentCopy}{" "}
          <Link href="/policies/kitchen-studio-policy/" className="underline">
            View our T&C here.
          </Link>
        </p>
        <div className="mb-8 flex justify-center gap-4">
          <button
            type="button"
            className={`rounded-full border px-5 py-2 text-sm font-medium ${
              audience === "individuals" ? "border-fig bg-fig text-white" : "border-black/20"
            }`}
            aria-pressed={audience === "individuals"}
            onClick={() => setAudience("individuals")}
          >
            For Individuals
          </button>
          <button
            type="button"
            className={`rounded-full border px-5 py-2 text-sm font-medium ${
              audience === "businesses" ? "border-fig bg-fig text-white" : "border-black/20"
            }`}
            aria-pressed={audience === "businesses"}
            onClick={() => setAudience("businesses")}
          >
            For Businesses
          </button>
        </div>
        <h3 className="mb-3 text-xl font-bold">
          {audience === "individuals" ? kitchenFormCopy.title : kitchenFormCopy.businessTitle}
        </h3>
        <p className="mb-8 text-base">{kitchenFormCopy.support}</p>
        <EnquiryForm config={kitchenForm} idPrefix={`kitchen-${audience}`} />
      </section>
      <ProductFaq faqs={kitchenFaqs} />
    </div>
    <SubscribeSection />
    </>
  );
}
