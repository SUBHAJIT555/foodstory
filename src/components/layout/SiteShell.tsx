"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { OverlayContext } from "@/components/layout/OverlayContext";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { UtilityDrawer } from "@/components/layout/UtilityDrawer";
import { ShelfDrawer } from "@/components/shelf/ShelfDrawer";
import { CommerceProvider } from "@/store/CommerceProvider";
import type { OverlayName } from "@/types";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const [overlay, setOverlay] = useState<OverlayName>(null);
  const [overlayPath, setOverlayPath] = useState(pathname);
  const lastFocus = useRef<HTMLElement | null>(null);

  if (overlayPath !== pathname) {
    setOverlayPath(pathname);
    setOverlay(null);
  }

  function onOverlay(name: OverlayName) {
    if (name && !overlay) {
      lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    setOverlay(name);
    if (!name) {
      queueMicrotask(() => lastFocus.current?.focus());
    }
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOverlay(null);
        queueMicrotask(() => lastFocus.current?.focus());
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const lock =
      overlay === "cart" || overlay === "login" || overlay === "shelf" || overlay === "mobile";
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlay]);

  const checkout = pathname.startsWith("/checkout");
  const shopSurface = pathname.startsWith("/shop") || pathname.startsWith("/gifting/all-gifts");

  return (
    <CommerceProvider>
    <OverlayContext.Provider value={onOverlay}>
    <div className={`flex min-h-dvh min-w-0 flex-col text-ink ${shopSurface ? "bg-white" : "bg-page"}`}>
      <SiteHeader overlay={overlay} onOverlay={onOverlay} />
      <main className="relative z-1 min-h-[50vh] min-w-0 flex-1">{children}</main>
      {checkout ? null : <SiteFooter />}
      <MobileNavigation open={overlay === "mobile"} onOverlay={onOverlay} />
      <CartDrawer open={overlay === "cart"} onClose={() => onOverlay(null)} />
      <UtilityDrawer
        open={overlay === "login"}
        title="Login"
        emptyCopy="Login for a delightfully personalised experience!"
        onClose={() => onOverlay(null)}
      />
      <ShelfDrawer open={overlay === "shelf"} onClose={() => onOverlay(null)} />
    </div>
    </OverlayContext.Provider>
    </CommerceProvider>
  );
}
