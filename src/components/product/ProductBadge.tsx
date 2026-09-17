export type ProductBadgeTone = "charcoal" | "salmon";

export type ProductBadgeItem = {
  label: string;
  tone?: ProductBadgeTone;
};

type ProductBadgeProps = {
  badges: ProductBadgeItem[];
  compact?: boolean;
};

export function ProductBadge({ badges, compact = false }: ProductBadgeProps) {
  if (!badges.length) return null;

  return (
    <ul
      className={
        compact
          ? "absolute top-3 left-3 flex flex-col gap-1.5 rounded-sm"
          : "absolute top-4 left-4 flex flex-col gap-2 rounded-sm max-md:top-2 max-md:left-2"
      }
    >
      {badges.map((badge) => (
        <li
          key={badge.label}
          className={`w-fit rounded-sm ${compact ? "px-2.5 py-1" : "px-2 py-1"} ${badge.tone === "salmon" ? "bg-[#D48A7A]" : "bg-[#38383A]"}`}
        >
          <p className={`line-clamp-1 text-white ${compact ? "text-xs md:text-sm" : "max-md:text-xs"}`}>{badge.label}</p>
        </li>
      ))}
    </ul>
  );
}
