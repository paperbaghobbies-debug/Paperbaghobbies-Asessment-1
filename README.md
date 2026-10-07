# Paperbag Hobbies

A responsive front-end website for a small business that sells 3D-printed tabletop miniatures, sci-fi proxy terrain and custom CAD commissions.

Built for the Gateway Qualifications Level 5 Diploma in Web Application Development, Unit 1: User Centric Front End Development (Y/650/3525).

> **Status:** work in progress. Sections marked `TODO` are completed as each build phase finishes.

---

## Contents

1. [Purpose](#1-purpose)
2. [Target Audience and User Stories](#2-target-audience-and-user-stories)
3. [UX Design and Rationale](#3-ux-design-and-rationale)
4. [Design System](#4-design-system)
5. [Technology Stack](#5-technology-stack)
6. [Development Decisions](#6-development-decisions)
7. [Testing](#7-testing)
8. [Version Control](#8-version-control)
9. [Deployment](#9-deployment)
10. [Attribution](#10-attribution)

---

## 1. Purpose

Paperbag Hobbies is a real, independently run online shop that sells Warhammer-compatible proxy miniatures made by a range of third-party creators. The range covers two settings: the grimdark far future and medieval fantasy. This website is the shop front for the business, and the owner is the client for this project.

### 1.1 The problem

Proxy models come from many independent creators, so hobbyists often have to search several places to find what they need. One storefront that gathers a range of models and groups them by setting makes them quicker to find and to buy. `[CLIENT-CONFIRM]`

### 1.2 Client requirements

The owner supplied the colour palette, the visual style and the requirements below. `[CLIENT-CONFIRM: add the date and how they were agreed]`

| Requirement | Source | How the site addresses it |
|---|---|---|
| Eye-catching, brand-led visual style | Owner brief | Owner's palette and mascot artwork, contrast-checked (section 4.3) |
| Easy to navigate | Owner brief | Persistent header navigation, clear page names and a skip link |
| Helps customers find and buy models | Owner brief | Browsing by setting and category, clear prices and a clear purchase action |
| Featured promotional models in a homepage hero slideshow | Owner brief | Hero slideshow with user-controlled navigation |
| Lightbox for viewing images | Owner brief | Accessible lightbox for enlarged product images |
| Responsive across devices | Owner brief | Mobile-first layout tested from 320px to 1440px |
| PayPal payments | Owner brief | Planned for a later project, so out of scope here (section 1.5) |

### 1.3 Target audience

The age ranges are working estimates based on general tabletop hobby demographics, not measured data. They will be checked against the owner's customer insights.

| Audience | Est. age | Needs | Design response |
|---|---|---|---|
| Core wargamers (primary) | 25 to 44 | Find models for their armies quickly, with clear prices and scale information | Filtering by setting, detailed product information |
| D&D and tabletop RPG players | 18 to 40 | Find single character and monster models | Strong product images, easy browsing |
| Newer and younger hobbyists | 16 to 24 | A fast, phone-friendly experience | Mobile-first layout, 44px touch targets |
| Returning and older hobbyists | 45 to 60+ | Readable, simple pages | High contrast, resizable text, plain navigation |
| Gift buyers (secondary) | 30 to 60 | Understand the range without jargon | Plain category names, an obvious route to buy |

### 1.4 Value the site provides

- A visitor can tell what the shop sells within seconds of arriving.
- Current promotions are visible on the homepage.
- Models can be browsed by setting, and product images can be enlarged to check detail before buying.
- The site works on phones, tablets and desktops, and can be used by keyboard and screen reader.

### 1.5 Scope

This project delivers the front end: HTML, CSS and light JavaScript for the navigation, slideshow and lightbox. PayPal payment, accounts and order handling need a back end and are planned for later projects. No form data is sent anywhere at this stage, and the site says so wherever a form appears.

### 1.6 Development approach

The site is built as separate, semantic HTML pages first, validated page by page. CSS is written mobile-first with design tokens. JavaScript is then added only for interactive features. Each step is tested before the next begins, and each feature is committed separately.

---

## 2. User Stories

| ID | User story | Acceptance criteria |
|---|---|---|
| US01 | As a first-time visitor, I want to see straight away that the site sells Warhammer-compatible proxy models, so I can decide if it is for me. | The headline and one supporting sentence state the offer. A link to the shop is visible without scrolling at 375px and 1280px. |
| US02 | As a returning customer, I want to see current promotions on the homepage, so I can spot deals. | A hero slideshow shows featured models. Previous and next controls work by mouse, touch and keyboard. Nothing moves unless the user acts. |
| US03 | As a wargamer, I want to browse by setting and category, so I can find models for my army. | Models are grouped by grimdark future and fantasy medieval. A filter shows only matching products. |
| US04 | As a shopper, I want to enlarge product images, so I can check the detail before buying. | A lightbox opens from a product image. `Escape` closes it, focus stays inside while open, and focus returns to the image on close. |
| US05 | As a shopper, I want a clear way to buy a model, so I can complete a purchase. | Each product shows its price and a purchase action. Payment is described as coming soon until PayPal is added. |
| US06 | As a mobile user, I want a layout that fits my screen, so I can browse comfortably. | No horizontal scrolling from 320px to 1440px. Links and buttons are at least 44px tall. |
| US07 | As a keyboard or screen reader user, I want to navigate every page independently. | A skip link is the first focusable item. Focus is always visible. Images have meaningful alt text. Text meets WCAG AA contrast. |
| US08 | As a customer, I want to find delivery, returns and contact details, so I can get help. `[CLIENT-CONFIRM]` | These details are reachable from the footer of every page. |

Each story's acceptance criteria become tests in [TESTING.md](TESTING.md), and each test names its story ID.
---

## 3. UX Design and Rationale

`TODO:` cover the five UX principles from the unit specification:

- **Information hierarchy:** clear headings, priority-based layout
- **User control:** no autoplay media, no unrequested pop-ups
- **Consistency:** shared header, footer and component styles
- **Confirmation:** visible feedback after every user action
- **Accessibility:** contrast, alt text, keyboard support, focus management

### Wireframes

`TODO:` add wireframe images (desktop, mobile, modal) and explain the reasoning behind each.

### Design decisions that depart from common UX guidance

Colour palette: the original palette failed WCAG AA contrast and was revised. See [4.3 Colour contrast and the palette change](#43-colour-contrast-and-the-palette-change).

`TODO:` list and justify any other deliberate departures (required for Distinction).

---

### 3.1 Competitor review

**Method**

- **Selection:** three independent shops in the same hobby area were chosen for comparison.
- **Date and tools:** all testing was done on 06/10/2026 in Chrome DevTools, on each site's homepage only.
- **Views:** a desktop view and a 375px mobile view (device toolbar, iPhone SE profile).
- **Measures:** Lighthouse (mobile) for performance, accessibility, best practices and SEO; the Network tab with cache disabled for requests and data transferred; the Elements tab and console queries for page structure; hover inspection for control sizes; and direct observation for hero movement.
- **Rules:** facts are recorded before opinions. Anything not checked is marked "Not tested". Lighthouse scores vary between runs, so each is reported with its run conditions. Console error counts are not used, because browser extensions and blocked third-party requests inflate them. No images, code or text were copied. Supporting screenshots are held privately and can be shown on request.

| Site | Address | What it appears to sell |
|---|---|---|
| Piper Makes | https://pipermakes.art | Digital model file sets and a membership (from the navigation labels) |
| Gear Guts Mek Shop | https://geargutsmekshop.com | Made-to-order miniatures and digital files from several named ranges (from the homepage banners) |
| Archie's Forge | https://www.archiesforge.co.uk | Miniatures, terrain, bases and hobby supplies (from the navigation labels) |

All three appear to be built on a hosted shop platform (Shopify), judging by element ids and request names.

**Measured comparison (mobile)**

| Measure | Piper Makes | Gear Guts Mek Shop | Archie's Forge |
|---|---|---|---|
| Lighthouse performance | 57 and 64 (two runs) | 65 (a) | 42 (b) |
| Lighthouse accessibility | 96 | 93 | 85 |
| Lighthouse best practices | 92 and 73 (two runs) | 73 | 92 |
| Lighthouse SEO | 92 and 100 (two runs) | 92 | 85 |
| Largest Contentful Paint | 7.3 s (first run) | 6.5 s | 7.5 s |
| Total Blocking Time | 230 ms (first run) | 250 ms | 1,620 ms |
| Layout shift | 0 | 0 | 0.002 |
| Requests and data transferred, cache disabled | 159 requests, 4.0 MB | 309 requests, 10.0 MB | 530 requests, 5.6 MB |
| Menu button at 375px | 28 × 28px | Not measured | 40 × 65.6px |

(a) Lighthouse warned that the page loaded too slowly and results may be incomplete.
(b) Lighthouse warned that browser extensions affected the run.

A Largest Contentful Paint of 2.5 s or less is rated good by Lighthouse. All three sites are well above it.

**Findings**

| Aspect | Piper Makes | Gear Guts Mek Shop | Archie's Forge | Decision |
|---|---|---|---|---|
| First impression | Hero headline names the current product release but does not say in plain words what the business is. | Banner shows the shop name and a made-to-order notice, so the purpose is clear, but the page is dense with competing banners. | Hero advertises one product (custom name plates). The wider range is explained only by the menu labels. | D1 |
| Navigation and categories | Three top-level links, one with a dropdown. At 375px these collapse into a hamburger menu beside search and cart icons. The button is named "Menu" and is keyboard-focusable. | On desktop, a left column of image links leads to named ranges, with no text menu. At 375px the menu collapses to a three-line icon placed below the banner, with search and cart icons above. The icon's own button size was not measured. | Ten text links grouped by army type, terrain, scale and supplies, plus wishlist, rewards and help. At 375px the menu collapses to a button named "Show menu" (keyboard-focusable) beside search, a centred logo, and account and cart icons. | D2 |
| Promotions | Announcement bar with a discount code, wrapping to two lines on mobile. No hero movement was observed, so the hero is static. | Three static image banners stacked on the homepage: a Patreon invitation, a sale with discounts and stated exclusions, and a bases question. No end date visible in the capture. Hero movement not tested. | Delivery announcement bar, whose text is cut off at 375px (movement not confirmed), and one hero banner with a button. A "New releases" and "Best sellers" switch sits below. Hero movement not tested. | D4, D16, D17 |
| Product cards and images | One large hero image beside a headline and a single button. Lighthouse flags images without explicit width and height. | A "New Releases" section follows the banners, shown as a two-column thumbnail grid at 375px. Detail is not legible in the capture. Image click behaviour not tested. | Image-led grid, four columns on desktop and two at 375px, with text "NEW" badges on most cards. Price and creator details not visible in the captures. Lighthouse reports images without alt attributes. | D3, D10, D18 |
| Buying flow | Not tested | Not tested | Not tested | Backlog |
| Trust signals | Not tested | Lead time (4 to 6 weeks) and sale exclusions are stated openly. The footer lists About, an affiliate programme, Shipping and Contact, with payment icons (including PayPal) and a copyright line. No returns or privacy link and no non-affiliation wording seen in the captured part of the footer. | Delivery notice that mentions duties, plus help, rewards and wishlist links. A cookie consent bar covers about a quarter of the screen at 375px (visual estimate). Footer not tested. | D6, client proposal |
| Mobile and accessibility | Skip link first, with header, nav, main and footer landmarks. No images missing alt text, and 4 of 8 have empty alt. No horizontal scroll at 375px. Three `<h1>` elements on the homepage. Lighthouse reports links without a discernible name and role conflicts. | The footer is exposed as a contentinfo landmark. Lighthouse reports frames without titles and links without a discernible name. Banner headlines and labels appear to be images, and alt text was not checked. Other landmarks and the `<h1>` count not tested. | Lighthouse reports images without alt attributes, links without a discernible name, prohibited ARIA attributes, and links that rely on colour to be distinguished. The desktop hero headline sits directly over busy imagery (contrast not measured). Landmarks, `<h1>` count and skip link not tested. | D5, D7, D8, D9, D12, D13, D14, D15, D18, D19, D20 |
| Performance | See the measured comparison. Lighthouse flags missing image dimensions and possible image savings. | See the measured comparison. Lighthouse also reports 32 third-party cookies. | See the measured comparison. | D10, D11 |
| Visual style and IP | Dark charcoal and slate palette, minimal. Non-affiliation wording not tested. | Bold yellow and purple theme with a strong identity, consistent across banners but very busy. Partner names appear in image links. | Black header and white text, with photography doing most of the work. Category labels use setting-specific terms. Non-affiliation wording not tested. | Section 4 |

**Limitations:** the review covers each site's homepage on a single date, using one device profile. Lighthouse run conditions varied: the Gear Guts report warned of incomplete results and the Archie's Forge report warned that extensions affected it, so those two scores are indicative only. Cells marked "not tested" were outside the scope of this review. The three sites also differ from Paperbag Hobbies, which resells models from several third-party creators, so the lessons concern layout, accessibility and performance and not business model. The findings informed design decisions and are not a full audit.

### 3.2 What the review taught us

1. **Basic accessibility is widely missed.** Lighthouse reports links without a discernible name on all three sites. Archie's Forge also has images without alt text, prohibited ARIA attributes and links that rely on colour, Gear Guts has frames without titles, and Piper Makes has three `<h1>` elements and a 28px menu button. Getting these basics right is achievable and directly supports the accessibility criteria.
2. **Performance is weak across the board.** Largest Contentful Paint ranged from 6.5 to 7.5 s, and a single load needed 159 to 530 requests and 4.0 to 10.0 MB. Hosted shop platforms load many scripts. A hand-built static site can avoid most of that overhead, so a performance budget (section 3.4) is a realistic advantage. This is a hypothesis to be confirmed by measuring our own pages with the same method.
3. **Information up front builds trust.** Archie's Forge opens with a delivery notice, and Gear Guts states a lead time, sale exclusions, and shipping and contact links in its footer.
4. **Menu size varies from three to ten links.** Mobile menu buttons measured 28px and 40px wide, both under our own 44px rule.
5. **Promotions are static or stacked.** Piper Makes has a static hero and Gear Guts stacks three banners. Hero movement on the other two was not tested, so there is no competitor evidence of an accessible slideshow pattern. Our slideshow design relies on WCAG 2.2.2 and the assessment criteria instead.
6. **Personality can hurt legibility.** Gear Guts is distinctive but very busy and puts text in images. The Archie's Forge hero places its headline directly over busy artwork. We keep brand personality through the mascot, logo and palette, and place text on solid panels.
7. **Overlays and third-party code cost space and trust.** Archie's Forge's consent bar covers about a quarter of a phone screen, and Lighthouse reports 32 third-party cookies on Gear Guts. A lean third-party footprint avoids needing a large banner at this stage.
8. **Some patterns are worth keeping.** Two of the three homepages feature new releases (Archie's Forge and Gear Guts). Archie's Forge uses image-led cards with text badges, and Gear Guts shows accepted payment methods in its footer.

**Adopted:** a skip link and clear landmark structure (Piper Makes); a short announcement line for delivery or offer information; image-led product cards with text badges (Archie's Forge); open statements of lead times and offer terms (Gear Guts).

**Avoided:** several `<h1>` elements on one page, icon-only controls without text names and touch targets under 44px; headlines and labels baked into images and stacked competing banners; a ten-link menu and text laid directly over busy imagery; large overlays that cover content.

**Adapted:** the "NEW" badge becomes a text label with a stated end date for promotions; the announcement line is static text and does not rotate; the idea of a payment strip is held back until PayPal is actually connected.

Ideas that depend on business decisions (delivery information, categories, creator listings, loyalty schemes and similar) have been put to the owner in a separate proposals document. Their outcomes will be recorded here once agreed.

### 3.3 Design decisions

These are standards the developer applies. They are traced to evidence and to user stories (section 2).

| # | Decision | Based on | Delivers |
|---|---|---|---|
| D1 | The homepage headline and one sentence say in plain words what the shop sells, with a shop button visible without scrolling. | Piper Makes names a release but not the business. Archie's Forge advertises a single product in its hero. | US01 |
| D2 | A main menu of four or five plainly labelled links, with no dropdowns. | Archie's Forge needs ten links. Piper Makes manages with three. | US03, US07 |
| D3 | Product cards lead with the image and use a text label (for example New) and not colour alone. | Archie's Forge image-led grid with text badges. | US03, US04 |
| D4 | Promotions are real text, move only when the user presses a button, and show an end date. | Piper Makes has a static hero. Gear Guts shows a sale with no visible end date. | US02, US07 |
| D5 | All headlines and labels are real HTML text and not part of an image. | Gear Guts banners and links appear to carry their text in images. | US07 |
| D6 | A short announcement line near the top gives delivery or lead-time information, and nothing covers page content. | Archie's Forge and Gear Guts give delivery information up front. Archie's cookie bar covers about a quarter of a phone screen. | US05, US06 |
| D7 | A skip link is the first focusable element on every page. | Piper Makes provides one. | US07 |
| D8 | Native HTML elements come first, with no redundant ARIA (for example no `role="main"` on `<main>`). | Piper Makes repeats the main role. | US07 |
| D9 | One `<h1>` per page, with `<h2>` and `<h3>` below it. | Piper Makes has three `<h1>` elements on its homepage. | US07 |
| D10 | Every image has `width` and `height`, is compressed, and is lazy-loaded when below the fold. | Lighthouse flags Piper Makes for missing dimensions and possible image savings. All three have a Largest Contentful Paint of 6.5 s or more. | US06 |
| D11 | Pages stay light, with few requests and no heavy third-party scripts at this stage. | The competitors make 159, 309 and 530 requests and transfer 4.0, 10.0 and 5.6 MB on one load. | US06 |
| D12 | Every icon-only link or button has a text name. | Lighthouse reports links without a discernible name on all three sites. | US07 |
| D13 | Controls are at least 44 × 44px, including icon buttons. | Piper Makes' menu button measures 28 × 28px and Archie's Forge's is 40px wide. | US06, US07 |
| D14 | ARIA is used only where native HTML cannot do the job, and `role="none"` or `role="presentation"` is not misused. | Lighthouse reports role conflicts on Piper Makes and prohibited ARIA attributes on Archie's Forge. | US07 |
| D15 | Text placed over an image sits on a solid or overlay panel, and its contrast is checked. | Archie's Forge hero headline and button sit directly over busy imagery. | US01, US07 |
| D16 | The homepage has one promotional area (the hero), not several stacked banners. | Gear Guts stacks three banners. | US01, US02 |
| D17 | Every offer states what is included, any exclusions and when it ends. | Gear Guts states exclusions but shows no end date. | US02 |
| D18 | Every image has an `alt` attribute: descriptive for content images and empty for decorative ones. | Lighthouse reports images without alt attributes on Archie's Forge. | US07 |
| D19 | Links in running text are underlined or otherwise distinguishable without colour. | Lighthouse reports links that rely on colour on Archie's Forge. | US07 |
| D20 | Any embedded frame (for example a map or video) has a title, and none is added without a reason. | Lighthouse reports frames without titles on Gear Guts. | US06, US07 |

### 3.4 Architecture and methodology rationale

The structure of the site follows from the client requirements (section 1.2), the assessment criteria and the evidence in sections 3.1 to 3.3.

| # | Choice | Reason | Evidence | Trade-off or risk |
|---|---|---|---|---|
| A1 | Separate semantic HTML pages (home, shop, about, and further pages as they are built), linked by ordinary links. | Each page can be validated on its own (criteria 2.1 and 2.3), has its own title, description and address, and works without JavaScript. | All three competitors are multi-page. Hand-built pages avoid the 159 to 530 requests seen on hosted platforms. | Header and footer markup is repeated on every page, so a change is made in each file. Accepted at this scale, and every page is re-validated after a shared change. A build step or back end can remove the repetition in later projects. |
| A2 | Content is written in HTML and not generated by JavaScript. | Everything in the source can be validated by file upload and is available without waiting for scripts. | Criterion 2.3 checks the markup present in the file. | Adding a product means editing HTML. A data-driven catalogue is planned for later projects with a back end. |
| A3 | A consistent landmark structure on every page: skip link, header, nav, main and footer. | Lets keyboard and screen reader users skip repeated content and understand each page (criteria 2.7 and 2.9). | Piper Makes provides a skip link and landmarks. | None significant. |
| A4 | A short, plain main menu of four or five links. | Resources are easier to find intuitively (criterion 2.9). | Three links on Piper Makes, ten on Archie's Forge. | Products are grouped under shop filters, so filter design matters. |
| A5 | Mobile-first CSS: base styles for phones and `min-width` media queries for larger screens. | Phones are the hardest layout, and enhancements are added on top, which keeps the CSS small (criterion 2.6). | All three competitors reflow at 375px. The younger part of the audience is phone-first. | Needs checking at several widths in every step. |
| A6 | Flexbox for header and footer rows, and CSS Grid for the product grid. | Layouts adapt without fixed widths. | Criterion 2.6. | Very old browsers are out of scope. |
| A7 | Design tokens, a small reset and one typeface (Inter, three weights). | One place to change the brand, consistent spacing and a small number of font downloads. | Bug B1: the original palette failed contrast and was corrected in the tokens (section 4.3). | Google Fonts is a third-party request. Self-hosting is proposed to the owner. |
| A8 | Controls at least 44 × 44px, each with a text name. | Accessible touch targets and screen reader labels. | Menu buttons of 28px and 40px width, and unnamed links reported on all three sites. | A slightly taller header on small screens. |
| A9 | Local, compressed images with width and height, lazy-loaded below the fold. | Less layout shift, faster loading, no pixelation (criterion 2.4), and no dependence on another site hosting the image. | Lighthouse flags missing dimensions on Piper Makes. The prototype hotlinked stock photos. | Preparing images adds work for every new product. |
| A10 | Minimal third-party code: Google Fonts only for now, and no analytics or chat widgets. | Keeps pages light and avoids large consent banners at this stage. | 32 third-party cookies on Gear Guts, and a consent bar over a quarter of the screen on Archie's Forge. | Less visitor data until analytics is added. Privacy wording is for the owner to approve. |
| A11 | JavaScript only for the interactions the client asked for: a manual hero slideshow, a lightbox and a mobile menu toggle. | The site stays usable without scripts, and every interaction is user-initiated (criterion 1.6, WCAG 2.2.2). | Piper Makes' hero is static, and no competitor capture showed a controllable slideshow. | The slideshow and lightbox need extra keyboard, focus and reduced-motion testing. |
| A12 | Hero text sits on a solid or overlay panel, with contrast checked. | Foreground information is not distracted by backgrounds (criterion 1.4). | Archie's Forge hero headline over busy imagery. | Less of the artwork is visible. |
| A13 | A footer with shipping, contact and non-affiliation wording, and payment icons once PayPal is live. | Trust, user story US08 and intellectual property protection. | Gear Guts' footer lists shipping, contact and payment icons. | Links are added only when the pages exist, to avoid broken internal links (criterion 5.5). |
| A14 | GitHub Pages hosting. | A static site needs no server, and cloud deployment is required (criterion 5.3). | Assessment criteria. | No back end until later projects. |

**Performance budget (targets, not yet measured)**

These targets are set by the developer and will be checked with the same method used in the review (Lighthouse mobile, and the Network tab with cache disabled).

| Measure | Target | Competitor range |
|---|---|---|
| Requests on a cold homepage load | Under 30 | 159 to 530 |
| Data transferred on a cold homepage load | Under 1.5 MB | 4.0 to 10.0 MB |
| Largest Contentful Paint (Lighthouse mobile) | 2.5 s or less | 6.5 to 7.5 s |
| Lighthouse accessibility | 95 or more | 85 to 96 |

An automated score does not prove accessibility, so manual keyboard and screen reader checks are also recorded in [TESTING.md](TESTING.md).

**Development methodology**

- Research comes before build, and each decision is traced to evidence and to a user story.
- Work follows short sprints with a definition of done (section 2.1).
- Every step passes a test gate before it is committed: console clean, HTML and CSS validators, keyboard check and responsive check at 375px, 768px and 1280px.
- Evidence (screenshots and results) is captured when each test is run, not afterwards.
- Each feature or fix is a separate commit in Conventional Commits format, with documentation committed per step.
- Where a result cannot be improved, the limitation is logged and justified (for example bug B2).

**Status:** separate HTML pages are the working baseline. Whether to refactor into client-side templates with a hash router will be decided later, once the site is more developed, by comparing the options against validation coverage, performance, maintainability and the assessment criteria.


---

## 4. Design System

All visual values are stored as CSS custom properties (design tokens) in `:root` at the top of `assets/css/styles.css`. Changing the brand later means editing one line.

### 4.1 Colour tokens

| Token | Value | Purpose |
|---|---|---|
| `--bg-page` | `#ffffff` | Page background |
| `--bg-card` | `#fbf6ee` | Cards and panels |
| `--accent` | `#c98a4b` | Button and badge backgrounds (never text) |
| `--accent-hover` | `#d9a06a` | Hover state for accent backgrounds |
| `--accent-text` | `#8a5420` | Accent-coloured text such as prices and active links |
| `--text-main` | `#3b2416` | Body text and text on accent backgrounds |
| `--text-muted` | `#6b5242` | Secondary text |
| `--border-color` | `#e5d9cc` | Decorative dividers and card borders |
| `--error-color` | `#b91c1c` | Error messages |
| `--success-color` | `#15803d` | Success messages |

### 4.2 Other tokens

| Group | Tokens |
|---|---|
| Typography | `--font-body` (Inter, then system fonts), `--line-height-body` (1.6), `--line-height-heading` (1.2) |
| Spacing | `--space-xs` (0.25rem) to `--space-xxl` (4rem) |
| Shape and layout | `--radius-sm` (6px), `--radius-md` (8px), `--content-max-width` (1200px) |

**Typography:** Inter (400, 600, 700) with a system font fallback.

### 4.3 Colour contrast and the palette change

**Decision:** the original palette was changed during accessibility testing because it failed WCAG 2.1 AA contrast requirements.

**What failed:** the original design used white text on the tan accent `#c98a4b` for buttons and the cart badge, and tan text for prices. Both fall well below the 4.5:1 minimum for normal text.

**What changed:**

1. Text on accent backgrounds is now dark brown (`--text-main`) instead of white.
2. Accent-coloured text now uses a new, darker token (`--accent-text`) instead of `--accent`.
3. The accent hover colour is now lighter rather than darker, so dark text stays readable on hover.

The brand colour itself (`#c98a4b`) is unchanged. It is now used for backgrounds and decoration only.

**Measured contrast ratios** (calculated with the WCAG 2.1 relative luminance formula):

| Pairing | Ratio | Requirement | Result |
|---|---|---|---|
| White text on `--accent` (original buttons) | 2.91:1 | 4.5:1 | Fail (replaced) |
| `--accent` text on `--bg-page` (original prices) | 2.91:1 | 4.5:1 | Fail (replaced) |
| `--accent` text on `--bg-card` (original prices) | 2.70:1 | 4.5:1 | Fail (replaced) |
| `--text-main` on `--accent` (new buttons) | 4.98:1 | 4.5:1 | Pass |
| `--text-main` on `--accent-hover` | 6.34:1 | 4.5:1 | Pass |
| `--accent-text` on `--bg-page` | 6.23:1 | 4.5:1 | Pass |
| `--accent-text` on `--bg-card` | 5.79:1 | 4.5:1 | Pass |
| `--text-main` on `--bg-page` | 14.48:1 | 4.5:1 | Pass |
| `--text-main` on `--bg-card` | 13.46:1 | 4.5:1 | Pass |
| `--text-muted` on `--bg-page` | 7.21:1 | 4.5:1 | Pass |
| `--text-muted` on `--bg-card` | 6.71:1 | 4.5:1 | Pass |
| `--error-color` on `--bg-page` | 6.47:1 | 4.5:1 | Pass |
| `--error-color` on `--bg-card` | 6.01:1 | 4.5:1 | Pass |
| `--success-color` on `--bg-page` | 5.02:1 | 4.5:1 | Pass |
| `--success-color` on `--bg-card` | 4.66:1 | 4.5:1 | Pass |

**Known limits:**

- `--text-main` on `--accent` (4.98:1) and `--success-color` on `--bg-card` (4.66:1) pass with little margin, so these colours should not be lightened.
- `--border-color` against white is only 1.39:1. That is acceptable for decorative card borders, but form input borders must meet the 3:1 minimum for UI components (WCAG 1.4.11). `TODO:` add a darker `--input-border` token when the form is styled, and record it here.

`TODO:` re-check every pairing with the WebAIM Contrast Checker, save a screenshot in `docs/screenshots/`, and link it from [TESTING.md](TESTING.md). Add the original palette failure to the bug log as B1.

---

## 5. Technology Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, Flexbox, Grid, media queries)
- JavaScript (vanilla, no frameworks)
- Git and GitHub for version control
- GitHub Pages for hosting
- Google Fonts for typography

---

## 6. Development Decisions

### 6.1 Document head (`index.html`)

| Element | Decision and reason |
|---|---|
| `<meta charset="UTF-8">` | Ensures characters such as `£` and `×` display correctly. Placed first because browsers need it within the first 1024 bytes. |
| `<meta name="viewport" ...>` | Makes the layout scale to the device width so media queries work on phones. `user-scalable=no` and `maximum-scale` are deliberately omitted because blocking pinch-zoom is an accessibility failure. |
| `<title>` | States what the business sells, so the purpose is clear in browser tabs, search results and screen reader announcements. |
| `<meta name="description">` | Provides the search result snippet using real site content. |
| `<meta name="theme-color">` | Colours the mobile browser toolbar with the brand accent for a consistent feel. |
| `<link rel="icon">` | Reuses the logo as the favicon to avoid an extra asset. |
| Google Fonts `preconnect` (two links) | Opens connections to `fonts.googleapis.com` (stylesheet) and `fonts.gstatic.com` (font files) early. The second carries `crossorigin` because fonts are fetched in CORS mode. |
| Google Fonts stylesheet | Requests only three weights (400, 600, 700) to limit download size. `display=swap` shows fallback text immediately instead of invisible text. |
| Own stylesheet linked after the font stylesheet | Later stylesheets win in the cascade, so project rules take priority. Linked in `<head>` as required by criterion 3.6. |
| `<script ... defer>` | Downloads during parsing but runs after the HTML is ready, so rendering is not blocked. |

**Trade-off:** Google Fonts adds a third-party request, which has a small privacy implication and a dependency on an external service. Self-hosting would avoid both. Google Fonts was chosen for simplicity, and a system font fallback keeps the site usable if the font fails to load.

**Deferred:** Open Graph tags need an absolute image URL, so they are added after the GitHub Pages address is known.

### 6.2 CSS reset (`styles.css`)

A small, targeted reset sits directly below the design tokens. It removes browser inconsistencies without wiping every default style.

| Rule | Reason |
|---|---|
| `box-sizing: border-box` on all elements | Padding and borders no longer add to an element's width, which prevents overflow on small screens (criterion 2.6). |
| Margin reset on `body`, headings, `p`, `figure` and lists | Browser default margins vary. Spacing is applied deliberately with the spacing tokens instead. |
| Padding reset on `ul` and `ol` | Removes the default list indentation so navigation lists can be laid out cleanly. |
| `img` and `svg` set to `display: block` with `max-width: 100%` | Removes the stray gap under inline images and stops media overflowing narrow screens. |
| `height: auto` on `img` | Keeps the aspect ratio so images are never stretched (criterion 2.4). |
| `font: inherit` and `color: inherit` on form controls | Browsers give buttons and inputs their own font, which would ignore Inter. |
| `color: inherit` on links, underlines kept | Link colour follows the surrounding text, and underlines stay so links are identifiable without relying on colour alone. |
| `[hidden] { display: none !important; }` | The site relies on the `hidden` attribute for modals and view switching, and a later `display` rule must never override it. |

**Justified use of `!important`:** the `[hidden]` rule is the only place it appears. Without it, a component rule such as `display: flex` would silently reveal an element that is meant to be hidden, which would break the modal and the page-view switching.

**Deliberately left out:**

- `scroll-behavior: smooth` is added later inside a `prefers-reduced-motion` check, so users who request less motion are not forced into smooth scrolling.
- Vendor prefixes such as `-webkit-appearance` are avoided, because they are non-standard and likely to cause CSS validator warnings.

**Validation:** passed the W3C CSS validator (Jigsaw) with no errors or warnings. Evidence is in [TESTING.md](TESTING.md), section 1.2.

### 6.3 Architecture

The site is built in two stages:

1. **Static baseline:** separate HTML pages with shared navigation to establish valid document structure.
2. **Refactor:** content moved into `<template>` elements with a custom hash router.

`TODO:` document why this order was chosen and what was learned during the refactor.

### 6.4 Folder structure

```text
paperbag-hobbies/
├── index.html
├── README.md
├── TESTING.md
├── docs/
│   └── screenshots/
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    └── images/
        ├── logo/
        └── mascot/
```

`TODO:` update as pages are added. All file and folder names are lowercase with hyphens and no spaces for cross-platform compatibility.

---

### 6.5 Global typography (`styles.css`)

| Rule | Reason |
|---|---|
| `font-family: var(--font-body)` on `body` | Applies Inter site-wide, with system fonts as a fallback if the Google Font fails to load. |
| `font-size: 1rem` on `body` | Respects the user's own browser text size setting. |
| `line-height: 1.6` for body text | Comfortable reading spacing. WCAG recommends at least 1.5. |
| `line-height: 1.2` for headings | Large text looks too loose at body spacing, so headings are tightened. |
| Heading sizes in `rem` (h1 2rem, h2 1.5rem, h3 1.25rem) | Sizes scale with user preferences instead of being fixed in pixels. |
| Only `h1` to `h3` styled | The design uses nothing deeper, so there is no unused CSS. |
| Text and background colour set on `body` | Uses the design tokens. `--text-main` on `--bg-page` measures 14.48:1. |

**Verification:** browser developer tools confirmed that the typography rules apply and override the default browser styles. The `h1` renders at 2rem with a 1.2 line-height, which gives a computed height of about 38.4px. Evidence is in [TESTING.md](TESTING.md), section 2.2.

**Responsive note:** these sizes are the small-screen base. The `h1` is enlarged for wider screens with a media query when the hero section is built.

---

## 7. Testing

Full testing evidence is recorded in [TESTING.md](TESTING.md).

`TODO:` summarise results: validators, manual tests, browser matrix, bug log.

---

## 8. Version Control

Commits follow the Conventional Commits format and are kept small, with one feature or fix per commit.

| Prefix | Use |
|---|---|
| `feat:` | New feature or content |
| `fix:` | Bug fix |
| `style:` | CSS or formatting change |
| `refactor:` | Restructure without changing behaviour |
| `docs:` | Documentation |
| `chore:` | Setup and housekeeping |

Example: `feat: add HTML5 boilerplate shell with head metadata and linked assets`

---

## 9. Deployment

`TODO:` complete once deployed. Planned procedure for GitHub Pages:

1. Push the final code to the `main` branch.
2. In the repository, open **Settings > Pages**.
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Select `main` and the `/ (root)` folder, then save.
5. Wait for the build, then open the published URL.
6. Repeat the manual tests on the live site and confirm it matches the local version.

**Live site:** `TODO`

---

## 10. Attribution

| Item | Source | Use |
|---|---|---|
| Inter typeface | [Google Fonts](https://fonts.google.com/specimen/Inter), SIL Open Font License | Site typography |
| Logo and mascot artwork | `TODO: state who created them` | Branding and About page |
| Product images | `TODO: state source and licence` | Product cards |

`TODO:` add any code snippets or tutorials used, and ensure each has a matching comment above the code.
let