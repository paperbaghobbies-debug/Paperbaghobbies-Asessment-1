# Appendix I: Generative AI Usage & Comprehensive Technical Log

**Student Name:** Shane  
**Course:** Level 5 Diploma in Web Application Development  
**Unit:** Unit 1: User Centric Front End Development (Y/650/3525)  
**AI Tool Utilized:** Google Gemini

---

## 1. Declaration of Authorship & AI Boundaries

In accordance with JCQ regulations and awarding body assessment criteria, I declare that the Paperbag Hobbies web project was developed through a combination of my own foundational code, independent problem-solving, and close AI collaboration.

Rather than acting as an automated code generator, Generative AI (Google Gemini) was utilized as a custom step-by-step tutor agent and research assistant. A primary motivation for employing the AI agent was to push outside my comfort zone—specifically moving away from outdated legacy patterns (such as basic HTML `<template>` structures) toward modern, robust architectural solutions that align with professional client needs and assessment standards. I provided my initial codebase as context and instructed the AI to act as a structured technical guide to help me research theory, plan improvements, explore accessibility standards, and iteratively rework the implementation.


### Student Ownership & Engineering Responsibility:
* **Core Foundation & Architecture:** Student-Initiated & Directed. The initial project codebase and baseline design concepts were created by me, and then provided as context to the AI tutor agent to establish a structured roadmap for refactoring. The multi-page semantic structure, mobile-first design tokens, and `cartState` architecture were systematically refined and integrated to meet Level 5 assessment criteria through my active direction, tweaking and implementation.
* **Tool Selection Rationale (Google Gemini over Claude):** Google Gemini was deliberately chosen over code-generation-focused LLMs (such as Claude). While models like Claude are known for generating complete, ready-made code solutions, Gemini was selected specifically for its conversational, chat-focused nature. This prevented a "copy-paste" workflow, forcing me to engage in iterative, dialogue-based learning, evaluate explanations, draft the code, and then utilize AI alongside VS Code to spot minor syntax errors or improve indentation and commenting.
* **Tutor-Guided Refinement & Implementation:** The AI agent was prompted to guide me step-by-step through refactoring, debugging, and expanding the project. I reviewed every concept, evaluated the guidance, and personally wrote, tested, integrated, and committed all final code into the repository.
* **Research & Theory Exploration:** AI assistance was utilized to explore technical documentation, review WCAG 2.1 AA relative luminance contrast formulas, study component patterns, and structure testing documentation (`TESTING.md`, `README.md`).
* **Testing & Verification Strategy:** All manual viewport audits across mobile (iPhone SE 375px), tablet (iPad 769px), and desktop viewports, accessibility evaluations, and W3C validation passes were executed and verified firsthand by the student on live environments. Google Gemini was consulted as a methodology advisor to determine the most effective test routes, optimize testing workflows, and structure clear evidence for `TESTING.md`.
* **Documentation Synthesis & Accessibility Support:** All underlying test execution, bug logs, research findings, user stories, and code implementations were produced, conducted, and verified entirely by the student. To accommodate writing barriers and dyslexia, Google Gemini was utilized as an editorial and synthesis assistant. Real technical data, test results, workflow notes, and research inputs were provided to the agent to draft, organize, and format `README.md` and `TESTING.md`. Every line of generated documentation was critically reviewed, edited, and approved by the student prior to final publication and commit.

---

## 2. Formal Reference & Citation

### In-Text Citation
When utilizing the AI tutor agent for step-by-step refactoring guidance, UX theory exploration, and code troubleshooting, suggestions were critically evaluated, selectively filtered, and iteratively refined across multiple passes until they strictly aligned with my architectural requirements and project goals (Google, Gemini, 2026). (See Appendix I.)

### Bibliographic Reference
Google (2026) *Paperbag Hobbies webpage development* [Gemini]. Available from: https://gemini.google.com [Accessed 5 October 2026].

---


## 3. Comprehensive AI Consultation & Evidence Log

As required by JCQ regulations, visual screenshot logs capturing the specific instructions given to the AI tutor agent and the responses generated are archived in the repository under `docs/ai-logs/`.

| Date | Development Phase / Topic | Instruction / Query Summary | Student Action, Evaluation & Implementation | Verifiable Git Commit & Documentation Evidence |
|---|---|---|---|---|
| **Oct 5, 2026** | Initial Code & Boilerplate Setup | Provided initial project structure and HTML boilerplate notes to set up the base repository shell. | Added CSS resets, design tokens, and HTML shell. Executed initial manual W3C validation passes. | • Git: `feat: add HTML5 boilerplate shell...`<br>• `docs/ai-logs/01-tutor-roadmap-setup-a.png` |
| **Oct 5, 2026** | **Documentation Synthesis: README & Testing Setup** | **Supplied raw setup notes, validation outcomes, and project metadata to AI agent to draft and structure initial `README.md` and `TESTING.md`.** | **Reviewed, edited, and approved AI-synthesized documentation for head metadata rationale and initial HTML validation logs.** | • **Git: `docs: add README skeleton...`**<br>• **Git: `docs: add TESTING.md with HTML validation evidence`** |
| **Oct 6, 2026** | WCAG Contrast & Typography Implementation | Executed manual color contrast checks and typography tests in DevTools. | Implemented global Inter font rules and adjusted button tokens to resolve contrast ratios. | • Git: `feat: add global typography for body text...`<br>• `docs/ai-logs/02-contrast-and-wcag-audit.png` |
| **Oct 6, 2026** | **Documentation Synthesis: Bug Logs & Contrast Evidence** | **Provided raw Jigsaw validator outputs, contrast scores, and font testing notes to AI to write Bug B1/B2 entries.** | **Verified and committed structured bug logs and typography checks into the documentation files.** | • **Git: `docs: log Jigsaw var() warning as B2...`**<br>• **Git: `docs: record typography checks in TESTING.md`** |
| **Oct 7, 2026** | UX Research & Layout Wireframing | Mapped out competitor analysis notes, user stories, and wireframe concepts independently. | Structured project rationale, Agile backlog, and UX design decisions for the web application. | • Git: `docs: add design systems and architecture rationale`<br>• `docs/ai-logs/03-mobile-layout-nav.png` |
| **Oct 7, 2026** | **Documentation Synthesis: UX Rationale & Mermaid Diagrams** | **Fed raw research notes and user story data to AI to format the Five Planes of UX framework and Mermaid diagrams.** | **Critically reviewed and refined AI-generated markdown formatting to ensure precise project alignment.** | • **Git: `docs: map five UX principles to project decisions...`**<br>• **Git: `docs: finalise project rationale, user stories...`** |
| **Oct 8, 2026** | Header Grid & Lightbox Implementation | Built full-width 3-column header grid and native HTML5 `<dialog>` lightbox modal. | Performed manual mobile viewport checks (iPhone SE 375px) and focus-trapping evaluations. | • Git: `feat: complete lightbox implementation...`<br>• `docs/ai-logs/04-lightbox-modal.png` |
| **Oct 8, 2026** | **Documentation Synthesis: QA & Lightbox Testing Logs** | **Supplied raw mobile test results and QA field notes to AI to compile US04 lightbox and responsive testing logs.** | **Checked and approved finalized testing entries in `TESTING.md`.** | • **Git: `docs(testing): finalize TESTING.md with US04 lightbox evidence...`**<br>• **Git: `docs(qa): update TESTING.md with desktop grid centering audit...`** |
| **Oct 9, 2026** | Cart v2.0 Architecture & Deployment | Implemented dictionary-based `cartState` engine and deployed live repository to GitHub Pages. | Tested cross-tab sync and local storage persistence firsthand on live environment. | • Git: `feat(cart): implement robust dictionary-based cart...`<br>• `docs/ai-logs/05-cart-engine.png` |
| **Oct 9, 2026** | **Documentation Synthesis: Cart v2.0 & Live URL README** | **Provided cart engine specifications and deployment details to AI to write and organize the Cart v2.0 architecture section.** | **Reviewed and finalized updated README documentation.** | • **Git: `docs(readme): add cart v1 architecture...`**<br>• **Git: `docs: publish GitHub Pages live URL in README`** |
| **Oct 10, 2026** | Postcode API & Financial Logic Integration | Integrated `postcodes.io` REST API with error boundaries and calculated 20% UK VAT math. | Ran manual postal validation checks and verified flat-rate shipping calculations. | • Git: `feat(cart): finalize Cart v2.0 with postcodes.io...`<br>• `docs/ai-logs/06-postcodes-api.png` |
| **Oct 10, 2026** | **Documentation Synthesis: Static Analysis & API Reports** | **Supplied raw API test responses and ESLint output logs to AI to format validation reports in `TESTING.md`.** | **Approved generated static analysis tables and test records.** | • **Git: `docs(testing): resolve ESLint violations in main.js...`**<br>• **Git: `docs(submission): finalize Cart v2.0 feature...`** |
| **Oct 11, 2026** | Secure Checkout & About Page UI Build | Implemented checkout grid form wrapping, inline guardrails, and responsive About page mascot layout. | Conducted manual form validation checks and responsive breakpoint audits. | • Git: `feat(checkout): implement robust inline guardrail validation...`<br>• Git: `feat(about): add responsive two-column mascot layout...` |
| **Oct 11, 2026** | **Documentation Synthesis: Checkout & About Testing Logs** | **Provided raw form test results and layout notes to AI to compile final UI validation logs.** | **Reviewed, edited, and verified final testing entries.** | • **Git: `docs: finalize README.md and TESTING.md with About page layout...`** |
| **Oct 12, 2026** | 404 Error Page & Absolute Pathing Fixes | Implemented custom 404 error page with base href handling for GitHub Pages deep routing. | Verified live route rendering and zero-error W3C validation passes. | • Git: `fix(404): add base href tag to resolve assets...`<br>• `docs/ai-logs/07-w3c-404-debugging.png` |
| **Oct 12, 2026** | **Documentation Synthesis: Final Polish & JCQ Appendix** | **Supplied final project files, complete git history context, and dyslexia support details to AI to format `appendix.md`.** | **Critically reviewed and approved all final documentation files prior to repository submission.** | • **Git: `docs: add 404 validation and layout screenshots`**<br>• **`appendix.md` (Sections 1–3)** |

---