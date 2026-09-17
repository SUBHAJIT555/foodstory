"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { isPrimaryNavActive, primaryNav, shopAllHref, shopMegaCategories } from "@/data/navigation";
import { footerContact } from "@/data/footer";
import { Logo } from "@/components/layout/Logo";
import {
  IconCall,
  IconChevronRight,
  IconClose,
  IconFaq,
  IconHeart,
  IconWhatsApp,
} from "@/components/icons";
import { durationUi, overlayPresence } from "@/lib/motion";
import type { OverlayName } from "@/types";

type MobileNavigationProps = {
  open: boolean;
  onOverlay: (name: OverlayName) => void;
};

export function MobileNavigation({ open, onOverlay }: MobileNavigationProps) {
  const pathname = usePathname();
  const [shopOpen, setShopOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  if (!open && (shopOpen || openCategory)) {
    setShopOpen(false);
    setOpenCategory(null);
  }

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-30 lg:hidden">
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/30"
            {...overlayPresence}
            onClick={() => onOverlay(null)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: durationUi, ease: "easeOut" }}
            className="fixed inset-y-0 left-0 z-30 w-[80vw] transform-gpu overflow-y-scroll bg-white text-left text-ink scroll-pt-6"
          >
            <div className="flex flex-col bg-[#EDEAE9] p-6">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  ref={closeRef}
                  type="button"
                  className="rounded-full"
                  aria-label="Close menu"
                  onClick={() => onOverlay(null)}
                >
                  <IconClose />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center pb-5">
              {primaryNav.map((item) =>
                item.label === "SHOP" ? (
                  <div key={item.href}>
                    <button
                      type="button"
                      className={`flex w-full cursor-pointer items-center justify-between p-5 text-left text-sm font-medium ${
                        isPrimaryNavActive(pathname, item) ? "text-fig" : ""
                      }`}
                      aria-expanded={shopOpen}
                      onClick={() => {
                        setShopOpen((current) => !current);
                        setOpenCategory(null);
                      }}
                    >
                      {item.label}
                      <IconChevronRight />
                    </button>
                    {shopOpen ? (
                      <>
                        <Link
                          href={shopAllHref}
                          className="block px-8 py-2 text-sm font-semibold text-fig"
                          onClick={() => onOverlay(null)}
                        >
                          SHOP ALL
                        </Link>
                        {shopMegaCategories.map((category) => {
                          const nested = category.children ?? [];
                          const expanded = openCategory === category.href;
                          return (
                            <div key={category.href + category.label}>
                              <div className="flex items-center">
                                <Link
                                  href={category.href}
                                  className="block flex-1 px-8 py-2 text-sm"
                                  onClick={() => onOverlay(null)}
                                >
                                  {category.label}
                                </Link>
                                {nested.length ? (
                                  <button
                                    type="button"
                                    className="px-4 py-2"
                                    aria-label={`${expanded ? "Hide" : "Show"} ${category.label} categories`}
                                    aria-expanded={expanded}
                                    onClick={() => setOpenCategory(expanded ? null : category.href)}
                                  >
                                    <IconChevronRight className={expanded ? "rotate-90" : ""} />
                                  </button>
                                ) : null}
                              </div>
                              {expanded
                                ? nested.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      className="block px-12 py-2 text-sm text-black/70"
                                      onClick={() => onOverlay(null)}
                                    >
                                      {child.label}
                                    </Link>
                                  ))
                                : null}
                            </div>
                          );
                        })}
                      </>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`w-full cursor-pointer p-5 text-sm font-medium ${
                      isPrimaryNavActive(pathname, item) ? "text-fig" : ""
                    }`}
                    onClick={() => onOverlay(null)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>

            <div className="mx-4 border-t border-black/20" />

            <div className="mb-4 flex flex-col text-black/60">
              <button
                type="button"
                className="flex items-center gap-x-3 p-5"
                onClick={() => onOverlay("shelf")}
              >
                <IconHeart />
                <p>My Shelf</p>
              </button>
              <Link href="/faqs/" className="flex items-center gap-x-3 p-5" onClick={() => onOverlay(null)}>
                <IconFaq />
                <p>FAQs</p>
              </Link>
              <div className="flex cursor-pointer items-center gap-x-3 p-5">
                <IconCall className="size-5" />
                <a href={footerContact.phoneHref}>Call us on: {footerContact.phoneDisplay}</a>
              </div>
              <div className="flex cursor-pointer items-start gap-x-3 p-5 pb-28">
                <IconWhatsApp className="size-5" />
                <a href={footerContact.whatsappHref} target="_blank" rel="noreferrer">
                  WhatsApp us on: +919004171401
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
