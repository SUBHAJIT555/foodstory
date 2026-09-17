"use client";

import { useState } from "react";
import { IconPlus } from "@/components/icons";
import type { PdpFaq } from "@/data/pdp";

type ProductFaqProps = {
  faqs: PdpFaq[];
  heading?: string;
  className?: string;
};

export function ProductFaq({ faqs, heading = "FAQs", className }: ProductFaqProps) {
  const [open, setOpen] = useState<number | null>(null);

  if (!faqs.length) return null;

  return (
    <section className={className ?? "mx-auto max-w-7xl px-4 pt-4 md:px-0 md:pt-8"}>
      <div className="flex flex-col">
        {heading ? (
          <h2 className={heading === "FAQs" ? "mb-8 px-3 text-center text-2xl font-bold lg:text-4xl" : "font-serif mb-8 px-3 text-center text-2xl font-bold tracking-wide text-[#39393B] md:text-5xl"}>
            {heading}
          </h2>
        ) : null}
        {faqs.map((faq, index) => {
          const expanded = open === index;
          return (
            <div key={faq.question} className="gap-y-6">
              <div className="flex flex-col gap-y-4">
                <button
                  type="button"
                  id={`faq-button-${index}`}
                  className="flex min-h-11 w-full items-start justify-between"
                  aria-expanded={expanded}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  <p className="px-0 text-start text-base font-semibold">{faq.question}</p>
                  <IconPlus className={`h-6 w-6 shrink-0 stroke-fig stroke-[1.5] transition-transform duration-200 ${expanded ? "rotate-45" : ""}`} />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`text-left text-base font-medium ${expanded ? "" : "hidden"}`}
                >
                  <div className="html-content">{faq.answer}</div>
                </div>
              </div>
              <hr className="my-6 border-black/15" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
