# CHRONO//ROOTS

The temporal archive of **Bhuvan Gowda P**. A personal observatory for code, business, music and storytelling. Mobile is the primary composition, not a scaled desktop.

## Principles and visual thesis
One branching organism, five environments. Real work provides the detail; geometry provides continuity. Historical means a scientific folio, not fantasy parchment. Future means precise observation, not a pretend hacking dashboard. Expose normal links and understandable labels everywhere.

Design variance 8 / motion intensity 6 / visual density 3. The installed professional workflow, design-taste, gpt-taste and image-to-code informed the direction. The brief's native scroll, truthful assets and performance requirements override stock-photo, GSAP-only and arbitrary random-layout skill defaults. Seed 5821 selected editorial split; mobile deliberately uses a separate stacked composition.

## Reference extraction
Generated studies: `review-artifacts/chrono/design/winter-mobile.png` and `autumn-archive.png`. Winter: 24px mobile gutter, short large sans headline, ice accent, tree below the reading zone, calm dark atmosphere. Autumn: oversized serif, horizontal archive rules, asymmetric screenshot/copy row, copper foliage. Implement the spacing and hierarchy with real DOM and authored geometry; do not ship mockups as page backgrounds. Other routes extend this common visual vocabulary with seasonal foliage and surfaces.

## Tokens
| Season / route | Background | Text | Muted | Accent | Era |
|---|---|---|---|---|---|
| Winter / Home | #101a20 | #eef0e9 | #b2bfc4 | #acd3df | System boot |
| Autumn / Projects | #211b18 | #f3ebdc | #c2b4a4 | #e0b58a | Mechanical archive |
| Summer / Lab | #14251e | #eff1dc | #b7c6b4 | #dfce88 | Research lab |
| Spring / Achievements | #eeeade | #24382d | #566252 | #466b50 | Scholar's archive |
| Equinox / Profile | #1c2020 | #eeeee1 | #bec2b4 | #d5c395 | Chrono nexus |

Shared borders use 22% foreground. Bone, ink and metallic-neutral unify all seasons. Accent text remains high contrast; foliage is decorative. Contrast is measured in browser QA, not inferred from palette appearance.

## Typography, spacing and grid
Self-hosted Bricolage Grotesque for identity, navigation and readable body. IBM Plex Mono for actual frame index, route season and geometry captions. System Georgia for archive/scholar display: familiar historical letterforms without another network dependency. No more than three families. Body 16–18px, 1.65 line-height, max 62ch. Headings 42–100px responsive; tight but no clipped descenders. H1 at most three lines on narrow phones. Spacing scale 4/8/12/16/24/32/48/64/96/128. Mobile major chapters 72px, desktop 112px. Container max 1320px; mobile gutter 20px (16px at 320), desktop 48px. Desktop 12-column proportions expressed as simple grid fractions. No forced bento; project rows leave no empty grid cells.

## Navigation and information architecture
Home / Projects / Lab / Achievements / Profile remain literal labels. Persistent brand and visible mobile Menu button. Native modal dialog for the Chrono map and command search; Escape, focus containment and restoration. Ctrl/Cmd+K is optional. A route-labelled season dial and footer map reinforce the world. Command results use links and support projects, music, manhwa, seasons and individual case studies. Mobile menu provides the same actions without a keyboard.

## Background and tree system
Back: layered low-contrast atmospheric light, fine grain via CSS, horizon. Mid: one persistent SVG with deterministic recursive branching, observatory circles and a ground ellipse. Front: sparse frost/buds/leaves; displacement follows actual page scroll and is disabled in reduced motion. Branch lengths scale by 0.72/0.69, angles fork approximately 24–34 degrees with seeded variation. The geometry is an artistic recursive model, not a biological simulation. Seasonal leaves share branch endpoints. Equinox assigns four foliage states spatially across the same tree. Never cover body copy with high-contrast branches.

## Mathematical visual grammar and motion
Frame index = round(clamp(t,0,1) × 159), where t is section scroll / available travel. The lab phyllotaxis experiment uses r=c√n and θ=n×137.507764°; controls show what changes and labels explain the model. No equations are attributed to unrelated projects. Scene motion is native scroll plus RAF-scheduled transforms, without a smooth-scroll replacement or scroll lock. Route theme changes take 360ms and remain interruptible. No autonomous indefinite animation. Tree sway/falling leaves follow scroll. Reduced-motion and user pause freeze ambient movement.

## Project case studies and creative work
Archive index leads to independent case-study routes. Surface problem, why, system, engineering, decisions, challenge, result and learning only where sources support them. Missing personal reflections stay explicitly unrecorded. Source links sit next to assertions. Repo documentation is evidence of implementation intent, not proof of a current passing application. Preserve all six prior projects and capabilities, adding recovered source-backed projects. Dedicated Creative Signals chapter: original WEBTOON cover and verified public series, then Spotify artist with optional click-to-load official embed. No audio autoplay or invented metrics.

## Mobile and desktop behavior
Phone first viewport shows identity, a concise headline, readable context and direct project access. Intro begins below this cover so visitors can navigate immediately. On desktop the same sequence becomes an expansive cinematic stage. Canvas contains full frames so baked-in source text is not cropped. All controls at least 44px, normally 48px. Dynamic viewport height for navigation; stable small-viewport units for sequence travel avoid address-bar jumps. Compact tree on mobile, rich geometry retained on desktop. No hover dependency. Cases and creative media stack naturally.

## Accessibility
One h1 per route, semantic landmarks, visible focus, skip link, native details and dialog, labelled range controls, explicit image dimensions and alt text. Content is server-rendered and works without effects. Reduced motion uses a static portrait and no sequence requests. Save-Data uses the same static mode. Avoid fake disabled links. Pause control available for ambient scroll effects.

## Frame delivery and performance
Keep all 160 master JPEGs unmodified. Existing compact and large WebP derivatives retain the exact master ordering. Conservative static-first SSR; enable sequence after capability sampling. Reduced motion / Save-Data / slow network / low memory select static. Touch alone never disables the sequence. Sample RAF cadence and decoding; degrade if measured stalls persist. Compact mobile bounded bitmap cache; larger desktop cache; 3 concurrent loads, current target first, replace pending queue on direction changes, neighboring prefetch, close evicted ImageBitmaps, abort on unmount. Never clear canvas before a decoded replacement exists. No React state per raw scroll. Content stays identical at every capability level.

## Validation

The critical frontend resume pass adds two shared observatory plates (`public/media/environments`), preserves the procedural tree, and elevates the user-supplied 16 August 2026 FRIDAY capture into a full overview, lossless mobile detail views and native inspection dialog. Production browser evidence for this limited pass is in `review-artifacts/chrono/critical-pass`. It focuses on 390×844, 375×812, 430×932 and 1440×900; it does not repeat the exhaustive matrix below. Backend implementation and connection are outside this pass.
Production build and real scripts, Chromium plus practical WebKit coverage, all requested viewport sizes, axe, keyboard and touch, failure paths, native scroll forward/reverse, replay and cached visit. Metrics and screenshots are recorded in `PORTFOLIO_3_QA.md`. Lab measurements are not field Core Web Vitals.
