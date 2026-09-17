"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { mediaFor } from "@/data/media";
import type { ShopChip } from "@/data/shop";

type CategoryChipsProps = {
  chips: ShopChip[];
};

export function CategoryChips({ chips }: CategoryChipsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(5.55);

  if (chips.length === 0) return null;

  function onScroll() {
    const node = scrollerRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setProgress(max <= 0 ? 100 : Math.max(5.55, (node.scrollLeft / max) * 100));
  }

  return (
    <div className="z-10 my-4 block w-full px-3 md:px-16">
      <div className="space-y-4 md:space-y-6">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className={`no-scrollbar flex snap-x gap-2 overflow-x-auto md:gap-4 ${chips.length <= 6 ? "justify-center" : "justify-start"}`}
        >
          {chips.map((chip) => (
            <Link
              key={chip.href}
              href={chip.href}
              className="mx-auto flex w-20 shrink-0 snap-start flex-col items-center justify-start gap-y-2 md:mt-6 md:w-28"
            >
              <div className="relative aspect-square size-15 overflow-hidden rounded-full bg-dew hover:border hover:border-fig">
                <FramedMedia alt={chip.label} src={mediaFor(chip.href, chip.label)} sizes="(max-width: 768px) 20vw, 5vw" className="rounded-full object-cover" />
              </div>
              <div className="flex min-h-4 w-full items-center justify-center">
                <span className="w-full text-center text-xs font-medium md:text-sm">{chip.label}</span>
              </div>
            </Link>
          ))}
        </div>
        {chips.length > 4 ? (
          <div className="mx-auto w-24">
            <div className="h-1 w-full rounded-lg bg-gray-100">
              <div
                className="h-full rounded-lg bg-fig"
                style={{ width: `${progress}%`, transition: "width 0.3s, transform 0.3s" }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
