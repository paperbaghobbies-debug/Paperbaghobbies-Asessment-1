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

Paperbag Hobbies supplies wargamers and tabletop enthusiasts with high-precision resin miniatures, modular terrain and custom CAD sculpts.

The website lets a new visitor:

- understand what the business sells within a few seconds
- browse and filter the product range
- view product details and add items to a cart
- request a custom commission through a validated form

`TODO:` expand into a justified rationale: who the business serves, the problem it solves, and why a front-end-only site suits this stage of the business.

---

## 2. Target Audience and User Stories

`TODO:` confirm the final list once the features are built. Draft stories:

| ID | User story | How the site delivers it |
|---|---|---|
| US01 | As a first-time visitor, I want the purpose of the site to be clear immediately. | Hero section with a short proposition and a call to action. `TODO` |
| US02 | As a wargamer, I want to filter products by category. | Category filter with a screen reader announcement. `TODO` |
| US03 | As a shopper, I want to view product details without leaving the page. | Accessible product modal. `TODO` |
| US04 | As a client, I want to request a custom model and get clear feedback on my form. | Commission form with validation messages. `TODO` |
| US05 | As a mobile user, I want large touch targets and a cart that remembers my items. | Responsive navigation, 44px minimum targets, saved cart. `TODO` |

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