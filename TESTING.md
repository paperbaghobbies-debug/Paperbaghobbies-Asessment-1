# Testing - Paperbag Hobbies

Back to [README](README.md).

## 1. Code validation

### 1.1 W3C HTML validator

| Date | File | Result | Notes |
|---|---|---|---|
| 05/10/2026 | `index.html` | Pass | No errors or warnings. Checked after Step 1.1 (HTML boilerplate). |

![W3C HTML validator result for index.html showing no errors or warnings](docs/screenshots/validator-index-html-step-1-1.png)

### 1.2 W3C CSS validator (Jigsaw)

| Date | File | Stage | Result | Notes |
|---|---|---|---|---|
| 05/10/2026 | `assets/css/styles.css` | Step 1.2 Part A: design tokens | Pass | No errors or warnings. |
| 05/10/2026 | `assets/css/styles.css` | Step 1.2 Part B: CSS reset | Pass | No errors or warnings. |

Part A: design tokens

![Jigsaw CSS validator result for styles.css after adding design tokens, showing no errors](docs/screenshots/validator-styles-css-step-1-2-a.png)

Part B: CSS reset

![Jigsaw CSS validator result for styles.css after adding the CSS reset, showing no errors](docs/screenshots/validator-styles-css-step-1-2-b.png)

### 1.3 JavaScript linter

`TODO:` add results once the JavaScript is written.

## 2. Manual testing

`TODO:` add the planned test table (functionality, usability, responsiveness).

### 2.1 Colour contrast (WCAG 2.1 AA)

Contrast ratios were calculated for every text and background pairing using the WCAG relative luminance formula. Full results are in the README, section 4.3.

| Pairing | Ratio | Required | Result |
|---|---|---|---|
| White text on `#c98a4b` (original buttons) | 2.91:1 | 4.5:1 | Fail |
| `#c98a4b` text on `#ffffff` (original prices) | 2.91:1 | 4.5:1 | Fail |
| `#3b2416` on `#c98a4b` (revised buttons) | 4.98:1 | 4.5:1 | Pass |
| `#8a5420` on `#ffffff` (revised accent text) | 6.23:1 | 4.5:1 | Pass |

`TODO:` confirm these with the WebAIM Contrast Checker and add a screenshot.

## 3. Browser and device matrix

`TODO`

## 4. Bug log

| # | Bug found | Cause | Fix | Status |
|---|---|---|---|---|
| B1 | Original palette failed WCAG 2.1 AA contrast. White text on the accent `#c98a4b` measured 2.91:1, and accent-coloured text measured 2.91:1 on white and 2.70:1 on the card background. All are below the 4.5:1 minimum. | The accent colour is too light to carry white text or to be used as text. | Text on accent backgrounds is now dark brown (`--text-main`, 4.98:1). Accent-coloured text uses a new darker token (`--accent-text`, 6.23:1 on white). The hover colour is lighter so dark text stays readable. See README section 4.3. | Fixed in design tokens (commit `c96b0a0`). To be re-verified once buttons and prices are styled. |

### Bugs left unfixed

None at this stage.

### Bugs left unfixed

`TODO`