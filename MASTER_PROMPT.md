# MASTER CURSOR PROMPT — Foodstories UI Recreation

## Role

You are the lead frontend engineer responsible for recreating the publicly visible UI/UX of:

https://www.foodstories.shop/

This is a **reference-driven frontend recreation**, not a redesign.

Your job is to inspect the live reference website and reproduce its:
- page structures
- responsive layouts
- spacing
- typography
- colors
- borders
- imagery placement
- icons
- headers
- navigation
- mega menus
- cards
- carousels
- sections
- filters
- product listing layouts
- product detail layouts
- gifting layouts
- recipe layouts
- footer
- modals
- drawers
- overlays
- sticky/fixed UI
- hover states
- focus states
- loading states
- empty/sold-out states
- animation timing
- scroll behavior
- micro-interactions
- page transitions
- responsive behavior

Do not “improve”, simplify, modernize, reinterpret, or creatively redesign the reference.

If a design decision is visible on the reference website, match it.

If something cannot be verified, document it as an assumption before implementing it.

---

# 1. Tech Stack

Build with:

- Next.js current stable release
- App Router
- TypeScript with strict mode
- Tailwind CSS
- Motion for React / `motion`
- GSAP + ScrollTrigger only where the reference requires timeline/scroll-driven behavior
- native Next.js `<Image />` wherever appropriate
- `next/font` for locally bundled / supported fonts
- semantic HTML
- accessible interactive components
- CSS variables for design tokens
- React Server Components by default
- Client Components only where interaction or animation requires them

Do NOT use:
- Bootstrap
- Material UI
- Chakra
- Ant Design
- prebuilt visual themes
- component libraries that change the appearance
- jQuery
- inline spaghetti CSS
- giant monolithic page components

You may use low-level utility packages if required, but they must not alter the reference appearance.

---

# 2. Critical Rule: Inspect Before Coding

DO NOT start by guessing the homepage.

Before implementing UI, audit the live reference.

Create:

`docs/reference-audit.md`

The audit must contain:

1. route inventory
2. global component inventory
3. typography inventory
4. color inventory
5. spacing observations
6. responsive breakpoint observations
7. animation inventory
8. image/asset inventory
9. page-template inventory
10. recurring cards/sections
11. header behavior
12. footer behavior
13. drawers/modals
14. shop filtering behavior
15. product detail behavior
16. gifting behavior
17. recipe behavior
18. mobile-specific UI
19. tablet-specific UI
20. unresolved observations

Do not fabricate exact values before inspecting them.

---

# 3. Source of Truth

The live website is the visual source of truth:

https://www.foodstories.shop/

For every route:

1. inspect desktop
2. inspect tablet
3. inspect mobile
4. inspect above-the-fold
5. inspect the full page
6. interact with menus
7. inspect dropdowns / mega menus
8. inspect hover states
9. inspect location UI
10. inspect filters
11. inspect sort
12. inspect carousels
13. inspect buttons
14. inspect accordions
15. inspect product cards
16. inspect footer
17. inspect sticky/floating controls

When possible, take screenshots at:

- 1440 × 900
- 1280 × 800
- 1024 × 1366
- 768 × 1024
- 430 × 932
- 390 × 844
- 375 × 812

Save visual references under:

`reference/screenshots/<route>/<viewport>.png`

Never rely only on memory after inspecting a page.

---

# 4. Intellectual Property / Assets

Use assets only when we have the right to use them.

For a private/internal recreation where supplied or legally reusable reference assets are available:
- download/cache them locally
- preserve aspect ratio
- preserve crop
- preserve visible positioning
- preserve desktop/mobile variants

For production/public deployment:
- replace third-party copyrighted imagery, logos, copy, videos, and proprietary fonts unless explicit permission/licensing exists.

Never hotlink production assets from the reference site.

Store local assets in:

`public/assets/...`

Recommended structure:

public/
  assets/
    brand/
    icons/
    home/
    shop/
    products/
    gifting/
    recipes/
    stories/
    stores/
    services/
    videos/

Create:

`src/data/assets.ts`

as the centralized asset registry where useful.

---

# 5. Page Inventory

Discover the entire public site before considering the recreation complete.

At minimum inspect and implement the actual templates represented by:

## Core
- `/`
- Shop landing
- nested shop category pages
- collection/category PLPs
- shop product detail pages
- gifting landing
- gifting collections
- gifting product pages
- bulk gifting
- stories listing/detail if available
- recipes listing
- recipe detail
- about
- services
- contact
- store locator/location selection if public
- policy / information pages exposed in global navigation/footer
- error/not-found state

Known navigation visible on the reference includes:
- SHOP
- GIFTING
- BULK GIFTING
- STORIES
- RECIPES
- ABOUT US
- SERVICES

Known shop/category patterns include nested taxonomy routes and:
- breadcrumbs
- page title
- product counts
- filters
- lifestyle/allergen/preparation/category filters depending on route
- sort
- product grid
- sold-out / limited-stock / bestseller / chef-special style labels
- pagination or progressive loading where applicable
- SEO/editorial copy below some category listings

Known gifting patterns include:
- gifting listing
- Gift Now / Add to Cart variants
- gifting product detail
- delivery/personalization messaging
- gifting concierge
- reassurance/features
- FAQ accordion

Known recipe-detail patterns include:
- title
- cooking time
- difficulty
- cuisine/content tags
- author
- hero/center image
- instructions
- ingredients
- serving count
- “Shop the Ingredients” where present

Do not hard-code only these examples. Crawl/discover the actual public route hierarchy.

---

# 6. Architecture

Use a reusable template/component system.

Suggested structure:

src/
  app/
    (site)/
    shop/
    gifting/
    recipes/
    stories/
    about/
    services/
  components/
    layout/
    navigation/
    home/
    commerce/
    gifting/
    recipes/
    stories/
    location/
    feedback/
    ui/
  data/
  hooks/
  lib/
  styles/
  types/

Build reusable primitives such as:

- SiteHeader
- AnnouncementBar if present
- DesktopNav
- MobileNav
- MegaMenu
- SearchTrigger
- AccountTrigger if present
- CartTrigger
- LocationTrigger
- Breadcrumbs
- SectionHeading
- EditorialHeading
- ProductCard
- ProductBadge
- ProductGrid
- CategoryCard
- CategoryRail
- HorizontalScroller
- ShopFilterSidebar
- MobileFilterDrawer
- SortControl
- PriceDisplay
- AddToCartButton
- GiftNowButton
- QuantityControl if present
- ProductGallery
- Accordion
- RecipeCard
- RecipeMeta
- IngredientList
- StoreCard
- Footer
- WhatsApp/FloatingAction if visible
- CookieBanner if visible
- Newsletter block if visible

Do not create abstractions before there is a repeated reference pattern.

---

# 7. Data Strategy

This phase is primarily visual/frontend reproduction.

Keep UI data separate from JSX.

Create typed mock/reference data where an API is not available.

Example:

```ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  unit?: string;
  image: string;
  badges?: string[];
  soldOut?: boolean;
  limitedStock?: boolean;
};
```

Do not duplicate large product arrays directly inside page components.

A page should render from typed data structures.

If actual commerce APIs are out of scope, faithfully mock the visible behavior without pretending a backend exists.

---

# 8. Typography

Typography fidelity is mandatory.

Inspect:
- actual font families
- weights
- optical feeling
- uppercase treatment
- tracking
- line-height
- heading scales
- body scales
- menu type
- label type
- price type
- button type
- editorial serif/sans pairing if present

Use the actual font only if legally available.

If it is web-loaded and permitted for the project, self-host responsibly.

Otherwise choose the closest metric-compatible substitute and record the substitution in:

`docs/reference-audit.md`

Do NOT casually use Inter because it is convenient.

Create typography tokens in CSS.

Example only — replace after measurement:

```css
:root {
  --font-display: ...;
  --font-body: ...;

  --text-xs: ...;
  --text-sm: ...;
  --text-base: ...;
  --text-lg: ...;
  --text-xl: ...;
  --text-display-sm: ...;
  --text-display-lg: ...;
}
```

---

# 9. Design Tokens

After inspection, create:

`src/styles/tokens.css`

Include verified tokens for:

- background
- foreground
- muted foreground
- borders
- brand colors
- accent colors
- surface colors
- state colors
- radii
- shadows
- container widths
- spacing
- header heights
- animation easings
- z-index system

Do not invent a broad design system the reference does not use.

---

# 10. Layout Fidelity

For every section verify:

- max width
- left/right gutters
- grid columns
- row/column gaps
- vertical section spacing
- text widths
- alignment
- card aspect ratios
- image crop
- viewport bleed
- overflow
- borders
- dividers
- sticky positioning
- relative section heights

Match responsive reflow, not merely desktop scaling.

Example questions to answer for every component:
- Does the grid collapse from 4 → 3 → 2?
- Is mobile a 2-column product grid or horizontal rail?
- Do controls move into a drawer?
- Does heading size use clamp or breakpoint jumps?
- Does nav switch to a hamburger?
- Are desktop images swapped on mobile?
- Are carousels draggable/swipeable?
- Is scroll snapping used?

---

# 11. Motion Rules

Motion must be copied from observation, not invented.

Use:
- CSS transitions for simple hover/focus
- Motion for component entrance/exit, drawers, menus, simple reveal
- GSAP for complex sequenced animations or scroll-linked effects
- ScrollTrigger only when the reference visibly links motion to scroll

Audit:
- duration
- delay
- stagger
- easing
- direction
- distance
- opacity
- scale
- clipping
- transform origin
- scrub behavior
- pinned sections
- marquee speed
- carousel inertia
- image zoom
- hover motion
- nav transitions

Create:

`src/lib/motion.ts`

for reusable animation constants.

Support:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable non-essential motion */
}
```

Do not sprinkle random `fade-up` animations over every section.

If the reference does not animate something, keep it static.

---

# 12. GSAP Rules

GSAP is NOT the default animation solution.

Use it only when:
- the reference has scroll-scrubbed motion
- multiple elements require a coordinated timeline
- pinning is required
- complex SVG/text/image sequences require it

When using GSAP:
- register plugins once
- scope animations with `gsap.context`
- clean up on unmount
- avoid layout thrashing
- animate transform/opacity where possible
- avoid unnecessary ScrollTriggers
- handle responsive animation using `gsap.matchMedia()`

---

# 13. Motion for React Rules

Use Motion for:
- mobile nav
- filter drawer
- modal
- accordion
- cart drawer
- hover/press state when reference uses it
- presence animations
- simple viewport reveal

Avoid:
- arbitrary spring effects
- excessive bounce
- giant transforms
- animation that changes the visual language

Reference > personal taste.

---

# 14. Header / Navigation

Treat the header as a dedicated system.

Inspect:
- number of rows
- exact heights
- desktop/mobile variants
- logo scale
- menu gaps
- menu font
- icon scale
- utility icons
- location selector
- search
- account/cart if present
- background transparency/solid behavior
- top-of-page behavior
- sticky behavior
- hide/reveal on scroll behavior
- mega menu width
- mega menu content
- hover activation
- close behavior
- mobile accordion/subnavigation

Implement header state deliberately.

No random shadcn navigation.

---

# 15. Shop / PLP

Build a generic PLP template that can represent reference shop categories.

Must support reference-dependent:
- breadcrumb hierarchy
- title
- optional category chips/tabs
- filter groups
- checkbox/radio behavior
- filter counts if visible
- sort
- product count
- desktop filter arrangement
- mobile filter drawer
- badges
- crossed-out compare price
- quantity/unit
- sold-out state
- limited-stock state
- product CTA
- page/progressive loading
- below-grid editorial content

Use URL search params for filter/sort UI state where practical.

Do not implement a fake filter control that visually changes but has inconsistent state.

---

# 16. Product Detail Pages

Inspect multiple products because templates may differ.

Implement reference behavior for:
- breadcrumbs
- gallery
- thumbnails
- title
- metadata
- price
- unit
- badges
- stock state
- quantity
- CTA
- product details
- accordions
- recommendations
- trust/payment elements
- delivery/location prompt
- sticky purchase behavior if present
- mobile image behavior

Do not assume shop PDP and gifting PDP are identical.

---

# 17. Gifting

Gifting has its own visual language where the reference differs.

Inspect:
- gifting listing cards
- gifting badges
- Gift Now vs Add to Cart
- gifting PDP
- personalization language
- concierge CTAs
- shipping/delivery messaging
- feature icons
- FAQs
- “the Foodstories way” content
- gift-by-occasion sections
- bulk/corporate gifting

Do not force gifting into generic shop components if reference styling differs.

Share primitives only when appearance genuinely matches.

---

# 18. Recipes

Create:
- recipe index/listing template
- recipe card
- recipe detail template

Reference detail pages include combinations of:
- title
- cooking time
- difficulty
- cuisine/tag
- meal type/category
- author
- image
- instructions
- ingredients
- serves
- optional description
- optional Jump to Recipe
- optional Shop the Ingredients

Maintain editorial spacing and type hierarchy.

---

# 19. Homepage

Audit the homepage from top to bottom before implementation.

Known reference content includes patterns such as:
- major food/category presentation
- Fresh Produce
- Bakery
- Cheese
- Meat Market
- Dips and Spreads
- Pantry Perks / Pantry
- Everyday Staples
- Dried Fruits & Nuts
- specials / seasonal content
- Dairy
- Chocolate & Sweets
- product rails
- store discovery (“Step Into Foodstories”)
- WhatsApp / in-store / gift salon service storytelling
- “Many Ways to Eat, Your Way to Shop”
- brand-value/story sections
- gifting sections
- SEO/editorial copy
- contact/service footer blocks

These names are discovery hints, not permission to guess their layout.

Inspect the live homepage and reproduce the current arrangement exactly.

---

# 20. Responsive Quality

The implementation is incomplete unless it matches:
- large desktop
- laptop
- tablet portrait
- tablet landscape where relevant
- mobile large
- mobile small

Do not hide layout bugs with `overflow-x-hidden` globally.

Fix the source of overflow.

Every page must be usable from 320 px upward.

---

# 21. Accessibility

Match reference appearance while improving semantics invisibly.

Required:
- proper buttons
- links for navigation
- labels for controls
- keyboard-visible focus
- ESC closes modal/drawer
- focus trapping where appropriate
- aria-expanded for expandable controls
- alt text for meaningful images
- empty alt for decorative images
- reduced-motion support
- sufficient DOM semantics

Do not visually redesign to satisfy accessibility.

---

# 22. Performance

Target:
- optimized images
- explicit dimensions/aspect ratios
- lazy loading below fold
- preload only critical assets
- font subsets
- no massive client JS bundle
- no unnecessary `"use client"`
- dynamically load heavy animation code if it is page-specific
- avoid cumulative layout shift
- avoid rendering hundreds of products in one client component unnecessarily

---

# 23. Visual Verification

This is mandatory.

After implementing each route/template:

1. run local app
2. capture screenshot at exact reference viewport
3. compare local vs reference side-by-side
4. optionally use overlay/difference tooling
5. fix mismatches
6. repeat until close

Check:
- section vertical positions
- container width
- type size/weight
- line wrapping
- image crop
- image scale
- card height
- grid gap
- button dimensions
- border thickness
- background
- footer height
- fixed/sticky UI
- animation behavior

Create:

`docs/visual-qa.md`

For every audited page, track:

```md
## /route

- [ ] 1440 desktop
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
...
```

Never claim pixel-perfect completion without comparison.

---

# 24. Browser Automation

If browser tooling is available, use it.

Use Playwright or equivalent to:
- crawl internal links
- capture screenshots
- inspect responsive screenshots
- test navigation
- test menus
- test filters
- test drawers
- detect console errors
- detect broken assets

Create scripts such as:

`scripts/discover-routes.ts`
`scripts/capture-reference.ts`
`scripts/capture-local.ts`

Respect the website and do not aggressively crawl endpoints.

Throttle requests.

---

# 25. Route Discovery

Start from:
`https://www.foodstories.shop/`

Discover public internal links.

Group routes by template rather than blindly implementing thousands of product/category pages individually.

Example:

```ts
type RouteTemplate =
  | "home"
  | "shop-listing"
  | "shop-product"
  | "gifting-listing"
  | "gifting-product"
  | "recipe-listing"
  | "recipe-detail"
  | "story-listing"
  | "story-detail"
  | "content-page";
```

Create dynamic template/data mapping.

The goal is to recreate every distinct UI/page pattern, then make routes render through those patterns.

---

# 26. Code Quality

Non-negotiable:
- strict TS
- no `any` without explicit reason
- no duplicated huge components
- no dead code
- no placeholder lorem ipsum if reference content is available
- no random gradients
- no invented shadows
- no fake glassmorphism
- no arbitrary rounded cards
- no default Tailwind aesthetic
- no visual changes just because they are “cleaner”
- no huge client-side state store unless required

Keep data, presentation, and interaction clearly separated.

---

# 27. Naming

Use semantic names based on purpose.

Good:
- `ProductGrid`
- `StoreDiscovery`
- `GiftOccasionRail`
- `RecipeIngredients`
- `MobileFilterDrawer`

Bad:
- `Section1`
- `Box2`
- `FancyCard`
- `HomepageThing`

---

# 28. Handling Unknowns

When you cannot verify something:

DO NOT invent it silently.

Add to:

`docs/open-questions.md`

Format:

```md
## [route/component]

Observed:
...

Unclear:
...

Current implementation assumption:
...

Confidence:
high | medium | low
```

Prefer high-confidence implementation first.

---

# 29. Working Method

Execute in this order.

### Phase 0 — Setup
- initialize Next + TS + Tailwind
- install Motion
- install GSAP
- install Playwright if permitted
- establish lint/typecheck scripts

### Phase 1 — Reference Audit
- crawl representative routes
- capture reference screenshots
- identify font/assets/layout/motion
- create route/template map

### Phase 2 — Tokens
- font setup
- color variables
- spacing/container system
- base globals
- motion constants

### Phase 3 — Global Shell
- header
- navigation
- mobile nav
- location UI
- footer
- floating utilities
- cookie state if visible

### Phase 4 — Homepage
- reproduce section-by-section
- visual QA desktop/mobile
- motion QA

### Phase 5 — Commerce Templates
- shop listing
- shop PDP
- filters/sort
- category variants

### Phase 6 — Gifting Templates
- gifting listing
- gifting PDP
- gifting informational sections
- FAQs

### Phase 7 — Editorial
- recipes listing/detail
- stories listing/detail
- about
- services
- supporting pages

### Phase 8 — Route Coverage
- connect discovered routes to templates
- validate links

### Phase 9 — Final QA
- screenshot comparisons
- responsive
- interactions
- keyboard
- reduced motion
- console
- lint
- TypeScript
- production build

Do not jump to Phase 4 before Phase 1–3 are credible.

---

# 30. Definition of Done

The project is done only when:

- all distinct public page templates are represented
- global header/footer closely match reference
- typography is verified
- spacing is verified
- imagery aspect/crop is verified
- animations resemble reference timing and behavior
- desktop/mobile layouts are separately matched
- product grids and filters visually match
- gifting templates match
- recipe templates match
- menus/drawers/accordions work
- no console errors
- no TS errors
- no lint errors
- production build succeeds
- no broken internal links in implemented route set
- no obvious invented components
- visual QA document is complete

---

# 31. Output Protocol

At the end of every Cursor implementation session, respond with:

```md
## Completed
- ...

## Files changed
- ...

## Reference checks performed
- ...

## Remaining differences
- ...

## Next exact task
- ...
```

Do not say “done” while known visual mismatches remain.

---

# 32. First Instruction

Begin now with **reference audit only**.

Do NOT generate the full website immediately.

First:
1. inspect the live site
2. discover representative routes
3. identify distinct templates
4. create `docs/reference-audit.md`
5. create `docs/route-map.md`
6. create `docs/open-questions.md`
7. create screenshot capture tooling if available
8. report your findings

Only after that, begin global shell implementation.
