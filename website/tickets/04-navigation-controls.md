# Ticket 04: Menu Dial + D-Pad + OK Button Navigation

## Problem
The camera UI needs accessible navigation controls: a menu dial for tab selection, D-Pad for cycling, OK button to confirm, and a dedicated Gallery button for quick access. These should work with both mouse/pointer and keyboard input.

## Definition of Done
- Menu dial component at `src/components/CameraMenuDial.tsx` with visual highlight state
- D-Pad component at `src/components/CameraDPad.tsx` with Up/Down/Left/Right buttons
- OK button component at `src/components/CameraOKButton.tsx` 
- Dedicated Gallery button at `src/components/CameraGalleryButton.tsx`
- All components integrate with `useCameraThemeHook` (Tickets 01 & 03)
- Keyboard equivalents: arrow keys for D-Pad, Enter for OK
- Focus management: visible focus rings, logical tab order
- Accessible ARIA labels on all controls
- Working with both pointer (mouse) and keyboard input

## Implementation Details
- Menu dial: radial menu with 5 tab options (Gallery, Projects, Experience, Settings, Help)
- D-Pad: directional buttons with centered OK button (classic gamepad layout)
- Visual feedback: highlighted border, selected state indication
- Keyboard mapping:
  - Up/Down arrows: cycle tabs vertically
  - Left/Right arrows: optional secondary navigation
  - Enter: confirm selection (same as OK button click)
  - Tab key: cycle focus through camera controls
- Focus ring: 2px solid with `focus-visible` CSS, meets WCAG AA contrast
- All controls hidden from visual display but functional when focused (accessibility-first)

## Acceptance Criteria
- [ ] Menu dial opens with tab options, cycles with D-Pad Up/Down
- [ ] OK button confirms tab selection, closes menu dial
- [ ] D-Pad Up/Down cycles through: gallery -> projects -> experience -> gallery
- [ ] Dedicated Gallery button jumps to gallery tab immediately
- [ ] Keyboard arrow keys control D-Pad navigation
- [ ] Enter key confirms OK button action
- [ ] Focus visible on all interactive elements (WCAG AA contrast)
- [ ] ARIA labels provided on all controls
- [ ] Works with both mouse click and keyboard input
- [ ] No TypeScript errors
- [ ] Comprehensive test suite

## Dependencies
- Ticket 01: `useCameraThemeHook` (provides `lcdTab` state and `setLcdTab`)
- Ticket 03: LCD Tabbed Content System (uses hook's tab state)

## Blocked By
- Ticket 01 must be completed first
- Ticket 03 should be completed in parallel (provides the content being navigated to)