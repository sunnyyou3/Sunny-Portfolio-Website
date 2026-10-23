# Ticket 06: Scroll-Triggered Camera Spin (Persistent State)

## Problem
When the user has already seen the camera assembly (it's persisted in session storage), scrolling should cause the camera to spin/reveal its rear LCD again, but NOT re-assemble the camera. This keeps the experience dynamic without the performance cost of repeated assembly.

## Definition of Done
- `window.onscroll` debounced handler in `Camera3DScene.js` or custom hook
- When `useCameraThemeHook.assembled` is `true` and user scrolls:
  - Camera rotates slowly around Y axis (spin animation)
  - Does NOT re-trigger assembly animation
- When `useCameraThemeHook.assembled` is `false` (first visit) and user scrolls:
  - Entry assembly animation may play (or not, depending on design choice)
- Spin rotation speed: slow, continuous or on-scroll-triggered
- `prefers-reduced-motion` respect: reduced spin or static state
- Tested with automated tests and manual verification

## Implementation Details
- Debounce scroll handler: 100ms delay, prevents multiple triggers
- Spin rotation: `cameraRef.current.rotation.y += 0.01` per frame when scrolling
- Entry animation: plays only on first visit (sessionStorage 'cameraAssembled' flag check)
- After entry animation completes, only spin animates on scroll
- Spin resets or continues based on design choice (chosen: spin restarts from current angle on each scroll)
- Uses existing `useFrame` from `@react-three/fiber` (already in `Camera3DScene.js`)
- Shares `cameraRef` with `Camera3DScene` and `DSLRCamera3D`

## Acceptance Criteria
- [ ] After assembly completes, scrolling triggers spin (not re-assembly)
- [ ] First visit shows entry assembly, then only spin on scroll
- [ ] `prefers-reduced-motion`: static camera or reduced spin
- [ ] Spin is smooth, not jerky (use `useFrame` for per-frame updates)
- [ ] Debounced to prevent multiple triggers from mild scrolling
- [ ] Tested with automated tests
- [ ] No TypeScript errors
- [ ] Works with existing `Camera3DScene.js` structure

## Dependencies
- Ticket 01: `useCameraThemeHook` (provides `assembled` state)
- Ticket 02: `CameraAssembly` component (provides the assembly animation pattern)
- Existing `Camera3DScene.js` structure with `useFrame`, `cameraRef`

## Blocked By
- Ticket 01 must be completed first (provides `assembled` state)
- Ticket 02 should be completed first (provides assembly animation pattern to distinguish from spin)