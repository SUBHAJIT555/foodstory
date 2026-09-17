"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { locatorStores, serviceableAreas } from "@/data/stores";

export function StoreLocatorPage() {
  const [openCity, setOpenCity] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-3 pb-16 lg:px-2">
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Store Locator" }]} />
      <h1 className="mb-4 text-center text-3xl font-bold lg:text-5xl">Discover a Foodstory near you</h1>
      <div className="space-y-12">
        {locatorStores.map((store) => (
          <article key={store.name} className="grid gap-6 border-b border-black/10 pb-10 lg:grid-cols-2">
            <div>
              <p className="text-base">{store.quote}</p>
              <p className="mt-3 text-sm font-semibold">{store.director}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">{store.name}</h2>
              <h3 className="text-lg font-semibold">{store.city}</h3>
              <p className="text-sm font-medium text-fig">{store.openLabel}</p>
              <div>
                <h3 className="text-sm font-semibold">Store Timings</h3>
                <p>{store.timings}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Address</h3>
                <p>{store.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Contact</h3>
                <p>
                  <a href={`tel:+91${store.phone}`}>{store.phone}</a>
                </p>
              </div>
              <a href={store.mapHref} target="_blank" rel="noreferrer" className="inline-block text-sm font-semibold underline">
                Get Directions
              </a>
            </div>
          </article>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="mb-6 text-center text-2xl font-bold">Serviceable Areas</h2>
        <div className="space-y-6">
          {serviceableAreas.map((group) => {
            const expanded = openCity === group.city;
            const preview = group.areas.split(" | ").slice(0, 12).join(" | ");
            return (
              <div key={group.city}>
                <h3 className="mb-2 text-xl font-semibold">{group.city}</h3>
                <p className="text-sm leading-relaxed text-muted">{expanded ? group.areas : preview}</p>
                <button
                  type="button"
                  className="mt-2 text-sm font-semibold underline"
                  onClick={() => setOpenCity(expanded ? null : group.city)}
                >
                  {expanded ? "Read less" : "Read more"}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
