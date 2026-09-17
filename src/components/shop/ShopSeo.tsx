"use client";

import { useState } from "react";

type ShopSeoProps = {
  title: string;
  paragraphs: string[];
};

export function ShopSeo({ title, paragraphs }: ShopSeoProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="html-content mx-auto px-3 py-8 lg:max-w-7xl lg:px-2">
      <div className={open ? "" : "md:line-clamp-4 max-md:line-clamp-5"}>
        <h2 className="mb-2 text-2xl leading-8 font-bold">{title}</h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="mb-2">
            {paragraph}
          </p>
        ))}
      </div>
      <button type="button" className="my-2 text-sm font-medium text-fig hover:underline" onClick={() => setOpen((current) => !current)}>
        {open ? "Read less" : "Read more"}
      </button>
    </section>
  );
}
