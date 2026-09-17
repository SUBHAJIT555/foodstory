"use client";

import { useState } from "react";
import Link from "next/link";
import { shopMegaCategories, shopMegaDefault } from "@/data/navigation";
import { IconChevronRight } from "@/components/icons";
import type { MegaItem } from "@/types";

type MegaMenuProps = {
  onNavigate: () => void;
};

function firstBranch(item?: MegaItem): MegaItem | undefined {
  return item?.children?.find((child) => (child.children?.length ?? 0) > 0) ?? item?.children?.[0];
}

function sameHref(left: string, right?: string) {
  if (!right) return false;
  return left.replace(/\/+$/, "") === right.replace(/\/+$/, "");
}

function MenuChevron({ active }: { active: boolean }) {
  return (
    <IconChevronRight
      className={`h-4 w-4 shrink-0 text-fig ${active ? "visible" : "invisible group-hover:visible"}`}
    />
  );
}

export function MegaMenu({ onNavigate }: MegaMenuProps) {
  const [active, setActive] = useState<MegaItem>(shopMegaDefault);
  const [activeChild, setActiveChild] = useState<MegaItem | undefined>(firstBranch(shopMegaDefault));
  const [activeLeaf, setActiveLeaf] = useState<MegaItem | undefined>(firstBranch(shopMegaDefault)?.children?.[0]);

  function hoverCategory(item: MegaItem) {
    const nextChild = firstBranch(item);
    setActive(item);
    setActiveChild(nextChild);
    setActiveLeaf(nextChild?.children?.[0]);
  }

  function hoverChild(item: MegaItem) {
    setActiveChild(item);
    setActiveLeaf(item.children?.[0]);
  }

  const column2 = active.children ?? [];
  const column3 = activeChild?.children ?? [];

  return (
    <div className="w-full max-h-[70vh] overflow-y-auto overflow-x-clip bg-white text-left text-ink">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-4 gap-x-4 border-t border-dew">
        <div className="flex h-full w-full justify-between">
          <ul className="flex w-full flex-col gap-y-6 py-4 pr-16">
            {shopMegaCategories.map((item, index) => {
              const selected = sameHref(item.href, active.href);
              const hasChildren = (item.children?.length ?? 0) > 0;
              return (
                <li key={item.href + item.label}>
                  <Link
                    id={index === 0 ? "shop-mega-first" : undefined}
                    href={item.href}
                    className="group flex w-full items-center justify-between outline-hidden"
                    onMouseEnter={() => hoverCategory(item)}
                    onFocus={() => hoverCategory(item)}
                    onClick={onNavigate}
                  >
                    <span
                      className={`cursor-pointer text-lg font-semibold hover:text-fig ${
                        selected ? "text-fig" : "text-[#38383A99]"
                      }`}
                    >
                      {item.label}
                    </span>
                    {hasChildren ? <MenuChevron active={selected} /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-r border-r-[#EDEAE9]" />
        </div>

        <div className="flex h-full w-full justify-between">
          <div className="flex w-full flex-col gap-y-6 py-4 pr-16">
            <p className="text-sm font-semibold text-[#38383A]">{active.label}</p>
            {column2.map((child) => {
              const selected = sameHref(child.href, activeChild?.href);
              const hasChildren = (child.children?.length ?? 0) > 0;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className="group flex w-full items-center justify-between"
                  onMouseEnter={() => hoverChild(child)}
                  onFocus={() => hoverChild(child)}
                  onClick={onNavigate}
                >
                  <span
                    className={`cursor-pointer text-sm hover:text-fig ${
                      selected ? "text-fig" : "text-[#38383A99]"
                    }`}
                  >
                    {child.label}
                  </span>
                  {hasChildren ? <MenuChevron active={selected} /> : null}
                </Link>
              );
            })}
            <Link
              href={active.href}
              className="cursor-pointer text-sm !text-fig !underline"
              onClick={onNavigate}
            >
              View All
            </Link>
          </div>
          <div className="border-r border-r-[#EDEAE9]" />
        </div>

        <div className="flex h-full w-full justify-between">
          {column3.length && activeChild ? (
            <>
              <div className="flex w-full flex-col gap-y-6 py-4 pr-16">
                <p className="text-sm font-semibold text-[#38383A]">{activeChild.label}</p>
                {column3.map((child) => {
                  const selected = sameHref(child.href, activeLeaf?.href);
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="group flex w-full items-center justify-between"
                      onMouseEnter={() => setActiveLeaf(child)}
                      onFocus={() => setActiveLeaf(child)}
                      onClick={onNavigate}
                    >
                      <span
                        className={`cursor-pointer text-sm hover:text-fig ${
                          selected ? "text-fig" : "text-[#38383A99]"
                        }`}
                      >
                        {child.label}
                      </span>
                    </Link>
                  );
                })}
                <Link
                  href={activeChild.href}
                  className="cursor-pointer text-sm !text-fig !underline"
                  onClick={onNavigate}
                >
                  View All
                </Link>
              </div>
              <div className="border-r border-r-[#EDEAE9]" />
            </>
          ) : null}
        </div>

        <div className="h-full w-full px-4 py-4" />
      </div>
    </div>
  );
}
