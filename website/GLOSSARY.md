# GLOSSARY.md - Sunny Portfolio Redesign Domain Model

## Overview
This glossary defines the domain terminology for the redesigned Sunny Portfolio website, a camera-themed portfolio that bridges photography passion with software engineering experience.

---

## Core Concepts

### `portfolio`
The personal website of Sunny You, software engineer and photographer. Combines resume-style professional presentation with a gallery of artistic photography.

### `camera-theme`
The overarching visual and interaction theme of the redesigned portfolio. The site uses a camera assembly/spinning interaction as its signature entrance and navigation metaphor. All content (gallery, projects, experience) is accessed through a conceptual LCD screen on a 3D camera model.

### `mirrorless-camera`
The specific camera model type used in the site's core interaction. A modern mirrorless camera represents the current baseline design (with prototype DSLR planned as a future expansion). Chosen for its sleek, contemporary aesthetic that bridges photography and engineering themes.

### `assembly-animation`
The primary entrance animation where camera modular pieces fly toward the site center and click together to form a complete camera. Uses puzzle-piece-like modular pieces that animate in sequence. Triggered on user scroll (once per session typically).

### `spin-reveal-interaction`
The ongoing interaction where the assembled camera slowly spins on its axis, revealing its rear LCD screen. The LCD displays tabbed content cycling between Gallery, Projects, and Work Experience. Continues as user scrolls but the assembled state persists.

### `lcd-screen`
The rear display of the conceptual camera. Shows tabbed interface organizing three primary content categories:
- `gallery-tab`: Curated selection of photographer's macro, landscape, and nature images
- `projects-tab`: Software engineering projects with descriptions, tech stacks, and links
- `experience-tab`: Work experience timeline with roles, responsibilities, and durations

### `tabbed-navigation`
The navigation pattern for the LCD screen. Users switch between Gallery, Projects, and Experience via:
- Menu dial interaction
- D-Pad cycling through selectable options
- OK button to confirm choice
- Dedicated Gallery button for direct gallery access

---

## Interaction Terms

### `menu-dial`
Primary navigation control for the LCD screen. When activated, shows selectable options (Gallery, Projects, Experience). Users cycle through options using D-Pad input and confirm with OK button.

### `d-pad-cycling`
Directional input method for navigating menu options. Moves selection highlight up/down/left/right through available tabs. Used in conjunction with menu dial.

### `ok-button`
Confirmation input that selects the currently highlighted option in menu dial/D-Pad navigation. Confirms tab choice or other user decisions.

### `gallery-button`
Dedicated shortcut button that immediately navigates to the photography gallery, bypassing the menu dial navigation. Provides quick access to photographic work.

### `shutter-flash-easter-egg`
Secondary interaction triggered by the camera's shutter button. Flashes the entire screen white (or selected color) as a fun, non-functional delight. Purely aesthetic with no navigational purpose.

### `scroll-trigger`
The user scroll event that triggers the camera assembly animation (if not yet assembled) and causes the camera to re-spin to keep content fresh. The assembled camera state persists across scrolls; only the spin animation resets.

### `persistent-state`
Design principle that the camera, once assembled, remains in its assembled form. The spin animation may restart on scroll, but the camera does not disassemble and re-assemble unless explicitly triggered by session reset or refresh.

---

## Content Categories

### `gallery-section`
Curated collection of the photographer's work, specifically featuring:
- Macro photography (close-up details, textures, patterns)
- Landscape photography (natural scenes, vistas, outdoors)
- Nature photography (fauna, flora, environmental shots)

Images may be displayed in a grid, carousel, or lightbox format depending on implementation.

### `projects-section`
Software engineering projects showcasing:
- Project names and descriptions
- Technologies and frameworks used
- Links to repositories or live demos
- Status (in progress, completed, archived)

### `experience-section`
Professional work experience presented as a timeline, including:
- Company/organization names
- Job titles and roles
- Employment durations
- Key responsibilities and achievements

---

## Design Decisions

### `light-futuristic-palette`
The chosen color scheme for the redesigned portfolio. Features a light background (white/off-white) with subtle futuristic touches (subtle neon accents, geometric patterns, minimal tech-inspired elements). Balances the photography theme (photos look natural on light backgrounds) with the desired futuristic aesthetic.

### `modular-assembly-approach`
The chosen method for the camera assembly animation. Modular pieces click together like a puzzle, providing a satisfying, understandable animation that teaches the user the camera form without requiring Three.js expertise. Falls back to Framer Motion for simpler component animations if WebGL/Three.js proves too complex.

### `camera-as-navigation-metaphor`
The fundamental design concept that the camera interface serves as the primary navigation metaphor for the entire site. Just as a camera captures and frames moments, the site "frames" the user's professional and artistic content. All pathways lead back to the camera interface.

### `single-session-assembly`
The principle that the camera assembly animation typically runs once per visit/session. After the initial assembly and spin, the camera state persists. This prevents performance issues from repeated assembly animations while still allowing the signature entrance experience.

### `future-dslr-expansion`
Planned future iteration of the camera theme, replacing the mirrorless model with a prototype DSLR. Will involve different geometry, materials, and potentially different interaction patterns. Tracked as a roadmap item but not implemented in the initial version.

---

## Key Terms at a Glance

| Term | Definition |
|------|--------|
| `portfolio` | Sunny's personal website combining engineering resume + photography gallery |
| `camera-theme` | Camera-assembly/spinning interaction as signature UI |
| `mirrorless-camera` | Current camera type (DSLR planned later) |
| `assembly-animation` | Modular pieces clicking together to form camera |
| `spin-reveal-interaction` | Camera spins to reveal LCD rear screen |
| `lcd-screen` | Tabbed display showing Gallery/Projects/Experience |
| `tabbed-navigation` | Menu dial + D-Pad + OK + Gallery button navigation |
| `shutter-flash-easter-egg` | Screen flash when shutter button pressed |
| `scroll-trigger` | Scroll event triggers spin, preserves assembled state |
| `persistent-state` | Camera stays assembled after initial animation |
| `light-futuristic-palette` | Light background with subtle futuristic touches |
| `modular-assembly-approach` | Puzzle-piece camera assembly animation |
| `camera-as-navigation-metaphor` | Camera interface as primary navigation metaphor |
| `single-session-assembly` | Assembly runs once per visit |
| `future-dslr-expansion` | Planned DSLR model iteration |

---

## Related Artifacts

- `docs/adr/` - Contains Architectural Decision Records for significant implementation choices
- `src/components/` - React components implementing the camera theme interactions
- `src/images/` - Photographer's macro, landscape, and nature images
- `package.json` - Dependencies include `framer-motion` (primary), `three.js` (optional/fallback)

---

*This glossary was created during the portfolio redesign domain modeling session. Terms may be updated as the design evolves or as new concepts emerge during implementation.*