# CURSOR PHASE PROMPTS

Use these prompts sequentially if Cursor performs better with smaller scoped tasks.

---

## Phase 1 — Audit Only

Read `SKILL.md` and `DESIGN.md` first.

Do not implement any webpage yet.

Audit https://www.foodstories.shop/ thoroughly.

Discover the public route hierarchy and identify distinct visual templates instead of treating every URL as unique.

Inspect:
- desktop
- tablet
- mobile
- navigation
- mega menus
- header states
- footer
- location UI
- shop listing pages
- different filter configurations
- shop PDPs
- gifting listing
- gifting PDP
- recipes
- stories
- about
- services
- overlays/drawers/modals
- homepage sections
- animations

Create:
- `docs/reference-audit.md`
- `docs/route-map.md`
- `docs/open-questions.md`
- `docs/visual-qa.md`

If browser automation is available, create:
- `scripts/discover-routes.ts`
- `scripts/capture-reference.ts`

Capture representative screenshots for 1440x900, 1024x1366, 430x932, 390x844.

Do not guess fonts, colors or breakpoints. Measure/inspect them.

At the end, report:
- distinct templates
- global components
- font findings
- motion findings
- unresolved items

STOP after the audit.

---

## Phase 2 — Foundation + Global Shell

Read:
- SKILL.md
- DESIGN.md
- docs/reference-audit.md
- docs/route-map.md

Now establish:
- Next.js App Router
- strict TypeScript
- Tailwind
- Motion
- GSAP
- font setup
- CSS tokens based on audit
- global reset/base styles

Implement only:
- header
- desktop nav
- mega menu if reference uses it
- mobile nav
- location control/modal/drawer
- global floating controls
- cookie UI if visible
- footer

Match desktop/mobile independently.

Capture local screenshots and compare against reference.

Do not start homepage body until shell comparison is acceptable.

---

## Phase 3 — Homepage

Read all project guardrails.

Recreate the current production homepage from top to bottom.

Do not reuse remembered section ordering: inspect production again before coding.

For every section:
- match section height
- container width
- typography
- image crop
- card dimensions
- rail behavior
- buttons
- spacing
- responsive reflow
- animations

Use Motion/GSAP only when observed.

After implementation:
- compare 1440x900 full-page
- compare 430x932 full-page
- compare 390x844 full-page

Update `docs/visual-qa.md`.

Do not move to shop until major differences are resolved.

---

## Phase 4 — Shop PLP

Create a reusable shop listing template matching the reference.

Inspect at least 3 category pages with different filters before finalizing architecture.

Must cover:
- breadcrumb
- headings
- product count
- desktop filters
- mobile filter drawer
- varying filter groups
- sort
- product grid
- price
- compare price where present
- units
- badges
- sold out
- limited stock
- Add to Cart
- below-list editorial text where present
- responsive behavior

Data must be typed and separate from JSX.

Use route/config data to represent category differences.

Visual-compare at least:
- one large category
- one small category
- one category with multiple filter types
- mobile equivalent

---

## Phase 5 — Shop PDP

Inspect multiple live product detail pages before implementing.

Build the reusable shop PDP template.

Match:
- breadcrumb
- media gallery
- content column
- title
- price/unit
- badges
- inventory state
- CTA
- location/delivery UI
- information/accordions
- recommendations if present
- sticky behavior
- mobile ordering

Do not share gifting PDP blindly.

Run screenshot comparison desktop/mobile.

---

## Phase 6 — Gifting

Inspect:
- gifting catalog
- gifting collection
- at least 2 gifting products
- bulk gifting

Build gifting-specific components and templates.

Preserve:
- Gift Now vs Add to Cart behavior
- gifting editorial language/layout
- personalization messaging
- delivery messaging
- gifting reassurance/features
- concierge area
- FAQ
- gift-by-occasion content

Only share components with shop where visuals actually match.

Run visual QA.

---

## Phase 7 — Recipes + Stories + Content

Implement:
- recipe listing
- recipe detail
- stories listing/detail if public
- about
- services
- contact/supporting pages

For recipe detail match:
- title
- time
- difficulty
- tags
- author
- image
- instructions
- ingredients
- serves
- jump-to-recipe if present
- shop-ingredients if present

Do not turn editorial pages into generic card grids.

---

## Phase 8 — Route Coverage

Use `docs/route-map.md`.

Wire all discovered public routes to the correct reusable templates.

Do not create duplicated pages when one dynamic template can represent the UI.

Check:
- links
- breadcrumbs
- nav
- mobile navigation
- not-found behavior

---

## Phase 9 — Final Visual QA

Read `SKILL.md` and `DESIGN.md`.

Do a complete QA pass.

For each distinct template:
- reference screenshot
- local screenshot
- visual comparison
- desktop
- tablet
- mobile

Fix differences in this order:
1. geometry
2. type
3. image crop
4. spacing
5. colors
6. borders
7. controls
8. motion

Then run:
- lint
- typecheck
- production build
- browser smoke tests

Find:
- console errors
- hydration issues
- broken assets
- horizontal overflow
- missing links
- unclean animation teardown

Update `docs/visual-qa.md`.

Give a final list of known differences. Never call it pixel perfect if differences remain.
