# DESIGN.md — Foodstories Reference Guardrails

## Purpose

This file defines visual constraints for the Foodstories UI recreation.

It is deliberately conservative.

**The live reference wins over this document whenever there is a conflict.**

Reference:
https://www.foodstories.shop/

Do not interpret this as permission to invent missing design details.

---

# 1. Creative Direction

The target is not a generic ecommerce design.

The reference combines:
- premium food retail
- editorial storytelling
- commerce-heavy product browsing
- gifting
- recipes
- physical-store discovery
- service/concierge messaging

The design should feel like the reference, not like:
- Shopify Dawn
- a shadcn starter
- a generic luxury DTC store
- a generic grocery marketplace
- a dashboard
- a SaaS landing page

---

# 2. Global Principle

Whenever there is uncertainty:

**copy the observed relationship between elements, not your preferred styling.**

Examples:
- If the reference heading is unusually large, keep it large.
- If sections have generous whitespace, preserve it.
- If product cards are visually minimal, do not add elevated cards.
- If images touch container edges, do not add padding.
- If borders are square, do not round them.
- If an interaction is abrupt, do not add spring animation.

---

# 3. Typography

Typography must be measured from the reference.

Do not assign exact families/sizes until verified.

Required token categories:

```css
--font-display
--font-body

--type-navigation
--type-eyebrow
--type-body-sm
--type-body
--type-heading-sm
--type-heading-md
--type-heading-lg
--type-display
--type-price
```

Record for each:
- font family
- font weight
- size
- line-height
- letter-spacing
- casing

Do not use a universal `font-medium` / `font-semibold` approximation if the source differs.

Do not default to Inter.

---

# 4. Color

Extract current colors from screenshots/computed CSS.

Maintain semantic variables:

```css
--color-page
--color-surface
--color-text
--color-text-muted
--color-border
--color-accent
--color-accent-contrast
--color-success
--color-warning
--color-error
```

Do not add:
- extra gradients
- neon accents
- glass blur
- arbitrary pastel surfaces

unless verified.

---

# 5. Containers

Measure actual containers on desktop.

Define a small container system only after audit:

```css
--container-wide
--container-content
--page-gutter-desktop
--page-gutter-tablet
--page-gutter-mobile
```

Do not use `max-w-7xl mx-auto px-4` as an unverified default.

---

# 6. Spacing

Derive spacing rhythm from real repeated values.

Create only a compact scale.

Do not “normalize” unusual spacing if it appears intentionally on the reference.

Critical spacing to verify:
- header → first section
- section vertical rhythm
- heading → content
- product card image → title
- title → price
- filter row spacing
- breadcrumb spacing
- footer columns
- mobile gutters

---

# 7. Product Cards

Product cards should reproduce reference geometry.

Verify:
- image aspect ratio
- object-fit
- background
- badge location
- title line count
- title font
- price hierarchy
- unit placement
- CTA dimensions
- sold-out behavior
- hover behavior
- mobile differences

Do not automatically wrap cards inside:
- shadow
- border
- white floating surface
- radius

unless reference uses it.

---

# 8. Badges

Badges are content/state indicators, not decorative chips.

Possible reference states include:
- Bestseller
- Chef's Special
- Organic
- Pesticide Free
- Limited Stock
- Sold Out
- promotional descriptors

Each state must be styled from observed reference usage.

Do not make all badges look identical if reference differentiates them.

---

# 9. Buttons

Catalog button variants from reference before implementing.

Possible roles:
- primary CTA
- Add to Cart
- Gift Now
- Explore More
- Discover All
- concierge/contact
- outline/text navigation
- location selection

For each record:
- height
- padding
- border
- radius
- weight
- casing
- hover
- disabled/sold-out behavior
- icon placement

Do not substitute generic pill buttons.

---

# 10. Header

The header must be measured independently across breakpoints.

Track:
- total height
- logo dimensions
- nav position
- utility icons
- location affordance
- sticky behavior
- background
- borders
- menu dropdown/mega-menu
- mobile drawer

The desktop header and mobile header may be different component arrangements.

Do not merely hide desktop links and add a hamburger without matching reference composition.

---

# 11. Mega Menu / Navigation Overlay

When present, verify:
- activation trigger
- overlay width
- top offset
- background
- column count
- categories
- image/promotional content
- separators
- typography
- hover behavior
- close behavior
- outside click behavior

No invented mega-menu promo cards.

---

# 12. Homepage

Reproduce the live section order.

For every homepage section add a comment during development:

```tsx
{/* Reference: Home / [section name] */}
```

Remove comments later if noisy.

Potential content families visible on the reference include:
- food/category discovery
- product rails
- physical-store discovery
- shopping/service modes
- editorial brand values
- gifting
- explanatory SEO copy
- service/contact/footer information

Do not assume ordering from this file.

Audit current production.

---

# 13. Carousels / Rails

First determine whether the reference uses:
- true carousel
- draggable horizontal overflow
- auto marquee
- snap scroll
- slider controls
- breakpoint-based grid

Then reproduce that model.

Do not install Swiper automatically.

Native horizontal scroll is preferred when it can reproduce the reference accurately.

---

# 14. Filters

Desktop and mobile may differ.

Verify:
- side rail vs top controls
- group headings
- checkboxes
- separators
- collapsed groups
- product count
- mobile drawer
- sticky behavior
- clear/apply controls
- active filter summary

Do not use browser-default checkbox styling if source uses custom controls.

---

# 15. Product Detail

Shop PDP and gifting PDP must be audited separately.

Verify:
- gallery width
- thumbnails
- sticky content column
- information density
- CTA area
- delivery messaging
- reassurance blocks
- FAQ/accordion
- recommendations
- mobile order

Do not build one universal PDP before comparing both types.

---

# 16. Gifting

Preserve the more editorial/presentational gifting style where it appears.

Observe:
- large imagery
- descriptors
- price treatment
- personalization
- gift language
- reassurance feature icons
- concierge actions
- FAQ
- occasion content

Avoid reducing gifting pages to ordinary product pages.

---

# 17. Recipes

Recipes require editorial readability.

Verify:
- content width
- hero/center image width
- title measure
- metadata layout
- instructions format
- ingredient layout
- serving control/state
- separators
- shop-ingredients block

Do not impose ecommerce card styling on recipe prose.

---

# 18. Images

For every important image record:

```ts
{
  referenceAspectRatio: "...",
  desktopObjectPosition: "...",
  mobileObjectPosition: "...",
  cropBehavior: "cover | contain",
}
```

when needed.

The wrong crop can make an otherwise correct page look completely different.

Never use placeholder gradients in final matched sections.

---

# 19. Iconography

Prefer the exact permitted icons/assets.

If unavailable:
- reproduce simple icons with SVG
- match stroke width
- match viewBox proportions
- match dimensions

Do not mix icon families with visibly different stroke styles.

---

# 20. Borders / Radius / Shadows

These are measured attributes.

Do not apply:
- `rounded-xl`
- `shadow-lg`

by habit.

Centralize repeated values after verification.

---

# 21. Motion Language

Observed motion should define:
- calm vs snappy
- reveal distance
- duration
- easing
- stagger
- hover transformation
- scroll responsiveness

No arbitrary:
- bounce
- overshoot
- huge scale
- rotating UI
- parallax

unless observed.

---

# 22. Responsive Rules

Each component should record actual responsive changes.

Example:

```md
### ProductGrid
Desktop:
- N columns
- X gap

Tablet:
- N columns
- X gap

Mobile:
- N columns
- X gap
- filter moves into drawer
```

Do not write values until measured.

---

# 23. Mobile

Treat mobile as a first-class reference, not a compressed desktop layout.

Verify:
- header
- navigation
- page gutter
- titles
- product grid
- filter/sort controls
- fixed CTAs
- carousels
- accordions
- footer
- location modal
- cookie controls

---

# 24. Content Width

Editorial text should use measured readable widths.

Do not let paragraphs span the full desktop container unless reference does.

Pay special attention to:
- homepage storytelling
- category SEO text
- recipe instructions
- FAQ answers
- about/services copy

---

# 25. Z-index

Define predictable layers after inspecting overlays.

Example categories:
- content
- sticky header
- dropdown
- backdrop
- drawer/modal
- toast/floating action

Avoid random `z-[99999]`.

---

# 26. Visual QA Threshold

A page is not approved if any of these are clearly wrong:
- wrong font
- wrong header proportions
- wrong container width
- wrong hero height
- wrong product-card crop
- wrong grid count
- wrong section order
- wrong background
- wrong CTA shape
- missing visible fixed UI
- mobile overflow
- invented animation

Fix geometry before fine detail.

---

# 27. Anti-Randomness Rules for Cursor

Cursor must NOT:
- add gradients without evidence
- add glassmorphism
- add rounded cards without evidence
- make all images radius 16px
- make all buttons pills
- add generic feature-icon rows
- create made-up stats
- create made-up testimonials
- create made-up navigation items
- use stock imagery to fill missing reference assets without marking it as placeholder
- add ubiquitous fade/slide animations
- rearrange content for “better UX”
- redesign mobile
- simplify unusual reference composition

If an asset or layout is unknown, leave a documented TODO rather than filling the gap creatively.

---

# 28. Review Questions

Before committing a visual component, ask:

1. Where did this spacing value come from?
2. Where did this radius come from?
3. Where did this font weight come from?
4. Where did this animation come from?
5. Is this layout visible on the reference?
6. Did I inspect mobile?
7. Is this shared component actually visually shared?
8. Is any part of this component based only on my preference?

If #8 is yes, re-check the reference.

---

# 29. Final Standard

The desired reaction should be:

> “This looks like the reference website.”

Not:

> “This looks inspired by Foodstories.”
