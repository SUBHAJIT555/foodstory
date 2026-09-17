"use client";

import { useState } from "react";
import { IconPlus } from "@/components/icons";

type GiftFavouriteProps = {
  text: string;
};

export function GiftFavourite({ text }: GiftFavouriteProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-black/15">
      <button type="button" className="flex w-full items-start justify-between py-4" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
        <p className="px-0 text-start text-base font-semibold">Our Favourite Thing About This Product</p>
        <IconPlus className={`h-6 w-6 shrink-0 stroke-fig stroke-[1.5] transition-transform duration-200 ${open ? "rotate-45" : ""}`} />
      </button>
      {open ? <p className="pb-4 text-sm font-medium text-[#39393B]">{text}</p> : null}
    </div>
  );
}
