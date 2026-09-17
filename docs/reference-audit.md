# Reference audit — Foodstories

Live source of truth: https://www.foodstories.shop/  
Audited: 2026-09-13. Reinspected 2026-09-13 for Phase 9. Overflow + Swiper pass: 2026-09-13. Homepage geometry pass: 2026-09-13.  
Stack on the live site: Next.js App Router on Vercel, Tailwind, Slick, Wizzy search, CloudFront media (`d3lhyaytnudnz3.cloudfront.net`), Magento-style catalog paths.

## Homepage width roles (measured 2026-09-13)

Roles used locally:

- **Viewport** — `html` / `body` / `main` (no extra max-width)
- **WideContainer** — 1440px from `lg` (`max-w-360`), full-bleed below `lg`
- **PageContainer** — 1280px (`--container-content` / `max-w-7xl`), gutters 12px / 8px from `lg`
- **Text** — measured max-widths only (store subtitle 317 / 420; login copy sits in `lg:w-3/4` of the 7xl column)

Do not put article `max-w-2xl` / `max-w-3xl` on image or carousel sections.

### Full-bleed vs contained (every homepage section)

| Section | Classification | Notes |
|---|---|---|
| Hero | FULL BLEED | Slider is viewport width |
| Category circles | CONTAINED | PageContainer; heading is the tiles |
| Fresh Produce / Bakery / Pantry Perks | CONTAINED HEADING + CAROUSEL | Same PageContainer; heading `section-title` centered; mobile gutter removed (`max-lg:px-0`) so the rail can peek; heading keeps `px-3` |
| Bestsellers | CONTAINED HEADING + CAROUSEL | Same as other rails. Live heading is viewport-centered via parent `text-center` (not left-edge). Local uses the same PageContainer so heading and first card share one origin. Extra `lg:pb-60` before Step Into |
| Step Into Foodstories | FULL WIDTH BACKGROUND + CONTAINED CONTENT | WideContainer 1440; heading `small-section-label` 22 / 28 |
| Shopping modes | FULL-BLEED BACKGROUND + CONTAINED CONTENT | Dark band full viewport; tiles in PageContainer |
| Brand values | CONTAINED | PageContainer; titles `editorial-title` 26 / 35 |
| Timeless Festive Picks | CONTAINED HEADING + BLEEDING CAROUSEL | Heading full-width centered. Track is viewport-wide Slick/Swiper with **centerPadding** (not `justify-between`). Live: 1 slide below 686px, 3 slides from 686px. Padding: 55→210px on small phones, 30px at 768, 50px at 1024, 180px at 1280–1440 |
| Login / store image | CONTAINED | `max-w-7xl`, `p-4` / `lg:p-11`. Image `1192×461` at 1440 (1280 − 88). Mobile ~`aspect-[6/5]`. Heading `editorial-title`. CTA `w-1/2` of the `lg:w-3/4` text column (~447×53 at 1440) |
| SEO copy | CONTAINED | PageContainer, white band |
| Subscribe | FULL-BLEED BACKGROUND + CONTAINED CONTENT | Footer band; inner `max-w-7xl` |

### Measured geometry (client widths)

**1440 (client ~1425)**

- PageContainer / rails: ~1280 centered, gutter ~79–81px to first card
- Rail heading: 30px / 700 / 36lh, centered
- Bestsellers cards: 4 × ~317, image ~285; 4 full cards
- Festive: 3 × ~355 slides, `centerPadding` 180px, image ~286×508
- Login: left ~73, width 1280, pad 44, image 1192×461, heading 35px / 565 wide, CTA 447×53

**1280 (client ~1265)**

- Rails: 4 × ~281 in ~1123 track
- Festive: 3 × ~302, padding 180px
- Login: full width (viewport < 1280), image ~1177×452

**1024 (client ~1009)**

- Produce heading in 7xl: left 8, width 993
- Bestsellers heading: full width, centered, 30px, mb 24px
- Festive: 3 × ~303, padding 50px, image 286×508
- Login: pad 44, image fills 921 wide

**768**

- Rail heading: 26px, centered, px 12
- Festive: 3 slides, padding 30px
- Login: pad 16px
- Step Into: 28px heading, section full 768

**430**

- Festive: 1 slide, padding 90px, slide ~250, image ~232×413, heading mb 24px
- Login: pad 16, image ~398×332, heading 26px, CTA ~199×36
- Step Into: 22px heading

**375**

- Festive: 1 slide, padding 55px, slide ~265, image ~250×444
- Login: pad 16, image ~343×234

### Heading tokens

- `section-title` — rails + festive: 26px → 30px (`lg:text-3xl`)
- `editorial-title` — login + brand: 26px → 35px / 52.5lh
- `small-section-label` — Step Into: 22px → 28px / 100% lh
- Shopping modes heading stays 24px → 36px (distinct role)

## Homepage Carousel Audit

Measured on live Foodstories (`/` ) at ~1031px client width. Live uses Slick (10 sliders). Local uses Swiper. Store discovery and shopping-mode tiles are **not** sliders on live.

Section: Search overlay trending  
Type: SWIPER/CAROUSEL (live Slick)  
Desktop slides visible: 3  
Tablet slides visible: ~2.2  
Mobile slides visible: ~1.4  
Gap: 16  
Arrows: no (overlay)  
Dots: no  
Autoplay: no  
Loop: no  
Swipe: yes  
Partial next card: yes  
Desktop behavior: 3 product cards in overlay panel  
Mobile behavior: 1.4 cards, swipe only  

Section: Hero  
Type: SWIPER/CAROUSEL (live Slick)  
Desktop slides visible: 1  
Tablet slides visible: 1  
Mobile slides visible: 1  
Gap: 0  
Arrows: no  
Dots: yes (6)  
Autoplay: ~4s  
Loop: yes  
Swipe: yes  
Partial next card: no  
Desktop behavior: full-bleed landscape, dots over image  
Mobile behavior: full-bleed square, same dots  

Section: Category circles  
Type: SWIPER/CAROUSEL (live Slick)  
Desktop slides visible: 6  
Tablet slides visible: 4  
Mobile slides visible: 3  
Gap: 16–24  
Arrows: desktop custom fig-border  
Dots: no  
Autoplay: no  
Loop: no  
Swipe: yes  
Partial next card: no on desktop row  
Desktop behavior: 6 circles + Discover All  
Mobile behavior: 3 circles, swipe  

Section: Fresh Produce / Bakery / Bestsellers / Pantry Perks product rails  
Type: SWIPER/CAROUSEL (live Slick)  
Desktop slides visible: 4  
Tablet slides visible: 2.2–3.2  
Mobile slides visible: ~1.35  
Gap: 16 mobile / 24 tablet / 32 desktop  
Arrows: desktop custom  
Dots: no  
Autoplay: no  
Loop: no  
Swipe: yes  
Partial next card: yes tablet/mobile  
Desktop behavior: 4 cards + Explore More  
Mobile behavior: 1 full + peek of next  

Section: Brand value titles  
Type: SWIPER/CAROUSEL (live Slick)  
Desktop slides visible: 1  
Tablet slides visible: 1  
Mobile slides visible: 1  
Gap: 0  
Arrows: no  
Dots: yes (5)  
Autoplay: 4s  
Loop: yes  
Swipe: yes  
Partial next card: no  
Desktop behavior: one title + five dots, videos static below  
Mobile behavior: same, mobile video below  

Section: Timeless Festive Picks  
Type: SWIPER/CAROUSEL (live Slick)  
Desktop slides visible: 3–3.2  
Tablet slides visible: ~2.2  
Mobile slides visible: ~1.2  
Gap: 24  
Arrows: desktop custom  
Dots: no  
Autoplay: no  
Loop: no  
Swipe: yes  
Partial next card: yes  
Desktop behavior: portrait gift cards + Gift Now  
Mobile behavior: 1.2 cards, swipe  

Section: Step Into Foodstories (stores)  
Type: NATIVE HORIZONTAL SCROLL (not Slick)  
Desktop slides visible: contained row  
Tablet slides visible: contained row  
Mobile slides visible: contained row  
Gap: 16–30  
Arrows: no  
Dots: no  
Autoplay: no  
Loop: no  
Swipe: native overflow-x  
Partial next card: yes  
Desktop behavior: inner horizontal scroll, section does not widen page  
Mobile behavior: same  

Section: Shop Your Way / shopping modes  
Type: STATIC GRID  
Desktop slides visible: 3  
Tablet slides visible: 3  
Mobile slides visible: stacked  
Gap: n/a  
Arrows: no  
Dots: no  
Autoplay: no  
Loop: no  
Swipe: no  
Partial next card: no  
Desktop behavior: 3 tiles  
Mobile behavior: stacked tiles  

## Slider / Carousel Inventory

Observed on live homepage (Slick, 10 sliders). Local recreation uses Swiper with custom (not default-blue) controls.

Route: `/`
Section: Search overlay trending
Desktop slides visible: ~3
Tablet slides visible: ~2.2
Mobile slides visible: ~1.4
Gap: 16
Arrows: hidden at inspected widths
Dots: no
Loop: no
Autoplay: no
Swipe: yes
Free drag: yes
Partial next card: yes

Route: `/`
Section: Hero
Desktop slides visible: 1
Tablet slides visible: 1
Mobile slides visible: 1
Gap: 0
Arrows: not used
Dots: yes (6)
Loop: yes
Autoplay: ~4s
Swipe: yes
Free drag: yes
Partial next card: no

Route: `/`
Section: Category circles
Desktop slides visible: 6
Tablet slides visible: 4
Mobile slides visible: 3
Gap: 16–24
Arrows: desktop custom
Dots: no
Loop: no
Autoplay: no
Swipe: yes
Free drag: yes
Partial next card: no on desktop row

Route: `/`
Section: Product rails (Fresh Produce, Bakery, Bestsellers, Pantry Perks)
Desktop slides visible: 4
Tablet slides visible: ~2.2–3.2
Mobile slides visible: ~1.35
Gap: 32 desktop / 16 mobile
Arrows: desktop custom
Dots: no
Loop: no (enough slides to overflow; no loop observed as required UX)
Autoplay: no
Swipe: yes
Free drag: yes
Partial next card: yes on tablet/mobile

Route: `/`
Section: Brand value titles
Desktop slides visible: 1 (5 titles, dots on live)
Tablet slides visible: 1
Mobile slides visible: 1
Gap: n/a
Arrows: no
Dots: live yes; local fades titles
Loop: yes via interval
Autoplay: 4s
Swipe: no
Free drag: no
Partial next card: no

Route: `/`
Section: Festive gift portraits
Desktop slides visible: ~3
Tablet slides visible: ~2.2
Mobile slides visible: ~1.2
Gap: 24
Arrows: desktop custom
Dots: no
Loop: no
Autoplay: no
Swipe: yes
Free drag: yes
Partial next card: yes

Route: `/gifting/`
Section: Hero
Desktop slides visible: 1
Mobile slides visible: 1
Gap: 0
Arrows: no
Dots: yes
Loop: yes
Autoplay: ~4s
Swipe: yes
Free drag: yes
Partial next card: no

Route: `/gifting/`
Section: Gift a Little Story / Gifting Edit
Desktop slides visible: 3–4
Mobile slides visible: ~1.2
Gap: 24
Arrows: desktop custom
Dots: no
Loop: no
Autoplay: no
Swipe: yes
Free drag: yes
Partial next card: yes

## Shop Top-Level Category Inventory

Live `/shop/` category rail (2026-09-14). Production labels and hrefs win.

| # | Label | Route | Image (CloudFront category) | Visible at desktop without swipe |
|---|---|---|---|---|
| 1 | Fresh Produce | `/shop/fruits-vegetables/` | `cat_8_032f170dc40124f1_md.webp` | yes |
| 2 | Bakery | `/shop/the-bakery/` | `cat_9_1bbc446beb4f173f_md.webp` | yes |
| 3 | Cheese | `/shop/cheese/` | `cat_38_43acc101165ed58a_md.webp` | yes |
| 4 | Pantry Perks | `/shop/pantry-perks/` | `cat_2078_89ebd8322d887de0_md.webp` | yes |
| 5 | Meat Market | `/shop/eggs-seafood-meats/` | `cat_39_5778f71486b92d85_md.webp` | yes |
| 6 | Pantry | `/shop/the-pantry/` | `cat_2803_487eee09993f84f9_md.webp` | yes |
| 7 | Dips and Spreads | `/shop/dips-spreads-batters-ferments/` | `cat_37_372696a59ab6ef25_md.webp` | yes |
| 8 | Everyday Staples | `/shop/everyday-staples/` | `cat_43_17d6d210f9a0d8f1_md.webp` | yes |
| 9 | Tea & Beverages | `/shop/tea-coffee-beverages/` | `cat_45_eeaf81505c792099_md.webp` | yes |
| 10 | Dried Fruits & Nuts | `/shop/dried-fruit-nuts-seeds/` | via `mediaFor` | swipe |
| 11 | Dairy | `/shop/milk-butter-yoghurt/` | via `mediaFor` | swipe |
| 12 | Chocolate & Sweets | `/shop/chocolates-confectionery/` | via `mediaFor` | swipe |
| 13 | Lifestyle & Diet | `/shop/healthy-alternatives/` | via `mediaFor` | swipe |
| 14 | Frozen | `/shop/frozen/` | via `mediaFor` | swipe |
| 15 | Beyond Food | `/shop/general-merchandising/` | via `mediaFor` | swipe |

Shop All composition (not a generic PLP): centered 9-up category Swiper, progress 96×4, sticky Filter By Category, then stacked sections (`Fresh Produce` / `Explore More` / 6 cards in 3 columns), repeated per category. Desktop Sort is hidden; mobile Filters/Sort bar remains.

## Shop mega-menu link audit

| label | expected route | actual route | working? |
|---|---|---|---|
| SHOP (desktop text) | `/shop/` | `/shop/` | yes — Link, click navigates |
| Shop All | `/shop/` | `/shop/` | yes — mega + mobile |
| Fresh Produce | `/shop/fruits-vegetables/` | `/shop/fruits-vegetables/` | yes |
| Bakery | `/shop/the-bakery/` | `/shop/the-bakery/` | href live, not re-clicked this pass |
| Cheese | `/shop/cheese/` | `/shop/cheese/` | href live, not re-clicked this pass |
| Pantry Perks | `/shop/pantry-perks/` | `/shop/pantry-perks/` | href live, not re-clicked this pass |
| Meat Market | `/shop/eggs-seafood-meats/` | `/shop/eggs-seafood-meats/` | href live, not re-clicked this pass |
| Pantry | `/shop/the-pantry/` | `/shop/the-pantry/` | href live, not re-clicked this pass |
| Dips and Spreads | `/shop/dips-spreads-batters-ferments/` | `/shop/dips-spreads-batters-ferments/` | href live, not re-clicked this pass |
| Everyday Staples | `/shop/everyday-staples/` | `/shop/everyday-staples/` | href live, not re-clicked this pass |
| Tea & Beverages | `/shop/tea-coffee-beverages/` | `/shop/tea-coffee-beverages/` | href live, not re-clicked this pass |
| Dried Fruits & Nuts | `/shop/dried-fruit-nuts-seeds/` | `/shop/dried-fruit-nuts-seeds/` | href live, not re-clicked this pass |
| Dairy | `/shop/milk-butter-yoghurt/` | `/shop/milk-butter-yoghurt/` | href live, not re-clicked this pass |
| Chocolate & Sweets | `/shop/chocolates-confectionery/` | `/shop/chocolates-confectionery/` | href live, not re-clicked this pass |
| Lifestyle & Diet | `/shop/healthy-alternatives/` | `/shop/healthy-alternatives/` | href live, not re-clicked this pass |
| Frozen | `/shop/frozen/` | `/shop/frozen/` | href live, not re-clicked this pass |
| Beyond Food | `/shop/general-merchandising/` | `/shop/general-merchandising/` | href live, not re-clicked this pass |


Values below are measured from computed styles, sitemaps, accessibility snapshots, or screenshots. If a number was not measured, it is marked unknown and listed in `docs/open-questions.md`.

No UI was implemented in this phase.

---

## 1. Route inventory

See `docs/route-map.md` for the full template map.

Public sitemap totals:

- 21 core/content URLs (`/sitemap.xml`)
- 253 shop category URLs
- 2701 shop product URLs
- 141 recipes
- 32 stories (`article` 9, `hierarchical` 19, `listicle` 4)

Header destinations (exact hrefs):

| Label | href |
| --- | --- |
| SHOP | `/shop/` |
| GIFTING | `/gifting/` |
| BULK GIFTING | `/bulk-gifting/` |
| STORIES | `/stories/` |
| RECIPES | `/recipes/` |
| ABOUT US | `/about-us/` |
| SERVICES | `/services/` |

`robots.txt` disallows `/admin/`, `/account/`, `/checkout/`.

---

## 2. Page-template inventory

Distinct templates observed (not one page per SKU):

| Template | Evidence |
| --- | --- |
| `home` | Long scrolling marketing + commerce homepage |
| `shop-listing` | `/shop/fruits-vegetables/`, `/shop/healthy-alternatives/` share chrome; filter options change |
| `shop-product` | `/shop/product/hass-avocado-ripe/` gallery + purchase column + FAQ |
| `gifting-landing` | `/gifting/` editorial, not a PLP |
| `gifting-listing` | `/gifting/all-gifts/` + occasion/type/price nests |
| `gifting-product` | `/gifting/product/:slug/` — Gift Now language; inspect separately from shop PDP |
| `gifting-builder` | `/gifting/build-your-own-box/select-box/` |
| `recipe-landing` | `/recipes/` — Type A. H1 Stories to Cook, Fresh from Kitchen rail, What’s Cooking, A Season to Savour, Autumn Feasts, Discover Recipes |
| `recipe-listing` | `/recipes/list/` — Type B. Home/Recipes/List, Filter By Category (Brunch, Lunch Ideas, Easy Dinners, Quick Bites, Dessert), N Recipes Available, portrait cards |
| `recipe-detail` | `/recipes/:slug/` — Type C. Vimeo hero `h-144 md:h-192.5`, title then meta, instructions 3/5 + ingredients 2/5 (`flex-col-reverse` on mobile), checkboxes, Shop the Ingredients |
| `story-landing` | `/stories/` — Type D. Come, Gather Stories With Us; featured overlapping card; Stories On Our Shelves; What’s Cooking; Table Tales; Recipes Handpicked; Stories Of People; Discover All |
| `story-discover` | `/stories/discover-all/` — Type E. The Art of Entertaining + featured article + Table Tales |
| `story-detail` | `/stories/:type/:slug/` — Type F. Same chrome for article/listicle/hierarchical: H1, deck, byline, read time, Summarize with ChatGPT/Perplexity/Claude/Grok, ~46rem body. Hierarchical/truffle uses H2 sections + Related Articles. Live remapped `/stories/hierarchical/truffle-101/` → `/stories/article/everything-you-want-to-know-about-truffle/` |
| `about` | `/about-us/` — Type G. Banner hero + three chapters + Our Stories values + shop/stories splits |
| `services` | `/services/` — Type H. Banner + three alternating service rows. No service-detail routes |
| `editorial` | `/contact-us/`, `/kitchen-studio/`, `/policies/:slug/` |
| `bulk-gifting` | `/bulk-gifting/` — hero + 7-step enquiry, not a generic editorial page |
| `faq` | `/faqs/` + topic children |
| `store-locator` | `/store-locator/` |
| `form` | `/form/personal-shopper/` |
| `search-results` | `/search-results/?query=` |

`/category/:slug/` exists as a homepage Explore More target. Same listing template as `/shop/:slug/`; crumbs omit Shop.

Phase 9 live reinspect (homepage at ~1046 CSS px): section order unchanged — category circles (still includes Dried Fruits & Nuts), Fresh Produce / Bakery / Bestsellers rails, Step Into Foodstories, Many Ways, brand-value titles, Pantry Perks, login prompt, SEO, subscribe. Product SKU lists on live rails drifted with inventory; local fixtures stay as captured. Unknown live URLs still redirect home.

---

## 3. Global component inventory

Repeated, independently interactive, or site-wide:

- Announcement ticker (Slick): “Free shipping on every order!”, “Cash on Delivery Available”, “Call or WhatsApp 9004171401 for any query”
- Site header (sticky)
- Wordmark + tagline “COME FIND YOURSELF” (`Black_FS_Logo`, displayed 176×42 at 1440)
- Location control (“Fetching Location” while pending)
- Search pill + Popular Searches + Trending Products rail
- Shelf (wishlist)
- Login
- Cart
- Desktop nav (7 items)
- SHOP mega menu (3 columns, scrollable L1, View All)
- Breadcrumbs (`Home • Shop • …`, PDP `Shop • Product`)
- Circular category chip / rail
- Product card
- Product badges
- Unit / variant dropdown on cards
- Sort control
- Filter sidebar (desktop) / Filters + Sort pair (mobile classes present)
- Product grid + infinite scroll (`pageIndex`)
- Explore More / Discover All
- Add to Cart / Gift Now (wine pill)
- WhatsApp FAB (50×50, `fixed`, `rounded-full`, `z-20`, `bottom-20` / `md:right-16`)
- Cookie line in footer
- Newsletter “Subscribe for More Tasty Tales”
- Footer
- Toast region (`Toastify`)
- Accordion (PDP FAQ, likely elsewhere)
- Store discovery (“Step Into Foodstories”)

Do not create extra wrapper components until a pattern repeats.

---

## 4. Header behavior

Re-audited 2026-09-13 (scroll + theme). Live uses two independent concerns:

- **Theme:** overlay at page top (`nav` `bg-transparent text-white`, `White_FS_Logo`, search/location `bg-black/40`). Switches to light at ~90–100px (`bg-white text-black`, `Black_FS_Logo`, search/location `bg-black/5`, placeholder `#89898B`). Shop / About start light. No shadow. `transition-none` on theme.
- **Nav row (not the whole bar):** scroll down → `md:max-h-0 md:-translate-y-6 md:opacity-0` (compact ~110px). Scroll up or top → `md:max-h-full md:translate-y-0` (~154px with announcement). Transition `0.15s cubic-bezier(0.4,0,0.2,1)` on max-height/transform/opacity. Announcement stays sticky with the header; it is not tied to hide/show.
- Sticky wrapper: `sticky top-0 z-20`.

Measured at 1440×900:

- Sticky wrapper: `sticky top-0 w-full z-20`, height **110px**, computed background transparent
- Logo image: **176×42**, `object-cover`, left
- Search: `#searchBar`, class includes `rounded-[3.75rem] px-7.5 py-3 pl-10`, computed radius **60px**, fill `oklab(0.341436 0.000978306 -0.00330403 / 0.05)` (5% charcoal) in one read; screenshot shows a solid taupe/brown pill — re-sample the visible search surface before tokens
- Nav links: Gilroy **14px / 500 / 20px line-height**, class `md:text-sm font-medium`, color `rgb(56, 56, 58)`, no text-transform in computed style (labels are authored uppercase)
- Active section: RECIPES on recipe detail rendered wine/red (same family as `rgb(160, 56, 63)`)
- Announcement sits above the sticky block; 16px / 400 Gilroy

SHOP mega menu (click, 1440):

- Full-width white panel under the nav
- Three columns with vertical hairline dividers
- Column 1 L1 list; active item wine + chevron
- Column 2 L2 (Fruits, Vegetables, View All)
- Column 3 L3 (Avocado, Berries & Grapes, … View All underlined)
- L1 continues below the first fold: Chocolate & Sweets, Lifestyle & Diet, Frozen, Cuisines, Beyond Food
- No promotional image cards in the inspected state

Location / search-open / mobile drawer: not visually captured. See open questions.

---

## 5. Footer behavior

Measured:

- `footer.w-full.bg-black.text-white`
- Computed background **`rgb(56, 56, 58)`** (the `bg-black` token is this charcoal, not `#000`)
- Computed height **850px** at ~900px-wide session; re-measure at 1440
- Radius 0, no box-shadow
- Columns / blocks observed in the accessibility tree:
  - Nav: Shop Online, Gifting, Stories, Recipes, Services, About Us, Contact Us
  - Policies: Shipping, Return and Refund, FAQs, Weekend of Plenty T&C
  - Call Us — Mon–Sun: 10 am to 8 pm — `tel:+919004171401`
  - WhatsApp Us
  - Book an Appointment → `/form/personal-shopper/`
  - Store Locator → `/store-locator/`
  - App Store + Google Play
  - Privacy Policy, Sitemap
  - FACEBOOK / INSTAGRAM / YOUTUBE (uppercase)
  - “For an elevated experience, download our app.”
  - `© 2026 Foodstories Pvt. Ltd. All rights reserved.`
  - Cookie sentence + cookie policy link

---

## 6. Typography inventory

**Do not default to Inter.** Live loaded families (from `document.fonts` + `/_next/static/media`):

| Token candidate | Live family | Weights seen |
| --- | --- | --- |
| `--font-body` / UI | `gilroy` | 400, 500, 600, 700 |
| `--font-display` (PDP title, subscribe) | `russolo` | 400, 600 |
| editorial / display extras | `ivyPrestoDisplay`, `ivyPrestoHeadline`, `ivyPrestoText` | 100, 300, 400, 600 |
| | `ivyOraDisplay`, `ivyOraText` | 100, 300, 400, 500 |
| | `ivyJournal` | 100, 300, 400, 600 |
| script/hand | `handlee` | 400 |

Measured roles (1440 unless noted):

| Role | Family | Size | Weight | Line-height | Notes |
| --- | --- | --- | --- | --- | --- |
| Body / html | gilroy | 16px | 400 | 24px | color `rgb(56, 56, 58)` |
| Announcement | gilroy | 16px | 400 | 24px | |
| Nav | gilroy | 14px | 500 | 20px | authored caps |
| Product card title | gilroy | 18px | 600 | 28px | `line-clamp-2`, `md:text-lg` |
| PLP H1 | gilroy | 35px (`lg:text-[2.1875rem]`) | 700 | — | also `text-[1.625rem]` below lg |
| Rail H2 (“Fresh Produce”) | gilroy | 30px (`lg:text-3xl`) | 700 | 36px | `text-[1.625rem]` below lg |
| “Step Into Foodstories” | gilroy | 28px (`md:text-[28px]`) | 700 | 28px (100%) | |
| “Many Ways to Eat…” | gilroy | 36px (`md:text-4xl`) | 700 | 40px | white on `bg-black` |
| Brand-value H2 | gilroy | 35px | 700 | 52.5px | |
| Gifting landing H2 | gilroy | 36px | 700 | — | “GIFT A LITTLE STORY TO SAVOUR” |
| Gift type H3 | gilroy | 18px | 700 | — | |
| Shop PDP H1 | russolo | 36px (`text-4xl`) | 600 | — | **uppercase** |
| Subscribe H2 | russolo | 64px (`lg:text-[4rem]`) | 600 | 64px | white; `text-[2.5rem]` / `leading-10` below lg |
| SEO home H1 | gilroy | 24px | 700 | 32px | “Foodstories - Finest Gourmet Grocery Store”, low on page |
| Primary CTA | gilroy | 14px | 700 | 20px | white on wine |
| Filter H4 | gilroy | ~18px (`text-lg`) | 600 | — | “Filter By Category” |

Hero headline family/size: **unverified**. Ivy faces are loaded and likely used; do not assign Gilroy or Inter until re-measured at scrollY 0.

---

## 7. Color inventory

Measured computed colors only:

| Token candidate | Value | Where |
| --- | --- | --- |
| `--color-text` | `rgb(56, 56, 58)` | body, headings, nav |
| `--color-page` | unknown (body is transparent; screenshots are warm cream) | see open questions |
| `--color-surface` | white / cream on cards and mega menu | screenshot |
| `--color-accent` | `rgb(160, 56, 63)` | Add to Cart, active nav, mega active, progress bar |
| `--color-accent-contrast` | `rgb(255, 255, 255)` | CTA label, dark-section type |
| footer surface | `rgb(56, 56, 58)` | `bg-black` |
| badge dark | near-black pill | “1.25x Bigger”, “Ideal for Dessert” |
| badge clay | taupe / clay pill | “Bestseller”, “In Season” |
| search fill | 5% charcoal `oklab(...)` and/or solid taupe | conflicting reads — re-sample |
| veg indicator | green dot on PDP | screenshot |

No extra gradients, glass, or neon on the inspected surfaces. Search class includes `backdrop-blur-xs` — only keep if the open search surface actually blurs.

---

## 8. Spacing / container observations

From live class names (Tailwind), not guessed:

- Listing container: `mx-auto px-3 lg:max-w-7xl lg:px-2` (7xl = 80rem / 1280px in default Tailwind)
- Store section: `mx-auto lg:max-w-360` (confirm whether this project’s Tailwind maps `360` to 90rem)
- Page gutters: `px-3` default, `lg:px-2` on the 7xl container
- Product grid: `grid-cols-2 gap-x-4 gap-y-6` → `md:grid-cols-3 md:gap-x-6 md:gap-y-8`
- Listing shell: `relative grid grid-cols-2 gap-1 lg:grid-cols-4` with sticky filter `top-36` (`max-lg:hidden`)
- Card max width in skeletons: `max-w-76.5`, card aspect `1/1.3`, image `aspect-square`
- Filter offset implies a tall header (top-36 ≈ 9rem)
- Homepage curated rail uses negative pull `-mt-[40%]` over the hero
- Shop landing skeleton uses `-mt-[8.3rem] md:-mt-46 lg:-mt-[7.8rem]`

Do not use `max-w-7xl mx-auto px-4` as an unverified default if the live node is `px-3` / `lg:px-2`.

---

## 9. Responsive breakpoint observations

Evidence from classes, not a full 7-viewport matrix:

- `max-md` / `md:` — product ATC visibility, some rails hide (`max-md:hidden` vs `md:hidden`)
- `md:grid-cols-3` — product grid becomes 3 columns
- `lg:grid-cols-4` — listing canvas (filter + results)
- `lg:invisible` — card CTA hidden on large
- `max-lg:hidden` — desktop filter / sort
- `max-[403px]:text-[1.65rem]` — PDP title shrink
- Circular chips: `max-w-25` → `sm:max-w-58 md:max-w-62 lg:max-w-69.5` in skeletons

Required screenshot matrix is **not complete**. Run `scripts/capture-reference.ts` before Phase 2.

---

## 10. Animation inventory

Observed, timing **not** measured:

| Motion | Trigger | Tool likely |
| --- | --- | --- |
| Announcement ticker | auto | Slick |
| Hero carousel + dots | auto / swipe / dots | Slick or similar |
| Product / category rails | prev/next, swipe | Slick (`slick.woff` preloaded) |
| Search placeholder rotation | auto | JS |
| Mega menu presence | click/hover on SHOP | overlay; duration unknown |
| Loading skeletons | route change | `loading-color-transition` |
| CTA hover | hover | `hover:opacity-90` (CSS) |
| Disabled CTA | disabled | `disabled:opacity-70` |

Not observed on homepage in this pass: GSAP pinned/scrubbed sections, ubiquitous fade-up, parallax, bounce.

Default for implementation: CSS for hover/opacity; Motion for drawers/menus/accordions; GSAP only if a later film shows a timeline or scroll-linked effect.

---

## 11. Image / asset inventory

- Logo: `/_next/static/media/Black_FS_Logo.c10577bb.png` (source 288×69, display 176×42)
- Catalog images: CloudFront `https://d3lhyaytnudnz3.cloudfront.net/fs_/media/catalog/product/...` webp
- Product card image: square, object cover, light radius (`rounded-md` on skeletons)
- Homepage hero: full-bleed still life, cream ground, subject-centered
- Category chips: circular crop (`rounded-full aspect-square`)
- PDP main image: large square/near-square on white
- Recipe detail: full-bleed **video** hero with native-style controls
- Do not hotlink production assets in a public deploy. Cache locally only if project rights allow (`public/assets/...`)

Aspect notes to preserve:

```ts
{ referenceAspectRatio: "1 / 1", cropBehavior: "cover" } // product card image
{ referenceAspectRatio: "1 / 1.3", cropBehavior: "unknown" } // card skeleton including meta
{ referenceAspectRatio: "1 / 1", cropBehavior: "cover" } // category circle
```

Hero and store-section crops: re-measure per slide.

---

## 12. Recurring cards / sections

### Product card (shop / home rails)

- Square photo, no elevated card chrome, no drop shadow
- Badges overlay the image (stacked pills). Observed labels: Bestseller, Chef's Special, Limited Stock, Foodstories Exclusive, In Season, Ideal for Dessert, Halal, Perfect for Smoothie, Buttery Crunch, 1.25x Bigger, Moist Texture, Pantry Perks, Organic (as content, not always a chip)
- Dark pills vs clay pills — do not unify
- Title 2-line clamp
- Price `₹` with compare-at + “N% OFF” when discounted
- Unit right-aligned, often a combobox (125gm, 250gm, 1 pc, Serves N)
- Desktop: no persistent ATC in 1440 PLP capture
- Mobile class path: full-width wine pill `min-h-12` `rounded-[4.75rem]` in skeletons

### Gift card

- Gift Now instead of Add to Cart on gifting rails/landing

### Homepage sections (live order, 1440 scroll map)

1. Announcement ticker
2. Header
3. Hero carousel + Shop Now
4. Circular category discovery (Fresh Produce, Bakery, Cheese, Pantry Perks, Meat Market, Pantry, Fresh Meals, Dips and Spreads, Everyday Staples, Tea & Beverages, Dried Fruits & Nuts, Dairy)
5. Trending / search product rail (also present in search overlay DOM)
6. Fresh Produce rail
7. Fresh From The Bakery rail
8. Bestsellers rail
9. Step Into Foodstories (store discovery, `py-6 md:py-10`)
10. Many Ways to Eat, Your Way to Shop — `dark-section bg-black`, 3-col `md:grid-cols-3` tiles: Gluten Free, Vegan, Gifting, Party, Pantry Picks, Barbeque Essentials
11. Brand-value statements (carousel/overlap): Storytellers Come Together, Curated by the Curious, Devoted to the Details, Guardians of Great Taste, The Complete Basket
12. Pantry Perks rail
13. Timeless Festive Picks
14. No Two Foodstories are the Same
15. Subscribe for More Tasty Tales (Russolo)
16. SEO H1 / body copy
17. Footer
18. WhatsApp FAB + cookie line

Do not reorder.

---

## Homepage Current Section Order

Reinspected 2026-09-13 on https://www.foodstories.shop/ at 1440×900 and 430×932. Live page height ~9926px at 1440.

1. Announcement ticker + Header (global shell)
2. Hero banner slider
3. Category discovery grid
4. Fresh Produce product rail
5. Fresh From The Bakery product rail
6. Bestsellers product rail
7. Step Into Foodstories
8. Many Ways to Eat, Your Way to Shop
9. Brand values (Storytellers / Curious / Details / Guardians / Complete Basket)
10. Pantry Perks product rail
11. Timeless Festive Picks
12. No Two Foodstories are the Same
13. SEO copy (`Foodstories - Finest Gourmet Grocery Store`)
14. Subscribe for More Tasty Tales
15. Footer + WhatsApp FAB + cookie line

No standalone “trending products” band on the page itself (that rail lives in the search overlay). Hero slides are the CTA — no separate circular Shop Now on the current banners.

### Hero banner slider

Reference:
- desktop structure: `.home-slider` slick, full-bleed image 1440×720, wrapper ~727px, starts under announcement (y≈29). 5 slides. Whole slide is an `<a>` to a shop path. Dots 20×20 at y≈700, centered.
- mobile structure: same slider, height **437px** at 430.
- background: transparent over cream page; image is the surface
- container: full viewport width, `rounded-none object-cover`
- columns: 1
- image behavior: `object-cover` 50% 50%; desktop/mobile srcset pairs per slide
- typography: none on the current slides (type is in the artwork)
- CTA: slide hrefs — pantry-perks, stone-fruits, avocado-guacamole-essentials, dates, the-bakery/boulangerie
- carousel behavior: slick auto + dots; no prev/next arrows in the inspected chrome
- motion: slide change only; no GSAP
- notes: below `lg` the wrapper is essentially square (`430→437`, `768→775`). From `lg` it tracks ~`1440/727` (`1280→647`, `1440→727`). Do not hotlink CloudFront banners. Local placeholders until licensed files exist.

### Category discovery grid

Reference:
- desktop structure: `grid grid-cols-3 gap-4 lg:grid-cols-6 lg:gap-6 limit-items` in `mx-auto px-3 lg:max-w-7xl`. 12 items, two rows of six. Circle **155×155** `rounded-full object-cover`, label under, `gap-y-3`. Discover All `btn link-btn rounded-none p-0 max-lg:hidden`.
- mobile structure: 3 columns, circle **100×100**. `limit-items` hides items 7–12 below **1280px** (still hidden at 1024; 12 visible at 1280). Discover All `max-lg:hidden`. At 768 circles fill the 3-col cell (**237×237**).
- background: page cream
- container: `lg:max-w-7xl lg:px-2 carousel`
- columns: 6 desktop / 3 mobile
- image behavior: circular crop
- typography: category name under the circle
- CTA: each tile is a link; Discover All → `/shop/` (href not on the node; destination assumed from label)
- carousel behavior: **grid**, not a horizontal rail
- motion: none
- notes: labels/hrefs verified: Fresh Produce `/shop/fruits-vegetables/`, Bakery `/shop/the-bakery/`, Cheese `/shop/cheese/`, Pantry Perks `/shop/pantry-perks/`, Meat Market `/shop/eggs-seafood-meats/`, Pantry `/shop/the-pantry/`, Fresh Meals `/shop/meals-on-the-go/`, Dips and Spreads `/shop/dips-spreads-batters-ferments/`, Everyday Staples `/shop/everyday-staples/`, Tea & Beverages `/shop/tea-coffee-beverages/`, Dried Fruits & Nuts `/shop/dried-fruit-nuts-seeds/`, Dairy `/shop/milk-butter-yoghurt/`

### Product rail (Fresh Produce / Bakery / Bestsellers / Pantry Perks)

Reference:
- desktop structure: H2 `px-3 text-center text-[1.625rem] font-bold lg:text-3xl` (30px/700/36lh). Card `block space-y-2`, **292×369**, image **292×292** `rounded-lg object-cover`. Title + `₹` price + unit. Badges on image. Explore More `font-bold text-fig underline` to `/category/…`. Wrapper `carousel max-lg:px-0`.
- mobile structure: same card primitive, horizontal slick/overflow; H2 26px (`text-[1.625rem]`)
- background: page cream
- container: `mx-auto px-3 lg:max-w-7xl lg:px-2`
- columns: horizontal rail (~4 visible at 1440)
- image behavior: square cover, 12px radius
- typography: card title `text-sm md:text-lg font-semibold` 18px/600/28lh
- CTA: no persistent desktop ATC; Explore More under the rail
- carousel behavior: slick on live; native overflow-x is acceptable if it matches geometry
- motion: none beyond slide
- notes: Bestsellers H2 is left-aligned (`px-3` without `text-center`). Explore More targets: fruits-vegetables, baked-today, bestseller-delhi, pantry-perks.

### Step Into Foodstories

Reference:
- desktop structure: H2 `font-bold text-[22px] md:text-[28px] leading-[100%]`. Subcopy: “Explore our city stores, each crafted for delicious finds and everyday indulgence.” Store cards image ~243×179. Background plate `/images/store-locator-bg.png`.
- mobile structure: stacks; mweb bg `/images/store-locator-bg-mweb.png`
- background: store plate image
- container: section `py-6 md:py-10` (class from earlier audit)
- columns: horizontal store cards
- image behavior: store photos
- typography: 28px/700 desktop, 22px mobile
- CTA: cards / store locator
- carousel behavior: horizontal row
- motion: none
- notes: names from live alts — Bandra, Mumbai; Lokhandwala, Mumbai; Lavelle Road, Bengaluru; Ambience Mall, Vasant Kunj, New Delhi; Banjara Hills, Hyderabad. Do not invent cities.

### Many Ways to Eat, Your Way to Shop

Reference:
- desktop structure: `.dark-section.bg-black` computed `rgb(56,56,58)`, ~768px. H2 `px-3 text-center text-2xl font-bold text-white md:text-4xl` (36px/700/40lh). 6 tiles: Gluten Free, Vegan, Gifting, Party, Pantry Picks, Barbeque Essentials. Label `text-[0.875rem] font-[550] leading-4.5 text-white md:text-base`.
- mobile structure: same dark band, height ~736
- background: charcoal
- container: full bleed
- columns: `md:grid-cols-3` — left stack (Gluten Free, Vegan), center **Gifting 397×600**, right stack (Party Pantry Picks, Barbeque Essentials). Five tiles, not six.
- image behavior: tile fills the cell; desktop `h-72`, mobile `h-48`; Gifting spans two desktop rows
- typography: white
- CTA: tile is the link
- carousel behavior: none
- motion: none
- notes: hrefs — gluten-free-range, vegan, `/gifting/`, pantry-perks (Party Pantry Picks), `/category/your-meat-and-fish-essentials/` (Barbeque).

### Brand values

Reference:
- desktop structure: overlapping H2s `px-3 text-[1.625rem] font-bold lg:text-[2.1875rem]` 35px/700/52.5lh: Storytellers Come Together, Curated by the Curious, Devoted to the Details, Guardians of Great Taste, The Complete Basket. Desktop video 1264×496, autoplay muted loop (`Desktop+-+Guardians+of+great+taste.mp4`).
- mobile structure: mobile video file exists but computed 0×0 at 1440; use mobile mp4 below lg
- background: page / video
- container: 7xl
- columns: copy + media
- image behavior: video object-cover
- typography: Gilroy 35/700
- CTA: none observed
- carousel behavior: titles overlap (slick/absolute)
- motion: video loop only; no ScrollTrigger
- notes: do not hotlink the S3 mp4 in public deploys. Placeholder surface until rights exist.

### Timeless Festive Picks

Reference:
- desktop structure: H2 same 30px rail style, centered. Gift tiles `max-w-71.5`, title `line-clamp-2 px-5 text-center text-white lg:text-2xl font-semibold`, Gift Now wine pill.
- mobile structure: horizontal set of gift tiles
- background: photography (dark overlay for white type)
- container: carousel-and-link
- columns: horizontal
- image behavior: cover, title over image
- typography: white 24px/600
- CTA: Gift Now
- carousel behavior: slick on live
- motion: none
- notes: products from live — Verses of Tea and Light Hamper, The Ode to Longevity Wellness Hamper, Letters From Thailand Fruit Hamper, The Everyday Nut Trio Box, Epicurean Bounty, Regal Dry Fruit Tray, The Zen of Matcha Hamper, Dried Fruits Delights Gift Tray, Nuts and Berries Dry Fruit Box.

### No Two Foodstories are the Same

Reference:
- desktop structure: H2 35px/700. Copy “Login for a delightfully personalised experience!” + Login.
- mobile structure: same stack
- background: cream (`login-homepage-container`)
- container: unknown exact padding
- columns: 1
- image behavior: none isolated
- typography: Gilroy
- CTA: Login (opens existing login overlay)
- carousel behavior: none
- motion: none
- notes: do not invent extra login form fields here.

### SEO copy

Reference:
- desktop structure: H1 `text-2xl font-bold mb-2` 24px/700/32lh. Body 16px, wrapper `md:line-clamp-4 max-md:line-clamp-5`, `mx-auto px-3 lg:max-w-7xl`.
- mobile structure: 5-line clamp
- background: white
- container: 7xl
- columns: 1
- image behavior: none
- typography: Gilroy
- CTA: none (clamp only)
- carousel behavior: none
- motion: none
- notes: live H1 “Foodstories - Finest Gourmet Grocery Store”. Appears **above** Subscribe.

### Subscribe for More Tasty Tales

Reference:
- desktop structure: H2 Russolo 64px/600/64lh white, `lg:text-[4rem]`, `text-[2.5rem] leading-10` below lg. Row `flex flex-col pt-12 lg:flex-row lg:justify-between lg:py-24`. Email + Join.
- mobile structure: centered, 40px heading
- background: dark (same family as footer/subscribe art)
- container: `mx-auto lg:max-w-7xl px-[2.4rem]`, band `max-h-83.5 lg:max-h-91`
- columns: heading left, field right on lg
- image behavior: background art unknown without licensed asset
- typography: Russolo / Fraunces substitute
- CTA: Join
- carousel behavior: none
- motion: none
- notes: placeholder dark band; do not invent extra marketing lines.

---

## 13. Drawers / modals / overlays

Present in DOM or classes; open-state visuals not fully filmed:

- SHOP mega menu (full-width overlay)
- Search + Popular Searches + Trending Products
- Location control
- Login
- Cart
- Shelf
- Mobile Filters / Sort (`flex-1` pair, `max-lg` path)
- Cookie consent (footer sentence, not a centered modal in the snapshot)
- Toastify
- FAQ accordion (PDP)
- Read more (PDP description)

ESC / focus-trap behavior: not tested.

---

## 14. Shop filtering behavior

Shared listing chrome:

- Breadcrumb with middots
- Centered H1 (category marketing name, not always the URL slug)
- Optional circular sub-category scroller + wine/gray indicator
- “N Products Available” + Sort
- Desktop: sticky left filter (`top-36`)
- Mobile: Filters + Sort buttons
- Grid 2 → 3 columns
- Infinite scroll + `?pageIndex=`

Per-category filter examples actually seen:

| Route | H1 | Filter heading | Options |
| --- | --- | --- | --- |
| `/shop/fruits-vegetables/` | Fresh Produce | Filter By Category | Fruits, Vegetables |
| `/shop/healthy-alternatives/` | Lifestyle & Diet | Filter By Category | Vegan, Gluten-Free Range, Organic, Diet Swaps, Bio-Hacking, + More |

Possible additional group titles from RSC (not all visible on those two pages): Filter By Lifestyle, Filter By Texture, Filter By Flavour, Food Origin, Non-Veg Popularity Tag.

Architecture: one listing template + per-category filter config. Do not duplicate the page.

---

## 15. Product detail behavior (shop)

`/shop/product/hass-avocado-ripe/`:

- Breadcrumb: Shop • Product
- Large gallery, veg green-dot, share
- Thumbnail row with previous/next
- Badges: Perfect for Smoothie, Bestseller
- H1 Russolo uppercase 36px / 600
- Short description + Read more
- Price as H2 `₹ 400`
- “MRP (Inclusive of all taxes)”
- Unit “1 pc”
- How to Enjoy
- We Love This in (recipe names)
- Ideal For (Keto chip)
- More Product Information (Brand, Shelf Life)
- Add to Cart wine pill `min-h-12` radius 28.8px
- Great Stories Deserve Great Recipes
- FAQ accordion (10 questions on this SKU)
- Subscribe + footer

Sticky purchase column / mobile bottom bar: not confirmed.

---

## 16. Gifting behavior

`/gifting/` is editorial:

- Display line “GIFT A LITTLE STORY TO SAVOUR”
- Type tiles: Chocolates & Sweets, Dry Fruits, Cheese & Grazing Boxes, Fruit Baskets, Snacking Hampers, Tea & Coffee Hampers
- Gift by occasion + gifts by type + INR bands (see route map)
- Build your own box
- Gift Now CTAs
- Personalize Your Gift
- Personalisation & Monogramming — “Your mark in every detail.”
- Gift a story of the season
- Discover All / Explore More

`/gifting/all-gifts/` is the listing template.  
`/gifting/product/:slug/` and `/bulk-gifting/` need their own visual pass before sharing shop PDP/listing components.

---

## 16b. Gifting architecture (Phase 6, 2026-09-13)

Classified from live Foodstories (not invented):

| Type | Route | Template |
| --- | --- | --- |
| A — editorial landing | `/gifting/` | Distinct. Title: `Buy Gourmet Gift Hampers Online \| Foodstories`. Solid white header. No subscribe. |
| B — gift listing | `/gifting/all-gifts/` + occasion/type/price nests | Shop-listing chrome. H1 **All Hampers**. CTA **Gift Now**. Filters: Gift by Occasion / Gift by Type / Gift By Price. |
| C — gift product | `/gifting/product/:slug/` | Not shop PDP. Crumb Gifting • Product. Includes list, favourite accordion, personal-message checkbox, reassurance, safe-checkout, concierge tel/WhatsApp, Gifting Edit, “Gifting, the Foodstories way”, FREQUENTLY ASKED QUESTIONS, Subscribe. |
| D — bulk/corporate | `/bulk-gifting/` | Distinct. Title: `Bulk Corporate Gifting by Foodstories`. |
| E — enquiry | 7-step wizard on `/bulk-gifting/` | Observed steps: city, occasion, quantity, dietary, budget, date (“When is the big day?” / Select Date). Step 7 field labels not fully captured. |
| Builder | `/gifting/build-your-own-box/select-box/` | Linked from “Create Your Own”. Interior not fully inspected. |

`/gifting/` section order (1440): occasion chips → hero carousel (no H1, ~727px, 1440×720, 3 slides) → cream ticker → type tiles (3 / 6) → dew gift rail → price ribbons → personalize split → velvet ribbon → Gifting Edit tabs → season + catalogue/WhatsApp → store cards (no homepage heading) → FAQ.

Bulk section order: hero/form (`bg-[#F9F8F7]`, `md:min-h-screen`) → TRUSTED BY / Chosen by 500+ tastemakers → 6 benefits → Celebrations, Curated Generously → BULK GIFTING, SIMPLIFIED (4 steps) → refund note → Packed With Love (6 packs) → YOU ASK. WE'VE GIFTED THAT. (FAQ tabs; Bulk Gifting selected).

Motion: CSS hover, 300ms step dots, 4s hero, ticker. No GSAP / pinned sections observed.

Header on gifting/bulk is solid charcoal, not inverted.

---

## 17. Recipe + stories + about + services (Phase 7)

### Type A — `/recipes/`

Title: `Explore Gourmet Recipes by Foodstories`. Banner `h-108 md:h-[65vh]` overlay. H1 Russolo `text-[2.5rem] xl:text-6xl` “Stories to Cook”. Intro Gilroy `w-[70%] text-base`. Section: Fresh from the Foodstories Kitchen (`bg-linear-to-b from-[#FBF3F2]`, H3 Gilroy `text-2xl md:text-4xl`). What’s Cooking this Week (product + recipe mix). A Season to Savour. Autumn Feasts. Discover Recipes → `/recipes/list/`. Subscribe.

### Type B — `/recipes/list/`

Same document title. Breadcrumb Home · Recipes · List. Filter By Category checkboxes (`accent-fig`, Gilroy). Visible: Brunch, Lunch Ideas, Easy Dinners, Quick Bites, Dessert + More. “166 Recipes Available”. Cards `aspect-102/173 bg-[#f6f6f6] p-4 rounded-md`, mobile `max-sm:aspect-125/224`. Title + Cook Time. Infinite scroll (no numbered pager). Heart/share on cards.

### Type C — `/recipes/whipped-avocado-toast/`

Title: `Whipped Avocado Toast Recipe | Foodstories`. Hero custom Vimeo `h-144 md:h-192.5` (local uses framed placeholder; do not hotlink Vimeo). Then H1 Russolo `text-4xl md:text-6xl`. Meta: `Cooking Time: 30 minutes | Difficulty: Easy` / `American | Brunch | By Team Foodstories`. Heart + share. Instructions `md:basis-3/5` labelled groups + ordered steps. Ingredients `md:basis-2/5` `rounded-lg bg-[#edeae980] p-8`, Serves 2, checkboxes (Cream Cheese disabled). Shop the Ingredients disabled. Mobile `flex-col-reverse` (ingredients first). Come write yours. Subscribe.

### Type D / E — stories

Landing title: `Ingredients, Recipes & Inspiring Food Tales | Foodstories`. Featured: `h-[70vh]` grayscale image + overlapping `bg-slate-50 -mt-24 lg:w-4/6` card. Shelves heading white Russolo `text-5xl lg:text-6xl`. Cards show read time + Read Article (observed — not invented). Discover All is a themed page, not a 3-column blog index.

### Type F — story detail

Article width ~737px at 1046 (`max-w-[46rem]`). Body 16px. Interview/listicle uses bold questions, not a sidebar. Summarize chips observed. Related Articles only on Truffle 101.

### Type G / H — about + services

Shared banner chrome (white crumbs, 50% overlay). About chapters centered `my-14 lg:my-20`. Values: lead + fig accent. Services: three rows `aspect-76/51`, alternating `lg:order-last`, primary CTA pills. No `/services/:slug/` pages.

This is editorial, not a PLP. Do not reuse product-card chrome on recipe cards.

---

## 18. Mobile-specific UI

Class evidence only (screenshots pending):

- Card ATC visible below `lg`
- Filters + Sort as two equal controls
- 2-column product grid
- Smaller circular chips (`max-w-25`)
- FAB `bottom-20 right-6.5`
- Subscribe heading left-aligns at `lg`, centered + smaller above
- Header will not be “desktop minus links” — re-inspect hamburger / stacked logo / search

---

## 19. Tablet-specific UI

`md:` switches rails and grid to 3 columns; `lg:` introduces the filter column and 7xl container. 768×1024 and 1024×1366 captures are still pending. Do not interpolate.

---

## 20. Unresolved observations

All items in `docs/open-questions.md`. Highest risk before coding:

1. Hero typeface and Shop Now metrics
2. Location UI
3. Search overlay open state
4. Desktop card hover / ATC
5. Full filter-group matrix
6. Mobile/tablet header
7. Motion timings
8. Story detail variants
9. `/category/` vs `/shop/`
10. Page background cream token

---

## Buttons (catalog, measured)

| Role | Radius | Height | Type | Color | Hover |
| --- | --- | --- | --- | --- | --- |
| Add to Cart / primary | 28.8px | min 48px (`min-h-12`) | 14px / 700 / white | `rgb(160, 56, 63)` | opacity 90% |
| Gift Now | same class family on gifting cards | same | same | same | same |
| Shop Now (hero) | circular dark control | unverified | unverified | dark fill, light glyph | unverified |
| Explore More | text button, radius 0 in one sample | 28px tall sample | 16px / 400 | `rgb(56, 56, 58)` | unverified |
| Sort / Filters | text + icon | unverified | unverified | — | — |
| View All (mega) | underline | — | — | wine/black | — |

Do not convert every control into a pill.

---

## Asset / third-party notes

- Fonts are proprietary Ivy / Gilroy / Russolo files under `/_next/static/media/`
- Search is Wizzy (`wizzySource`, `wizzySearchResponseId`)
- Analytics: GTM `GTM-N9GP99Z7`, Clarity, Meta pixel — out of UI scope
- Contact: `care@foodstories.shop`, `+91-900-417-1401`
- Cities named in the homepage title: Delhi, Hyderabad, Bangalore, Mumbai

---

## PLP Architecture

Reinspected 2026-09-13 on live `foodstories.shop` at 1440×900 and 430×932. One listing template. `/category/:slug/` is the same template as `/shop/:slug/` (same title, chrome, `?pageIndex=`).

### Shared chrome (all inspected listings)

- **Breadcrumb:** `Home` → `Shop` → current. Separators are `span.block.h-1.w-1.rounded-full.bg-black` (dots), not middots. Links `text-black hover:underline`; current `hover:no-underline`. Row in `mx-auto px-3 py-4 lg:max-w-7xl lg:px-2`.
- **Hero/banner:** none. No large ecommerce hero.
- **Title:** centered H1 `px-3 text-[1.625rem] font-bold lg:text-[2.1875rem]` (26 / 35 / 700). Wrapper `flex flex-col items-center justify-center gap-y-4 text-center`.
- **Description:** none under the H1. Long SEO + “Read more” (`my-2 text-sm font-medium text-fig hover:underline`) sits **below** the grid on Fresh Produce.
- **Subcategory navigation:** circular chip rail. Link `mx-auto flex w-20 snap-start flex-col … gap-y-2 md:mt-6 md:w-28`. Circle `size-15 rounded-full bg-dew hover:border hover:border-fig` (60×60). Label `text-xs font-medium md:text-sm`. Scroll progress `h-1 w-24 rounded-lg bg-gray-100` + `bg-fig` fill, 300ms width.
- **Product count:** `{n} Products Available` — `text-lg font-semibold max-lg:text-center`.
- **Toolbar:** `relative flex justify-center pb-2 lg:justify-between` (count left, Sort right on `lg`).
- **Sort (desktop):** button `relative flex flex-row items-center font-semibold max-lg:hidden` label “Sort”. Menu `absolute right-1 top-10 z-11 flex flex-col gap-y-5 rounded-lg border border-black/20 bg-white p-6` (222×202, no shadow). Options: Relevance; By Price: High to Low; By Price: Low to High; By Name: A to Z; By Name: Z to A.
- **Filters (desktop):** sticky `top-36` (144px) `h-screen overflow-y-scroll pb-40 max-lg:hidden`, **313px**. Group `h4.mb-3.text-lg.font-semibold` “Filter By Category”. Checkboxes `h-4 w-4 rounded-lg border-2 border-black accent-fig`. Labels `text-base`. `+ More` / `- Less` `w-max cursor-pointer text-fig` after five options when the group is longer.
- **Layout:** `grid grid-cols-2 gap-1 lg:grid-cols-4` in `lg:max-w-7xl`. Filter `col-span-1`; products `col-span-2 md:col-span-3`.
- **Product grid:** `grid grid-cols-2 place-items-center gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-8`. Infinite scroll, `?pageIndex=`. ~30 items on page 1 (31 nodes observed including sentinel).
- **Card:** wrapper `group … max-w-76.5`. Image well `bg-[#fef9f8] rounded-lg`, **square**. Desktop listing card ~**300×381** (taller when ATC row is reserved, ~464 with `gap-6 md:gap-9`). Image **300×300**. Title `line-clamp-2 text-sm md:text-lg font-semibold` in `min-h-[4.6rem] md:h-14`. Price `text-sm font-bold md:text-lg` `₹400` (no space). **Sale** (observed on `/shop/`): green flag `clip-path` + `#245B43` selling price, `text-gray-400 line-through` compare-at, `|`, `{n}% OFF`. Unit combobox `text-sm` + chevron (some sale cards use a `p.font-semibold` unit). Badges stacked top-left: charcoal `#38383A` or salmon `#D48A7A` (Bestseller often salmon). **Limited Stock** is a charcoal badge. Wishlist heart `lg:invisible lg:group-hover:visible`. **Add to Cart** sibling `lg:invisible lg:group-hover:visible`, wine pill. No star ratings or hover-swap image.
- **Promotional grid cards:** none observed.
- **Active filter chips:** none. Selection is checkbox state only.
- **Mobile:** 2-col grid. Desktop Sort/sidebar `max-lg:hidden`. Fixed bar `bottom-0 z-21 h-14 border-t border-black/10 bg-white` — Filters | Sort `flex-1`. Filter sheet `fixed inset-x-0 bottom-14 max-h-[50%] overflow-y-auto rounded-t-md bg-white`.
- **Sticky:** header z-20; filter `top-36`; mobile bar `bottom-0`.
- **Motion:** sort/filter presence 300ms ease; chip indicator 300ms width; ATC `duration-200`. No GSAP. No grid entrance stagger.
- **Unusual:** ATC and wishlist are hover-revealed on `lg+`; ATC is visible in the mobile card stack (`visible` + `lg:invisible`).

### Variant: `/shop/` — Shop All

- Breadcrumb: Home • Shop (Shop is current)
- H1: Shop All
- Chips (15): Fresh Produce, Bakery, Cheese, Pantry Perks, Meat Market, Pantry, Dips and Spreads, Everyday Staples, Tea & Beverages, Dried Fruits & Nuts, Dairy, Chocolate & Sweets, Lifestyle & Diet, Frozen, Beyond Food
- Filters: Filter By Category = those 15, with + More / − Less
- Count: not captured while products were still fetching

### Variant: `/shop/fruits-vegetables/`

- H1: Fresh Produce (`text-[1.625rem] font-bold lg:text-[2.1875rem]`)
- Breadcrumb: Home • Shop • Fruits Vegetables
- Chips: Fruits → `fruits`, Vegetables → `vegetables`
- Filters: Fruits, Vegetables (no + More)
- Count: **323 Products Available**
- SEO + Read more below the grid

### Variant: `/category/fruits-vegetables/`

- Same listing chrome and `?pageIndex=` as `/shop/fruits-vegetables/`.
- Breadcrumb is **Home • Fruits Vegetables** (no Shop crumb).
- H1 class on this pass was `text-3xl font-semibold md:text-4xl` (36/600/40) — different from the `/shop/` H1. Filters on this pass listed related collections (Fresh Harvest, Hydroponics & Greens, …) rather than Fruits/Vegetables. Treat `/shop/` as the primary PLP source of truth; `/category/` shares the template with a shorter crumb.

### Variant: `/shop/healthy-alternatives/`

- H1: Lifestyle & Diet
- Chips: Vegan, Gluten-Free Range, Organic, Diet Swaps, Bio-Hacking, Keto
- Filters: Filter By Category — Vegan, Gluten-Free Range, Organic, Diet Swaps, Bio-Hacking, + More
- Count: **550 Products Available**

### Variant: nested `/shop/fruits-vegetables/fruits/` (mega L3)

- Same listing chrome. Chips from live mega grandchildren (Avocado, Berries & Grapes, …). Not a distinct template.

### Not a PLP (do not implement in this phase)

- `/shop/product/:slug/` — shop PDP (Phase 5)
- `/gifting/` and `/gifting/all-gifts/` — gifting templates

---

## Product Detail Page Architecture

Reinspected 2026-09-13 on live `foodstories.shop` at 1440×900 and 430×932. Route pattern confirmed: `/shop/product/:slug/`.

### Shared chrome

- **Breadcrumb:** `Shop • Product` only (no Home, no category). Nav `aria-label="breadcrumbs"`. Wrapper `py-4 bg-white lg:bg-transparent w-full px-3 lg:px-0 pl-6 lg:pl-0`. Same dot separators as listings. Current crumb `hover:no-underline`.
- **Layout:** `space-y-6 lg:flex lg:flex-row lg:justify-center lg:gap-x-6 lg:px-2 xl:mx-auto xl:max-w-7xl`. Gallery + details, **not** 50/50.
- **Gallery column:** `lg:sticky lg:top-32` (128px). Main frame `aspect-107/70` / `lg:aspect-4675/3087 lg:max-w-187` (~748×494 at 1440), `lg:rounded-md`, `object-cover`. Veg mark top-left (`#12B52C` square+dot). Share `rounded-full bg-white p-2` top-right (Radix dialog). Desktop thumbnail slick: `aspect-26/17` / `lg:aspect-113/73` (~358×231), prev/next. **No zoom/lightbox observed** (image is `cursor-pointer` only).
- **Details column:** `w-full space-y-6 px-4 lg:max-w-121.5` (**486px**). Order: badges → title row → description + Read more → price → MRP → unit → Add to Cart → How to Enjoy → We Love This in → optional Ingredients / Ideal For → More Product Information.
- **Badges (PDP-specific):** `flex flex-wrap gap-1 mb-4`. Peach `#E1AE88` or wine `#A13940` (Bestseller). `text-xs uppercase font-semibold text-white`, `rounded-md`. Different from PLP charcoal/salmon.
- **Title:** Russolo `text-4xl font-semibold uppercase` 36/600/40, `max-[403px]:text-[1.65rem]`. Row `flex items-start justify-around gap-x-3 mb-2` with speaker + **heart/shelf** icon buttons `rounded-full bg-[#FFFFFF99] p-2.5` (share lives on the gallery, not the title).
- **Price:** H2 `text-3xl font-semibold … leading-[31.59px]`. Current `span#price text-[1.625rem] font-bold` `₹400` (no space). Sale: green flag clip-path + `#245B43`, compare `text-base text-gray-400 line-through`, `|`, `{n}% OFF`. Then `MRP (Inclusive of all taxes)` `text-sm opacity-60`.
- **Unit:** usually `<p class="text-base text-black/60"><span id="weight">1 pc</span></p>`. Multi-option SKUs use a Headless UI listbox `text-sm text-black/60` + chevron (`1pc`).
- **Quantity:** **none** on inspected PDPs.
- **CTA:** `btn primary-btn w-full bg-fig py-[0.9rem]` (~486×53 desktop; 406×49 at 430). Wrapper `max-md:-ml-4` then `flex h-max gap-3 max-md:fixed max-md:bottom-0 max-md:z-20 max-md:w-full max-md:bg-white max-md:px-3 max-md:py-4`.
- **Reason-to-crunch:** after unit, before ATC. Horizontal snap rail of 96/112px CloudFront icons (Gut Health, Immunity Booster, Brain Fuel, Anti-Inflammatory, Rich in Antioxidants, Rich in Minerals). Image-only, `animate-bounce-x`.
- **Read more:** `underline text-sm font-medium`. Description `text-base font-medium text-[#000] line-clamp-4 sm:line-clamp-3`.
- **How to Enjoy / We Love This in / Ingredients:** H2 Russolo `text-2xl font-semibold`; body `mt-2 text-base`.
- **Ideal For:** H2 `text-lg font-semibold`; chips `bg-gray-200/50 px-3 py-2 text-xs font-bold`.
- **More Product Information:** H2 `text-lg font-semibold`; lines `Brand:`, `Shelf Life:`, optional `Country of Origin:`.
- **Recipes:** “Great Stories Deserve Great Recipes” — `text-[1.625rem] font-bold md:text-3xl` centered. Cards `aspect-102/173 bg-[#f6f6f6] p-4 rounded-md`, image `aspect-83/94`, cuisine/level badges, heart+share, Russolo title, “By Team Foodstories”, “Cook Time:”, hover `Read Recipe`. **Not** a product recommendation rail.
- **FAQs:** wrapper `mx-auto max-w-7xl pt-4 md:pt-8 px-4 md:px-0`. Heading `px-3 mb-8 text-center text-2xl font-bold lg:text-4xl`. Plus accordion, `hr.my-6.border-black/15`, answer `text-base font-medium` (hidden when closed).
- **Related products / wishlist / qty / reviews:** not present.
- **Subscribe** + footer after FAQs.

### Variant: `/shop/product/hass-avocado-ripe/` — standard produce

- Type: ripe produce, Bestseller + Perfect for Smoothie
- Gallery: many images (slick clones); main ~748×494
- Price ₹400, unit `1 pc` (text, not listbox)
- How to Enjoy / We Love This in / Ideal For: Keto / Brand Foodstories / Shelf Life 3 Days
- 9 FAQs (first answer captured: ripe = ready to eat on delivery)
- Mobile: gallery first (`aspect-26/17`, 430×288), then details; sticky bottom ATC; H1 still 36px at 430

### Variant: `/shop/product/hass-avocado/` — variants

- Same chrome. Unit listbox **1pc** (collapsed). FAQs differ. Shelf Life 5 Days. We Love This in: Avocado Sushi, Avocado Devilled Eggs, Avocado Brownies.

### Variant: `/shop/product/tbof-a2-gir-cow-ghee/` — sale

- Limited Stock + Bestseller. Sale price flag ₹15135 / ₹16995 / 11% OFF.
- Ingredients + Country of Origin: India. Unit `5 ltr`. How to Enjoy / We Love This in (Besan Laddoos copy). No Ideal For.

### Mobile (430)

- Stacked: breadcrumb → swipe gallery → details.
- Desktop thumbs / main image `max-lg:hidden`.
- Sticky ATC bar at `bottom-0` (white, px-3 py-4).
- No separate quantity stepper.

### Not observed

- Zoom/lightbox, quantity +/−, related-product rails, sold-out CTA, delivery ETA on the PDP, wishlist.
