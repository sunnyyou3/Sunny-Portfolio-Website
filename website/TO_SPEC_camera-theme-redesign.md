## Problem Statement

The Sunny Portfolio Website needs a cohesive camera-themed UI redesign that bridges the user's passion for photography with their software engineering resume. The current implementation has a functional Three.js camera scene (`Camera3DScene.js`) and a detailed DSLR model (`DSLRCamera3D.js`), but lacks: (1) a modern mirrorless camera theme (DSLR code exists but user wants mirrorless), (2) camera assembly animation beyond the initial entrance spin, (3) LCD tabbed navigation for Gallery/Projects/Experience content, (4) menu dial + D-Pad + OK button navigation flow, (5) shutter button screen flash Easter egg, and (6) scroll-triggered camera re-assembly with persistent state. The redesign must build on the existing Three.js foundation while creating a unified, memorable user experience that functions as both navigation metaphor and content organizer.

## Solution

Implement a camera-themed UI system that transforms the existing Three.js camera scene into a mirrorless camera interface with modular assembly animation, tabbed LCD content navigation, and interactive camera controls. The system extends `Camera3DScene.js` and `DSLRCamera3D.js` with new props and state management while preserving existing Three.js investments (lighting, particles, orbit controls, WebGL fallback). The camera serves as both a signature entrance experience and ongoing navigation metaphor: users watch modular pieces assemble into a mirrorless camera, then spin to reveal a rear LCD screen displaying tabbed content. Persistent camera state means the assembled camera remains across interactions, with only the spin animating on scroll. The shutter button triggers a screen flash Easter egg, and menu dial/D-Pad/OK provide accessible navigation.

## User Stories

1. As a photography enthusiast, I want the site to open with a camera assembly animation so that I immediately feel connected to the photographic theme.

2. As a returning visitor, I want the assembled camera to persist across my visit so that the experience feels complete rather than restarting each time.

3. As a first-time visitor, I want the camera to spin and reveal its LCD screen as I scroll so that the interaction feels dynamic and engaging without being repetitive.

4. As someone who wants to view photography, I want a dedicated gallery section accessible via the camera's LCD screen and a dedicated shutter button so that I can browse your macro and landscape work quickly.

5. As a potential employer, I want to see your projects section via the camera's LCD interface so that I can assess your software engineering skills in a memorable way.

6. As a career connector, I want to view your work experience timeline through the camera's LCD so that I can understand your professional background at a glance.

7. As a user who values accessibility, I want to navigate the camera LCD using a menu dial, D-Pad arrows, and OK button so that the site works with different input methods.

8. As a detail-oriented visitor, I want the shutter button to flash the screen as a fun Easter egg so that small delights reward exploration.

9. As a mobile user, I want the camera theme to gracefully degrade on devices without WebGL so that the site remains functional without a poor experience.

10. As the site maintainer, I want the camera assembly to trigger once per session and re-spin on scroll only so that performance is maintained without sacrificing the signature entrance effect.

## Implementation Decisions

- **Mirrorless camera model**: Build on existing `DSLRCamera3D.js` geometry but swap material colors and details to represent a modern mirrorless body instead of DSLR. Keep all procedural generation (no external assets needed).

- **Assembly animation**: Create a new `CameraAssembly` component that animates modular pieces flying from orbit positions to click together into the mirrorless camera form. Trigger on first visit only; state persists in session storage. Modular pieces use `BoxGeometry` with slight variations to look like lens elements, grip segments, and dial sections.

- **LCD tabbed content**: The LCD screen displays three tabs: Gallery, Projects, Experience. Use the existing `Html` overlay in `Camera3DScene` but add tab state management. Tab content pulls from existing page data: Gallery uses the `Gallery.js` slides, Projects pulls from `ProjectSection.js` data, Experience uses `CareerHistory.js` timeline. Tab selection state lives in a new `useCameraThemeHook` custom hook.

- **Menu dial + D-Pad navigation**: Build on existing button refs in `DSLRCamera3D.js` (menu, up/down/left/right, OK). Add visual feedback (highlighted border, selected state). Map D-Pad to tab cycling: Up/Down cycles through Gallery/Projects/Experience, Left/Right navigates within tabs. OK confirms selection. Dedicated Gallery button directly navigates to gallery tab (shortcut).

- **Shutter button flash**: Add onClick handler to shutter button mesh in `DSLRCamera3D.js` that triggers a full-screen white flash animation using the existing `motion`/Framer Motion transition. Purely aesthetic; no navigational purpose.

- **Scroll-triggered re-assembly/spin**: When user scrolls and camera is already assembled, restart the spin animation (rotate camera around Y axis slowly). Do NOT re-assemble. Use `useScroll` or window.onscroll debounced handler. The entry animation runs only on first visit (detected via sessionStorage 'cameraAssembled' flag).

- **Light background with subtle futuristic touches**: Keep the light palette but add very subtle accent colors (e.g., faint teal/blue highlights on camera edges, minimal neon glows on dials) that reference the "futuristic" aesthetic without overwhelming the photography content. CSS variables for easy theming.

- **WebGL fallback**: The existing `WebGLFallback` component in `Camera3DScene.js` already provides a CSS-based camera silhouette. Keep this as-is; no camera assembly animation in fallback, but LCD content displays via the CSS fallback.

- **Component seams**: 
  - `Camera3DScene` receives new props: `cameraState` (from hook), `onStateChange` 
  - `DSLRCamera3D` receives new prop: `lcdTab` (current tab: 'gallery'|'projects'|'experience')
  - New `useCameraThemeHook` manages: assembly state, tab selection, scroll behavior, session storage
  - `Main.js` integrates camera theme state with page navigation

- **No Three.js version bump**: All new code uses existing `@react-three/fiber`, `@react-three/drei`, and THREE APIs already in the codebase.

## Testing Decisions

- **Animation correctness**: Verify camera assembly sequence plays once on first visit, does not re-play on subsequent visits or scroll. Test via sessionStorage 'cameraAssembled' flag check.

- **Tab navigation**: Verify menu dial cycles Gallery ↔ Projects ↔ Experience in order, D-Pad Up/Down also cycles, OK confirms selection, dedicated Gallery button jumps to gallery tab regardless of current state. Test each navigation method.

- **LCD content display**: Verify each tab renders correct content: Gallery shows photo grid from `Gallery.js`, Projects shows project cards from `ProjectSection.js`, Experience shows career timeline from `CareerHistory.js`. Test content updates when tab changes.

- **Scroll behavior**: Verify that scrolling when camera is assembled restarts the spin animation but does NOT re-assemble the camera. Verify that after the entry animation completes, only spin animates on scroll.

- **Shutter flash Easter egg**: Verify shutter button click triggers full-screen white flash that auto-animates out. Test that it does not interfere with navigation.

- **Accessibility**: Verify D-Pad/OK navigation works with keyboard input (arrow keys, Enter). Verify focus states are visible. Test with screen reader friendly labels on button refs.

- **Performance**: Verify the assembly animation runs once and then only the spin animation (simple rotation) runs on scroll. Monitor frame rate with React Profiler. Ensure WebGL fallback remains light.

- **Mobile responsiveness**: Verify camera theme degrades gracefully on mobile without WebGL. The CSS fallback should display. Touch scrolling should work without interference from camera spin animation.

## Out of Scope

- Implementing a fully physics-based camera assembly (modular pieces use simple tweening, not rigid body dynamics)
- Creating original 3D camera model assets (all geometry remains procedural within `DSLRCamera3D.js`)
- Adding new photo content or gallery images (use existing assets)
- Implementing a back-end photo storage or API (gallery displays existing local images)
- Building a separate mobile app or responsive redesign beyond the camera theme
- Changing the overall color palette beyond subtle futuristic accents (light background remains primary)
- Implementing user authentication or session management beyond camera assembly state
- Adding social sharing features or embedded external content

## Further Notes

- The camera theme is the **primary navigation metaphor** for the entire site. All pathways (header links, slide controls, camera dials) should feel cohesive within this metaphor.
- Session storage for 'cameraAssembled' persists across page refreshes within the same browser session but resets on full browser close.
- The design intentionally balances the photography passion (gallery content, lens-inspired details) with the engineering resume (projects, experience, professional tone).
- Consider adding a subtle camera shutter sound effect for the shutter flash Easter egg (can be implemented with Howler.js if desired, out of scope for initial implementation).
- The LCD bevel color can use a CSS variable `--lcd-bevel-color` that defaults to `#121216` but can be themed for different moods (e.g., subtle teal for "nature" mode).
- Future iteration: prototype DSLR model replacement (tracked as separate ticket; initial implementation uses mirrorless).