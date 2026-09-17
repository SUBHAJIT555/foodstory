"use client";

import { useCommerce } from "@/store/CommerceProvider";

type HeaderBadgeProps = {
  kind: "cart" | "shelf";
};

export function HeaderBadge({ kind }: HeaderBadgeProps) {
  const { ready, itemCount, shelf } = useCommerce();
  const count = kind === "cart" ? itemCount : shelf.length;
  if (!ready || count < 1) return null;

  return (
    <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-fig px-1 text-[10px] leading-none font-semibold text-white">
      {count}
    </span>
  );
}
