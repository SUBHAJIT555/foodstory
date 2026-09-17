# Visual QA

Reference: https://www.foodstories.shop/  
Local app: `http://localhost:3000/` (Phase 5 shop PDP implemented).

## Media audit (2026-09-13 critical pass)

| Route | Section | Reference Media | Local Status | Action |
|---|---|---|---|---|
| `/` | Hero | 6 landing banners, desktop landscape + mobile square | Wired to CloudFront `lbn_*` | Verify |
| `/` | Categories | Circle category photos | Wired to `cat_*` | Verify |
| `/` | Product rails | Catalog product photos, slick rails | Product images + Swiper | Verify |
| `/` | Brand values | Desktop + mobile MP4 | `<video>` restored | Verify |
| `/` | Shopping modes | Category tile photos | Wired | Verify |
| `/` | Login | `place_where.webp` | Wired | Verify |
| `/` | Stores | Store facade photos | Wired | Verify |
| `/` | Festive gifts | Hamper portraits, slick | Wired + Swiper | Verify |
| `/shop/` | Category chips + product grid | Category + product photos | Wired | Verify |
| `/shop/fruits-vegetables/` | PLP cards | Product photos | Wired | Verify |
| `/shop/product/hass-avocado/` | Gallery | 6+ views | Multi-image gallery | Verify |
| `/gifting/` | Hero + occasions + types + rails | Banners + chips + hampers | Wired + Swiper | Verify |
| `/gifting/product/pudding-post/` | Gallery | 2 views | Multi-image gallery | Verify |
| `/recipes/` | Banner + recipe cards | Editorial + dish photos | Wired + Swiper | Verify |
| `/stories/` | Banner + story cards | CMS + article thumbs | Partial (some story thumbs still unmatched) | Verify |
| `/about-us/` | Banner + feature photos | CMS + about static | Wired | Verify |
| `/services/` | Banner + service photos | CMS + service static | Wired | Verify |

## Overflow + Swiper pass (2026-09-13)

Page-level `scrollWidth === clientWidth` measured (no `html`/`body` `overflow-x: hidden`).

Root cause: `MediaCarousel` used Swiper `!overflow-visible`, so off-screen slides expanded the document (~2941px at ~1031 client width). Hero/header already fit; later rails caused the scrollbar.

| Viewport | `/` overflowPx | Notes |
|---|---|---|
| 1440×900 | 0 | client 1425 |
| 1280×800 | 0 | client 1265 |
| 1024×1366 | 0 | client 1009 |
| 768×1024 | 0 | |
| 430×932 | 0 | |
| 390×844 | 0 | |
| 375×812 | 0 | 8 homepage swipers |

Also 0 overflow on `/shop`, `/shop/fruits-vegetables`, `/shop/product/hass-avocado`, `/gifting`, `/recipes`, `/stories` at 375 (and shop/PLP at 1440).

Brand titles converted to Swiper with 5 dots. Weekly Cooking + Table Tales rails converted. Store tiles remain native horizontal scroll. Shopping modes remain a static grid.

## Homepage geometry pass (2026-09-13)

Shared `PageContainer` (1280 / 12px / 8px) and `WideContainer` (1440). Rail headings and carousels share one origin. Festive uses live Slick `centerPadding` on a Swiper track (not `justify-between`).

| Viewport | Bestsellers heading/cards | Festive | Login image | overflowPx |
|---|---|---|---|---|
| 1440 | both left 81, 30px centered, 4×292 | 180 pad, 3×355, image 286×508 | 1192×461, CTA 447×53 | 0 |
| 1280 | both left 8 | 180 pad, 3×302, image 286×508 | 1177×461 | 0 |
| 1024 | both left 8 | 50 pad, 3×303, image 286×508 | 921×461 | 0 |
| 768 | 26px centered, cards from 0 | 30 pad, 3×236 | 736×461 | 0 |
| 430 | 26px, heading `px-3` | 90 pad, 1×250, image 244 | 398×332 | 0 |
| 390 | — | 60 pad, 1×270 | 358×298 | 0 |
| 375 | arrow advances slide | 55 pad, 1×265 | — | 0 |

## Critical Fidelity Fixes

### Images
- [x] Homepage
- [x] PLP
- [x] PDP
- [x] Gifting
- [ ] Recipes
- [ ] Stories
- [x] About
- [x] Services

### Carousels / Swipers
- [x] Homepage
- [x] Product rails
- [x] Gifting
- [x] Editorial
- [x] Mobile swipe
- [x] Navigation arrows

### Shop Navigation
- [x] SHOP menu opens correctly
- [x] SHOP link behavior matches reference
- [x] SHOP ALL works
- [ ] all category links work
- [x] mobile Shop expansion works
- [x] menu closes after navigation


Required viewports: 1440×900, 1280×800, 1024×1366, 768×1024, 430×932, 390×844, 375×812.

Capture tooling: `scripts/capture-reference.ts` (Playwright).  
Manual captures from this session are stored under `reference/screenshots/<route>/<viewport>.png`.

---

## Capture status (reference)

| Route | 1440 | 1280 | 1024 | 768 | 430 | 390 | 375 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` home | captured ATF | pending script | pending script | pending script | pending script | pending script | pending script |
| `/shop/fruits-vegetables/` | captured ATF | pending | pending | pending | pending | pending | pending |
| `/shop/product/hass-avocado-ripe/` | captured ATF | pending | pending | pending | pending | pending | pending |
| `/recipes/whipped-avocado-toast/` | captured ATF (video hero) | pending | pending | pending | pending | pending | pending |
| `/gifting/` | not saved (navigation raced) | pending | pending | pending | pending | pending | pending |
| remaining representative routes | pending `scripts/capture-reference.ts` | | | | | | |

Also inspected in-browser (no saved PNG yet): SHOP mega menu at 1440, `/shop/healthy-alternatives/`, `/gifting/` headings/links.

---

## / (home)

- [x] 1440 desktop compared (geometry)
- [x] 1280 laptop (live hero 647; local uses same 1440/727 aspect)
- [x] 1024 tablet (live still hides category items 7–12)
- [x] 768 tablet (hero ~square 768 vs live 775; circles 237)
- [x] 430 mobile (hero 430 vs live 437; circles 100; 6 categories)
- [x] 390 / 375 (same mobile composition as 430)
- [x] header invert on `/`
- [x] no horizontal overflow at compared viewports
- [x] visual comparison completed (not approved)

Notes:
Section order matches live. Photography/video are local placeholders. Page height ~8172 vs live ~9926 at 1440 (placeholder media + fewer slick clones).

## Homepage — Hero

Desktop
- [x] geometry (727-class height; local 719 at 1425 CSS px)
- [x] typography (none on current slides)
- [ ] images (placeholders, not live banners)
- [x] spacing (under sticky header)
- [x] interactions (dots + 4s slide)
- [x] motion (300ms translate; no GSAP)

Mobile
- [x] geometry (square; 430 vs live 437)
- [x] typography
- [ ] images
- [x] spacing
- [x] interactions
- [x] motion

Remaining difference: licensed banner art; 7–8px height drift from aspect math vs slick.

## Homepage — Category grid

Desktop
- [x] geometry (1264 at x=81; circles 155)
- [x] typography (18px/700/28)
- [ ] images
- [x] spacing
- [x] interactions (Discover All)
- [x] motion (none)

Mobile
- [x] geometry (100px circles; 6 visible)
- [x] typography
- [ ] images
- [x] spacing
- [x] interactions (Discover All hidden)
- [x] motion (none)

Remaining difference: grid row height 414 vs live 441 when labels wrap on live photos.

## Homepage — Product rails

Desktop
- [x] geometry (cards 292×369; track min-height 453)
- [x] typography (30/700/36 headings)
- [ ] images
- [x] spacing
- [x] interactions (native overflow; Explore More)
- [x] motion (none)

Mobile
- [x] geometry (horizontal scroll)
- [x] typography
- [ ] images
- [x] spacing
- [x] interactions
- [x] motion (none)

Remaining difference: live Slick arrows/clones; some units omitted when not verified; no desktop ATC (matches live).

## Homepage — Step Into Foodstories

Desktop
- [x] geometry (cards 245; photos 243×179)
- [x] typography (28/700)
- [ ] images (store photos + bg plate)
- [x] spacing
- [x] interactions (maps links)
- [ ] motion (live 700ms crossfade omitted)

Mobile
- [x] geometry (aspect 245/83)
- [x] typography (22/700)
- [ ] images
- [x] spacing
- [x] interactions
- [x] motion (none)

Remaining difference: placeholder plate/photos; no dual-image fade.

## Homepage — Many Ways to Eat

Desktop
- [x] geometry (397×288 tiles; Gifting 397×600; band ~760 vs 768)
- [x] typography (36/700/40)
- [ ] images
- [x] spacing
- [x] interactions
- [x] motion (none)

Mobile
- [x] geometry (h-48 tiles; stacked 2-col pairs)
- [x] typography
- [ ] images
- [x] spacing
- [x] interactions
- [x] motion (none)

Remaining difference: photography; band 760 vs 768.

## Homepage — Brand values

Desktop
- [x] geometry (title 35/700/52.5; video box 1264×496)
- [x] typography
- [ ] images (no S3 mp4)
- [x] spacing
- [x] interactions (4s title swap)
- [x] motion (opacity only; no ScrollTrigger)

Mobile
- [x] geometry (396px box)
- [x] typography
- [ ] images
- [x] spacing
- [x] interactions
- [x] motion (none)

Remaining difference: video loop not bundled.

## Homepage — Timeless Festive Picks

Desktop
- [x] geometry (286×508)
- [x] typography (white title + Gift Now)
- [ ] images
- [x] spacing
- [x] interactions
- [x] motion (none)

Mobile
- [x] geometry (horizontal tiles)
- [x] typography
- [ ] images
- [x] spacing
- [x] interactions
- [x] motion (none)

Remaining difference: photography; title overlay position inferred (centered) from “over image”.

## Homepage — No Two Foodstories / SEO / Subscribe

Desktop
- [x] geometry (login 1280×778; SEO 24/700; subscribe 64/600)
- [x] typography
- [ ] images (login plate)
- [x] spacing
- [x] interactions (Login overlay; Join submit prevented)
- [x] motion (none)

Mobile
- [x] geometry (stacked login; subscribe 40px heading)
- [x] typography
- [ ] images
- [x] spacing
- [x] interactions
- [x] motion (none)

Remaining difference: subscribe background art unknown; SEO clamp only (no Read more on live).

---

## PLP — /shop/fruits-vegetables/

Desktop
- [x] category header (H1 Fresh Produce, 35/700, no hero)
- [x] navigation (Fruits / Vegetables circle chips)
- [x] filters (Filter By Category: Fruits, Vegetables; sticky top-36; 313px col)
- [x] toolbar (`{n} Products Available` + Sort)
- [x] product grid (3 cols at 1440; 947px; gap 24×32)
- [x] product cards (~300×465 with ATC row; image 300×300 square `#fef9f8`)
- [x] typography (title 18/600 clamp-2; price `₹400` bold)
- [ ] images (local placeholders, not catalog photos)
- [x] spacing (layout 1264 / `lg:max-w-7xl` / gap-1)
- [x] interactions (sort menu + URL `?sort=`; checkbox `?filter=`; unit combobox)

Tablet
- [x] layout (768: sidebar hidden; 3-col grid 232; mobile Filters|Sort bar)
- [x] filters (drawer, not a shrunken sidebar)
- [x] grid (md 3-col)
- [x] cards
- [x] spacing (no overflow)

Mobile
- [x] category navigation (60px circles; Fruits / Vegetables)
- [x] filter/sort controls (fixed h-14 bar)
- [x] filter drawer (code + a11y; open click blocked once by Next overlay during HMR)
- [x] grid (2-col 195 / gap 16×24 at 430)
- [x] product cards (wishlist + ATC visible)
- [x] typography
- [x] spacing (no overflow)
- [x] interactions (ATC visible without hover)

Remaining differences:
Fixture count 23 vs live 323. Placeholder photography. Outfit vs Gilroy. Chip rail is overflow-x, not Slick. Empty/skeleton not observed on live — not invented.

## PLP — /shop/

Desktop
- [x] category header (Shop All)
- [x] navigation (15 L1 chips + progress bar)
- [x] filters (5 + More / − Less)
- [x] toolbar
- [x] product grid
- [x] product cards (includes sale flag + `% OFF` on Perrier fixtures)
- [x] typography
- [ ] images
- [x] spacing
- [x] interactions

Tablet
- [x] layout
- [x] filters
- [x] grid
- [x] cards
- [x] spacing

Mobile
- [x] category navigation
- [x] filter/sort controls
- [x] filter drawer
- [x] grid
- [x] product cards
- [x] typography
- [x] spacing
- [x] interactions

Remaining differences:
Fixture catalog vs live thousands of SKUs. Chip photos are placeholders.

## PLP — /shop/healthy-alternatives/

Desktop
- [x] category header (Lifestyle & Diet)
- [x] navigation (Vegan, Gluten-Free Range, Organic, Diet Swaps, Bio-Hacking, Keto)
- [x] filters (5 + More → Keto)
- [x] toolbar
- [x] product grid
- [x] product cards (Limited Stock + sale on ghee fixture)
- [x] typography
- [ ] images
- [x] spacing
- [x] interactions

Tablet
- [x] layout
- [x] filters
- [x] grid
- [x] cards
- [x] spacing

Mobile
- [x] category navigation
- [x] filter/sort controls
- [x] filter drawer
- [x] grid
- [x] product cards
- [x] typography
- [x] spacing
- [x] interactions

Remaining differences:
9 fixture products vs live 550.

## PLP — /shop/fruits-vegetables/fruits/ (nested)

Desktop
- [x] category header (Fruits)
- [x] navigation (grandchild chips from listing data)
- [x] filters
- [x] toolbar
- [x] product grid
- [x] product cards
- [x] typography
- [ ] images
- [x] spacing
- [x] interactions

Tablet
- [x] layout
- [x] filters
- [x] grid
- [x] cards
- [x] spacing

Mobile
- [x] category navigation
- [x] filter/sort controls
- [x] filter drawer
- [x] grid
- [x] product cards
- [x] typography
- [x] spacing
- [x] interactions

Remaining differences:
Same photography/count gaps. Breadcrumb Home • Shop • Fruits Vegetables • Fruits.

## PLP — /category/fruits-vegetables/

Same template as `/shop/fruits-vegetables/`. Breadcrumb is Home • Fruits Vegetables (no Shop), matching the live `/category/` crumb. Filters/H1 follow the `/shop/` variant, not the one-off `/category/` H1 class drift.

---

## /shop/healthy-alternatives/

- [ ] 1440 desktop
- [ ] other viewports
- [ ] header verified
- [ ] footer verified
- [ ] interactions verified
- [ ] motion verified
- [ ] no horizontal overflow
- [ ] visual comparison completed

Notes:
Inspected via computed text only. H1 “Lifestyle & Diet”. Filters: Vegan, Gluten-Free Range, Organic, Diet Swaps, Bio-Hacking, + More. Count “550 Products Available”. Same listing chrome as fruits.

---

## /shop/product/hass-avocado-ripe/

- [x] 1440 desktop ATF captured (reference)
- [ ] 1280 laptop
- [ ] 1024 tablet
- [ ] 430 mobile
- [ ] 390 mobile
- [ ] header verified
- [ ] footer verified
- [ ] interactions verified
- [ ] motion verified
- [ ] no horizontal overflow
- [ ] visual comparison completed

Notes:
Gallery + right column. Title Russolo 36px semibold uppercase. Veg dot, share, thumbnail scroller, How to Enjoy, FAQ accordion, Add to Cart wine pill.

## PDP — Hass Avocado (Ripe) From Peru

Desktop
- [x] breadcrumb (`Shop • Product`, 56px)
- [x] gallery (748×494 main, sticky `top-32`, veg + share)
- [x] product title (36/600/40 Fraunces uppercase, 2 lines)
- [x] pricing (`₹400` + MRP)
- [x] options (unit text `1 pc`, no listbox)
- [x] quantity (not on reference)
- [x] CTA (486×53 wine pill)
- [x] sticky behavior (gallery sticky; details scroll)
- [x] product details (How to Enjoy / We Love This in / Keto / Brand / Shelf Life)
- [x] recommendations (recipe rail, not product cards)
- [x] spacing (`xl:max-w-7xl`, gap-x-6, details 486)
- [x] typography

Tablet
- [x] geometry (768 stacked + in-flow CTA; 1024 row, gallery 483, details 486)
- [x] gallery
- [x] purchase controls
- [x] details

Mobile
- [x] ordering (breadcrumb → swipe gallery → details)
- [x] gallery (430×281, edge-to-edge)
- [x] swipe/controls (native snap; no dots)
- [x] pricing
- [x] options
- [x] quantity (not on reference)
- [x] CTA (406 wide)
- [x] sticky behavior (fixed bottom white bar)
- [x] details
- [x] related products (recipe rail)

Remaining differences:
- Placeholder gallery / reason / recipe photography
- Outfit / Fraunces vs Gilroy / Russolo — title is 4 lines at 430 vs live 3
- Share is copy-link, not the live Radix sheet
- Reason-to-crunch icons are local marks
- Mobile gallery 281 vs live slick chrome 288

## PDP — Hass Avocado From Peru

Desktop
- [x] breadcrumb
- [x] gallery
- [x] product title
- [x] pricing
- [x] options (unit listbox `1 pc`)
- [x] CTA
- [x] product details (Shelf Life 5 Days; avocado sushi copy)

Tablet
- [x] geometry
- [x] options

Mobile
- [x] ordering
- [x] options (combobox)
- [x] sticky CTA

Remaining differences:
- Same photography / font substitutions as ripe SKU

## PDP — Two Brothers A2 Gir Cow Ghee

Desktop
- [x] sale price flag (`₹15135` / `₹16995` / `11% OFF`)
- [x] Limited Stock / Bestseller badges
- [x] ingredients
- [x] country of origin
- [x] CTA

Mobile
- [x] sale pricing
- [x] sticky CTA

Remaining differences:
- Same photography / font substitutions

---

## Gifting — /gifting/

Desktop
- [x] section order (chips → hero → ticker → types → rail → prices → personalize → velvet → edit → season → stores → FAQ)
- [x] hero (no H1; 1440/727 class; 3 dots)
- [x] typography (Outfit / Fraunces vs Gilroy / Russolo)
- [ ] imagery (placeholders)
- [x] editorial layout
- [x] collection cards (bordered Gift Now rail)
- [x] CTAs
- [x] spacing (structure; not pixel-approved)
- [x] motion (4s hero, ticker, 300ms slide)

Tablet
- [x] geometry (1024 / 768 compared locally)
- [ ] imagery
- [x] layout (type grid 3-col; price 2×2)
- [x] typography

Mobile
- [x] section order
- [x] hero crop (square)
- [x] typography
- [x] stacking/order
- [x] horizontal rails (occasion + gift rail)
- [x] CTA placement
- [x] spacing
- [x] motion

Remaining differences:
Placeholder photography; catalogue is `#`; Outfit/Fraunces; sparkle/ribbon are local marks.

## Gifting — /gifting/all-gifts/

Desktop
- [x] section order (crumbs, All Hampers, chips, count, Gift Now grid)
- [x] hero (none)
- [x] typography
- [ ] imagery
- [x] editorial layout (shop-listing chrome)
- [x] collection cards (PLP geometry + Gift Now)
- [x] CTAs
- [x] spacing
- [x] motion (none beyond hover)

Tablet
- [x] geometry
- [ ] imagery
- [x] layout
- [x] typography

Mobile
- [x] section order
- [x] hero crop (n/a)
- [x] typography
- [x] stacking/order
- [x] horizontal rails (chips)
- [x] CTA placement
- [x] spacing
- [x] motion

Remaining differences:
Subset of live SKUs; filters are the three observed groups.

## Gifting — /gifting/product/pudding-post/

Desktop
- [x] section order
- [x] hero (gallery)
- [x] typography
- [ ] imagery
- [x] editorial layout
- [x] collection cards (Gifting Edit)
- [x] CTAs (Gift Now)
- [x] spacing
- [x] motion

Tablet
- [x] geometry
- [ ] imagery
- [x] layout
- [x] typography

Mobile
- [x] section order
- [x] hero crop
- [x] typography
- [x] stacking/order
- [x] horizontal rails
- [x] CTA placement (sticky Gift Now)
- [x] spacing
- [x] motion

Remaining differences:
Placeholder gallery; personal-message textarea appears only when checked (live checkbox observed; textarea inferred).

## Bulk Gifting

- [x] hero
- [x] service sections
- [x] process
- [x] customization (Packed With Love)
- [x] enquiry form (steps 1–6 observed; step 7 reconstructed)
- [x] contact actions (WhatsApp FAB + FAQ)
- [x] mobile form

Desktop / tablet / mobile compared locally at 1440, 1280, 1024, 768, 430, 390, 375.

Remaining differences:
Trusted-by logos are unmarked blocks; step 7 email field not filmed; no licensed pack photography.

---

## /recipes/whipped-avocado-toast/

- [x] 1440 desktop ATF captured (video hero)
- [ ] other viewports
- [ ] header verified
- [ ] footer verified
- [ ] interactions verified
- [ ] motion verified
- [ ] no horizontal overflow
- [ ] visual comparison completed

Notes:
RECIPES nav item highlighted in wine. Full-bleed video. Instructions + checkbox ingredients + Serves 2 + Shop the Ingredients.

---

## Global shell (local)

Local app: `http://localhost:3001/` (Phase 2, empty homepage body).  
Compared against live `https://www.foodstories.shop/` computed styles and Phase 1 1440 screenshots.

| Viewport | Header | Footer | Overflow | Notes |
| --- | --- | --- | --- | --- |
| 1440×900 | 154px (matches live). Logo 176×42 at (81,49). Search 516×48 at (393,46) vs live (402,46). Location 190×45 vs live 172×45. | 678px charcoal, 4 columns + contact row + cookie | none | Icons at live x positions after font-width drift |
| 1280×800 | 154px. Logo x=8 (`lg:px-2` on 7xl). Search 516 visible. No hamburger. | 698px | none | Matches live class split |
| 1024×1366 | 154px. Desktop search still in row 1 (`lg`). Nav visible. | 726px | none | `lg` starts here |
| 768×1024 | 212px. Search moves to row 2. Nav stays. No hamburger (`md`). | 877px, columns hide (`max-lg`) | none | Live uses this exact split |
| 430×932 | 158px vs live 163. Logo 128×31 at (52,47) vs (52,49). Search 406×48 at x=12. Hamburger on. | 933px stacked | none | Drawer `w-[80vw]` matches live |
| 390×844 | 158px. Same mobile composition. | 933px | none | |
| 375×812 | 158px. Same mobile composition. | 933px | none | Emulation reported ~386 CSS px |

- [x] 1440 desktop
- [x] 1280 laptop
- [x] 1024 tablet
- [x] 768 tablet
- [x] 430 mobile
- [x] 390 mobile
- [x] 375 mobile
- [x] header compared (not pixel-perfect)
- [x] footer compared (structure; live full-bleed PNG still incomplete)
- [x] interactions checked (mega + outside click, mobile drawer, location dialog, search overlay, utility drawers)
- [ ] motion verified (300ms / 4s assumed; live announcement is Slick)
- [x] no horizontal overflow at the 7 viewports
- [x] visual comparison completed (not approved)

Known mismatches:
1. Outfit / Fraunces vs Gilroy / Russolo
2. Local SVG wordmark vs `Black_FS_Logo`; text store badges vs official images
3. Desktop location pill **190×45** vs live **172×45**
4. Mobile header **158px** vs live **163px**
5. Search trending product cards omitted
6. Footer **678px** at 1440 vs mixed live reads (~850px)
7. Announcement is a 4s swap, not Slick
8. Cart / Login / Shelf open states not filmed — empty drawers
9. Homepage header invert implemented on `/` (white wordmark). Scroll-change still unverified

---

## Comparison protocol (later phases)

For each implemented template:

1. Capture reference and local at the same viewport.
2. Compare geometry first, then type, crop, spacing, color, borders, motion.
3. List the five largest differences and fix those before smaller polish.
4. Record remaining mismatches here. Never claim pixel-perfect if any remain.

---

## Recipes Listing (`/recipes/` + `/recipes/list/`)

Desktop
- [x] hero (Stories to Cook banner)
- [x] categories (list filters)
- [x] cards (`aspect-102/173`)
- [x] typography
- [x] spacing
- [ ] pagination (live is infinite-scroll; local shows fixture set)

Mobile
- [x] hero
- [x] category navigation
- [x] cards (`max-sm:aspect-125/224`)
- [ ] image crop (placeholders)
- [x] spacing

Remaining differences:
Photography is local SVG. Live listing count is 166; local fixtures are a slice. + More extra taxonomy unverified.

## Recipe Detail — whipped-avocado-toast

Desktop
- [x] title/header
- [ ] hero image (Vimeo replaced with framed placeholder at 36rem / 48.125rem)
- [x] metadata
- [x] ingredients (checkboxes, Serves 2, cream cheese disabled)
- [x] instructions (labelled groups)
- [x] related content (Come write yours — no related recipes on this page)
- [x] typography

Mobile
- [x] ordering (`flex-col-reverse`)
- [ ] hero crop
- [x] ingredients
- [x] instructions
- [x] spacing

Remaining differences:
No licensed Vimeo. Shop the Ingredients stays disabled as observed.

## Stories Listing

Desktop
- [x] hero
- [x] featured overlapping card
- [x] shelves / table / people rails
- [x] Discover All
- [x] typography

Mobile
- [x] hero
- [x] rails
- [ ] image crop

Remaining differences:
Placeholder photography; Stories Of People uses the featured card treatment on one observed story.

## Story detail

Desktop
- [x] title / deck / byline / read time
- [x] summarize chips
- [x] article width (~46rem)
- [x] H2 sections on Truffle 101
- [x] related articles on Truffle 101

Mobile
- [x] stacking
- [x] typography width

Remaining differences:
Summarize chips are plain links, not the live brand marks. Photography placeholders.

## About

Desktop
- [x] hero
- [x] chapters
- [x] values
- [x] shop / stories splits
- [x] subscribe

Mobile
- [x] hero overlay
- [x] stacked sections

Remaining differences:
Banner / journey photography are placeholders.

## Services

Desktop
- [x] hero
- [x] three service rows
- [x] CTAs
- [x] subscribe

Mobile
- [x] image-first stack
- [x] CTAs

Remaining differences:
Service photography placeholders. Service CTAs now resolve to implemented form and kitchen-studio routes.

## Contact / Kitchen Studio / Forms

Desktop
- [x] routes resolve
- [x] observed headings and fields
- [ ] photography / banner art
- [ ] pixel spacing vs live

Mobile
- [x] forms stack
- [ ] keyboard/input polish

Status: structure only. Not visually finalized.

## FAQs / Policies / Sitemap

Desktop
- [x] FAQ topics + accordion
- [x] policy sidebar slugs
- [x] sitemap groups of implemented routes
- [ ] long-form legal completeness
- [ ] pixel spacing

Status: structure only. Not visually finalized.

## Store locator / Search results / 404

Desktop
- [x] five stores + serviceable Read more
- [x] search query heading + fixture grid
- [x] site-consistent 404 (live redirects home)
- [x] search filter-by-category chrome (Shop All FilterSidebar + Sort + mobile drawer; `query` kept in URL)
- [ ] locator photography

Status: structure only. Not visually finalized.

---

# Phase 9 Final QA Queue

Classified 2026-09-13. Impact order. Do not treat remaining UNAVOIDABLE items as implementation bugs.

## Classification

| Item | Class | Disposition |
| --- | --- | --- |
| Licensed wordmark / Gilroy / Russolo / app badges | UNAVOIDABLE | Outfit / Fraunces / local SVG |
| Catalog / hero / editorial photography and Guardians mp4 | UNAVOIDABLE | Local placeholders; no CloudFront/S3 hotlink |
| Vimeo recipe hero | UNAVOIDABLE | Framed placeholder |
| Catalogue PDF | UNAVOIDABLE | `href="#"` |
| Cart / Login / Shelf backends | OUT OF SCOPE | Empty drawers; login uses observed empty copy |
| Location CONTINUE success path | UNAVOIDABLE | Disabled until a filmed pin flow exists |
| Cookie bar always-on | NOT REPRODUCIBLE as overlay | Matches observed footer line |
| Mega L1 Cuisines / Fresh Meals hrefs | STILL OPEN | Not added without a paired live href |
| Live inventory / SKU lists drifted | REFERENCE CHANGED | Local fixtures stay as captured |
| Dried Fruits dropped from ATF | NOT REPRODUCIBLE | Live H3s still include Dried Fruits & Nuts |
| Search trending rail omitted | HIGH — fixed | Cards + Explore More |
| Announcement-dismissed header offset | HIGH — fixed | `--header-sticky-*-current` |
| Search filter chrome | HIGH — fixed | PLP sidebar / sort / mobile drawer |
| FAQ `aria-controls` / focus return | HIGH — fixed | ProductFaq + SiteShell |
| Search overlay `w-screen` overflow | HIGH — fixed | `w-full` |
| 404 titles on shop catch-all | HIGH — fixed | `generateMetadata` + `<title>` |
| Kitchen Studio 2 vs 3 cols | MEDIUM — fixed | `md:grid-cols-2 xl:grid-cols-3` |
| Policy sidebar stacking | MEDIUM — fixed | `md:grid-cols-[14rem_1fr]` |
| Many Ways band 760 vs 768 | MEDIUM — fixed | `mt-8` |
| Hero 719 vs 727-class | LOW | Aspect math vs slick; documented |
| Category wrap row height | LOW | `min-h-14` |
| Step Into 700ms crossfade | LOW | Omitted; not invented |
| Reduced-motion autoplay | MEDIUM — fixed | Interval skip + CSS `prefers-reduced-motion` |
| Kitchen Studio full-page client | LOW | Left; no late rewrite |
| GSAP unused in components | LOW | Package retained (stack); no ScrollTrigger |
| Dev-only Next hydration overlay after HMR | NOT REPRODUCIBLE in production | Production :3001 console clean |

## Global Shell

- Licensed wordmark, app badges, and Gilroy/Russolo files still substituted — UNAVOIDABLE
- Homepage header invert vs interior charcoal: announcement-dismissed offset — FIXED
- Search overlay trending rail cards — FIXED
- Cart / Login / Shelf remain empty drawers — OUT OF SCOPE
- Location CONTINUE stays disabled — UNAVOIDABLE
- Cookie bar is always-on footer — matches reference
- Mega L1 leftovers (Cuisines href, Fresh Meals confirmation) — STILL OPEN

## Homepage

- Photography / video — UNAVOIDABLE
- Hero height drift — LOW remaining
- Category circle wrap — mitigated with `min-h-14`
- Step Into crossfade — omitted
- Many Ways band — FIXED
- Page height shorter than live — UNAVOIDABLE (placeholder media)

## PLP / PDP / Gifting / Recipes / Stories / About / Services

Unavoidable photography, fixture counts, licensed media, and out-of-scope backends remain as documented per family below.

## Mobile / Tablet / Motion / A11y / Performance

See Phase 9 completion checklists.

---

# Phase 9 completion (2026-09-13)

Viewports compared locally: 1440×900, 1280×800, 1024×1366, 768×1024, 430×932, 390×844 (375 shares the 390 composition). Production hard-refresh on `:3001`.

## Homepage

Desktop
- [x] geometry
- [x] typography
- [ ] imagery
- [x] spacing
- [x] interactions
- [x] motion

Tablet
- [x] geometry
- [x] typography
- [ ] imagery
- [x] spacing
- [x] interactions
- [x] motion

Mobile
- [x] geometry
- [x] typography
- [ ] imagery
- [x] spacing
- [x] interactions
- [x] motion

Known differences:
- Outfit / Fraunces vs Gilroy / Russolo
- Placeholder photography and Guardians video
- Hero ~719 vs live 727-class at 1440 (scrollbar/aspect)
- Live rail SKUs drift with inventory

## PLP

Desktop
- [x] geometry
- [x] typography
- [ ] imagery
- [x] spacing
- [x] interactions
- [x] motion

Tablet
- [x] geometry
- [x] typography
- [ ] imagery
- [x] spacing
- [x] interactions
- [x] motion

Mobile
- [x] geometry
- [x] typography
- [ ] imagery
- [x] spacing
- [x] interactions
- [x] motion

Known differences:
- Fixture counts vs live thousands of SKUs
- Placeholder card photos
- Chip rail is overflow-x, not Slick

## PDP

Desktop
- [x] geometry
- [x] typography
- [ ] imagery
- [x] spacing
- [x] interactions
- [x] motion

Tablet
- [x] geometry
- [x] typography
- [ ] imagery
- [x] spacing
- [x] interactions
- [x] motion

Mobile
- [x] geometry
- [x] typography
- [ ] imagery
- [x] spacing
- [x] interactions
- [x] motion

Known differences:
- Placeholder gallery / reason-to-crunch marks
- Share is copy-link, not the live Radix sheet
- Title wrap can add a line vs Russolo metrics

## Gifting / Bulk gifting

Desktop / tablet / mobile
- [x] geometry
- [x] typography
- [ ] imagery
- [x] spacing
- [x] interactions
- [x] motion

Known differences:
- Placeholder / unmarked logo blocks
- Catalogue PDF is `#`
- BYOB interior not filmed
- Bulk step 7 email is reconstructed

## Recipes / Stories / About / Services

Desktop / tablet / mobile
- [x] geometry
- [x] typography
- [ ] imagery
- [x] spacing
- [x] interactions
- [x] motion

Known differences:
- Vimeo and article photography unavailable
- Listing counts are fixture slices
- Summarize chips are plain links
- Kitchen Studio booking form stays on a client page (no late split)

## Utility (search, FAQ, policies, locator, forms, 404)

Desktop / tablet / mobile
- [x] geometry (structure)
- [x] typography
- [ ] imagery
- [x] spacing (structure)
- [x] interactions
- [x] motion

Known differences:
- Search results use fixture matches, not live Wizzy
- Policy long-form legal text incomplete where not captured
- Live 404 is a homepage redirect; local uses a branded not-found

## Overflow

`document.documentElement.scrollWidth > window.innerWidth` was false at 1440, 1280, 1024, 768, 430, and 390 on the homepage. Horizontal rails overflow inside their containers only.

