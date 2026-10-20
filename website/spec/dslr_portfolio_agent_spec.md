# DSLR-Inspired Personal Portfolio Website

## 1. Overview

### Objective

Update the existing codebase's UI to resemble the rear side of a physical DSLR camera. The website is a personal software engineering portfolio. The camera is an interactive navigation interface: physical controls navigate between portfolio sections, and the rear LCD screen displays the selected page.

**Modify the existing application rather than rebuilding it from scratch.** Preserve existing portfolio content, functionality, routing, and project conventions unless a change is necessary to implement the design.

### Design concept

Imagine looking straight at a black DSLR from behind, with the lens pointing away from you. The top edge has a raised optical-viewfinder housing centered above a large rectangular LCD. A rubber eyecup surrounds the viewfinder opening. The screen sits in the middle of the body, bordered by small physical buttons. A directional pad or joystick and a ridged command dial cluster toward the right-hand side, where the photographer's thumb naturally rests. The far-right edge is thicker and more sculpted, with a rubberized grip and subtle contours. The left side is generally flatter and may carry a vertical row of menu and playback buttons. Fine seams, small white labels, rubberized textures, and dark reflective glass give the camera a dense, functional, precision-engineered appearance.

The rear is therefore a combination of a central viewing area, a top-center optical eyepiece, and thumb-operated controls concentrated on the right, all integrated into a rugged, asymmetrical body.

**Design choices**
- On page load, the viewer is presented with a short loading/animation that spells out S U N N Y.
- After the load, short video animation of a DLSR camera that spins around comes into view with its rear. This is currently implemented in main.js.
- The camera body is the persistent outer layout.
- The LCD is the main content viewport, views inside should display fully.
- When the portfolio page loads after the video, the LCD should brighten up as if turning on the camera.
- The LCD can be interacted with directly or by using the buttons.
- Physical buttons and dials are functional navigation controls that exists to the right of the LCD.
- Portfolio pages appear inside the LCD, not as unrelated content outside the camera.
- The visual result should feel like a polished, premium DSLR rather than a flat webpage with a camera illustration behind it.

### Portfolio views

Use existing content wherever possible. Do not invent professional experience, achievements, or project details.

- **Home / Profile:** name, professional title, short introduction, and welcome screen. Programming languages, frameworks, tools, and technical strengths.
- **Experience:** work history, responsibilities, and achievements.
- **Projects:** project gallery, descriptions, technologies, and links.
- **About:** background and professional interests.
- **Gallery:** collection of photos taken by a DLSR camera

### Design direction

The rear view of a DSLR (Digital Single-Lens Reflex) camera is dominated by a large LCD screen, an optical viewfinder near the top center, and an arrangement of physical buttons, dials, and navigation controls. The body is typically a sturdy, rectangular form with rounded corners, a textured grip on the right side, and a matte black or dark-gray finish. The exact arrangement varies by manufacturer and model, but most DSLR cameras share a similar overall layout.

1. Overall body shape and construction
The camera body is roughly rectangular when viewed from behind, with a slightly raised upper section that houses the viewfinder and internal optical components. The corners are generally rounded, and the body has a compact but substantial appearance.
- Main body: Usually matte black plastic, magnesium alloy, or a combination of both.
- Surface texture: Fine stippling or rubberized material covers the right-hand grip and selected areas where the left hand or thumb rests.
- Right-side grip: The front-facing handgrip often protrudes along the camera's right edge. From behind, it appears as a thicker, curved section with a textured thumb-rest area.
- Seams and joints: Thin gaps between body panels, battery or card-compartment edges, and rubber port covers may be visible along the sides.
- Strap attachments: The strap lugs are generally near the upper left and right sides, though they are more prominent from an angled rear view.

2. Optical viewfinder
The optical viewfinder is positioned near the top center of the camera's back. It is the small rectangular or slightly oval opening through which the photographer looks to compose an image.
- Eyepiece: A dark glass opening surrounded by a black rubber or soft-plastic eyecup.
- Eyecup shape: Often a rounded rectangle, with a thick, cushioned border that helps block stray light.
- Viewfinder housing: A raised section above the LCD screen, sometimes with angular contours or a slightly sloping top.
- Diopter adjustment: A small wheel or slider may sit immediately beside the eyepiece, allowing the photographer to adjust viewfinder focus for their eyesight.
- Viewfinder information: When looking through it, the photographer may see autofocus points, exposure information, a shutter-speed value, aperture, ISO, and a focus indicator.
The optical viewfinder is a defining feature of a DSLR. Unlike a mirrorless camera's electronic viewfinder, it uses a mirror and optical path to show the scene through the lens.

3. Rear LCD screen
The LCD screen occupies much of the central and left-central area of the rear panel. On many DSLRs, it is a large rectangular screen with a black bezel and a glossy or semi-gloss surface.
- Screen shape: Typically a wide rectangle with a 3:2 or 4:3-like physical display proportion, depending on the model.
- Bezel: A narrow black border surrounds the display, sometimes with a manufacturer's logo or model designation nearby.
- Display surface: When off, it looks dark and reflective. When on, it can show live view, captured photographs, menus, histograms, exposure settings, and playback information.
- Fixed versus articulated: Entry-level and professional DSLRs may have a fixed screen, while some models have a hinged screen that tilts or swivels outward.
- Protective glass: The screen may show subtle reflections, fingerprints, or a faint coating sheen under bright light.
The screen is usually positioned to leave room for controls on its right side. Depending on the model, buttons may also run along the left edge of the display.

4. Top-right corner and shutter-related controls
Near the upper-right edge of the rear panel, there may be a small status light, a command dial, and several buttons.
- Rear command dial: Frequently has fine ridges around its perimeter, allowing it to be turned with the thumb.
- Exposure-lock controls: Positioned near the upper-right corner on many models.
- Status or access light: A small LED may illuminate or blink when the camera writes images to a memory card.
- Card-access indicator: Often located near the card slot or rear display. It may blink while photos are being saved; the card should not be removed while writing is in progress.
The actual shutter-release button is on the top-right front edge, not the rear. From a straight-on rear view, it is usually hidden or only partly visible.

5. Upper central area and status display
Some DSLRs have a secondary monochrome status LCD on the top plate, rather than the back. In a straight rear view, it may not be visible. Others display most shooting information on the main rear screen.

When shooting information is shown on the rear display, common values include:
- Shutter speed, such as 1/250
- Aperture, such as f/5.6
- ISO sensitivity, such as ISO 400
- Exposure compensation, such as +1.0
- Remaining image count
- Battery level
- Memory-card status
- Autofocus mode and drive mode
- Image quality and file format
- White balance and metering mode
These indicators may appear as white text, colored symbols, or small icons over a dark background.

6. Hinges, ports, and side-panel details
Depending on the model, the rear view may reveal parts of the camera's side edges.
- Rubber port covers: Flexible black flaps can conceal USB, HDMI, microphone, headphone, or remote-control ports.
- Memory-card compartment: Usually on the right side of the body, often with a small door seam and a latch.
- Screen hinge: On articulated-screen models, a hinge is visible along one edge of the LCD. The screen may sit flush when closed or protrude slightly.
- Rubber seals: Weather-sealed cameras may have tightly fitted seams and protective covers designed to resist dust and moisture.
- Strap lugs: Small metal loops near the top corners may be visible from an angle.
These details are often subtle in a direct rear view, but they become more obvious when the camera is photographed from slightly above or from one side.

7. Buttons, markings, and tactile details
The buttons usually have a combination of physical and visual cues:
- Small white text labels printed on black surfaces.
- Simple symbols for playback, deletion, magnification, and navigation.
- Slightly domed or concave button faces.
- Distinct click feedback when pressed.
- Textured or ridged dials for grip.
- Molded plastic edges and fine panel seams.
- Occasional red, blue, or white accents around video, playback, or custom-function buttons.

## 2. Technical Stack

### First step: inspect the repository

Before coding, inspect the existing project to determine:

- Framework and language.
- Package manager and available scripts.
- Current entry points, routing, and component structure.
- Styling approach and design tokens.
- Existing UI libraries, icons, and animation dependencies.
- Existing portfolio content and external links.
- Current tests, linting, type-checking, and build process.

### Stack requirements

- **Framework:** Keep the framework already used by the project.
- **Language:** Keep the project's current language and conventions, such as TypeScript or JavaScript.
- **Styling:** Design new CSS, classes, or new components to improve the visual experience. 
- **Animation:** Prefer Framer Motion or an other animation library. Add a dependency only if it materially improves the result.
- **Icons and assets:** Reuse existing assets or libraries where practical, but you will have to design new ones. Use CSS, SVG, or find image assets to construct camera details.
- **Navigation:** Use the existing router if one is already present. Otherwise, implement a simple, consistent client-side view-state model appropriate to the project.
- **State:** Keep the selected section, menu state, selected project, and relevant display mode synchronized across controls.

### Constraints

- Avoid unnecessary dependencies.
- Do not replace existing portfolio content with fabricated placeholder claims.
- Keep implementation maintainable and consistent with the repository.
- Initial flow must be Loader -> Animation Video -> DLSR portfolio. Loader and animation video is currently implemented in main.js.

## 3. Requirements

### 3.1 Camera shell

Implement the camera as a persistent, reusable layout component.

It should include, where appropriate:

- Camera body and silhouette.
- Viewfinder above the LCD.
- Large LCD screen.
- Physical controls arranged to the right of the screen.
- Directional pad with 'OK' in the middle.
- Top command dial and other recognizable camera controls. These do not have to be interactable.
- Small labels and icons.
- Subtle material texture, borders, highlights, and shadows.

The camera body should remain visible while the LCD's content changes.

### 3.2 LCD screen

Implement the LCD as a separate, reusable content container.

- All portfolio views must render inside the LCD.
- Maintain a consistent screen aspect ratio, padding, and visual treatment.
- Keep text legible at supported viewport sizes.
- Prevent content from overflowing or being clipped unintentionally.
- Allow long sections to scroll within the LCD when necessary.
- Keep common screen elements consistent across sections.
- Optional camera-style status indicators must not compete with the portfolio content.

### 3.3 Physical controls and navigation

All controls included in the design must perform a meaningful action.

Suggested mapping:

| Control | Expected behavior |
|---|---|
| MENU | Open or close a camera-style menu listing portfolio sections. |
| INFO / DISP | Toggle additional information (Explain design concept) or an alternate LCD display layout. |
| Playback | Open the Projects gallery in a camera-style playback view. |
| Directional pad | Move through menu options or project selections. |
| OK / SET | Confirm the selected menu item or open a selected project. |
| BACK | Return to the previous view, menu, or project gallery when appropriate. |

Adapt the mapping to the final design and available space. Not every physical camera button needs to be included. 

### 3.4 Interaction behavior

- Clicking a physical control updates the LCD without a full-page reload unless the existing routing design requires navigation.
- The active section is visually identifiable.
- MENU provides access to every major portfolio section.
- BACK returns to the appropriate previous view.
- Project selection opens a detail view with a clear way to return to the gallery.
- Navigation state remains synchronized across the menu, buttons, keyboard, and any router.
- Transitions are subtle and do not delay navigation.
- Buttons have hover, focus, pressed, and selected states where relevant.
- External links, email links, GitHub, and LinkedIn remain functional.
- Browser back/forward behavior should work correctly if URL routing is used.

### 3.5 Portfolio content

- Reuse existing text, project details, technologies, and links.
- Present projects as a gallery inspired by camera playback.
- Use project thumbnails or existing imagery when available.
- Display project details clearly, including name, description, tech stack, and relevant links.
- Present Experience and Skills in readable layouts adapted to the LCD.
- Keep About and Contact straightforward and accessible.
- Do not fabricate experience, metrics, qualifications, or project links.

### 3.6 Responsive design

**Desktop**
- Show the complete camera silhouette and physical controls.
- Keep the LCD as the main focal point.
- Preserve a balanced composition and readable content.
- Camera should scale correctly according to window size without disrupting layout.

**Mobile and narrow viewports**
- Scale the camera appropriately or simplify nonessential physical details.
- Keep every navigation action accessible.
- Ensure controls have comfortable touch targets.
- Prevent horizontal page overflow.
- Keep LCD content readable without requiring awkward zooming.
- If the complete camera layout cannot fit, prioritize the screen and essential controls while preserving the camera concept.

### 3.7 Accessibility

- Use semantic buttons for interactive controls.
- Provide accessible names for icon-only controls.
- Ensure text and control contrast are sufficient.
- Do not communicate the selected section by color alone.
- Respect reduced-motion preferences.
- Ensure external links have meaningful labels and appropriate behavior.
- Keep focus behavior sensible when menus or project detail views open and close.

## 4. Validation Rules

The implementation is acceptable only when the following rules are satisfied.

### Architecture and scope

- Initial SUNNY loader, then animation video, lastly the DLSR portfolio page.
- The existing framework and project conventions are preserved.
- The camera shell, LCD, and controls have clear component responsibilities.
- No unrelated application behavior is broken.
- Dependencies are added only when justified.
- No unnecessary full application rewrite is performed.

### Visual rules

- The camera is recognizable as a DSLR rear view, not just a HTML container.
- The camera body remains stable during page navigation.
- Portfolio content is rendered inside the LCD.
- Camera details do not overwhelm the content.
- Typography, spacing, and screen treatment are consistent across pages.
- The layout adapts to desktop and mobile viewports.
- No unintended clipping, overlap, or horizontal overflow occurs.
- Physical buttons are to the right of the LCD.
- Physical buttons do not overlap with one another.
- Text around the LCD display as one would expect on a DSLR camera.

### Functional rules

- Every displayed interactive control has a working action.
- Every required portfolio section is reachable.
- MENU opens and closes predictably.
- BACK returns to the expected previous state.
- Directional controls and OK / SET work in their current context.
- Project gallery and project detail navigation work in both directions.
- External links point to existing, correct destinations.
- Navigation does not create inconsistent or stale UI state.
- No full-page reload occurs for internal view changes unless required by the existing routing architecture.

### Content rules

- Existing portfolio information is retained.
- No unsupported achievements or professional claims are introduced.
- Missing content is handled gracefully instead of being fabricated.
- Long content remains readable and accessible.

### Quality rules

- No console errors or uncaught runtime exceptions.
- No new lint, type-check, or build failures.
- No broken assets or invalid links introduced by the change.
- No inaccessible controls or keyboard traps.
- No animation that prevents or significantly delays interaction.

## 5. Tests to Perform

Run the checks supported by the repository. Do not claim a test passed unless it was actually run.

### 5.1 Repository baseline

Before changes:

- Inspect package scripts and existing tests.
- Run the existing build, lint, type-check, and test commands when practical.
- Record any pre-existing failures so they are not incorrectly attributed to this change.

### 5.2 Functional navigation tests

Verify with automated tests:

- [ ] The home/profile view is displayed on initial load.
- [ ] MENU opens and closes the section menu.
- [ ] Every portfolio section can be opened from the menu.
- [ ] INFO / DISP shows design concept or changes the intended display mode.
- [ ] Playback opens the Projects gallery.
- [ ] Directional controls move the active selection correctly.
- [ ] OK / SET opens the selected item or selects the menu item.
- [ ] BACK returns to the expected previous view.
- [ ] Selecting a project opens its details.
- [ ] Returning from project details restores a usable gallery state.
- [ ] Repeated navigation does not break or desynchronize the UI.
- [ ] External links and email links work as intended.
- [ ] Browser back and forward work if URL routing is implemented.

### 5.3 Accessibility tests

- [ ] Focus indicators are visible.
- [ ] Directional keyboard behavior is consistent if implemented.
- [ ] Icon-only controls have accessible names.
- [ ] Focus is managed sensibly when menus and detail views change.
- [ ] Reduced-motion preferences are respected.
- [ ] Text and controls remain legible with adequate contrast.

### 5.4 Responsive tests

Check at minimum:

- [ ] Large desktop viewport.
- [ ] Typical laptop viewport.
- [ ] Tablet or narrow landscape viewport.
- [ ] Mobile viewport.
- [ ] Narrow viewport with long project descriptions.
- [ ] LCD content with enough items to require scrolling.

At each size, confirm:

- No unintended horizontal overflow.
- The camera body and LCD remain visually coherent.
- All essential controls are reachable.
- Touch targets are usable on mobile.
- Text is not clipped or too small to read.

### 5.5 Visual regression checks

Compare the rendered result against the intended design:

- [ ] The initial flow of the website is kept. SUNNY loader -> animation video -> DLSR portfolio
- [ ] Ensure the three initial steps are not rendered at the same time.
- [ ] Camera silhouette and material treatment look intentional.
- [ ] LCD is visually distinct from the camera body.
- [ ] When DLSR portfolio is displayed, the LCD lights up as if turning on the camera.
- [ ] The animation video and loader is removed from page after portfolio is rendered.
- [ ] Buttons are positioned to the right of the LCD and look interactive.
- [ ] Active menu items and selected projects are easy to identify.
- [ ] Section layouts share consistent spacing and typography.
- [ ] Transitions are subtle and do not cause layout shifts.
- [ ] Long content does not overlap camera controls or status indicators.
- [ ] LCD, buttons, view finder, and other DLSR components to no overlap.
- [ ] Active views in LCD is fully displayed, with no scrolling.
- [ ] DLSR design is visible and in the correct location: text around LCD screen. View finder on top with a white glossy center, grips.

### 5.6 Build and quality checks

After implementation:

- [ ] Run the project's build command.
- [ ] Run linting if configured.
- [ ] Run type-checking if configured.
- [ ] Run unit and integration tests if configured.
- [ ] Run relevant end-to-end tests if the project supports them.
- [ ] Check the browser console for new errors.
- [ ] Check for broken images, links, and missing assets.
- [ ] Review the final diff for unrelated changes.

If a test cannot be run because the environment or repository lacks the required setup, report it explicitly rather than claiming success.

## 6. Project Structure

First inspect the actual repository. Adapt this suggested structure to the project's existing framework and conventions; do not force this exact layout if the codebase uses a different architecture.

A possible component organization is:

```text
src/
├── components/
│   └── camera/
│       ├── CameraShell
│       ├── CameraLCD
│       ├── CameraButton
│       ├── CameraMenu
│       ├── CameraControls
│       └── CameraStatusBar
├── pages/ or views/
│   ├── GallaryView
│   ├── ExperienceView
│   ├── ProjectsView
│   ├── AboutView
├── data/
│   └── portfolio
├── hooks/                 # Only if custom hooks fit the existing stack
│   └── cameraNavigation
├── styles/                # Follow the existing styling convention
│   └── camera
├── assets/
│   └── camera             # Optional textures, icons, or imagery
├── App
└── main                   # Actual entry point depends on the framework
```

File extensions such as `.tsx`, `.ts`, `.jsx`, and `.js` should follow the repository's existing conventions. This is a conceptual structure, not a requirement to create every listed file.

### Component responsibilities

- **CameraShell:** Persistent camera body and overall composition.
- **CameraLCD:** Screen frame, content viewport, and consistent screen-level styling.
- **CameraButton:** Reusable physical button with accessible label and interaction states.
- **CameraMenu:** Section menu and active-selection indicator.
- **CameraControls:** Coordinates the directional pad, wheel, MENU, BACK, INFO, playback, and OK / SET actions.
- **CameraStatusBar:** Optional camera-inspired status information.
- **Portfolio views:** Render the existing content for each section.
- **Portfolio data:** Keeps structured content separate from layout where practical.
- **Navigation hook or state module:** Manages active view, menu state, selected project, and display mode when appropriate.

Avoid splitting simple components into separate files without a clear benefit. Keep the implementation proportionate to the existing project's size.

## 7. Implementation Workflow

1. Inspect the repository, current UI, content, and available scripts.
2. Summarize the relevant existing architecture and identify the files that need to change.
3. Establish the camera layout and LCD viewport.
4. Implement reusable, accessible physical controls.
5. Connect all controls to a consistent navigation model.
6. Adapt existing portfolio content to the LCD views.
7. Implement responsive layouts and reduced-motion behavior.
8. Run functional, accessibility, responsive, and build checks.
9. Fix regressions introduced by the changes.
10. Review the final diff and report what was changed.

## 8. Final Report

When finished, provide:

- A concise summary of the implemented design.
- The files created or modified and each file's responsibility.
- The control-to-navigation mapping.
- Tests and checks actually run, with pass/fail results.
- Known limitations, skipped tests, and any remaining issues.

**Definition of done:** The existing portfolio runs as an interactive, responsive DSLR-inspired interface. The camera shell remains persistent, its physical controls navigate the portfolio, the LCD displays the selected content, and the changes pass the applicable validation checks.
