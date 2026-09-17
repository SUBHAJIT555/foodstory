"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import {
  CART_STORAGE_KEY,
  SHELF_STORAGE_KEY,
  cartCount,
  cartSubtotal,
  toCartDraft,
  toShelfItem,
  type CartItem,
  type CatalogInput,
  type ShelfItem,
} from "@/lib/commerce";

type CommerceValue = {
  ready: boolean;
  cart: CartItem[];
  shelf: ShelfItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: CatalogInput, quantity?: number, variant?: string) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  addToShelf: (product: CatalogInput) => void;
  removeFromShelf: (productId: string) => void;
  toggleShelf: (product: CatalogInput) => void;
  isShelved: (productIdOrHref: string) => boolean;
};

type Listener = () => void;

const CHANGE_EVENT = "fs-commerce-change";
const CART_STORE_KEY = "__fsCartStore";
const SHELF_STORE_KEY = "__fsShelfStore";

type PersistedList<T> = {
  subscribe: (listener: Listener) => () => void;
  getSnapshot: () => T[];
  getServerSnapshot: () => T[];
  set: (updater: T[] | ((current: T[]) => T[])) => void;
};

function createPersistedList<T>(key: string): PersistedList<T> {
  const empty: T[] = [];
  let snapshot = empty;
  let raw = "";
  let live = false;
  let hydrateTimer = 0;
  const listeners = new Set<Listener>();

  function emit() {
    listeners.forEach((listener) => listener());
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  function readFromStorage() {
    try {
      const nextRaw = window.localStorage.getItem(key) ?? "";
      if (nextRaw === raw) return snapshot;
      raw = nextRaw;
      if (!nextRaw) {
        snapshot = empty;
        return snapshot;
      }
      const parsed = JSON.parse(nextRaw) as unknown;
      snapshot = Array.isArray(parsed) ? (parsed as T[]) : empty;
      return snapshot;
    } catch {
      snapshot = empty;
      return snapshot;
    }
  }

  function getSnapshot() {
    return live ? snapshot : empty;
  }

  function subscribe(listener: Listener) {
    listeners.add(listener);
    if (!live && !hydrateTimer) {
      hydrateTimer = window.setTimeout(() => {
        live = true;
        readFromStorage();
        listeners.forEach((fn) => fn());
      }, 0);
    }
    function onExternal() {
      readFromStorage();
      listeners.forEach((fn) => fn());
    }
    function onStorage(event: StorageEvent) {
      if (event.key === key || event.key === null) onExternal();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener(CHANGE_EVENT, onExternal);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CHANGE_EVENT, onExternal);
    };
  }

  function set(updater: T[] | ((current: T[]) => T[])) {
    const current = live ? snapshot : readFromStorage();
    live = true;
    const next = typeof updater === "function" ? updater(current) : updater;
    snapshot = next;
    raw = JSON.stringify(next);
    window.localStorage.setItem(key, raw);
    emit();
  }

  return {
    subscribe,
    getSnapshot,
    getServerSnapshot: () => empty,
    set,
  };
}

type StoreGlobal = typeof globalThis & {
  [CART_STORE_KEY]?: PersistedList<CartItem>;
  [SHELF_STORE_KEY]?: PersistedList<ShelfItem>;
};

function cartStore() {
  const root = globalThis as StoreGlobal;
  root[CART_STORE_KEY] ??= createPersistedList<CartItem>(CART_STORAGE_KEY);
  return root[CART_STORE_KEY];
}

function shelfStore() {
  const root = globalThis as StoreGlobal;
  root[SHELF_STORE_KEY] ??= createPersistedList<ShelfItem>(SHELF_STORAGE_KEY);
  return root[SHELF_STORE_KEY];
}

function addItem(product: CatalogInput, quantity = 1, variant?: string) {
  if (product.available === false) return;
  const draft = toCartDraft(product, variant);
  const qty = Math.max(1, quantity);
  cartStore().set((current) => {
    const existing = current.find((item) => item.key === draft.key);
    if (existing) {
      return current.map((item) => (item.key === draft.key ? { ...item, quantity: item.quantity + qty } : item));
    }
    return [...current, { ...draft, quantity: qty }];
  });
}

function removeItem(key: string) {
  cartStore().set((current) => current.filter((item) => item.key !== key));
}

function updateQuantity(key: string, quantity: number) {
  if (quantity < 1) {
    removeItem(key);
    return;
  }
  cartStore().set((current) => current.map((item) => (item.key === key ? { ...item, quantity } : item)));
}

function clearCart() {
  cartStore().set([]);
}

function addToShelf(product: CatalogInput) {
  const next = toShelfItem(product);
  shelfStore().set((current) => (current.some((item) => item.productId === next.productId) ? current : [...current, next]));
}

function removeFromShelf(productId: string) {
  shelfStore().set((current) => current.filter((item) => item.productId !== productId && item.href !== productId));
}

function toggleShelf(product: CatalogInput) {
  const next = toShelfItem(product);
  shelfStore().set((current) =>
    current.some((item) => item.productId === next.productId)
      ? current.filter((item) => item.productId !== next.productId)
      : [...current, next],
  );
}

function subscribeReady() {
  return () => undefined;
}

function clientReady() {
  return true;
}

function serverReady() {
  return false;
}

export function useCommerce(): CommerceValue {
  const cart = useSyncExternalStore(cartStore().subscribe, cartStore().getSnapshot, cartStore().getServerSnapshot);
  const shelf = useSyncExternalStore(shelfStore().subscribe, shelfStore().getSnapshot, shelfStore().getServerSnapshot);
  const ready = useSyncExternalStore(subscribeReady, clientReady, serverReady);

  return useMemo<CommerceValue>(
    () => ({
      ready,
      cart,
      shelf,
      itemCount: cartCount(cart),
      subtotal: cartSubtotal(cart),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      addToShelf,
      removeFromShelf,
      toggleShelf,
      isShelved(productIdOrHref: string) {
        return shelf.some((item) => item.productId === productIdOrHref || item.href === productIdOrHref);
      },
    }),
    [cart, ready, shelf],
  );
}

export function CommerceProvider({ children }: { children: ReactNode }) {
  return children;
}

export function useOptionalCommerce() {
  return useCommerce();
}
