import type { ProductBadge } from "@/data/products";

type PdpBadgesProps = {
  badges?: ProductBadge[];
};

export function PdpBadges({ badges }: PdpBadgesProps) {
  if (!badges?.length) return null;

  return (
    <ul className="mb-4 flex flex-wrap gap-1">
      {badges.map((badge) => (
        <li
          key={badge.label}
          className={`w-fit rounded-md px-2 py-1 ${badge.label === "Bestseller" ? "bg-[#A13940]" : "bg-[#E1AE88]"}`}
        >
          <span className="line-clamp-1 text-xs font-semibold text-white uppercase">{badge.label}</span>
        </li>
      ))}
    </ul>
  );
}
