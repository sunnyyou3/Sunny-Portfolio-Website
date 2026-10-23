# Ticket 02: CameraAssembly Component - Modular Assembly Animation

## Problem
The site needs a camera assembly animation where modular pieces fly from orbit positions and click together to form a mirrorless camera. This animates only on first visit; state persists in session storage.

## Definition of Done
- New `CameraAssembly` component created at `src/components/CameraAssembly.tsx`
- Animation uses Framer Motion (consistent with existing codebase) or Three.js transitions
- Modular pieces are `BoxGeometry` variants representing lens segments, grip sections, dial parts
- Assembly sequence runs once (detected via `useCameraThemeHook`'s `assembled` state)
- After assembly, `useCameraThemeHook.assembled` is set to `true`
- CSS respects `prefers-reduced-motion` - animation gracefully degrades
- Component accepts `onAssemblyComplete` callback prop
- Tested with Vitest and React Testing Library

## Implementation Details
- Entry animation duration: ~2.5 seconds (matching existing Camera3DScene entry animation)
- Modular pieces animate from predefined orbit positions using Framer Motion's `animate` with `transition`
- Pieces "click together" via final positioning that forms the mirrorless camera silhouette
- Uses `useSharedValue` from Framer Motion for choreographed timing
- On completion, calls `hook.setAssembled(true)` (via context or prop)

## Acceptance Criteria
- [ ] Animation plays only once per session (checked via `useCameraThemeHook.assembled`)
- [ ] After animation, `assembled` state is `true` in hook
- [ ] `prefers-reduced-motion` media query stops animation, shows static assembled camera
- [ ] `onAssemblyComplete` callback is fired after animation completes
- [ ] Animation uses Framer Motion consistent with existing codebase patterns
- [ ] Comprehensive test suite with >80% coverage
- [ ] No TypeScript errors

## Dependencies
- Ticket 01: `useCameraThemeHook` (needs `assembled` state and `setAssembled` function)

## Blocked By
- Ticket 01 must be completed first (provides the state management)