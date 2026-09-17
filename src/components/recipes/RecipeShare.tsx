"use client";

import { useState } from "react";
import { IconHeart, IconShare } from "@/components/icons";

export function RecipeShare() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex gap-2 md:gap-4">
      <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBF3F2]" aria-label="Save recipe">
        <IconHeart className="h-5 w-5 fill-none stroke-fig" />
      </button>
      <button type="button" className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#FBF3F2]" onClick={copy} aria-label="Share recipe">
        <IconShare className="h-4 w-4 stroke-2 stroke-fig" />
        {copied ? <p className="absolute top-10 right-0 rounded-md bg-white px-3 py-2 text-xs font-medium shadow-sm">Link copied</p> : null}
      </button>
    </div>
  );
}
