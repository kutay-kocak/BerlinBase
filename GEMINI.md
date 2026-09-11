# BerlinBase UI/UX, Motion and Design System Rules

These rules are ALWAYS ACTIVE for Antigravity when developing BerlinBase.

## 1. Impeccable & UI UX Pro Principles
- **Visual Hierarchy:** Essential relocation data (Anmeldung, Rent, District match) must take immediate optical prominence.
- **Accessibility & Contrast:** High contrast WCAG AA compliant. BVG Yellow (`#F0D722`) on Deep Slate (`#1A1A24`) or Dark Gray (`#2C2D35`).
- **Touch & Click Targets:** All interactive triggers, buttons, and mobile tabs must have at least 44x44px clickable area.
- **Microcopy & Trust:** Bureaucracy and legal terms (SCHUFA, Kaltmiete, WBS) must have concise, non-intimidating tooltips and badges.
- **No Layout Jitter:** Skeletons or fixed aspect ratio containers for dynamic elements (Power BI iframe, Leaflet map).

## 2. LottieFiles Motion Design Principles
- **Disney 12 Principles adapted for UI:**
  - **Timing & Easing:** UI transitions must use natural easing (`cubic-bezier(0.16, 1, 0.3, 1)` or `easeOutExpo`). Durations between 200ms and 350ms.
  - **Choreography:** Stagger list entries (districts, apps) with 50ms stagger intervals.
  - **State Feedback:** Instant response on interaction, subtle feedback animations on quiz step completion and copy actions.
- **Motion Archetype:** Clean, modern, purposeful transit-metro feel (fast, punctual, precise, not cartoonish).

## 3. zanwei/design-dna Extraction & Consistency
- **Design Tokens:**
  - `bvg-yellow`: `#F0D722`
  - `bvg-dark`: `#1A1A24`
  - `bvg-gray`: `#2C2D35`
  - `bvg-light`: `#F8F9FA`
  - `bvg-accent`: `#E30613` (U-Bahn Red / Alert callouts)
- **Geometry:** Border radius standard is `rounded-xl` (12px) for cards, `rounded-lg` (8px) for buttons.
- **Borders:** Subtle border accents using `border-white/10` or `border-bvg-yellow/20`.

## 4. AThevon/genjutsu Dynamic Fluidity
- **State Transition Transitions:** Smooth tab transitions between the 6 main tabs.
- **Quiz Wizard Motion:** Horizontal slide and fade for step navigation in "Best Neighborhood for You".
- **Hover Micro-interactions:** Subtly elevate cards on hover (`translate-y-[-2px]`) with smooth CSS/Framer Motion transitions.
