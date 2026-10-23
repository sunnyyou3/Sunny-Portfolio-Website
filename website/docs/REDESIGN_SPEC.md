# Portfolio Website Redesign — Specification

## Problem Statement

The current portfolio website is a slide-based presentation wrapped in a 6-second intro video, using MUI components and keyboard-driven navigation. It doesn't reflect the user's identity as a photographer, lacks visual impact, and feels like a generic template. The user wants to completely redesign the experience to showcase their skills, projects, work experience, and photography work through a cinematic, scroll-driven interaction centered around a DSLR camera theme.

## Solution

A complete redesign of the portfolio into a single-page, scroll-driven cinematic experience. The user lands on a white hero section with their photo and bio, then scrolls through an animated sequence where a realistic 3D DSLR camera assembles itself from scattered parts. Once assembled, the camera rotates to reveal its LCD screen, which expands to fill the entire viewport and becomes the portfolio interface — styled as an authentic Canon-style DSLR menu. Users navigate between sections (Projects, Gallery, About, Career) through the menu, with a reversible scroll experience that plays forward and backward.

## User Stories

1. As a visitor, I want to see a brief loader animation with my name, so that I know the site is loading and I recognize the brand immediately.
2. As a visitor, I want to land on a clean white hero section with my photo and a short bio, so that I get a strong first impression of who I am.
3. As a visitor, I want the hero section to fade away as I scroll, so that the transition into the 3D camera sequence feels natural and continuous.
4. As a visitor, I want to see a 3D DSLR camera with its parts scattered in space, so that I understand the camera theme is about to unfold.
5. As I scroll, I want the camera parts to assemble themselves in a choreographed sequence, so that I feel like I'm building the camera through my interaction.
6. As a visitor, I want the camera to look realistic with proper materials, reflections, and lighting, so that the experience feels premium and polished.
7. As I continue scrolling, I want the fully assembled camera to rotate and show its rear LCD screen, so that the narrative flows toward the portfolio reveal.
8. As I scroll past the camera, I want the LCD screen to expand and fill the entire viewport, so that there is a dramatic "wow" moment when the camera becomes my screen.
9. As a visitor, I want the portfolio interface to look like a real Canon DSLR menu, so that the theme feels authentic and cohesive.
10. As a visitor, I want to see a 2×2 grid menu with four sections (Projects, Gallery, About, Career), so that I can easily choose what to view first.
11. As a visitor, I want each section to have a distinct visual treatment, so that navigating between sections feels like exploring different modes of the camera.
12. As a visitor viewing Projects, I want to see a grid of project cards with thumbnails, titles, and years, so that I can quickly scan my work.
13. As a visitor viewing Gallery, I want to see full-screen photographs with minimal UI, so that my photography is the focus.
14. As a visitor viewing About, I want to see my skills displayed as a visual grid with icons, so that my technical abilities are communicated clearly.
15. As a visitor viewing Career, I want to see a timeline of my work experience, so that my professional history is easy to follow.
16. As a visitor, I want a back button in each section that returns me to the menu, so that I can navigate freely without getting lost.
17. As a visitor, I want to scroll up to reverse the entire experience, so that I can explore the site non-linearly and revisit the camera animation.
18. As a visitor, I want the site to load quickly despite the 3D elements, so that the experience is smooth and doesn't frustrate me.
19. As the site owner, I want to be able to easily add new projects without modifying code, so that I can keep my portfolio current.
20. As the site owner, I want to be able to add new photos to my gallery without modifying code, so that I can showcase my growing work.
21. As a visitor, I want the site to look great on desktop, so that the cinematic experience is fully realized.
22. As a visitor, I want the typography to feel intentional — bold and editorial for the hero, technical and monospace for the LCD menu, so that each section has a distinct personality.
23. As a visitor, I want the color palette to shift from pure white in the hero to dark with orange accents in the portfolio, so that the transition signals a shift from introduction to content.
24. As a visitor, I want the site to feel like a cohesive story from start to finish, so that I'm engaged throughout the entire experience.

## Implementation Decisions

### Technology Stack
- **Framework**: React 18 (existing, preserved)
- **3D Rendering**: React Three Fiber (R3F) + Drei for glTF model loading, environment maps, and helpers
- **Animation**: Framer Motion for UI transitions, scroll-linked animations, and component-level motion
- **Styling**: Tailwind CSS (complete replacement of MUI)
- **Build**: React Scripts 5 (existing, preserved)
- **Deployment**: GitHub Pages via gh-pages (existing, preserved)

### 3D Camera
- A realistic DSLR glTF/GLB model will be sourced from Sketchfab (free, downloadable, with separable parts)
- The model will be placed at `src/assets/models/camera.glb`
- The camera will be loaded using Drei's `useGLTF` hook
- Lighting will combine studio softbox (two DirectionalLights from front-left and front-right) with an HDR environment map for realistic reflections on silver parts
- The camera body will be black with silver accents (inherited from the downloaded model)
- Scroll position will drive both assembly progress and camera rotation

### Scroll Architecture
The entire experience is a single long scroll (500vh total), divided into zones:

| Zone | Scroll Range | Content |
|------|-------------|---------|
| Hero | 0–100vh | White background, photo, name, bio |
| Camera Appears | 100–150vh | Hero fades, camera parts materialize scattered |
| Assembly | 150–300vh | Scroll-driven choreographed assembly of 15–20 parts |
| Rotation | 300–400vh | Scroll-driven camera rotation to show LCD |
| LCD Expansion | 400–500vh | LCD expands to fill viewport, camera body fades |
| Portfolio | 500vh+ | Menu screen → section views with snap scrolling |

### Camera Assembly
- **Choreographed** (not physics-based): each part has a defined start position and target position
- Parts fly in on staggered timelines, driven by scroll progress
- Subtle easing curves and slight rotation as each part snaps into place
- 15–20 parts: body, lens, sensor, dials, buttons, grip, viewfinder, flash unit, strap loops, and other details

### Portfolio Interface
- **Menu**: 2×2 grid with Canon-style DSLR menu aesthetic (orange selection highlight, icon + text, black background)
- **Sections**: Each section is a full-viewport "page" with snap scrolling
- **Navigation**: Click a section from the menu → view it. Back button returns to menu.
- **Data-driven**: Projects and gallery photos stored as data arrays for easy addition

### Typography
- Hero: Bold sans-serif (editorial, magazine-cover feel) — exact font to be decided by UI/UX skill
- LCD Menu: Monospace (technical, authentic DSLR display feel) — exact font to be decided by UI/UX skill

### Color Palette
- Hero: Pure white (#ffffff)
- LCD/Portfolio: Dark (#08090b or similar)
- Accent: Orange (Canon-style, for selection highlights)
- Text: White on dark, dark on white

### Platform
- Desktop only for V1
- Mobile: graceful fallback or simplified experience (deferred)

### Content Structure
- **Projects**: Card grid — thumbnail, title, year, short description
- **Gallery**: Full-screen photo viewer with photo count overlay
- **About**: Skills grid (icon + label) + short bio text
- **Career**: Timeline of work experience with dates and descriptions

### Data Layer
- Projects stored as a JSON/array structure in a dedicated data file
- Gallery photos loaded from existing asset directory (`src/assets/Portfolio/Images/Gallery/`)
- New projects can be added by adding entries to the data array
- New photos can be added by placing files in the gallery asset directory

### What Gets Replaced
- MUI → Tailwind CSS
- Intro video → scroll-driven 3D experience
- Keyboard arrow navigation → scroll-driven navigation
- Slide-based navigation → menu + section navigation
- Lightroom component → absorbed into Gallery section

### What Gets Preserved
- Loader animation ("SUNNY" letters flying to center)
- All existing content (projects, photos, career info, about text)
- Deployment pipeline (GitHub Pages)
- React 18 + React Scripts build system

## Testing Decisions

### What Makes a Good Test
- Tests should verify external behavior: does the loader play? Does the menu render? Does navigation work?
- 3D scene tests should verify that the model loads and basic interactions trigger correctly
- Scroll-driven animations should be tested visually / by hand, not unit-tested (they are visual effects)
- Data layer tests should verify that adding a new project or photo follows the correct structure

### Modules to Test
1. **Loader** — renders correctly, animation plays, completes and transitions
2. **Portfolio Menu** — renders 2×2 grid, selection highlight works, navigation triggers section views
3. **Section Views** — each section renders with correct data, back button returns to menu
4. **Data Layer** — project and photo data structures are valid, new entries can be added
5. **Camera Model Loading** — model loads from glTF, parts are accessible for animation
6. **Scroll Zones** — each zone triggers at the correct scroll position (visual testing)

### Testing Approach
- Unit tests for data layer and menu navigation (existing Jest + Testing Library setup)
- Visual/manual testing for 3D animations, scroll transitions, and camera assembly
- No end-to-end tests for V1 (the experience is too visual and scroll-dependent)

## Out of Scope

- Mobile support (deferred to V2)
- Backend or CMS integration (content is static data)
- User authentication or comments
- Social media integration or sharing
- WebGL fallback for browsers that don't support it (desktop-only target)
- Sound design or audio effects
- Multi-language support
- SEO optimization (portfolio site, not a public product)
- Analytics integration
- The Lightroom component as a separate feature (absorbed into Gallery)

## Further Notes

### Seam Analysis
The redesign touches the codebase at these seams:

1. **App Entry Point** (`src/App.js` / `src/index.js`) — the main page component is replaced entirely. This is the primary seam.
2. **Data Layer** (new) — a new data file for projects and gallery photos. This is isolated and doesn't touch existing logic.
3. **Asset Pipeline** — existing assets (photos, project screenshots) are reused. The 3D model is a new asset.
4. **Animation System** — Framer Motion is already in use, so the animation library seam is already open.

The ideal number of seams is **one**: the main page component. Everything else (data, assets, animation library) is either already in place or is a new isolated addition.

### Risks
- **3D model quality**: The success of the camera assembly depends on finding a good glTF model with enough separable parts. If Sketchfab doesn't have a suitable free model, GrabCAD is the fallback.
- **Performance**: A detailed 3D model with studio lighting and environment maps can be GPU-heavy. Draco compression and texture optimization will be needed.
- **Scroll performance**: 500vh of scroll-driven 3D animation needs careful optimization to avoid jank. `react-use-gesture` or `@react-three/drei`'s `ScrollControls` may help.
- **Model loading time**: The glTF model needs to load before the experience begins. A loading screen or progressive reveal will be needed.

### Future Considerations (V2)
- Mobile support with simplified camera (fewer parts, lower poly)
- Animated transitions between portfolio sections
- Project detail pages (drill-down from project cards)
- Contact form or social links
- Dark mode hero (toggle between white and dark hero)
- Smooth scroll library for more control over scroll behavior
