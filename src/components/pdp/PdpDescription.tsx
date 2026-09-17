"use client";

import { useState } from "react";

type PdpDescriptionProps = {
  text: string;
};

export function PdpDescription({ text }: PdpDescriptionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-5" aria-label="product-description">
      <div className={`html-content text-base font-medium text-[#000] transition-all duration-300 ease-in-out ${open ? "" : "line-clamp-4 sm:line-clamp-3"}`}>
        {text}
      </div>
      <div className="flex justify-start">
        <button type="button" className="text-sm font-medium text-black underline hover:underline" onClick={() => setOpen((current) => !current)}>
          {open ? "Read less" : "Read more"}
        </button>
      </div>
    </div>
  );
}
