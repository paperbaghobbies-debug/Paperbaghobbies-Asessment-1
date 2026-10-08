# Testing - Paperbag Hobbies

Back to [README](README.md).

## 1. Code Validation & Automated Audits

To ensure structural validity, adherence to modern web standards, and clean performance, I validated my HTML, CSS, and core page metrics using the W3C Validation Services and Google Lighthouse.

### 1.1 W3C HTML Validator

I validated my core document markup using the W3C Markup Validation Service by direct input and file upload. My goal was to establish a clean, standard-compliant HTML5 foundation before layering on styles or interactive scripts.

| Date | File | Result | Notes |
|---|---|---|---|
| 05/10/2026 | `index.html` | Pass | Verified after completing Step 1.1 (HTML Boilerplate). Zero errors, zero warnings. |

![W3C HTML validator result for index.html showing no errors or warnings](docs/screenshots/validator-index-html-step-1-1.png)

---

### 1.2 W3C CSS Validator (Jigsaw)

I tested my CSS stylesheet (`assets/css/styles.css`) incrementally through the W3C Jigsaw CSS Validation Service at each major phase of baseline development. Validating in stages allowed me to catch syntax issues, invalid properties, or typos immediately.

| Date | File | Stage | Result | Notes |
|---|---|---|---|---|
| 05/10/2026 | `assets/css/styles.css` | Step 1.2 Part A: Design Tokens | Pass | Zero errors or warnings. Verified custom property syntax. |
| 05/10/2026 | `assets/css/styles.css` | Step 1.2 Part B: CSS Reset | Pass | Zero errors or warnings. Verified reset rules and `box-sizing` bounds. |
| 05/10/2026 | `assets/css/styles.css` | Step 1.2 Part C: Global Typography | Pass | Zero errors or warnings. Verified `rem` scaling and font imports. |

##### Part A: Design Tokens Verification
![Jigsaw CSS validator result for styles.css after adding design tokens, showing no errors](docs/screenshots/validator-styles-css-step-1-2-a.png)

##### Part B: CSS Reset Verification
![Jigsaw CSS validator result for styles.css after adding the CSS reset, showing no errors](docs/screenshots/validator-styles-css-step-1-2-b.png)

##### Part C: Global Typography Verification
![Jigsaw CSS validator result for styles.css after adding global typography, showing no errors](docs/screenshots/validator-styles-css-step-1-2-c.png)

---

### 1.3 Lighthouse Performance & Quality Audit

I audited the homepage (`index.html`) using Google Lighthouse in Chrome DevTools to measure performance, accessibility, best practices, and SEO under simulated mobile device conditions.

| Date | Page | Performance | Accessibility | Best Practices | SEO | Notes |
|---|---|---|---|---|---|---|
| 08/10/2026 | `index.html` | 100 | 98 | 100 | 100 | Initial layout, header navigation, and landmark structure audit. |

![Lighthouse audit result for index.html showing scores of Performance 100, Accessibility 98, Best Practices 100, and SEO 100](docs/screenshots/lighthouse-audit-index-html.png)

---

### 1.4 JavaScript Static Code Analysis

* **Status:** In Progress.
* **Methodology:** As interactive features (`main.js`) expand across upcoming sprints, I will run static linting (ESLint) to enforce zero runtime errors, prevent unused variables, and maintain clean async event handling.

---

## 2. Manual & Technical Testing

---

### 2.1 Colour Contrast & Palette Refinement (WCAG 2.1 AA)

Before building components, I ran an accessibility test on my initial brand color palette. To verify compliance, I piped my proposed hex codes directly into AI contrast checking tools and calculated the contrast ratios using the WCAG 2.1 relative luminance formula. 

The initial results revealed major accessibility failures in my core UI elements:
* **Original Button Styling:** White text (`#ffffff`) rendered on my brand tan accent background (`#c98a4b`) produced a contrast ratio of **2.91:1**, failing the mandatory 4.5:1 minimum for normal body text.
* **Original Price Labels:** Tan text (`#c98a4b`) rendered directly over white page backgrounds (`#ffffff`) similarly failed at **2.91:1**.

Recognising that these low-contrast pairings would create significant visual barriers for low-vision and color-blind users, I immediately adjusted my color architecture in `styles.css`:
1. **Button Text Shift:** I shifted button and badge text from white to dark brown (`--text-main` / `#3b2416`), pushing the contrast ratio up to **4.98:1** and passing WCAG 2.1 AA requirements.
2. **Dedicated Text Accent Token:** I introduced a darker dedicated token (`--accent-text` / `#8a5420`) specifically for text-based accent elements like prices and active links, raising their contrast ratio against page backgrounds to **6.23:1**.
3. **Hover State Accessibility:** I adjusted the hover state (`--accent-hover` / `#d9a06a`) to be lighter rather than darker, ensuring dark text maintains a passing contrast ratio of **6.34:1** on hover.

#### Contrast Verification Summary

| Pairing | Calculated Ratio | Required Ratio | WCAG Status | Action Taken |
|---|---|---|---|---|
| White text on `#c98a4b` (Original buttons) | 2.91:1 | 4.5:1 | **Fail** | Shifted text color to `--text-main` (`#3b2416`) |
| `#c98a4b` text on `#ffffff` (Original prices) | 2.91:1 | 4.5:1 | **Fail** | Created darker `--accent-text` (`#8a5420`) |
| `#3b2416` on `#c98a4b` (Revised buttons) | 4.98:1 | 4.5:1 | **Pass** | Implemented as new primary button token |
| `#8a5420` on `#ffffff` (Revised price text) | 6.23:1 | 4.5:1 | **Pass** | Implemented for price & active link styling |

---

### 2.2 Typography & Font Rendering Audit

I inspected my rendered typography using Chrome DevTools to verify that custom properties resolved correctly, browser default margins were reset, and Google Fonts loaded asynchronously without blocking rendering.

| Inspection Check | Target Expectation | Measured Result | Status |
|---|---|---|---|
| **`h1` Applied Rules** | `font-size: 2rem`, `font-weight: 700`, `line-height: 1.2` inherited from `styles.css` | Computed rules override browser defaults clean. | Pass |
| **CSS Reset Margin Lock** | Computed margin of `0` on `h1` | `0px` computed margin verified. | Pass |
| **Design Token Resolution** | `:root` custom properties evaluate to valid hex/rem units | All custom properties resolve accurately in styles inspector. | Pass |
| **Network Font Fetch** | Inter `@font-face` fetched from `fonts.gstatic.com` | `200 OK` network fetch verified. | Pass |
| **Rendered Font Family** | Primary fallback or Inter network font rendered | Computed tab shows Inter (PostScript name Inter-Bold). | Pass |

##### DevTools Screenshots (Typography Inspection):

![DevTools showing the h1 typography rules applied from styles.css](docs/screenshots/devtools-h1-styles-step-1-2-c.png)

![DevTools showing the Inter font-face loaded from Google Fonts](docs/screenshots/devtools-font-face-step-1-2-c.png)

![DevTools Computed tab showing Inter as the rendered font](docs/screenshots/devtools-rendered-font-step-1-2-c.png)

##### Recorded Computed Values for `h1`:

| Property | Computed Value | Source Rule / Token |
|---|---|---|
| `font-size` | `32px` | `2rem` |
| `font-weight` | `700` | Global heading rule |
| `line-height` | `38.4px` | `32px × 1.2` (`--line-height-heading`) |
| `color` | `rgb(59, 36, 22)` | `#3b2416` (`--text-main`) |
| `margin` | `0px` | Targeted CSS reset |

---

### 2.3 Device & Responsive Testing Methodology

I conducted responsive testing across mobile and desktop viewports using Chrome DevTools device mode. I focused on real-world mobile displays including the Google Pixel 10 (`412px × 924px`), iPhone XR (`414px × 896px`), and iPhone SE (`375px × 667px`) to identify layout bugs before finalizing the layout.

* **Date:** October 2026
* **Target Viewports:** 
  * Google Pixel 10 (`412px × 924px`)
  * iPhone XR (`414px × 896px`)
  * iPhone SE (`375px × 667px`)

#### Mobile Header & Footer Layout Audit

##### Visual Evidence (Pre-Fix Layout Defects):

| Google Pixel 10 | iPhone XR |
| :---: | :---: |
| ![Pixel 10 Mobile Layout Bugs](docs/screenshots/pixel-10-header-footer-layout-bugs.png) | ![iPhone XR Mobile Layout Bugs](docs/screenshots/iphone-xr-header-footer-layout-bugs.png) |

##### Issues Identified & Technical Solutions:

1. **Hamburger Button Text Wrapping ("Men u")**
   * **Root Cause:** On viewports under `400px`, flexbox item compression within `.header-container` squeezed the navigation toggle button (`.nav-toggle`), forcing its inner text to wrap across two lines awkwardly ("Men" / "u").
   * **How I Fixed It:** I updated `.nav-toggle` within the `@media (max-width: 768px)` breakpoint block in `styles.css`. I applied `white-space: nowrap` and `flex-shrink: 0` to prevent flexbox from shrinking the container, and adjusted padding to `0.4rem 0.6rem` to lock in a clean, single-line label.

2. **Footer Column Horizontal Compression**
   * **Root Cause:** On viewports below `768px`, the multi-column footer layout failed to collapse vertically. As a result, columns (`Shipping & Dispatch`, `Support & Contact`, `Disclaimer`) were forced into narrow horizontal bands.
   * **How I Fixed It:** I updated `.footer-container` inside the `@media (max-width: 768px)` media query to enforce `flex-direction: column !important` and set each `.footer-column` to `width: 100% !important`. This allowed footer content to stack into a readable vertical flow with full-width touch targets.

---

### 2.4 Feature & Accessibility Testing: US04 - Product Lightbox Quick View Modal

To test **User Story US04** (enlarging product images in an accessible modal), I combined manual interaction testing with keyboard-only navigation checks and mobile viewport stress testing.

* **Date:** 08/10/2026
* **User Story:** US04 - Enlarge images in a lightbox
* **Target Compliance:** WCAG 2.1 AA (Keyboard Focus Trapping, Escape Dismissal, Focus Restoration)
* **Viewports Tested:** Desktop (`1200px+`), iPhone SE (`375px × 667px`)

#### Detailed Test Execution & Results

| Test Objective | Interaction Steps | Expected Outcome | Result | Technical Explanation |
|---|---|---|---|---|
| **Modal Launch** | Click product card image or body container | Lightbox `<dialog>` opens over dark backdrop, rendering correct product image, title, price, and description | Pass | Handled via dynamic event delegation in `main.js` which populates the modal template |
| **Backdrop Dismissal** | Click dark overlay background outside modal | Modal closes cleanly and resets page state | Pass | Evaluates click event coordinates against the `<dialog>` bounding rectangle |
| **Close Button Dismissal** | Click top-right `✕` button | Modal closes cleanly | Pass | Explicit click event listener triggers native `.close()` method |
| **Direct CTA Isolation** | Click "Add to Cart" directly on product card | Cart action fires without opening lightbox | Pass | Event propagation handled with `e.stopPropagation()` on card CTA buttons |
| **Keyboard Focus Lock** | Press `Tab` continuously while modal is open | Focus stays trapped inside dialog between close button and CTA | Pass | Handled natively by HTML5 `<dialog>` element |
| **Escape Key Dismissal** | Press `Escape` key while modal is active | Modal closes immediately | Pass | Natively captured by browser `<dialog>` `cancel` event |
| **Focus Restoration** | Dismiss modal via `Escape` or close control | Keyboard focus returns directly to triggering card element | Pass | Saved `document.activeElement` prior to opening and re-focused it on close (WCAG SC 2.4.3) |
| **Mobile Reflow** | Open modal on `375px × 667px` viewport | Content fits within viewport with internal scroll bar and clear close control | Pass | Refactored dialog height limits and overflow rules |

#### Mobile Lightbox Defect & Engineering Fix

##### Pre-Fix Defect vs. Final Resolved Implementation:

| Bug Identified (Pre-Fix Overflow) | Fixed Implementation (Scrollable Modal) |
| :---: | :---: |
| ![Lightbox height overflow and clipped button on iPhone SE](docs/screenshots/lightbox-overflow-iphone-se-bug.png) | ![Lightbox responsive fix showing scrollable modal and visible close button on iPhone SE](docs/screenshots/lightbox-responsive-iphone-se-fixed.png) |

##### Defect Analysis & Technical Solutions:

1. **Vertical Boundary Overflow & Off-Screen CTA Clipping**
   * **Root Cause:** On short viewports (such as the iPhone SE at `667px` height), fixed image dimensions pushed the bottom of the modal content past the viewport fold. This clipped the primary "Add to Cart" button off-screen and prevented users from scrolling within the dialog.
   * **How I Fixed It:** I updated `.lightbox-dialog` in `styles.css` to enforce `max-height: 85vh` and `overflow-y: auto`. I also constrained `.lightbox-image-container` on mobile viewports to a `max-height` of `200px`, keeping the main modal content above the fold while allowing smooth internal scrolling for longer descriptions.

2. **Hidden Close Button Overlay**
   * **Root Cause:** Standard absolute positioning placed the close icon (`✕`) behind adjacent element boundaries on narrow screens.
   * **How I Fixed It:** I styled `.lightbox-close` as an elevated circular button with `position: absolute`, pinned to the top-right corner with a high `z-index: 10` and `36px × 36px` touch dimensions, ensuring quick dismissal across all devices.