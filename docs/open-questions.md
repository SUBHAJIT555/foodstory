# Open questions

Format required by MASTER_PROMPT. Only items that could not be verified from the live reference, sitemaps, or computed styles.

Phase 8 status key: `RESOLVED` | `STILL OPEN` | `NO LONGER RELEVANT` | `OUT OF SCOPE`

---

## [font licensing / substitution]

Status: STILL OPEN

Observed:
Live families are Gilroy (UI) and Russolo (display), plus Ivy / Handlee. This repo does not have rights to those files.

Unclear:
Whether licensed files will be added later.

Current implementation assumption:
Outfit (`--font-gilroy-sub`) substitutes Gilroy. Fraunces (`--font-russolo-sub`) substitutes Russolo. Not metric-identical. Do not use Inter.

Confidence:
high

---

## [homepage catalog photography / brand video]

Status: STILL OPEN

Observed:
Live homepage banners, category circles, product/gift/store photos, Many Ways tiles, login plate, and the Guardians desktop/mobile mp4 are CloudFront/S3 assets.

Unclear:
Whether this project may bundle those files.

Current implementation assumption:
Local cream/charcoal/fig SVG placeholders preserve measured boxes. Do not hotlink production catalog or S3 video.

Confidence:
high

---

## [official wordmark / app badges]

Status: STILL OPEN

Observed:
Live logo is `Black_FS_Logo` (176×42 header, 288×69 footer). App row uses App Store / Play badge images (129×43 and 145×43 on mobile).

Unclear:
Whether this project may bundle those assets.

Current implementation assumption:
Local SVG wordmark + outlined text badges. Do not hotlink production `/_next/static/media/*`.

Confidence:
high

---

## [homepage header invert]

Status: RESOLVED

Observed:
Homepage nav wrapper class includes `text-white` and the live wordmark is `White_FS_Logo`. Hero sits under the sticky header (hero y≈29). Chrome does not appear to swap on scroll in the inspected session.

Unclear:
—

Current implementation assumption:
`/` uses white wordmark + `text-white`. Other routes stay charcoal. Hero and sticky shop/PDP chrome use `--header-sticky-*-current`, which drops from 154/163 to 124/133 when the announcement is dismissed.

Confidence:
high

---

## [SHOP mobile children]

Status: RESOLVED

Observed:
Mobile drawer SHOP row is `flex justify-between` with a chevron. Desktop mega is three columns.

Unclear:
Whether mobile SHOP slides to a second panel, expands L1 in place, or jumps to `/shop/`.

Current implementation assumption:
In-drawer L1 list from the verified mega slugs. Do not invent a second visual template.

Confidence:
low

---

## [search trending rail]

Status: RESOLVED

Observed:
Open overlay on production (2026-09-13) shows Popular Searches chips, a Trending Products heading, rail cards (Salt Bread, Truffle Croissant Chips, Thai Guacamole), and Explore More → `/shop/`.

Unclear:
—
Current implementation assumption:
Fixture cards from `trendingSearchSlugs`. No extra SKUs invented.

Confidence:
high

---

## [cart / login / shelf open states]

Status: OUT OF SCOPE

Observed:
Header buttons exist. Login a11y copy includes “Login for a delightfully personalised experience!”

Unclear:
Drawer vs modal, empty states, form fields, cart line items.

Current implementation assumption:
Empty right-hand drawers titled Cart / Login / My Shelf until those states are filmed.

Confidence:
low

---

## [location geolocation success]

Status: STILL OPEN

Observed:
Open UI: “Choose Your Delivery Location”, Home Delivery / Pickup tabs, four pickup stores, disabled CONTINUE (`bg-[#cccccd]`), error copy when unavailable.

Unclear:
Success path after a supported pin, map/autocomplete field chrome, and what the location pill shows after confirm.

Current implementation assumption:
Do not invent extra cities. Keep CONTINUE disabled until a real selection flow is captured.

Confidence:
medium

---

## [mega L1 leftovers]

Status: STILL OPEN

Observed:
Verified L1 slugs are in `src/data/navigation.ts`. Earlier passes also mentioned Fresh Meals and Cuisines.

Unclear:
Cuisines had no href. Fresh Meals may map to `/shop/meals-on-the-go/`.

Current implementation assumption:
Do not add either until a live mega pass records label + href together.

Confidence:
medium

---

## [motion timing]

Status: STILL OPEN

Observed:
Location tabs and search wrap use `duration-300`. Announcement / placeholder rotate. Live announcement is Slick.

Unclear:
Ticker interval, placeholder interval, mega enter, drawer easing.

Current implementation assumption:
300ms ease-out for overlays. 4000ms rotate for announcement and search placeholder. No GSAP ScrollTrigger.

Confidence:
low

---

## [/shop/ vs /category/ listings]

Status: RESOLVED

Observed:
Both render the shop-listing template and `?pageIndex=`. `/category/fruits-vegetables/` breadcrumb is Home • Fruits Vegetables (no Shop). One 1440 pass also showed a different H1 class and related-collection filters on `/category/`.

Unclear:
Whether `/category/` 301s in some environments, and whether the H1/filter drift is A/B or a distinct index.

Current implementation assumption:
Both routes render `shop-listing`. Category crumbs omit Shop. Filters/H1 follow the `/shop/` variant.

Confidence:
medium

---

## [PLP empty / loading]

Status: STILL OPEN

Observed:
Listings show “N Products Available” and infinite `pageIndex` pages. Empty and skeleton states were not reached safely.

Unclear:
Copy, illustration, and CTA when filters yield zero, and whether a skeleton exists on first paint.

Current implementation assumption:
Count updates to `0 Products Available`. No invented empty illustration or skeleton shimmer.

Confidence:
low

---

## [hero display type]

Status: STILL OPEN

Observed:
Homepage hero uses a still-life carousel. Ivy faces are loaded.

Unclear:
Hero headline family/weight/size. Phase 3.

Current implementation assumption:
Do not assign Outfit/Gilroy/Inter to the hero until computed style is captured at scrollY = 0.

Confidence:
low

---

## [filter groups / ATC / stories]

Status: STILL OPEN

Unchanged from Phase 1. See git history of this file if needed: filter-group matrix, desktop card hover ATC, story detail variants. Not required for the global shell.

---

## [PDP share dialog]

Status: STILL OPEN

Observed:
Gallery share is a Radix `aria-haspopup=dialog` control (`rounded-full bg-white p-2`). Title row uses speaker + heart, not share.

Unclear:
Full share-sheet contents (WhatsApp / copy / native share).

Current implementation assumption:
Copy-link popover only. Do not invent social buttons.

Confidence:
medium

---

## [PDP sold-out / delivery]

Status: STILL OPEN

Observed:
Inspected shop PDPs all showed Add to Cart. No quantity stepper. No delivery ETA on the product column.

Unclear:
Sold-out CTA copy, disabled styling, and location-specific availability on the PDP.

Current implementation assumption:
Reuse `Add to Cart` / `Sold Out` + `disabled:opacity-70`. No invented urgency or delivery copy.

Confidence:
low

---

## [PDP reason-to-crunch art]

Status: STILL OPEN

Observed:
Ripe Hass Avocado shows six CloudFront SVGs (Gut Health, Immunity Booster, Brain Fuel, Anti-Inflammatory, Rich in Antioxidants, Rich in Minerals), image-only, `h-24 w-24 lg:h-28 lg:w-28`, `animate-bounce-x`.

Unclear:
Whether every SKU shares this set, and the exact bounce keyframes.

Current implementation assumption:
Local placeholder marks with the observed labels. Slow 2.4s translate-x pulse. Do not hotlink CloudFront.

Confidence:
medium

---

## [PDP FAQ remainder]

Status: STILL OPEN

Observed:
First two ripe-avocado answers captured from live HTML. Remaining FAQ questions listed; some answers are reconstructed from visible first-answer pattern.

Unclear:
Exact remaining answer copy on every SKU.

Current implementation assumption:
Fixture answers stay faithful where captured; others are short and product-specific, not marketing filler.

Confidence:
medium

---

## [bulk enquiry step 7]

Status: STILL OPEN

Observed:
Steps 1–6 on `/bulk-gifting/`: city radios; occasion radios; quantity stepper; dietary radios; budget radios; “When is the big day?” with Select Date. Next stays disabled until the step is complete.

Unclear:
Exact step-7 heading, fields, placeholders, and submit label after a date is chosen.

Current implementation assumption:
Step 7 uses the observed process line “Tell us your story” plus an email field. Frontend-only submit. Do not invent Full Name / company / file upload.

Confidence:
low

---

## [gifting catalogue PDF / BYOB interior]

Status: STILL OPEN

Observed:
Landing CTA “Download Catalogue” points at a licensed S3 PDF. “Create Your Own” goes to `/gifting/build-your-own-box/select-box/`. FAQ mentions a Gifting Personalisation form.

Unclear:
Whether the PDF may be bundled, the full BYOB box-picker chrome, and whether the personalisation form is a distinct public URL.

Current implementation assumption:
Catalogue is `href="#"`. BYOB page restates observed personalize copy only. No extra form URL.

Confidence:
medium

---

## [recipe listing + More taxonomy]

Status: STILL OPEN

Observed:
`/recipes/list/` shows Brunch, Lunch Ideas, Easy Dinners, Quick Bites, Dessert and a “+ More” control. Live count reads “166 Recipes Available”. Listing uses infinite-scroll, not numbered pages.

Unclear:
The extra categories revealed by More, and the full 141-slug recipe bodies.

Current implementation assumption:
More toggles the same five observed filters. Fixture set is a representative slice. Whipped Avocado Toast is the fully transcribed detail.

Confidence:
medium

---

## [recipe hero video]

Status: STILL OPEN

Observed:
Whipped Avocado Toast uses a custom `<vimeo-video src="https://vimeo.com/906278351">` in `h-144 md:h-192.5`. Video nodes were empty in the CDP session.

Unclear:
Whether the project may embed that Vimeo file.

Current implementation assumption:
Local framed placeholder at the measured height. Do not hotlink Vimeo or CloudFront.

Confidence:
high

---

## [story type remaps]

Status: RESOLVED

Observed:
`/stories/hierarchical/truffle-101/` now resolves to `/stories/article/everything-you-want-to-know-about-truffle/`. Article / listicle / hierarchical share the same article chrome; hierarchical adds H2s + Related Articles.

Unclear:
Whether remaining sitemap hierarchical URLs still exist as distinct layouts.

Current implementation assumption:
`[type]/[slug]` serves all three; `truffle-101` is aliased.

Confidence:
medium

---

## [kitchen-studio / service forms]

Status: RESOLVED

Observed:
Services CTAs go to `/form/bespoke-orders/`, `/kitchen-studio/`, `/form/personal-shopper/`. Those are not `/services/:slug/` pages.

Unclear:
Kitchen Studio page chrome (Phase 8).

Current implementation assumption:
Phase 8 implements `/kitchen-studio/`, `/form/personal-shopper/`, and `/form/bespoke-orders/` from observed chrome. No `/services/:slug/` pages.

Confidence:
high

---

## [gifting photography / client logos]

Status: STILL OPEN

Observed:
Landing hero, type tiles, gift products, bulk packs, and TRUSTED BY logos are CloudFront / `_next/static/media` assets.

Unclear:
Whether this project may bundle those files.

Current implementation assumption:
Local placeholders. Logo row uses unmarked blocks. Do not hotlink production media.

Confidence:
high

---

## [live unknown URL behaviour]

Status: STILL OPEN

Observed:
`/this-page-does-not-exist-xyz/` on the live site redirected to `/` (homepage title and hero). A dedicated 404 template was not observable.

Unclear:
Whether some environments show a branded 404 instead of a homepage redirect.

Current implementation assumption:
Local invalid records and unknown paths use a site-consistent `not-found.tsx` (Home / Shop CTAs). Do not recreate the live homepage redirect for missing SKUs.

Confidence:
medium

---

## [personal shopper time slots]

Status: STILL OPEN

Observed:
The live form has `Select Time Slot*` as a listbox. Exact slot labels were not fully captured.

Unclear:
Store-specific slots and disabled past times.

Current implementation assumption:
Shared reconstructed slots: 10:00 AM, 11:30 AM, 1:00 PM, 3:00 PM, 5:00 PM, 6:30 PM.

Confidence:
low

---

## [policy sidebar full copy]

Status: STILL OPEN

Observed:
Policy chrome lists Material Release, Cookie Policy, Shipping, Returns, Privacy, Kitchen Studio Policy, Terms and Services (`/policies/terms-services/`), Weekend of Plenty T&C. Shipping, returns, and privacy bodies were captured. `/policies/` exists as a hub.

Unclear:
Full legal text for Weekend of Plenty, Material Release, Kitchen Studio Policy, and Terms.

Current implementation assumption:
Footer-linked policies use captured copy. Remaining policies use short observed-style summaries plus care@ / phone. Do not invent extra clauses.

Confidence:
medium

---

## [FAQ bulk-gifting tab slug]

Status: RESOLVED

Observed:
FAQ index tabs include Bulk Gifting. Core sitemap listed seven FAQ children and did not include a bulk-gifting FAQ URL.

Unclear:
Whether live uses `/faqs/bulk-gifting/` or only an in-page tab.

Current implementation assumption:
`/faqs/bulk-gifting/` is implemented so the observed tab is addressable.

Confidence:
medium
