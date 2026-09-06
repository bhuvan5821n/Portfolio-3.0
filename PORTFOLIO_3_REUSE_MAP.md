# Portfolio 3.0 Reuse Map

## Data Layer
- **data/profile.ts**: REUSE AS-IS (with potential updates for verified information)
  - The structure is sound and content is factual. We may update fields as we verify more information.
- **data/capabilities.ts**: REUSE AS-IS (with potential updates)
  - Similarly, the capabilities are factual and can be reused. We may expand or refine.
- **data/projects.ts**: REUSE + OPTIMIZE
  - The project data is the source of truth. We will reuse it but may need to adjust for featured projects and mobile presentation.
  - We might consider normalizing technology tags or adding mobile-specific image variants.
- **data/hero-sequence.json**: REUSE + OPTIMIZE
  - The hero sequence is a core part of Portfolio 2.0's identity. For Portfolio 3.0, we may keep it for desktop but optimize for mobile (e.g., by generating lower-resolution variants or using a lighter fallback).
- **data/hero-manifest.ts**: REUSE AS-IS
  - Utility for the hero sequence, can be reused.

## Components
### Site Layout (components/site/)
- **components/site/layout.tsx**: REUSE + REDESIGN PRESENTATION
  - The layout provides the basic structure (headers, footers, etc.). We will adapt it for mobile-first breakpoints and potentially simplify for Portfolio 3.0's design.
- **components/site/primary-navigation.tsx**: REWRITE COMPONENT
  - The current navigation may be desktop-oriented. We will create a new mobile-friendly navigation (hamburger menu) that also works on desktop.
- **components/site/footer.tsx**: REUSE + REDESIGN PRESENTATION
  - The footer content is valuable but may need redesign for mobile (e.g., vertical stacking, touch-friendly links).
- **components/site/continue-link.tsx**: REUSE AS-IS
  - A simple link component that encourages exploration. Can be reused with potential styling updates.

### Intro (components/intro/)
- **components/intro/scroll-intro.tsx**: REUSE + OPTIMIZE (for desktop) + REWRITE COMPONENT (for mobile fallback)
  - The canvas-based intro is unique and performant on desktop. For mobile, we will provide a lighter-weight alternative (e.g., CSS animation or static image) to reduce LCP impact. We can reuse the core logic for detecting reduced motion and Save-Data.
- **components/intro/replay-control.tsx**: REUSE AS-IS
  - A simple button to replay the intro. Can be reused with accessibility checks.

### Projects (components/projects/)
- **components/projects/project-scene.tsx**: REUSE + REDESIGN PRESENTATION
  - The visual layer for projects (e.g., background, effects) may be too heavy for mobile. We will adapt it to be lighter and optionally disable on mobile.
- **components/projects/project-card.tsx**: REWRITE COMPONENT
  - Current project cards may be designed for desktop grid. We will create new mobile-first cards that stack vertically and have touch-friendly interactions.
- **components/projects/project-grid.tsx**: REWRITE COMPONENT
  - We may replace the grid with a more flexible layout (e.g., using CSS Grid or Flexbox) that adapts from single column (mobile) to multi-column (desktop).

### Other Components
- **components/lab/**: REVIEW INDIVIDUALLY
  - The lab (experiments workbench) may contain interesting client-side experiments. We will review each for mobile performance and relevance.
- **components/achievements/**: REUSE + REDESIGN PRESENTATION
  - The achievements/scrapbook can be reused but may need a mobile-friendly layout (e.g., a vertical timeline or grid).

## Styling
- **styles/globals.css**: REUSE + OPTIMIZE
  - We will extract design tokens (colors, spacing, typography) from this file and refactor into a design system (e.g., using CSS variables or Tailwind). Then, we will rewrite components to use these tokens.
  - Note: We are installing Tailwind in Portfolio 3.0, so we may migrate to Tailwind for better mobile-first utilities.

## Public Assets
- **public/media/hero-sequence/**: REUSE + OPTIMIZE
  - We will copy the hero sequence images and generate optimized variants (WebP/AVIF, multiple sizes) for responsive delivery.
- **public/media/curiosity-arcade/**: REUSE AS-IS (if used)
  - The decorative objects are fun but may not be essential for mobile. We may choose to only load them on desktop or remove them if they don't add value.
- **public/fonts/**: REUSE AS-IS
  - Any custom fonts can be reused, but we will audit for performance and consider using system fonts where possible.

## Configuration
- **next.config.ts**: REWRITE COMPONENT
  - We will create a new Next.js config optimized for Portfolio 3.0 (e.g., image optimization, webpack, etc.), but we can take inspiration from the existing one.
- **tsconfig.json**: REUSE AS-IS
  - The TypeScript configuration is standard and can be reused.
- **eslint.config.mjs**: REUSE AS-IS
  - ESLint configuration can be reused, though we may add rules for mobile-specific considerations (e.g., no large hover-only effects).
- **playwright.config.ts**: REUSE AS-IS
  - The Playwright configuration is valuable for testing and can be reused.
- **scripts/**: REUSE AS-IS
  - The frame inspection script is useful and can be reused if we keep the hero sequence.

## Content and Documentation
- **CONTENT_GAPS.md**: REUSE AS-IS (as a reference)
  - We will use this to identify what information we need to verify and add, but we will not modify the original in Portfolio 2.0.
- **README.md**: REWRITE COMPONENT
  - We will create a new README for Portfolio 3.0 that reflects its goals and setup.

## Removal
- **Anything not listed above that is not essential**: REMOVE FROM 3.0
  - We will be conservative and only remove what we are sure is not needed (e.g., temporary files, unused experimental code).

## Summary
Our approach is to reuse the strong data layer and content philosophy, adapt the layout and components for mobile-first, and optimize assets for performance. We will rewrite components where the desktop-first design hinders mobile usability, and we will preserve the unique identity of Portfolio 2.0 where it translates well to mobile.