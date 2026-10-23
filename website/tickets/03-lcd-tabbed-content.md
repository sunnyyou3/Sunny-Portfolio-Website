# Ticket 03: LCD Tabbed Content System - Gallery/Projects/Experience

## Problem
The camera's LCD screen needs to display three tabbed content sections: Gallery (photography), Projects (software projects), and Experience (work history). Users navigate via menu dial, D-Pad, OK button, or dedicated Gallery button.

## Definition of Done
- LCD tab state managed by `useCameraThemeHook` (from Ticket 01)
- Three tabs: `gallery`, `projects`, `experience`
- Tab navigation methods:
  - Menu dial: cycles through tabs with visual feedback
  - D-Pad Up/Down: cycles through tabs
  - OK button: confirms tab selection
  - Dedicated Gallery button: jumps directly to gallery tab (shortcut)
- LCD content pulls from existing page data:
  - Gallery: `Gallery.js` slides data
  - Projects: `ProjectSection.js` data
  - Experience: `CareerHistory.js` timeline
- LCD overlay uses existing `Html` component from `@react-three/drei` in `Camera3DScene.js`
- Tab change triggers re-render of LCD content with smooth transition
- Accessible tab pattern with focus management

## Implementation Details
- Tab state: `lcdTab` in `useCameraThemeHook`, initially 'gallery'
- Tab cycling order: gallery -> projects -> experience -> gallery
- D-Pad mapping: Up/Down = previous/next tab, Left/Right = optional secondary nav
- OK button: saves selected tab, updates hook state
- Gallery button: sets `lcdTab` to 'gallery' regardless of current state
- Content transition: 300ms fade/slide when tab changes
- Each tab's content component: `GalleryLCD`, `ProjectsLCD`, `ExperienceLCD`

## Acceptance Criteria
- [ ] Three tabs cycle in correct order via menu dial and D-Pad
- [ ] OK button confirms selection and updates content
- [ ] Dedicated Gallery button jumps to gallery tab from any position
- [ ] LCD content updates smoothly when tab changes (300ms transition)
- [ ] Gallery tab shows photo grid from `Gallery.js` data
- [ ] Projects tab shows project cards from `ProjectSection.js` data
- [ ] Experience tab shows career timeline from `CareerHistory.js` data
- [ ] Accessible tab pattern (focus management, ARIA labels)
- [ ] Works with keyboard navigation (arrow keys, Enter)
- [ ] No TypeScript errors
- [ ] Comprehensive test suite

## Dependencies
- Ticket 01: `useCameraThemeHook` (provides `lcdTab` state and `setLcdTab` function)

## Blocked By
- Ticket 01 must be completed first