"use client";

import type { KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isPrimaryNavActive, primaryNav } from "@/data/navigation";

type DesktopNavigationProps = {
  megaOpen: boolean;
  onShopEnter: () => void;
  onShopExit: () => void;
  onShopClick: () => void;
  onShopLeave: () => void;
};

export function DesktopNavigation({
  megaOpen,
  onShopEnter,
  onShopExit,
  onShopClick,
  onShopLeave,
}: DesktopNavigationProps) {
  const pathname = usePathname();

  function onShopKeyDown(event: KeyboardEvent<HTMLAnchorElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onShopExit();
      return;
    }
    if (!megaOpen) return;
    if (event.key === "ArrowDown" || (event.key === "Tab" && !event.shiftKey)) {
      event.preventDefault();
      document.getElementById("shop-mega-first")?.focus();
    }
  }

  return (
    <div className="flex items-center justify-center gap-x-4 xl:gap-x-6">
      {primaryNav.map((item) => {
        const shop = item.label === "SHOP";
        const home = item.label === "HOME";
        const active = isPrimaryNavActive(pathname, item, megaOpen);
        const activeClass = shop || home
          ? "!text-fig !underline underline-offset-4"
          : "!text-fig";

        if (shop) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`cursor-pointer whitespace-nowrap font-medium md:text-sm ${
                active ? activeClass : ""
              }`}
              aria-expanded={megaOpen}
              aria-haspopup="true"
              aria-controls="shop-mega-menu"
              onMouseEnter={onShopEnter}
              onMouseLeave={onShopLeave}
              onFocus={onShopEnter}
              onClick={onShopClick}
              onKeyDown={onShopKeyDown}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`cursor-pointer whitespace-nowrap font-medium md:text-sm ${active ? activeClass : ""}`}
            onMouseEnter={onShopExit}
            onFocus={onShopExit}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
