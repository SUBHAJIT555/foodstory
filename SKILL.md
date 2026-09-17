---
name: foodstories-reference-recreation
description: Reference-first workflow for recreating the Foodstories website UI in Next.js, TypeScript, Tailwind CSS, Motion, and GSAP without creative drift.
---

# Foodstories UI Recreation Skill

## Mission

Reproduce the visible public UI of `https://www.foodstories.shop/` as faithfully as possible.

The reference website is the visual authority.

This skill exists to prevent:
- invented layouts
- default Tailwind aesthetics
- arbitrary animations
- typography drift
- inconsistent spacing
- fake design-system components
- premature coding before inspection
- “similar” instead of reference-matched output

---

## Hard Rules

1. **Inspect before implementing.**
2. **Never redesign the reference.**
3. **Never guess when the browser can answer the question.**
4. **Never introduce a visual pattern because it is trendy.**
5. **Never replace a unique reference pattern with a generic component-library pattern.**
6. **Motion must come from observation.**
7. **Use reusable components only for genuinely repeated patterns.**
8. **Use server components unless browser state/animation requires a client component.**
9. **Keep strict TypeScript.**
10. **Run visual QA after every major template.**
11. **Document unknowns instead of silently inventing behavior.**
12. **Do not hotlink third-party production assets.**
13. **Use copyrighted/proprietary assets only when project rights permit.**

---

# Required Stack

- Next.js App Router
- TypeScript strict
- Tailwind CSS
- Motion for React
- GSAP
- GSAP ScrollTrigger only when required by reference
- Next/Image
- next/font where applicable

---

# Required Reference Documents

Maintain:

- `docs/reference-audit.md`
- `docs/route-map.md`
- `docs/open-questions.md`
- `docs/visual-qa.md`
- `DESIGN.md`

Before changing a major visual pattern, check `DESIGN.md`.

---

# Decision Priority

When multiple approaches are possible, use this order:

1. visible reference behavior
2. measured screenshots/computed styles
3. recurring pattern elsewhere on the reference
4. existing project design tokens
5. documented assumption

Personal preference is not a valid decision source.

---

# Reference Inspection Checklist

For each distinct template inspect:

### Layout
- viewport width
- max container
- gutters
- sections
- columns
- gaps
- alignment
- negative space
- overflow behavior

### Typography
- family
- weight
- size
- line-height
- letter spacing
- transform
- text width
- wrapping

### Surfaces
- background
- borders
- divider
- radius
- shadow
- image framing

### Interactions
- hover
- press
- focus
- active
- disabled
- sold out
- limited stock
- loading

### Motion
- trigger
- duration
- delay
- easing
- distance
- direction
- scale
- opacity
- stagger
- scroll coupling

### Responsive
- desktop
- laptop
- tablet
- mobile
- hidden/swapped content
- order changes
- horizontal scrolling
- drawers

---

# Component Discipline

Before creating a component ask:

> Does this pattern occur more than once, or is it independently interactive?

If no, keep it local.

Good reusable components include:
- Header
- DesktopNav
- MobileNav
- MegaMenu
- Breadcrumbs
- ProductCard
- ProductGrid
- ProductBadge
- FilterGroup
- FilterDrawer
- SortControl
- ProductGallery
- GiftCard
- RecipeCard
- Accordion
- StoreCard
- Footer

Do not create meaningless wrapper abstractions.

---

# Styling Discipline

Use Tailwind for:
- normal layout
- spacing
- type
- responsive states
- hover/focus
- straightforward transitions

Use CSS modules/global CSS only when:
- animation requires complex selectors
- pseudo-elements are cleaner there
- custom clipping/masks are needed
- the reference requires special behavior

Use CSS variables for verified global tokens.

Never use arbitrary values everywhere before extracting recurring values.

---

# Animation Discipline

### CSS
Use for simple:
- hover color
- border
- opacity
- transform
- button states

### Motion
Use for:
- drawers
- menu presence
- modal
- accordion
- simple reveal
- interactive states

### GSAP
Use for:
- sequenced timelines
- pinned/scrubbed sections
- complex coordinated transitions
- reference-specific scroll animation

Never use GSAP because it looks impressive.

---

# GSAP Implementation Rules

```ts
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // animations
  }, rootRef);

  return () => ctx.revert();
}, []);
```

- register plugins centrally
- clean up every animation
- use `gsap.matchMedia()` for responsive animation
- prefer transform + opacity
- avoid repeated layout reads/writes
- never create global triggers with no cleanup

---

# Visual QA Loop

For each target viewport:

1. reference screenshot
2. local screenshot
3. side-by-side comparison
4. overlay/difference if practical
5. identify top 5 mismatches
6. fix
7. repeat

Prioritize mismatch correction in this order:

1. overall geometry
2. typography
3. image size/crop
4. spacing
5. color
6. borders
7. micro-details
8. motion

Do not waste time tuning 1px icons while major section heights are wrong.

---

# Screenshot Test Viewports

Required baseline:
- 1440x900
- 1280x800
- 1024x1366
- 768x1024
- 430x932
- 390x844
- 375x812

---

# Route Strategy

Do not manually duplicate thousands of pages.

Identify templates and model routes through data.

Typical template groups:
- home
- shop listing
- shop product
- gifting listing
- gifting product
- recipe listing
- recipe detail
- story listing
- story detail
- generic editorial/content

Use dynamic routes when appropriate.

---

# Shop Rules

The shop listing system must support varying filter groups per category.

Examples seen across public pages include:
- lifestyle
- allergens
- preparation
- category-specific filters

The UI model must permit different filter configurations without duplicating the entire page.

Product cards can contain reference-dependent:
- promo labels
- bestseller
- chef special
- organic
- sold out
- limited stock
- price / compare price
- unit
- CTA

Do not display every possible badge at once.

---

# Gifting Rules

Gifting may share primitives with shop, but not necessarily layout.

Preserve gifting-specific:
- card treatment
- CTA wording
- gifting labels
- concierge
- personalization
- delivery info
- reassurance
- FAQ
- occasion/category storytelling

---

# Recipe Rules

Recipe pages are editorial content, not ecommerce PLPs.

Preserve their specific hierarchy:
- title
- metadata
- image
- instructions
- ingredients
- serves
- optional intro
- optional jump link
- optional ingredient shopping

Avoid making them look like a generic blog.

---

# Performance Rules

- no unnecessary client components
- no unoptimized full-resolution assets
- preserve aspect ratio
- reserve image dimensions
- lazy-load below fold
- avoid giant JS sliders if native scroll can reproduce the reference
- no global GSAP timeline for unrelated pages

---

# Accessibility Rules

Do not visually diverge from reference, but use:
- semantic buttons/links
- keyboard support
- proper focus
- labels
- aria state
- ESC close
- focus trap
- reduced motion

---

# Failure Conditions

Stop and correct course if any of these happens:

- UI starts looking generically “luxury ecommerce”
- new gradients appear without reference evidence
- excessive rounded corners appear
- random fade-up animations appear everywhere
- body font silently becomes Inter
- layouts are approximated without screenshots
- homepage is built before site audit
- all pages use one generic card despite visible reference differences
- mobile is simply desktop squeezed smaller
- CSS values drift independently across duplicated components

---

# Session Checklist

Before declaring a task complete:

```md
- [ ] reference inspected
- [ ] desktop compared
- [ ] mobile compared
- [ ] interaction checked
- [ ] motion checked
- [ ] no invented UI
- [ ] no console errors
- [ ] typecheck passes
- [ ] lint passes
- [ ] production build passes when relevant
- [ ] remaining mismatch documented
```

---

# Cursor Response Format

After each task:

```md
## Completed
...

## Reference evidence
...

## Files changed
...

## Visual differences still known
...

## Next task
...
```

Never hide remaining differences.
