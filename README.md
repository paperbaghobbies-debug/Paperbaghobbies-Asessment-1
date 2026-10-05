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

`TODO:` list and justify any deliberate departures (required for Distinction).

---

## 4. Design System

`TODO:` complete in Step 1.2 once the CSS tokens exist.

| Token | Value | Purpose |
|---|---|---|
| `--bg-page` | `#ffffff` | Page background |
| `--bg-card` | `#fbf6ee` | Cards and panels |
| `--accent` | `#c98a4b` | Buttons and highlights |
| `--text-main` | `#3b2416` | Body text |
| `--error-color` | `#b91c1c` | Error messages |

`TODO:` record measured WCAG contrast ratios for each text and background pairing.

**Typography:** Inter (400, 600, 700) with a system font fallback.

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

### 6.2 Architecture

The site is built in two stages:

1. **Static baseline:** separate HTML pages with shared navigation to establish valid document structure.
2. **Refactor:** content moved into `<template>` elements with a custom hash router.

`TODO:` document why this order was chosen and what was learned during the refactor.

### 6.3 Folder structure

```text
paperbag-hobbies/
├── index.html
├── README.md
├── TESTING.md
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
