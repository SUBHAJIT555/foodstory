# Route map

Source of truth: live public sitemaps + in-page links on https://www.foodstories.shop/  
Audit date: 2026-09-13.

Do not implement one page per URL. Bind URLs to templates.

```ts
type PageTemplate =
  | 'home'
  | 'shop-listing'
  | 'shop-product'
  | 'gifting-landing'
  | 'gifting-listing'
  | 'gifting-product'
  | 'gifting-builder'
  | 'recipe-listing'
  | 'recipe-detail'
  | 'story-listing'
  | 'story-detail'
  | 'editorial'
  | 'faq'
  | 'store-locator'
  | 'form'
  | 'search-results'
  | 'bulk-gifting';
```

`gifting-landing` and `gifting-builder` are extra observed templates beyond the starter union. `faq`, `store-locator`, `form`, and `search-results` are also distinct and should not be forced into `editorial` without a visual compare.

---

## Counts from public sitemaps

| Source | Count | Notes |
| --- | --- | --- |
| `/sitemap.xml` | 21 core/content URLs | Homepage, shop/gifting landings, stories, recipes, about, services, FAQs, policies |
| `/shop/sitemap.xml` | 253 category URLs | Nested `/shop/...` taxonomy |
| `/shop/product/sitemap.xml` | 2701 product URLs | All `/shop/product/:slug/` |
| `/recipes/sitemap.xml` | 141 recipe URLs | Flat `/recipes/:slug/` |
| `/stories/sitemap.xml` | 32 story URLs | `article` / `hierarchical` / `listicle` |
| `/shop/gifting.xml` | unusable as XML | Live URL renders the shop listing template (`title: Shop - Foodstories`), not a sitemap |

`robots.txt` also lists `/admin/`, `/account/`, `/checkout/` as disallowed. Those are out of public-UI scope.

---

## Template → route pattern

| Template | Pattern | Representative URLs |
| --- | --- | --- |
| `home` | `/` | `/` |
| `shop-listing` | `/shop/` and `/shop/:l1/:l2?/:l3?/` | `/shop/`, `/shop/fruits-vegetables/`, `/shop/the-bakery/`, `/shop/healthy-alternatives/`, `/shop/eggs-seafood-meats/` |
| `shop-listing` (alt) | `/category/:slug/` | Same listing template as `/shop/:slug/` (reconfirmed 2026-09-13: `/category/fruits-vegetables/` shares title, chrome, and `?pageIndex=`). |
| `shop-product` | `/shop/product/:slug/` | `/shop/product/hass-avocado-ripe/`, `/shop/product/hass-avocado/`, `/shop/product/tbof-a2-gir-cow-ghee/`, `/shop/product/salt-bread/` |

Phase 5 implements this as `src/app/shop/product/[slug]/page.tsx`. Public URL structure is unchanged. Trailing slash is preserved by the Next app where configured; live always uses `/shop/product/:slug/`.
| `gifting-landing` | `/gifting/` | `/gifting/` |
| `gifting-listing` | `/gifting/all-gifts/` + nested filters | `/gifting/all-gifts/`, `/gifting/all-gifts/gift-by-occasion/festive/`, `/gifting/all-gifts/gifts-by-type/dry-fruit-trays/`, `/gifting/all-gifts/under-2000/` |
| `gifting-product` | `/gifting/product/:slug/` | `/gifting/product/chocolate-fondue-kit/`, `/gifting/product/dried-fruits-delights-tray/` |
| `gifting-builder` | `/gifting/build-your-own-box/...` | `/gifting/build-your-own-box/select-box/` |
| `bulk-gifting` | `/bulk-gifting/` | `/bulk-gifting/` — Type D corporate/bulk landing + Type E 7-step enquiry (reconfirmed 2026-09-13) |
| `recipe-landing` | `/recipes/` | `/recipes/` — Type A curated hub (not a grid) |
| `recipe-listing` | `/recipes/list/` | `/recipes/list/?pageIndex=1` — Type B filterable list |
| `recipe-detail` | `/recipes/:slug/` | `/recipes/whipped-avocado-toast/` — Type C |
| `story-landing` | `/stories/` | `/stories/` — Type D editorial hub |
| `story-discover` | `/stories/discover-all/` | `/stories/discover-all/` — Type E themed discover (not a blog index) |
| `story-detail` | `/stories/:type/:slug/` | `/stories/article/when-ice-cream-is-good-for-you-the-get-a-way-story/`, `/stories/article/everything-you-want-to-know-about-truffle/` (live remapped from `/stories/hierarchical/truffle-101/`), `/stories/listicle/help-my-dinner-guests-are-vegan/` — Type F |
| `about` | `/about-us/` | `/about-us/` — Type G |
| `services` | `/services/` | `/services/` — Type H. CTAs go to `/form/bespoke-orders/`, `/kitchen-studio/`, `/form/personal-shopper/`. No `/services/:slug/` pages. |
| `editorial` | other static content | `/contact-us/`, `/kitchen-studio/`, `/policies/:slug/` — out of Phase 7 except as service CTA targets |
| `faq` | `/faqs/`, `/faqs/:slug/` | `/faqs/`, `/faqs/shopping-at-foodstories/` |
| `store-locator` | `/store-locator/` | `/store-locator/` |
| `form` | `/form/:slug/` | `/form/personal-shopper/` |
| `search-results` | `/search-results/?query=` | schema `SearchAction` target |

Pagination on listings uses `?pageIndex=N`. Product/search tracking query params (`wizzySource`, `wizzySearchResponseId`, `selected`) are not new templates.

---

## Shop L1 categories (sitemap)

Observed first-level `/shop/` folders:

- `/shop/fruits-vegetables/`
- `/shop/the-bakery/`
- `/shop/cheese/` (linked from homepage; not a sitemap L1 folder name — confirm alias)
- `/shop/pantry-perks/`
- `/shop/eggs-seafood-meats/`
- `/shop/the-pantry/`
- `/shop/fresh-dip-spread/`
- `/shop/everyday-staples/`
- `/shop/tea-coffee-beverages/`
- `/shop/dried-fruit-nuts-seeds/`
- `/shop/milk-butter-yoghurt/`
- `/shop/healthy-alternatives/`
- `/shop/chocolates-confectionery/`
- `/shop/dips-spreads-batters-ferments/` (homepage link; confirm vs `fresh-dip-spread`)
- `/shop/meals-on-the-go/`
- `/shop/avocado-guacamole-essentials/`

Mega-nav L1 labels (visible, including items below the first fold): Fresh Produce, Bakery, Cheese, Pantry Perks, Meat Market, Pantry, Fresh Meals, Dips and Spreads, Everyday Staples, Tea & Beverages, Dried Fruits & Nuts, Dairy, Chocolate & Sweets, Lifestyle & Diet, Frozen, Cuisines, Beyond Food.

Do not invent extra L1 items. Map label → URL from the live mega menu during Phase 2.

---

## Gifting listing variants

From `/gifting/` in-page links:

### Gift by occasion

- `/gifting/all-gifts/gift-by-occasion/festive/`
- `/gifting/all-gifts/gift-by-occasion/corporate/`
- `/gifting/all-gifts/gift-by-occasion/hosting/`
- `/gifting/all-gifts/gift-by-occasion/birthdays/`
- `/gifting/all-gifts/gift-by-occasion/housewarming/`
- `/gifting/all-gifts/gift-by-occasion/weddings/`
- `/gifting/all-gifts/gift-by-occasion/congratulations/`

### Gifts by type

- `/gifting/all-gifts/gifts-by-type/chocolate-sweets/`
- `/gifting/all-gifts/gifts-by-type/dry-fruit-trays/`
- `/gifting/all-gifts/gifts-by-type/cheese-grazing-boxes/`
- `/gifting/all-gifts/gifts-by-type/fruits-baskets/`
- `/gifting/all-gifts/gifts-by-type/snacking-hampers/`
- `/gifting/all-gifts/gifts-by-type/tea-coffee-hampers/`

### Price bands

- `/gifting/all-gifts/under-2000/`
- `/gifting/all-gifts/2000-3500/`
- `/gifting/all-gifts/3500-5000/`
- `/gifting/all-gifts/gifts-above-inr-5000/`

---

## Header / footer destinations

Header: `/shop/`, `/gifting/`, `/bulk-gifting/`, `/stories/`, `/recipes/`, `/about-us/`, `/services/`

Footer extras: `/contact-us/`, `/policies/shipping-policy/`, `/policies/returns-refunds-policy/`, `/policies/privacy-policy/`, `/policies/weekend-of-plenty-terms-and-conditions/`, `/faqs/`, `/form/personal-shopper/`, `/store-locator/`, `/sitemap/`

Main sitemap FAQ children:

- `/faqs/shopping-at-foodstories/`
- `/faqs/gifting-with-foodstories/`
- `/faqs/returns-refunds-and-exchanges/`
- `/faqs/cancellations/`
- `/faqs/kitchen-studio-and-events/`
- `/faqs/personal-shopper/`
- `/faqs/food-and-beverage/`

---

## Suggested App Router mapping (not implemented in this phase)

```
src/app/(site)/page.tsx                              home
src/app/(site)/shop/[[...slug]]/page.tsx             shop-listing
src/app/(site)/shop/product/[slug]/page.tsx          shop-product
src/app/(site)/gifting/page.tsx                      gifting-landing
src/app/(site)/gifting/all-gifts/[[...slug]]/page.tsx gifting-listing
src/app/(site)/gifting/product/[slug]/page.tsx       gifting-product
src/app/(site)/gifting/build-your-own-box/[...slug]/page.tsx
src/app/(site)/bulk-gifting/page.tsx
src/app/(site)/recipes/page.tsx
src/app/(site)/recipes/list/page.tsx
src/app/(site)/recipes/[slug]/page.tsx
src/app/(site)/stories/page.tsx
src/app/(site)/stories/[type]/[slug]/page.tsx
src/app/(site)/about-us/page.tsx
src/app/(site)/services/page.tsx
src/app/(site)/contact-us/page.tsx
src/app/(site)/kitchen-studio/page.tsx
src/app/(site)/faqs/[[...slug]]/page.tsx
src/app/(site)/policies/[slug]/page.tsx
src/app/(site)/store-locator/page.tsx
src/app/(site)/form/[slug]/page.tsx
src/app/(site)/search-results/page.tsx
src/app/(site)/category/[slug]/page.tsx
```

---

## Phase 8 coverage (2026-09-13)

Re-crawled from live header, mega, footer, shop, gifting, and content navigation. Live unknown paths such as `/this-page-does-not-exist-xyz/` redirected to `/`. Local invalid records use `not-found.tsx`.

| Route | Reference Type | Local Status | Responsive QA | Notes |
| --- | --- | --- | --- | --- |
| `/` | Homepage | IMPLEMENTED | Yes | Photography placeholders. |
| `/shop/` | PLP | IMPLEMENTED | Yes | Shop All. |
| `/shop/fruits-vegetables/` | PLP | IMPLEMENTED | Yes | Representative L1. |
| `/shop/the-bakery/` | PLP | IMPLEMENTED | Yes | |
| `/shop/cheese/` | PLP | IMPLEMENTED | Yes | |
| `/shop/pantry-perks/` | PLP | IMPLEMENTED | Yes | |
| `/shop/eggs-seafood-meats/` | PLP | IMPLEMENTED | Yes | |
| `/shop/the-pantry/` | PLP | IMPLEMENTED | Yes | Alias to pantry perks listing. |
| `/shop/dips-spreads-batters-ferments/` | PLP | IMPLEMENTED | Yes | |
| `/shop/everyday-staples/` | PLP | IMPLEMENTED | Yes | |
| `/shop/tea-coffee-beverages/` | PLP | IMPLEMENTED | Yes | |
| `/shop/dried-fruit-nuts-seeds/` | PLP | IMPLEMENTED | Yes | |
| `/shop/milk-butter-yoghurt/` | PLP | IMPLEMENTED | Yes | |
| `/shop/healthy-alternatives/` | PLP | IMPLEMENTED | Yes | |
| `/shop/chocolates-confectionery/` | PLP | IMPLEMENTED | Yes | |
| `/shop/meals-on-the-go/` | PLP | IMPLEMENTED | Yes | Known-root fallback listing. |
| `/shop/avocado-guacamole-essentials/` | PLP | IMPLEMENTED | Yes | |
| `/shop/frozen/` | PLP | IMPLEMENTED | Yes | |
| `/shop/general-merchandising/` | PLP | IMPLEMENTED | Yes | Beyond Food. |
| `/shop/:l2/:l3?/` (known L1) | PLP | IMPLEMENTED | Partial | Nested known roots reuse parent listing. |
| `/shop/not-a-real-category/` | PLP | IMPLEMENTED | Yes | `notFound()`. |
| `/category/:slug/` | PLP | IMPLEMENTED | Yes | Same template; crumbs omit Shop. |
| `/shop/product/:slug/` | PDP | IMPLEMENTED | Yes | Fixture SKUs; unknown slug 404s. |
| `/gifting/` | Gifting landing | IMPLEMENTED | Yes | Catalogue CTA remains `#` (licensed PDF). |
| `/gifting/all-gifts/` | Gifting listing | IMPLEMENTED | Yes | |
| `/gifting/all-gifts/gift-by-occasion/:slug/` | Gifting listing | IMPLEMENTED | Yes | Observed occasions. |
| `/gifting/all-gifts/gifts-by-type/:slug/` | Gifting listing | IMPLEMENTED | Yes | Observed types. |
| `/gifting/all-gifts/under-2000/` and price bands | Gifting listing | IMPLEMENTED | Yes | |
| `/gifting/product/:slug/` | Gift PDP | IMPLEMENTED | Yes | Fixture gifts; unknown slug 404s. |
| `/gifting/build-your-own-box/:slug/` | Gifting builder | PARTIALLY IMPLEMENTED | Partial | Observed copy only. |
| `/bulk-gifting/` | Bulk gifting | IMPLEMENTED | Yes | Step 7 email is reconstructed. |
| `/recipes/` | Recipe landing | IMPLEMENTED | Yes | |
| `/recipes/list/` | Recipe listing | IMPLEMENTED | Yes | Fixture slice. |
| `/recipes/:slug/` | Recipe detail | IMPLEMENTED | Yes | Whipped Avocado Toast fully transcribed. |
| `/stories/` | Story landing | IMPLEMENTED | Yes | |
| `/stories/discover-all/` | Story discover | IMPLEMENTED | Yes | |
| `/stories/:type/:slug/` | Story detail | IMPLEMENTED | Yes | `truffle-101` aliased. |
| `/about-us/` | About | IMPLEMENTED | Yes | |
| `/services/` | Services | IMPLEMENTED | Yes | No `/services/:slug/`. |
| `/contact-us/` | Editorial / contact | IMPLEMENTED | Partial | Phase 8 added. |
| `/kitchen-studio/` | Kitchen studio | IMPLEMENTED | Partial | Phase 8 added. |
| `/faqs/` | FAQ | IMPLEMENTED | Partial | Defaults to shopping topic. |
| `/faqs/:slug/` | FAQ | IMPLEMENTED | Partial | Eight observed topics. |
| `/policies/` | Policy hub | IMPLEMENTED | Partial | Renders shipping body + sidebar. |
| `/policies/shipping-policy/` | Policy | IMPLEMENTED | Partial | Captured copy. |
| `/policies/returns-refunds-policy/` | Policy | IMPLEMENTED | Partial | Captured copy. |
| `/policies/privacy-policy/` | Policy | IMPLEMENTED | Partial | Captured excerpt. |
| `/policies/cookie-policy/` | Policy | IMPLEMENTED | Partial | |
| `/policies/weekend-of-plenty-terms-and-conditions/` | Policy | IMPLEMENTED | Partial | Short summary. |
| `/policies/kitchen-studio-policy/` | Policy | IMPLEMENTED | Partial | Short summary. |
| `/policies/terms-services/` | Policy | IMPLEMENTED | Partial | Live slug, not `terms-and-services`. |
| `/policies/material-release/` | Policy | IMPLEMENTED | Partial | Short summary. |
| `/form/personal-shopper/` | Form | IMPLEMENTED | Partial | Frontend-only submit. |
| `/form/bespoke-orders/` | Form | IMPLEMENTED | Partial | Frontend-only submit. |
| `/store-locator/` | Store locator | IMPLEMENTED | Partial | Five stores + serviceable areas. |
| `/search-results/?query=` | Search results | IMPLEMENTED | Partial | Fixture search; overlay chips navigate here. |
| `/sitemap/` | Sitemap | IMPLEMENTED | Partial | Implemented public routes, not 2700 SKUs. |
| unknown public path | Utility | IMPLEMENTED | Yes | Local `not-found.tsx`. Live redirects to `/`. |
| `/admin/` | Admin | NOT PUBLIC | No | robots.txt disallow. |
| `/account/` | Account | NOT PUBLIC | No | Out of scope. Header Login is an empty drawer. |
| `/checkout/` | Checkout | NOT PUBLIC | No | Out of scope. Header Cart is an empty drawer. |

### Redirects / aliases

| From | To / behaviour | Status |
| --- | --- | --- |
| `/stories/hierarchical/truffle-101/` | Same article as `/stories/article/everything-you-want-to-know-about-truffle/` | IMPLEMENTED |
| `/category/:slug/` | Shop-listing template | IMPLEMENTED |
| Live unknown URL | Homepage | REDIRECT on live only |
| Tracking query (`wizzySource`, `selected`, `pageIndex`) | Not a new template | DOCUMENTED |

### Intentionally out of scope

- `/admin/`, `/account/`, `/checkout/`
- Authentication, persistent cart, payments
- Licensed CloudFront / S3 / Vimeo photography
- Gifting catalogue PDF (link stays `#`)

## Phase 9 verification (2026-09-13)

Every route marked IMPLEMENTED above hard-refreshes in production (`yarn build` → `yarn start` on :3001). Unknown shop / product / recipe / story / catch-all paths render `not-found.tsx` with title `Page not found | Foodstories`. Live unknown URLs still redirect to `/`. BYOB remains PARTIALLY IMPLEMENTED.
