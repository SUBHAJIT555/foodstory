"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { HeaderBadge } from "@/components/commerce/HeaderBadge";
import { IconCart, IconMenu, IconShelf } from "@/components/icons";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation";
import { Logo } from "@/components/layout/Logo";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { headerOverlaySentinelId, useHeaderTheme } from "@/hooks/useHeaderTheme";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import type { OverlayName } from "@/types";

type SiteHeaderProps = {
  overlay: OverlayName;
  onOverlay: (name: OverlayName) => void;
};

export function SiteHeader({ overlay, onOverlay }: SiteHeaderProps) {
  const pathname = usePathname();
  const routeTheme = useHeaderTheme(pathname);
  const [homeTheme, setHomeTheme] = useState(routeTheme);

  useEffect(() => {
    if (pathname !== "/") return;

    const read = () => {
      const sentinel = document.getElementById(headerOverlaySentinelId());
      const over = !sentinel || sentinel.getBoundingClientRect().bottom > 0;
      setHomeTheme(over ? "overlay" : "light");
    };

    const interval = window.setInterval(read, 120);
    window.addEventListener("scroll", read, { passive: true });
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", read);
    };
  }, [pathname]);
  const [announceOpen, setAnnounceOpen] = useState(true);
  const closeTimer = useRef<number>(0);
  const overlayRef = useRef(overlay);
  const suppressMegaHover = useRef(false);
  const megaOpen = overlay === "mega";
  const mobileOpen = overlay === "mobile";
  const holdExpanded = megaOpen || mobileOpen || overlay === "cart" || overlay === "shelf";
  const { scrolledExpanded } = useScrollDirection();
  const navExpanded = holdExpanded || scrolledExpanded;
  const theme = megaOpen ? "light" : pathname === "/" ? homeTheme : "light";
  const inverted = !megaOpen && theme === "overlay";

  function cancelCloseMega() {
    window.clearTimeout(closeTimer.current);
  }

  function openMega() {
    if (suppressMegaHover.current) return;
    cancelCloseMega();
    overlayRef.current = "mega";
    onOverlay("mega");
  }

  function closeMega() {
    cancelCloseMega();
    if (overlayRef.current === "mega") {
      overlayRef.current = null;
      onOverlay(null);
    }
  }

  function dismissMega() {
    suppressMegaHover.current = true;
    closeMega();
  }

  function releaseMegaHover() {
    suppressMegaHover.current = false;
  }

  function scheduleCloseMega() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      if (overlayRef.current === "mega") {
        overlayRef.current = null;
        onOverlay(null);
      }
    }, 220);
  }

  function openPanel(name: OverlayName) {
    cancelCloseMega();
    overlayRef.current = name;
    onOverlay(name);
  }

  useEffect(() => {
    overlayRef.current = overlay;
  }, [overlay]);

  useEffect(() => {
    if (!megaOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onOverlay(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen, onOverlay]);

  useEffect(() => {
    if (!suppressMegaHover.current) return;
    const shop = document.querySelector("[aria-controls='shop-mega-menu']");
    if (!(shop instanceof HTMLElement) || !shop.matches(":hover")) {
      suppressMegaHover.current = false;
    }
  }, [pathname]);

  useEffect(() => {
    const desktop = announceOpen ? (navExpanded ? "104px" : "88px") : navExpanded ? "74px" : "58px";
    const mobile = announceOpen ? (navExpanded ? "93px" : "81px") : navExpanded ? "63px" : "51px";
    document.documentElement.style.setProperty("--header-sticky-desktop-current", desktop);
    document.documentElement.style.setProperty("--header-sticky-mobile-current", mobile);
  }, [announceOpen, navExpanded]);

  return (
    <div
      className="site-header"
      data-theme={theme}
      data-nav-expanded={navExpanded ? "true" : "false"}
      data-overlay={overlay ?? ""}
    >
      <div
        className="relative flex w-full min-w-0 flex-col overflow-visible"
        onMouseEnter={cancelCloseMega}
        onMouseLeave={scheduleCloseMega}
      >
        {announceOpen ? <AnnouncementBar onDismiss={() => setAnnounceOpen(false)} /> : null}

        <nav className="site-header-nav">
          <div className="mx-auto w-full max-w-7xl px-3 lg:px-6">
            <div
              className={`flex w-full items-center justify-between gap-x-4 lg:grid lg:grid-cols-[1fr_auto_1fr] ${
                navExpanded ? "py-4" : "py-2.5"
              }`}
            >
              <div className="flex min-w-0 items-center justify-start gap-x-3">
                <button
                  type="button"
                  className="lg:hidden"
                  aria-label="Menu"
                  aria-expanded={mobileOpen}
                  onClick={() => openPanel(mobileOpen ? null : "mobile")}
                >
                  <IconMenu />
                </button>
                <Logo inverted={inverted} />
              </div>

              <div className="hidden lg:flex lg:items-center lg:justify-center">
                <DesktopNavigation
                  megaOpen={megaOpen}
                  onShopEnter={openMega}
                  onShopExit={closeMega}
                  onShopClick={dismissMega}
                  onShopLeave={releaseMegaHover}
                />
              </div>

              <div className="flex items-center justify-end gap-x-4 lg:justify-self-end" aria-label="user-actions">
                <button
                  type="button"
                  className="relative"
                  aria-label="My Shelf"
                  onClick={() => openPanel("shelf")}
                >
                  <IconShelf />
                  <HeaderBadge kind="shelf" />
                </button>
                <button type="button" className="relative" aria-label="Cart" onClick={() => openPanel("cart")}>
                  <IconCart />
                  <HeaderBadge kind="cart" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {megaOpen ? (
          <div
            id="shop-mega-menu"
            className="absolute inset-x-0 top-full z-20 max-lg:hidden"
            data-shop-mega="true"
            onMouseEnter={openMega}
          >
            <MegaMenu onNavigate={dismissMega} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
