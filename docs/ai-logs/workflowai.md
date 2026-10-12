Welcome back, Shane. Elevating **Paperbag Hobbies** from an unfinished client prototype into a professional, modular application satisfies your Level 5 assessment criteria. The architecture cleans up legacy tightly coupled state, template manipulations, and unstructured styles.

Below is the reformatted and professionally structured workflow document:

---

## High-Level Refactoring Roadmap



* **Stage 1: Design Tokens & CSS Architecture** — Establishing a centralized, scalable design system using CSS custom properties.


* **Stage 2: Mobile-First Media Queries & Breakpoint Strategy** — Transitioning from ad-hoc screen fixes to a predictable, min-width responsive layout.


* **Stage 3: JavaScript State Management & Immutable Data Flow** — Structuring a clean reactive state object for the cart, filters, and routing without side-effect bugs.


* **Stage 4: Modular Component Rendering** — Refining template cloning and event delegation for safe, maintainable DOM updates.



---

## Stage 1: Design Tokens & CSS Architecture



In the old project, colors, spacing, and typography were scattered across the stylesheet. To meet modern standards, a centralized token system rooted in `:root` ensures consistency and makes future maintenance or theme changes effortless.

### Guiding Questions



1. Looking at your color palette (e.g., `--bg-card`, `--accent`), how can you group your CSS variables logically (e.g., colors, typography scales, spacing units, transition timings) to make the stylesheet self-documenting?


2. What naming convention will you use to ensure your tokens are semantic (describing *what* they do, like `--color-surface-brand`) rather than literal (describing *what they look like*, like `--brown-bg`)?



> **Answer:** For the CSS variables, I set up a clear `:root` block right at the top of the main stylesheet and grouped everything into logical sections: colors, typography scales, spacing units, and transitions/effects. For naming, I went completely semantic based on what the tokens do rather than what they look like—so instead of naming something `--brown-bg` or `--orange-accent`, I used names like `--color-surface-brand` or `--color-text-main`. That way, if I ever need to tweak the brand palette down the line, the variable names still make sense and I only have to update the hex values in one place.
> 
> 

---

## Stage 2: Mobile-First Media Queries & Breakpoint Strategy



The legacy code handled resizing with mixed media queries. For a modern Level 5 project, a strict **mobile-first** approach using `min-width` breakpoints is expected, where base styles for small screens are written first, and complexity is layered on as the viewport expands.

### Guiding Questions



1. What specific pixel widths will you choose for your primary breakpoints (e.g., mobile-to-tablet, tablet-to-desktop), and what layout shifts happen at each threshold?


2. Why is writing base styles for mobile viewports *before* adding `min-width` queries considered best practice for performance and maintainability compared to desktop-down styling?



> **Answer:** I went with a strict mobile-first approach using `min-width` queries since it keeps the core mobile CSS lightweight, avoiding a scenario where smaller mobile viewports waste bandwidth overriding heavy desktop styles. For my primary breakpoints, I set `768px` for the tablet transition (which is where I sort out the footer columns and fix the header `.nav-toggle` wrapping issue) and `1024px` for desktop to open up the main product catalog grid and give the layout breathing room.
> 
> 

---

## Stage 3: JavaScript State Management & Data Flow



In the previous script, state updates (such as filtering the catalog or modifying the cart) were functional, but managing side effects across templates became messy. A predictable state structure is needed where data changes cleanly drive UI updates.

### Guiding Questions



1. How will you structure your central `state` object to cleanly separate UI states (like active filters, open modals, or current routes) from persistent data (like the shopping cart)?


2. When a user updates the cart quantity, what sequence of functions should execute to ensure `localStorage` is updated *and* the DOM badges/totals re-render synchronously without causing infinite loops?



> **Answer:** I structured my state object to keep temporary UI states (like active category filters or modal visibility) completely separate from persistent domain data like `cartState`. For the cart itself, I'm using a key-value dictionary backed by `localStorage` for fast $O(1)$ lookups. When a user updates a quantity, the sequence runs cleanly: it updates the dictionary entry, runs garbage collection to check if the quantity hit 0 (and deletes the key completely with `delete cartState[id]` if it did), saves the updated object to `localStorage`, and synchronously triggers the re-render functions for the DOM badges and totals. For multi-tab support, I just hooked into the native `storage` window event so everything stays in sync across open tabs without needing a manual page refresh.
> 
> 

---

## Stage 4: Modular Component Rendering



The old template approach relied heavily on cloning `<template>` nodes. While native templates are great, managing their event listeners and nested data bindings can lead to memory leaks or broken event delegation if not structured cleanly.

### Guiding Questions



1. How can you use event delegation at the container level (e.g., on the product grid or modal wrapper) rather than attaching individual event listeners to every single cloned card?


2. When re-rendering dynamic views (like switching between shop categories or opening the cart modal), how will you efficiently clear stale DOM nodes without unnecessarily tearing down static layout elements?



> **Answer:** Instead of messing around with legacy HTML `<template>` tags and cloning nodes, I'm building out components using clean template literals and dynamic HTML strings. To handle user interactions without binding individual listeners to every single element—which gets messy and causes memory leaks when re-rendering—I'm using container-level event delegation on the product grid and modal wrappers via `e.target.closest()`. When switching categories or updating views, I clear out the dynamic container content (`innerHTML = ''`) before injecting the new markup, which tears down the old dynamic nodes while leaving static layout elements like the header and footer completely untouched.
> 
>