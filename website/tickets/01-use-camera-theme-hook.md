# Ticket 01: useCameraThemeHook - Core State Management

## Problem
The portfolio needs a centralized hook to manage camera theme state including: assembly status (whether the camera has been assembled), current LCD tab (Gallery/Projects/Experience), scroll behavior (persistent assembled state vs. re-spinning), and session storage persistence.

## Definition of Done
- Custom React hook `useCameraThemeHook` created at `src/hooks/useCameraThemeHook.ts`
- Hook returns: `assembled` (boolean), `lcdTab` ('gallery'|'projects'|'experience'), `isSpinning` (boolean), `sessionKey` (string)
- Hook uses `sessionStorage` to persist `cameraAssembled` flag across visits
- Hook provides `resetSession()` to clear state (e.g., on manual reset)
- Hook is thoroughly tested with Vitest
- No TypeScript errors

## Acceptance Criteria
- [ ] Hook initializes `assembled` from sessionStorage on first visit, defaults to `false`
- [ ] Hook persists `cameraAssembled` to sessionStorage after assembly completes
- [ ] Hook provides `setLcdTab(tab)` function to change LCD tab
- [ ] Hook provides `startSpin()` and `stopSpin()` functions
- [ ] Hook resets state when sessionStorage is cleared or on manual reset
- [ ] All functions are pure where possible; state updates are batched
- [ ] Comprehensive test suite with >80% coverage
- [ ] TypeScript types are complete and correct

## Dependencies
- None (foundation ticket - can be implemented independently)

## Blocked By
- None (this is the foundation ticket)