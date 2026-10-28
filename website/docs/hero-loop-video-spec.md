# Hero Loop Video — Specification

## Problem Statement

The hero section currently renders MetroHero (a scroll-scrub video component) immediately on mount. MetroHero loads a video from a CDN and waits for it to be ready before the user can scroll-scrub. There is no introductory video experience — the hero jumps straight into the MetroHero scroll-scrub interaction. The user wants a looping introductory video (`defaultmetro.mp4`) to play on mount, creating a more cinematic entry, then transition to MetroHero when the user scrolls.

## Solution

Replace the immediate MetroHero render with a three-phase sequence orchestrated by the Hero component:

1. **Loop phase** — `defaultmetro.mp4` plays on a loop with the Hero UI (name, bio, profile image, theme toggle) overlaid. MetroHero is pre-mounted but idle behind the loop video.
2. **Fade phase** — triggered by the first scroll event. The loop video fades out over 600ms while MetroHero fades in (crossfade through MetroHero's dark background).
3. **Active phase** — MetroHero becomes fully active (RAF loop starts, scroll-scrubbing begins). The loop video is unloaded from the DOM.

## User Stories

1. As a visitor arriving at the portfolio, I want to see a looping introductory video, so that I have an engaging visual experience before I start scrolling.
2. As a visitor, I want to see my name, bio, and profile image overlaid on the looping video, so that I immediately understand who I am while the video plays.
3. As a visitor, I want the looping video to play immediately on page load without any loading delay, so that the experience feels instant.
4. As a visitor, I want the looping video to be muted and autoplay, so that I can start viewing without needing to interact first.
5. As a visitor, I want to be able to toggle between light and dark themes while the looping video plays, so that I can preview how the hero UI looks with different themes.
6. As a visitor, I want the looping video to seamlessly loop without any visible gap or jump, so that the experience feels continuous.
7. As a visitor, I want scrolling to trigger a smooth transition from the looping video to MetroHero, so that the navigation feels natural.
8. As a visitor, I want the transition to be a crossfade (not a hard cut), so that it feels polished and cinematic.
9. As a visitor, I want the transition to complete within a reasonable time (under 1 second), so that it feels responsive and not sluggish.
10. As a visitor, I want MetroHero's scroll-scrubbing to take over seamlessly after the transition, so that I can continue exploring the portfolio without interruption.
11. As a visitor, I want the looping video to be unloaded from memory after the transition, so that the browser doesn't waste resources on an unused video.
12. As a visitor, I want the body scroll to be locked during the loop phase, so that the looping video plays without the page scrolling away accidentally.
13. As a visitor, I want the body scroll to be unlocked after MetroHero activates, so that I can freely scroll through the rest of the portfolio.
14. As a visitor using a mobile device, I want touch scrolling to trigger the transition, so that the experience works on all devices.
15. As a visitor using a desktop, I want mouse wheel scrolling to trigger the transition, so that the experience works on all input methods.
16. As a visitor with reduced motion preferences, I want the transition to still work (just without the fade animation), so that I can still access the content.
17. As a visitor, I want the Hero UI elements (scroll indicator, theme toggle) to remain visible and functional during the loop phase, so that I have full context.
18. As a visitor, I want the Hero UI elements to fade away along with the loop video, so that the transition to MetroHero is clean with no overlapping elements.
19. As the site owner, I want the loop video to be a local asset (`defaultmetro.mp4`), so that it loads reliably without CDN dependency.
20. As the site owner, I want the change to be backwards-compatible — existing functionality (MetroHero scroll-scrubbing, CameraVideo sequence) must continue to work unchanged.
21. As a visitor, I want the loop video to start from the beginning each time the page loads, so that I see the full introductory sequence.
22. As a visitor, I want the transition to trigger only once (not repeatedly on every scroll event), so that the sequence plays cleanly without re-triggering.
23. As a visitor, I want the loop video to use hardware-accelerated playback, so that it runs smoothly without consuming excessive CPU.
24. As a visitor, I want the video to use `playsInline` so that it plays correctly on iOS Safari without requiring user interaction.
25. As a visitor, I want the loop video to use `object-fit: cover` so that it fills the viewport regardless of aspect ratio.

## Implementation Decisions

### Modules Modified

- **Hero component** — orchestrates the three-phase flow (loop → fade → active)
- **MetroHero component** — gains a new `pausedAtEnd` prop to support idle pre-mounting

### Hero Component Changes

- **State machine**: Hero tracks `heroPhase` with three states: `'loop'`, `'fading'`, `'takeover'`
- **Loop video**: A `<video>` element with `loop`, `muted`, `playsInline`, `preload="auto"`, and `object-fit: cover` renders during the loop phase. It is positioned absolutely to cover the full viewport.
- **Hero UI**: Remains visible during loop phase, fades out during the fade phase.
- **MetroHero pre-mount**: MetroHero is mounted during the loop phase with `pausedAtEnd={true}`, so it is ready to activate instantly when the user scrolls.
- **Scroll detection**: A single-use scroll listener (`{ once: true }`) on `window` during the loop phase. The first scroll event triggers the transition to `'fading'` and removes itself.
- **Fade transition**: CSS opacity transitions (600ms ease) on both the loop video and MetroHero containers. Loop video fades out, MetroHero fades in.
- **Takeover**: After the 600ms fade completes, `heroPhase` transitions to `'takeover'`. The loop video element is removed from the DOM (unloaded). The `pausedAtEnd` prop is removed from MetroHero, activating its RAF loop and scroll-scrubbing.
- **Body scroll lock**: Hero.js locks the body during the loop phase (existing behavior). The lock is released when transitioning to `'fading'`, allowing MetroHero's scroll handling to take over.

### MetroHero Component Changes

- **New prop**: `pausedAtEnd` (boolean, default: `false`)
- **When `pausedAtEnd` is `true`**:
  - The RAF loop is skipped (no `requestAnimationFrame` calls)
  - Video `currentTime` is pinned at `0` (first frame)
  - All text overlays (title, tagline, scroll hint, progress bar) are hidden
  - Wheel/touch input is processed but has no effect (no scrubbing)
  - The video element remains in the DOM and is visible (but shows frame 0)
- **When `pausedAtEnd` is `false` (default)**:
  - All existing behavior is preserved — RAF loop, scroll-scrubbing, text overlays, zoom effect, lock mechanics
- **No other changes**: MetroHero's core functionality, props, and behavior are unchanged. The `pausedAtEnd` prop is purely additive.

### Architectural Decisions

- **MetroHero stays mounted during loop phase**: This avoids the need to re-mount MetroHero (and re-download its CDN video) when the user scrolls. MetroHero is idle but ready.
- **Loop video is unloaded from DOM**: The loop video element is physically removed from the DOM during the takeover phase, freeing memory. MetroHero's video (CDN) stays loaded since re-downloading would cause a visible loading state.
- **Scroll detection at Hero level**: The scroll listener is attached to `window` in Hero.js, not in MetroHero. This keeps the scroll-to-transition logic centralized in the orchestrator component.
- **CSS transitions for fade**: The fade-out/fade-in uses CSS `opacity` transitions rather than JavaScript animation. This is hardware-accelerated, simpler, and avoids introducing a new animation library.
- **No state library**: The three-phase flow uses React's built-in `useState` — no external state management is needed for this simple sequence.

### Interface Changes

- **MetroHero**: New optional prop `pausedAtEnd?: boolean` (default: `false`)
- **Hero**: No new public props. Internal state `heroPhase` is private.

### Data Flow

```
Mount → Hero renders loop video + MetroHero(pausedAtEnd=true)
  │
  │  User scrolls (first scroll event)
  ▼
Hero sets heroPhase='fading' → loop video fades out, MetroHero fades in
  │
  │  600ms CSS transition completes
  ▼
Hero sets heroPhase='takeover' → loop video removed from DOM, MetroHero activated
  │
  │  MetroHero's RAF loop starts
  ▼
MetroHero processes scroll events → scroll-scrubbing active
```

## Testing Decisions

### What Makes a Good Test

Tests should verify **external behavior** — what the user sees and experiences — not internal implementation details like state names, ref usage, or specific CSS property values. Tests should focus on:

- **Visibility**: Is the right element visible at the right time?
- **Interactions**: Does scrolling trigger the expected behavior?
- **DOM state**: Are elements added/removed as expected?
- **Props**: Are the correct props passed to child components?

### Testing Seams

**Seam 1: Hero component** (highest seam — the orchestrator)

The Hero component is the primary testing seam. Tests verify the three-phase flow from the outside:

- **Loop phase**: Verify the loop video is rendered and visible on mount. Verify MetroHero is mounted (check for MetroHero's container). Verify Hero UI elements are visible.
- **Fade phase**: Simulate a scroll event. Verify the loop video starts fading (opacity transition). Verify MetroHero starts fading in.
- **Takeover phase**: After the fade completes, verify the loop video is removed from the DOM. Verify MetroHero is active (not paused). Verify MetroHero's text overlays are visible.

**Seam 2: MetroHero component** (secondary seam)

MetroHero's `pausedAtEnd` behavior is tested as a separate seam:

- **When `pausedAtEnd=true`**: Verify the video element exists but shows frame 0. Verify text overlays are hidden. Verify no RAF loop is running.
- **When `pausedAtEnd=false`**: Verify normal MetroHero behavior (RAF loop, text overlays, scroll-scrubbing) works as before.

### Testing Approach

- **Unit tests**: Add to existing `src/components/__tests__/Hero.test.js` for the three-phase flow. Add to existing `src/components/__tests__/CameraScene.test.js` or a new `MetroHero.test.js` for the `pausedAtEnd` prop.
- **Testing library**: Use `@testing-library/react` (existing in the project). Use `fireEvent` or `userEvent` to simulate scroll events.
- **Prior art**: The existing `Hero.test.js` tests render and basic visibility. The new tests extend this pattern with interaction testing (scroll simulation) and DOM cleanup verification.
- **No E2E tests needed**: The feature is self-contained within the React component tree. Component-level tests are sufficient to verify external behavior.

### Test Cases (External Behavior)

1. Hero renders a looping video on mount
2. Hero UI (name, bio, image, theme toggle) is visible during loop phase
3. Scrolling triggers the fade transition
4. The loop video fades out during the transition
5. MetroHero fades in during the transition
6. The loop video is removed from the DOM after takeover
7. MetroHero becomes active after takeover (RAF loop runs, scroll-scrubbing works)
8. MetroHero with `pausedAtEnd=true` does not run its RAF loop
9. MetroHero with `pausedAtEnd=true` pins video at frame 0
10. MetroHero with `pausedAtEnd=true` hides all text overlays
11. The transition triggers only once (subsequent scroll events don't re-trigger)
12. The loop video uses `loop`, `muted`, `playsInline` attributes

## Out of Scope

- **Loop video content**: The spec does not define what `defaultmetro.mp4` contains or how it should be produced. It is assumed to exist at `src/assets/video/defaultmetro.mp4`.
- **Loop video quality/size optimization**: Compression, transcoding, or size optimization of the loop video is out of scope.
- **Mobile gesture improvements**: Touch scrolling is supported, but no custom touch gestures (pinch, swipe patterns) are added.
- **Loop video controls**: No play/pause/seek controls are added to the loop video. It plays automatically and loops silently.
- **Theme-specific loop videos**: The same loop video plays regardless of light/dark theme. No separate videos are created for each theme.
- **Prefers-reduced-motion handling for the loop video**: The loop video plays normally even for users with reduced motion preferences. (MetroHero already handles this separately.)
- **Analytics/tracking**: No tracking of loop video views, scroll triggers, or transition timing.
- **Accessibility for the loop video**: No ARIA labels, captions, or screen reader considerations specific to the loop video.
- **Video preloading strategy**: The video uses standard React `import()` preloading. No custom preload optimization (e.g., `<link rel="preload">`, Service Worker caching) is implemented.

## Further Notes

- The loop video file (`defaultmetro.mp4`) already exists at `src/assets/video/defaultmetro.mp4`. It should be verified to be a suitable length for looping (ideally seamless on loop).
- MetroHero's existing `onProgress` callback is not used to trigger the transition. The transition is triggered purely by the scroll event. This keeps the two concerns (scroll detection, progress reporting) separate.
- The 600ms fade duration matches the existing fade patterns in the codebase (Hero.js already uses 600ms transitions for theme switching and other UI elements).
- MetroHero's `pausedAtEnd` prop is additive and backwards-compatible. Any existing usage of MetroHero (if any) continues to work without modification.
- The loop video import uses standard React `import()` syntax, which webpack (react-scripts) will bundle as an asset. No special Vite or Next.js configuration is needed.
