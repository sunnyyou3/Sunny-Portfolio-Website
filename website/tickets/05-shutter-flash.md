# Ticket 05: Shutter Button Screen Flash Easter Egg

## Problem
The camera's shutter button should trigger a full-screen white flash as a fun, aesthetic Easter egg with no navigational purpose. This is a subtle delight for observant users.

## Definition of Done
- Shutter button mesh in `DSLRCamera3D.js` has onClick handler
- Click triggers Framer Motion `motion.div` full-screen white flash animation
- Animation duration: 200ms flash, 300ms fade out
- Uses `prefers-reduced-motion` media query - disabled for users who prefer reduced motion
- No navigational action follows the flash (just visual delight)
- Tested and verified working
- Accessible: flash does not trigger seizures (quick flash, no pattern)

## Implementation Details
- Shutter button already exists in `DSLRCamera3D.js` as a mesh ref (`buttonRefs.current.shutter`)
- onClick handler triggers `motion.div` with `initial={{ opacity: 1 }}` and `animate={{ opacity: 0 }}` over 0.2s
- Full-screen `div` covers entire viewport with white background
- Uses existing `motion` import from Framer Motion (already in `Camera3DScene.js`)
- Respects `prefers-reduced-motion`: if user has this preference, click does nothing visible
- Flash credit in report: "Shutter button screen flash Easter egg (aesthetic only)"

## Acceptance Criteria
- [ ] Shutter button click triggers full-screen white flash
- [ ] Flash auto-animates out after 200ms
- [ ] 300ms fade out to transparency
- [ ] `prefers-reduced-motion` disables the flash effect
- [ ] No navigational side effects (just visual)
- [ ] Tested with Vitest + React Testing Library
- [ ] Accessible (quick flash, no seizure-inducing patterns)
- [ ] No TypeScript errors

## Dependencies
- Existing `DSLRCamera3D.js` shutter button mesh ref
- Framer Motion `motion` component (already used in codebase)
- `prefers-reduced-motion` media query support

## Blocked By
- Can be implemented independently, benefits from existing shutter button ref in DSLRCamera3D.js