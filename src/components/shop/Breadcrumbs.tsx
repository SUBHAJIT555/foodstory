import Link from "next/link";
import type { ShopCrumb } from "@/data/shop";

type BreadcrumbsProps = {
  crumbs: ShopCrumb[];
  variant?: "listing" | "pdp";
  compact?: boolean;
};

export function Breadcrumbs({ crumbs, variant = "listing", compact = false }: BreadcrumbsProps) {
  return (
    <nav
      aria-label={variant === "pdp" ? "breadcrumbs" : "Breadcrumb"}
      className={
        variant === "pdp"
          ? "w-full bg-white px-3 py-4 pl-6 lg:bg-transparent lg:px-0 lg:pl-0"
          : compact
            ? "mx-auto max-w-7xl px-6 py-3 lg:px-8"
            : "mx-auto px-3 py-4 lg:max-w-7xl lg:px-2"
      }
    >
      <ol className="flex flex-wrap items-center gap-3">
        {crumbs.map((crumb, index) => {
          const current = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`}>
              {crumb.href && !current ? (
                <Link
                  href={crumb.href}
                  className={index === 0 ? "text-black hover:underline" : "flex items-center gap-3 text-black hover:underline"}
                >
                  {index > 0 ? <span className="block h-1 w-1 rounded-full bg-black" /> : null}
                  <span>{crumb.label}</span>
                </Link>
              ) : (
                <span className={index === 0 ? "text-black" : "flex items-center gap-3 text-black"}>
                  {index > 0 ? <span className="block h-1 w-1 rounded-full bg-black" /> : null}
                  <span>{crumb.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
