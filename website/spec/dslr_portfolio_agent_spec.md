DSLR-Inspired Personal Portfolio Website
1. Overview
Objective
Update the existing codebase's UI to resemble the rear side of a physical DSLR camera. The website is a personal software engineering portfolio. The camera is an interactive navigation interface: physical controls navigate between portfolio sections, and the rear LCD screen displays the selected page.
Modify the existing application rather than rebuilding it from scratch. Preserve existing portfolio content, functionality, routing, and project conventions unless a change is necessary to implement the design.
Design concept
The camera body is the persistent outer layout.
The LCD is the main content viewport.
Physical buttons and dials are functional navigation controls.
Portfolio pages appear inside the LCD, not as unrelated content outside the camera.
The visual result should feel like a polished, premium DSLR rather than a flat webpage with a camera illustration behind it.
Portfolio views
Use existing content wherever possible. Do not invent professional experience, achievements, or project details.
Home / Profile: name, professional title, short introduction, and welcome screen.
Experience: work history, responsibilities, and achievements.
Projects: project gallery, descriptions, technologies, and links.
Skills: programming languages, frameworks, tools, and technical strengths.
About: background and professional interests.
Contact: email, LinkedIn, GitHub, and other existing contact links.
Design direction
Matte black or dark graphite camera body.
Convincing silhouette, textured grip, viewfinder, top controls, and rear buttons.
Large, readable LCD with subtle reflections, screen borders, and camera-style status indicators where appropriate.
Restrained highlights, shadows, and material details.
Clear typography and consistent spacing.
Subtle transitions and button-press feedback.
Avoid clutter, excessive decoration, or a toy-like appearance.
2. Technical Stack
First step: inspect the repository
Before coding, inspect the existing project to determine:
Framework and language.
Package manager and available scripts.
Current entry points, routing, and component structure.
Styling approach and design tokens.
Existing UI libraries, icons, and animation dependencies.
Existing portfolio content and external links.
Current tests, linting, type-checking, and build process.
Stack requirements
Framework: Keep the framework already used by the project.
Language: Keep the project's current language and conventions, such as TypeScript or JavaScript.
Styling: Prefer the existing CSS, CSS modules, utility classes, or component-library conventions.
Animation: Prefer CSS transitions or an already-installed animation library. Add a dependency only if it materially improves the result.
Icons and assets: Reuse existing assets or libraries where practical. Use CSS, SVG, or existing image assets to construct camera details.
Navigation: Use the existing router if one is already present. Otherwise, implement a simple, consistent client-side view-state model appropriate to the project.
State: Keep the selected section, menu state, selected project, and relevant display mode synchronized across controls.
Constraints
Do not introduce a new framework.
Avoid unnecessary dependencies.
Avoid unrelated refactors or architectural changes.
Do not replace existing portfolio content with fabricated placeholder claims.
Keep implementation maintainable and consistent with the repository.
3. Requirements
3.1 Camera shell
Implement the camera as a persistent, reusable layout component.
It should include, where appropriate:
Camera body and silhouette.
Viewfinder above the LCD.
Large LCD screen.
Physical controls arranged around the screen.
Directional pad or control wheel.
Top command dial and other recognizable camera controls.
Small labels and icons.
Subtle material texture, borders, highlights, and shadows.
The camera body should remain visible while the LCD's content changes.
3.2 LCD screen
Implement the LCD as a separate, reusable content container.
All portfolio views must render inside the LCD.
Maintain a consistent screen aspect ratio, padding, and visual treatment.
Keep text legible at supported viewport sizes.
Prevent content from overflowing or being clipped unintentionally.
Allow long sections to scroll within the LCD when necessary.
Keep common screen elements consistent across sections.
Optional camera-style status indicators must not compete with the portfolio content.
3.3 Physical controls and navigation
All controls included in the design must perform a meaningful action.
Suggested mapping:
Control	Expected behavior
MENU	Open or close a camera-style menu listing portfolio sections.
INFO / DISP	Toggle additional information or an alternate LCD display layout.
Playback	Open the Projects gallery in a camera-style playback view.
Directional pad / control wheel	Move through menu options or project selections.
OK / SET	Confirm the selected menu item or open a selected project.
Left / Right	Move between sections or cycle through projects, depending on context.
BACK	Return to the previous view, menu, or project gallery when appropriate.
Adapt the mapping to the final design and available space. Not every physical camera button needs to be included. Do not add inert decorative buttons.
3.4 Interaction behavior
Clicking a physical control updates the LCD without a full-page reload unless the existing routing design requires navigation.
The active section is visually identifiable.
MENU provides access to every major portfolio section.
BACK returns to the appropriate previous view.
Project selection opens a detail view with a clear way to return to the gallery.
Navigation state remains synchronized across the menu, buttons, keyboard, and any router.
Transitions are subtle and do not delay navigation.
Buttons have hover, focus, pressed, and selected states where relevant.
External links, email links, GitHub, and LinkedIn remain functional.
Browser back/forward behavior should work correctly if URL routing is used.
3.5 Portfolio content
Reuse existing text, project details, technologies, and links.
Present projects as a gallery inspired by camera playback.
Use project thumbnails or existing imagery when available.
Display project details clearly, including name, description, tech stack, and relevant links.
Present Experience and Skills in readable layouts adapted to the LCD.
Keep About and Contact straightforward and accessible.
Do not fabricate experience, metrics, qualifications, or project links.
3.6 Responsive design
Desktop
Show the complete camera silhouette and physical controls.
Keep the LCD as the main focal point.
Preserve a balanced composition and readable content.
Mobile and narrow viewports
Scale the camera appropriately or simplify nonessential physical details.
Keep every navigation action accessible.
Ensure controls have comfortable touch targets.
Prevent horizontal page overflow.
Keep LCD content readable without requiring awkward zooming.
If the complete camera layout cannot fit, prioritize the screen and essential controls while preserving the camera concept.
3.7 Accessibility
Use semantic buttons for interactive controls.
Provide accessible names for icon-only controls.
Support keyboard navigation and visible focus states.
Ensure text and control contrast are sufficient.
Do not communicate the selected section by color alone.
Respect reduced-motion preferences.
Ensure external links have meaningful labels and appropriate behavior.
Keep focus behavior sensible when menus or project detail views open and close.
4. Validation Rules
The implementation is acceptable only when the following rules are satisfied.
Architecture and scope
The existing framework and project conventions are preserved.
The camera shell, LCD, and controls have clear component responsibilities.
No unrelated application behavior is broken.
Dependencies are added only when justified.
No unnecessary full application rewrite is performed.
Visual rules
The camera is recognizable as a DSLR rear view.
The camera body remains stable during page navigation.
Portfolio content is rendered inside the LCD.
Camera details do not overwhelm the content.
Typography, spacing, and screen treatment are consistent across pages.
The layout adapts to desktop and mobile viewports.
No unintended clipping, overlap, or horizontal overflow occurs.
Functional rules
Every displayed interactive control has a working action.
Every required portfolio section is reachable.
MENU opens and closes predictably.
BACK returns to the expected previous state.
Directional controls and OK / SET work in their current context.
Project gallery and project detail navigation work in both directions.
External links point to existing, correct destinations.
Navigation does not create inconsistent or stale UI state.
No full-page reload occurs for internal view changes unless required by the existing routing architecture.
Content rules
Existing portfolio information is retained.
No unsupported achievements or professional claims are introduced.
Missing content is handled gracefully instead of being fabricated.
Long content remains readable and accessible.
Quality rules
No console errors or uncaught runtime exceptions.
No new lint, type-check, or build failures.
No broken assets or invalid links introduced by the change.
No inaccessible controls or keyboard traps.
No animation that prevents or significantly delays interaction.
5. Tests to Perform
Run the checks supported by the repository. Do not claim a test passed unless it was actually run.
5.1 Repository baseline
Before changes:
Inspect package scripts and existing tests.
Run the existing build, lint, type-check, and test commands when practical.
Record any pre-existing failures so they are not incorrectly attributed to this change.
5.2 Functional navigation tests
Verify manually or with automated tests:
[ ] The home/profile view is displayed on initial load.
[ ] MENU opens and closes the section menu.
[ ] Every portfolio section can be opened from the menu.
[ ] INFO / DISP changes the intended display mode.
[ ] Playback opens the Projects gallery.
[ ] Directional controls move the active selection correctly.
[ ] OK / SET opens the selected item.
[ ] BACK returns to the expected previous view.
[ ] Selecting a project opens its details.
[ ] Returning from project details restores a usable gallery state.
[ ] Repeated navigation does not break or desynchronize the UI.
[ ] External links and email links work as intended.
[ ] Browser back and forward work if URL routing is implemented.
5.3 Keyboard and accessibility tests
[ ] All interactive controls can be reached using the keyboard.
[ ] Focus indicators are visible.
[ ] Enter and Space activate buttons as expected.
[ ] Directional keyboard behavior is consistent if implemented.
[ ] Icon-only controls have accessible names.
[ ] Focus is managed sensibly when menus and detail views change.
[ ] Reduced-motion preferences are respected.
[ ] Text and controls remain legible with adequate contrast.
5.4 Responsive tests
Check at minimum:
[ ] Large desktop viewport.
[ ] Typical laptop viewport.
[ ] Tablet or narrow landscape viewport.
[ ] Mobile viewport.
[ ] Narrow viewport with long project descriptions.
[ ] LCD content with enough items to require scrolling.
At each size, confirm:
No unintended horizontal overflow.
The camera body and LCD remain visually coherent.
All essential controls are reachable.
Touch targets are usable on mobile.
Text is not clipped or too small to read.
5.5 Visual regression checks
Compare the rendered result against the intended design:
[ ] Camera silhouette and material treatment look intentional.
[ ] LCD is visually distinct from the camera body.
[ ] Buttons are positioned consistently and look interactive.
[ ] Active menu items and selected projects are easy to identify.
[ ] Section layouts share consistent spacing and typography.
[ ] Transitions are subtle and do not cause layout shifts.
[ ] Long content does not overlap camera controls or status indicators.
5.6 Build and quality checks
After implementation:
[ ] Run the project's build command.
[ ] Run linting if configured.
[ ] Run type-checking if configured.
[ ] Run unit and integration tests if configured.
[ ] Run relevant end-to-end tests if the project supports them.
[ ] Check the browser console for new errors.
[ ] Check for broken images, links, and missing assets.
[ ] Review the final diff for unrelated changes.
If a test cannot be run because the environment or repository lacks the required setup, report it explicitly rather than claiming success.
6. Project Structure
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
│   ├── HomeView
│   ├── ExperienceView
│   ├── ProjectsView
│   ├── ProjectDetailView
│   ├── SkillsView
│   ├── AboutView
│   └── ContactView
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
Component responsibilities
CameraShell: Persistent camera body and overall composition.
CameraLCD: Screen frame, content viewport, and consistent screen-level styling.
CameraButton: Reusable physical button with accessible label and interaction states.
CameraMenu: Section menu and active-selection indicator.
CameraControls: Coordinates the directional pad, wheel, MENU, BACK, INFO, playback, and OK / SET actions.
CameraStatusBar: Optional camera-inspired status information.
Portfolio views: Render the existing content for each section.
ProjectDetailView: Displays selected project information and return navigation.
Portfolio data: Keeps structured content separate from layout where practical.
Navigation hook or state module: Manages active view, menu state, selected project, and display mode when appropriate.
Avoid splitting simple components into separate files without a clear benefit. Keep the implementation proportionate to the existing project's size.
7. Implementation Workflow
Inspect the repository, current UI, content, and available scripts.
Summarize the relevant existing architecture and identify the files that need to change.
Establish the camera layout and LCD viewport.
Implement reusable, accessible physical controls.
Connect all controls to a consistent navigation model.
Adapt existing portfolio content to the LCD views.
Implement responsive layouts and reduced-motion behavior.
Run functional, accessibility, responsive, and build checks.
Fix regressions introduced by the changes.
Review the final diff and report what was changed.
8. Final Report
When finished, provide:
A concise summary of the implemented design.
The files created or modified and each file's responsibility.
The control-to-navigation mapping.
Tests and checks actually run, with pass/fail results.
Known limitations, skipped tests, and any remaining issues.
Definition of done: The existing portfolio runs as an interactive, responsive DSLR-inspired interface. The camera shell remains persistent, its physical controls navigate the portfolio, the LCD displays the selected content, and the changes pass the applicable validation checks.
